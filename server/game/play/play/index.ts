import { accept } from '../../../../model/Acceptor';
import Faction from '../../../../model/Faction';
import Client from '../../../../model/Client';
import marquiseTurn from './marquise';
import log from '../../../../client/util/log';
import eyrieTurn from '../../../../client/game/play/eyrie';
import allianceTurn from '../../../../client/game/play/alliance';
import vagabondTurn from '../../../../client/game/play/vagabond';
import riverfolkTurn from '../../../../client/game/play/riverfolk';
import cultTurn from '../../../../client/game/play/cult';

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
}

export default async function * play(this: Client) {
  while (true) {
    if (this.username === this.game.activePlayerName) {
      // TODO: take turn
      yield * turn.call(this, this.game.activePlayer!.faction!);
      this.game.nextTurn();
    } else {
      yield * accept.call(this, 'gameUpdated');
      this.send('update', this.game);
    }
  }
}
