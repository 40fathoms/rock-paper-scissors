type ElementTypes = 'rock' | 'paper' | 'scissors';

class Point {
  constructor(
    public x: number,
    public y: number,
    public id: string,
    public elementType: ElementTypes
  ) {}
}

class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  /**
   * Checks if a given point is contained within the rectangle.
   *
   * @param {Point} point - The point to check.
   * @return {boolean} `true` if the point is contained within the rectangle,
   *                   `false` otherwise.
   */
  contains(point: Point): boolean {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  /**
   * Checks if a given rectangle intersects with this rectangle.
   *
   * @param {Rectangle} range - The rectangle to check.
   * @return {boolean} `true` if the rectangles intersect, `false` otherwise.
   */
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
          return new Point(190, 50, `${i}`, 'rock');
        }

        // paper
        if (newElement === 1) {
          return new Point(50, 300, `${i}`, 'paper');
        }

        // scissors
        return new Point(300, 300, `${i}`, 'scissors');
      })();

      quadTree.insert(point);
    }

    if (callback) callback(quadTree);
  }

  /**
   * Returns an object containing the number of rock, paper, and scissors points
   * in the given QuadTree.
   *
   * @param {QuadTree} quadTree - The QuadTree to count the types of points in.
   * @return {Object} An object containing the number of rock, paper, and scissors
   * points in the given QuadTree.
   * @property {number} rock - The number of rock points in the QuadTree.
   * @property {number} paper - The number of paper points in the QuadTree.
   * @property {number} scissors - The number of scissors points in the QuadTree.
   */
  static GetNumberOfTypes(quadTree: QuadTree) {
    let rock = 0;
    let paper = 0;
    let scissors = 0;

    quadTree.points.forEach((point) => {
      if (point.elementType === 'rock') {
        rock++;
      } else if (point.elementType === 'paper') {
        paper++;
      } else if (point.elementType === 'scissors') {
        scissors++;
      }
    });

    return { rock, paper, scissors };
  }

  /**
   * Subdivides the QuadTree into four child QuadTrees.
   *
   * This method creates four child QuadTrees that are each one quarter the size
   * of the current QuadTree, and sets their boundaries accordingly. This method
   * also sets the `divided` property to true.
   *
   * @return {void}
   */
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

  /**
   * Inserts a point into the QuadTree.
   *
   * The point is inserted into the appropriate child QuadTree if the current
   * QuadTree is already divided. If the current QuadTree is not divided, it
   * attempts to insert the point into the current QuadTree. If the current
   * QuadTree is full, the point is not inserted.
   *
   * @param {Point} point - The point to be inserted into the QuadTree.
   * @return {boolean} - Returns true if the point was successfully inserted,
   * false otherwise.
   */
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

  /**
   * Updates a point in the QuadTree.
   *
   * If the point already exists in the QuadTree, it is updated. If the point does
   * not exist in the QuadTree, it is inserted.
   *
   * @param {Point} point - The point to be updated or inserted into the QuadTree.
   * @return {void}
   */
  update(point: Point): void {
    if (this.points.has(point.id)) {
      this.points.set(point.id, point);
    } else {
      this.insert(point);
    }
  }

  /**
   * Calculates the distance between two points.
   *
   * @param {Point} point1 - The first point.
   * @param {Point} point2 - The second point.
   * @return {number} The distance between the two points.
   */
  private pointsDistance(point1: Point, point2: Point): number {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
  }

  /**
   * Returns an array of points within a given range of a specified point.
   *
   * @param {Point} point - The point to calculate the range from.
   * @param {number} range - The range of distance to search.
   * @return {Point[]} An array of points within the given range of the specified point.
   */
  pointsInRange(point: Point, range: number): Point[] {
    const searchArea = new Rectangle(point.x, point.y, range * 2, range * 2);
    const pointsInRange = this.query(searchArea);
    return pointsInRange.filter(
      (p) => p.id !== point.id && this.pointsDistance(point, p) <= range
    );
  }

  /**
   * Returns all points in the QuadTree that intersect the given Rectangle.
   *
   * @param {Rectangle} range - The Rectangle to search in.
   * @return {Point[]} An array of points that intersect the given Rectangle.
   */
  query(range: Rectangle): Point[] {
    const found: Point[] = [];
    if (!this.boundary.intersects(range)) {
      return found;
    }

    for (const point of this.points.values()) {
      if (range.contains(point)) {
        found.push(point);
      }
    }

    return found;
  }
}

export { QuadTree, Point, Rectangle };
export type { ElementTypes };
