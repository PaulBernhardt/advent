import { readIntoObject } from '../utils/fileUtils';
import { FishParser } from './fish';

describe('when parsing a fish list', () => {
	it('should load fish into a fish collection', async () => {
		const fishCollection = await readIntoObject('./source/day6/day6.sample.txt', new FishParser());
		const fish = fishCollection.fish;
		expect(fish).toMatchObject([0, 1, 1, 2, 1, 0, 0, 0, 0]);
	});

	it('should correctly do multiple iterations', async () => {
		const fish = await readIntoObject('./source/day6/day6.sample.txt', new FishParser());
		expect(fish.fish).toMatchObject([0, 1, 1, 2, 1, 0, 0, 0, 0]);
		fish.next();
		expect(fish.fish).toMatchObject([1, 1, 2, 1, 0, 0, 0, 0, 0]);
		fish.next();
		expect(fish.fish).toMatchObject([1, 2, 1, 0, 0, 0, 1, 0, 1]);
		fish.next();
		expect(fish.fish).toMatchObject([2, 1, 0, 0, 0, 1, 1, 1, 1]);
	});
});
