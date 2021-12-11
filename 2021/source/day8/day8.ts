import { convert, Signal } from './digits';

export function solvePartOne(values: number[]): number {
	let count = 0;
	for (const value of values) {
		count += value;
	}
	return count;
}

export function solvePartTwo(values: Signal[]): number {
	let total = 0;
	for (const { segments, output } of values) {
		total += parseInt(output.map((out) => convert(out, segments)).join(''));
	}

	return total;
}
