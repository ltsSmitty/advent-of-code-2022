import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import * as code from "./part1.ts";
import * as part2 from "./part2.ts";

Deno.test("letterToNumber", () => {
    assertEquals(code.convertToNumber("a"), 1);
    assertEquals(code.convertToNumber("b"), 2);
    assertEquals(code.convertToNumber("A"), 27);
})

Deno.test("find priority number", () => {
    assertEquals(code.getPriorityNumber("vJrwpWtwJgWrhcsFMMfFFhFp"), 16);
    assertEquals(code.getPriorityNumber("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL"), 38);
    assertEquals(code.getPriorityNumber("PmmdzqPrVvPwwTWBwg"), 42);
})

Deno.test("find matching strings", async () => {
    const strings = ["vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg"]
    const matchingChar = await part2.findDuplicateCharacter(strings);
    console.log(matchingChar)
    assertEquals(matchingChar, "r");
})

Deno.test("sum priority numbers", () => {
    const lines = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw"]
    const groupedLines = part2.getSetsOf3Lines(lines);
    assertEquals(groupedLines, [
        [
            "vJrwpWtwJgWrhcsFMMfFFhFp",
            "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
            "PmmdzqPrVvPwwTWBwg"
        ],
        [
            "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
            "ttgJtRGJQctTZtZT",
            "CrZsJsPPZsGzwwsLwLmpwMDw"
        ]])
})