import * as helpers from '../helpers.ts'
import * as _ from 'https://cdn.skypack.dev/lodash';

const lines = await helpers.readLinesFromTextFile('input.txt')
// const lines = await helpers.readLinesFromTextFile('example-input.txt')


let currentValue = 1;
const values: number[] = [1]
const pixels: string[] = [];

let pointer = 0;

const drawPixel = () => {
    // check the sprite position. if it's +/1 of the pointer (which is 0-indexed), then push a # onto pixels
    // otherwise, push a .
    const spritePosition = values[values.length - 1]


    console.log(`spritePosition: ${spritePosition}, pointer: ${pointer}`);

    (Math.abs(pointer - spritePosition) <= 1) ? pixels.push('#') : pixels.push('.');

    // pointer++;
    // console.log(`pointer: ${pointer}`)
    (pointer < 39) ? pointer++ : pointer = 0
}


export const run = () => {
    lines.forEach((line) => {
        const [_command, value] = line.split(' ')

        if (!value) { // noop
            drawPixel();
            values.push(currentValue);
            return
        }
        // there is a value, so push the current value one more time, then += the value, then oush it
        drawPixel();
        values.push(currentValue);
        drawPixel();
        currentValue += parseInt(value);
        values.push(currentValue);

    })
    // log values for indices 20, 60, 100, 140, 180 and 220
    const offset = 1

    const multipleValueByIndex = (index: number) => {
        const newval = values[index - offset] * index
        console.log(newval)
        return newval
    }

    const targets = [20, 60, 100, 140, 180, 220]
    const products = targets.map(target => {
        return multipleValueByIndex(target)
    })
    // sum up the products
    console.log(products)
    const sum = products.reduce((acc, val) => acc + val, 0)
    console.log(sum)

    console.log(pixels)

    // split pixels into chunks of length 40
    const chunks = (<string[][]>_.chunk(pixels, 40)).map(line => line.join(''));
    // const chunks: string[][] = _.chunk(pixels, 40)//.map(line => line.join(''));
    // // map over chunks and join each line
    // chunks.forEach(line => {
    //     console.log(line.join(''))
    // })
    console.log(chunks)
}

run()