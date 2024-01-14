# Intro

The project "Modern MISP Frontend" is implemented as a client-side rendered [SvelteKit](https://kit.svelte.dev/) application.

SvelteKit applications are constructed out of [Components](components.md#components).
They are `.svelte` files found in the `src` directory of this project.
See [here](https://svelte.dev/docs/svelte-components) for general documentation about Svelte Components.

All routes of the application are represented by specific Components called [Pages](pages.md#pages).
They are the files called `+page.svelte` in the `src/routes` directory of this project.
See [here](https://kit.svelte.dev/docs/routing#page) for general documentation about SvelteKit Pages.

Pages "inherit" from specific Components called [Layouts](layouts.md#layouts) placed higher up in the route tree by automatically being placed into the Layout's default slot.
They are the files called `+layout.svelte` in the `src/routes` directory of this project.
See [here](https://kit.svelte.dev/docs/routing#layout) for general documentation about SvelteKit Layouts.

Note that the inter-component dependencies and the specifics of exposed props, slots and events may not fully represent the final state of the application, as agreed upon with our supervisors.

