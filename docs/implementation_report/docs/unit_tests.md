# Tests

Da wir eine reine Frontend-Software entwickeln und daher wenige Schnittstellen für tatsächliche, testbare Programmlogik haben,
lassen sich auch klassische Unit Tests nur bedingt anwenden.

Aus diesem Grund haben wir uns entschieden, als sinnvolle Alternative ein Storybook zu verwenden.

## Storybook

Ein Storybook bietet die Möglichkeit, alle Teilkomponenten des Frontends isoliert in sog. Stories darzustellen.
Stories ermöglichen es, das Aussehen und Verhalten einer Komponente manuell zu überprüfen.

Gleichzeitig dienen sie auch als Dokumentation für andere Entwickler.
Aus dem Storybook wird ersichtlich, aus welchen Teilen sich die Oberfläche zusammensetzt und wie diese - auch intern - funktionieren.

Als Werkzeug zum Generieren unseres Storybooks nutzen wir [Histoire](https://histoire.dev/).

## Unittests

An den Stellen, an denen es sinnvoll war, verwendeten wir ergänzend
normale Unittests.

### Test Suite

Für unsere Unit Tests benutzen wir [Vitest](https://vitest.dev/).

### Überdeckung

Die Tests beschränken sich auf wenige, rein logische Funktionen,
für die kein aufwendiger DOM Mock notwendig war.

Somit sind wir auf eine Unittestüberdeckung von knapp über 10 % gekommen.

## Weiteres

Um Fehler so früh wie möglich zu bemerken,
haben wir neben Unit Tests außerdem
Linter, Type Checker und eine Überprüfung auf einheitliche Code-Formatierung
direkt in unsere CI/CD Pipeline integriert und vor jedem Merge auf
unseren Haupt-Entwicklungs-Branch erfolgreiche Jobs vorausgesetzt.
