# Testfälle

Durch die Nutzung von Cypress als Browser-Automatisierungs-Tool
lassen sich komplexe Testszenarien mit simulierter Nutzerinteraktion einfach
darstellen und automatisiert testen.

Im Folgenden sind von uns implementierte Testszenarien kurz beschrieben.

## Pflichtenheft

Priorität war es für uns, die im Pflichtenheft festgelegten
Testfälle automatisiert überprüfen zu können.

Im Folgenden bezieht sich die Nummerierung der Testfälle auf deren äquivalente Nummerierung im Pflichtenheft.

Die ursprünglich im Pflichtenheft beschriebenen Testfälle
wurden dabei meist noch durch weitere Fälle zum gleichen
Grundszenario ergänzt oder in kleinere Teilfälle aufgeteilt.

### /T001/ Einloggen

**4 Testfälle**

Es wird überprüft, ob das Einloggen möglich ist und
der Nutzer richtig weiter geleitet wird.

### /T002/ Event hinzufügen

**5 Testfälle**

Es wird überprüft, ob neue Events hinzugefügt werden können
und der Erstellprozess abgebrochen werden kann.

### /T003/ Event veröffentlichen

**2 Testfälle**

Es wird überprüft, ob Events veröffentlicht werden können und
ihre Veröffentlichung zurückgenommen werden kann.

### /T004/ Tag zu Event hinzufügen

**3 Testfälle**

Es wird überprüft, ob Tags zu einem Event hinzugefügt und
entfernt werden können.

### /T005/ Referenz im Event-Graphen hinzufügen

**2 Testfälle**

Es wird überprüft, ob neue Referenzen (vom Objekt auf ein nicht referenziertes Attribut) im Event-Graphen hinzugefügt werden können
und ob nicht referenzierte Attribute vom Seitenmenü auf den Graphen gezogen und abgelegt (Drag & Drop) werden können.
Bei jeder Testausführung werden zufällige Werte zugewiesen.

### /T006/ Galaxy zu Event hinzufügen

**2 Testfälle**

Es wird überprüft, ob Galaxy Cluster zu einem Event
hinzugefügt unt entfernt werden können.

### /T007/ Attribut zu Event hinzufügen

### /T008/ Galaxy-Liste anzeigen

**1 Testfall**

Es wird überprüft, ob die Galaxy-Liste über die
Menüleiste erreichbar ist.

### /T009/ Ein Galaxy Cluster bearbeiten

**2 Testfälle**

Es wird überprüft, ob neue Galaxy Cluster erstellt werden
und erstellte Cluster bearbeitet werden können.

### /T010/ Tag hinzufügen

**3 Testfälle**

Es wird überprüft, ob neue Tags erstellt werden können
und ob die Erstellung abgebrochen werden kann.

### /T011/ Benutzer filtern

Dieser Testfall wird durch [Event-Filter](#Event-Filter) überdeckt.

### /T012/ Benutzer hinzufügen

**2 Testfälle**

Es wird überprüft, ob zur Nutzer-Erstellungsseite navigiert werden kann
und neue Nutzer erstellt werden können.

### /T013/ Benutzer bearbeiten

**2 Testfälle**

Es wird überprüft, ob bestehende Nutzer bearbeitet
und gelöscht werden können.

### /T014/ Authentifizierungsschlüssel hinzufügen

**3 Testfälle**

Es wird überprüft, ob zur Token-Erstellungsseite navigiert werden kann
und neue Authentifizierungsschlüssel erstellt werden können.

### /T015/ Remote Server hinzufügen

**3 Testfälle**

Es wird überprüft, ob zur Server-Erstellungsseite navigiert werden kann,
neue Remote Server erstellt und bestehende gelöscht werden können.

### /T016/ Workflow bearbeiten

**2 Testfälle**

Es wird überprüft, ob neue Module zu einem Workflow hinzugefügt werden
und neue Verbindungen zwischen Modulen erstellt werden können.

## Weitere Testfälle

Während des Testens ergaben sich auch einige weitere Testfälle.

### Event anzeigen

**2 Testfälle**

Es wird überprüft, ob Events über die Eingabe ihrer URL bzw. Navigation über die Event-Tabelle erreicht werden.

### Event bearbeiten

**5 Testfälle**

Es wird überprüft, ob Events bearbeitet werden können und der Bearbeitungsprozess abgebrochen werden kann.

### Event-Filter

**5 Testfälle**

Es wird überprüft, ob Event-Filter hinzugefügt und entfernt werden können.

### Einstellungen

**1 Testfall**

Es wird überprüft, ob das Theme gewechselt werden kann.
