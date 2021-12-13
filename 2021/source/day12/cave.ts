import { ObjectParser } from '../utils/fileUtils';

export class Cave {
	large: boolean;
	neighbours: Cave[] = [];
	name: string;

	addNeighbour(cave: Cave) {
		this.neighbours.push(cave);
		cave.neighbours.push(this);
	}

	constructor(name: string, large: boolean) {
		this.name = name;
		this.large = large;
	}
}

export class CaveNetwork {
	start: Cave;
	end: Cave;
	caves: Map<string, Cave> = new Map();
	visited: Set<Cave> = new Set();
	routes: number = 0;
	getCave(name: string) {
		let cave = this.caves.get(name);
		if (!cave) {
			cave = new Cave(name, name == name.toUpperCase());
			this.caves.set(name, cave);
			if (name == 'start') {
				this.start = cave;
			} else if (name == 'end') {
				this.end = cave;
			}
		}
		return cave;
	}
	mapNetwork(cave: Cave = this.start, revisit: boolean = false, revisited: Cave = null) {
		if (cave == this.end) {
			return 1;
		} else if (cave.neighbours.length == 0) {
			return 0;
		}
		if (!cave.large) {
			this.visited.add(cave);
		}
		let count = 0;
		for (const dest of cave.neighbours) {
			if (dest == this.start) {
				continue;
			} else if (!this.visited.has(dest)) {
				count += this.mapNetwork(dest, revisit, revisited);
			} else if (revisit && revisited == null) {
				count += this.mapNetwork(dest, revisit, dest);
			}
		}
		if (cave != revisited) {
			this.visited.delete(cave);
		}
		return count;
	}
}

export class CaveParser implements ObjectParser<CaveNetwork> {
	network: CaveNetwork = new CaveNetwork();
	parse(line: string): void {
		const [originName, destName] = line.split('-');
		const origin = this.network.getCave(originName);
		const dest = this.network.getCave(destName);
		origin.addNeighbour(dest);
	}
	next(): void {}
	complete(): CaveNetwork {
		return this.network;
	}
}
