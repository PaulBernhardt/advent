import { readIntoObject } from '../utils/fileUtils';
import { OctoGrid, Octopus, OctopusParser } from './octopus';

describe('when dealing with octopuses', () => {
	it('should parse simple input into an array of octopuses', async () => {
		const octo = await readIntoObject('./source/day11/day11.simple.txt', new OctopusParser());
		expect(octo.grid.length).toBe(2);
		const [line1, line2] = octo.grid;
		expect(line1[0].brightness).toBe(4);
		expect(line1[1].brightness).toBe(5);
		expect(line1[2].brightness).toBe(9);

		expect(line2[0].brightness).toBe(2);
		expect(line2[1].brightness).toBe(8);
		expect(line2[2].brightness).toBe(5);

		expect(line1[0].neighbours).toContain(line1[1]);
		expect(line1[0].neighbours).not.toContain(line1[2]);
		expect(line1[0].neighbours).toContain(line2[1]);
		expect(line1[0].neighbours).toContain(line2[0]);
		expect(line1[0].neighbours).not.toContain(line2[2]);
	});

	it('should create octupuses with the right brightness, and be neighbours', () => {
		const grid = new OctoGrid();
		const one = new Octopus(2, grid);
		expect(one.brightness).toBe(2);

		const two = new Octopus(5, grid);
		expect(two.brightness).toBe(5);

		expect(one.neighbours).toMatchObject([]);
		expect(two.neighbours).toMatchObject([]);

		one.addNeighbour(two);

		expect(one.neighbours).toMatchObject([two]);
		expect(two.neighbours).toMatchObject([one]);
	});

	it('should increase brightness correctly', async () => {
		const octo = await readIntoObject('./source/day11/day11.simple.txt', new OctopusParser());
		octo.next();
		expect(octo.flashes).toBe(2);
	});
});
