import type { Themes } from './stores';

export const INITIAL_SETTINGS: {
  theme: Themes;
  openOnInit: boolean;
  tableMaxSize: boolean;
} = {
  theme: 'mocha',
  openOnInit: true,
  tableMaxSize: false
};
