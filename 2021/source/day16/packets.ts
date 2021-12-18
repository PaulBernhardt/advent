import { Parser } from '../utils/fileUtils';

export const parseHexToBinary: Parser<string> = (line: string): string => {
	let buffer = '';
	for (const char of line) {
		buffer += Number.parseInt(char, 16).toString(2).padStart(4, '0');
	}
	return buffer;
};

enum OPERATOR_PACKET_MODE {
	LENGTH = '0',
	COUNT = '1',
}

enum OPERATION {
	SUM = 0,
	PRODUCT = 1,
	MIN = 2,
	MAX = 3,
	VALUE = 4, // not really used
	GREATER = 5,
	LESSER = 6,
	EQUAL = 7,
}

abstract class Packet {
	version: number;
	type: OPERATION;
	payload: string;
	abstract parse(): string;
	constructor(version: number, type: number, payload: string) {
		this.version = version;
		this.type = type;
		this.payload = payload;
	}
	abstract calcVersionSum(): number;
	abstract calcTotal(): number;
}

// Number Byte Length
const NBL = 5;
export class NumberPacket extends Packet {
	number: number;
	parse(): string {
		let bits = '';
		let byteCount = 0;
		let byte;
		do {
			byte = this.payload.substring(byteCount * NBL, (byteCount + 1) * NBL);
			bits += byte.substring(1, NBL);
			byteCount++;
		} while (byte[0] != '0');
		this.number = parseInt(bits, 2);
		return this.payload.substring(byteCount * NBL);
	}
	calcVersionSum(): number {
		return this.version;
	}
	calcTotal(): number {
		return this.number;
	}
}

export class OperatorPacket extends Packet {
	subpackets: Packet[] = [];
	parse(): string {
		switch (this.payload[0]) {
			case OPERATOR_PACKET_MODE.LENGTH:
				return this.parseModeLength();
			case OPERATOR_PACKET_MODE.COUNT:
				return this.parseModeCount();
		}
		return;
	}

	calcVersionSum(): number {
		return this.version + this.subpackets.reduce((total, packet) => total + packet.calcVersionSum(), 0);
	}

	parseModeLength(): string {
		const length = parseInt(this.payload.substring(1, 16), 2);
		let remainder = this.payload.substring(16, 16 + length);
		while (remainder.length > 0) {
			const packet = loadPacket(remainder);
			this.subpackets.push(packet);
			remainder = packet.parse();
		}

		return this.payload.substring(16 + length);
	}
	parseModeCount(): string {
		const count = parseInt(this.payload.substring(1, 12), 2);
		let remainder = this.payload.substring(12);
		for (let i = 0; i < count; i++) {
			const packet = loadPacket(remainder);
			this.subpackets.push(packet);
			remainder = packet.parse();
		}
		return remainder;
	}
	calcTotal(): number {
		switch (this.type) {
			case OPERATION.SUM:
				return this.subpackets.reduce((total, packet) => total + packet.calcTotal(), 0);
			case OPERATION.PRODUCT:
				return this.subpackets.reduce((total, packet) => total * packet.calcTotal(), 1);
			case OPERATION.MIN:
				return Math.min(...this.subpackets.map((packet) => packet.calcTotal()));
			case OPERATION.MAX:
				return Math.max(...this.subpackets.map((packet) => packet.calcTotal()));
			case OPERATION.GREATER:
				return this.subpackets[0].calcTotal() > this.subpackets[1].calcTotal() ? 1 : 0;
			case OPERATION.LESSER:
				return this.subpackets[0].calcTotal() < this.subpackets[1].calcTotal() ? 1 : 0;
			case OPERATION.EQUAL:
				return this.subpackets[0].calcTotal() == this.subpackets[1].calcTotal() ? 1 : 0;
		}
		return 0;
	}
}

export function loadPacket(data: string): Packet {
	const version = parseInt(data.substring(0, 3), 2);
	const type = parseInt(data.substring(3, 6), 2);
	switch (type) {
		case 4:
			return new NumberPacket(version, type, data.substring(6));
		default:
			return new OperatorPacket(version, type, data.substring(6));
	}
}
