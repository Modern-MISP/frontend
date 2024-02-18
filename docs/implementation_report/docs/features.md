# Muss- und Wunschkriterien

Im Folgenden wird aufgeführt, inwiefern die im Pflichtenheft aufgeführten
Muss- und Wunschkriterien implementiert wurden.

## Musskriterien

In diesem Abschnitt werden Musskriterien besprochen, die **nicht**
oder nur teilweise implementiert werden konnten.

### Abhängigkeit von nicht-implementierten Wunschkriterien

Einige View Pages besitzen Kategorien, die eine Auswahl aus Rollen und/oder Organisationen fordern.
Eine Nutzerauswahl aus Rollen/ Organisationen ist nicht möglich. Zudem besitzen die dargestellten Werte der Kategorien 'Role' und 'Organization' keine Links.

#### Organisationen

Ohne vollständige Implementierung des Organisationssystems können Push/Pull-Rollen nicht unterstützt werden.

### Validierung Eingabewerte

Eine Validierung möglicher Eingabewerte wird bei UUIDs nicht durchgeführt.

### Typ eines Attributs

Der Typ eines Attributs kann beim Bearbeiten nicht abhängig von der ausgewählten Kategorie ausgewählt werden, sodass illegale Kategorie/ Typ-Kombinationen möglich sind. Beim Erstellen eines Attributs über den Erstelldialog ist eine legale Kombination jedoch gesichert.

### Abhängigkeit von API

Die MISP API verhält sich an vielen Stellen anders als spezifiziert
oder anderweitig inkonsistent.
In einigen Fällen weicht das tatsächliche Verhalten der API so von unseren Erwartungen ab, dass unsere geplanten Funktionen nicht umsetzbar waren.

#### Login

Die API liefert keinen Endpunkt für ein passwortbasiertes Anmelden, also kann Login nur über MISP-Token durchgeführt werden.

#### Tags

Die API liefert keinen Endpunkt, der die Anzahl getaggter Events oder Attribute zurückgibt.

#### Attribute

Die API liefert ausschließlich einen Endpunkt, um Tags eines Attributs darzustellen bzw. sie zu einem Attribut hinzuzufügen. Galaxies/Cluster müssten in diesem Fall als spezieller Tag erkannt und zu einer Galaxy geparst werden, was zeitlich nicht umsetzbar war.

##### Relations

Die API liefert keinen Endpunkt, der verwandte Events oder Tags anzeigt.

##### Sightings

Die API liefert keinen Endpunkt, der Sightings für Attribute anzeigt oder als false-positive erklärt.
Das Hinzufügen von Sightings wird jedoch unterstützt.

##### Enrichments

Die API liefert keinen Endpunkt für Enrichments.

##### Batch Import Flag

Die API liefert keinen Endpunkt für Batch Import Flags.

#### Galaxies

##### Synonyms

Die API liefert keinen Endpunkt für Synonyme.

##### Anzahl Events

Die API liefert keinen Endpunkt, der die Anzahl an Events, die die Galaxies oder Cluster benutzen, zurückgibt.

##### Anzahl Relations

Die API liefert keinen Endpunkt, der die Anzahl an Relations, die die Galaxies benutzen, zurückgibt.

##### Connector Tags

Die API liefert keinen Endpunkt für Connector Tags.

#### Workflows

##### Filter

Es existiert kein Endpunkt zum Filtern von Triggern und Modulen.

#### Taxonomie

Die Implementierung der Taxonomie war unerwartet komplex. In Abhängigkeit davon konnte auch eine Gruppierung von Tags, die diese Methodik benutzt, nicht implementiert werden.

#### Users

##### Filter

Es existiert kein dedizierter Endpunkt zum Filtern von Usern.
Zwar können Filter als Teil der URL mitgegeben werden, jedoch
erfordert dies eine spezielle Formatierung der Parameter, die
sich als ungeplanter Zusatzaufwand nicht mehr im Rahmen der Implementierungsphase umsetzen ließ.

##### E-Mail Publish

Die API liefert keinen Endpunkt, um 'E-Mail Publish' zu aktivieren/deaktivieren.

##### Org Admin

Die API liefert keinen Endpunkt, der alle Org-Admins zurückgibt.

##### Passwort überschreiben

Die API liefert keinen Endpunkt für Passworte, also kann das Passwort nicht überschrieben werden.

##### E-Mail Benachrichtigungen

Die API liefert keinen Endpunkt, der Benachrichtigungen nach Event verwalten kann.
Tägliche, wöchentliche und monatliche Benachrichtigungen werden jedoch unterstützt.

#### Remote Server

##### Auth Key

Die API gibt keinen Auth Key zurück.

##### Pull Sightings

Die API liefert keinen Endpunkt für Pull Sightings, stattdessen werden Push Sightings dargestellt.

##### Explore Event Graph

Die API liefert keinen Endpunkt, der auf Eventgraphen von aufgelisteten Servern verweist.

##### Priority

Die API liefert keine angemessene Unterstützung zur Anpassung der Priorität anderer Server, deshalb ist sie nicht bearbeitbar.

## Wunschkriterien

In diesem Abschnitt werden Wunschkriterien besprochen, die
zusätzlich zu den Musskriterien umgesetzt werden konnten.

### /F004/ MISP Token Auth

Es ist möglich, sich mit einem Auth Key anzumelden.

### /F022/ Wartungsmodus

Es ist möglich, einen Wartungsmodus zu aktivieren, in dem nicht auf den Edit Mode zugegriffen werden kann.
Dies wird dem Nutzer in Context Info angezeigt.
