import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { createPausableTimer } from '../utils';
import { Food } from './food';
import { Position } from './position';
import { Snake } from './snake';
import { gameState } from './stores';
import { GameConfig, GameField } from './types';

export class Game {
  config: GameConfig;
  food: Food;
  snake: Snake;
  paused = new BehaviorSubject<boolean>(false);

  private intervalSubscription: Subscription | undefined;
  private readonly keyPress$ = fromEvent<KeyboardEvent>(document, 'keyup');

  constructor(config: GameConfig) {
    this.snake = new Snake(new Position(1, 1), 3);
    this.food = new Food(new Position(0, 0));
    this.config = config;

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
    gameState.update((state) => ({
      ...state,
      status: 'playing',
      gameOver: false,
    }));
    this.generateRandomFoodPosition();

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

        const snakeHitsFood =
          this.snake.head.x === this.food.position.x &&
          this.snake.head.y === this.food.position.y;

        if (snakeHitsFood) {
          this.snake.eatFood();
          this.updateScore(1);
          this.generateRandomFoodPosition();
        }

        this.rerender();
      }
    );
  }

  pause(): void {
    this.paused.next(true);
    gameState.update((state) => ({
      ...state,
      status: 'paused',
    }));
  }

  endPause(): void {
    this.paused.next(false);
    gameState.update((state) => ({
      ...state,
      status: 'playing',
    }));
  }

  restart(): void {
    this.stop();
    this.snake = new Snake(new Position(1, 1), 3);
    this.food = new Food(new Position(0, 0));
    this.updateScore(0);
    this.start();
  }

  private stop(): void {
    gameState.update((state) => ({
      ...state,
      status: 'stopped',
    }));
    this.intervalSubscription?.unsubscribe();
  }

  private rerender() {
    gameState.update((state) => ({
      ...state,
      fields: this.getGameFields(),
    }));
  }

  private updateScore(update: number) {
    gameState.update((state) => ({
      ...state,
      score: state.score + update,
    }));
  }

  private endGame() {
    this.stop();
    gameState.update((state) => ({
      ...state,
      gameOver: true,
    }));
  }

  private getGameFields(): GameField[][] {
    const gameFields: GameField[][] = [];
    for (let y = 0; y < this.config.y; y++) {
      gameFields[y] = [];
      for (let x = 0; x < this.config.x; x++) {
        const field: GameField = {
          id: uuidv4(),
          type: 'Field',
        };
        gameFields[y][x] = field;
      }
    }

    const foodField: GameField = {
      id: uuidv4(),
      type: 'Food',
    };
    gameFields[this.food.position.y][this.food.position.x] = foodField;

    for (let i = 0; i < this.snake.parts.length; i++) {
      const part = this.snake.parts[i];
      const type =
        i === 0
          ? 'SnakeHead'
          : i === this.snake.parts.length - 1
          ? 'SnakeTail'
          : 'SnakeBody';

      gameFields[part.y][part.x] = {
        id: uuidv4(),
        type,
      };
    }

    return gameFields;
  }

  private generateRandomFoodPosition() {
    const lastFoodPosition = this.food.position;
    while (true) {
      const x = Math.floor(Math.random() * this.config.x);
      const y = Math.floor(Math.random() * this.config.y);
      const noPositionConflictsWithSnake = this.snake.parts.every(
        (part) => part.x !== x || part.y !== y
      );
      const notLastFoodPosition =
        lastFoodPosition.x !== x || lastFoodPosition.y !== y;

      if (noPositionConflictsWithSnake && notLastFoodPosition) {
        this.food.position = new Position(x, y);
        break;
      }
    }
  }
}
