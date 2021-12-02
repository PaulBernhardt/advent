export function countIncreases(depths: number[]): number {
	let count = 0;
	for (let i = 1; i < depths.length; i++) {
		if (depths[i] > depths[i - 1]) {
			count++;
		}
	}
	return count;
}

export function countThreeIncrease(depths: number[]): number {
	let window = depths[0] + depths[1] + depths[2];
	const windows: number[] = [window];
	for (let i = 1; i < depths.length - 2; i++) {
		window = window - depths[i - 1] + depths[i + 2];
		windows.push(window);
	}

	return countIncreases(windows);
}
