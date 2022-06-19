import { Position } from './position';
import { Direction } from './types';

export class Snake {
  size: number = 2;
  parts: Position[] = [];
  direction: Direction = 'right';

  get head(): Position {
    return this.parts[0];
  }

  get tail(): Position {
    return this.parts[this.parts.length - 1];
  }

  constructor(startPosition: Position, size?: number) {
    this.size = size;
    this.generateParts(startPosition);
  }

  eatFood(): void {
    this.size++;
    this.parts.push(this.parts[this.parts.length - 1]);
  }

  switchDirection(direction: Direction): void {
    this.direction = direction;
  }

  move(): void {
    this.parts = this.parts.map((part, index) => {
      if (index === 0) {
        if (this.direction === 'up') {
          return new Position(part.x, part.y - 1);
        } else if (this.direction === 'down') {
          return new Position(part.x, part.y + 1);
        } else if (this.direction === 'left') {
          return new Position(part.x - 1, part.y);
        } else if (this.direction === 'right') {
          return new Position(part.x + 1, part.y);
        }
      } else {
        return this.parts[index - 1];
      }
    });
  }

  private generateParts(startPosition: Position): void {
    for (let i = 0; i < this.size; i++) {
      if (this.direction === 'up') {
        this.parts.push(new Position(startPosition.x, startPosition.y + i));
      } else if (this.direction === 'down') {
        this.parts.push(new Position(startPosition.x, startPosition.y - i));
      } else if (this.direction === 'left') {
        this.parts.push(new Position(startPosition.x + i, startPosition.y));
      } else if (this.direction === 'right') {
        this.parts.push(new Position(startPosition.x - i, startPosition.y));
      }
    }
  }
}
