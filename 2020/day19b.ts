import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";
import * as XRegExp from "xregexp";

const CTRL = "x";

enum MODE {
	RULES = 1,
	IMAGES,
}

const BASE_VALUES = new Set(["|", "a", "b"]);

function buildRule(rule: string, rules: Map<string, string>) {
	if (!rule.match(CTRL)) {
		return;
	}
}

async function main() {
	const fileStream = fs.createReadStream("./day19.txt");
	const file = readline.createInterface({ input: fileStream });

	const rules: Map<string, string> = new Map();
	let mode = MODE.RULES;
	const images: string[] = [];
	for await (const line of file) {
		if (line == "") {
			mode = MODE.IMAGES;
			continue;
		}
		switch (mode) {
			case MODE.RULES:
				let [key, rule] = line.split(": ");

				if (key == "8") {
					rule = `(${CTRL}42${CTRL})+`;
				}
				if (key == "11") {
					rule =
						"42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31"; // Where is your god now
				}

				rule = rule.replace(/"/g, "");
				rule = rule
					.split(" ")
					.map((r) => (BASE_VALUES.has(r) ? r : `${CTRL}${r}${CTRL}`))
					.join("");
				if (rule.match(/\|/)) {
					rule = `(${rule})`;
				}

				rules.set(key, rule);
				break;
			case MODE.IMAGES:
				images.push(line);
				break;
		}
	}

	let masterRule = rules.get(`0`) as string;
	while (masterRule.match(CTRL)) {
		let subs = masterRule.split(CTRL);
		masterRule = subs.map((v) => (rules.get(v) ? rules.get(v) : v)).join("");
	}

	const rule = RegExp(`^${masterRule}$`);
	let total = 0;
	for (const image of images) {
		if (image.match(rule)) {
			total++;
		}
	}
	console.log(total);
}

main();
