<script>
import { createEventDispatcher } from 'svelte';
import Text from './component/Text.svelte';
import Message from '../model/Message';
import GameMap from '../model/GameMap';
import Faction from '../model/Faction';

const dispatch = createEventDispatcher();

let name = '';
let factions = [Faction.marquise, Faction.eyrie, Faction.alliance, Faction.vagabond];
let assignment = 'auto';
let map = 'forest';
$: valid = name
  && factions.length >= 2
  // marquise cannot fight their own bot
  && !(factions.includes(Faction.marquise) && factions.includes(Faction.marquise_bot));
$: settings = { factions, assignment, map };

export let client;

function create() {
  client.notify(Message.direct('CreateGameForm:create', { name, settings }))
}
</script>

<button
  class='button back'
  on:click={() => dispatch('back')}>
  <Text text='back' />
</button>
<h1 class='heading'><Text text='game-name' /></h1>
<!-- TODO [l10n]: the placeholder is not localized -->
<input
  class='input'
  placeholder='Name'
  autofocus
  bind:value={name} />
<h1 class='heading'><Text text='options' /></h1>
<div class='options'>
  <fieldset>
    <legend><Text text='available-factions' /></legend>
    {#each Object.values(Faction) as faction}
      <label>
        <input
          type='checkbox'
          bind:group={factions}
          value={faction} />
        <Text text={faction} params={{ form: 'long' }}/>
      </label>
    {/each}
  </fieldset>
  <div class='flex'>
    <fieldset>
      <legend><Text text='faction-assignment' /></legend>
      <label><input type='radio' bind:group={assignment} value='auto' /> <Text text='random' /></label>
      <label><input type='radio' bind:group={assignment} value='choose' /> <Text text='choose' /></label>
    </fieldset>
    <fieldset>
      <legend><Text text='map' /></legend>
      {#each Object.values(GameMap) as gameMap}
        <label><input type='radio' bind:group={map} value={gameMap} /> <Text text={gameMap} /></label>
      {/each}
    </fieldset>
  </div>
</div>
<button
  class='button'
  disabled={!valid}
  on:click={create}>
  <Text text='create' />
</button>

<style>
.heading {
  font-family: var(--font-family--display);
  font-size: 20px;
  font-weight: 400;
}

.input, .button {
  box-sizing: border-box;
  padding: 8px;
  border: none;
  background-color: transparent;
}

.button {
  align-self: flex-end;
  cursor: pointer;
  font-family: var(--font-family--display);
  color: var(--color--accent);
  font-size: 16px;
}

.button:hover {
  color: var(--color--accent__hover);
}

.button.main {
  font-size: 20px;
  width: 100%;
  height: 100px;
}

.button.back {
  align-self: flex-start;
}

.button:disabled {
  cursor: default;
  color: var(--color--text);
  opacity: 0.6;
}

.input {
  width: 100%;
  border-bottom: 1px solid var(--color--accent);
  font-family: var(--font-family--body);
  font-size: 16px;
}

.options {
  display: flex;
  align-items: flex-start;
}

label {
  display: block;
}
</style>
