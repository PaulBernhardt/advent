import { readFromCSVLine, readIntoArray } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day7';
describe('when solving the day 7 part one challenge', () => {
	it('should return 37 on the sample input', async () => {
		const values = await readFromCSVLine('./source/day7/day7.sample.txt', (x) => parseInt(x));
		const result = solvePartOne(values);
		expect(result).toBe(37);
	});

	it('should give the answer for the real data', async () => {
		const values = await readFromCSVLine('./source/day7/day7.txt', (x) => parseInt(x));
		const result = solvePartOne(values);
		expect(result).toBe(342641);
	});
});

describe('when solving the day 7 part two challenge', () => {
	it('should return 37 on the sample input', async () => {
		const values = await readFromCSVLine('./source/day7/day7.sample.txt', (x) => parseInt(x));
		const result = solvePartTwo(values);
		expect(result).toBe(168);
	});

	it('should give the answer for the real data', async () => {
		const values = await readFromCSVLine('./source/day7/day7.txt', (x) => parseInt(x));
		const result = solvePartTwo(values);
		expect(result).toBe(93006301);
	});
});
