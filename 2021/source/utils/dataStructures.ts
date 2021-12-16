/**
 * Returns true if A has a higher priority than B
 */
export type PriorityCompartor<Type> = (a: Type, b: Type) => boolean;

/**
 * A binary heap implementation of a priority queue
 */
export class PriorityQueue<Type> {
	hasPriority: PriorityCompartor<Type>;

	private array: Type[] = [];

	public up(index: number) {
		if (index == 0) {
			return;
		}
		const child = this.array[index];
		const parentIndex = Math.floor((index - 1) / 2);
		const parent = this.array[parentIndex];
		if (this.hasPriority(child, parent)) {
			this.array[parentIndex] = child;
			this.array[index] = parent;
			this.up(parentIndex);
		}
	}

	public down(index: number) {
		const array = this.array;
		let largest = index;
		const leftIndex = 2 * index + 1;
		const rightIndex = 2 * index + 2;

		if (leftIndex < array.length && this.hasPriority(array[leftIndex], array[largest])) {
			largest = leftIndex;
		}
		if (rightIndex < array.length && this.hasPriority(array[rightIndex], array[largest])) {
			largest = rightIndex;
		}

		if (largest != index) {
			const parent = array[index];
			const child = array[largest];
			array[largest] = parent;
			array[index] = child;
			this.down(largest);
		}
	}

	insert(value: Type) {
		this.array.push(value);
		this.up(this.array.length - 1);
	}
	pop(): Type {
		const top = this.array[0];
		const bottom = this.array.pop();
		this.array[0] = bottom;

		this.down(0);
		return top;
	}

	constructor(hasPriority: PriorityCompartor<Type>) {
		this.hasPriority = hasPriority;
	}
}

export class Point {
	private _x: number = 0;
	private _y: number = 0;

	get x(): number {
		return this._x;
	}
	get y(): number {
		return this._y;
	}

	set x(newX: number) {
		this._x = newX;
		this.hash = `${this._x},${this._y}`;
	}

	set y(newY: number) {
		this._y = newY;
		this.hash = `${this._x},${this._y}`;
	}

	hash: string;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static clone(point: Point) {
		return new Point(point.x, point.y);
	}

	static sub(a: Point, b: Point) {
		return new Point(a.x - b.x, a.y - b.y);
	}

	static equals(a: Point, b: Point) {
		return a.x == b.x && a.y == b.y;
	}
}
