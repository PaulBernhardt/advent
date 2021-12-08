import { distanceFromTarget, expensiveDistanceFromTarget, findMean, findMedian } from './crabs';

export function solvePartOne(values: number[]): number {
	const pile = findMedian(values);
	const distance = distanceFromTarget(pile);
	return distance;
}

export function solvePartTwo(values: number[]): number {
	const pile = findMean(values);
	const distance = expensiveDistanceFromTarget(pile);

	// We seem to be off by one on the target sometimes
	pile.target--;
	const downDistance = expensiveDistanceFromTarget(pile);
	pile.target += 2;
	const upDistance = expensiveDistanceFromTarget(pile);
	return Math.min(distance, upDistance, downDistance);
}
