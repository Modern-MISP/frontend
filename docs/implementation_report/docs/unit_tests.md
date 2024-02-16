# Tests

Da wir eine reine Frontend-Software entwickeln und daher nicht viele Schnittstellen für tatsächliche, testbare Programmlogik haben,
lassen sich auch klassische Unit Tests nur bedingt anwenden.

Aus diesem Grund haben wir uns entschieden als sinnvolle Alternative ein Storybook zu verwenden.

## Storybook

Ein Storybook bietet die Möglichkeit alle Teilkomponenten des Frontends isoliert in sog. Stories dar zu stellen.
Stories ermöglichen es, das Aussehen und Verhalten einer Komponente manuell zu überprüfen.

Gleichzeitig dienen sie auch als Dokumentation für andere Entwickler.
Aus dem Storybook wird ersichtlich aus welchen Teilen sich die Oberfläche zusammensetzt und wie diese - auch intern - funktionieren.

Als Werkzeug zum Generieren unseres Storybooks nutzen wir [Histoire](https://histoire.dev/).

## Unit Tests

An einigen Stellen, an denen es sinnvoll machbar war, haben wir ergänzend
auch noch normale unit tests verwendet.

### Test suite

Für unsere unit tests haben wir [Vitest](https://vitest.dev/) genutzt.

### Coverage

Die Tests beschränken sich auf wenige, rein logische Funktionen,
für die kein aufwändiger DOM mock notwendig war.

Somit sind wir auf eine unit test coverage von knapp über 10% gekommen.

## Weiteres

Um Fehler so frühzeitig wie möglich zu bemerken,
haben wir neben unit tests außerdem
linter, type checker, sowie Überprüfung auf Einheitliche Code-Formatierung
direkt in unsere CI/CD Pipeline integriert und vor jedem Merge auf
unseren Haupt-Entwicklungs-Branch erfolgreiche Jobs vorausgesetzt.
