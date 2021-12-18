import { loadPacket, NumberPacket, OperatorPacket, parseHexToBinary } from './packets';

const BINARY_OPERATOR_PACKET = '00111000000000000110111101000101001010010001001000000000';
const BINARY_NUMBER_PACKET = '110100101111111000101000';

describe('when parsing packets', () => {
	it('should covert hex to binary strings', () => {
		expect(parseHexToBinary('FF')).toBe('11111111');
		expect(parseHexToBinary('10')).toBe('00010000');
	});

	it('should determine the type of packet from a string and return a typed packet', () => {
		const operator = loadPacket(BINARY_OPERATOR_PACKET);
		expect(operator).toBeInstanceOf(OperatorPacket);

		const number = loadPacket(BINARY_NUMBER_PACKET);
		expect(number).toBeInstanceOf(NumberPacket);
	});

	it('should parse a number packet and return the remaining packets', () => {
		const number = loadPacket(BINARY_NUMBER_PACKET) as NumberPacket;
		const remainder = number.parse();
		expect(remainder).toBe('000');
		expect(number.number).toBe(2021);
	});

	it('should parse an operator packet and return the remaining packets', () => {
		const operator = loadPacket(BINARY_OPERATOR_PACKET) as OperatorPacket;
		const remainder = operator.parse();
		expect(operator.subpackets.length).toBe(2);
		expect(remainder).toBe('0000000');
		const first = operator.subpackets[0] as NumberPacket;
		const second = operator.subpackets[1] as NumberPacket;

		expect(first.number).toBe(10);
		expect(second.number).toBe(20);
	});

	it('should parse the first example hex string', () => {
		const input = parseHexToBinary('8A004A801A8002F478');
		const first = loadPacket(input) as OperatorPacket;
		first.parse();
		expect(first.subpackets.length).toBe(1);
		expect(first.version).toBe(4);

		const second = first.subpackets[0] as OperatorPacket;
		expect(second.subpackets.length).toBe(1);
		expect(second.version).toBe(1);

		const third = second.subpackets[0] as OperatorPacket;
		expect(third.subpackets.length).toBe(1);
		expect(third.version).toBe(5);

		const fourth = third.subpackets[0] as NumberPacket;
		expect(fourth.version).toBe(6);
	});

	it('should calculate the version total of the three example hex strings', () => {
		const first = loadPacket(parseHexToBinary('8A004A801A8002F478'));
		first.parse();
		expect(first.calcVersionSum()).toBe(16);

		const second = loadPacket(parseHexToBinary('C0015000016115A2E0802F182340'));
		second.parse();
		expect(second.calcVersionSum()).toBe(23);

		const third = loadPacket(parseHexToBinary('A0016C880162017C3686B18A3D4780'));
		third.parse();
		expect(third.calcVersionSum()).toBe(31);
	});

	it('should calculate the total of example input', () => {
		const tests = [
			['C200B40A82', 3],
			['04005AC33890', 54],
			['880086C3E88112', 7],
			['CE00C43D881120', 9],
			['D8005AC2A8F0', 1],
			['F600BC2D8F', 0],
			['9C005AC2F8F0', 0],
			['9C0141080250320F1802104A08', 1],
		];

		for (const [input, total] of tests) {
			const packet = loadPacket(input as string);
			packet.parse();
			expect(packet.calcTotal()).toBe(total as number);
		}
	});
});
