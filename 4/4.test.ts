import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import * as part2 from './part2.ts';

/**
 *
 * 2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
 */

// Deno.test('parseAssignments', () => {
//     const input = `2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8`;
//     const lines = input.split('\n')
//     const allAssignments = lines.map(part1.parseAssignments);
//     const overlappingAssignments = allAssignments.filter(([a, b]) => part1.isOverlapping(a, b) || part1.isOverlapping(b, a));
//     assertEquals(overlappingAssignments.length, 2);
// })

// run a deno test that just returns true
Deno.test('true is true', () => {
    assertEquals(true, true);
});

Deno.test('part 2 works', async () => {
    const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
    const lines = await input.split('\n')
    const allAssignments = lines.map(part2.parseAssignments);
    const overlappingAssignments = allAssignments.filter(([a, b]) => part2.isOverlapping(a, b) || part2.isOverlapping(b, a));
    assertEquals(overlappingAssignments.length, 4);
})