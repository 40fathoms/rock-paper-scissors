import { Point, type ElementTypes, type QuadTree } from './QuadTree';

class RockPaperScissorPoints {
  public createdPoints: Point[];

  constructor(
    pointsToCreate: {
      rock: number;
      paper: number;
      scissors: number;
    },
    options: {
      screenWidth: number;
    }
  ) {
    const rockInitialCoordinates = this.getInitialPointsCoordinates(
      'rock',
      options.screenWidth
    );

    const paperInitialCoordinates = this.getInitialPointsCoordinates(
      'paper',
      options.screenWidth
    );

    const scissorsInitialCoordinates = this.getInitialPointsCoordinates(
      'scissors',
      options.screenWidth
    );

    const rockPoints = Array.from(
      { length: pointsToCreate.rock },
      (_element, index) =>
        new Point(
          rockInitialCoordinates.x,
          rockInitialCoordinates.y,
          `rock-${index}`,
          'rock'
        )
    );
    const paperPoints = Array.from(
      { length: pointsToCreate.paper },
      (_element, index) =>
        new Point(
          paperInitialCoordinates.x,
          paperInitialCoordinates.y,
          `paper-${index}`,
          'paper'
        )
    );
    const scissorsPoints = Array.from(
      { length: pointsToCreate.scissors },
      (_element, index) =>
        new Point(
          scissorsInitialCoordinates.x,
          scissorsInitialCoordinates.y,
          `scissors-${index}`,
          'scissors'
        )
    );

    this.createdPoints = rockPoints.concat(paperPoints).concat(scissorsPoints);
  }

  /**
   * Returns the initial coordinates for a point based on its type and screen width.
   *
   * @param {ElementTypes} elementType - The type of the element.
   * @param {number} screenWidth - The width of the screen.
   * @return {{x: number; y: number}} - The initial coordinates of the point.
   */
  private getInitialPointsCoordinates(
    elementType: ElementTypes,
    screenWidth: number
  ): {
    x: number;
    y: number;
  } {
    if (elementType === 'rock') {
      return {
        x: screenWidth > 640 ? 240 : 190,
        y: screenWidth > 640 ? 50 : 50
      };
    }

    if (elementType === 'paper') {
      return {
        x: screenWidth > 640 ? 50 : 50,
        y: screenWidth > 640 ? 430 : 300
      };
    }

    if (elementType === 'scissors') {
      return {
        x: screenWidth > 640 ? 420 : 300,
        y: screenWidth > 640 ? 430 : 300
      };
    }

    return {
      x: 0,
      y: 0
    };
  }

  /**
   * Determines the new element type based on the current type and the intersecting type.
   *
   * @param {ElementTypes} currentType - the current element type.
   * @param {ElementTypes} intersectingType - the intersecting element type.
   * @returns {ElementTypes} the new element type.
   */
  static determineNewElementType(
    currentType: ElementTypes,
    intersectingType: ElementTypes
  ): ElementTypes {
    if (currentType === 'rock' && intersectingType === 'scissors') {
      return 'rock';
    } else if (currentType === 'rock' && intersectingType === 'paper') {
      return 'paper';
    } else if (currentType === 'scissors' && intersectingType === 'paper') {
      return 'scissors';
    } else if (currentType === 'scissors' && intersectingType === 'rock') {
      return 'rock';
    } else if (currentType === 'paper' && intersectingType === 'rock') {
      return 'paper';
    } else if (currentType === 'paper' && intersectingType === 'scissors') {
      return 'scissors';
    }
    return currentType;
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
  static GetNumberOfTypes(quadTree: QuadTree): {
    rock: number;
    paper: number;
    scissors: number;
  } {
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
}

export { RockPaperScissorPoints };
