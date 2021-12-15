import { ObjectParser } from '../utils/fileUtils';
import { StateMachine } from '../utils/stateMachine';

enum POLYMER_STATE {
	POLYMER,
	RULES,
}

export class PolymerParser implements ObjectParser<PolymerTemplate> {
	template: PolymerTemplate;
	state = new StateMachine([[POLYMER_STATE.POLYMER, POLYMER_STATE.RULES]], POLYMER_STATE.POLYMER);
	parse(line: string): void {
		switch (this.state.current) {
			case POLYMER_STATE.POLYMER:
				this.template = new PolymerTemplate(line);
				break;
			case POLYMER_STATE.RULES:
				const [input, output] = line.split(' -> ');
				// Add the element on the other side of the output because
				// we are going to just add the output directly to a string buffer
				this.template.rules.set(input, `${output}`);
				break;
		}
	}
	next(): void {
		this.state.next();
	}
	complete(): PolymerTemplate {
		return this.template;
	}
}

export class PolymerTemplate {
	polymer: Map<string, number> = new Map();
	firstElement: string;
	rules: Map<string, string> = new Map();

	constructor(polymer: string) {
		// We won't count the first element of a pair when we figure out the total
		// So keep track of it and just add one to it's count
		this.firstElement = polymer[0];
		for (let i = 0; i < polymer.length - 1; i++) {
			const pair = polymer.substring(i, i + 2);
			addPair(pair, 1, this.polymer);
		}
	}

	next(steps: number = 1) {
		for (let i = 0; i < steps; i++) {
			const polymer = this.polymer;
			const nextPolymer = new Map<string, number>();
			for (const [pair, count] of polymer.entries()) {
				// Assuming all pairs in the polymer will match a rule
				const output = this.rules.get(pair);
				const a = pair[0] + output;
				const b = output + pair[1];

				addPair(a, count, nextPolymer);
				addPair(b, count, nextPolymer);
			}
			this.polymer = nextPolymer;
		}
	}

	countElements(): Map<string, number> {
		const elements: Map<string, number> = new Map();
		elements.set(this.firstElement, 1);

		for (const [pair, count] of this.polymer.entries()) {
			addPair(pair[1], count, elements);
		}
		return elements;
	}
}

export function addPair(pair: string, count: number, map: Map<string, number>) {
	map.set(pair, (map.get(pair) ?? 0) + count);
}
