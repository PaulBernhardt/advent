import { ObjectParser } from '../utils/fileUtils';

export class FishCollection {
	private current = 0;
	private _fish: number[];
	private _cachedFish: number[];
	private _dirty = true;
	// Since we don't have a good internal fish array due to the
	// next implementation, calculate one when asked, which
	// just shows you the number of fish in each bucket.
	get fish(): number[] {
		if (this._dirty) {
			const f = this._cachedFish.fill(0);
			const current = this.current;
			const length = this._fish.length;
			for (let i = 0; i < length; i++) {
				f[i] = this._fish[(i + current) % length];
			}
		}
		this._dirty = false;
		return this._cachedFish;
	}
	next() {
		// To solve this, you would take the value at 0 in the fish array,
		// move every value above it down one value, and add the value that
		// was at 0 to the new 6th and 8th slots. That would be a lot of
		// operations, so instead we use the internal fish array as a ring
		// buffer, so all we need to is move the current position up one
		// (modulus the length of the array so it wraps) and add the value
		// that was in original current position to 6 spots above.
		// The old current becomes the new 8th slot, so we don't need to add
		// anything else.
		const spawning = this._fish[this.current];
		this.current = (this.current + 1) % this._fish.length;
		this._fish[(this.current + 6) % this._fish.length] += spawning;
		this._dirty = true;
	}
	constructor(array: number[]) {
		this._fish = new Array(9).fill(0);
		// Have a single array with 9 slots (0-8) and track how many fish
		// are in each bucket, rather than tracking their numbers individually
		for (const f of array) {
			this._fish[f]++;
		}
		this._cachedFish = new Array(9).fill(0);
	}
}

export class FishParser implements ObjectParser<FishCollection> {
	fishCollection: FishCollection;
	parse(line: string): void {
		const array = line.split(',').map((x) => parseInt(x));
		this.fishCollection = new FishCollection(array);
	}
	next(): void {
		return;
	}
	complete(): FishCollection {
		return this.fishCollection;
	}
}
