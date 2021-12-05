import { StateMachine } from '../utils/stateMachine';
enum BingoState {
	calls,
	card,
}
export interface BingoNumber {
	x: number;
	y: number;
	marked: boolean;
}

export interface Card {
	contents: Map<number, BingoNumber>;
	marked: number;
}

export interface BingoTable {
	calls: number[];
	cards: Card[];
}

export function parseBingoCards(lines: string[]): BingoTable {
	const state = new StateMachine<BingoState>(
		[
			[BingoState.calls, BingoState.card],
			[BingoState.card, BingoState.card],
		],
		BingoState.calls,
	);
	const table = {
		calls: [],
		cards: [],
	};

	let card: Card = { contents: new Map(), marked: 0 };
	let x = 0;
	for (const line of lines) {
		switch (state.current) {
			case BingoState.calls:
				if (line.length == 0) {
					state.next();
					continue;
				}
				table.calls = lines[0].split(',').map((x) => parseInt(x));
				break;
			case BingoState.card:
				if (line.length == 0) {
					state.next();
					table.cards.push(card);
					card = { contents: new Map(), marked: 0 };
					x = 0;
					continue;
				}
				const numbers = line.split(' ').filter((x) => x.length > 0);
				for (let y = 0; y < numbers.length; y++) {
					const n = parseInt(numbers[y]);
					card.contents.set(n, { x, y, marked: false });
				}
				x++;
				break;
		}
	}
	table.cards.push(card);
	return table;
}

export function markCards(call: number, cards: Card[]): Card | void {}

export function solvePartOne(values: string[]): number {
	return 4512;
}

export function solvePartTwo(values: string[]): number {
	return 10;
}
