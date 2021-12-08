export interface CrabPile {
	crabs: number[];
	target: number;
}

export function findMedian(crabs: number[]): CrabPile {
	crabs.sort((a, b) => a - b);
	return {
		crabs,
		target: crabs[Math.floor(crabs.length / 2)],
	};
}

export function findMean(crabs: number[]): CrabPile {
	let total = 0;
	for (const crab of crabs) {
		total += crab;
	}
	return {
		crabs,
		target: Math.floor(total / crabs.length),
	};
}

export function distanceFromTarget(pile: CrabPile): number {
	let distance = 0;
	for (const crab of pile.crabs) {
		distance += Math.abs(crab - pile.target);
	}
	return distance;
}

export function expensiveDistanceFromTarget(pile: CrabPile): number {
	let distance = 0;
	for (const crab of pile.crabs) {
		distance += calcCost(Math.abs(crab - pile.target));
	}
	return distance;
}

const costCache = [0, 1];
export function calcCost(target: number): number {
	let cost = costCache[target];
	if (cost == undefined) {
		costCache.push(calcCost(target - 1) + target);
		cost = costCache[target];
	}
	return cost;
}
