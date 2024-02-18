# Ablauf und Verzögerungen im Zeitplan

In diesem Abschnitt wird der Verlauf der Phase analysiert.

### Ursprünglicher Plan

![original plan](originalGanttChart.svg)

### Tatsächlicher Verlauf

![latest plan](ganttChart.svg)

An einigen Stellen konnte unser Zeitplan leider nicht wie vorgesehen eingehalten werden.

Rote Balken symbolisieren, dass die entsprechende Aufgabe zum geplanten Zeitpunkt nicht vollständig abgeschlossen war.

![commit frequency](commit_frequency.png)

## Erste Phasenhälfte

Gerade in den ersten 1-2 Wochen kam die Implementierungsarbeit nur langsam in Gang.

### Planung

In der ersten Woche arbeiteten wir vor allem an der Entwurfspräsentation. Außerdem planten wir die Implementierungsphase.
In dieser Zeit entstand das ursprüngliche Gantt-Diagramm.

Da wir die grundlegende Projektstruktur und einzelne Teile der Funktionalität bereits in der Entwurfsphase umgesetzt hatten, lagen wir zu diesem Zeitpunkt noch recht gut im Zeitplan.

### Start der Implementierung

Die Verzögerungen am Anfang führten dazu,
dass sich auch der Beginn der darauffolgenden Aufgaben verzögerte.

#### View Mode

Bei den Seiten für den View Mode gab es keine größeren Probleme,
trotzdem dauerte die Implementierung länger als geplant.

#### Workflows

Bei den Workflows war es sehr zeitaufwendig,
sich in [SvelteFlow](https://svelteflow.dev/),
die von uns verwendete Bibliothek zur Realisierung des grafischen Editors,
einzuarbeiten.

## Zweite Phasenhälfte

### API Probleme

Besonders bei der Implementierung des Edit Mode und der Filter,
machten sich Probleme mit der MISP API bemerkbar.

Die unvollständige und teils falsche API Spezifikation, Fehlermeldungen mit geringfügiger Aussagekraft
und inkonsistentes Verhalten der API kosteten uns viel nicht eingeplante Zeit.

So mussten wir unter anderem API-Endpunkte "reverse-engineeren",
um sie richtig ansprechen zu können
und eigene Typen für deren Rückgabewerte definieren.

### Endspurt

In den letzten paar Tagen arbeiteten wir besonders viel, um das Projekt trotz knapper Frist zu beenden.
