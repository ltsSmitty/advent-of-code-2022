import * as helpers from '../helpers.ts';
// import Lodash


const run = async () => {
    const input = await helpers.readLinesFromTextFile('./input.txt');
    const chars = input[0].split('');
    let i = 0;

    while (true) {
        // go through the input one character at a time and break the loop when fourteen characters in a row are all different
        const buffer = chars.slice(i, i + 14);
        const charSet = new Set(buffer);
        console.log(`i: ${i}, buffer: ${buffer}`);
        console.table(charSet);
        if (charSet.size === 14) {

            break
        }


        i++
    }
    console.log(i + 14);

}

run()