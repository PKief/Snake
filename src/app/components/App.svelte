<script lang="ts">
  import { setContext } from 'svelte';
  import '../../styles/styles.scss';
  import { Game } from '../game';
  import AppBar from './AppBar.svelte';
  import GameFields from './GameFields.svelte';
  import StatusBar from './StatusBar.svelte';

  const game = new Game({ x: 6, y: 8 });
  setContext('game', {
    getGame: () => game,
  });
</script>

<header>
  <AppBar />
  <StatusBar />
</header>

<main>
  <GameFields />
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
