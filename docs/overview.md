# Design Overview

The frontend represents the "view" part of the Model-View-Controller architecture, when looking at the whole misp project. Therefore we do not have a very complex architecture.

## Components

All components placed inside of the src/lib/components Folder (`Components` box in the uml diagram) are atomar. Meaning they do not create any side effects and are most of the time stateless. To archive a kind of inherence we use dependency injection in the whole application. For example A {@link RelativeDatePill} is a kind of {@link DatePill} wich is a {@link Pill}. We inject the smaller components into the "parent" and therefore creating a kind of inherence.

## API

The communication with the api is done via fetch. Specifically [openapi-fetch](https://www.npmjs.com/package/openapi-fetch) to ensure typesafty. We build an adapter around that function to be able to enable and disable specific api methods. Api Methods are configurable with the `PUBLIC_REST_DISABLED` environment variable. The format is `{[httpAction]: boolean}`

You need to set an api key (PUBLIC_MISP_KEY) and an misp endpoint (PUBLIC_MISP_API_ENDPOINT) inside the environment to communicate with the api. See [sveltekit environment](https://kit.svelte.dev/docs/modules#$env-dynamic-private).

## Authentifikation

When the app loads, the `+layout.page` file checks if a token is set in the localStorage. If it is not set, the app will throw a 403 http error. Afterward the user can login.

## Stores

All the application state is placed inside of the `stores.ts` file. The state lives only once in the whole application and is therefore a singleton. The exported stores are:

- settings: All settings of the application. The possible values are use configurable. The settings page will generate the correct layout from this object.
- mode: "view" or "edit"
- currentRoute: the current route of the page
- actionBarEntries: all entries that are shown inside the {@link TopMenu}
- user: the current user with permissions. The type for this comes from the API specification.

## Design

The Design has be dome with figma. You can see a prototype [here](https://www.figma.com/proto/yzNUGU7J2rmMUjfO3OpTMx/main?type=design&node-id=255-2551&t=tjxPwrXyjy0T4YXR-1&scaling=min-zoom&page-id=105%3A3290&starting-point-node-id=255%3A2551&show-proto-sidebar=1&mode=design).

## Sveltekit

The framework we are using is sveltekit, but we are not using any server functionality. Please refer to the [docs](https://kit.svelte.dev/docs/introduction).
