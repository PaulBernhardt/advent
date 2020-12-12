import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";

async function main() {
	const fileStream = fs.createReadStream("./day6.txt");
	const file = readline.createInterface({ input: fileStream });

	for await (const line of file) {
	}
}

main();
