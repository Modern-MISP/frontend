import type { Themes } from './stores';
import { browser } from '$app/environment';
import yaml from 'js-yaml';
import createClient from 'openapi-fetch';
import type { paths } from '$lib/api/misp'; // generated from openapi-typescript

const config: {
  MISP_API_ENDPOINT: string;
  REST_DISABLED_MESSAGE: string;
  DATE_FORMAT: string;
  REST_DISABLED: { [k in keyof ReturnType<typeof createClient<paths>>]?: boolean };
  MAINTENANCE_MODE: boolean;
  MAINTENANCE_MESSAGE: string;
} = {
  MISP_API_ENDPOINT: '',
  REST_DISABLED_MESSAGE: '',
  DATE_FORMAT: '',
  REST_DISABLED: {},
  MAINTENANCE_MODE: false,
  MAINTENANCE_MESSAGE: ''
};

function checkConfig() {
  if (config.MISP_API_ENDPOINT == null || config.MISP_API_ENDPOINT == undefined)
    throw new Error('Error in config MISP_API_ENDPOINT not set');
  if (config.REST_DISABLED_MESSAGE == null || config.REST_DISABLED_MESSAGE == undefined)
    config.REST_DISABLED_MESSAGE = 'REST functions are disabled';
  if (config.REST_DISABLED == null || config.REST_DISABLED == undefined) config.REST_DISABLED = {};
  if (config.DATE_FORMAT == null || config.DATE_FORMAT == undefined)
    config.DATE_FORMAT = 'yyyy-mm-DD';
  if (config.MAINTENANCE_MODE == null || config.MAINTENANCE_MODE == undefined)
    config.MAINTENANCE_MODE = false;
  if (config.MAINTENANCE_MESSAGE == null || config.MAINTENANCE_MESSAGE == undefined)
    config.MAINTENANCE_MESSAGE =
      'Website is currently in maintenance mode. All editing is disabled.';
}

async function fetchConfig(): Promise<typeof config> {
  if (!browser) {
    return config;
  }
  if (config.MISP_API_ENDPOINT) return config;
  try {
    const response = await fetch(new URL('/config.yaml', window.location.origin));
    if (!response.ok) {
      throw new Error('Failed to fetch config.yaml');
    }
    const rconfig = await yaml.load(await response.text());
    Object.assign(config, rconfig);
    checkConfig();
  } catch (error) {
    console.error('Error fetching config:', error);
    throw error;
  }
  return config;
}

export const INITIAL_SETTINGS: {
  theme: Themes;
  openOnInit: boolean;
} = {
  theme: 'mocha',
  openOnInit: true
};

export default fetchConfig;
