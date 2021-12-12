import { OctoGrid } from './octopus';

export function solvePartOne(grid: OctoGrid): number {
	grid.next(100);
	return grid.flashes;
}

export function solvePartTwo(grid: OctoGrid): number {
	const results = grid.next(-1);
	return results;
}
