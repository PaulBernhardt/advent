import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";
import * as XRegExp from "xregexp";

function parseMath(line: string): number {
	const groups = XRegExp.matchRecursive(line, "\\(", "\\)", "g");
	for (const group of groups) {
		line = line.replace(`(${group})`, `${parseMath(group)}`);
	}

	let mulitpules = line.split(" * ");
	let total = 1;
	for (const multi of mulitpules) {
		let symbols = multi.split(" ");
		let sum = _.parseInt(symbols[0]);
		for (let i = 1; i < symbols.length; i += 2) {
			const symbol = symbols[i];
			if (symbol == undefined) {
				break;
			}
			let number = _.parseInt(symbols[i + 1]);
			sum += number;
		}
		total *= sum;
	}
	return total;
}

async function main() {
	const fileStream = fs.createReadStream("./day18.txt");
	const file = readline.createInterface({ input: fileStream });

	let sum = 0;
	for await (const line of file) {
		sum += parseMath(line);
	}

	console.log(sum);
}

main();
