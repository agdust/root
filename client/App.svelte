<script>
import { screen } from './store';
import Client from '../model/Client';
import Cover from './view/intro/Cover.svelte';
import Table from './view/Table.svelte';

export let client;
</script>

{#if $screen === 'cover'}
  <Cover {client}/>
{:else if $screen === 'board'}
  <Table {client}/>
{/if}
