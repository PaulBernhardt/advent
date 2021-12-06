import { ObjectParser } from '../utils/fileUtils';
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

export interface Marked {
	row: number[];
	column: number[];
}

export class Card {
	contents: Map<number, BingoNumber>;
	marked: Marked;
	complete: boolean = false;
	target: number;

	constructor(numbers: number[][]) {
		this.target = numbers.length;
		this.contents = new Map();
		this.marked = {
			row: new Array(numbers.length).fill(0),
			column: new Array(numbers[0].length).fill(0),
		};
		for (let y = 0; y < numbers.length; y++) {
			const row = numbers[y];
			for (let x = 0; x < row.length; x++) {
				this.contents.set(row[x], { x, y, marked: false });
			}
		}
	}

	mark(number: number): boolean {
		if (this.complete) {
			return false;
		}
		const position = this.contents.get(number);
		if (position) {
			position.marked = true;
			let col = this.marked.column[position.x];
			col++;
			this.marked.column[position.x] = col;

			let row = this.marked.row[position.y];
			row++;
			this.marked.row[position.y] = row;

			if (col == this.target || row == this.target) {
				this.complete = true;
			}
			return true;
		}
		return false;
	}

	sum(): number {
		let sum = 0;
		this.contents.forEach((bingo, number) => {
			if (!bingo.marked) {
				sum += number;
			}
		});
		return sum;
	}
}

export interface BingoTable {
	calls: number[];
	cards: Card[];
}

export class ParseBingoCards implements ObjectParser<BingoTable> {
	private state = new StateMachine<BingoState>(
		[
			[BingoState.calls, BingoState.card],
			[BingoState.card, BingoState.card],
		],
		BingoState.calls,
	);

	private table: BingoTable = {
		calls: [],
		cards: [],
	};

	private cardNumbers: number[][] = [];

	parse(line: string): void {
		switch (this.state.current) {
			case BingoState.calls:
				this.table.calls = line.split(',').map((x) => parseInt(x));
				break;
			case BingoState.card:
				this.cardNumbers.push(
					line
						.split(' ')
						.filter((x) => x.length > 0)
						.map((x) => parseInt(x)),
				);
		}
	}
	complete(): BingoTable {
		return this.table;
	}
	next() {
		if (this.state.current == BingoState.card) {
			this.table.cards.push(new Card(this.cardNumbers));
			this.cardNumbers = [];
		}
		this.state.next();
	}
}
