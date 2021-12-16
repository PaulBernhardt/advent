import { aStar } from './chitons';

export function solvePartOne(costArray: number[][]): number {
	const shortPath = aStar(costArray);
	return shortPath.realIncurredCost;
}

export function solvePartTwo(costArray: number[][]): number {
	const shortPath = aStar(costArray, 5);
	return shortPath.realIncurredCost;
}
