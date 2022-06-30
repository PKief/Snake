export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameConfig = {
  x: number;
  y: number;
};

export type GameState = {
  fields: GameField[][];
  score: number;
  gameOver: boolean;
  status: 'playing' | 'stopped' | 'paused' | 'initial';
};

export type GameField = {
  id: string;
  type: GameFieldType;
};

export type GameFieldType =
  | 'Field'
  | 'Food'
  | 'SnakeHead'
  | 'SnakeBody'
  | 'SnakeTail';
