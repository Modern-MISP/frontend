# Einleitung

In der Qualitätssicherungsphase haben wir verschiedene Tools eingesetzt, um kontinuierlich
automatisiert die Qualität und Zuverlässigkeit unserer Software sicherzustellen.

Hierbei haben wir vor allem auf End-zu-End-Testing mit [Cypress](https://www.cypress.io/) gesetzt,
um die Interaktion von Nutzern mit dem Frontend zu simulieren und mit erwarteten Ergebnissen zu vergleichen.

Cypress ist Browser-Automatisierungssoftware, die vor allem auf automatische Tests ausgelegt ist.
Mithilfe von [docker compose](https://docs.docker.com/compose/) und dem
[misp-docker](https://github.com/MISP/misp-docker)-Projekt haben wir damit eine Docker-Umgebung gebaut,
die reproduzierbar eine lokale Instanz von [MISP](https://github.com/MISP/MISP) mit bekannten Testdaten kreiert,
unser Frontend korrekt konfiguriert gegen diese Instanz aufsetzt, und auf dieser Instanz des Frontends
automatisierte Browser-Tests in Cypress ausführt.

Dieses Setup war sowohl lokal, als auch in Continuous Integration sehr praktisch,
da dort für jeden Commit bzw für jede offene Merge Request direkt Integration Tests reproduzierbar
automatisiert ausgeführt wurden.

Die Testergebnisse von Cypress sind mit dem [GitLab Unit Test Report](https://docs.gitlab.com/ee/ci/testing/unit_test_reports.html) Feature verknüpft, um direkt in der Merge Request-Übersicht zu sehen, ob und warum
einzelne Tests fehlschlugen.

Da Merge Requests in unserem Repository außerdem nur gemerged werden dürfen,
wenn alle Jobs der Continuous Integration erfolgreich ausgeführt wurden,
könnten wir sicherstellen, dass unser Hauptentwicklungsbranch nur Code und Tests enthält,
die alle unsere Anforderungen erfüllen, und waren gezwungen, gefundene Bugs bei fehlschlagenden Tests
direkt zu verbessern, bevor die Tests in den Hauptentwicklungsbranch aufgenommen werden können.

Neben End-to-End-Tests hatten wir weiterhin, wie auch schon in der Implementierungsphase,
weitere automatische Tests, die unter anderem Typsicherheit, Code-Formatierung und korrektes Kompilieren
prüfen.

Dabei haben wir folgende Werkzeuge verwendet:

`eslint`:
Allgemeiner JavaScript Linter, weißt auf häufige Probleme im Code hin.
Ist im Repository per Continuous Integration (CI) mit dem
[GitLab Code Quality](https://docs.gitlab.com/ee/ci/testing/code_quality.html) Feature
verknüpft, um Code-Qualitätsfehler direkt in der Merge Request-Übersicht zu sehen.
Schlägt bei schwerwiegenden Fehlern in CI fehl.

`prettier`:
Code-Formatierungs-Tool, das in der gesamten Codebase verwendet wird.
Schlägt in CI fehl, wenn abweichende Formatierung gefunden wird.

`svelte-check`:
Prüft, ob Svelte-Code sich korrekt an das erwartete Schema hält, und prüft Typfehler.
Schlägt bei gefunden Fehlern in CI fehl.

`vite build` (nutzt Svelte & SvelteKit):
Nutzt [Vite](https://vitejs.dev/) und [SvelteKit](https://kit.svelte.dev/), um das Projekt zu kompilieren.
Schlägt bei Fehlern in CI fehl.

`vitest`:
JavaScript Unit Test Framework.
Ist im Repository per CI mit dem
[GitLab Unit Test Report](https://docs.gitlab.com/ee/ci/testing/unit_test_reports.html) Feature
verknüpft, um Testergebnisse direkt in der Merge Request-Übersicht zu sehen.
Schlägt bei fehlgeschlagenen Tests in CI fehl.

---

Stuff I gotta write about (TODO):

- [x] General cypress setup
- [x] Automated CI e2e testing (if this ever ends up working)
- [x] Fixed workflow reactivity (now gets properly invalidated and reset on cancel): https://gitlab.kit.edu/kit/kit-cert/mmisp/frontend/-/merge_requests/141
- [ ] List test cases from pflichtenheft and how we tested them
- [ ] Additional e2e tests we implemented
- [x] Maybe talk more about unit tests and stuff
- [x] Also linting (eslint (code quality) & prettier (formatting)), automated build, svelte-check (typesafety)
- [x] Fixed page crashing because Crypto.randomUUID wasn't available in insecure contexts
- [x] Newer versions of MISP return object_id `null` for attributes without objects, which we accidentally grouped as object `null`
- [ ] Standard MISP Docker installations do not allow X-Requested-With header, so don't use it
