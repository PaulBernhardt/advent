import { readIntoObject } from '../utils/fileUtils';
import { PolymerParser, PolymerTemplate, addPair } from './polymer';

describe('when creating polymers', () => {
	it('should parse the simple input', async () => {
		const template = await readIntoObject('./source/day14/day14.simple.txt', new PolymerParser());
		//expect(template.polymer).toBe('NN');

		expect(template.rules.get('NN')).toBe('C');
		expect(template.rules.get('NC')).toBe('N');
		expect(template.rules.get('CN')).toBe('N');
	});

	it('should add and remove pairs', () => {
		const polymer = new PolymerTemplate('aa');

		const map = polymer.polymer;
		expect(map.get('bb')).toBe(undefined);
		expect(map.get('aa')).toBe(1);
		addPair('aa', 1, map);
		expect(map.get('aa')).toBe(2);
		addPair('bb', 2, map);
		expect(map.get('bb')).toBe(2);
	});

	it('should output a count of all elements', async () => {
		const template = await readIntoObject('./source/day14/day14.sample.txt', new PolymerParser());
		const count = template.countElements();
		expect(count.get('N')).toBe(2);
		expect(count.get('C')).toBe(1);
		expect(count.get('B')).toBe(1);

		template.next();
		const count2 = template.countElements();
		expect(count2.get('N')).toBe(2);
		expect(count2.get('C')).toBe(2);
		expect(count2.get('B')).toBe(2);
		expect(count2.get('H')).toBe(1);
	});
});
