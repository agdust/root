<script>
import { game } from '../../store';
import Pieces from '../../model/Piece';
import Faction from '../../model/Faction';
import Piece from '../Piece.svelte';
import CraftedItems from './CraftedItems.svelte';

export let width, height;
$: scale = Math.min(width / 2252, height / 1749);
$: tile = { x: 2032 * scale, y: 754 * scale, dx: 174 * scale, dy: 180 * scale };
$: craftedItems = { x: 1600 * scale, y: 286 * scale, width: 512 };
$: wood = { x: 1205 * scale, y: 1481 * scale };
</script>

<div class='container'>
  <div class='board' style={`width: ${2252 * scale}px; height: ${1749 * scale}px`}>
    {#each new Array($game.factionData.marquise.sawmill).fill(0) as _, i}
      <Piece piece={Pieces.marquise.sawmill} x={tile.x - tile.dx * i} y={tile.y} {scale} />
    {/each}
    {#each new Array($game.factionData.marquise.workshop).fill(0) as _, i}
      <Piece piece={Pieces.marquise.workshop} x={tile.x - tile.dx * i} y={tile.y + tile.dy} {scale} />
    {/each}
    {#each new Array($game.factionData.marquise.recruiter).fill(0) as _, i}
      <Piece piece={Pieces.marquise.recruiter} x={tile.x - tile.dx * i} y={tile.y + 2 * tile.dy} {scale} />
    {/each}
    <Piece piece={Pieces.marquise.wood} x={wood.x} y={wood.y} {scale} stack={$game.factionData.marquise.wood} />
    <CraftedItems {...craftedItems} {scale} items={$game.factionData.marquise.craftedItems} />
  </div>
</div>

<style>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.board {
  position: relative;
  background-image: url('../../image/card-marquise-front.jpg');
  background-size: contain;
  background-attachment: top left;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
</style>
