<script lang="ts">
  import { quintOut } from 'svelte/easing';

  import { crossfade } from 'svelte/transition';
  import { gameState } from '../stores';

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });
</script>

{#each $gameState.fields as row}
  <div class="row">
    {#each row as field}
      <div class="field">
        {#if field.type === 'SnakeHead'}
          <div
            class="snake-head"
            in:receive={{ key: field.id }}
            out:send={{ key: field.id }}
          />
        {:else if field.type === 'SnakeBody'}
          <div class="snake-body" />
        {:else if field.type === 'SnakeTail'}
          <div
            class="snake-tail"
            in:receive={{ key: field.id }}
            out:send={{ key: field.id }}
          />
        {:else if field.type === 'Food'}
          <div
            class="food"
            in:receive={{ key: field.id }}
            out:send={{ key: field.id }}
          >
            🍎
          </div>
        {:else}
          <div class="empty" />
        {/if}
      </div>
    {/each}
  </div>
{/each}

<style lang="scss">
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
      position: relative;

      .snake-head {
        position: absolute;
        background: rgb(0, 0, 0);
        border-radius: 50%;
        width: 50%;
        height: 50%;
      }

      .snake-body {
        position: absolute;
        background: rgb(0, 0, 0);
        border-radius: 50%;
        width: 40%;
        height: 40%;
      }

      .snake-tail {
        position: absolute;
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
