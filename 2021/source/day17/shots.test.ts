import { Point } from '../utils/dataStructures';
import { findMaxHeight, hitsTarget, inside, maxHeight, parseTarget, TARGET } from './shots';

describe('when aiming shots', () => {
	it('should parse an input string into a target', () => {
		const sample = 'target area: x=20..30, y=-10..-5';
		const target = parseTarget(sample);

		expect(target.max.x).toBe(30);
		expect(target.max.y).toBe(-5);

		expect(target.min.x).toBe(20);
		expect(target.min.y).toBe(-10);
	});

	it('should report the max height for various input vectors', () => {
		const sample = 'target area: x=20..30, y=-10..-5';
		const target = parseTarget(sample);
		expect(maxHeight(new Point(6, 9), target)).toBe(45);
		expect(maxHeight(new Point(6, 10), target)).toBe(null);
	});

	it('should find the max height for a target', () => {
		const sample = 'target area: x=20..30, y=-10..-5';
		const target = parseTarget(sample);
		expect(findMaxHeight(target)).toBe(45);
	});

	it('should identify points that are in and out of targets', () => {
		const sample = 'target area: x=20..30, y=-10..-5';
		const target = parseTarget(sample);

		expect(inside(new Point(20, -5), target)).toBe(TARGET.INSIDE);
		expect(inside(new Point(5, -5), target)).toBe(TARGET.BEFORE);
		expect(inside(new Point(25, -8), target)).toBe(TARGET.INSIDE);
		expect(inside(new Point(20, -20), target)).toBe(TARGET.PAST);
	});

	it('should identify which vectors hit the target', () => {
		const sample = 'target area: x=20..30, y=-10..-5';
		const target = parseTarget(sample);

		expect(hitsTarget(new Point(6, 9), target)).toBe(true);
		expect(hitsTarget(new Point(6, 10), target)).toBe(false);
		expect(hitsTarget(new Point(4, 9), target)).toBe(false);
	});
});
