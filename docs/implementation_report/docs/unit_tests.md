# Tests

Da wir eine reine Frontend-Software entwickeln und daher wenige Schnittstellen für tatsächliche, testbare Programmlogik haben,
lassen sich auch klassische Unittests nur bedingt anwenden.

Aus diesem Grund haben wir uns dazu entschieden, als sinnvolle Alternative ein Storybook zu verwenden.

## Storybook

Ein Storybook bietet die Möglichkeit, alle Teilkomponenten des Frontends isoliert in sog. Stories darzustellen.
Stories ermöglichen es, das Aussehen und Verhalten einer Komponente manuell zu überprüfen.

Gleichzeitig dienen sie auch als Dokumentation für andere Entwickler.
Aus dem Storybook wird ersichtlich, aus welchen Teilen sich die Oberfläche zusammensetzt und wie diese - auch intern - funktionieren.

Als Werkzeug zum Generieren unseres Storybooks nutzen wir [Histoire](https://histoire.dev/).

## Unittests

An den Stellen, an denen es sinnvoll war, verwenden wir ergänzend
normale Unittests.

### Testsuite

Für unsere Unittests benutzen wir [Vitest](https://vitest.dev/).

### Überdeckung

Die Tests beschränken sich auf wenige, rein logische Funktionen,
für die kein aufwendiger DOM Mock notwendig war.

Somit gibt eine Unittestüberdeckung von ungefähr 10 %.

## Weiteres

Um Fehler so früh wie möglich zu bemerken,
haben wir neben Unittests außerdem
Linter, Type Checker und eine Überprüfung auf einheitliche Code-Formatierung
direkt in unsere CI/CD Pipeline integriert und vor jedem Merge auf
unseren Haupt-Entwicklungs-Branch erfolgreiche Jobs vorausgesetzt.
