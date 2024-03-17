# Einleitung

Stuff I gotta write about (TODO):

- [ ] General cypress setup
- [ ] Automated CI e2e testing (if this ever ends up working)
- [x] Fixed workflow reactivity (now gets properly invalidated and reset on cancel): https://gitlab.kit.edu/kit/kit-cert/mmisp/frontend/-/merge_requests/141
- [ ] List test cases from pflichtenheft and how we tested them
- [ ] Additional e2e tests we implemented
- [ ] Maybe talk more about unit tests and stuff
- [ ] Also linting (eslint (code quality) & prettier (formatting)), automated build, svelte-check (typesafety)
- [x] Fixed page crashing because Crypto.randomUUID wasn't available in insecure contexts
- [x] Newer versions of MISP return object_id `null` for attributes without objects, which we accidentally grouped as object `null`
- [ ] Standard MISP Docker installations do not allow X-Requested-With header, so don't use it
