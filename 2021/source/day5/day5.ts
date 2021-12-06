import { Coord, Vent } from './vent';

function key(coord: Coord): string {
	return `${coord.x},${coord.y}`;
}

export function solvePartOne(vents: Vent[]): number {
	const map: Map<string, number> = new Map();
	for (const vent of vents) {
		const { start, end } = vent;
		if (start.x == end.x) {
			const x = start.x;
			const minY = Math.min(start.y, end.y);
			const maxY = Math.max(start.y, end.y);
			for (let y = minY; y <= maxY; y++) {
				const coord = key({ x, y });
				map.set(coord, (map.get(coord) ?? 0) + 1);
			}
		} else if (start.y == end.y) {
			const y = start.y;
			const minX = Math.min(start.x, end.x);
			const maxX = Math.max(start.x, end.x);
			for (let x = minX; x <= maxX; x++) {
				const coord = key({ x, y });
				map.set(coord, (map.get(coord) ?? 0) + 1);
			}
		}
	}

	let total = 0;
	for (const count of map.values()) {
		if (count > 1) {
			total++;
		}
	}
	return total;
}

export function solvePartTwo(vents: Vent[]): number {
	const map: Map<string, number> = new Map();
	for (const vent of vents) {
		const { start, end } = vent;
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
	let total = 0;
	for (const count of map.values()) {
		if (count > 1) {
			total++;
		}
	}
	return total;
}
