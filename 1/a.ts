export const x = "";

const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");
console.log(lines);

const elves = []
let currentElf: number[] = []
for (let currentLine = 0; currentLine < lines.length; currentLine++) {
    if (lines[currentLine] !== "") {
        // console.log("Elf: " + lines[currentLine]);
        currentElf.push(Number(lines[currentLine]));
    }
    else {
        elves.push(currentElf)
        currentElf = []
    }
}

console.log(JSON.stringify(elves));

let mostCals = 0
const elfCals: number[] = [];

elves.forEach((elf, index) => {
    const sumOfCals = Number(elf.reduce((a, b) => Number(a) + Number(b)));
    elfCals[index] = sumOfCals;
    if (sumOfCals > mostCals) {
        mostCals = sumOfCals
        console.log(`Elf ${index} has the most cals with ${sumOfCals}`)
    }
});

const sortedElves = elfCals.sort((a, b) => b - a)
console.log(sortedElves)
console.log(sortedElves[0] + sortedElves[1] + sortedElves[2])
// console.log(JSON.stringify(elves));