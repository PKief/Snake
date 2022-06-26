<script lang="ts">
  import { gameState } from '../stores';
</script>

{#if $gameState}
  <div class="status-bar">
    <span>Status: {$gameState.status}</span>
    <span>gameOver: {$gameState.gameOver}</span>
    <span>Score: {$gameState.score}</span>
  </div>
{/if}

<style>
  .status-bar {
    background-color: #263238;
    padding: 0.5rem 1rem;
  }
</style>
