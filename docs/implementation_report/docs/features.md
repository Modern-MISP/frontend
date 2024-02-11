# Muss- und Wunschkriterien

Im Folgenden wird aufgeführt, in wie fern die im Pflichtenheft aufgeführten
Muss- und Wunschkriterien implementiert wurden.

## Musskriterien

In diesem Abschnitt werden Musskriterien besprochen, die **nicht**
oder nur teilweise implementiert werden konnten.

### API Verschuldet

Die MISP API verhält sich an vielen Stellen anders als spezifiziert
oder anderweitig inkonsistent.
In einigen Fällen, weicht das tatsächliche Verhalten der API so von unseren Erwartungen ab, dass das mit geplanten Funktionen leider nicht vereinbar war.

#### Remote Server

Die API gibt keinen Auth key zurück.

#### Users

Es existiert kein dedizierter Endpunkt zum Filtern von Usern.
Zwar können Filter als Teil der URL mitgegeben werden, jedoch
erfordert dies eine spezielle Formatierung der Parameter, die
sich als ungeplanter Zusatzaufwand nicht mehr im Rahmen der Implementierungsphase umsetzen ließ.

## Wunschkriterien

In diesem Abschnitt werden Wunschkriterien besprochen, die
zusätzlich zu den Musskriterien umgesetzt werden konnten.
