enum Direction {
	x = 'x',
	y = 'y',
}
interface Move {
	direction: Direction;
	distance: number;
}

export function getPositionValue(moves: Move[]): number {
	let pos = { x: 0, y: 0 };

	for (const move of moves) {
		pos[move.direction] += move.distance;
	}
	return pos.x * pos.y;
}

export function getPositionValueWithAim(moves: Move[]): number {
	let pos = { x: 0, y: 0 };
	let aim = 0;
	for (const move of moves) {
		switch (move.direction) {
			case Direction.y:
				aim += move.distance;
				break;
			case Direction.x:
				pos.x += move.distance;
				pos.y += move.distance * aim;
		}
	}
	return pos.x * pos.y;
}

export function parseMove(line: string): Move {
	let direction = Direction.x;
	let distance = 0;
	const [dir, dist] = line.split(' ');
	distance = parseInt(dist);
	switch (dir) {
		case 'forward':
			direction = Direction.x;
			break;
		case 'up':
			distance = -distance;
		case 'down':
			direction = Direction.y;
			break;
	}

	return { direction, distance };
}
