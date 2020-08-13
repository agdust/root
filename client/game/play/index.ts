import { get } from 'svelte/store';
import borrow from '../../util/borrow';
import { game, username } from '../../store';
import { accept } from '../../../model/Acceptor';
import update from '../update';
import marquiseTurn from './marquise';
import Client from '../../../model/Client';
import Faction from '../../../model/Faction';
import log from '../../util/log';

async function * turn(this: Client, faction: Faction): AsyncIterableIterator<void> {
  switch (faction) {
    case Faction.marquise:
      log('Start marquise turn');
      yield * marquiseTurn.call(this);
      break;
    case Faction.eyrie:
      log('Start eyrie turn');
      break;
    case Faction.alliance:
      log('Start alliance turn');
      break;
    case Faction.vagabond:
    case Faction.vagabond2:
      log('Start vagabond turn');
      break;
    case Faction.riverfolk:
      log('Start riverfolk turn');
      break;
    case Faction.cult:
      log('Start cult turn');
      break;
    default:
      throw new Error('unimplemented');
  }
  yield * accept.call(this, update);
}

export default async function * play(this: Client) {
  for (; ;) {
    const currentPlayer = borrow(game)(game => game!.playerNames[game!.turn! % game!.playerNames.length]);
    if (get(username) === currentPlayer) {
      turn.call(this, get(game)!.players[currentPlayer].faction!);
    } else {
      yield * accept.call(this, 'gameUpdated');
      this.send('update', this.game);
    }
  }
}
