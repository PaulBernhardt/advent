import { ObjectParser } from '../utils/fileUtils';
import { StateMachine } from '../utils/stateMachine';

interface Dot {
	x: number;
	y: number;
}

export function d(x: number, y: number): Dot {
	return { x, y };
}

export enum PAPER_STATE {
	DOTS,
	INSTRUCTIONS,
}

export interface Instruction {
	axis: 'x' | 'y';
	magnitude: number;
}

export class PaperParser implements ObjectParser<Paper> {
	state = new StateMachine<PAPER_STATE>([[PAPER_STATE.DOTS, PAPER_STATE.INSTRUCTIONS]], PAPER_STATE.DOTS);
	paper = new Paper();
	parse(line: string): void {
		switch (this.state.current) {
			case PAPER_STATE.DOTS:
				const [x, y] = line.split(',');
				this.paper.addDot(parseInt(x), parseInt(y));
				break;
			case PAPER_STATE.INSTRUCTIONS:
				const [axis, magnitude] = line.split(' ')[2].split('=');
				this.paper.instructions.push({ axis: axis as 'x' | 'y', magnitude: parseInt(magnitude) });
				break;
		}
	}
	next(): void {
		this.state.next();
	}
	complete(): Paper {
		return this.paper;
	}
}

function dotStr(dot: Dot) {
	return `${dot.x},${dot.y}`;
}

export class Paper {
	dots: Map<string, Dot> = new Map();
	instructions: Instruction[] = [];
	max: Dot = { x: 0, y: 0 };
	addDot(x: number, y: number) {
		const dot = { x, y };
		this.dots.set(dotStr(dot), dot);
		this.max.x = Math.max(x, this.max.x);
		this.max.y = Math.max(y, this.max.y);
	}

	fold(folds: number = this.instructions.length) {
		for (let i = 0; i < folds; i++) {
			const { axis, magnitude } = this.instructions[i];
			const dots = Array.from(this.dots.values());
			this.max[axis] = magnitude;
			for (const dot of dots) {
				if (dot[axis] > magnitude) {
					this.dots.delete(dotStr(dot));
					dot[axis] = magnitude - (dot[axis] - magnitude);
					this.dots.set(dotStr(dot), dot);
				}
			}
		}
	}

	print() {
		const output: string[][] = [];
		for (let i = 0; i < this.max.y; i++) {
			output.push(Array(this.max.x).fill('.'));
		}
		for (const dot of this.dots.values()) {
			output[dot.y][dot.x] = '#';
		}
		return output;
	}
}
