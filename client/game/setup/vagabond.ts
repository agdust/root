import { get } from 'svelte/store';
import borrow from '../../util/borrow';
import { game, prompts } from '../../store';
import { accept } from '../../../model/Acceptor';
import Characters from '../../../model/Character';
import Faction from '../../../model/Faction';
import Client from '../../../model/Client';
import ForestZone from '../../../model/board/ForestZone';
import cardImages from '../../image/card/card-vagabond_character-front.*.jpg';
import cardBack from '../../image/card/card-vagabond_character-back.jpg';

export default async function * setupVagabond(this: Client, faction: Faction.vagabond | Faction.vagabond2) {
  if (!get(game)!.factionData[faction]!.character) {
    const charactersTaken = borrow(game)(game => {
      return [
        game!.factionData.vagabond && game!.factionData.vagabond!.character,
        game!.factionData.vagabond2 && game!.factionData.vagabond2!.character,
      ]
    });
    prompts.set({
      text: 'prompt-choose-character',
      cards: Object.values(Characters)
        .map(character => character.name)
        .map(name => charactersTaken.includes(name)
          ? { available: false, image: cardBack }
          : { value: name, image: cardImages[name] }
        ),
    });
    game.set(yield * accept.call(this,
      { type: 'Prompts:card', async * handler ({ value }: { value: string }) {
        return this.send('chooseCharacter', { character: value });
      } },
    ));
  }
  prompts.set({
    text: 'prompt-choose-forest',
    forests: get(game)!.board.forests,
  });
  game.set(yield * accept.call(this,
    { type: 'Prompts:forest', async * handler ({ forest }: { forest: ForestZone }) {
      return this.send('chooseForest', { forest: forest.index });
    } },
  ));
  prompts.set(null);
}
