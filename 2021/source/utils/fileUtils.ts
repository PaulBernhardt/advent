import * as readline from 'readline';
import fs from 'fs';

export interface ObjectParser<Type> {
	parse(line: string): void;
	next(): void;
	complete(): Type;
}

export type Parser<Type> = (value: string) => Type;

export async function readIntoArray<Type>(uri: string, parser: Parser<Type>): Promise<Array<Type>> {
	const fileStream = fs.createReadStream(uri);
	const file = readline.createInterface({ input: fileStream });
	const arr: Array<Type> = [];
	for await (const line of file) {
		arr.push(parser(line));
	}

	return arr;
}

export async function readIntoObject<Type>(uri: string, parser: ObjectParser<Type>): Promise<Type> {
	const fileStream = fs.createReadStream(uri);
	const file = readline.createInterface({ input: fileStream });
	// If we call next and parse a line, we need to call next before completing so the parser doesn't
	// have to keep track
	let dirty = false;
	for await (const line of file) {
		if (line.length == 0) {
			parser.next();
			dirty = false;
		} else {
			parser.parse(line);
			dirty = true;
		}
	}
	if (dirty) {
		parser.next();
	}
	return parser.complete();
}

export async function readFromCSVLine<Type>(uri: string, parser: Parser<Type>): Promise<Array<Type>> {
	const parseObject = new SingleLineParser<Array<Type>>((line) => line.split(',').map(parser));
	return readIntoObject(uri, parseObject);
}

export class SingleLineParser<Type> implements ObjectParser<Type> {
	private data: Type;
	private parser: Parser<Type>;

	parse(line: string): void {
		this.data = this.parser(line);
	}
	next(): void {}
	complete(): Type {
		return this.data;
	}

	constructor(parser: Parser<Type>) {
		this.parser = parser;
	}
}
