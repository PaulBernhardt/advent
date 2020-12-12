import * as _ from "lodash";

const readline = require("readline");
const fs = require("fs");

let rounds = 0;
function checkSeat(x: number, y: number, seats: string[][]): string {
	const seat = seats[x][y];
	if (seat == ".") {
		return seat;
	}
	let occupied = 0;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (i == 0 && j == 0) {
				continue;
			}
			const row = seats[i + x] ?? [];
			const target = row[j + y] ?? ".";
			if (target == "#") {
				occupied++;
			}
		}
	}
	if (occupied == 0) {
		return "#";
	} else if (occupied >= 4) {
		return "L";
	}
	return seat;
}

async function main() {
	const fileStream = fs.createReadStream("./day11.txt");
	const file = readline.createInterface({ input: fileStream });

	let seats: string[][] = [];
	for await (const line of file) {
		seats.push(line.split(""));
	}
	let changed = true;
	while (changed) {
		rounds++;
		changed = false;
		const newSeats = _.cloneDeep(seats);
		for (let i = 0; i < seats.length; i++) {
			let row = seats[i];
			for (let j = 0; j < row.length; j++) {
				newSeats[i][j] = checkSeat(i, j, seats);
				if (newSeats[i][j] != seats[i][j]) {
					changed = true;
				}
			}
		}
		seats = newSeats;
	}

	let occupied = 0;
	for (const row of seats) {
		for (const seat of row) {
			if (seat == "#") {
				occupied++;
			}
		}
	}
	console.log(occupied);
}

main();
