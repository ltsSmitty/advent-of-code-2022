

// split each line in half
export const splitInHalf = (line: string) => {
    const half = Math.ceil(line.length / 2);
    const firstHalf = line.slice(0, half)
    const secondHalf = line.slice(half)
    if (firstHalf.length !== secondHalf.length) { console.log(`surprisingly not the same length`) }
    return [firstHalf, secondHalf];
}

// find the character which is the same in each line
export const findDuplicateCharacter = (str1: string, str2: string): string => {
    const str1Array = str1.split("");
    console.log(str1Array);
    const matchingLetter = str1Array.find((letter) => str2.includes(letter));
    console.log(matchingLetter);
    return matchingLetter ?? "a";
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

export const getPriorityNumber = (line: string): number => {
    const [firstHalf, secondHalf] = splitInHalf(line);
    const duplicateCharacter = findDuplicateCharacter(firstHalf, secondHalf);
    return convertToNumber(duplicateCharacter);
}

export const sumPriorityNumbers = (lines: string[]): number => {
    return lines.reduce((sum, line) => sum + getPriorityNumber(line), 0);
}


// const run = async () => {
//     const lines = await helper.readLinesFromTextFile("input.txt");
//     const sumOfPriorityNumbers = sumPriorityNumbers(lines);
//     console.log(sumOfPriorityNumbers);
// }

