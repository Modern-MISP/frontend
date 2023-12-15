import Input from '../../src/lib/components/input/Input.svelte';

describe('Input.cy.ts', () => {
	it('playground', () => {
		cy.mount(Input);
		cy.wait(100);
		cy.screenshot('checkbox');
	});
});
