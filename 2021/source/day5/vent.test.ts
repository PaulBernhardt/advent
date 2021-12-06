import { parseVent, Vent } from './vent';

function v(x1, y1, x2, y2): Vent {
	return {
		start: {
			x: x1,
			y: y1,
		},
		end: {
			x: x2,
			y: y2,
		},
	};
}

describe('when parsing vents', () => {
	it('should parse sample vents', () => {
		expect(parseVent('0,9 -> 5,9')).toMatchObject(v(0, 9, 5, 9));
		expect(parseVent('8,0 -> 0,8')).toMatchObject(v(8, 0, 0, 8));
		expect(parseVent('100,29 -> 45,95')).toMatchObject(v(100, 29, 45, 95));
	});
});
