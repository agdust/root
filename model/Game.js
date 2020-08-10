'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const clients_1 = tslib_1.__importDefault(require('../server/store/clients'));
const games_1 = tslib_1.__importDefault(require('../server/store/games'));
const Player_1 = tslib_1.__importDefault(require('./Player'));
const Faction_1 = tslib_1.__importDefault(require('./Faction'));
const Card_1 = tslib_1.__importStar(require('./Card'));
const Item_1 = tslib_1.__importDefault(require('./Item'));
const Quest_1 = tslib_1.__importDefault(require('./Quest'));
const Rejection_1 = tslib_1.__importDefault(require('./Rejection'));
const Message_1 = tslib_1.__importDefault(require('./Message'));
const Forest_1 = tslib_1.__importDefault(require('./board/Forest'));
const GameMap_1 = tslib_1.__importDefault(require('./GameMap'));
const Time_1 = tslib_1.__importDefault(require('./Time'));
const shuffle_1 = tslib_1.__importDefault(require('../server/util/shuffle'));
const factionData_1 = tslib_1.__importDefault(require('./factionData'));
const MarquiseBot_1 = tslib_1.__importDefault(require('./factionData/MarquiseBot'));

class PoorManualDexterity extends Error {
  constructor() {
    super('The Mechanical Marquise cannot draw cards');
  }
}

class UnsupportedSettings extends Error {
  constructor(settings) {
    super(`The requested game settings are not supported: ${JSON.stringify(settings)}`);
  }
}

class GameIsFull extends Rejection_1.default {
  constructor(threadId, name) {
    super(threadId, {
      key: 'rejection-game-is-full',
      params: { name },
    });
  }
}

class PlayerAlreadyJoined extends Rejection_1.default {
  constructor(threadId, gameName, playerName) {
    super(threadId, {
      key: 'rejection-player-already-joined',
      params: { gameName, playerName },
    });
  }
}

class InvalidPlayer extends Rejection_1.default {
  constructor(threadId, gameName, playerName) {
    super(threadId, {
      key: 'rejection-invalid-player',
      params: { gameName, playerName },
    });
  }
}

class GameAlreadyStarted extends Rejection_1.default {
  constructor(threadId, gameName) {
    super(threadId, {
      key: 'rejection-game-already-started',
      params: { gameName },
    });
  }
}

class IllegalFaction extends Rejection_1.default {
  constructor(threadId, faction) {
    super(threadId, {
      key: 'rejection-illegal-faction',
      params: { faction },
    });
  }
}

class FactionTaken extends Rejection_1.default {
  constructor(threadId, faction, playerName) {
    super(threadId, {
      key: 'rejection-faction-taken',
      params: { faction, playerName },
    });
  }
}

class Game {
  constructor(name, { factions = [Faction_1.default.marquise, Faction_1.default.eyrie, Faction_1.default.alliance, Faction_1.default.vagabond], assignment = 'auto', map = GameMap_1.default.forest } = {}) {
    this.name = name;
    this.playerNames = [];
    this._clients = {};
    this.factions = factions;
    this.factionData = factions
      .map(faction => factionData_1.default(faction))
      .reduce((collection, faction) => Object.assign(collection, { [faction.faction]: faction }), {});
    this.assignment = assignment;
    this.players = {};
    this.turn = null;
    this.time = Time_1.default.birdsong;
    this.phase = 0;
    this.services = { riverboats: null, mercenaries: null };
    this.cards = shuffle_1.default(factions.includes(Faction_1.default.marquise_bot)
      ? Card_1.default.filter(card => !Card_1.Card.isDominance(card))
      : Card_1.default.filter(card => !Card_1.Card.isSpy(card)));
    this.discards = [];
    this.quests = shuffle_1.default([...Quest_1.default]);
    this.items = [...Item_1.default];
    this.questsAvailable = [];
    switch (map) {
      case GameMap_1.default.forest:
        this.board = new Forest_1.default();
        break;
      case GameMap_1.default.winter:
        throw new Error('unimplemented');
      default:
        throw new UnsupportedSettings({ factions, assignment, map });
    }
    this.dice = [0, 0];
  }

  get clients() {
    return Object.values(this._clients)
      .map(clientId => clients_1.default.get(clientId))
      .filter((client) => !!client);
  }

  get isFull() {
    return this.playerNames.length === this.factions.filter(faction => faction !== Faction_1.default.marquise_bot).length;
  }

  get allReady() {
    return Object.values(this.players).every(player => player.ready) && this.isFull;
  }

  async sendTo(faction, message, data) {
    const { username } = Object.values(this.players)
      .find(player => player.faction === faction);
    const id = this._clients[username];
    const client = clients_1.default.get(id);
    if (client) {
      return client.send(message, data);
    }
    return undefined;
  }

  notify() {
    for (const client of this.clients) {
      client.notify(Message_1.default.direct('gameUpdated'));
    }
  }

  addPlayer(client, threadId) {
    if (this.isFull) {
      throw new GameIsFull(threadId, this.name);
    }
    if (this.playerNames.includes(client.username)) {
      throw new PlayerAlreadyJoined(threadId, this.name, client.username);
    }
    this.playerNames.push(client.username);
    this.players[client.username] = new Player_1.default(client.username);
    this.addClient(client, threadId);
  }

  addClient(client, threadId) {
    if (!this.players[client.username]) {
      throw new InvalidPlayer(threadId, this.name, client.username);
    }
    this._clients[client.username] = client.id;
    this.notify();
  }

  removePlayer(client, threadId) {
    if (this.turn !== null) {
      if (!threadId) {
        return;
      }
      throw new GameAlreadyStarted(threadId, this.name);
    }
    const playerIndex = this.playerNames.indexOf(client.username);
    if (playerIndex === -1) {
      if (!threadId) {
        return;
      }
      throw new InvalidPlayer(threadId, this.name, client.username);
    }
    this.removeClient(client);
    this.playerNames.splice(playerIndex, 1);
    delete this.players[client.username];
    this.notify();
    if (this.playerNames.length === 0) {
      console.log(`Discarding game ${this.name}`);
      games_1.default.delete(this.name);
    }
  }

  removeClient(client) {
    delete this._clients[client.username];
    this.notify();
  }

  setReady(client, ready, threadId) {
    this.batchUpdates(() => {
      if (!this.players[client.username]) {
        throw new InvalidPlayer(threadId, this.name, client.username);
      }
      this.players[client.username].ready = ready;
      if (this.allReady) {
        this.setupGame(threadId);
      }
    });
  }

  setupGame(threadId) {
    this.playerNames = shuffle_1.default(this.playerNames);
    this.turn = -this.factions.length;
    if (this.assignment === 'auto') {
      const factions = shuffle_1.default(this.factions);
      for (let i = 0; i < factions.length; ++i) {
        this.players[this.playerNames[i]].faction = factions[i];
      }
    }
    for (const faction of this.factions) {
      try {
        this.drawCard(faction, 3, threadId);
      } catch (e) {
        if (e instanceof PoorManualDexterity) {
          continue;
        }
        throw e;
      }
    }
  }

  setFaction(client, faction, threadId) {
    if (!this.players[client.username]) {
      throw new InvalidPlayer(threadId, this.name, client.username);
    }
    if (!this.factions.includes(faction)) {
      throw new IllegalFaction(threadId, faction);
    }
    const takenBy = Object.values(this.players)
      .find(player => player.faction === faction);
    if (takenBy) {
      throw new FactionTaken(threadId, faction, takenBy.username);
    }
    this.players[client.username].faction = faction;
    this.notify();
  }

  nextTurn() {
    ++this.turn;
    this.time = Time_1.default.birdsong;
    this.phase = 0;
    this.services = {
      riverboats: null,
      mercenaries: null,
    };
    this.notify();
  }

  nextTime(time) {
    this.time = time;
    this.phase = 0;
    this.notify();
  }

  nextPhase() {
    ++this.phase;
    this.notify();
  }

  takeCards(count = 1) {
    const drawn = this.cards.splice(0, count);
    if (drawn.length !== count) {
      this.cards = shuffle_1.default(this.discards);
      this.discards = [];
      return [...drawn, ...this.takeCards(count - drawn.length)];
    }
    return drawn;
  }

  drawCard(faction, count = 1, threadId) {
    const factionData = this.factionData[faction];
    if (!factionData) {
      throw new IllegalFaction(threadId, faction);
    }
    if (factionData instanceof MarquiseBot_1.default) {
      throw new PoorManualDexterity;
    }
    const cards = this.takeCards(count);
    factionData.hand.push(...cards);
    this.notify();
  }

  discard(...cards) {
    for (const card of cards) {
      if (this.factions.includes(Faction_1.default.cult)) {
        this.factionData.cult.lostSouls.push(card);
      } else {
        this.discards.push(card);
      }
    }
    this.notify();
  }

  rollDice() {
    this.dice = [
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4),
    ];
    this.dice.sort();
    this.notify();
    return this.dice;
  }

  toJSON() {
    const object = { ...this };
    delete object._clients;
    object.cards = this.cards.length;
    object.quests = this.quests.length;
    return object;
  }

  batchUpdates(handler) {
    this.notify = () => { };
    try {
      handler();
    } finally {
      delete this.notify;
      this.notify();
    }
  }
}

exports.default = Game;
