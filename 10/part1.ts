import * as helpers from '../helpers.ts'
import * as _ from 'https://cdn.skypack.dev/lodash';

const lines = await helpers.readLinesFromTextFile('input.txt')
// const lines = await helpers.readLinesFromTextFile('example-input.txt')


let currentValue = 1;
const values: number[] = [1]


export const run = () => {
    lines.forEach(line => {
        const [_command, value] = line.split(' ')

        if (!value) { // noop
            values.push(currentValue);
            return
        }
        // there is a value, so push the current value one more time, then += the value, then oush it
        values.push(currentValue);
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

}

run()