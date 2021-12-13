import { readIntoArray, readIntoObject } from '../utils/fileUtils';
import { CaveParser } from './cave';
import { solvePartOne, solvePartTwo } from './day12';
describe('when solving the day 12 part one challenge', () => {
	it('should return 226 on the sample input', async () => {
		const values = await readIntoObject('./source/day12/day12.sample.txt', new CaveParser());
		const result = solvePartOne(values);
		expect(result).toBe(226);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day12/day12.txt', new CaveParser());
		const result = solvePartOne(values);
		expect(result).toBe(3000);
	});
});

describe('when solving the day 12 part two challenge', () => {
	it('should return 3509 on the sample input', async () => {
		const values = await readIntoObject('./source/day12/day12.sample.txt', new CaveParser());
		const result = solvePartTwo(values);
		expect(result).toBe(3509);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day12/day12.txt', new CaveParser());
		const result = solvePartTwo(values);
		expect(result).toBe(74222);
	});
});
