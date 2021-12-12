import { ObjectParser } from '../utils/fileUtils';

export class Octopus {
	neighbours: Octopus[] = [];
	grid: OctoGrid;
	brightness = 0;

	addNeighbour(octopus: Octopus) {
		this.neighbours.push(octopus);
		octopus.neighbours.push(this);
	}

	addBrightness() {
		if (!this.grid.hasFlashed.has(this)) {
			this.brightness++;
			if (this.brightness > 9) {
				this.brightness = 0;
				this.grid.flash(this);
				for (const octo of this.neighbours) {
					octo.addBrightness();
				}
			}
		}
	}

	constructor(brightness: number, grid: OctoGrid) {
		this.brightness = brightness;
		this.grid = grid;
	}
}

export class OctoGrid {
	grid: Octopus[][] = [];
	flashes = 0;
	hasFlashed = new Set<Octopus>();
	flash(octopus: Octopus) {
		this.hasFlashed.add(octopus);
		this.flashes++;
	}
	next(iterations = 1): number {
		const currentFlashes = this.flashes;
		for (const line of this.grid) {
			for (const octopus of line) {
				octopus.addBrightness();
			}
		}
		this.hasFlashed.clear();

		if (this.flashes - currentFlashes == this.grid.length * this.grid[0].length && iterations < -1) {
			return Math.abs(iterations);
		}

		if (iterations > 1 || iterations <= -1) {
			return this.next(iterations - 1);
		}
	}
}
export class OctopusParser implements ObjectParser<OctoGrid> {
	octoGrid = new OctoGrid();
	currentGrid: Octopus[] = [];
	lastGrid?: Octopus[] = [];
	parse(line: string): void {
		for (let i = 0; i < line.length; i++) {
			const octopus = new Octopus(parseInt(line[i]), this.octoGrid);
			this.currentGrid[i - 1]?.addNeighbour(octopus);
			this.lastGrid?.[i - 1]?.addNeighbour(octopus);
			this.lastGrid?.[i]?.addNeighbour(octopus);
			this.lastGrid?.[i + 1]?.addNeighbour(octopus);
			this.currentGrid.push(octopus);
		}
		this.octoGrid.grid.push(this.currentGrid);
		this.lastGrid = this.currentGrid;
		this.currentGrid = [];
	}
	next(): void {}
	complete(): OctoGrid {
		return this.octoGrid;
	}
}
