import { readIntoObject, SingleLineParser } from '../utils/fileUtils';
import { solvePartOne, solvePartTwo } from './day17';
import { parseTarget, Target } from './shots';
describe('when solving the day 17 part one challenge', () => {
	it('should return 45 on the sample input', async () => {
		const values = await readIntoObject(
			'./source/day17/day17.sample.txt',
			new SingleLineParser<Target>(parseTarget),
		);
		const result = solvePartOne(values);
		expect(result).toBe(45);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day17/day17.txt', new SingleLineParser<Target>(parseTarget));
		const result = solvePartOne(values);
		expect(result).toBe(6903);
	});
});

describe('when solving the day 17 part two challenge', () => {
	it('should return 45 on the sample input', async () => {
		const values = await readIntoObject(
			'./source/day17/day17.sample.txt',
			new SingleLineParser<Target>(parseTarget),
		);
		const result = solvePartTwo(values);
		expect(result).toBe(112);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day17/day17.txt', new SingleLineParser<Target>(parseTarget));
		const result = solvePartTwo(values);
		expect(result).toBe(2351);
	});
});
