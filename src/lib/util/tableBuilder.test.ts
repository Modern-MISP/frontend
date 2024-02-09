import { describe, expect, it } from 'vitest';
import { createTableHeadGenerator } from './tableBuilder.util';

describe('Table builder', () => {
  it("does nothing bc i'm not actually testing it", () => {
    const col = createTableHeadGenerator<{ foo: string }>();
    const idk = col({ value: (x) => x.foo, label: 'meow' });
    expect(idk).toHaveProperty('subscribe');
  });
});
