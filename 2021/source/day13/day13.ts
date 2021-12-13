import { Paper } from './paper';

export function solvePartOne(paper: Paper): number {
	paper.fold(1);
	return paper.dots.size;
}

export function solvePartTwo(paper: Paper): string[][] {
	paper.fold();
	const lines = paper.print();
	for (const line of lines) {
		console.log(line.join(''));
	}
	return lines;
}
