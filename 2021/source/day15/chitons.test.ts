import { Point } from '../utils/dataStructures';
import { readIntoArray } from '../utils/fileUtils';
import { parseCostString, Path, aStar, generateNeighbours, getCost } from './chitons';

describe('when avoiding chitons', () => {
	it('should parse cost strings', async () => {
		expect(parseCostString('145')).toMatchObject([1, 4, 5]);
		expect(parseCostString('9532')).toMatchObject([9, 5, 3, 2]);
	});

	it('should create paths with correct costs', () => {
		const dest = new Point(2, 3);
		const aEnd = new Point(1, 0);
		const a = new Path(null, aEnd, 4, dest);

		expect(a.endPoint).toBe(aEnd);
		expect(a.path).toBe(null);
		expect(a.realIncurredCost).toBe(4);
		expect(a.estimatedTotalCost).toBe(8);

		const bEnd = new Point(1, 1);
		const b = new Path(a, bEnd, 2, dest);
		expect(b.endPoint).toBe(bEnd);
		expect(b.path).toBe(a);
		expect(b.realIncurredCost).toBe(6);
		expect(b.estimatedTotalCost).toBe(9);
	});

	it('should generate neighbours around a point', () => {
		const a = new Point(0, 0);
		const max = new Point(2, 2);

		const neighbours = generateNeighbours(a, max);
		expect(neighbours.length).toBe(2);
	});

	it('should find the shortest path for the sample input', async () => {
		const costArray = await readIntoArray('./source/day15/day15.sample.txt', parseCostString);

		const shortPath = aStar(costArray);
		expect(shortPath.realIncurredCost).toBe(40);
	});

	it('should find right dest for the sample array on 5 iterations', async () => {
		const costArray = await readIntoArray('./source/day15/day15.sample2.txt', parseCostString);

		const shortPath = aStar(costArray, 5);
		expect(shortPath.endPoint.x).toBe(24);
		expect(shortPath.endPoint.y).toBe(24);
	});

	it('should calculate costs for points at different multiples of the cost array', () => {
		const costArray = [
			[8, 1, 2],
			[1, 1, 1],
			[1, 1, 1],
		];

		expect(getCost(new Point(0, 0), costArray)).toBe(8);
		expect(getCost(new Point(1, 0), costArray)).toBe(1);
		expect(getCost(new Point(2, 0), costArray)).toBe(2);
		expect(getCost(new Point(3, 0), costArray)).toBe(9);
		expect(getCost(new Point(4, 0), costArray)).toBe(2);
		expect(getCost(new Point(5, 0), costArray)).toBe(3);
		expect(getCost(new Point(6, 0), costArray)).toBe(1);

		expect(getCost(new Point(0, 3), costArray)).toBe(9);
		expect(getCost(new Point(6, 3), costArray)).toBe(2);
	});
});
