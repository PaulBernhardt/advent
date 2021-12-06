import { readIntoArray } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day5';
import { parseVent } from './vent';
describe('when solving the day 5 part one challenge', () => {
	it('should return 5 on the sample input', async () => {
		const values = await readIntoArray('./source/day5/day5.sample.txt', parseVent);
		const result = solvePartOne(values);
		expect(result).toBe(5);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day5/day5.txt', parseVent);
		const result = solvePartOne(values);
		expect(result).toBe(7297);
	});
});

describe('when solving the day 5 part two challenge', () => {
	it('should return 5 on the sample input', async () => {
		const values = await readIntoArray('./source/day5/day5.sample.txt', parseVent);
		const result = solvePartTwo(values);
		expect(result).toBe(12);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day5/day5.txt', parseVent);
		const result = solvePartTwo(values);
		expect(result).toBe(21038);
	});
});
