import * as _ from "lodash";
import * as readline from "readline";
import * as fs from "fs";

enum COMMAND_TYPE {
	mem = 1,
	mask,
}

interface MaskCommand {
	type: COMMAND_TYPE.mask;
	orMask: bigint;
	andMask: bigint;
}

interface MemCommand {
	type: COMMAND_TYPE.mem;
	memory: string;
	value: bigint;
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
				orMask: BigInt(_.parseInt(value.replace(/X/g, "0"), 2)),
				andMask: BigInt(_.parseInt(value.replace(/X/g, "1"), 2)),
			};
			commands.push(command);
		} else {
			const command: MemCommand = {
				type: COMMAND_TYPE.mem,
				value: BigInt(_.parseInt(value)),
				memory: commandWord.replace(/(.*\[|\])/g, ""),
			};
			commands.push(command);
		}
	}
	let memory: Map<string, bigint> = new Map();

	let mask: MaskCommand = { type: COMMAND_TYPE.mask, orMask: 0n, andMask: 0n };
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

	let sum = 0n;
	for (const x of memory.values()) {
		sum += x;
	}
	console.log(sum);
}

main();
