export interface HeaderEntry {
	name: string;
	value: string;
	icon: string;
	displayComp?: ConstructorOfATypedSvelteComponent;
	class?: string;
}
