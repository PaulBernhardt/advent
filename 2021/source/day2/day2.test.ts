import { getPositionValue, getPositionValueWithAim, parseMove } from './day2';
import { readIntoArray } from '../utils/fileUtils';
describe('when solving the day 2 challenge', () => {
	it('should parse the sample input into directions', async () => {
		const moves = await readIntoArray('./source/day2/day2.sample.txt', parseMove);
		expect(moves).toMatchObject([
			{
				direction: 'x',
				distance: 5,
			},
			{
				direction: 'y',
				distance: 5,
			},
			{
				direction: 'x',
				distance: 8,
			},
			{
				direction: 'y',
				distance: -3,
			},
			{
				direction: 'y',
				distance: 8,
			},
			{
				direction: 'x',
				distance: 2,
			},
		]);
	});
	it('should return 150 on the sample input', async () => {
		const moves = await readIntoArray('./source/day2/day2.sample.txt', parseMove);
		const pos = getPositionValue(moves);
		expect(pos).toBe(150);
	});

	it('should give the answer for the real data', async () => {
		const moves = await readIntoArray('./source/day2/day2.txt', parseMove);
		const pos = getPositionValue(moves);
		expect(pos).toBe(1728414);
	});
});

describe('when solving the day 2 b challenge', () => {
	it('should return 900 on the sample input', async () => {
		const moves = await readIntoArray('./source/day2/day2.sample.txt', parseMove);
		const pos = getPositionValueWithAim(moves);
		expect(pos).toBe(900);
	});

	it('should give the answer for the real data', async () => {
		const moves = await readIntoArray('./source/day2/day2.txt', parseMove);
		const pos = getPositionValueWithAim(moves);
		expect(pos).toBe(1765720035);
	});
});
