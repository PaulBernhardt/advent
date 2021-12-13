import { readIntoArray, readIntoObject } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day13';
import { PaperParser } from './paper';
describe('when solving the day 13 part one challenge', () => {
	it('should return 17 on the sample input', async () => {
		const values = await readIntoObject('./source/day13/day13.sample.txt', new PaperParser());
		const result = solvePartOne(values);
		expect(result).toBe(17);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day13/day13.txt', new PaperParser());
		const result = solvePartOne(values);
		expect(result).toBe(765);
	});
});

describe('when solving the day 13 part two challenge', () => {
	it('should return 17 on the sample input', async () => {
		const values = await readIntoObject('./source/day13/day13.sample.txt', new PaperParser());
		const output = await readIntoArray('./source/day13/day13.sample.output.txt', (x) => x.split(''));
		const result = solvePartTwo(values);
		expect(result).toMatchObject(output);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day13/day13.txt', new PaperParser());
		const output = await readIntoArray('./source/day13/day13.output.txt', (x) => x.split(''));
		const result = solvePartTwo(values);
		expect(result).toMatchObject(output);
	});
});
