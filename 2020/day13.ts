import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";

async function main() {
	const data = fs.readFileSync("./day13.txt", { encoding: "utf-8" });
	const lines = data.split("\n");

	const time = _.parseInt(lines[0]);
	const busses = lines[1].split(",");

	let minTime = Number.MAX_VALUE;
	let minBus = -1;

	for (const busName of busses) {
		if (busName == "x") {
			continue;
		}
		const bus = _.parseInt(busName);
		const wait = bus - (time % bus);
		if (wait < minTime) {
			minTime = wait;
			minBus = bus;
		}
	}
	console.log(minTime, minBus, minTime * minBus);
}

main();
