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
  <span>State: {$gameState.status}</span>
  <span>gameOver: {$gameState.gameOver}</span>
  <span>Score: {$gameState.score}</span>
</header>
<main>
  {#each $gameState.fields as row}
    <div class="row">
      {#each row as field}
        <div class="field">
          {#if field === 'SnakeHead'}
            <div class="snake-head">O</div>
          {:else if field === 'SnakeBody'}
            <div class="snake-body">o</div>
          {:else if field === 'SnakeTail'}
            <div class="snake-tail">-</div>
          {:else if field === 'Food'}
            <div class="food">🍎</div>
          {:else}
            <div class="empty" />
          {/if}
        </div>
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
