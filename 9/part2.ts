import * as helpers from '../helpers.ts'
import * as _ from 'https://cdn.skypack.dev/lodash';

const lines = await helpers.readLinesFromTextFile('input.txt')
// const lines = await helpers.readLinesFromTextFile('example-input.txt')
// const lines = await helpers.readLinesFromTextFile('example-input-2.txt')


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

// fill the tail location with 10 coords which are all at (1,1)
const tailLocations: Coord[] = [];
// fill tailLocations with {x:1,y:1} 10 times
for (let i = 0; i < 10; i++) {
    tailLocations.push({ x: 1, y: 1 })
}

const all9thTailLocations: Coord[] = [{ x: 1, y: 1 }]

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

const updateTail = (thisTailIndex: number) => {
    // identify head
    const thisTailsHeadLocation = (thisTailIndex === 0) ? headLocation : tailLocations[thisTailIndex - 1];
    const thisTailsLocation = tailLocations[thisTailIndex];

    // three scenarios
    // 1. overlapping
    // do: nothing
    // 2. touching
    // do: nothing
    // 3. 2 away
    // in line – move properly

    // if the head and tail locations are the same

    const xDiff = thisTailsHeadLocation.x - thisTailsLocation.x;
    const yDiff = thisTailsHeadLocation.y - thisTailsLocation.y;
    const xDiffAbsolute = Math.abs(thisTailsHeadLocation.x - thisTailsLocation.x)
    const yDiffAbsolute = Math.abs(thisTailsHeadLocation.y - thisTailsLocation.y)

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
        if (thisTailsHeadLocation.y > thisTailsLocation.y) {
            thisTailsLocation.y++;
        } else {
            thisTailsLocation.y--;
        }
        return;
    }
    if (yDiffAbsolute === 0) {
        // move the tail left or right
        if (thisTailsHeadLocation.x > thisTailsLocation.x) {
            thisTailsLocation.x++;
        } else {
            thisTailsLocation.x--;
        }
        return;
    }
    // diagonal case
    // if diffX > 0 and diffY>0
    if (xDiff > 0 && yDiff > 0) {
        thisTailsLocation.x++;
        thisTailsLocation.y++;
        return;
    }
    // if diffX > 0 and diffY<0
    if (xDiff > 0 && yDiff < 0) {
        thisTailsLocation.x++;
        thisTailsLocation.y--;
        return;
    }
    // if diffX < 0 and diffY>0
    if (xDiff < 0 && yDiff > 0) {
        thisTailsLocation.x--;
        thisTailsLocation.y++;
        return;
    }
    // if diffX < 0 and diffY<0
    if (xDiff < 0 && yDiff < 0) {
        thisTailsLocation.x--;
        thisTailsLocation.y--;
        return;
    }


}

// processLetter
const processLetter = (letter: "U" | "R" | "L" | "D") => {
    // update the head location
    updateHeadLocation(letter)
    // update tail location
    tailLocations.forEach((_tailLocation, index) => updateTail(index))
    // push the new tail locations to the array
    all9thTailLocations.push({ ...tailLocations[8] })
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

    const setOf9thTaiLocations = new Set(all9thTailLocations
        .map(location => `${location.x},${location.y}`));
    console.log(`setOf9thTaiLocations`, setOf9thTaiLocations)
    console.log(`length of setOf9thTaiLocations`, setOf9thTaiLocations.size)

    // console.table(commands)


}

run()