<script lang="ts">
  import { gameState } from '../stores';
</script>

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

<style>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .field {
      width: 2rem;
      height: 2rem;
      background-color: #a5e270;
      margin: 2px;
      display: flex;
      justify-content: center;
      align-items: center;

      .snake-head {
        background: rgb(0, 0, 0);
        border-radius: 50%;
        width: 50%;
        height: 50%;
      }

      .snake-body {
        background: rgb(0, 0, 0);
        border-radius: 50%;
        width: 40%;
        height: 40%;
      }

      .snake-tail {
        background: rgb(0, 0, 0);
        border-radius: 50%;
        width: 20%;
        height: 20%;
      }
    }

    &:nth-child(odd) .field:nth-child(even) {
      background: rgb(198 239 167);
    }
    &:nth-child(even) .field:nth-child(odd) {
      background: rgb(198 239 167);
    }
  }
</style>
