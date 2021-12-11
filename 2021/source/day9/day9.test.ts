import { readIntoArray } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day9';
import { parseTubes } from './tubes';
describe('when solving the day 9 part one challenge', () => {
	it('should return 10 on the sample input', async () => {
		const values = await readIntoArray('./source/day9/day9.sample.txt', parseTubes);
		const result = solvePartOne(values);
		expect(result).toBe(15);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day9/day9.txt', parseTubes);
		const result = solvePartOne(values);
		expect(result).toBe(588);
	});
});

describe('when solving the day 9 part two challenge', () => {
	it('should return 10 on the sample input', async () => {
		const values = await readIntoArray('./source/day9/day9.sample.txt', parseTubes);
		const result = solvePartTwo(values);
		expect(result).toBe(1134);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day9/day9.txt', parseTubes);
		const result = solvePartTwo(values);
		expect(result).toBe(964712);
	});
});
