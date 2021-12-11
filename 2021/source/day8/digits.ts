const SimpleLength = {
	2: true,
	4: true,
	3: true,
	7: true,
};
export function countEasyDigits(value: string): number {
	const digits = value.split(' | ')[1].split(' ');
	let count = 0;
	for (const digit of digits) {
		if (SimpleLength[digit.length]) {
			count++;
		}
	}
	return count;
}

/**
 *  Digit mappings
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg


Segments by number:
0: abcefg,
1: cf,
2: acdeg,
3: acdfg,
4: bcdf,
5: abdfg,
6: abdefg,
7: acf,
8: abcdefg,
9: abcdfg

Numbers by segment count:
1 seg: X
2 seg: 1
3 seg: 7
4 seg: 4
5 seg: 2, 3, 5
6 seg: 0, 6, 9
7 seg: 8

Numbers by segment
0:
1: 2
2:
3:
4: 4
5:
6:
7:
8: 8

Segments by number without 7 (acf):
0: be,
2: deg,
3: dg,
5: bdg,
6: bdeg, --
9: bdg



Segment counts:
a: 8
b: 6
c: 8
d: 7
e: 4
f: 9
g: 7

Therefore:
a: segment in '7' that is not in '1'
b: segment w/count 6
c: segment w/count 8 that isn't 'a'
d: segment w/count 7 that is the unknown in 4 after counting
e: segment w/count 4
f: segment w/count 9
g: segment w/count 7 that isn't d

 **/

const SEGMENT_MAPPER = {
	6: 'b',
	8: 'c',
	7: 'g',
	4: 'e',
	9: 'f',
};

const SEGMENT_BIT = {
	a: Math.pow(2, 0),
	b: Math.pow(2, 1),
	c: Math.pow(2, 2),
	d: Math.pow(2, 3),
	e: Math.pow(2, 4),
	f: Math.pow(2, 5),
	g: Math.pow(2, 6),
};
const { a, b, c, d, e, f, g } = SEGMENT_BIT;

// Create a binary representation of each number
const NUMBER = new Map<number, string>();
NUMBER.set(a + b + c + e + f + g, '0');
NUMBER.set(c + f, '1');
NUMBER.set(a + c + d + e + g, '2');
NUMBER.set(a + c + d + f + g, '3');
NUMBER.set(b + c + d + f, '4');
NUMBER.set(a + b + d + f + g, '5');
NUMBER.set(a + b + d + e + f + g, '6');
NUMBER.set(a + c + f, '7');
NUMBER.set(a + b + c + d + e + f + g, '8');
NUMBER.set(a + b + c + d + f + g, '9');

export interface Signal {
	segments: Map<string, string>;
	output: string[];
}

export function signalParser(value: string): Signal {
	const segments = new Map<string, string>();

	const [sampleInput, outputInput] = value.split(' | ');

	const output: string[] = outputInput.split(' ');

	// See digit mapping comment above
	const digits = sampleInput.split(' ');
	let seven = '';
	let one = '';
	let four = '';
	const segmentCount = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0,
		g: 0,
	};
	const dg = [];
	for (const digit of digits) {
		if (digit.length == 2) {
			one = digit;
		} else if (digit.length == 3) {
			seven = digit;
		} else if (digit.length == 7) {
			dg.push(digit);
		} else if (digit.length == 4) {
			four = digit;
		}
		for (const segment of digit) {
			segmentCount[segment]++;
		}
	}

	// 'a' is the segment in '7' that is not in '1'
	const a = calcAfromOneSeven(one, seven);
	delete segmentCount[a];
	segments.set(a, 'a');

	for (const [segment, count] of Object.entries(segmentCount)) {
		if (count == 7) {
			continue;
		}
		segments.set(segment, SEGMENT_MAPPER[count]);
	}
	// 'd' is segment w/count 7 that is the unknown in 4
	const d = calcDfromFour(four, segments);
	segments.set(d, 'd');
	for (const segment of Object.keys(segmentCount)) {
		const count = segmentCount[segment];
		if (count == 7 && segment != d) {
			segments.set(segment, 'g');
			break;
		}
	}

	return {
		segments,
		output,
	};
}

export function calcAfromOneSeven(one: string, seven: string): string {
	let first = one[0];
	let second = one[1];

	for (const segment of seven) {
		if (segment != first && segment != second) {
			return segment;
		}
	}
}

export function calcDfromFour(four: string, segments: Map<string, string>): string {
	for (const segment of four) {
		if (!segments.has(segment)) {
			return segment;
		}
	}
}

export function convert(digit: string, segments: Map<string, string>): string {
	let bitmask = 0;
	for (const seg of digit) {
		bitmask += SEGMENT_BIT[segments.get(seg)];
	}
	return NUMBER.get(bitmask);
}
