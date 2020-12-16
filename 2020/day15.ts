import * as _ from "lodash";

async function main() {
	const input = "16,11,15,0,1,7";
	//const input = "0,3,6";
	const numbers = input.split(",").map(_.parseInt);
	const numbersMap: Map<number, [number]> = new Map();

	for (let i = 0; i < numbers.length; i++) {
		const n = numbers[i];
		numbersMap.set(n, [i + 1]);
	}

	let lastNum: number | undefined = numbers[numbers.length - 1];
	for (let turn = numbers.length + 1; turn <= 30000000; turn++) {
		let index = numbersMap.get(lastNum);
		if (index !== undefined && index.length > 1) {
			let lastIndex = index[index.length - 1];
			let firstIndex = index[index.length - 2];
			lastNum = lastIndex - firstIndex;
			let newIndex = (numbersMap.get(lastNum) as [number]) ?? [];
			newIndex.push(turn);
			if (newIndex.length == 1) {
				numbersMap.set(lastNum, newIndex);
			}
		} else {
			let x = numbersMap.get(0);
			if (x == undefined) {
				numbersMap.set(0, [turn]);
			} else {
				x.push(turn);
				lastNum = 0;
			}
		}
		//console.log(turn, lastNum);
	}
	console.log(lastNum);
}

main();
