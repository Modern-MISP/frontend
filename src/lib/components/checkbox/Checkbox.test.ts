import '@testing-library/jest-dom/vitest';
import { render, fireEvent, screen } from '@testing-library/svelte';
import Checkbox from './Checkbox.svelte';
import { describe, expect, it } from 'vitest';

describe('checkbox', () => {
  it('should change when clicked', async () => {
    const { container } = await render(Checkbox, {
      props: { checked: false }
    });

    // Idk why the actual component is so deeply nested
    const label = container.children[0].children[0];

    const cb = await screen.findByRole('checkbox');

    expect(cb).not.toBeChecked();

    await fireEvent.click(label);

    expect(cb).toBeChecked();
  });
});
