const readline = require("readline");
const fs = require("fs");
import * as _ from "lodash";

async function main() {
	const fileStream = fs.createReadStream("./day5.txt");
	const file = readline.createInterface({ input: fileStream });

	let max = 0;
	const seats = [];
	for await (const line of file) {
		const row = _.parseInt(
			_.replace(_.replace(line.substr(0, 7), /B/g, "1"), /F/g, "0"),
			2
		);
		const column = _.parseInt(
			_.replace(_.replace(line.substr(7, 3), /R/g, "1"), /L/g, "0"),
			2
		);

		seats.push(row * 8 + column);
		max = Math.max(max, row * 8 + column);
	}
	seats.sort((a, b) => a - b);
	for (let i = 1; i < seats.length - 1; i++) {
		const seat = seats[i];
		const before = seats[i - 1];
		if (seat - before != 1) {
			console.log(seat - 1);
		}
	}
	//console.log(max);
}

main();
