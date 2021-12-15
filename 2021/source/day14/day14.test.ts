import { readIntoArray, readIntoObject } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day14';
import { PolymerParser } from './polymer';

describe('when solving the day 14 part one challenge', () => {
	it('should return 1588 on the sample input', async () => {
		const template = await readIntoObject('./source/day14/day14.sample.txt', new PolymerParser());
		const result = solvePartOne(template);
		expect(result).toBe(1588);
	});

	it('should give the answer for the real data', async () => {
		const template = await readIntoObject('./source/day14/day14.txt', new PolymerParser());
		const result = solvePartOne(template);
		expect(result).toBe(2851);
	});
});

describe('when solving the day 14 part two challenge', () => {
	it('should return 2188189693529 on the sample input', async () => {
		const template = await readIntoObject('./source/day14/day14.sample.txt', new PolymerParser());
		const result = solvePartTwo(template);
		expect(result).toBe(2188189693529);
	});

	it('should give the answer for the real data', async () => {
		const template = await readIntoObject('./source/day14/day14.txt', new PolymerParser());
		const result = solvePartTwo(template);
		expect(result).toBe(10002813279337);
	});
});
