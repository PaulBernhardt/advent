import { findBasin, findMins } from './tubes';

export function solvePartOne(values: number[][]): number {
	const mins = findMins(values);

	let total = 0;
	for (const min of mins) {
		total += min.h + 1;
	}
	return total;
}

export function solvePartTwo(values: number[][]): number {
	const mins = findMins(values);
	const basins = mins.map((min) => findBasin(min, values)).sort((a, b) => b - a);
	return basins[0] * basins[1] * basins[2];
}
