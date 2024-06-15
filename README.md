# Rock-Paper-Scissors Game

This application is a dynamic Rock-Paper-Scissors game developed using React and
TypeScript.

## Game Instructions

Welcome to the Rock-Paper-Scissors Game!

In this game, you will encounter a dynamic environment where different elements
move freely within a box. These elements can be either Rock, Paper, or Scissors,
and they interact with each other in unique ways based on the classic rules of
Rock-Paper-Scissors. Here’s how the game works:

### Elements:

- **Rock**
- **Paper**
- **Scissors**

### Game Mechanics:

1. **Movement**:

   - All elements move freely within the boundaries of the box.
   - Each element travels in random directions and can change direction upon
     hitting the box's edges.

2. **Interactions**:

   - When two elements touch each other, they undergo a transformation based on
     the rules of Rock-Paper-Scissors:
     - **Rock vs. Paper**: The Rock transforms into Paper.
     - **Paper vs. Scissors**: The Paper transforms into Scissors.
     - **Scissors vs. Rock**: The Scissors transforms into Rock.
   - When identical elements touch, they remain the same (e.g., Rock touching
     another Rock stays as Rock).
   - The element that "wins" in the interaction causes the other element to
     transform into its type.

### Objective:

The main objective of the game is to observe how elements interact and transform
within the box. You can enjoy watching the endless transformations as elements
continue to move and interact according to the rules.

Feel free to sit back, relax, and enjoy the mesmerizing dance of Rock, Paper,
and Scissors as they perpetually change and evolve within the game.

Have fun!

## Installation and Running the Application

This application uses pnpm as its package manager. Follow the instructions below
to set up and run the application.

### Prerequisites

Make sure you have pnpm installed. If not, you can install it globally using
npm:

```sh
npm install -g pnpm
```

### Cloning the repo

Clone the repository and install the dependencies:

```sh
git clone https://github.com/40fathoms/rock-paper-scissors.git
cd rock-paper-scissors
pnpm install
```

### Running the Application

Start the development server:

```sh
pnpm dev
```

This will start the application in development mode
