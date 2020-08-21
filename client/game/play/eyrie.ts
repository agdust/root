import { get } from 'svelte/store';
import { game, prompts } from '../../store';
import Client from '../../../model/Client';
import Faction from '../../../model/Faction';
import Time from '../../../model/Time';

import { birdsong, daylight, evening } from './common';

async function * eyrieBirdsong(this: Client) {
  switch (get(game)!.phase) {
    // @ts-ignore: falls through
    case 0:
      yield * birdsong.call(this, Faction.eyrie);
    /* falls through */
    case 1:
      // 1. Draw a card, if hand is empty
      // 2. Add 1-2 card to Decree (only one bird card)
      // 3. If there are no roosts, place roost and 3 warriors to clearing with fewest total pieces
      prompts.set(null);
  }
}

async function * eyrieDaylight(this: Client) {
  yield * daylight.call(this, Faction.eyrie);
  // 1. Craft using roosts
  // 2. Resolve a decree
}

async function * eyrieEvening(this: Client) {
  yield * evening.call(this, Faction.eyrie);
  // 1. Score a VP for the rightmost empty roost space
  // 2. Draw cards
}

export default async function * eyrieTurn(this: Client) {
  switch (get(game)!.time) {
    // @ts-ignore: falls through
    case Time.birdsong:
      yield * eyrieBirdsong.call(this);
    // @ts-ignore: falls through
    case Time.daylight:
      yield * eyrieDaylight.call(this);
    /* falls through */
    case Time.evening:
      yield * eyrieEvening.call(this);
  }
}
