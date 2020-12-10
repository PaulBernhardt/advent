import * as _ from "lodash";

const readline = require("readline");
const fs = require("fs");

async function main() {
	const fileStream = fs.createReadStream("./day10.txt");
	const file = readline.createInterface({ input: fileStream });

	const numbers = [];
	const set: Set<number> = new Set();
	let max = 0;
	for await (const line of file) {
		const number = _.parseInt(line);
		numbers.push(number);
		set.add(number);
		max = Math.max(number, max);
	}
	numbers.sort((a, b) => a - b);

	let i = 0;
	let ones = 0;
	let threes = 1;
	while (i < max) {
		if (set.has(i + 1)) {
			ones++;
			i++;
			continue;
		} else if (set.has(i + 2)) {
			i += 2;
			continue;
		} else {
			threes++;
			i += 3;
			continue;
		}
	}
	console.log(ones, threes);
	console.log(ones * threes);
}

main();
