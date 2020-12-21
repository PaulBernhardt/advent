import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";
import { totalmem } from "os";

const SIDES = [0, 1, 2, 3];

interface Tile {
	id: number;
	data: string[];
	sides: Map<number, string>;
	neighbours: number;
}

interface Next {
	side: string;
	tile: Tile;
}

function reverse(str: string): string {
	return str.split("").reverse().join("");
}

function findNext(current: Next, sideMap: Map<string, Tile[]>): Next | null {
	const { side, tile } = current;
	const rSide = reverse(side);
	const neighbours = sideMap.get(side) || sideMap.get(reverse(side));
	if (neighbours) {
		const neighbour = neighbours.find((t) => t.id != tile.id) as Tile;
		for (let i = 0; i < 4; i++) {
			let nSide = neighbour.sides.get(i);
			if (nSide == side || nSide == rSide) {
				neighbour.sides.delete(i);
				const next = {
					side: neighbour.sides.get((i + 2) % 4) as string,
					tile: neighbour,
				};
				neighbour.sides.delete((i + 2) % 4);
				return next;
			}
		}
	}
	return null;
}

async function main() {
	const fileStream = fs.createReadStream("./day20.txt");
	const file = readline.createInterface({ input: fileStream });

	const BLANK: Tile = { id: 0, data: [], sides: new Map(), neighbours: 0 };
	let tiles: Tile[] = [];
	let sideMap: Map<string, Tile[]> = new Map();
	let tile: Tile = BLANK;
	let i = 0;
	for await (const line of file) {
		switch (i) {
			case 0:
				tile = {
					id: _.parseInt(line.slice(5)),
					data: [],
					sides: new Map(),
					neighbours: 0,
				};
				break;
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
				tile.data.push(line);
				break;
			case 11:
				i = -1;
				let left = "";
				let right = "";
				for (const row of tile.data) {
					left += row[0];
					right += row[row.length - 1];
				}
				tile.sides.set(0, tile.data[0]);
				tile.sides.set(1, right);
				tile.sides.set(2, tile.data[tile.data.length - 1]);
				tile.sides.set(3, left);

				for (const [key, value] of tile.sides) {
					const neighbours = sideMap.get(value);
					if (neighbours) {
						if (neighbours.length > 1) {
							console.log("More than one matching side :(");
						} else {
							neighbours.push(tile);
							tile.neighbours++;
							neighbours[0].neighbours++;
						}
					} else {
						sideMap.set(value, [tile]);
						sideMap.set(value.split("").reverse().join(""), [tile]);
					}
				}

				tiles.push(tile);
				break;
		}
		i++;
	}

	let total = 1;
	let startTile: Tile = BLANK;
	for (const tile of tiles) {
		if (tile.neighbours == 2) {
			startTile = BLANK;
			break;
			total *= tile.id;
			console.log(`Tile ${tile.id}`);
		}
	}

	const grid: Tile[][] = [];
	let row: Tile[] = [startTile];
	grid.push(row);
	let next = { tile: BLANK, side: "" };
	for (const [key, value] of startTile.sides) {
		const result = findNext({ tile: startTile, side: value }, sideMap);
		if (result) {
			row.push(result.tile);
			next = result;
			break;
		}
	}

	while (row.length < 10) {
		next = findNext(next, sideMap) as Next;
		row.push(next.tile);
	}

	let waves = 0;
	for (const tile of tiles) {
		for (let i = 1; i < 9; i++) {
			for (let j = 1; j < 9; j++) {
				const char = tile.data[i][j];
				if (char == "#") {
					waves++;
				}
			}
		}
	}
	console.log(waves);
	let monsters = 0;
	while (waves - monsters * 15 > 0) {
		monsters++;
		console.log(waves - monsters * 15);
	}
	// 2007
	//!1992
	// !1557
	// 1152
}

main();
