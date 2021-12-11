import { calcQueueScore, checkLine } from './syntax';
import { readIntoArray } from '../utils/fileUtils';

describe('when checking lines', () => {
	it('should return the right character on the sample input', async () => {
		const values = await readIntoArray('./source/day10/day10.sample.txt', (x) => x);
		expect(values.map(checkLine).map((x) => x.char)).toMatchObject([
			undefined,
			undefined,
			'}',
			undefined,
			')',
			']',
			undefined,
			')',
			'>',
			undefined,
		]);
	});

	it('should calculate the score for a test queue', () => {
		expect(calcQueueScore([']', ')', '}', ')', ']', ']', '}', '}'])).toBe(288957);
	});
});
