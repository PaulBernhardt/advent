import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";

enum COMMAND_TYPE {
	mem = 1,
	mask,
}

interface MaskCommand {
	type: COMMAND_TYPE.mask;
	orMask: number;
	andMask: number;
}

interface MemCommand {
	type: COMMAND_TYPE.mem;
	memory: string;
	value: number;
}

type Command = MaskCommand | MemCommand;

async function main() {
	const fileStream = fs.createReadStream("./day14.txt");
	const file = readline.createInterface({ input: fileStream });

	const commands: Command[] = [];
	for await (const line of file) {
		const [commandWord, value] = line.split(" = ");
		if (commandWord == "mask") {
			const command: MaskCommand = {
				type: COMMAND_TYPE.mask,
				orMask: _.parseInt(value.replace(/X/g, "0"), 2),
				andMask: _.parseInt(value.replace(/X/g, "1"), 2),
			};
			commands.push(command);
		} else {
			const command: MemCommand = {
				type: COMMAND_TYPE.mem,
				value: _.parseInt(value),
				memory: commandWord.replace(/(.*\[|\])/g, ""),
			};
			commands.push(command);
		}
	}
	let memory: Map<string, number> = new Map();

	let mask: MaskCommand = { type: COMMAND_TYPE.mask, orMask: 0, andMask: 0 };
	for (const command of commands) {
		switch (command.type) {
			case COMMAND_TYPE.mask:
				mask = command;
				break;
			case COMMAND_TYPE.mem:
				memory.set(
					command.memory,
					(command.value | mask.orMask) & mask.andMask
				);
				break;
		}
	}

	let sum = 0;
	for (const x of memory.values()) {
		sum += x;
	}
	console.log(sum);
}

main();
