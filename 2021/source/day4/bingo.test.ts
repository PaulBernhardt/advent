import { readIntoObject } from '../utils/fileUtils';

import { BingoNumber, Card, ParseBingoCards } from './bingo';

function b(x, y, marked): BingoNumber {
	return { x, y, marked };
}

describe('when parsing the bingo table input', () => {
	it('should parse simple input into a BingoTable', async () => {
		const table = await readIntoObject('./source/day4/day4.simple.txt', new ParseBingoCards());
		expect(table.calls).toMatchObject([1, 3, 4]);
		const cardOne = table.cards[0];
		expect(cardOne.contents.get(2)).toMatchObject(b(0, 0, false));
		expect(cardOne.contents.get(14)).toMatchObject(b(1, 0, false));
		expect(cardOne.contents.get(10)).toMatchObject(b(0, 1, false));
		expect(cardOne.contents.get(11)).toMatchObject(b(1, 1, false));

		const cardTwo = table.cards[1];
		expect(cardTwo.contents.get(5)).toMatchObject(b(0, 0, false));
		expect(cardTwo.contents.get(15)).toMatchObject(b(1, 0, false));
		expect(cardTwo.contents.get(16)).toMatchObject(b(0, 1, false));
		expect(cardTwo.contents.get(17)).toMatchObject(b(1, 1, false));
	});
});

describe('when marking cards', () => {
	it('should return true if there is a hit and false if not', async () => {
		const table = await readIntoObject('./source/day4/day4.simple.txt', new ParseBingoCards());
		const result = table.cards[0].mark(2);
		expect(result).toBe(true);
		const miss = table.cards[0].mark(140);
		expect(miss).toBe(false);
	});
	it('should mark completed true if there is a row winner', async () => {
		const table = await readIntoObject('./source/day4/day4.simple.txt', new ParseBingoCards());
		const card = table.cards[0];
		expect(card.complete).toBe(false);
		expect(card.mark(2)).toBe(true);
		expect(card.complete).toBe(false);
		expect(card.mark(14)).toBe(true);
		expect(card.complete).toBe(true);
	});

	it('should mark completed true is a column winner, and stop marking after', async () => {
		const table = await readIntoObject('./source/day4/day4.simple.txt', new ParseBingoCards());
		const card = table.cards[0];
		expect(card.complete).toBe(false);
		expect(card.mark(2)).toBe(true);
		expect(card.complete).toBe(false);
		expect(card.mark(10)).toBe(true);
		expect(card.complete).toBe(true);
		expect(card.mark(14)).toBe(false);
	});

	it('should mark completed false if there is no winner', async () => {
		const table = await readIntoObject('./source/day4/day4.simple.txt', new ParseBingoCards());
		const card = table.cards[0];
		expect(card.complete).toBe(false);
		expect(card.mark(2)).toBe(true);
		expect(card.complete).toBe(false);
		expect(card.mark(100)).toBe(false);
		expect(card.complete).toBe(false);
	});
});

describe('when checking sums', () => {
	it('should return the sum of all unmarked numbers', () => {
		const card = new Card([
			[1, 2],
			[3, 4],
		]);
		expect(card.sum()).toBe(10);
		card.mark(1);
		expect(card.sum()).toBe(9);
		card.mark(6);
		expect(card.sum()).toBe(9);
		card.mark(4);
		expect(card.sum()).toBe(5);
	});
});
