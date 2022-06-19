import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { Mouse } from './mouse';
import { Position } from './position';
import { Snake } from './snake';
import { GameConfig, GameFieldType, GameState } from './types';
import { createPausableTimer } from './utils';

export class Game {
  config: GameConfig;
  mouse: Mouse;
  snake: Snake;
  gameState: BehaviorSubject<GameState>;
  paused = new BehaviorSubject<boolean>(false);

  private intervalSubscription: Subscription | undefined;
  private readonly keyPress$ = fromEvent<KeyboardEvent>(document, 'keyup');

  constructor(config: GameConfig) {
    this.snake = new Snake(new Position(1, 1), 3);
    this.mouse = new Mouse(new Position(0, 0));
    this.config = config;
    this.gameState = new BehaviorSubject<GameState>({
      fields: [],
      gameOver: false,
      score: 0,
      status: 'stopped',
    });

    this.keyPress$.subscribe((event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          this.snake.switchDirection('up');
          break;
        case 'ArrowDown':
          this.snake.switchDirection('down');
          break;
        case 'ArrowLeft':
          this.snake.switchDirection('left');
          break;
        case 'ArrowRight':
          this.snake.switchDirection('right');
          break;
      }
    });
  }

  start(): void {
    this.gameState.next({
      ...this.gameState.value,
      status: 'playing',
    });
    this.generateRandomMousePosition();

    this.intervalSubscription = createPausableTimer(this.paused).subscribe(
      () => {
        this.snake.move();

        const snakeHitsWall =
          this.snake.head.x < 0 ||
          this.snake.head.x >= this.config.x ||
          this.snake.head.y < 0 ||
          this.snake.head.y >= this.config.y;

        const snakeBitesItself = this.snake.parts.some(
          (part, index) =>
            part.x === this.snake.head.x &&
            part.y === this.snake.head.y &&
            index > 0
        );

        if (snakeHitsWall || snakeBitesItself) {
          this.endGame();
          return;
        }

        const snakeHitsMouse =
          this.snake.head.x === this.mouse.position.x &&
          this.snake.head.y === this.mouse.position.y;

        if (snakeHitsMouse) {
          this.snake.eatMouse();
          this.updateScore(1);
          this.generateRandomMousePosition();
        }

        this.rerender();
      }
    );
  }

  pause(): void {
    this.paused.next(true);
    this.gameState.next({
      ...this.gameState.value,
      status: 'paused',
    });
  }

  endPause(): void {
    this.paused.next(false);
    this.gameState.next({
      ...this.gameState.value,
      status: 'playing',
    });
  }

  restart(): void {
    this.stop();
    this.snake = new Snake(new Position(1, 1), 3);
    this.mouse = new Mouse(new Position(0, 0));
    this.updateScore(0);
    this.start();
  }

  private stop(): void {
    this.gameState.next({
      ...this.gameState.value,
      status: 'stopped',
    });
    this.intervalSubscription?.unsubscribe();
  }

  private rerender() {
    this.gameState.next({
      ...this.gameState.value,
      fields: this.getGameFields(),
    });
  }

  private updateScore(update: number) {
    this.gameState.next({
      ...this.gameState.value,
      score: this.gameState.value.score + update,
    });
  }

  private endGame() {
    this.stop();
    this.gameState.next({
      ...this.gameState.value,
      gameOver: true,
    });
  }

  private getGameFields(): GameFieldType[][] {
    const gameFields: GameFieldType[][] = [];
    for (let y = 0; y < this.config.y; y++) {
      gameFields[y] = [];
      for (let x = 0; x < this.config.x; x++) {
        gameFields[y][x] = 'Field';
      }
    }
    gameFields[this.mouse.position.y][this.mouse.position.x] = 'Mouse';
    gameFields[this.snake.head.y][this.snake.head.x] = 'SnakeHead';
    for (const bodyPart of this.snake.parts.slice(1)) {
      gameFields[bodyPart.y][bodyPart.x] = 'SnakeBody';
    }

    return gameFields;
  }

  private generateRandomMousePosition() {
    const lastMousePosition = this.mouse.position;
    while (true) {
      const x = Math.floor(Math.random() * this.config.x);
      const y = Math.floor(Math.random() * this.config.y);
      const noPositionConflictsWithSnake = this.snake.parts.every(
        (part) => part.x !== x || part.y !== y
      );
      const notLastMousePosition =
        lastMousePosition.x !== x || lastMousePosition.y !== y;

      if (noPositionConflictsWithSnake && notLastMousePosition) {
        this.mouse.position = new Position(x, y);
        break;
      }
    }
  }
}
