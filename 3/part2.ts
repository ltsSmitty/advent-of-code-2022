
export const readLinesFromTextFile = async (filename: string) => {
    return await Deno.readTextFile(filename).then((input) => {
        return input.split("\n");
    })
}


// split each line in half
export const splitInHalf = (line: string) => {
    const half = Math.ceil(line.length / 2);
    const firstHalf = line.slice(0, half)
    const secondHalf = line.slice(half)
    if (firstHalf.length !== secondHalf.length) { console.log(`surprisingly not the same length`) }
    return [firstHalf, secondHalf];
}

// find the character which is the same in each line

export const findDuplicateCharacter = (strings: string[]) => {
    // loop through all the strings
    const potentials = strings[0].split("").filter((char) => {
        // for each character in the first string, check if it is the same in the other strings
        const isDuplicate = strings.every((string) => {
            return string.includes(char);
        })
        return isDuplicate;
    })
    console.log(potentials)
    return potentials[0];
    // for each string, find the character which is the same in each string
}


// convert that character to the corresponding number

export const convertToNumber = (character: string): number => {
    const char = character[0];
    console.log(char)
    const isLowercase = char == char.toLowerCase();
    if (isLowercase) {
        return char.charCodeAt(0) - 96;
    }
    else
        return char.charCodeAt(0) - 64 + 26;
}

export const getPriorityNumber = (lines: string[]): number => {
    const duplicateCharacter = findDuplicateCharacter(lines);
    return convertToNumber(duplicateCharacter);
}

export const sumPriorityNumbers = (lines: string[][]): number => {
    return lines.reduce((sum, line) => sum + getPriorityNumber(line), 0);
}

export const getSetsOf3Lines = (lines: string[]) => {
    return lines.reduce((sets, line, index) => {
        if (index % 3 === 0) {
            sets.push([line]);
        }
        else {
            sets[sets.length - 1].push(line);
        }
        return sets;
    }, [] as string[][]);
}

// const lines = await readLinesFromTextFile("input.txt");
// const setsOf3Lines = getSetsOf3Lines(lines);
// const sumOfPriorityNumbers = sumPriorityNumbers(setsOf3Lines);
// console.log(sumOfPriorityNumbers);