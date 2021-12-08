import { readIntoArray, readIntoObject, ObjectParser, readFromCSVLine } from './fileUtils';

describe('when reading files', () => {
	it('should read and parse a list of integers', async () => {
		const uri = './source/utils/testIntegers.txt';

		const results = await readIntoArray(uri, parseInt);
		expect(results).toMatchObject([10, 501, 4321, 4651234, 4]);
	});

	it('should read and parse an object', async () => {
		const uri = './source/utils/testIntegers.txt';

		interface Numbers {
			count: number;
			numbers: number[];
		}
		class Tester implements ObjectParser<Numbers> {
			private numbers: number[] = [];
			parse(line: string) {
				this.numbers.push(parseInt(line));
			}
			next() {}
			complete(): Numbers {
				return {
					count: this.numbers.length,
					numbers: this.numbers,
				};
			}
		}
		const results = await readIntoObject(uri, new Tester());
		expect(results).toMatchObject({ count: 5, numbers: [10, 501, 4321, 4651234, 4] });
	});

	it('should read and parse a single line', async () => {
		const result = await readFromCSVLine<number>('./source/utils/testSingleLine.txt', (x) => parseInt(x));
		expect(result).toMatchObject([5, 4, 6, 5, 13]);
	});
});
