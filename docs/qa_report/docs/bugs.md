# Behobene Bugs

Im Rahmen der Qualitätssicherungsphase fanden wir durch 
ausgiebiges manuelles und automatisiertes Testen einige Bugs in unserer
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

Nach dem Abbrechen oder Speichern werden alle `load`-Funktionen neu
ausgeführt, um die Daten zu aktualisieren.

Diese Daten stehen innerhalb der Workflow Seite im `data`-Property
zur Verfügung, welche sich beim Neuladen reaktiv aktualisiert.

Innerhalb der Seite wurde nicht konsequent beachtet,
dass sich die Daten ändern können.
So wurde `data` an einigen Stellen als Konstante behandelt bzw.
einzelne Werte aus `data` an Konstanten gebunden,
wodurch die Reaktivität verloren ging.

### Behebung

Einige Konstanten wurden durch Variablen ersetzt.
Außerdem wurden reaktive Statements hinzugefügt,
die bei jedem neuen Laden von `data` ausgeführt werden,
um aktiv die internen Daten neu zu initialisieren.

## Nutzung von `crypto.randomUUID`

### Symptom

In Situationen, in denen das MMISP Frontend ohne TLS, aber über eine andere Domain als `localhost`
ansgesprochen wurde, ist das Frontend auf bestimmten Seiten mit dem Fehler
`crypto.randomUUID is not a function` gecrasht.

### Ursache

Die Funktion `cypto.randomUUId`, die wir zum Generieren von zufälligen UUIDs für Seitenelemente genutzt haben,
ist nur in "Secure Contexts" wie beispielsweise einer HTTPS-Verbindung verfügbar.
Wenn das Frontend über HTTP angesprochen wird, ohne die Domain `localhost` zu verwenden (die auch als Secure Context zählt),
kann der Code nicht auf diese Funktion zugreifen und crasht.

### Behebung

Da wir `crypto.randomUUID` nur für zufällige IDs von Inputs genutzt haben und nicht in einem Kontext verwenden,
in dem kryptografische Sicherheit bei diesen IDs von Bedeutung ist, wurde `crypto.randomUUID` durch die
Funktion `v4` aus dem [npm-Package `uuid`](https://www.npmjs.com/package/uuid) ersetzt.
Somit kann das Frontend (vor allem zum Testen) auch in anderen Kontexten verwendet werden,
wobei eine TLS-basierte Verbindung natürlich immer empfohlen ist.

## User Reaktivität

### Symptom

Beim Speichern nach dem Bearbeiten eines Nutzers auf `/admin/users/[id]` wurden die aktuellen Werte
nicht automatisch angezeigt, sondern erfordern ein Neuladen der Seite, bis sie aktualisiert werden.

### Ursache

Wie bei [Workflow Reaktivität](#workflow-reaktivität) wurden die in der `data`-Property übergebenen Daten
nicht konsequent als reaktiv behandelt, sondern an Konstanten gebunden.
Somit ging die Reaktivität der Daten an diesen Stellen verloren, weshalb diese somit nicht automatisch
dynamisch im UI aktualisiert werden konnten.

### Behebung

Einige Konstanten wurden durch reaktive Variablen ersetzt.

## Gruppierung von Attributen in `Object: null`

### Symptom

Nach Aktualisierung des zum Testen genutzten `misp-docker` git Submoduls wurden Attribute, die keinem
Objekt zugehörig sind, visuell in der Liste zu einem Object mit Namen `null` zusammengruppiert.

### Ursache

Die durch das Submodule-Update leicht neuere Version von MISP hat bei Attributen ohne Objekt eine
`object_id` von `null`, anstatt wie davor `0` zurückgegeben.
Dieser Fall wurde von uns nicht erkannt, da nur `0` als gesonderter Wert behandelt wurde.

### Behebung

Um alle Versionen von MISP zu unterstützen, testen wir nun, ob `object_id` existiert (i.e. nicht `null` oder `undefined` ist), und ob sie nicht `0` ist, um zu entscheiden ob ein Attribut zu einem Objekt gehört.

## Fehlende Mode-Sperre bei direkter Navigation

### Symptom

Einige Seiten stehen nur im View Mode zur Verfügung
(z.B. default Galaxy Cluster).
Dort soll das Umschalten in den Edit Mode deaktiviert sein.

Beim direkten Aufruf einer solchen Seite im Browser,
d.h. nicht über Navigation innerhalb der Anwendung,
wurde der Edit Mode nicht gesperrt.

### Ursache

Es wurden an mehreren Stellen Bedingungen zum Sperren des Mode-Toggles
implementiert.
Auch bei nicht erfüllter Bedingung wurde der Zustand des Mode-Toggles
weiterhin reaktiv aktualisiert, wenn sich der Mode änderte.

Da beim direkten Aufruf der Seite der Mode neu initialisiert wird,
wird auch an allen Stellen der Mode-Toggle aktualisiert.
Dabei kommen sich die verschiedenen Stellen in die Quere
und überschreiben gegenseitig ihre Werte.

## Behebung

Nur erfüllte Bedingungen zum Sperren des Mode-Toggles
aktualisieren dessen Zustand bei Änderung des Modes.

Nicht erfüllte Bedingungen aktualisieren den Mode-Toggle nur jeweils
beim Wechsel von "erfüllt" auf "nicht erfüllt".
