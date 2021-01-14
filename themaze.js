// 8. Find a way out of the maze
// You have entered a Maze and need to find your way out of it. There are more than one possible paths through the Maze to the single exit point. Write a recursive function that will help you find a possible path through the maze.

// You can use the following mazes to test your program.

// The Maze is represented as a N*M matrix (in the above case, a 3X3 or a 5X7 array). The starting point is the top left corner and the exit is indicated by e. For simplicity purpose, use the bottom right corner of the maze as the exit. You can't go outside the boundaries of the maze. The maze has passages that are blocked and you can't go through them. These blocked passages are indicated by *. Passing through a blocked cell as well as passing though a cell that you have already passed before are forbidden.

// For the above maze, a possible exit path can be RRDDLLDDRRRRRR

let mySmallMaze = [
  [' ', ' ', ' '],
  [' ', '*', ' '],
  [' ', ' ', 'e']
];

let maze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];

const copyMaze = (maze) => {
  const mazeCopy = [];
  maze.forEach(row => {
    mazeCopy.push([...row]);
  });
  return mazeCopy;
};


const getOut = (m) => {
  let steps = [''];

  const travel = (row, column) => {
    let location = m[row][column];

    if (location === 'e') {
      console.log('We did it!!!');
      return steps;
    }

    else if (location === ' ') {
      m[row][column] = '*';

      if (column >= m[row].length - 1 && m[row][column - 1] !== '*') {
        steps += 'L';
        return travel(row, column - 1);
      }

      if (column < m[row].length - 1 && m[row][column + 1] !== '*') {
        steps += 'R';
        return travel(row, column + 1);
      }

      if (row >= m.length - 1 && m[row - 1][column] !== '*') { 
        steps += 'U';
        return travel(row - 1, column);
      }

      if (row < m.length - 1 && m[row + 1][column] !== '*') {
        steps += 'D';
        return travel(row + 1, column);
      }
    }
  };

  return travel(0, 0);
};

console.log(getOut(copyMaze(maze)));

// *----------------------------------------------

const mazeAllPath = (maze, x = 0, y = 0, currentPath = '', paths = []) => {
  const currentRow = maze[y];

  const directions = {
    'R': (x, y) => [x + 1, y],
    'D': (x, y) => [x, y + 1],
    'L': (x, y) => [x - 1, y],
    'U': (x, y) => [x, y - 1]
  };
  
  if(!currentRow) return false;
  const currentSpace = currentRow[x];
  if(!currentSpace) return false;
  if(currentSpace === '*') return false;
  if(currentSpace === 'e') {
    console.log('Path to exit', currentPath);
    paths.push(currentPath);
    return true;
  }

  currentRow[x] = '*';

  for (const [direction, func] of Object.entries(directions)) {
    mazeAllPath(copyMaze(maze), ...func(x, y), currentPath + direction, paths);
  }

  return paths;
};

console.log(mazeAllPath(maze));