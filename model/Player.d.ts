import Faction from './Faction';
export default class Player {
    username: string;
    ready: boolean;
    faction: Faction | null;
    constructor(username: string);
}
