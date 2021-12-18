import { loadPacket } from './packets';

export function solvePartOne(values: string): number {
	const packet = loadPacket(values);
	packet.parse();
	return packet.calcVersionSum();
}

export function solvePartTwo(values: string): number {
	const packet = loadPacket(values);
	packet.parse();
	return packet.calcTotal();
}
