import { RBTree } from "bintrees";
import * as _ from "lodash";

const readline = require("readline");
const fs = require("fs");

function findPair(target: number, tree: RBTree<number>): boolean {
	const outer = tree.iterator();
	let a: number = 0;
	while ((a = outer.next()) !== null) {
		if (a * 2 > target) {
			return false;
		}
		const inner = _.cloneDeep(outer);
		let b: number = 0;
		while ((b = inner.next()) !== null) {
			let x = a + b;
			if (x == target) {
				return true;
			} else if (x > target) {
				continue;
			}
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

	const tree = new RBTree((a: number, b: number) => a - b);
	for (let i = 0; i < 25; i++) {
		tree.insert(numbers[i]);
	}
	for (let i = 25; i < numbers.length; i++) {
		const number = numbers[i];

		if (findPair(number, tree)) {
			tree.remove(numbers[i - 25]);
			tree.insert(number);
		} else {
			console.log(number);
			console.log(findSet(number, numbers));
			return;
		}
	}
}

main();
