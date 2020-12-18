import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";

enum CUBE {
	ACTIVE = "#",
	INACTIVE = ".",
}

interface Coordinate {
	x: number;
	y: number;
	z: number;
	w: number;
}

function makeName(coord: Coordinate): string {
	const { x, y, z, w } = coord;
	return `${x},${y},${z},${w}`;
}

function parseName(name: string): Coordinate {
	const [x, y, z, w] = name.split(",").map(_.parseInt);
	return { x, y, z, w };
}

function iterate(activeCubes: Set<string>, depth: number): number {
	const potentialCubes: Map<string, number> = new Map();
	const nextActiveCubes: Set<string> = new Set();

	for (const name of activeCubes) {
		const cube = parseName(name);
		let neighbours = 0;
		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				for (let z = -1; z <= 1; z++) {
					for (let w = -1; w <= 1; w++) {
						if (x == y && y == z && z == w && w == 0) {
							continue;
						}
						const check = {
							x: cube.x + x,
							y: cube.y + y,
							z: cube.z + z,
							w: cube.w + w,
						};
						const checkName = makeName(check);
						if (activeCubes.has(checkName)) {
							neighbours++;
						} else {
							let positionNeighbours = potentialCubes.get(checkName) ?? 0;
							// if (positionNeighbours == undefined) {
							// 	positionNeighbours = { coord: check, count: 0 };
							// 	potentialCubes.set(checkName, positionNeighbours);
							// }
							potentialCubes.set(checkName, positionNeighbours + 1);
							//positionNeighbours.count++;
						}
					}
				}
			}
		}
		if (neighbours == 2 || neighbours == 3) {
			nextActiveCubes.add(name);
		}
	}

	for (const [key, value] of potentialCubes) {
		if (value == 3) {
			nextActiveCubes.add(key);
		}
	}

	console.log(depth, nextActiveCubes.size);
	depth--;
	if (depth == 0) {
		return nextActiveCubes.size;
	} else {
		return iterate(nextActiveCubes, depth);
	}
}

async function main() {
	const fileStream = fs.createReadStream("./day17.txt");
	const file = readline.createInterface({ input: fileStream });

	let y = 0;
	let z = 0;
	let w = 0;
	const activeCubes: Set<string> = new Set();
	for await (const line of file) {
		for (let x = 0; x < line.length; x++) {
			const space = line[x];
			switch (space) {
				case CUBE.INACTIVE:
					break;
				case CUBE.ACTIVE:
					activeCubes.add(makeName({ x, y, z, w }));
			}
		}
		y++;
	}

	console.log(iterate(activeCubes, 6));
}

main();
