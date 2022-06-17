<script lang="ts">
  import { Game } from './engine';
  const game = new Game({ x: 10, y: 10 });

  function startGame() {
    game.start();
  }
</script>

<main>
  {#each { length: game.config.y } as _, yi}
    <div class="row">
      {#each { length: game.config.x } as _, xi}
        {#if xi === game.snake.position.x && yi === game.snake.position.y}
          <div class="field">*</div>
        {:else}
          <div class="field" />
        {/if}
      {/each}
    </div>
  {/each}

  <button on:click={startGame}> Start game </button>
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
