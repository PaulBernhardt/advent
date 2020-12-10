import * as _ from "lodash";

const readline = require("readline");
const fs = require("fs");

function findPair(target: number, table: Map<number, number>): boolean {
	for (const guess of Array.from(table.keys())) {
		if (table.get(target - guess)) {
			return true;
		}
	}
	return false;
}

function findSet(target: number, array: number[]): number {
	let total = 0;
	let start = 0;
	for (let i = 0; i < array.length; i++) {
		total += array[i];
		while (total > target) {
			total -= array[start];
			start++;
		}
		if (total == target) {
			const group = _.slice(array, start, i + 1) ?? [];
			return (_.min(group) ?? 0) + (_.max(group) ?? 0);
		}
	}
	return 0;
}

async function main() {
	const fileStream = fs.createReadStream("./day9.txt");
	const file = readline.createInterface({ input: fileStream });

	const numbers = [];
	for await (const line of file) {
		numbers.push(_.parseInt(line));
	}

	const table: Map<number, number> = new Map();
	for (let i = 0; i < 25; i++) {
		table.set(numbers[i], 1);
	}
	for (let i = 25; i < numbers.length; i++) {
		const number = numbers[i];

		if (findPair(number, table)) {
			const n = numbers[i - 25];
			const current = table.get(n);
			if (current) {
				if (current - 1 == 0) {
					table.delete(n);
				} else {
					table.set(n, current - 1);
				}
			}
			table.set(number, 1);
		} else {
			console.log(number);
			console.log(findSet(number, numbers));
			return;
		}
	}
}

main();
