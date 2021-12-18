import { findHits, findMaxHeight, Target } from './shots';

export function solvePartOne(target: Target): number {
	return findMaxHeight(target);
}

export function solvePartTwo(target: Target): number {
	return findHits(target).length;
}
