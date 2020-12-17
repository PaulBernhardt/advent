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

interface Range {
	start: number;
	end: number;
}

class TicketField {
	label: string;
	range: Range[];
	isDeparture: boolean;
	constructor(label: string, range: Range[]) {
		this.label = label;
		this.range = range;
		this.isDeparture = label.startsWith("departure");
	}

	check = (value: number): boolean => {
		for (const range of this.range) {
			if (value >= range.start && value <= range.end) {
				return true;
			}
		}
		return false;
	};
}

function removeRule(ruleKey: string, fields: Map<string, TicketField>[]) {
	for (const rules of fields) {
		if (rules.size == 1) {
			continue;
		}
		if (rules.has(ruleKey)) {
			rules.delete(ruleKey);
			if (rules.size == 1) {
				removeRule(rules.keys().next().value, fields);
			}
		}
	}
}

async function main() {
	const fileStream = fs.createReadStream("./day16.txt");
	const file = readline.createInterface({ input: fileStream });

	const validNumbers: Set<number> = new Set();
	let state = READ_STATE.RULES;
	let validTickets: number[][] = [];
	const fields: Map<string, TicketField> = new Map();
	let myTicket: number[] = [];
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
				const rangeArray: Range[] = [];
				for (const range of ranges) {
					const numStr = range.split("-");
					const start = _.parseInt(numStr[0]);
					const end = _.parseInt(numStr[1]);
					rangeArray.push({ start, end });
					for (let i = start; i <= end; i++) {
						validNumbers.add(i);
					}
				}
				fields.set(rule, new TicketField(rule, rangeArray));
				break;
			case READ_STATE.MINE:
				myTicket = line.split(",").map(_.parseInt);
				break;
			case READ_STATE.OTHERS:
				const numbers = line.split(",").map(_.parseInt);
				let valid = true;
				for (const num of numbers) {
					if (!validNumbers.has(num)) {
						valid = false;
						break;
					}
				}
				if (valid) {
					validTickets.push(numbers);
				}
				break;
		}
	}
	const ticketOrder: Map<string, TicketField>[] = [];
	for (let i = 0; i < fields.size; i++) {
		ticketOrder.push(_.cloneDeep(fields));
	}

	for (const ticket of validTickets) {
		for (let i = 0; i < ticket.length; i++) {
			const field = ticket[i];
			const rules = ticketOrder[i];
			if (rules.size == 1) {
				continue;
			}
			const keys = rules.keys();
			for (const key of keys) {
				const rule = rules.get(key) as TicketField;
				if (!rule.check(field)) {
					rules.delete(key);
					if (rules.size == 1) {
						removeRule(rules.keys().next().value, ticketOrder);
					}
					if (rules.size == 0) {
						console.error("Should not have been able to delete that.");
					}
				}
			}
		}
	}
	const order: TicketField[] = ticketOrder.map(
		(field) => field.values().next().value
	);
	console.log("Order is:");
	for (let field of order) {
		console.log(field.label);
	}

	let total = 1;
	for (let i = 0; i < order.length; i++) {
		const field = order[i];
		if (field.isDeparture) {
			total *= myTicket[i];
		}
	}

	console.log(total);
}

main();
