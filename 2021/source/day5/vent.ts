import { ObjectParser } from '../utils/fileUtils';

export interface Coord {
	x: number;
	y: number;
}

export interface Vent {
	start: Coord;
	end: Coord;
}

export class VentParser implements ObjectParser<Vent> {
	vents: Vent[] = [];
	max: number = 0;

	parse(line: string): void {
		const coords = line.split(' -> ');
		const start = coords[0].split(',').map((x) => parseInt(x));
		const end = coords[1].split(',').map((x) => parseInt(x));

		this.max = Math.max(this.max, start[0], start[1], end[0], end[1]);
		this.vents.push({
			start: {
				x: start[0],
				y: start[1],
			},
			end: {
				x: end[0],
				y: end[1],
			},
		});
	}
	next(): void {
		throw new Error('Method not implemented.');
	}
	complete(): Vent {
		throw new Error('Method not implemented.');
	}
}
export function parseVent(line: string): Vent {
	const coords = line.split(' -> ');
	const start = coords[0].split(',').map((x) => parseInt(x));
	const end = coords[1].split(',').map((x) => parseInt(x));
	return {
		start: {
			x: start[0],
			y: start[1],
		},
		end: {
			x: end[0],
			y: end[1],
		},
	};
}
