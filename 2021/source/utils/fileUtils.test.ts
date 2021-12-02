import { readIntoArray } from './fileUtils';

describe('when reading files', () => {
	it('should read and parse a list of integers', async () => {
		const uri = './source/utils/testIntegers.txt';

		const results = await readIntoArray(uri, parseInt);
		expect(results).toMatchObject([10, 501, 4321, 4651234, 4]);
	});
});
