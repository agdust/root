<script>
import { fly } from 'svelte/transition';
import { username, game } from '../../store';
import logo from '../../image/logo.png';
import Loading from '../component/Loading.svelte';
import IdentificationForm from './IdentificationForm.svelte';
import ChooseGameForm from './ChooseGameForm.svelte';
import Lobby from './Lobby.svelte';
import Text from '../component/Text.svelte';
import { setLang } from '../../localization';
import { Langs } from '../../localization';

export let client;

</script>

<style>
.lang-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.lang-buttons__button {
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  font-family: var(--font-family--display);
  color: var(--color--accent);
  background-color: var(--color--background);
  border: 1px solid var(--color--accent);
  font-size: 16px;
}

.lang-buttons__button + .lang-buttons__button {
  margin-left: 5px;
}

.cover {
  width: 100vw;
  height: 100vh;
  background-image: url('../../image/cover.jpg');
  background-size: cover;
  background-position: center;
  font-family: var(--font-family--body);
}

.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>

<div class='cover'>
  {#if client}
    <div class='contents' in:fly='{{ delay: 250, y: -100, duration: 2000 }}'>
      <img src={logo}/>
      {#if !$username}
        <IdentificationForm {client}/>
      {:else if !$game}
        <ChooseGameForm {client}/>
      {:else}
        <Lobby {client}/>
      {/if}

      <div class="lang-buttons">
        {#each Object.keys(Langs) as lang}
          <button class='button lang-buttons__button'
                  on:click={() => setLang(lang)}>
            { Langs[lang] }
          </button>
        {/each}
      </div>
    </div>
  {:else}
    <Loading text='connecting'/>
  {/if}
</div>
