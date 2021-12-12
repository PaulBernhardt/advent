import { readIntoObject } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day11';
import { OctopusParser } from './octopus';
describe('when solving the day 11 part one challenge', () => {
	it('should return 1656 on the sample input', async () => {
		const grid = await readIntoObject('./source/day11/day11.sample.txt', new OctopusParser());
		const result = solvePartOne(grid);
		expect(result).toBe(1656);
	});

	it('should give the answer for the real data', async () => {
		const grid = await readIntoObject('./source/day11/day11.txt', new OctopusParser());
		const result = solvePartOne(grid);
		expect(result).toBe(1571);
	});
});

describe('when solving the day 11 part two challenge', () => {
	it('should return 1656 on the sample input', async () => {
		const grid = await readIntoObject('./source/day11/day11.sample.txt', new OctopusParser());
		const result = solvePartTwo(grid);
		expect(result).toBe(195);
	});

	it('should give the answer for the real data', async () => {
		const grid = await readIntoObject('./source/day11/day11.txt', new OctopusParser());
		const result = solvePartTwo(grid);
		expect(result).toBe(387);
	});
});
