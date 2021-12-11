export interface Position {
	x: number;
	y: number;
	h: number;
}

export function parseTubes(line: string): number[] {
	return line.split('').map((x) => parseInt(x));
}

function c(x: number, y: number): Position {
	return p(x, y, 0);
}

export function p(x: number, y: number, h: number): Position {
	return {
		x,
		y,
		h,
	};
}

function pToStr(pos: Position): string {
	return `${pos.x},${pos.y}`;
}

export function isMin(x: number, y: number, tubes: number[][]): boolean {
	let min = true;
	const number = tubes[y][x];
	const possibleMins = [c(x - 1, y), c(x + 1, y), c(x, y - 1), c(x, y + 1)];
	for (const check of possibleMins) {
		const n = (tubes[check.y] ?? [])[check.x];
		if (n !== undefined && n <= number) {
			return false;
		}
	}
	return true;
}

export function findMins(tubes: number[][]): Position[] {
	const mins = [];
	for (let y = 0; y < tubes.length; y++) {
		const row = tubes[y];
		for (let x = 0; x < row.length; x++) {
			if (isMin(x, y, tubes)) {
				mins.push(p(x, y, row[x]));
			}
		}
	}
	return mins;
}

export function findBasin(pos: Position, tubes: number[][], visited: Set<String> = new Set()): number {
	if (visited.has(pToStr(pos))) {
		return 0;
	}
	visited.add(pToStr(pos));
	const { x, y, h } = pos;
	const toCheckInside = [c(x - 1, y), c(x + 1, y), c(x, y - 1), c(x, y + 1)];

	let total = 1;
	for (const check of toCheckInside) {
		if (
			// Outside range
			check.y < 0 ||
			check.y >= tubes.length ||
			check.x < 0 ||
			check.x >= tubes[check.y].length ||
			// Already visited
			visited.has(pToStr(c(check.x, check.y))) ||
			// Too high
			tubes[check.y][check.x] == 9
		) {
			continue;
		}
		total += findBasin(check, tubes, visited);
	}

	return total;
}
