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


Numbers by segment count:
1 seg: X
2 seg: 1
3 seg: 7
4 seg: 4
5 seg: 2, 3, 5
6 seg: 0, 6, 9
7 seg: 8

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
d: segment w/count 7 that is in '4' and '3' that isn't in '1', or is the unknown in 4 after counting
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
export interface Signal {
	segments: Map<string, string>;
	output: string[];
}

export function signalParser(value: string): Signal {
	const segments = new Map<string, string>();
	const output: string[] = [];

	const [sampleInput, outputInput] = value.split(' | ');

	// See digit mapping comment above
	const digits = sampleInput.split(' ');
	let seven = '';
	let one = '';
	const segmentCount = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0,
		g: 0,
	};
	for (const digit of digits) {
		if (digit.length == 2) {
			one = digit;
		} else if (digit.length == 3) {
			seven = digit;
		}
		for (const segment of digit) {
			segmentCount[segment]++;
		}
	}

	const a = calcAfromOneSeven(one, seven);
	delete segmentCount[a];
	segments.set(a, 'a');
	for (const [segment, count] of Object.entries(segmentCount)) {
		segments.set(segment, SEGMENT_MAPPER[count]);
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
