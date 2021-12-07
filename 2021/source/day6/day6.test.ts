import { readIntoArray, readIntoObject } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day6';
import { FishParser } from './fish';
describe('when solving the day 6 part one challenge', () => {
	it('should return 5934 on the sample input', async () => {
		const fishCollection = await readIntoObject('./source/day6/day6.sample.txt', new FishParser());
		const result = solvePartOne(fishCollection);
		expect(result).toBe(5934);
	});

	it('should give the answer for the real data', async () => {
		const fishCollection = await readIntoObject('./source/day6/day6.txt', new FishParser());
		const result = solvePartOne(fishCollection);
		expect(result).toBe(353079);
	});
});

describe('when solving the day 6 part two challenge', () => {
	it('should return 5934 on the sample input', async () => {
		const fishCollection = await readIntoObject('./source/day6/day6.sample.txt', new FishParser());
		const result = solvePartTwo(fishCollection);
		expect(result).toBe(26984457539);
	});

	it('should give the answer for the real data', async () => {
		const fishCollection = await readIntoObject('./source/day6/day6.txt', new FishParser());
		const result = solvePartTwo(fishCollection);
		expect(result).toBe(1605400130036);
	});
});
