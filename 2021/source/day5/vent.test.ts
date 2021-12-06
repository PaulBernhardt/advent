import { parseVent, Vent, key, Coord, mapVents } from './vent';

function c(x, y): Coord {
	return { x, y };
}
function v(x1, y1, x2, y2): Vent {
	return {
		start: c(x1, y1),
		end: c(x2, y2),
	};
}

const VENTS = [v(0, 0, 2, 0), v(2, 0, 2, 2), v(0, 0, 2, 2)];

describe('when parsing vents', () => {
	it('should parse sample vents', () => {
		expect(parseVent('0,9 -> 5,9')).toMatchObject(v(0, 9, 5, 9));
		expect(parseVent('8,0 -> 0,8')).toMatchObject(v(8, 0, 0, 8));
		expect(parseVent('100,29 -> 45,95')).toMatchObject(v(100, 29, 45, 95));
	});
});

describe('when mapping vents', () => {
	it('should create a key for a coord that is the string representation', () => {
		expect(key(c(0, 9))).toBe('0,9');
		expect(key(c(10, 2))).toBe('10,2');
	});
	it('should map all vents', () => {
		const map = mapVents(VENTS, true);
		expect(map.get('0,0')).toBe(2);
		expect(map.get('1,0')).toBe(1);
		expect(map.get('2,0')).toBe(2);
		expect(map.get('2,1')).toBe(1);
		expect(map.get('1,1')).toBe(1);
		expect(map.has('0,1')).toBe(false);
		expect(map.has('0,2')).toBe(false);
		expect(map.has('1,2')).toBe(false);
	});

	it('should map horizintal/vertical vents', () => {
		const map = mapVents(VENTS, false);
		expect(map.get('0,0')).toBe(1);
		expect(map.get('1,0')).toBe(1);
		expect(map.get('2,0')).toBe(2);
		expect(map.get('2,1')).toBe(1);
		expect(map.has('1,1')).toBe(false);
		expect(map.has('0,1')).toBe(false);
		expect(map.has('0,2')).toBe(false);
		expect(map.has('1,2')).toBe(false);
	});
});
