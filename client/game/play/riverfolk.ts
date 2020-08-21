import { get } from 'svelte/store';
import { game, prompts } from '../../store';
import Client from '../../../model/Client';
import Faction from '../../../model/Faction';
import Time from '../../../model/Time';

import { birdsong, daylight, evening } from './common';

async function * riverfolkBirdsong(this: Client) {
  switch (get(game)!.phase) {
    // @ts-ignore: falls through
    case 0:
      yield * birdsong.call(this, Faction.riverfolk);
    /* falls through */
    case 1:
      // 1. Protectionism. If payments box is empty, place 2 warriors in it
      // 2. Score dividends. If any trade posts are on the map, score 1VP per 2 funds
      // 3. Gather funds. Move all warriors ob faction board to the Funds box
      prompts.set(null);
  }
}

async function * riverfolkDaylight(this: Client) {
  yield * daylight.call(this, Faction.riverfolk);
  // Commit fund:
  // -. Move - 1
  // -. Battle - 1
  // -. Draw - 1
  //
  // Commit funds to trade posts:
  // -. Craft. Instead of gaining card effect, player can discard card and place one warrior to payments
  //
  // Spend funds:
  // -. Recruit on river - 1
  // -. Establish trade post and warrior - 2 funds of clearing ruler
}

async function * riverfolkEvening(this: Client) {
  yield * evening.call(this, Faction.riverfolk);
  // 1. Discard cards to 5
  // 2. Set services cost
}

export default async function * riverfolkTurn(this: Client) {
  switch (get(game)!.time) {
    // @ts-ignore: falls through
    case Time.birdsong:
      yield * riverfolkBirdsong.call(this);
    // @ts-ignore: falls through
    case Time.daylight:
      yield * riverfolkDaylight.call(this);
    /* falls through */
    case Time.evening:
      yield * riverfolkEvening.call(this);
  }
}
