<script lang="ts">
  import { Game } from './game';
  import './styles/styles.scss';

  const game = new Game({ x: 10, y: 10 });
  const gameState = game.gameState;

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
  <p>State: {$gameState.status}</p>
  <p>gameOver: {$gameState.gameOver}</p>
  <p>Score: {$gameState.score}</p>
</header>
<main>
  {#each $gameState.fields as row}
    <div class="row">
      {#each row as field}
        {#if field === 'SnakeHead'}
          <div class="field">*</div>
        {:else if field === 'SnakeBody'}
          <div class="field">o</div>
        {:else if field === 'Field'}
          <div class="field" />
        {:else if field === 'Mouse'}
          <div class="field">x</div>
        {/if}
      {/each}
    </div>
  {/each}

  {#if $gameState.gameOver}
    <button on:click={restartGame}>Restart</button>
  {:else if $gameState.status === 'stopped'}
    <button on:click={startGame}>Start</button>
  {/if}
  {#if $gameState.status === 'playing'}
    <button on:click={pauseGame}>Pause</button>
  {/if}

  {#if $gameState.status === 'paused'}
    <button on:click={endPause}>Continue</button>
  {/if}
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
