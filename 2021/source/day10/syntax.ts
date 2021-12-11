enum MATCH {
	'(' = ')',
	'[' = ']',
	'{' = '}',
	'<' = '>',
}

export enum SCORE {
	')' = 3,
	']' = 57,
	'}' = 1197,
	'>' = 25137,
}

export enum COMPLETE_SCORE {
	')' = 1,
	']' = 2,
	'}' = 3,
	'>' = 4,
}

export interface CheckResult {
	char?: string;
	queue?: string[];
}

export function checkLine(line: string): CheckResult {
	const queue = [];
	for (const char of line) {
		const matching = MATCH[char];
		if (MATCH[char]) {
			queue.push(matching);
		} else if (char == queue.pop()) {
			// great
		} else {
			return { char };
		}
	}
	return { queue };
}

export function calcQueueScore(queue: string[]): number {
	let total = 0;
	for (let i = queue.length - 1; i >= 0; i--) {
		const char = queue[i];
		total = total * 5 + COMPLETE_SCORE[char];
	}
	return total;
}
