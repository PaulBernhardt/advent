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

export function key(coord: Coord): string {
	return `${coord.x},${coord.y}`;
}

export function mapVents(vents: Vent[], diagonal: boolean): Map<string, number> {
	const map: Map<string, number> = new Map();
	for (const vent of vents) {
		const { start, end } = vent;
		if (!diagonal && start.x != end.x && start.y != end.y) {
			continue;
		}
		let xDir = 0;
		let yDir = 0;
		if (start.x > end.x) {
			xDir = -1;
		} else if (start.x < end.x) {
			xDir = 1;
		}

		if (start.y > end.y) {
			yDir = -1;
		} else if (start.y < end.y) {
			yDir = 1;
		}

		let { x, y } = start;
		let coord = key({ x, y });
		map.set(coord, (map.get(coord) ?? 0) + 1);
		do {
			x += xDir;
			y += yDir;
			coord = key({ x, y });
			map.set(coord, (map.get(coord) ?? 0) + 1);
		} while (x != end.x || y != end.y);
	}
	return map;
}
