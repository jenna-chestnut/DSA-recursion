// Write a recursive function that counts how many sheep jump over the fence. Your program should take a number as input. That number should be the number of sheep you have. The function should display the number along with the message "Another sheep jumps over the fence" until no more sheep are left.

// Input: 3
// Output:
// 3: Another sheep jumps over the fence
// 2: Another sheep jumps over the fence
// 1: Another sheep jumps over the fence
// All sheep jumped over the fence

const theSheep = (n) => {
  if (n <= 0) {
    console.log('All sheep jumped over the fence');
  }
  else {
    console.log(n + ': Another sheep jumps over the fence');
    return theSheep(n - 1);
  }
};

// theSheep(5);

// *----------------------------

// Write a function called powerCalculator() that takes two parameters, an integer as a base, and another integer as an exponent. The function returns the value of the base raised to the power of the exponent. Use only exponents greater than or equal to 0 (positive numbers)

// powerCalculator(10,2) should return 100
// powerCalculator(10,-2) should return exponent should be >= 0

const powerCalculator = (n, e) => {
  if (e < 0) {
    return 'exponent should be >= 0';
  }
  if (e === 0) {
    return 1;
  }
  else {
    return n * powerCalculator(n, e-1);
  }
};

// console.log(powerCalculator(5, 2));
// console.log(powerCalculator(10, -2));

// *-----------------------------------------------------

// 3. Reverse String
// Write a function that reverses a string. Take a string as input, reverse the string, and return the new string.

const reverseStr = (str) => {
  if (str === '') {
    return '';
  }
  else {
    const last = str.length - 1;
    return str[last] + reverseStr(str.slice(0, last));
  }
};

// console.log(reverseStr('flip it and reverse it'));

// *------------------------------------------

// 4. nth Triangular Number
// Calculate the nth triangular number. A triangular number counts the objects that can form an equilateral triangle. The nth triangular number is the number of dots composing a triangle with n dots on a side, and is equal to the sum of the n natural numbers from 1 to n. This is the Triangular Number Sequence: 1, 3, 6, 10, 15, 21, 28, 36, 45.

//                           *
//             *           *    *
// *     |   *   *  |   *    *    *  |

//  1st       2nd           3rd            nth?  

const nthTri = (n) => {
  // okay so to solve this, we need to do some math
  // triangular numbers are composed of dots and form a triangle, the triangle SIDE total is the nth number, but the actual number itself is the sum of the nth number counting from one. see examples above
  if (n <= 0) {
    return 'value must be 1 or more';
  }
  if (n === 1) {
    return 1;
  }
  else {
    return n + nthTri(n-1);
  }
};

// console.log(nthTri(6));

// *-------------

// 5. String Splitter
// Write a recursive function that splits a string based on a separator (similar to String.prototype.split). Don't use JS array's split function to solve this problem.

// Input: 02/20/2020
// Output: ["02", "20", "2020"]

const splitStr = (str, sep) => {
  // find the first separator
  let toSep = str.indexOf(sep);

  // if no seperator, return string in array to deconstruct
  if (toSep === -1) {
    return [str];
  }

  // if string does not start with seperator
  if (str[0] !== sep) {

    // create rest of string for recursion, if no seperator no slicing needed
    let newString = toSep === -1 
      ? str : str.slice(toSep + 1);

    // return array with first segment, then run function on remainder of string
    return [str.slice(0, toSep), ...splitStr(newString, sep)];
  }
};

// console.log(splitStr('02/20/2020', '/'));

// *---------------------------------------

// 6. Fibonacci
// Write a recursive function that prints the Fibonacci sequence of a given number. The Fibonacci sequence is a series of numbers in which each number is the sum of the 2 preceding numbers. For example, the 7th Fibonacci number in a Fibonacci sequence is 13. The sequence looks as follows: 1, 1, 2, 3, 5, 8, 13.

const fib = (n) => {
  if (n <= 0) {
    return 0;
  }
  else if (n === 1) {
    return 1;
  } 
  else {
    return fib(n - 1) + fib(n - 2);
  }
};

// console.log(fib(7));

// *-------------------------------------------------

// 7. Factorial
// Write a recursive function that finds the factorial of a given number. The factorial of a number can be found by multiplying that number by each number between itself and 1. For example, the factorial of 5 is 5 * 4 * 3 * 2 * 1 = 120.

const fact = (n) => {
  if (n <= 0) {
    return 'number must be 1 or greater';
  }
  if (n === 1) {
    return 1;
  }
  else {
    return n * fact(n - 1);
  }
};

// console.log(fact(5));

// *--------------------------------------------------

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


const getOut = (m) => {
  let steps = [''];

  const savePath = (step) => {
    steps = [
      ...steps, 
      steps.slice(steps.length - 1) 
    ]; 
    steps[steps.length - 1] += step; 
  };

  const travel = (row, column) => {
    let location = m[row][column];
    let possPaths = 0;

    if (location === 'e') {
      console.log('we did it!!!');
      return steps;
    }

    if (location === '*') {
      steps = steps.slice(0, steps.length - 1);
    }

    else if (location === ' ') {
      m[row][column] = '*';

      if (column >= m[row].length - 1 && m[row][column - 1] !== '*') {
        steps += 'L'; possPaths += 1;
        return travel(row, column - 1);
      }

      if (column < m[row].length - 1 && m[row][column + 1] !== '*') {
        possPaths += 1;
        if (possPaths > 1) { savePath('R'); } 
        else steps += 'R';
        return travel(row, column + 1);
      }

      if (row >= m.length - 1 && m[row - 1][column] !== '*') { 
        possPaths += 1;
        if (possPaths > 1) { savePath('U'); } 
        else steps += 'U';
        return travel(row - 1, column);
      }

      if (row < m.length - 1 && m[row + 1][column] !== '*') {
        steps += 'D'; possPaths += 1;
        return travel(row + 1, column);
      }
    }
  };

  return travel(0, 0);
};

console.log(getOut(maze));

// *----------------------------------------------

// 10. Anagrams
// An anagram is any word or phrase that uses the letters of a given ("subject") word or phrase in another, rearranged order. Write a function that creates an anagram list, listing all the rearrangements of a given word. For example, if the user types "east", the program should list all 24 permutations, including "eats", "etas", "teas", and non-words like "tsae".

// Hint: For your algorithm, you might want to think about a prefix and use that to create the new words. For example, given "east", use "e" as a prefix and place it in front of all 6 permutations of "ast" — "ast", "ats", "sat", "sta", "tas", and "tsa". This will give you the words "east", "eats", "esat", "esta", "etas", and "etsa". Continue this way until you find all the anagrams for "east". Then you can use "a" as a prefix and permute the remaining words "est". For "east", there should be 24 words.

const createAnagrams = (word) => {
  let list = []; // this will hold our new list

  // function to randomize letters, and push each unique anagram to our list
  const shiftLetters = (ana, str) => { // ana = '', string = word to anagramzy
   
    if (str === '') { // if the string has reached empty
      if (!list.filter(el => el === ana).length) // check to ensure it's unique and then add to the list
        list.push(ana);
    }
    for (let i = 0; i < str.length; i++) { // for each letter in our word...
      shiftLetters(ana + str[i], str.slice(0, i) + str.slice(i + 1)); // pass in the function with ana as a prefix prefix (ana + stri[i])
      // this continues to happen in our recursive cycle. 
      // when `ana` is full and `string` is empty, we add the word to our list
    }
  };

  shiftLetters('', word); // call our function using `word`

  return list;
};

// console.log(createAnagrams('bee'));


// *--------------------------------------------------

// 11. Organization Chart
// Write a recursive function that prints the following organization chart. Your output should be as shown below with proper indentation to show the hierarchy. You may store the org chart in an object and send that as an input to your program.

// Zuckerberg
//     Schroepfer
//         Bosworth
//             Steve
//             Kyle
//             Andra
//         Zhao
//             Richie
//             Sofia
//             Jen
//     Schrage
//         VanDyck
//             Sabrina
//             Michelle
//             Josh
//         Swain
//             Blanch
//             Tom
//             Joe
//     Sandberg
//         Goler
//             Eddie
//             Julie
//             Annie
//        Hernandez
//             Rowi
//             Inga
//             Morgan
//        Moissinac
//             Amy
//             Chuck
//             Vinni
//        Kelley
//             Eric
//             Ana
//             Wes



// *----------------------------------------------------

// 12. Binary Representation
// Write a recursive function that prints out the binary representation of a given number. For example, the program should take 3 as an input and print 11 as output, or 25 as an input and print 11001 as an output. Note that the binary representation of 0 should be 0.

const toBinary = (x) => {
  if (x === 0 || x === 1) {
    return x.toString();
  }
  else {
    const lsb = (x % 2).toString();
    const restOfBits = Math.floor(x / 2);
    console.log(restOfBits);
    const restAsBinary = toBinary(restOfBits);
    return restAsBinary + lsb;
  }
};

console.log(toBinary(23));