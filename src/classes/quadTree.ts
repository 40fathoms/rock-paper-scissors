class Point {
  constructor(
    public x: number,
    public y: number,
    public id: string
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

  query(
    range: Rectangle,
    found: Map<string, Point> = new Map()
  ): Map<string, Point> {
    if (!this.boundary.intersects(range)) {
      return found;
    } else {
      for (const point of this.points.values()) {
        if (range.contains(point)) {
          found.set(point.id, point);
        }
      }

      if (this.divided) {
        this.northeast!.query(range, found);
        this.northwest!.query(range, found);
        this.southeast!.query(range, found);
        this.southwest!.query(range, found);
      }

      return found;
    }
  }
}

export { QuadTree, Point, Rectangle };
