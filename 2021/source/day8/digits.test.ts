import { calcAfromOneSeven, calcDfromFour, convert, countEasyDigits, signalParser } from './digits';

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

	it('should parse the output into digits', () => {
		const line = 'abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg | gbcdae dagc acgd gd';
		const { output } = signalParser(line);
		expect(output).toMatchObject(['gbcdae', 'dagc', 'acgd', 'gd']);
	});
	it('should create a map of segments from the first half of the input', () => {
		const line = 'caebgd dagc eabgd aebfgc fbdacge edg dg dbgcef eabfd cgeba | gbcdae dagc acgd gd';
		const { segments } = signalParser(line);
		expect(segments.get('e')).toBe('a');
		expect(segments.get('c')).toBe('b');
		expect(segments.get('d')).toBe('c');
		expect(segments.get('f')).toBe('e');
		expect(segments.get('g')).toBe('f');
		expect(segments.get('a')).toBe('d');
		expect(segments.get('b')).toBe('g');
	});
	it('should calculate "a" from the segements in one and seven', () => {
		expect(calcAfromOneSeven('bc', 'abc')).toBe('a');
		expect(calcAfromOneSeven('ba', 'abf')).toBe('f');
	});

	it('should calculate "D" from the segment missing in four', () => {
		const map = new Map<string, string>();
		map.set('b', 'b');
		map.set('c', 'c');
		map.set('f', 'f');
		expect(calcDfromFour('bcdf', map)).toBe('d');
	});

	it('should convert a digit to the right number when the segments are already right', () => {
		const line = 'abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg | gbcdae dagc acgd gd';
		const { segments } = signalParser(line);
		expect(convert('abcefg', segments)).toBe('0');
		expect(convert('cf', segments)).toBe('1');
		expect(convert('acdeg', segments)).toBe('2');
		expect(convert('acdfg', segments)).toBe('3');
		expect(convert('bcdf', segments)).toBe('4');
		expect(convert('abdfg', segments)).toBe('5');
		expect(convert('abdefg', segments)).toBe('6');
		expect(convert('acf', segments)).toBe('7');
		expect(convert('abcdefg', segments)).toBe('8');
		expect(convert('abcdfg', segments)).toBe('9');
	});

	it('should convert a digit to the right number on mixed up input', () => {
		const line = 'caebgd dagc eabgd aebfgc fbdacge edg dg dbgcef eabfd cgeba | gbcdae dagc acgd gd';
		const { segments } = signalParser(line);
		expect(convert('edg', segments)).toBe('7');
		expect(convert('dg', segments)).toBe('1');
		expect(convert('fbdacge', segments)).toBe('8');
	});
});
