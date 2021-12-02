import * as readline from 'readline';
import fs from 'fs';

export async function readIntoArray<Type>(uri: string, parser: (value: string) => Type): Promise<Array<Type>> {
	const fileStream = fs.createReadStream(uri);
	const file = readline.createInterface({ input: fileStream });

	const arr: Array<Type> = [];
	for await (const line of file) {
		if (line.length == 0) {
			break;
		}
		arr.push(parser(line));
	}

	return arr;
}
