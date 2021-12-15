import { PolymerTemplate } from './polymer';

export function solvePartOne(template: PolymerTemplate): number {
	template.next(10);
	const count = template.countElements();
	const min = Math.min(...count.values());
	const max = Math.max(...count.values());

	return max - min;
}

export function solvePartTwo(template: PolymerTemplate): number {
	template.next(40);
	const count = template.countElements();
	const min = Math.min(...count.values());
	const max = Math.max(...count.values());

	return max - min;
}
