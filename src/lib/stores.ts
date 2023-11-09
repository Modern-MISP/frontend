import { browser } from '$app/environment';
import { writable } from 'svelte/store';
const createSettingsStore = <T>(init: T) => {
	const { subscribe, set, update } = writable<T>(init);

	function saveOnSet(value: T) {
		if (browser) localStorage.setItem('settings', JSON.stringify(value));
		set(value);
	}

	return {
		subscribe,
		set: saveOnSet,
		update
	};
};

let init = {
	theme: 'mocha',
	openOnInit: true
};

if (browser) {
	const localSettings = JSON.parse(localStorage.getItem('settings') || '{}');
	if (localSettings) init = localSettings;
}

export const settings = createSettingsStore(init);
