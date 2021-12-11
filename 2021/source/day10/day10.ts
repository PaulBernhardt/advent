import { calcQueueScore, checkLine, SCORE } from './syntax';
export function solvePartOne(values: string[]): number {
	let total = 0;
	for (const line of values) {
		const { char } = checkLine(line);
		if (char) {
			total += SCORE[char];
		}
	}
	return total;
}

export function solvePartTwo(values: string[]): number {
	let scores = [];
	for (const line of values) {
		const { queue } = checkLine(line);
		if (queue) {
			scores.push(calcQueueScore(queue));
		}
	}
	scores.sort((a, b) => a - b);
	return scores[(scores.length - 1) / 2];
}
