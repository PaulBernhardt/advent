import * as _ from "lodash";
import { xor } from "lodash";

const readline = require("readline");
const fs = require("fs");

interface Seat {
	x: number;
	y: number;
	constraints?: Seat[];
}

let rounds = 0;

function findConstraints(seat: Seat, seats: string[][]) {
	let { x, y } = seat;
	const constraints = seat.constraints ?? [];
	for (let dX = -1; dX <= 1; dX++) {
		for (let dY = -1; dY <= 1; dY++) {
			if (dX == 0 && dY == 0) {
				continue;
			}
			x = seat.x;
			y = seat.y;
			let target = seats[x][y];
			while (target) {
				x += dX;
				y += dY;
				try {
					target = seats[x][y];
				} catch (e) {
					break;
				}
				if (target == "L") {
					constraints.push({ x, y });
					break;
				}
			}
		}
	}
}

async function main() {
	const fileStream = fs.createReadStream("./day11.txt");
	const file = readline.createInterface({ input: fileStream });

	let seats: string[][] = [];
	for await (const line of file) {
		seats.push(line.split(""));
	}

	const seatConstraints: Seat[] = [];
	for (let x = 0; x < seats.length; x++) {
		const row = seats[x];
		for (let y = 0; y < row.length; y++) {
			if (seats[x][y] == ".") {
				continue;
			}
			const constraints: Seat[] = [];
			const seat = { x, y, constraints };
			findConstraints(seat, seats);
			seatConstraints.push(seat);
		}
	}
	let changed = true;
	while (changed) {
		rounds++;
		changed = false;
		const newSeats = _.cloneDeep(seats);
		for (const seat of seatConstraints) {
			const { x, y } = seat;
			let occupied = 0;
			for (const constraint of seat.constraints ?? []) {
				const target = seats[constraint.x][constraint.y];
				if (target == "#") {
					occupied++;
				}
			}
			if (occupied >= 5) {
				newSeats[x][y] = "L";
			} else if (occupied == 0) {
				newSeats[x][y] = "#";
			}
			if (seats[x][y] != newSeats[x][y]) {
				changed = true;
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
