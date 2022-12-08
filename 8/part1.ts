//1650 is wrong and too long
// 216 is too low
// correct answer is 284648

import * as helpers from '../helpers.ts'
import * as _ from 'https://cdn.skypack.dev/lodash';


const lines = await helpers.readLinesFromTextFile('input.txt')
// const lines = await helpers.readLinesFromTextFile('example-input.txt')

const getLineVisibility = (line: number[]): boolean[] => {
    const visibility: boolean[] = [];
    const treeHeights = line;
    let highestTree = -1;
    // loop through the treeHeights. if the current one is higher than the highest, it's visible, and push true
    // if it's lower, it's not visible, and push false
    console.log(`treeHeights: ${treeHeights}`)

    for (let i = 0; i < treeHeights.length; i++) {
        const current = treeHeights[i];
        if (current > highestTree) {
            highestTree = current;
            visibility.push(true);
        } else {
            visibility.push(false);
        }
    }
    console.log(visibility)
    return visibility
}

const getLineVisibilityAlt = (line: number[], startingHeight: number): boolean[] => {
    const visibility: boolean[] = [];
    const treeHeights = line;
    let formerTreeHeight = -1;
    // loop through the treeHeights. if the current one is higher than the highest, it's visible, and push true
    // if it's lower, it's not visible, and push false
    console.log(`treeHeights: ${treeHeights}`)

    for (let i = 0; i < treeHeights.length; i++) {
        const current = treeHeights[i];
        console.log(`current: ${current}, formerTreeHeight: ${formerTreeHeight}, startingHeight: ${startingHeight}`)

        if (formerTreeHeight < startingHeight) {
            formerTreeHeight = current;
            visibility.push(true);
        } else {
            // break;
            visibility.push(false);
        }
    }
    console.log(visibility)
    return visibility
}

const _isThisTreeVisible = (x: number, y: number, row: number[], column: number[]): boolean => {
    const leftVisibility = getLineVisibility(row)
    // console.log(`topVisibility`)
    const topVisibility = getLineVisibility(column)
    // console.log(`rightVisibility`)

    // get a copy of the row and columns reversed
    const rowReversed = [...row].reverse()
    const columnReversed = [...column].reverse()

    const rightVisibility = getLineVisibility(rowReversed)
    // console.log(`bottomVisibility`)
    const bottomVisibility = getLineVisibility(columnReversed)

    const isLeftVisible = leftVisibility[x]
    const isTopVisible = topVisibility[y]
    const isRightVisible = rightVisibility.reverse()[x]
    const isBottomVisible = bottomVisibility.reverse()[y]

    if (isLeftVisible || isTopVisible || isRightVisible || isBottomVisible) {
        // console.log(`tree at ${x}, ${y} is visible\n`)
        return true
    }
    console.log(`tree at ${x}, ${y} is not visible\n`)

    console.log(`leftVisibility: ${isLeftVisible},
    topVisibility: ${isTopVisible}
    rightVisibility: ${isRightVisible}
    bottomVisibility: ${isBottomVisible}`)
    return false
}

const getLineTreeScore = (index: number, line: number[]): number => {
    // starting from line[index], see count how many remaining items are less than line[index]
    // return the number of items less than line[index]
    const selectedTreeHeight = line[index];
    const remainingTrees = line.slice(index + 1)
    // console.log the line, then index, the selectedTreeHeight, and the remainingTrees
    console.log(`line: ${line}, index: ${index}, selectedTreeHeight: ${selectedTreeHeight}, remainingTrees: ${remainingTrees}`)

    // const lineVisibility = getLineVisibility(remainingTrees)
    const lineVisibility = getLineVisibilityAlt(remainingTrees, selectedTreeHeight)
    const numTreesVisible = lineVisibility.filter(visible => visible).length
    // console.log(`numTreesVisible: ${numTreesVisible}`)
    return numTreesVisible
}


const calculateTreeVisibilityScore = (x: number, y: number, row: number[], column: number[]): number => {
    console.log(`Getting left score`)
    const leftScore = getLineTreeScore(x, row)
    console.log(`Getting top score`)
    const topScore = getLineTreeScore(y, column)
    const rowReversed = [...row].reverse()
    const columnReversed = [...column].reverse()
    console.log(`Getting right score`)
    const rightScore = getLineTreeScore(row.length - x - 1, rowReversed)
    console.log(`Getting right score`)
    const bottomScore = getLineTreeScore(column.length - y - 1, columnReversed)

    const productOfScores = leftScore * topScore * rightScore * bottomScore
    console.log(`\n productOfScores: ${productOfScores}`)
    return productOfScores
}


const run = async () => {
    // split lines by character to make into a square array
    const square = lines.map(line => line.split(''))
    const numberSquare = square.map(line => line.map(char => parseInt(char)))
    console.table(numberSquare)
    // create a clone of numberSquare , filled with false
    const visibilitySquare = numberSquare.map(line => line.map(_char => false))
    const totalsSquare = numberSquare.map(line => line.map(_char => 0))


    // iterate through every element of numberSquare and check if it's visible
    // if it is, add 1 to the total
    for (let y = 0; y < numberSquare.length; y++) {
        console.log(`row ${y} of ${numberSquare.length}`)
        const row = numberSquare[y];
        for (let x = 0; x < row.length; x++) {
            const column = numberSquare.map(row => row[x])
            console.log(`column ${x} of ${row.length}`)
            // if (isThisTreeVisible(x, y, row, column)) {
            //     total++
            //     //set the visbility square to true
            //     visibilitySquare[y][x] = true
            // }
            const score = calculateTreeVisibilityScore(x, y, row, column)
            totalsSquare[y][x] = score
        }
    }
    console.table(`totals: ${totalsSquare}`)
    // find the index of teh biggest total
    const indexOfLargestTotal = totalsSquare.flat().indexOf(Math.max(...totalsSquare.flat()))
    console.log(`indexOfLargestTotal: ${indexOfLargestTotal}`)

    const biggestTotal = Math.max(...totalsSquare.flat())
    console.log(`biggestTotal: ${biggestTotal}`)
    // console.table(visibilitySquare)
}


run()