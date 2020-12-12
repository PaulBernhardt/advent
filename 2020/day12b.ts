import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";
import { couldStartTrivia } from "typescript";

interface Pos {
	east: number;
	north: number;
}

async function main() {
	const fileStream = fs.createReadStream("./day12.txt");
	const file = readline.createInterface({ input: fileStream });

	let waypoint: Pos = { east: 10, north: 1 };
	let i = 0;
	const pos: Pos = { east: 0, north: 0 };
	for await (const line of file) {
		i++;
		const direction = _.upperCase(line[0]);
		let mag = _.parseInt(line.substr(1));

		switch (direction) {
			case "":
				break;
			case "E":
				waypoint.east += mag;
				break;
			case "W":
				waypoint.east -= mag;
				break;
			case "N":
				waypoint.north += mag;
				break;
			case "S":
				waypoint.north -= mag;
				break;
			case "R":
				mag = (-mag + 360) % 360;
			case "L":
				const { east, north } = waypoint;
				switch (mag) {
					case 0:
						break;
					case 180:
						waypoint = { east: -east, north: -north };
						break;
					case 90:
						waypoint = { east: -north, north: east };
						break;
					case 270:
						waypoint = { east: north, north: -east };
						break;
					default:
						break;
				}
				break;
			case "F":
				pos.east += waypoint.east * mag;
				pos.north += waypoint.north * mag;
				break;
			default:
				console.log(`Unexpected direction: ${direction}`);
		}
	}

	console.log(pos, Math.abs(pos.east) + Math.abs(pos.north));
}

main();
