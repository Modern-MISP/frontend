# Einleitung

In der Qualitätssicherungsphase haben wir verschiedene Tools eingesetzt, um kontinuierlich
die Qualität und Zuverlässigkeit unserer Software automatisiert sicherzustellen.

Hierbei haben wir vor allem auf End-zu-End-Testing mit [Cypress](https://www.cypress.io/) gesetzt,
um die Interaktion von Nutzern mit dem Frontend zu simulieren und mit erwarteten Ergebnissen zu vergleichen.

## Cypress

Cypress ist eine Browser-Automatisierungssoftware, die vor allem auf automatische Tests ausgelegt ist.
Mithilfe von [docker compose](https://docs.docker.com/compose/) und dem
[misp-docker](https://github.com/MISP/misp-docker)-Projekt haben wir damit eine Docker-Umgebung gebaut,
die reproduzierbar eine lokale Instanz von [MISP](https://github.com/MISP/MISP) mit bekannten Testdaten kreiert,
unser Frontend korrekt konfiguriert gegen diese Instanz aufsetzt, und auf dieser Instanz des Frontends
automatisierte Browser-Tests in Cypress ausführt.

Dieses Setup war sowohl lokal als auch in Continuous Integration sehr praktisch,
da dort für jeden Commit bzw. für jede offene Merge-Request direkt Integration-Tests reproduzierbar
automatisiert ausgeführt wurden.

Die Testergebnisse von Cypress sind mit dem [GitLab Unit Test Report](https://docs.gitlab.com/ee/ci/testing/unit_test_reports.html) Feature verknüpft, um direkt in der Merge Request-Übersicht zu sehen, ob und warum
einzelne Tests fehlschlugen.

Da Merge-Requests in unserem Repository außerdem nur gemerged werden dürfen,
wenn alle Jobs der Continuous Integration erfolgreich ausgeführt wurden,
konnten wir sicherstellen, dass unser Hauptentwicklungsbranch nur Code und Tests enthält,
die alle unsere Anforderungen erfüllen, und waren gezwungen, gefundene Bugs bei fehlschlagenden Tests
direkt zu verbessern, bevor die Tests in den Hauptentwicklungsbranch aufgenommen werden konnten.

## Weitere Tools

Neben End-to-End-Tests hatten wir weiterhin, wie auch schon in der Implementierungsphase,
weitere automatische Tests, die unter anderem auf Typsicherheit, Code-Formatierung und korrektes Kompilieren
prüfen.

Dabei haben wir folgende Werkzeuge verwendet:

### eslint

Allgemeiner JavaScript Linter, weist auf häufige Probleme im Code hin.
Ist im Repository per Continuous Integration (CI) mit dem
[GitLab Code Quality](https://docs.gitlab.com/ee/ci/testing/code_quality.html) Feature
verknüpft, um Code-Qualitätsfehler direkt in der Merge-Request-Übersicht zu sehen.
Schlägt bei schwerwiegenden Fehlern in CI fehl.

### prettier

Code-Formatierungs-Tool, das in der gesamten Codebase verwendet wird.
Schlägt in CI fehl, wenn abweichende Formatierung gefunden wird.

### svelte-check

Prüft, ob Svelte-Code sich korrekt an das erwartete Schema hält, und prüft Typfehler.
Schlägt bei gefunden Fehlern in CI fehl.

### Vite, Svelte & SvelteKit

Verwendet zur automatischen Kompilierung unserer Software.
Diese wird vom `dev`-Branch aus automatisch zu einer Test-Instanz deployed.
Schlägt bei Fehlern in CI fehl.

### vitest

JavaScript Unit Test Framework.
Ist im Repository per CI mit dem
[GitLab Unit Test Report](https://docs.gitlab.com/ee/ci/testing/unit_test_reports.html) Feature
verknüpft, um Testergebnisse direkt in der Merge-Request-Übersicht zu sehen.
Schlägt bei fehlgeschlagenen Tests in CI fehl.
