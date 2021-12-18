import { Point } from '../utils/dataStructures';
import { Parser } from '../utils/fileUtils';

export enum TARGET {
	BEFORE,
	INSIDE,
	PAST,
}

export interface Target {
	min: Point;
	max: Point;
}

export const parseTarget: Parser<Target> = (line: string): Target => {
	const [xStr, yStr] = line
		.split(':')[1]
		.split(', ')
		.map((str) => str.trim().substring(2));
	const [xMin, xMax] = xStr.split('..').map((n) => parseInt(n));
	const [yMin, yMax] = yStr.split('..').map((n) => parseInt(n));

	return {
		min: new Point(xMin, yMin),
		max: new Point(xMax, yMax),
	};
};

export function maxHeight(vector: Point, target: Target): number | null {
	let maxHeight = 0;
	let ySpeed = vector.y;
	let y = 0;
	while (y >= target.min.y) {
		y += ySpeed;
		maxHeight = Math.max(y, maxHeight);
		ySpeed--;
		if (y >= target.min.y && y <= target.max.y) {
			return maxHeight;
		}
	}
	return null;
}

export function findMaxHeight(target): number {
	let max = 0;
	for (let i = 1; i < Math.abs(target.min.y * 2); i++) {
		max = Math.max(max, maxHeight(new Point(0, i), target));
	}
	return max;
}

export function inside(point: Point, target: Target): TARGET {
	if (point.x > target.max.x || point.y < target.min.y) {
		return TARGET.PAST;
	}
	if (point.x >= target.min.x && point.x <= target.max.x && point.y >= target.min.y && point.y <= target.max.y) {
		return TARGET.INSIDE;
	}
	return TARGET.BEFORE;
}

export function hitsTarget(vector: Point, target: Target): boolean {
	let i = 0;
	let xSpeed = vector.x;
	let ySpeed = vector.y;

	let x = 0;
	let y = 0;
	while (true) {
		x += xSpeed;
		y += ySpeed;
		const result = inside(new Point(x, y), target);
		switch (result) {
			case TARGET.INSIDE:
				return true;
			case TARGET.PAST:
				return false;
		}
		if (xSpeed > 0) {
			xSpeed--;
		}
		ySpeed--;
	}
}

export function findHits(target: Target): Point[] {
	const hits: Point[] = [];
	for (let x = 0; x <= target.max.x; x++) {
		for (let y = target.min.y; y <= Math.abs(target.min.y * 2); y++) {
			const vector = new Point(x, y);
			if (hitsTarget(vector, target)) {
				hits.push(vector);
			}
		}
	}

	return hits;
}
