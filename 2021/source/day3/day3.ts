export function solveDay3A(values: string[]): number {
	const counts = Array(values[0].length).fill(0);
	for (let i = 0; i < values[0].length; i++) {
		counts[i] = mostCommonDigit(values, i);
	}
	let mostCommon = [];
	let leastCommon = [];
	for (const value of counts) {
		mostCommon.push(value > values.length / 2 ? 1 : 0);
		leastCommon.push(value > values.length / 2 ? 0 : 1);
	}
	const gamma = parseInt(counts.join(''), 2);
	// Flip the most common digit with a binary XOR to get least common
	const epsilon = parseInt(counts.map((x) => x ^ 1).join(''), 2);
	return gamma * epsilon;
}

export function solveDay3B(values: string[]): number {
	const oxy = parseInt(calcRating(values, 0, true), 2);
	const co = parseInt(calcRating(values, 0, false), 2);
	return oxy * co;
}

export function mostCommonDigit(values: string[], position: number): string {
	let count = 0;
	for (const line of values) {
		if (line[position] == '1') {
			count++;
		}
	}
	return count >= values.length / 2 ? '1' : '0';
}

export function calcRating(values: string[], position: number, mostCommon: boolean): string {
	if (values.length == 1) {
		return values[0];
	}
	const digit = mostCommonDigit(values, position);
	return calcRating(
		// Keep values that match the most common if that's what we're looking for,
		// or values that don't match if we're looking for the least common.
		values.filter((value) => (value[position] == digit) == mostCommon),
		position + 1,
		mostCommon,
	);
}
