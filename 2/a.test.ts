// import { calculateScoreForSingleGamev2 } from './b.ts';
// import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
// import { calculateScoreForSingleGame, calculateScoresForAllMatches } from "./a.ts";

// Deno.test("calculateScoreForSingleGame", () => {
//     assertEquals(calculateScoreForSingleGame({ firstMove: "A", secondMove: "Y" }), 8);
//     assertEquals(calculateScoreForSingleGame({ firstMove: "B", secondMove: "X" }), 1);
//     assertEquals(calculateScoreForSingleGame({ firstMove: "C", secondMove: "Z" }), 6);
// })

// Deno.test("calculateScoresForAllMatches", () => {
//     assertEquals(calculateScoresForAllMatches([
//         { player1Move: "A", player2Move: "Y" },
//         { player1Move: "B", player2Move: "X" },
//         { player1Move: "C", player2Move: "Z" },
//     ]), 15);
// })

// Deno.test("Calculate score for single match v2", () => {
//     assertEquals(calculateScoreForSingleGamev2({ firstMove: "A", objective: "Y" }), 4);
//     console.log(`test complete`)
//     assertEquals(calculateScoreForSingleGamev2({ firstMove: "B", objective: "X" }), 1);
//     console.log(`test complete`)
//     assertEquals(calculateScoreForSingleGamev2({ firstMove: "C", objective: "Z" }), 7);
// })

// // Deno.test("calculate score for all matches v2", () => {
// //     assertEquals(calculateScoresForAllMatches([
// //         { player1Move: "A", player2Move: "Y" },
// //         { player1Move: "B", player2Move: "X" },
// //         { player1Move: "C", player2Move: "Z" },
// //     ]), 15);
// // })