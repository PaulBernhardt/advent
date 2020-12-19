import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";

async function main() {
	const fileStream = fs.createReadStream("./dayX.txt");
	const file = readline.createInterface({ input: fileStream });

	for await (const line of file) {
	}
}

main();
