"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Suit_1 = tslib_1.__importDefault(require("./Suit"));
class Card {
    constructor(suit, cost, name) {
        this.suit = suit;
        this.cost = cost;
        this.name = name;
    }
    static get ambush() { return 'ambush'; }
    static get birdy_bindle() { return 'birdy_bindle'; }
    static get armorers() { return 'armorers'; }
    static get woodland_runners() { return 'woodland_runners'; }
    static get arms_trader() { return 'arms_trader'; }
    static get crossbow() { return 'crossbow'; }
    static get sappers() { return 'sappers'; }
    static get brutal_tactics() { return 'brutal_tactics'; }
    static get royal_claim() { return 'royal_claim'; }
    static get gently_used_knapsack() { return 'gently_used_knapsack'; }
    static get root_tea() { return 'root_tea'; }
    static get travel_gear() { return 'travel_gear'; }
    static get protection_racket() { return 'protection_racket'; }
    static get foxfolk_steel() { return 'foxfolk_steel'; }
    static get anvil() { return 'anvil'; }
    static get stand_and_deliver() { return 'stand_and_deliver'; }
    static get tax_collector() { return 'tax_collector'; }
    static get favor_of_the_foxes() { return 'favor_of_the_foxes'; }
    static get smugglers_trail() { return 'smugglers_trail'; }
    static get a_visit_to_friends() { return 'a_visit_to_friends'; }
    static get bake_sale() { return 'bake_sale'; }
    static get command_warren() { return 'command_warren'; }
    static get better_burrow_bank() { return 'better_burrow_bank'; }
    static get cobbler() { return 'cobbler'; }
    static get favor_of_the_rabbits() { return 'favor_of_the_rabbits'; }
    static get mouse_in_a_sack() { return 'mouse_in_a_sack'; }
    static get investments() { return 'investments'; }
    static get sword() { return 'sword'; }
    static get scouting_party() { return 'scouting_party'; }
    static get codebreakers() { return 'codebreakers'; }
    static get favor_of_the_mice() { return 'favor_of_the_mice'; }
    static get dominance() { return 'dominance'; }
    static get spy() { return 'spy'; }
    static isDominance(card) { return card.name === Card.dominance; }
    static isSpy(card) { return card.name === Card.spy; }
    get key() {
        return `${this.suit}-${this.name}`;
    }
    toJSON() {
        return { ...this, key: this.key };
    }
}
exports.Card = Card;
const Cards = [
    new Card(Suit_1.default.bird, null, Card.ambush),
    new Card(Suit_1.default.bird, null, Card.ambush),
    new Card(Suit_1.default.bird, [Suit_1.default.mouse], Card.birdy_bindle),
    new Card(Suit_1.default.bird, [Suit_1.default.fox], Card.armorers),
    new Card(Suit_1.default.bird, [Suit_1.default.fox], Card.armorers),
    new Card(Suit_1.default.bird, [Suit_1.default.rabbit], Card.woodland_runners),
    new Card(Suit_1.default.bird, [Suit_1.default.fox, Suit_1.default.fox], Card.arms_trader),
    new Card(Suit_1.default.bird, [Suit_1.default.fox], Card.crossbow),
    new Card(Suit_1.default.bird, [Suit_1.default.mouse], Card.sappers),
    new Card(Suit_1.default.bird, [Suit_1.default.mouse], Card.sappers),
    new Card(Suit_1.default.bird, [Suit_1.default.fox, Suit_1.default.fox], Card.brutal_tactics),
    new Card(Suit_1.default.bird, [Suit_1.default.bird, Suit_1.default.bird, Suit_1.default.bird, Suit_1.default.bird], Card.royal_claim),
    new Card(Suit_1.default.fox, null, Card.ambush),
    new Card(Suit_1.default.fox, [Suit_1.default.mouse], Card.gently_used_knapsack),
    new Card(Suit_1.default.fox, [Suit_1.default.mouse], Card.root_tea),
    new Card(Suit_1.default.fox, [Suit_1.default.rabbit], Card.travel_gear),
    new Card(Suit_1.default.fox, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.protection_racket),
    new Card(Suit_1.default.fox, [Suit_1.default.fox, Suit_1.default.fox], Card.foxfolk_steel),
    new Card(Suit_1.default.fox, [Suit_1.default.fox], Card.anvil),
    new Card(Suit_1.default.fox, [Suit_1.default.mouse, Suit_1.default.mouse, Suit_1.default.mouse], Card.stand_and_deliver),
    new Card(Suit_1.default.fox, [Suit_1.default.mouse, Suit_1.default.mouse, Suit_1.default.mouse], Card.stand_and_deliver),
    new Card(Suit_1.default.fox, [Suit_1.default.fox, Suit_1.default.rabbit, Suit_1.default.mouse], Card.tax_collector),
    new Card(Suit_1.default.fox, [Suit_1.default.fox, Suit_1.default.rabbit, Suit_1.default.mouse], Card.tax_collector),
    new Card(Suit_1.default.fox, [Suit_1.default.fox, Suit_1.default.rabbit, Suit_1.default.mouse], Card.tax_collector),
    new Card(Suit_1.default.fox, [Suit_1.default.fox, Suit_1.default.fox, Suit_1.default.fox], Card.favor_of_the_foxes),
    new Card(Suit_1.default.rabbit, null, Card.ambush),
    new Card(Suit_1.default.rabbit, [Suit_1.default.mouse], Card.smugglers_trail),
    new Card(Suit_1.default.rabbit, [Suit_1.default.mouse], Card.root_tea),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit], Card.a_visit_to_friends),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.bake_sale),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.command_warren),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.command_warren),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.better_burrow_bank),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.better_burrow_bank),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.cobbler),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.cobbler),
    new Card(Suit_1.default.rabbit, [Suit_1.default.rabbit, Suit_1.default.rabbit, Suit_1.default.rabbit], Card.favor_of_the_rabbits),
    new Card(Suit_1.default.mouse, null, Card.ambush),
    new Card(Suit_1.default.mouse, [Suit_1.default.mouse], Card.mouse_in_a_sack),
    new Card(Suit_1.default.mouse, [Suit_1.default.mouse], Card.root_tea),
    new Card(Suit_1.default.mouse, [Suit_1.default.rabbit], Card.travel_gear),
    new Card(Suit_1.default.mouse, [Suit_1.default.rabbit, Suit_1.default.rabbit], Card.investments),
    new Card(Suit_1.default.mouse, [Suit_1.default.fox, Suit_1.default.fox], Card.sword),
    new Card(Suit_1.default.mouse, [Suit_1.default.fox], Card.crossbow),
    new Card(Suit_1.default.mouse, [Suit_1.default.mouse, Suit_1.default.mouse], Card.scouting_party),
    new Card(Suit_1.default.mouse, [Suit_1.default.mouse, Suit_1.default.mouse], Card.scouting_party),
    new Card(Suit_1.default.mouse, [Suit_1.default.mouse], Card.codebreakers),
    new Card(Suit_1.default.mouse, [Suit_1.default.mouse], Card.codebreakers),
    new Card(Suit_1.default.mouse, [Suit_1.default.mouse, Suit_1.default.mouse, Suit_1.default.mouse], Card.favor_of_the_mice),
    new Card(Suit_1.default.fox, null, Card.dominance),
    new Card(Suit_1.default.rabbit, null, Card.dominance),
    new Card(Suit_1.default.mouse, null, Card.dominance),
    new Card(Suit_1.default.bird, null, Card.dominance),
    new Card(Suit_1.default.fox, null, Card.spy),
    new Card(Suit_1.default.rabbit, null, Card.spy),
    new Card(Suit_1.default.mouse, null, Card.spy),
    new Card(Suit_1.default.bird, null, Card.spy),
];
exports.default = Cards;
