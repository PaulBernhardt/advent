import { Point, PriorityQueue } from './dataStructures';

describe('when using a priority queue', () => {
	it('should pop off the highest priority number', () => {
		const heap = new PriorityQueue<Number>((a, b) => a > b);
		heap.insert(4);
		heap.insert(5);
		heap.insert(2);

		expect(heap.pop()).toBe(5);
		expect(heap.pop()).toBe(4);
		heap.insert(3);
		expect(heap.pop()).toBe(3);
		expect(heap.pop()).toBe(2);
	});
});

describe('when using points', () => {
	it('should create points with the right coords and a hash', () => {
		const a = new Point(10, 2);
		expect(a.x).toBe(10);
		expect(a.y).toBe(2);
		expect(a.hash).toBe('10,2');

		const b = new Point(0, 30);
		expect(b.x).toBe(0);
		expect(b.y).toBe(30);
		expect(b.hash).toBe('0,30');
	});

	it('should alow cloning of points into new objects', () => {
		const a = new Point(2, 3);
		const b = Point.clone(a);

		expect(a).not.toBe(b);
		expect(a.x).toBe(b.x);
		expect(a.y).toBe(b.y);
		expect(a.hash).toBe(b.hash);
	});

	it('should match hashes if the coords match', () => {
		const a = new Point(4, 5);
		const b = new Point(4, 5);

		expect(a.hash).toBe(b.hash);

		b.y = 10;
		expect(a.hash).not.toBe(b.hash);

		b.y = 5;
		expect(a.hash).toBe(b.hash);

		a.x = -1;
		expect(a.hash).not.toBe(b.hash);

		a.x = 4;
		expect(a.hash).toBe(b.hash);
	});

	it('should subtract points', () => {
		const a = new Point(0, 2);
		const b = new Point(5, 1);

		const c = Point.sub(a, b);
		expect(c.x).toBe(-5);
		expect(c.y).toBe(1);

		const d = Point.sub(b, a);
		expect(d.x).toBe(5);
		expect(d.y).toBe(-1);
	});
});
