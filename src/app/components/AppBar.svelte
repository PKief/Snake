<script lang="ts">
  import IconButton from '@smui/icon-button';
  import { Title } from '@smui/top-app-bar';
  import { getContext } from 'svelte';
  import { gameState } from '../stores';

  const { getGame } = getContext('game');
  const game = getGame();

  const startGame = () => {
    game.start();
  };

  const restartGame = () => {
    game.restart();
  };

  const pauseGame = () => {
    game.pause();
  };

  const endPause = () => {
    game.endPause();
  };
</script>

{#if $gameState}
  <div class="app-bar">
    <Title>Snake</Title>
    {#if $gameState.status === 'playing'}
      <IconButton class="material-icons" on:click={pauseGame}>pause</IconButton>
    {:else if $gameState.status === 'paused'}
      <IconButton class="material-icons" on:click={endPause}
        >play_arrow</IconButton
      >
    {:else if $gameState.status === 'stopped'}
      <IconButton class="material-icons" on:click={restartGame}
        >replay</IconButton
      >
    {:else if $gameState.status === 'initial'}
      <IconButton class="material-icons" on:click={startGame}
        >play_arrow</IconButton
      >
    {/if}
    <IconButton class="material-icons">share</IconButton>
  </div>
{/if}

<style>
  .app-bar {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 4rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
