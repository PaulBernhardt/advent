import { readIntoArray, readIntoObject, SingleLineParser } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day16';
import { parseHexToBinary } from './packets';
describe('when solving the day 16 part one challenge', () => {
	it('should return 16 on the sample input', async () => {
		const values = await readIntoObject(
			'./source/day16/day16.sample.txt',
			new SingleLineParser<string>(parseHexToBinary),
		);
		const result = solvePartOne(values);
		expect(result).toBe(16);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day16/day16.txt', new SingleLineParser<string>(parseHexToBinary));
		const result = solvePartOne(values);
		expect(result).toBe(963);
	});
});

describe('when solving the day 16 part two challenge', () => {
	it('should return 16 on the sample input', async () => {
		const values = await readIntoObject(
			'./source/day16/day16.sample.txt',
			new SingleLineParser<string>(parseHexToBinary),
		);
		const result = solvePartTwo(values);
		expect(result).toBe(15);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day16/day16.txt', new SingleLineParser<string>(parseHexToBinary));
		const result = solvePartTwo(values);
		expect(result).toBe(1549022289655);
	});
});
