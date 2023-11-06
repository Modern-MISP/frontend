# MISP-frontend

## Setup

### Install

`npm install`

### MISP setup

#### Start instance

`npm run start:misp`
Instance will be running at: https://localhost

#### generate your key here:

https://localhost/auth_keys/index

copy the template.env file to .env and replace the PUBLIC_MISP_KEY with your key

#### Update cors settings:

https://localhost/servers/serverSettings/Security

- search for Security.allow_cors and set to true. See: https://github.com/MISP/MISP/pull/4157
- also search for Security.cors_origins and set to \* for testing purposes

## Develope

### Start misp instance to use as api

`npm run start:misp`

### Start sveltekit

`npm run dev`

the frontend will run at: http://localhost:5173/

## Testing

### Unit tests (vitest)

`npm run test:unit`

### Component tests (cyprss)

`npm run test:open`

### integration tests (cyprss)

`npm run test:open`

### Storybook

#### Run

`npm run story:dev`

#### Build

`npm run story:build`
