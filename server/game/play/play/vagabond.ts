import { get } from 'svelte/store';
import { birdsong, daylight, evening } from './common';
import Client from '../../../../model/Client';
import Faction from '../../../../model/Faction';
import Time from '../../../../model/Time';
import { game, prompts } from '../../../../client/store';

async function * vagabondBirdsong(this: Client) {
  switch (get(game)!.phase) {
    // @ts-ignore: falls through
    case 0:
      yield * birdsong.call(this, Faction.vagabond);
    /* falls through */
    case 1:
      // 1. Refresh 3 items (+2 for each tea)
      // 2. Slip (move for free)
      prompts.set(null);
  }
}

async function * vagabondDaylight(this: Client) {
  yield * daylight.call(this, Faction.vagabond);
  // -. Use items to: Move, Battle, Explore, Aid, Quest, Strike, Repair or Craft
}

async function * vagabondEvening(this: Client) {
  yield * evening.call(this, Faction.vagabond);
  // 0. If in forest -- repair all items
  // 1. Draw cards
  // 2. Discard cards to 5
  // 3. Remove excess items from bag
}

export default async function * vagabondTurn(this: Client) {
  switch (get(game)!.time) {
    // @ts-ignore: falls through
    case Time.birdsong:
      yield * vagabondBirdsong.call(this);
    // @ts-ignore: falls through
    case Time.daylight:
      yield * vagabondDaylight.call(this);
    /* falls through */
    case Time.evening:
      yield * vagabondEvening.call(this);
  }
}
