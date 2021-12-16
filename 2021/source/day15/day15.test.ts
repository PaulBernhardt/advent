import { readIntoArray } from '../utils/fileUtils';
import { parseCostString } from './chitons';
import { solvePartOne, solvePartTwo } from './day15';
describe('when solving the day 15 part one challenge', () => {
	it('should return 40 on the sample input', async () => {
		const costArray = await readIntoArray('./source/day15/day15.sample.txt', parseCostString);
		const result = solvePartOne(costArray);
		expect(result).toBe(40);
	});

	it('should give the answer for the real data', async () => {
		const costArray = await readIntoArray('./source/day15/day15.txt', parseCostString);
		const result = solvePartOne(costArray);
		expect(result).toBe(720);
	});
});

describe('when solving the day 15 part two challenge', () => {
	it('should return 315 on the sample input', async () => {
		const costArray = await readIntoArray('./source/day15/day15.sample.txt', parseCostString);
		const result = solvePartTwo(costArray);
		expect(result).toBe(315);
	});

	it('should give the answer for the real data', async () => {
		const costArray = await readIntoArray('./source/day15/day15.txt', parseCostString);
		const result = solvePartTwo(costArray);
		expect(result).toBe(3025);
	});
});
