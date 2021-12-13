import { readIntoArray, readIntoObject } from '../utils/fileUtils';
import { d, PaperParser } from './paper';

describe('when folding paper', () => {
	it('should parse the example input', async () => {
		const paper = await readIntoObject('./source/day13/day13.sample.txt', new PaperParser());
		expect(paper.dots.get('6,10')).toMatchObject(d(6, 10));
		expect(paper.dots.get('0,14')).toMatchObject(d(0, 14));
		expect(paper.dots.get('9,0')).toMatchObject(d(9, 0));

		expect(paper.instructions[0]).toMatchObject({ axis: 'y', magnitude: 7 });
		expect(paper.instructions[1]).toMatchObject({ axis: 'x', magnitude: 5 });
	});

	it('should print a 0 on the sample input', async () => {
		const paper = await readIntoObject('./source/day13/day13.sample.txt', new PaperParser());
		const output = await readIntoArray('./source/day13/day13.sample.output.txt', (x) => x.split(''));
		paper.fold();
		expect(paper.print()).toMatchObject(output);
	});
});
