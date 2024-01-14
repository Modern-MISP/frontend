# Design Overview

The frontend represents the "view" part of the Model-View-Controller architecture in regard to the overall MISP project. Therefore we do not have a very complex architecture.

## Components

All components placed inside the `src/lib/components` directory (`Components` box in the uml diagram) are atomic, meaning they do not create any side effects and are usually (close to) stateless.
As a way to achieve a similar effect to inheritance between components, dependency injection is used throughout the application.
As an example, a [`RelativeDatePill`](components.md#relativedatepill) is a kind of [`DatePill`](components.md#datepill) wich is a [`Pill`](components.md#pill).
This kind of "inheritance" is achieved by injecting the more generalized components into the more specific components.

## API

Communication with the API is achieved via the browser [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
The library [openapi-fetch](https://www.npmjs.com/package/openapi-fetch) is used to automatically ensure type safety for all API calls according to the agreed upon OpenAPI spec.
We build an adapter around that function to be able to enable and disable specific api methods.
There is a custom wrapper around that function to provide advanced capabilities like the option to enable and disable specific HTTP methods.
HTTP methods are configurable with the `PUBLIC_REST_DISABLED` environment variable. The format is `{[httpMethod]: boolean}`

You need to set an api key (PUBLIC_MISP_KEY) and an misp endpoint (PUBLIC_MISP_API_ENDPOINT) inside the environment to communicate with the api.
The API auth key (`PUBLIC_MISP_KEY`) and the MISP API endpoint (`PUBLIC_MISP_API_ENDPOINT`) are provided via environment variables,
and are required to exist.

## Authentification

When the app loads, the `+layout.page` file checks if a token is set in the `localStorage`.
If it is set, the user gets redirected to the default page.
If it isn't set, the user gets redirected to the [`/login`](pages.md#/login) page instead.

## Stores

All the application state is centralized in the `stores.ts` file via [Svelte Stores](https://svelte.dev/docs/svelte-store).
All stores are global singletons that can be accessed throughout the application.

The exported stores are:

- settings: All settings of the application. The possible values are user-configurable. The settings page will generate the correct layout from this object.
- mode: "view" or "edit"
- currentRoute: The route currently displayed.
- actionBarEntries: All entries that are supposed to be shown inside the [`ActionBar`](components.md#actionbar).
- user: The current user with permissions. The type of this value is extracted from the OpenAPI specification.

## Design

The initial design work was done with Figma. A prototype is visible [here](https://www.figma.com/proto/yzNUGU7J2rmMUjfO3OpTMx/main?type=design&node-id=255-2551&t=tjxPwrXyjy0T4YXR-1&scaling=min-zoom&page-id=105%3A3290&starting-point-node-id=255%3A2551&show-proto-sidebar=1&mode=design).

## Framework

The application is built as a SvelteKit application, but without using any of SvelteKit's server functionality. Please refer to the [docs](https://kit.svelte.dev/docs/introduction).
