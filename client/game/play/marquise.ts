import { get } from 'svelte/store';
import { game, prompts } from '../../store';
import { accept } from '../../../model/Acceptor';
import Client from '../../../model/Client';
import Pieces, { Piece } from '../../../model/Piece';
import Clearing from '../../../model/board/Clearing';
import Faction from '../../../model/Faction';
import Time from '../../../model/Time';

import { birdsong, daylight, evening } from './common';

async function * marquiseBirdsong(this: Client) {
  switch (get(game)!.phase) {
    // @ts-ignore: falls through
    case 0:
      yield * birdsong.call(this, Faction.marquise);
    /* falls through */
    case 1:
      // Here firstly we filter all clearings with sawmills,
      // and secondly we repeat it in another way and I don't know why
      const sawmillClearings = (<Clearing[]>[]).concat(...get(game)!.board.clearings
        .filter(clearing => Clearing.hasBuilding(clearing, Pieces.marquise.sawmill))
        .map(clearing => clearing.buildings
          .filter(building => building && Piece.equals(building, Pieces.marquise.sawmill))
          .map(() => clearing),
        ),
      );

      if (get(game)!.factionData.marquise!.wood >= sawmillClearings.length) { break; }

      // If marquise has not enough wood, we let her choose clearings where the wood will appear
      while (get(game)!.factionData.marquise!.wood) {
        prompts.set({
          text: 'prompt-choose-sawmill',
          clearings: sawmillClearings,
        });
        game.set(yield * accept.call(this,
          {
            type: 'Prompts:clearing',
            async * handler({ clearing }: { clearing: Clearing }) {
              const game = await this.send('clearing', { clearing: clearing.index });
              sawmillClearings.splice(sawmillClearings.findIndex(c => c.index === clearing.index), 1);
              return game;
            },
          },
        ));
      }
      prompts.set(null);
  }
}

async function * marquiseDaylight(this: Client) {
  yield * daylight.call(this, Faction.marquise);
}

async function * marquiseEvening(this: Client) {
  yield * evening.call(this, Faction.marquise);
}

export default async function * marquiseTurn(this: Client) {
  switch (get(game)!.time) {
    // @ts-ignore: falls through
    case Time.birdsong:
      yield * marquiseBirdsong.call(this);
    // @ts-ignore: falls through
    case Time.daylight:
      yield * marquiseDaylight.call(this);
    /* falls through */
    case Time.evening:
      yield * marquiseEvening.call(this);
  }
}
