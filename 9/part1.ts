import * as helpers from '../helpers.ts'
import * as _ from 'https://cdn.skypack.dev/lodash';

const lines = await helpers.readLinesFromTextFile('input.txt')
// const lines = await helpers.readLinesFromTextFile('example-input.txt')
//
// take a row e.g. R 2 and repeat the letter as many times as the number
// e.g. R 2 becomes RR
const repeatLetter = (letter: string, number: number): string => {
    let repeatedLetter = '';
    for (let i = 0; i < number; i++) {
        repeatedLetter += letter;
    }
    return repeatedLetter;
}

type Coord = {
    x: number,
    y: number
}



const headLocation: Coord = { x: 1, y: 1 }
const tailLocation: Coord = { x: 1, y: 1 }

// fill the tail location with 10 coords which are all at (1,1)
const tailLocations: Coord[] = [];
// fill tailLocations with {x:1,y:1} 10 times
for (let i = 0; i < 10; i++) {
    tailLocations.push({ x: 1, y: 1 })
}


const allTailLocations: Coord[] = [{ x: 1, y: 1 }]

const updateHeadLocation = (letter: "U" | "R" | "L" | "D") => {
    // if letter is u, that means up, so headLocation.y++
    switch (letter) {
        case "U": {
            headLocation.y++;
            break;
        }
        case "R": {
            headLocation.x++;
            break;
        }
        case "L": {
            headLocation.x--;
            break;
        }
        case "D": {
            headLocation.y--;
            break;
        }
    }

    console.log(`The current head locations is (${headLocation.x}, ${headLocation.y}) `)
}

const updateTail = () => {
    // three scenarios
    // 1. overlapping
    // do: nothing
    // 2. touching
    // do: nothing
    // 3. 2 away
    // in line – move properly

    // if the head and tail locations are the same

    const xDiff = headLocation.x - tailLocation.x;
    const yDiff = headLocation.y - tailLocation.y;
    const xDiffAbsolute = Math.abs(headLocation.x - tailLocation.x)
    const yDiffAbsolute = Math.abs(headLocation.y - tailLocation.y)

    if (xDiff === 0 && yDiff === 0) { // overlapping
        // do nothing
        return;
    }
    if (xDiffAbsolute <= 1 && yDiffAbsolute <= 1) { // orthogonal touching
        // do nothing
        return;
    }
    // we know the tail needs to move
    // in line case
    if (xDiffAbsolute === 0) {
        // move the tail up or down
        if (headLocation.y > tailLocation.y) {
            tailLocation.y++;
        } else {
            tailLocation.y--;
        }
        return;
    }
    if (yDiffAbsolute === 0) {
        // move the tail left or right
        if (headLocation.x > tailLocation.x) {
            tailLocation.x++;
        } else {
            tailLocation.x--;
        }
        return;
    }
    // diagonal case
    // if diffX > 0 and diffY>0
    if (xDiff > 0 && yDiff > 0) {
        tailLocation.x++;
        tailLocation.y++;
        return;
    }
    // if diffX > 0 and diffY<0
    if (xDiff > 0 && yDiff < 0) {
        tailLocation.x++;
        tailLocation.y--;
        return;
    }
    // if diffX < 0 and diffY>0
    if (xDiff < 0 && yDiff > 0) {
        tailLocation.x--;
        tailLocation.y++;
        return;
    }
    // if diffX < 0 and diffY<0
    if (xDiff < 0 && yDiff < 0) {
        tailLocation.x--;
        tailLocation.y--;
        return;
    }


}

// processLetter
const processLetter = (letter: "U" | "R" | "L" | "D") => {
    // update the head location
    updateHeadLocation(letter)
    // update tail location
    updateTail()
    // push the new tail location to the array
    allTailLocations.push({ ...tailLocation })
    // console.log(`the entire locations array: ${ allTailLocations.length }`, allTailLocations)
    // console.log(`tailLocation`, tailLocation.x, tailLocation.y)


}

const run = () => {
    // preprocessing
    const commands = lines.map(line => {
        const [letter, number] = line.split(' ');
        return repeatLetter(letter, +number)
    }).join('')
    commands.split('').forEach(command => processLetter(command as "U" | "R" | "L" | "D"))

    const setOfTaiLocations = new Set(allTailLocations.map(location => `${location.x},${location.y}`));
    console.log(`setOfTaiLocations`, setOfTaiLocations)
    console.log(`length of setOfTaiLocations`, setOfTaiLocations.size)

    // console.table(commands)


}

run()