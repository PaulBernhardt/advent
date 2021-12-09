import { calcAfromOneSeven, countEasyDigits, signalParser } from './digits';

describe('when counting easy digits', () => {
	it('should count the digits with 1, 4, 7, or 8 segments', () => {
		const four = countEasyDigits(
			'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | ca cedb cef abcdgef',
		);
		expect(four).toBe(4);
		const two = countEasyDigits('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | c cedb cef abcdgf');
		expect(two).toBe(2);
		const one = countEasyDigits('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | c cedbd caf abcdgf');
		expect(one).toBe(1);
	});
});

describe('when determining all outputs', () => {
	it('should create a map of segments from the first half of the input where the segments are already right', () => {
		const line = 'abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg | gbcdae dagc acgd gd';
		const { segments } = signalParser(line);
		for (const key of segments.keys()) {
			expect(segments.get(key)).toBe(key);
		}
	});
	it('should create a map of segments from the first half of the input', () => {
		const line = 'caebgd dagc eabgd aebfgc fbdacge edg dg dbgcef eabfd cgeba | gbcdae dagc acgd gd';
		const { segments } = signalParser(line);
		expect(segments.get('a')).toBe('e');
		//expect(segments.get())
	});
	it('should calculate "a" from the segements in one and seven', () => {
		expect(calcAfromOneSeven('bc', 'abc')).toBe('a');
		expect(calcAfromOneSeven('ba', 'abf')).toBe('f');
	});
});
