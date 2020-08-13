import { accept } from '../../../../model/Acceptor';
import subset from '../../../util/subset';
import Rejection from '../../../../model/Rejection';
import Game from '../../../../model/Game';
import Client from '../../../../model/Client';
import Faction from '../../../../model/Faction';
import Leader from '../../../../model/Leader';
import Pieces, { Piece } from '../../../../model/Piece';
import Suit from '../../../../model/Suit';
import { Item } from '../../../../model/Item';
import Clearing from '../../../../model/board/Clearing';
import { Card } from '../../../../model/Card';
import { Cancel, NoPiecesOfFaction } from './rejections';
import cardEffect from './cardEffect';
import PlayablePlayer from '../../../../model/PlayablePlayer';

export async function * birdsong(this: Client, faction: Faction): AsyncIterableIterator<void> {
  // TODO: check victory conditions
  if (this.game.factions.includes(Faction.riverfolk) && faction !== Faction.riverfolk) {
    // TODO: purchase services
  }
  // TODO: activate crafted effects
  this.game.nextPhase();
}

export async function * daylight(this: Client, faction: Faction): AsyncIterableIterator<void> {
  // TODO: activate crafted effects
  this.game.nextPhase();
}

export async function * evening(this: Client, faction: Faction): AsyncIterableIterator<void> {
  // TODO: activate crafted effects
  this.game.nextPhase();
}

class CannotAffordCrafting extends Rejection {
  constructor(threadId: string, card: Card) {
    super(threadId, {
      key: 'rejection-cannot-afford-crafting',
      params: {
        card: `card-${card.name}`,
      },
    });
  }
}

const CANCEL = Symbol();

export async function * craft(this: Client, resources: Suit[], faction_: Faction): AsyncIterableIterator<void> {
  // if (faction_ === Faction.marquise_bot) { return; }
  const faction = faction_;

  async function * craftCard(this: Client, { card: index }: { card: number }, threadId: string) {
    const card = this.game.factionData[faction]!.hand[index];
    if (!card || !card.cost || !subset(card.cost, resources)) {
      throw new CannotAffordCrafting(threadId, card);
    }
    yield * cardEffect.call(this, card, faction, threadId);
    for (const suit of card.cost) {
      resources.splice(resources.indexOf(suit), 1);
    }
  }

  async function * cancel(this: Client) {
    return CANCEL;
  }

  CAN_AFFORD: while (CANCEL !== (yield * accept.call(this, craftCard, cancel))) {
    for (const card of this.game.factionData[faction]!.hand) {
      if (card.cost && subset(card.cost, resources)) {
        continue CAN_AFFORD;
      }
    }
    break;
  }
}

function strength(game: Game, clearing: Clearing, faction: Faction): number {
  let units = 0;
  if (game.services.mercenaries === faction) {
    units += clearing.pieces.filter(piece => Piece.equals(piece, Pieces.riverfolk.warrior)).length;
  }

  if (faction === Faction.vagabond || faction === Faction.vagabond2) {
    units += [...game.factionData[faction]!.items.refreshed, ...game.factionData[faction]!.items.exhausted]
      .filter(item => item.name === Item.sword)
      .length;

    const allies = Object.entries(game.factionData[faction]!.relations)
      .filter(([, level]) => level === 3)
      .map(([faction]) => faction);

    units += clearing.pieces
      .filter(piece => piece.name === 'warrior' && allies.includes(piece.faction!))
      .length;
  } else {
    units += clearing.pieces.filter(piece => Piece.equals(piece, Pieces[faction].warrior)).length;
  }

  return units;
}

async function * takeHits(this: Client, hits: number, clearing: Clearing, faction: Faction): AsyncIterableIterator<void> {
  TAKING_HITS: for (let i = 0; i < hits; ++i) {
    if (faction === Faction.vagabond || faction === Faction.vagabond2) {
      // TODO: this is weird one
    } else {
      const targets = [faction];
      if (this.game.services.mercenaries === faction && i % 2 === 0) {
        targets.unshift(Faction.riverfolk);
      }
      for (const target of targets) {
        const warrior = clearing.pieces.findIndex(piece => Piece.equals(Pieces[target].warrior, piece));
        if (warrior !== -1) {
          // warrior always goes first
          clearing.removePiece(warrior);
          continue TAKING_HITS;
        }
      }
      // TODO: No warriors, so pick buildings to destroy
    }
  }
}

export async function * battle(this: Client, clearing: Clearing, attacker: Faction) {
  const factions = new Set(
    clearing.pieces
      .map(piece => piece.faction)
      .filter((faction): faction is Faction => faction !== null),
  );
  // whe we delete marquise here?
  factions.delete(Faction.marquise);

  let defender: Faction = [...factions][0];
  if (factions.size <= 1) {
    defender = yield * accept.call(this,
      cancel,
      async function * faction(this: Client, { faction }: { faction: Faction }, threadId: string) {
        if (factions.has(faction)) {
          return faction;
        }
        throw new NoPiecesOfFaction(threadId, faction);
      },
    );
  }

  // Just a closure for ambush to avoid wall of nested if-s
  const defenderPlayer: PlayablePlayer | undefined = this.game.factionData[defender];
  const attackerPlayer: PlayablePlayer | undefined = this.game.factionData[attacker];
  if (!defenderPlayer || !attackerPlayer) { return; }

  do {
    const isAmbushSuitable = (card: Card, clearing: Clearing): boolean => {
      return card.name === Card.ambush && (card.suit === clearing.suit || card.suit === Suit.bird);
    };
    const hasAmbushCards = (player: PlayablePlayer, clearing: Clearing): boolean => {
      return player!.hand.some((card: Card) => isAmbushSuitable(card, clearing));
    };

    // if there are no ambush cards in defender's hand, go further
    if (!hasAmbushCards(defenderPlayer, clearing)) { break; }

    // if player doesn't want to use ambush card, go further
    const { card: defenderIndex } = await this.game.sendTo(defender, 'ambush');
    if (defenderIndex === undefined) { break; }

    // if card is incompatible, go further
    const defenderCard = defenderPlayer!.hand[defenderIndex];
    if (!isAmbushSuitable(defenderCard, clearing)) { break; }

    // use defender's ambush card
    this.game.discard(...defenderPlayer!.hand.splice(defenderIndex, 1));

    // mini closure for attacker's ambush card
    let discardAmbush: boolean = false;
    do {
      if (!hasAmbushCards(attackerPlayer, clearing)) { break; }

      const { card: attackerIndex } = await this.game.sendTo(attacker, 'ambush');
      if (attackerIndex === undefined) { break; }

      const attackerCard = attackerPlayer!.hand[attackerIndex];

      if (isAmbushSuitable(attackerCard, clearing)) {
        this.game.discard(...attackerPlayer!.hand.splice(attackerIndex, 1));
        discardAmbush = true;
      }
    } while (false);

    if (discardAmbush) { break; }

    yield * takeHits.call(this, 2, clearing, attacker);

    // battle ends if there are no more warriors left
    if (strength(this.game, clearing, attacker) === 0) { return; }
  } while (false);

  let [attack, defend] = this.game.rollDice();
  if (defender === Faction.alliance) {
    [attack, defend] = [defend, attack];
  }

  const defenderStrength = strength(this.game, clearing, defender);
  const attackerStrength = strength(this.game, clearing, attacker);

  attack = Math.min(attack, attackerStrength);
  defend = Math.min(defend, defenderStrength);

  // bonus attacks
  if (attackerPlayer!.craftedEffects.some(card => card.name === Card.brutal_tactics)) {
    if (await this.game.sendTo(attacker, 'brutalTactics')) {
      attack++;
      this.game.factionData[defender]!.victoryPoints++;
      this.game.notify();
    }
  }
  if (attacker === Faction.eyrie && this.game.factionData.eyrie!.leader === Leader.commander) {
    attack++;
  }
  if (defenderStrength === 0) { attack++; }

  yield * takeHits.call(this, defend, clearing, attacker);
  yield * takeHits.call(this, attack, clearing, defender);
}

export async function * cancel(this: Client): AsyncIterableIterator<void> {
  throw new Cancel;
}
