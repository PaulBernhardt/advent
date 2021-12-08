import { distanceFromTarget, findMedian, findMean, calcCost, CrabPile, expensiveDistanceFromTarget } from './crabs';

describe('when finding crab layouts', () => {
	it('should return the median and sorted array', () => {
		const arr = [10, 1, 2];
		const pile = findMedian(arr);
		expect(pile.target).toBe(2);
		expect(pile.crabs).toMatchObject([1, 2, 10]);
	});
	it('should find the distance to the median', () => {
		const arr = [10, 1, 2];
		const pile = findMedian(arr);
		const distance = distanceFromTarget(pile);
		expect(distance).toBe(9);
	});

	it('should return the mean and original array', () => {
		const arr = [10, 1, 2];
		const pile = findMean(arr);
		expect(pile.target).toBe(4);
		expect(pile.crabs).toMatchObject([10, 1, 2]);
	});

	it('should calculate the costs of numbers', () => {
		expect(calcCost(4)).toBe(10);
		expect(calcCost(5)).toBe(15);
		expect(calcCost(3)).toBe(6);
	});

	it('should calculate the expensive cost of a crab pile', () => {
		const pile: CrabPile = {
			crabs: [5, 1, 2],
			target: 2,
		};

		expect(expensiveDistanceFromTarget(pile)).toBe(7);
	});
});
