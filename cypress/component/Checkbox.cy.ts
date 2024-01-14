import Checkbox from '../../src/lib/components/checkbox/Checkbox.svelte';

describe('Checkbox.cy.ts', () => {
	it('playground', () => {
		cy.mount(Checkbox, { props: { checked: false } });
		cy.wait(100);
		cy.screenshot('checkbox');
	});
});
