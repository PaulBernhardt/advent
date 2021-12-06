import { Coord, mapVents, Vent } from './vent';

export function solvePartOne(vents: Vent[]): number {
	const map = mapVents(vents, false);

	let total = 0;
	for (const count of map.values()) {
		if (count > 1) {
			total++;
		}
	}
	return total;
}

export function solvePartTwo(vents: Vent[]): number {
	const map = mapVents(vents, true);
	let total = 0;
	for (const count of map.values()) {
		if (count > 1) {
			total++;
		}
	}
	return total;
}
