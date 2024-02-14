# Unit Tests

Da wir eine reine Frontend-Software entwickeln und daher nicht viele Schnittstellen für tatsächliche, testbare Programmlogik haben,
lassen sich auch klassische Unit Tests nur bedingt anwenden.

Aus diesem Grund haben wir uns entschieden als sinnvolle Alternative ein Storybook zu verwenden.

## Storybook

Ein Storybook bietet die Möglichkeit alle Teilkomponenten des Frontends isoliert in sog. Stories dar zu stellen.
Stories ermöglichen es, das Aussehen und Verhalten einer Komponente manuell zu überprüfen.

Gleichzeitig dienen sie auch als Dokumentation für andere Entwickler.
Aus dem Storybook wird ersichtlich aus welchen Teilen sich die Oberfläche zusammensetzt und wie diese - auch intern - funktionieren.

Als Werkzeug zum Generieren unseres Storybooks nutzen wir [Histoire](https://histoire.dev/).
