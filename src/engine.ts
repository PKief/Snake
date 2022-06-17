import { fromEvent, interval, Subscription } from 'rxjs';
import './styles/styles.scss';

const snakeGameField = [
  [2, 1, 0, -1],
  [-1, -1, -1, -1],
  [-1, -1, 'x', -1],
  [-1, -1, -1, -1],
];

class Mouse {
  position: Position;

  constructor(position: Position) {
    this.position = position;
  }
}

class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

type Direction = 'up' | 'down' | 'left' | 'right';

class Snake {
  size: number = 1;
  position: Position;
  direction: Direction = 'right';

  constructor(position: Position) {
    this.position = position;
  }

  eatMouse(): void {
    this.size++;
  }

  switchDirection(direction: Direction): void {
    this.direction = direction;
  }

  move(): void {
    switch (this.direction) {
      case 'up':
        this.position = new Position(this.position.x, this.position.y - 1);
        break;
      case 'down':
        this.position = new Position(this.position.x, this.position.y + 1);
        break;
      case 'left':
        this.position = new Position(this.position.x - 1, this.position.y);
        break;
      case 'right':
        this.position = new Position(this.position.x + 1, this.position.y);
        break;
    }
  }
}

type GameConfig = {
  x: number;
  y: number;
};

export class Game {
  config: GameConfig;
  gameOver: boolean;
  score: number;
  mouse: Mouse;
  snake: Snake;
  private readonly interval$ = interval(1000);
  private intervalSubscription: Subscription | undefined;
  private readonly keyPress$ = fromEvent<KeyboardEvent>(document, 'keyup');

  constructor(config: GameConfig) {
    this.snake = new Snake(new Position(0, 0));
    this.mouse = new Mouse(new Position(0, 0));
    this.score = 0;
    this.gameOver = false;
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
    this.intervalSubscription = this.interval$.subscribe(() => {
      console.log(this.snake.position);
      this.snake.move();
      if (
        this.snake.position.x === this.mouse.position.x &&
        this.snake.position.y === this.mouse.position.y
      ) {
        this.snake.eatMouse();
        this.score++;
        this.generateRandomMousePosition();
      }
      if (this.snake.position.x < 0 || this.snake.position.x >= this.config.x) {
        this.gameOver = true;
        this.stop();
      } else if (
        this.snake.position.y < 0 ||
        this.snake.position.y >= this.config.y
      ) {
        this.gameOver = true;
        this.stop();
      }
    });
  }

  stop(): void {
    this.intervalSubscription?.unsubscribe();
  }

  private generateRandomMousePosition() {
    this.mouse.position = new Position(
      Math.floor(Math.random() * this.config.x),
      Math.floor(Math.random() * this.config.y)
    );
  }
}
