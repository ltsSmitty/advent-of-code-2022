import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
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
    //a.start needs to be between b.start and b.finish inclusive
    const result = a.start >= b.start && a.start <= b.finish;
    return result
}

const run = async () => {
    const lines = await helper.readLinesFromTextFile("input.txt");
    const allAssignments = lines.map(parseAssignments);
    const overlappingAssignments = allAssignments.filter(([a, b]) => isOverlapping(a, b) || isOverlapping(b, a));
    console.log(overlappingAssignments.length);
}


Deno.test('parseAssignments', () => {
    const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
    const lines = input.split('\n')
    const allAssignments = lines.map(parseAssignments);
    const overlappingAssignments = allAssignments.filter(([a, b]) => isOverlapping(a, b) || isOverlapping(b, a));
    assertEquals(overlappingAssignments.length, 4);
})

run()