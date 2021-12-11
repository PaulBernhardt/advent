import { readIntoArray } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day10';
describe('when solving the day 10 part one challenge', () => {
	it('should return 2697 on the sample input', async () => {
		const values = await readIntoArray('./source/day10/day10.sample.txt', (x) => x);
		const result = solvePartOne(values);
		expect(result).toBe(26397);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day10/day10.txt', (x) => x);
		const result = solvePartOne(values);
		expect(result).toBe(388713);
	});
});

describe('when solving the day 10 part two challenge', () => {
	it('should return 288957 on the sample input', async () => {
		const values = await readIntoArray('./source/day10/day10.sample.txt', (x) => x);
		const result = solvePartTwo(values);
		expect(result).toBe(288957);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day10/day10.txt', (x) => x);
		const result = solvePartTwo(values);
		expect(result).toBe(3539961434);
	});
});
