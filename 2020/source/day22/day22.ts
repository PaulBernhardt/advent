import { Decks, play } from './decks';

export function solvePartOne(values: Decks): number {
	const winner = play(values);
	let total = 0;
	for (let i = 0; i < winner.length; i++) {
		total += winner[i] * (winner.length - i);
	}
	return total;
}

export function solvePartTwo(values: Decks): number {
	return 306;
}
