import { get } from 'svelte/store';
import { game, prompts } from '../../store';
import Client from '../../../model/Client';
import Faction from '../../../model/Faction';
import Time from '../../../model/Time';

import { birdsong, daylight, evening } from './common';

async function * allianceBirdsong(this: Client) {
  switch (get(game)!.phase) {
    // @ts-ignore: falls through
    case 0:
      yield * birdsong.call(this, Faction.alliance);
    /* falls through */
    case 1:
      // 1. Revolt any number of times
      // 2. Spread sympathy any number of times
      prompts.set(null);
  }
}

async function * allianceDaylight(this: Client) {
  yield * daylight.call(this, Faction.alliance);
  // -. Craft using sympathy
  // -. Mobilize card to supporters
  // -. Train an officer
}

async function * allianceEvening(this: Client) {
  yield * evening.call(this, Faction.alliance);
  // 1. Military officer operations: move, recruit, battle, organize
  // 2. Draw cards
}

export default async function * allianceTurn(this: Client) {
  switch (get(game)!.time) {
    // @ts-ignore: falls through
    case Time.birdsong:
      yield * allianceBirdsong.call(this);
    // @ts-ignore: falls through
    case Time.daylight:
      yield * allianceDaylight.call(this);
    /* falls through */
    case Time.evening:
      yield * allianceEvening.call(this);
  }
}
