import { readIntoObject } from '../utils/fileUtils';
import { Cave, CaveParser } from './cave';

expect.extend({
	toConnectToCave(obj: Cave, name: string): any {
		const found = obj.neighbours.findIndex((cave) => {
			cave.name == name;
		});
		if (found >= 0) {
			return {
				message: () => `expected ${obj} name to be '${name}'`,
				pass: true,
			};
		} else {
			return {
				message: () => `expected ${obj} name to be '${name}', got ${obj.name}`,
				pass: true,
			};
		}
	},
});

declare global {
	namespace jest {
		interface Matchers<R> {
			toConnectToCave(name: string): R;
		}
	}
}
describe('when navigating through caves', () => {
	it('should parse the simple example into a CaveNetwork', async () => {
		const network = await readIntoObject('./source/day12/day12.simple.txt', new CaveParser());
		expect(network.caves.get('start')).toMatchObject({ name: 'start' });
		expect(network.caves.get('A')).toMatchObject({ name: 'A' });
		expect(network.caves.get('b')).toMatchObject({ name: 'b' });
		expect(network.caves.get('c')).toMatchObject({ name: 'c' });
		expect(network.caves.get('d')).toMatchObject({ name: 'd' });
		expect(network.caves.get('end')).toMatchObject({ name: 'end' });

		const start = network.start;
		expect(start.large).toBeFalsy();
		expect(start.name).toBe('start');
		expect(start).toConnectToCave('A');
		expect(start).toConnectToCave('b');

		const A = network.caves.get('A');
		expect(A.large).toBeTruthy();
		expect(A.name).toBe('A');
		expect(A).toConnectToCave('start');
		expect(A).toConnectToCave('b');
		expect(A).toConnectToCave('c');
		expect(A).toConnectToCave('d');
		expect(A).toConnectToCave('end');

		const end = network.end;
		expect(end.large).toBeFalsy();
		expect(end.name).toBe('end');
		expect(end).toConnectToCave('A');
		expect(end).toConnectToCave('b');
	});

	it('should find 10 paths through the simple example', async () => {
		const network = await readIntoObject('./source/day12/day12.simple.txt', new CaveParser());
		expect(network.mapNetwork()).toBe(10);
	});

	it('should find 36 paths through the simple example with one revisit', async () => {
		const network = await readIntoObject('./source/day12/day12.simple.txt', new CaveParser());
		expect(network.mapNetwork(network.start, true)).toBe(36);
	});
});
