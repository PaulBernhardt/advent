import { readIntoArray } from '../utils/fileUtils';
import { parseTubes, isMin, findMins, p, findBasin } from './tubes';

describe('when parsing lava tube input', () => {
	it('should make an array of numbers', () => {
		expect(parseTubes('142')).toMatchObject([1, 4, 2]);
	});
});

describe('when finding the minimums', () => {
	it('should identify the right minimums on sample input', async () => {
		const values = await readIntoArray('./source/day9/day9.sample.txt', parseTubes);
		expect(isMin(1, 0, values)).toBeTruthy();
		expect(isMin(9, 0, values)).toBeTruthy();
		expect(isMin(2, 2, values)).toBeTruthy();
		expect(isMin(6, 4, values)).toBeTruthy();

		expect(isMin(1, 4, values)).toBeFalsy();
		expect(isMin(1, 1, values)).toBeFalsy();
		expect(isMin(5, 3, values)).toBeFalsy();
		expect(isMin(9, 1, values)).toBeFalsy();
	});

	it('should find all mins on sample input', async () => {
		const values = await readIntoArray('./source/day9/day9.sample.txt', parseTubes);
		expect(findMins(values)).toMatchObject([p(1, 0, 1), p(9, 0, 0), p(2, 2, 5), p(6, 4, 5)]);
	});

	it('should find the size of each basin on the sample input', async () => {
		const values = await readIntoArray('./source/day9/day9.sample.txt', parseTubes);
		const mins = findMins(values);
		expect(mins.map((m) => findBasin(m, values))).toMatchObject([3, 9, 14, 9]);
	});
});
