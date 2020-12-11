import * as _ from "lodash";

const readline = require("readline");
const fs = require("fs");

function pathsFromEnd(
	start: number,
	set: Set<number>,
	map: Map<number, number>
): number {
	let total = 0;
	if (set.has(start)) {
		for (let i = 1; i < 4; i++) {
			let num = start + i;
			total += map.get(num) ?? 0;
		}
	}
	map.set(start, total);
	if (start == 0) {
		return total;
	} else {
		return pathsFromEnd(start - 1, set, map);
	}
}

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
	set.add(0);
	set.add(max);

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
	console.log(ones * threes);

	const map: Map<number, number> = new Map();
	map.set(max + 3, 1);
	let total = pathsFromEnd(max, set, map);
	console.log(total);
}

main();
