<script>
import { get } from 'svelte/store';
import { game, username } from '../store';
import cardImages from '../image/card/card-shared-front.*.jpg';
import factionIcons from '../image/token/token.*-icon.png';
import FactionCard from './FactionCard.svelte';

function calcActivePlayerLoaderIndex() {
  let activePlayerIndex = $game.playerNames.indexOf($game.activePlayerName);
  let center = ($game.playerNames.length - 1) / 2;

  return Math.ceil(activePlayerIndex - center);
}

let focusedPlayer = get(username);
let focusedPlayerIndex, activePlayerIndex, activePlayerLoaderIndex;
$: activePlayerLoaderIndex = calcActivePlayerLoaderIndex();
$: focusedPlayerIndex = $game.factions.indexOf($game.players[focusedPlayer].faction);

function cardImage({ key }) {
  return cardImages[key];
}

let width, height;
export let client;
</script>

<div class='table'>
  <div class='pager' style={`--active-player-loader-index: ${activePlayerLoaderIndex}`}>
    <div class='pages' bind:clientWidth={width} bind:clientHeight={height}>
      {#each $game.factions as faction, i (faction)}
        <div class='page'
             style={`transform: translateX(${(i - focusedPlayerIndex) * 100}%); opacity: ${focusedPlayerIndex === i ? 1 : 0}`}>
          <FactionCard {faction} {client} width={width - 40} height={height - 40}/>
        </div>
      {/each}
    </div>
    <div class="taking-turn">
      <div class="taking-turn__circle"></div>
      <div class="taking-turn__circle"></div>
      <div class="taking-turn__circle"></div>
    </div>
    <div class='factions'>
      {#each $game.playerNames as name}
        <img
          class='factions__faction'
          class:current={name === focusedPlayer}
          src={factionIcons[$game.players[name].faction]}
          on:click={() => focusedPlayer = name}
        />
      {/each}
    </div>
  </div>
</div>

<style>
.table {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.shared {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  flex-grow: 0;
  padding: 20px;
}

.shared-deck, .discards-deck {
  margin: 20px;
  width: 183px;
  height: 249px;
}

.pager {
  display: flex;
  flex-direction: column;
  position: relative;
  flex-grow: 1;
  overflow: hidden;

  --faction-icon-width: 60px;
  --faction-icon-margin: 10px;
  --faction-icon-border-width: 3px;
}

.pages {
  width: 100%;
  flex-grow: 1;
}

.page {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 128px);
  padding: 20px;
  transition: opacity 0.2s, transform 0.2s;
}

.factions {
  display: flex;
  flex-basis: var(--faction-icon-width);
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.factions__faction {
  user-select: none;
  cursor: pointer;
  width: var(--faction-icon-width);
  margin: var(--faction-icon-margin);
  border: var(--faction-icon-border-width) solid #000;
  border-radius: 15px;

}

.factions__faction:not(.current) {
  opacity: 0.7;
  border-color: transparent;
}

@keyframes loading {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  80% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}

.taking-turn {
  width: 60px;
  margin: 0 auto;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  transform: translateX(calc(
    var(--active-player-loader-index) *
    calc(var(--faction-icon-width) / 2 + var(--faction-icon-margin) + var(--faction-icon-border-width)))
  );
}

.taking-turn .taking-turn__circle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #000;
  animation: loading 1.5s 0.3s ease-in-out infinite;
}

.taking-turn .taking-turn__circle:nth-last-child(2) {
  animation-delay: 0.2s;
}

.taking-turn .taking-turn__circle:nth-last-child(3) {
  animation-delay: 0.1s;
}

</style>
