<script lang="ts">
  import IconButton from '@smui/icon-button';
  import { Title } from '@smui/top-app-bar';
  import '../../styles/styles.scss';
  import { Game } from '../game';
  import StatusBar from './StatusBar.svelte';
  import { gameState } from '../stores';

  const game = new Game({ x: 6, y: 8 });

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

<header>
  <Title>Snake</Title>
  {#if $gameState.status === 'playing'}
    <IconButton class="material-icons" on:click={pauseGame}>pause</IconButton>
  {:else if $gameState.status === 'paused'}
    <IconButton class="material-icons" on:click={endPause}
      >play_arrow</IconButton
    >
  {:else if $gameState.status === 'stopped'}
    <IconButton class="material-icons" on:click={restartGame}>replay</IconButton
    >
  {:else if $gameState.status === 'initial'}
    <IconButton class="material-icons" on:click={startGame}
      >play_arrow</IconButton
    >
  {/if}
  <IconButton class="material-icons">share</IconButton>
</header>

<StatusBar />

<main>
  {#each $gameState.fields as row}
    <div class="row">
      {#each row as field}
        <div class="field">
          {#if field === 'SnakeHead'}
            <div class="snake-head" />
          {:else if field === 'SnakeBody'}
            <div class="snake-body" />
          {:else if field === 'SnakeTail'}
            <div class="snake-tail" />
          {:else if field === 'Food'}
            <div class="food">🍎</div>
          {:else}
            <div class="empty" />
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    @media (min-width: 640px) {
      max-width: none;
    }
  }
</style>
