import {
  generateRandomCathetuses,
  type CathetusesDirection
} from '@/utils/generateRandomCathetuses';

type ElementTypes = 'rock' | 'paper' | 'scissors';

class Point {
  constructor(
    public x: number,
    public y: number,
    public id: string,
    public options: {
      direction: CathetusesDirection;
      elementType: ElementTypes;
    }
  ) {}
}

class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  contains(point: Point): boolean {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  intersects(range: Rectangle): boolean {
    return !(
      range.x > this.x + this.width ||
      range.x + range.width < this.x ||
      range.y > this.y + this.height ||
      range.y + range.height < this.y
    );
  }
}

class QuadTree {
  boundary: Rectangle;
  capacity: number;
  points: Map<string, Point>;
  divided: boolean;
  northeast: QuadTree | null;
  northwest: QuadTree | null;
  southeast: QuadTree | null;
  southwest: QuadTree | null;

  constructor(boundary: Rectangle, capacity: number) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = new Map();
    this.divided = false;
    this.northeast = null;
    this.northwest = null;
    this.southeast = null;
    this.southwest = null;
  }

  static CreateQuadTree(
    quadTree: QuadTree,
    callback?: (createdQuadTree: QuadTree) => void
  ) {
    for (let i = 0; i < 100; i++) {
      const point = (() => {
        const newElement = Math.floor(Math.random() * 3);

        // rock
        if (newElement === 0) {
          return new Point(190, 50, `${i}`, {
            direction: generateRandomCathetuses(),
            elementType: 'rock'
          });
        }

        // paper
        if (newElement === 1) {
          return new Point(50, 300, `${i}`, {
            direction: generateRandomCathetuses(),
            elementType: 'paper'
          });
        }

        // scissors
        return new Point(300, 300, `${i}`, {
          direction: generateRandomCathetuses(),
          elementType: 'scissors'
        });
      })();

      quadTree.insert(point);
    }

    if (callback) callback(quadTree);
  }

  static GetNumberOfTypes(quadTree: QuadTree) {
    let rock = 0;
    let paper = 0;
    let scissors = 0;

    quadTree.points.forEach((point) => {
      if (point.options.elementType === 'rock') {
        rock++;
      } else if (point.options.elementType === 'paper') {
        paper++;
      } else if (point.options.elementType === 'scissors') {
        scissors++;
      }
    });

    return { rock, paper, scissors };
  }

  subdivide() {
    const { x, y, width, height } = this.boundary;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const ne = new Rectangle(x + halfWidth, y, halfWidth, halfHeight);
    const nw = new Rectangle(x, y, halfWidth, halfHeight);
    const se = new Rectangle(
      x + halfWidth,
      y + halfHeight,
      halfWidth,
      halfHeight
    );
    const sw = new Rectangle(x, y + halfHeight, halfWidth, halfHeight);

    this.northeast = new QuadTree(ne, this.capacity);
    this.northwest = new QuadTree(nw, this.capacity);
    this.southeast = new QuadTree(se, this.capacity);
    this.southwest = new QuadTree(sw, this.capacity);

    this.divided = true;
  }

  insert(point: Point): boolean {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.size < this.capacity) {
      this.points.set(point.id, point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      if (this.northeast!.insert(point)) {
        return true;
      } else if (this.northwest!.insert(point)) {
        return true;
      } else if (this.southeast!.insert(point)) {
        return true;
      } else if (this.southwest!.insert(point)) {
        return true;
      }
    }
    return false;
  }

  update(point: Point): void {
    if (this.points.has(point.id)) {
      this.points.set(point.id, point);
    } else {
      this.insert(point);
    }
  }

  // Check if any point is within range of a given point and return intersecting points
  pointsInRange(point: Point, range: number): Point[] {
    const searchArea = new Rectangle(point.x, point.y, range * 2, range * 2);
    const pointsInRange = this.query(searchArea);
    return pointsInRange.filter(
      (p) => p.id !== point.id && this.distance(point, p) <= range
    );
  }

  // Helper method to calculate the distance between two points
  private distance(point1: Point, point2: Point): number {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
  }

  query(range: Rectangle): Point[] {
    // Query method implementation to find points within a given range
    const found: Point[] = [];
    if (!this.boundary.intersects(range)) {
      return found;
    }

    for (const point of this.points.values()) {
      if (range.contains(point)) {
        found.push(point);
      }
    }

    if (this.divided) {
      // Recursively search in child nodes...
      // Add points found in child nodes to the found array...
    }

    return found;
  }
}

export { QuadTree, Point, Rectangle };
export type { ElementTypes };
