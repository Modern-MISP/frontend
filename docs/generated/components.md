# Components

## Td

![UML Representation of Td](src/lib/components/modularTable/Td.svelte.svg)

### Props

#### href: `string | undefined`



### Slots

#### default

## Table

![UML Representation of Table](src/lib/components/modularTable/Table.svelte.svg)

### Slots

#### default

## Th

![UML Representation of Th](src/lib/components/modularTable/Th.svelte.svg)

### Props

#### value: `string`



#### icon: `string`



#### class: `string | undefined`



### Events

#### click: `MouseEvent`

## DynTable

![UML Representation of DynTable](src/lib/components/dynTable/DynTable.svelte.svg)

### Props

T extends readonly HeaderEntry\[]

#### header: `T`



#### data: `FlatUnion<MapNameToDisplayComp<T>>[]`



#### urlCb: `((id: string) => string | undefined) | undefined`



## Info

![UML Representation of Info](src/lib/components/info/Info.svelte.svg)

### Props

#### text: `string | undefined`



#### class: `string | undefined`



### Slots

#### default

## Pill

![UML Representation of Pill](src/lib/components/pill/Pill.svelte.svg)

### Props

#### label: `string | undefined`



#### text: `string | undefined`



#### icon: `string | undefined`



#### class: `string | undefined`



#### style: `string | undefined`



### Slots

#### default

## DistributionPill

![UML Representation of DistributionPill](src/lib/components/distributionPill/DistributionPill.svelte.svg)

### Props

#### distribution: `number | undefined`



## PillCollection

![UML Representation of PillCollection](src/lib/components/pill/PillCollection.svelte.svg)

### Props

#### pills: `{ label?: string | undefined; text?: string | undefined; icon?: string | undefined; class?: string | undefined; style?: string | undefined; }[]`



#### class: `string | undefined`



## Boolean

![UML Representation of Boolean](src/lib/components/boolean/Boolean.svelte.svg)

### Props

#### isTrue: `string | boolean | undefined`



#### class: `string | undefined`



## PillNavigation

![UML Representation of PillNavigation](src/lib/components/pillNavigation/PillNavigation.svelte.svg)

### Props

#### routes: `{ name: string; icon: string; href: string; }[] | undefined`



#### action: `string | undefined`



## Button

![UML Representation of Button](src/lib/components/button/Button.svelte.svg)

### Props

#### class: `string | undefined`



### Slots

#### default

### Events

#### click: `MouseEvent`

## Card

![UML Representation of Card](src/lib/components/card/Card.svelte.svg)

### Props

#### class: `string | undefined`



### Slots

#### default

## CardRow

![UML Representation of CardRow](src/lib/components/card/CardRow.svelte.svg)

### Props

#### class: `string | undefined`



### Slots

#### default

## Checkbox

![UML Representation of Checkbox](src/lib/components/checkbox/Checkbox.svelte.svg)

### Props

#### checked: `boolean`



### Events

#### change: `Event`

## DatePill

![UML Representation of DatePill](src/lib/components/pill/DatePill.svelte.svg)

### Props

#### date: `Date`



## Select

![UML Representation of Select](src/lib/components/form/Select.svelte.svg)

### Props

T extends string

#### options: `readonly { value: T; label: string; }[]`



#### value: `T`



## Input

![UML Representation of Input](src/lib/components/input/Input.svelte.svg)

### Props

#### placeholder: `string`



#### name: `string | undefined`



#### value: `string | undefined`



#### class: `string | undefined`



### Slots

#### icon

#### default

#### suffix

### Events

#### blur: `FocusEvent`

#### focus: `FocusEvent`

## TopMenu

![UML Representation of TopMenu](src/lib/components/menus/topmenu/TopMenu.svelte.svg)

### Props

#### mode: `"view" | "edit" | undefined`



#### isOpen: `boolean | undefined`



## SideMenuDivider

![UML Representation of SideMenuDivider](src/lib/components/menus/sidemenu/SideMenuDivider.svelte.svg)

### Props

#### class: `string | undefined`



## SideMenuEntry

![UML Representation of SideMenuEntry](src/lib/components/menus/sidemenu/SideMenuEntry.svelte.svg)

### Props

#### name: `string`



#### icon: `string`



#### href: `string`



#### active: `boolean | undefined`



#### isMenuOpen: `boolean | undefined`



#### children: `Route[] | undefined`



#### isChild: `boolean | undefined`



## SideMenu

![UML Representation of SideMenu](src/lib/components/menus/sidemenu/SideMenu.svelte.svg)

### Props

#### isOpen: `boolean | undefined`



#### routes: `Route[] | undefined`



#### activeRoute: `string | null | undefined`



### Slots

#### logo

#### default

## Layout

![UML Representation of Layout](src/lib/components/layout/Layout.svelte.svg)

### Props

#### routes: `{ name: string; icon: string; href: string; }[] | undefined`



#### currentRoute: `{ name: string; icon: string; href: string; }[] | undefined`



#### currentAction: `string | undefined`



### Slots

#### sideMenu

#### default

## SettingsEntry

![UML Representation of SettingsEntry](src/routes/settings/SettingsEntry.svelte.svg)

### Props

#### label: `string`



### Slots

#### default

## CustomNode

![UML Representation of CustomNode](src/routes/workflow/trigger/[id]/view/CustomNode.svelte.svg)

### Props

#### id: `string`



#### data: `any`



#### dragHandle: `string | undefined`



#### type: `string | undefined`



#### selected: `boolean | undefined`



#### isConnectable: `boolean | undefined`



#### zIndex: `number | undefined`



#### xPos: `number`



#### yPos: `number`



#### dragging: `boolean`



#### targetPosition: `Position | undefined`



#### sourcePosition: `Position | undefined`

