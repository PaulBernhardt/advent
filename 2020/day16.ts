import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";

enum READ_STATE {
	RULES = 1,
	MINE,
	OTHERS,
}

enum STATE_HEADER {
	YOUR_TICKET = "your ticket:",
	NEARBY_TICKETS = "nearby tickets:",
	BLANK = "",
}

async function main() {
	const fileStream = fs.createReadStream("./day16.txt");
	const file = readline.createInterface({ input: fileStream });

	const validNumbers: Set<number> = new Set();
	let state = READ_STATE.RULES;
	let sum = 0;
	for await (const line of file) {
		switch (line) {
			case STATE_HEADER.YOUR_TICKET:
				state = READ_STATE.MINE;
				continue;
			case STATE_HEADER.NEARBY_TICKETS:
				state = READ_STATE.OTHERS;
				continue;
			case STATE_HEADER.BLANK:
				continue;
		}
		switch (state) {
			case READ_STATE.RULES:
				const [rule, groups] = line.split(":");
				const ranges = groups.trim().split(" or ");
				for (const range of ranges) {
					const numStr = range.split("-");
					const start = _.parseInt(numStr[0]);
					const end = _.parseInt(numStr[1]);
					for (let i = start; i <= end; i++) {
						validNumbers.add(i);
					}
				}
				break;
			case READ_STATE.MINE:
				break;
			case READ_STATE.OTHERS:
				const numbers = line.split(",").map(_.parseInt);
				for (const num of numbers) {
					if (!validNumbers.has(num)) {
						sum += num;
					}
				}
				break;
		}
	}
	console.log(sum);
}

main();
