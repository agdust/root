<script>
import { game, username, prompts } from '../store';
import Board from './Board.svelte';
import PlayArea from './PlayArea.svelte';
import FactionPicker from './FactionPicker.svelte';
import TablePrompts from './TablePrompts.svelte';

let windowWidth, windowHeight, boardHeight, boardWidth, expanded;
$: boardHeight = windowHeight;
$: boardWidth = windowWidth - 350;

export let client;
$: expanded = $prompts && ($prompts.prices || $prompts.outcast);
</script>

<div class='table'>
  <div class="card-buttons">
    <button class="card-buttons__button">Discard {$game.discards.length}</button>
    <button class="card-buttons__button">
      Deck
      {#if $game.cards > 0 }
        { $game.cards }
      {/if}
    </button>
  </div>
  <div class='board' style={`width: ${boardWidth}px`}>
    <Board tableWidth={boardWidth} tableHeight={boardHeight} {client}/>
  </div>
  <div class={`play-area ${$game.players[$username].faction}`} class:expanded>
    <PlayArea tableWidth={boardWidth} tableHeight={boardHeight} {client}/>
  </div>
  <div class='prompts'>
    <TablePrompts {client}/>
  </div>
</div>
{#if $game.players[$username].faction === null}
  <FactionPicker {client}/>
{/if}

<svelte:window
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}/>

<style>
.table {
  position: relative;
  width: 100%;
  height: 100%;
}

.board {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 350px;
}

.play-area {
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  z-index: 1;
  width: calc(100% - 350px);
  transform: translateX(-350px);
  transition: transform 0.2s;
  background-size: 20%;
}

.play-area.marquise {
  background-image: url('../image/pattern-marquise.jpg');
}

.play-area.eyrie {
  background-image: url('../image/pattern-eyrie.jpg');
}

.play-area.alliance {
  background-image: url('../image/pattern-alliance.jpg');
}

.play-area.vagabond {
  background-image: url('../image/pattern-vagabond.jpg');
}

.play-area:hover, .play-area.expanded {
  transform: translateX(-100%);
}

.prompts {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.card-buttons {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 100;
}

.card-buttons__button {
  width: 130px;
  display: block;
}

.card-buttons__button + .card-buttons__button {
  margin-top: 5px;
}
</style>
