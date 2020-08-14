import Alliance from './Alliance.js';
import Cult from './Cult.js';
import Eyrie from './Eyrie.js';
import Marquise from './Marquise.js';
import Riverfolk from './Riverfolk.js';
import Vagabond from './Vagabond.js';

import Faction from '../Faction.js';

class UnknownFaction extends Error {
  constructor(faction: string) {
    super(`No such faction ${faction}`);
  }
}

type FactionData = Alliance | Cult | Eyrie | Marquise | Riverfolk | Vagabond;

export default function createFaction(faction: string): FactionData {
  switch (faction) {
    case Faction.marquise:
      return new Marquise;
    case Faction.eyrie:
      return new Eyrie;
    case Faction.alliance:
      return new Alliance;
    case Faction.vagabond:
    case Faction.vagabond2:
      return new Vagabond(faction);
    case Faction.cult:
      return new Cult;
    case Faction.riverfolk:
      return new Riverfolk;
    // case Faction.marquise_bot:
    //   return new MarquiseBot;
    default:
      throw new UnknownFaction(faction);
  }
}
