import { FishCollection } from './fish';

export function solvePartOne(fishCollection: FishCollection): number {
	for (let i = 0; i < 80; i++) {
		fishCollection.next();
	}

	let total = 0;
	for (const fish of fishCollection.fish) {
		total += fish;
	}
	return total;
}

export function solvePartTwo(fishCollection: FishCollection): number {
	for (let i = 0; i < 256; i++) {
		fishCollection.next();
	}

	let total = 0;
	for (const fish of fishCollection.fish) {
		total += fish;
	}
	return total;
}
