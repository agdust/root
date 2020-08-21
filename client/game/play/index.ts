import { get } from 'svelte/store';
import borrow from '../../util/borrow';
import { game, username } from '../../store';
import { accept } from '../../../model/Acceptor';
import update from '../update';
import marquiseTurn from './marquise';
import Client from '../../../model/Client';
import Faction from '../../../model/Faction';
import log from '../../util/log';
import eyrieTurn from './eyrie';
import allianceTurn from './alliance';
import vagabondTurn from './vagabond';
import riverfolkTurn from './riverfolk';
import cultTurn from './cult';

async function * turn(this: Client, faction: Faction): AsyncIterableIterator<void> {
  log(`Start ${faction} turn`);
  switch (faction) {
    case Faction.marquise:
      yield * marquiseTurn.call(this);
      break;
    case Faction.eyrie:
      yield * eyrieTurn.call(this);
      break;
    case Faction.alliance:
      yield * allianceTurn.call(this);
      break;
    case Faction.vagabond:
    case Faction.vagabond2:
      yield * vagabondTurn.call(this);
      break;
    case Faction.riverfolk:
      yield * riverfolkTurn.call(this);
      break;
    case Faction.cult:
      yield * cultTurn.call(this);
      break;
    default:
      throw new Error('unimplemented');
  }
  yield * accept.call(this, update);
}

export default async function * play(this: Client) {
  for (; ;) {
    const currentPlayer = borrow(game)(game => game!.playerNames[game!.turn! % game!.playerNames.length]);
    log(currentPlayer);
    if (get(username) === currentPlayer) {
      yield * turn.call(this, get(game)!.players[currentPlayer].faction!);
    } else {
      yield * accept.call(this, 'gameUpdated');
      this.send('update', this.game);
    }
  }
}
