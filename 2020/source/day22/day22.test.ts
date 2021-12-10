import { readIntoObject } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day22';
import { DecksParser } from './decks';
describe('when solving the day 22 part one challenge', () => {
	it('should return  on the sample input', async () => {
		const values = await readIntoObject('./source/day22/day22.sample.txt', new DecksParser());
		const result = solvePartOne(values);
		expect(result).toBe(306);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day22/day22.txt', new DecksParser());
		const result = solvePartOne(values);
		expect(result).toBe(32783);
	});
});

describe('when solving the day 22 part two challenge', () => {
	it('should return  on the sample input', async () => {
		const values = await readIntoObject('./source/day22/day22.sample.txt', new DecksParser());
		const result = solvePartTwo(values);
		expect(result).toBe(306);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day22/day22.txt', new DecksParser());
		const result = solvePartTwo(values);
		expect(result).toBe(306);
	});
});
