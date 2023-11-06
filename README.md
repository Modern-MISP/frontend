# MISP-frontend

## Setup

### Install

`npm install`

### MISP setup

#### Start instance

`npm run start:misp`
Instance will be running at: http://localhost

#### generate your key here:

http://localhost/auth_keys/index

copy the template.env file to .env and replace the PUBLIC_MISP_KEY with your key

#### Update cors settings:

http://localhost/servers/serverSettings/Security

search for Security.allow_cors and set to true. See: https://github.com/MISP/MISP/pull/4157

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
