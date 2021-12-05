export class StateMachine<Type> {
	current?: Type;
	transitions: Map<Type, Type> = new Map();
	next(): Type {
		this.current = this.transitions.get(this.current);
		return this.current;
	}
	constructor(transitions: [Type, Type][], initial: Type) {
		this.current = initial;
		for (const transition of transitions) {
			this.transitions.set(transition[0], transition[1]);
		}
	}
}
