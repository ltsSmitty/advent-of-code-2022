/**
 *     [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
 *
 *
 */

import * as helpers from '../helpers.ts';
// import Lodash
import * as _ from 'https://cdn.skypack.dev/lodash';

const extractLettersFromLine = (line: string): string[] => {
    // split the line every 4 characters and return it as an array
    // console.log(`line: ${line}`);
    const chunk = line.match(/.{1,4}/g) || [];
    // console.log(chunk);
    // each string is a [, then a letter, then a ], then possibly a space. extract just the letter
    const letters = chunk.map((s) => s[1]);
    return letters;
}

const extractDirectionsFromLine = (line: string): { amount: number, fromColumn: number, toColumn: number } => {
    // lines look like "move 1 from 7 to 4"
    // split on space, and return the numbers
    const [_1, amount, _2, fromColumn, _3, toColumn] = line.split(' ');
    return { amount: parseInt(amount), fromColumn: parseInt(fromColumn), toColumn: parseInt(toColumn) };
}

const moveLetterFromColumn = (beginColumn: string[], endColumn: string[], numLoops: number) => {
    // move the letter from the beginning column to the end column numLoops times
    console.log(`looping ${numLoops} times from ${beginColumn} to ${endColumn}`);
    for (let i = 0; i < numLoops; i++) {
        // console.log(`beginColumn: ${beginColumn}`);
        // console.log(`endColumn: ${endColumn}`);
        const letter = beginColumn.pop();
        // console.log(`popped ${letter} from ${beginColumn} to ${endColumn}`);
        (letter ? endColumn.push(letter) : null);
        // console.log(`endColumn: ${endColumn}`);
    }
    return [beginColumn, endColumn];
}


const run = async () => {
    // const lines = await helpers.readLinesFromTextFile('example-input.txt');
    const lines = await helpers.readLinesFromTextFile('input.txt');
    // split lines at the empty line
    // find the index of the empty line
    const emptyLineIndex = lines.findIndex((line) => line === '');
    // split lines into two arrays, one for each section
    const [letterLines, directionsLines] = [lines.slice(0, emptyLineIndex - 1), lines.slice(emptyLineIndex + 1)];
    const letters = letterLines.map(extractLettersFromLine);
    const directions = directionsLines.map(extractDirectionsFromLine);

    // transpose the letters array
    const transposedLetters = _.unzip(letters) as string[][];
    const properLetters = transposedLetters.map((column) => {
        const reversed = _.reverse(column)
        const flattened = _.flatten(reversed);
        console.log(`flattened: ${flattened}`);
        return flattened as string[];
    })
    // remove spaces or undefineds
    const finalLetters = properLetters.map((column) => column.filter((letter: string | undefined) => letter !== ' ' && letter))

    // do the directions on transposedLetters
    directions.forEach(direction => {
        const { amount, fromColumn, toColumn } = direction;
        // console.log(`moving ${amount} from ${fromColumn} to ${toColumn}`);
        // console.log(`Before:`)
        // console.table([finalLetters]);
        const [beginColumn, endColumn] = moveLetterFromColumn(finalLetters[fromColumn - 1], finalLetters[toColumn - 1], amount);
        finalLetters[fromColumn - 1] = beginColumn;
        finalLetters[toColumn - 1] = endColumn;
        // console.log(`After:`)
        // console.table([finalLetters]);
    })
    // the answer is the last letter in each row of finalLetters
    const answer = finalLetters.map((column) => column[column.length - 1]).join('');
    console.log(`answer: ${answer}`);
}

run()