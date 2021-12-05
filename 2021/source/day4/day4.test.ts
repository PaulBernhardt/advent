import { readIntoArray, readIntoObject } from '../utils/fileUtils';
import { BingoNumber, parseBingoCards, solvePartOne, solvePartTwo } from './day4';

function b(x, y, marked): BingoNumber {
	return { x, y, marked };
}

describe('when solving the day 4 challenge', () => {
	it('should return 4512 on the sample input', async () => {
		const values = await readIntoArray('./source/day4/day4.sample.txt', (x) => x);
		const result = solvePartOne(values);
		expect(result).toBe(4512);
	});
	describe('when parsing the bingo table input', () => {
		it('should parse simple input into a BingoTable', async () => {
			const table = await readIntoObject('./source/day4/day4.simple.txt', parseBingoCards);
			expect(table.calls).toMatchObject([1, 3, 4]);
			const cardOne = table.cards[0];
			expect(cardOne.contents.get(2)).toMatchObject(b(0, 0, false));
			expect(cardOne.contents.get(14)).toMatchObject(b(0, 1, false));
			expect(cardOne.contents.get(10)).toMatchObject(b(1, 0, false));
			expect(cardOne.contents.get(11)).toMatchObject(b(1, 1, false));

			const cardTwo = table.cards[1];
			expect(cardTwo.contents.get(5)).toMatchObject(b(0, 0, false));
			expect(cardTwo.contents.get(15)).toMatchObject(b(0, 1, false));
			expect(cardTwo.contents.get(16)).toMatchObject(b(1, 0, false));
			expect(cardTwo.contents.get(17)).toMatchObject(b(1, 1, false));
		});
	});

	describe('when marking cards', () => {
		it('should return nothing if there is no winner');
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoArray('./source/day4/day4.txt', (x) => x);
		const result = solvePartTwo(values);
		expect(result).toBe(10);
	});
});
