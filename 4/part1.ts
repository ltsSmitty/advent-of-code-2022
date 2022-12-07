import * as helper from "../helpers.ts";

type Assignment = {
    start: number;
    finish: number;
}

// parse assignments
// example line is "2-4,6-8"
export const parseAssignments = (line: string): [Assignment, Assignment] => {
    const [first, second] = line.split(",").map((a) => a.split("-").map(Number));
    console.log(first, second);
    return [
        { start: first[0], finish: first[1] },
        { start: second[0], finish: second[1] },
    ];
}

export const isOverlapping = (a: Assignment, b: Assignment): boolean => {
    return a.start <= b.start && a.finish >= b.finish;
}



const run = async () => {
    const lines = await helper.readLinesFromTextFile("input.txt");
    const allAssignments = lines.map(parseAssignments);
    const overlappingAssignments = allAssignments.filter(([a, b]) => isOverlapping(a, b) || isOverlapping(b, a));
    console.log(overlappingAssignments.length);

}

run()