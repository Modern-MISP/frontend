import type { Themes } from './stores';

export const INITIAL_SETTINGS: {
  theme: Themes;
  openOnInit: boolean;
} = {
  theme: 'mocha',
  openOnInit: true
};
