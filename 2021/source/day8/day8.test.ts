import { readIntoArray } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day8';
import { countEasyDigits, signalParser } from './digits';
describe('when solving the day 8 part one challenge', () => {
	it('should return 26 on the sample input', async () => {
		const values = await readIntoArray('./source/day8/day8.sample.txt', countEasyDigits);
		const result = solvePartOne(values);
		expect(result).toBe(26);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day8/day8.txt', countEasyDigits);
		const result = solvePartOne(values);
		expect(result).toBe(519);
	});
});

describe('when solving the day 8 part two challenge', () => {
	it('should return 26 on the sample input', async () => {
		const values = await readIntoArray('./source/day8/day8.sample.txt', signalParser);
		const result = solvePartTwo(values);
		expect(result).toBe(61229);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day8/day8.txt', signalParser);
		const result = solvePartTwo(values);
		expect(result).toBe(1027483);
	});
});
