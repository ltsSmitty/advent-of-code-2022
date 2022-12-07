import * as helpers from '../helpers.ts';
// import Lodash
import * as _ from 'https://cdn.skypack.dev/lodash';


const run = async () => {
    const input = await helpers.readLinesFromTextFile('./input.txt');
    const chars = input[0].split('');
    let i = 0;

    while (true) {
        // go through the input one character at a time and break the loop when four characters in a row are all different
        const buffer = new Set(chars.slice(i, i + 4))
        console.log(`i: ${i}, buffer: ${buffer}`);
        console.table(buffer);

        if (buffer.size === 4) {
            break
        }
        i++
    }
    console.log(i + 4);

}

run()