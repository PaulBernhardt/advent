import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";
import { couldStartTrivia } from "typescript";

async function main() {
	const fileStream = fs.createReadStream("./day12.txt");
	const file = readline.createInterface({ input: fileStream });

	let heading = 0;
	let east = 0;
	let north = 0;
	let i = 0;
	for await (const line of file) {
		i++;
		const direction = _.upperCase(line[0]);
		const mag = _.parseInt(line.substr(1));

		switch (direction) {
			case "":
				break;
			case "E":
				east += mag;
				break;
			case "W":
				east -= mag;
				break;
			case "N":
				north += mag;
				break;
			case "S":
				north -= mag;
				break;
			case "L":
				heading += mag;
				heading = (heading + 360) % 360;
				break;
			case "R":
				heading -= mag;
				heading = (heading + 360) % 360;
				break;
			case "F":
				switch (heading) {
					case 0:
						east += mag;
						break;
					case 180:
						east -= mag;
						break;
					case 90:
						north += mag;
						break;
					case 270:
						north -= mag;
						break;
					default:
						console.log(`Unexpected heading: ${heading}`);
				}
				break;
			default:
				console.log(`Unexpected direction: ${direction}`);
		}
	}

	console.log(east, north, Math.abs(east) + Math.abs(north));
}

main();
