# Behobene Bugs

Durch ausgiebiges manuelles und automatisiertes Testen im Rahmen
der Qualitätssicherungsphase, fanden wir einige Bugs in unserer
Software, die wir daraufhin behoben.


## Workflow Reaktivität

### Symptom

Beim Abbrechen des Bearbeitungsvorgans eines Workflows wurden die
Änderungen nicht zurückgesetzt.

Auch beim Speichern eines bearbeiteten Workflows wurde der interne Zustand
nicht richtig aktualisiert.

In beiden Fällen wurde anschließend im Edit Mode fälschlicherweise angezeigt,
dass nicht gespeicherte Änderungen vorhanden sind.

### Ursache

Nach dem Abbrechen oder Speichern werden alle `load` Funktionen neu
ausgeführt, um die Daten zu aktualisieren.

Diese Daten stehen innerhalb der Workflow Seite im `data` property
zur Verfügung, welche sich beim reload reaktiv aktualisiert.

Innerhalb der Seite wurde nicht konsequent beachtet,
dass sich die Daten ändern können.
So wurde `data` an einigen Stellen als konstante behandelt bzw.
einzelne Werte aus `data` an Konstanten gebunden,
wodurch die Reaktivität verloren ging.

### Behebung

Einige Konstanten wurden durch Variablen ersetzt.
Außerdem wurden reaktive Statements hinzugefügt,
die bei jedem neuen laden von `data` ausgeführt werden,
um aktiv die internen Daten neu zu initialisieren.
