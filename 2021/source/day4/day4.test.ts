import { readIntoObject } from '../utils/fileUtils';
import { Card, ParseBingoCards } from './bingo';
import { solvePartOne, solvePartTwo, markCards } from './day4';

describe('when solving the day 4 challenge', () => {
	it('should return 4512 on the sample input', async () => {
		const values = await readIntoObject('./source/day4/day4.sample.txt', new ParseBingoCards());
		const result = solvePartOne(values);
		expect(result).toBe(4512);
	});

	it('should mark all cards and return the winning card if one wins', async () => {
		const { cards } = await readIntoObject('./source/day4/day4.simple.txt', new ParseBingoCards());
		expect(markCards(5, cards).length).toBe(0);
		const winner = markCards(16, cards);
		expect(winner.length).toBe(1);
		const card = winner[0];
		expect(card.complete).toBe(true);
		expect(card.marked.column[0]).toBe(2);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day4/day4.txt', new ParseBingoCards());
		const result = solvePartOne(values);
		expect(result).toBe(33348);
	});
});

describe('when solving the day 4 part 2 challenge', () => {
	it('should return 1924 on the sample input', async () => {
		const values = await readIntoObject('./source/day4/day4.sample.txt', new ParseBingoCards());
		const result = solvePartTwo(values);
		expect(result).toBe(1924);
	});

	it('should give the answer for the real data', async () => {
		const values = await readIntoObject('./source/day4/day4.txt', new ParseBingoCards());
		const result = solvePartTwo(values);
		expect(result).toBe(8112);
	});
});
