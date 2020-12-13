import * as _ from "lodash";
import * as fs from "fs";

interface Bus {
	time: number;
	offset: number;
	goal: number;
}

async function main() {
	const data = fs.readFileSync("./day13.txt", { encoding: "utf-8" });
	const lines = data.split("\n");

	const busText = lines[1].split(",");

	const busses: Bus[] = [];
	for (let i = 0; i < busText.length; i++) {
		const busName = busText[i];
		if (busName == "x") {
			continue;
		}
		const bus = _.parseInt(busName);
		busses.push({
			time: bus,
			offset: i == 0 ? bus : i % bus,
			goal: bus + i,
		});
	}

	busses.sort((a, b) => Number(b.time - a.time));
	let jump = 1;

	let pos = 0;
	let bus = busses[pos];
	let time = 0;
	while (pos < busses.length) {
		if (bus.time - (time % bus.time) == bus.offset) {
			jump *= bus.time;
			pos++;
			bus = busses[pos];
			console.log(pos, jump, time);
		} else {
			time += jump;
		}
	}
	console.log(time);
}

main();
