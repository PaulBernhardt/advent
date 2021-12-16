import { util } from 'prettier';
import { Point, PriorityCompartor, PriorityQueue } from '../utils/dataStructures';

export function parseCostString(line: string): number[] {
	return line.split('').map((x) => parseInt(x));
}

const pathPriority: PriorityCompartor<Path> = (a: Path, b: Path) => {
	return a.estimatedTotalCost < b.estimatedTotalCost;
};

const NEIGHBOUR_DIRECTIONS = [new Point(1, 0), new Point(0, 1), new Point(-1, 0), new Point(0, -1)];

export function generateNeighbours(point: Point, max: Point): Point[] {
	let neighbours = [];
	for (const n of NEIGHBOUR_DIRECTIONS) {
		const neighbour = Point.sub(point, n);
		if (neighbour.x >= 0 && neighbour.y >= 0 && neighbour.x <= max.x && neighbour.y <= max.y) {
			neighbours.push(neighbour);
		}
	}
	return neighbours;
}
export class Path {
	readonly realIncurredCost: number;
	readonly estimatedTotalCost: number;
	readonly path: Point[];
	readonly endPoint: Point;

	constructor(oldPath: Path | null, nextPoint: Point, cost: number, dest: Point) {
		this.path = Array.from(oldPath?.path ?? []);
		this.path.push(nextPoint);
		this.endPoint = nextPoint;

		this.realIncurredCost = (oldPath?.realIncurredCost ?? 0) + cost;
		const delta = Point.sub(dest, nextPoint);
		this.estimatedTotalCost = this.realIncurredCost + Math.abs(delta.x) + Math.abs(delta.y);
	}
}

export function aStar(costArray: number[][], extensions = 1): Path {
	const queue = new PriorityQueue<Path>(pathPriority);
	const considered = new Set<string>();
	const origin = new Point(0, 0);
	const dest = new Point(costArray.length * extensions - 1, costArray[0].length * extensions - 1);

	let path = new Path(null, origin, 0, dest);

	while (!Point.equals(path.endPoint, dest)) {
		considered.add(path.endPoint.hash);
		for (const point of generateNeighbours(path.endPoint, dest)) {
			if (!considered.has(point.hash)) {
				queue.insert(new Path(path, point, getCost(point, costArray), dest));
			}
		}
		do {
			path = queue.pop();
		} while (considered.has(path.endPoint.hash));
	}
	return path;
}

export function getCost(point: Point, costArray: number[][]) {
	const yLength = costArray.length;
	const xLength = costArray.length;
	const bonus = Math.floor(point.y / yLength) + Math.floor(point.x / xLength) - 1;
	return ((costArray[point.y % yLength][point.x % xLength] + bonus) % 9) + 1;
}
