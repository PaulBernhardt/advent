import { CaveNetwork } from './cave';

export function solvePartOne(network: CaveNetwork): number {
	return network.mapNetwork();
}

export function solvePartTwo(network: CaveNetwork): number {
	return network.mapNetwork(network.start, true);
}
