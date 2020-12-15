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
	andMasks: bigint[][];
}

interface MemCommand {
	type: COMMAND_TYPE.mem;
	memory: bigint;
	value: bigint;
}

type Command = MaskCommand | MemCommand;

function createMaskPermutations(value: string): bigint[][] {
	let masks: bigint[][] = [[0n, 0n]];
	for (const char of value) {
		switch (char) {
			case "X":
				const newMasks: bigint[][] = [];
				for (const mask of masks) {
					newMasks.push([mask[0] << 1n, mask[1] << 1n]);
					newMasks.push([(mask[0] << 1n) + 1n, (mask[1] << 1n) + 1n]);
				}
				masks = newMasks;
				break;
			case "1":
			case "0":
				for (let i = 0; i < masks.length; i++) {
					masks[i][0] <<= 1n;
					masks[i][1] = (masks[i][1] << 1n) + 1n;
				}
				break;
		}
	}
	return masks;
}

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
				andMasks: createMaskPermutations(value),
			};
			commands.push(command);
		} else {
			const command: MemCommand = {
				type: COMMAND_TYPE.mem,
				value: BigInt(_.parseInt(value)),
				memory: BigInt(_.parseInt(commandWord.replace(/(.*\[|\])/g, ""))),
			};
			commands.push(command);
		}
	}
	let memory: Map<bigint, bigint> = new Map();

	let mask: MaskCommand = {
		type: COMMAND_TYPE.mask,
		orMask: 0n,
		andMasks: [[0n]],
	};
	for (const command of commands) {
		switch (command.type) {
			case COMMAND_TYPE.mask:
				mask = command;
				break;
			case COMMAND_TYPE.mem:
				const memoryLocation = command.memory | mask.orMask;
				for (const masks of mask.andMasks) {
					const m = (memoryLocation | masks[0]) & masks[1];
					memory.set(m, command.value);
				}
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
