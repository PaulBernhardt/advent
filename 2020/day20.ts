import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";
import { totalmem } from "os";

interface Tile {
	id: number;
	data: string[];
	sides: string[];
	neighbours: number;
}

async function main() {
	const fileStream = fs.createReadStream("./day20.txt");
	const file = readline.createInterface({ input: fileStream });

	let tiles: Tile[] = [];
	let sideMap: Map<string, Tile[]> = new Map();
	let tile: Tile = { id: 0, data: [], sides: [], neighbours: 0 };
	let i = 0;
	for await (const line of file) {
		switch (i) {
			case 0:
				tile = {
					id: _.parseInt(line.slice(5)),
					data: [],
					sides: [],
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
				tile.sides = [
					tile.data[0],
					right,
					tile.data[tile.data.length - 1],
					left,
				];

				for (const side of tile.sides) {
					const neighbours = sideMap.get(side);
					if (neighbours) {
						if (neighbours.length > 1) {
							console.log("More than one matching side :(");
						} else {
							neighbours.push(tile);
							tile.neighbours++;
							neighbours[0].neighbours++;
						}
					} else {
						sideMap.set(side, [tile]);
						sideMap.set(side.split("").reverse().join(""), [tile]);
					}
				}

				tiles.push(tile);
				break;
		}
		i++;
	}

	let total = 1;
	for (const tile of tiles) {
		if (tile.neighbours == 2) {
			total *= tile.id;
			console.log(`Tile ${tile.id}`);
		}
	}
	console.log(total);
}

main();
