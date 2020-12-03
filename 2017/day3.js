const target = 312051;
let i = 1;
while (true) {
	i += 2;
	if (i * i > target) {
		let lastCompleteSet = i - 2;
		let sideSize = i - 1;
		let steps = target - (lastCompleteSet * lastCompleteSet) - 1;
		let side = Math.floor(steps / sideSize);
		let placeOnSide = steps - (sideSize * side);
		let inner = Math.floor(i / 2);
		let outer = Math.abs(Math.floor(sideSize / 2) - placeOnSide - 1)
		let answer = inner + outer;
		console.log(`Side: ${side}, placeOnSide: ${placeOnSide}, Steps: ${steps}, Interactions: ${i}`)
		console.log(`Inner: ${inner}, Outer: ${outer}`);
		console.log(answer)
		return;
	}
}