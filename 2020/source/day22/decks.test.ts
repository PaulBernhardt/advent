import { readIntoObject } from '../utils/fileUtils';
import { DecksParser, play } from './decks';

describe('when parsing the deck input', () => {
	it('should parse the example input into a Decks object', async () => {
		const values = await readIntoObject('./source/day22/day22.sample.txt', new DecksParser());
		expect(values.p1).toMatchObject([9, 2, 6, 3, 1]);
		expect(values.p2).toMatchObject([5, 8, 4, 7, 10]);
	});
});

describe('when playing the game', () => {
	it('should give you the final winning state', async () => {
		const values = await readIntoObject('./source/day22/day22.sample.txt', new DecksParser());
		expect(play(values)).toMatchObject([3, 2, 10, 6, 8, 5, 9, 4, 7, 1]);
	});
});
