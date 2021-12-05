import { StateMachine } from './stateMachine';
describe('when using a state machine', () => {
	// Test state
	enum T {
		a,
		b,
		c,
	}
	it('should make a simple machine', () => {
		const test = new StateMachine<T>(
			[
				[T.a, T.b],
				[T.b, T.c],
			],
			T.a,
		);
		expect(test.current).toBe(T.a);
		expect(test.next()).toBe(T.b);
		expect(test.current).toBe(T.b);
		expect(test.next()).toBe(T.c);
		expect(test.current).toBe(T.c);
		expect(test.next()).toBe(undefined);
		expect(test.current).toBe(undefined);
	});
});
