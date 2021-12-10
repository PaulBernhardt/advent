import { ObjectParser } from '../utils/fileUtils';
import { StateMachine } from '../utils/stateMachine';

export enum Player {
	p1 = 'p1',
	p2 = 'p2',
}

export interface Decks {
	p1: number[];
	p2: number[];
}

export class DecksParser implements ObjectParser<Decks> {
	decks: Decks = {
		p1: [],
		p2: [],
	};
	state = new StateMachine<Player>([[Player.p1, Player.p2]], Player.p1);
	parse(line: string): void {
		if (line.match(/:/)) {
			return;
		}
		this.decks[this.state.current].push(parseInt(line));
	}
	next(): void {
		this.state.next();
	}
	complete(): Decks {
		return this.decks;
	}
}

export function play(decks: Decks): number[] {
	while (decks.p1.length > 0 && decks.p2.length > 0) {
		const p1 = decks.p1.shift();
		const p2 = decks.p2.shift();
		if (p1 > p2) {
			decks.p1.push(p1, p2);
		} else {
			decks.p2.push(p2, p1);
		}
	}

	return decks.p1.length > 0 ? decks.p1 : decks.p2;
}
