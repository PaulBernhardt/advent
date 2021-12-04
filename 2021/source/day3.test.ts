import { solveDay3A, solveDay3B, mostCommonDigit, calcRating } from './day3';
import { readIntoArray } from './utils/fileUtils';
describe('when solving the day 3 challenge', () => {
	it('should return 198 on the sample input', async () => {
		const values = await readIntoArray('./source/day3.sample.txt', (x) => x);
		const result = solveDay3A(values);
		expect(result).toBe(198);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day3.txt', (x) => x);
		const result = solveDay3A(values);
		expect(result).toBe(1025636);
	});
});

describe('when solving the day 2 b challenge', () => {
	it('should return 900 on the sample input', async () => {
		const values = await readIntoArray('./source/day3.sample.txt', (x) => x);
		const result = solveDay3B(values);
		expect(result).toBe(230);
	});

	it('should return 900 on the sample input', async () => {
		const values = await readIntoArray('./source/day3.txt', (x) => x);
		const result = solveDay3B(values);
		expect(result).toBe(793873);
	});

	it('should tell you the most common digit in the specified position', async () => {
		const values = await readIntoArray('./source/day3.sample.txt', (x) => x);
		expect(mostCommonDigit(values, 0)).toBe('1');
		expect(mostCommonDigit(values, 1)).toBe('0');
		expect(mostCommonDigit(values, 2)).toBe('1');
		expect(mostCommonDigit(values, 3)).toBe('1');
		expect(mostCommonDigit(values, 4)).toBe('0');
	});

	it('should calculate oxygen generator rating for the sample input', async () => {
		const values = await readIntoArray('./source/day3.sample.txt', (x) => x);
		const oxy = calcRating(values, 0, true);
		expect(oxy).toBe('10111');
	});

	it('should calculate CO2 scrubber rating for the sample input', async () => {
		const values = await readIntoArray('./source/day3.sample.txt', (x) => x);
		const co = calcRating(values, 0, false);
		expect(co).toBe('01010');
	});
});
