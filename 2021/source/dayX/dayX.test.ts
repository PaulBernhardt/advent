import { readIntoArray } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './dayX';
describe('when solving the day X part one challenge', () => {
	it('should return 0 on the sample input', async () => {
		const values = await readIntoArray('./source/dayX/dayX.sample.txt', (x) => x);
		const result = solvePartOne(values);
		expect(result).toBe(0);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/dayX/dayX.txt', (x) => x);
		const result = solvePartOne(values);
		expect(result).toBe(0);
	});
});

describe('when solving the day X part two challenge', () => {
	it('should return 0 on the sample input', async () => {
		const values = await readIntoArray('./source/dayX/dayX.sample.txt', (x) => x);
		const result = solvePartTwo(values);
		expect(result).toBe(0);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/dayX/dayX.txt', (x) => x);
		const result = solvePartTwo(values);
		expect(result).toBe(0);
	});
});
