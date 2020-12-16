import * as _ from "lodash";

interface NumberPair {
	first: number;
	second: number;
}
async function main() {
	//const input = "16,11,15,0,1,7";
	const input = "0,3,6";
	const numbers = input.split(",").map(_.parseInt);
	const numbersMap: Map<number, number> = new Map();

	for (let i = 0; i < numbers.length - 1; i++) {
		const n = numbers[i];
		numbersMap.set(n, i + 1);
	}

	let lastIndex: number | undefined = numbers.length - 1;
	let lastNum = numbers[lastIndex];
	let turn = lastIndex + 1;
	for (let i = numbers.length; i <= 2022; i++) {
		turn++;
		let newIndex = numbersMap.get(lastNum);
		if (lastIndex !== undefined && newIndex !== undefined) {
			lastNum = newIndex - lastIndex;
			lastIndex = numbersMap.get(lastNum);
			numbersMap.set(lastNum, turn);
			
		} else {
			lastIndex = numbersMap.get(0);
			numbersMap.set(0, turn);
			lastNum = 0;
		}
		console.log(turn, lastNum)
	}
	console.log(lastNum);
}

main();
