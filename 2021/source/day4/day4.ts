import { BingoTable, Card } from './bingo';

export function markCards(call: number, cards: Card[]): Card[] {
	const winners = [];
	for (const card of cards) {
		if (card.mark(call) && card.complete) {
			winners.push(card);
		}
	}
	return winners;
}

export function solvePartOne(table: BingoTable): number {
	for (const call of table.calls) {
		const result = markCards(call, table.cards);
		if (result[0]) {
			return result[0].sum() * call;
		}
	}
	return 0;
}

export function solvePartTwo(table: BingoTable): number {
	let winners = 0;
	for (const call of table.calls) {
		const result = markCards(call, table.cards);
		if (result) {
			winners += result.length;
			if (winners >= table.cards.length) {
				return result[result.length - 1].sum() * call;
			}
		}
	}
	return 0;
}
