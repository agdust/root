import { get } from 'svelte/store';
import { game, prompts } from '../../store';
import Client from '../../../model/Client';
import Faction from '../../../model/Faction';
import Time from '../../../model/Time';

import { birdsong, daylight, evening } from './common';

async function * cultBirdsong(this: Client) {
  switch (get(game)!.phase) {
    // @ts-ignore: falls through
    case 0:
      yield * birdsong.call(this, Faction.cult);
    /* falls through */
    case 1:
      // 1. Specify outcast
      // 2. Discard lost souls
      // 3. Perform conspiracies
      //    -. Crusade - 2 acolytes - battle in outcast or move from outcast and battle in destination
      //    -. Convert - 2 acolytes - replace enemy warrior in outcast with own warrior
      //    -. Sanctify - 3 acolytes - replace building warrior own garden
      prompts.set(null);
  }
}

async function * cultDaylight(this: Client) {
  yield * daylight.call(this, Faction.cult);
  // Reveal any number of cards from hand and perform one ritual for each:

  // -. Birds - Sacrifice - Move one warrior from map to acolytes

  // -. Mice/Rabbits/Foxes:
  //    -. Build - place a garden in a matching clearing you rule
  //    -. Recruit - place a warrior in a matching clearing
  //    -. Score (once per turn per faction) - discard unrevealed card from hand to score
  //        VP for rightmost empty matching garden space
}

async function * cultEvening(this: Client) {
  yield * evening.call(this, Faction.cult);
  // 1. Return revealed cards in hand
  // 2. Craft using gardens matching outcast
  // 3. Draw cards
  // 4. Discard cards to 5
}

export default async function * cultTurn(this: Client) {
  switch (get(game)!.time) {
    // @ts-ignore: falls through
    case Time.birdsong:
      yield * cultBirdsong.call(this);
    // @ts-ignore: falls through
    case Time.daylight:
      yield * cultDaylight.call(this);
    /* falls through */
    case Time.evening:
      yield * cultEvening.call(this);
  }
}
