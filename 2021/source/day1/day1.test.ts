import { assert } from 'console';
import { countIncreases, countThreeIncrease } from './day1';
import { readIntoArray } from '../utils/fileUtils';

const SAMPLE = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const RESULT = 7;

describe('when solving the day 1 challenge', () => {
	it('should return 7 increases on the sample input', () => {
		const count = countIncreases(SAMPLE);
		expect(count).toBe(RESULT);
	});

	it('should give the answer for the real data', async () => {
		const arr = await readIntoArray('./source/day1/day1.txt', parseInt);
		const count = countIncreases(arr);
		expect(count).toBe(1502);
	});
});

describe('when solving the day 1 b challenge', () => {
	it('should return 5 increases on the sample input', () => {
		const count = countThreeIncrease(SAMPLE);
		expect(count).toBe(5);
	});

	it('should give the answer for the real data', async () => {
		const arr = await readIntoArray('./source/day1/day1.txt', parseInt);
		const count = countThreeIncrease(arr);
		expect(count).toBe(1538);
	});
});
