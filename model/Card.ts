import Suit from './Suit';

export class Card {
  constructor(
    public suit: Suit,
    public cost: Suit[] | null,
    public name: string,
  ) {}

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

  get key() {
    return `${this.suit}-${this.name}`;
  }

  static isDominance(card: Card) { return card.name === Card.dominance; }

  static isSpy(card: Card) { return card.name === Card.spy; }

  static isSuitable(card: Card, suit: Suit): boolean {
    return card.suit === suit || card.suit === Suit.bird;
  }

  static isSuitableFunc(suit: Suit): (card: Card) => boolean {
    return (card: Card) => Card.isSuitable(card, suit);
  }

  static isSuitableStrict(card: Card, suit: Suit): boolean {
    return card.suit === suit;
  }

  static isSuitableStrictFunc(suit: Suit): (card: Card) => boolean {
    return (card: Card) => Card.isSuitableStrict(card, suit);
  }

  toJSON() {
    return { ...this, key: this.key };
  }
}

const Cards = [
  new Card(Suit.bird, null, Card.ambush),
  new Card(Suit.bird, null, Card.ambush),
  new Card(Suit.bird, [Suit.mouse], Card.birdy_bindle),
  new Card(Suit.bird, [Suit.fox], Card.armorers),
  new Card(Suit.bird, [Suit.fox], Card.armorers),
  new Card(Suit.bird, [Suit.rabbit], Card.woodland_runners),
  new Card(Suit.bird, [Suit.fox, Suit.fox], Card.arms_trader),
  new Card(Suit.bird, [Suit.fox], Card.crossbow),
  new Card(Suit.bird, [Suit.mouse], Card.sappers),
  new Card(Suit.bird, [Suit.mouse], Card.sappers),
  new Card(Suit.bird, [Suit.fox, Suit.fox], Card.brutal_tactics),
  new Card(Suit.bird, [Suit.bird, Suit.bird, Suit.bird, Suit.bird], Card.royal_claim),

  new Card(Suit.fox, null, Card.ambush),
  new Card(Suit.fox, [Suit.mouse], Card.gently_used_knapsack),
  new Card(Suit.fox, [Suit.mouse], Card.root_tea),
  new Card(Suit.fox, [Suit.rabbit], Card.travel_gear),
  new Card(Suit.fox, [Suit.rabbit, Suit.rabbit], Card.protection_racket),
  new Card(Suit.fox, [Suit.fox, Suit.fox], Card.foxfolk_steel),
  new Card(Suit.fox, [Suit.fox], Card.anvil),
  new Card(Suit.fox, [Suit.mouse, Suit.mouse, Suit.mouse], Card.stand_and_deliver),
  new Card(Suit.fox, [Suit.mouse, Suit.mouse, Suit.mouse], Card.stand_and_deliver),
  new Card(Suit.fox, [Suit.fox, Suit.rabbit, Suit.mouse], Card.tax_collector),
  new Card(Suit.fox, [Suit.fox, Suit.rabbit, Suit.mouse], Card.tax_collector),
  new Card(Suit.fox, [Suit.fox, Suit.rabbit, Suit.mouse], Card.tax_collector),
  new Card(Suit.fox, [Suit.fox, Suit.fox, Suit.fox], Card.favor_of_the_foxes),

  new Card(Suit.rabbit, null, Card.ambush),
  new Card(Suit.rabbit, [Suit.mouse], Card.smugglers_trail),
  new Card(Suit.rabbit, [Suit.mouse], Card.root_tea),
  new Card(Suit.rabbit, [Suit.rabbit], Card.a_visit_to_friends),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit], Card.bake_sale),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit], Card.command_warren),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit], Card.command_warren),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit], Card.better_burrow_bank),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit], Card.better_burrow_bank),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit], Card.cobbler),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit], Card.cobbler),
  new Card(Suit.rabbit, [Suit.rabbit, Suit.rabbit, Suit.rabbit], Card.favor_of_the_rabbits),

  new Card(Suit.mouse, null, Card.ambush),
  new Card(Suit.mouse, [Suit.mouse], Card.mouse_in_a_sack),
  new Card(Suit.mouse, [Suit.mouse], Card.root_tea),
  new Card(Suit.mouse, [Suit.rabbit], Card.travel_gear),
  new Card(Suit.mouse, [Suit.rabbit, Suit.rabbit], Card.investments),
  new Card(Suit.mouse, [Suit.fox, Suit.fox], Card.sword),
  new Card(Suit.mouse, [Suit.fox], Card.crossbow),
  new Card(Suit.mouse, [Suit.mouse, Suit.mouse], Card.scouting_party),
  new Card(Suit.mouse, [Suit.mouse, Suit.mouse], Card.scouting_party),
  new Card(Suit.mouse, [Suit.mouse], Card.codebreakers),
  new Card(Suit.mouse, [Suit.mouse], Card.codebreakers),
  new Card(Suit.mouse, [Suit.mouse, Suit.mouse, Suit.mouse], Card.favor_of_the_mice),

  new Card(Suit.fox, null, Card.dominance),
  new Card(Suit.rabbit, null, Card.dominance),
  new Card(Suit.mouse, null, Card.dominance),
  new Card(Suit.bird, null, Card.dominance),
  new Card(Suit.fox, null, Card.spy),
  new Card(Suit.rabbit, null, Card.spy),
  new Card(Suit.mouse, null, Card.spy),
  new Card(Suit.bird, null, Card.spy),
];

export default Cards;
