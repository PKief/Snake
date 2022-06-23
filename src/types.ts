export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameConfig = {
  x: number;
  y: number;
};

export type GameState = {
  fields: GameFieldType[][];
  score: number;
  gameOver: boolean;
  status: 'playing' | 'stopped' | 'paused' | 'initial';
};

export type GameFieldType =
  | 'Field'
  | 'Food'
  | 'SnakeHead'
  | 'SnakeBody'
  | 'SnakeTail';
