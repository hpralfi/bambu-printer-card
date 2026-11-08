# Bambu Printer Card

A Home Assistant dashboard card that draws your **Bambu Lab printer together with its AMS units** as one picture – with the live values right inside it.
*Deutsch weiter unten.*

<img src="images/preview.jpg" alt="Bambu Printer Card" width="380">

- Printer drawing with progress, layer, remaining time and a toolhead that moves while printing
- Nozzle, bed and chamber temperature, part fan and door state shown inside the printer
- Up to 4 AMS units (2 per row) with every spool in its **real filament colour** and a ring for the remaining amount, active spool pulses
- AMS humidity and temperature, external spool
- Second view `details`: pause / resume / stop (with confirmation), light, camera, smart plug, print speed, filament list and value tiles
- Language independent: the card finds the entities through the **device** and their internal keys – renamed entities and any HA language work
- German and English texts, visual card editor

## Changes in this fork (1.3.0-h2c)

Fork of [ossilampe/bambu-printer-card](https://github.com/ossilampe/bambu-printer-card), adapted for the **H2C / H2D** and current ha-bambulab versions:

- AMS trays are found by the `tray` key plus the `slot` attribute (newer ha-bambulab); the old `tray_1…4` keys still work
- **AMS HT** gets its own label and a narrow one-spool box; up to two AMS plus AMS HT fit in one row (the drawing widens and scales)
- **Two nozzles** (left / right) in the toolhead, as pills in the picture and as separate value tiles
- **Two external spools** (Ext. 1 right, Ext. 2 left of the printer); unused holders are hidden
- **AMS drying** with remaining time, in the picture and the filament list
- Heatbed light button in the `details` view
- **Hotend rack** (H2C): row of hotends below the printer (filament colour, nozzle size, mounted one marked) and one tile per hotend in `details` (state, nozzle, filament, used time); `view: hotends` shows only these tiles

## Requirements

- [ha-bambulab](https://github.com/greghesp/ha-bambulab) integration with your printer set up
- Home Assistant 2024.1 or newer

## Installation

**HACS / Marketplace (recommended)**
1. HACS → ⋮ → *Custom repositories* → add `https://github.com/hpralfi/bambu-printer-card`, type **Dashboard**
   (Home Assistant 2026.11+: Settings → Marketplace → *Add from link*).
2. Install **Bambu Printer Card**, then reload the browser.

**Manual**
1. Copy `bambu-printer-card.js` to `/config/www/`.
2. Settings → Dashboards → ⋮ → Resources → add `/local/bambu-printer-card.js?v=1.3.0-h2c` as *JavaScript module*.

## Configuration

Add the card with the card picker (search for "Bambu") and choose your printer – or in YAML:

```yaml
type: custom:bambu-printer-card
device: 7f79ef3a9df715f4dc558d4b6ec4cb59   # device id of the printer (the editor fills it in)
view: printer                              # printer | details
```

A typical page uses both views plus the camera:

```yaml
- type: custom:bambu-printer-card
  device: <device id>
  view: printer
- type: picture-entity
  entity: camera.<printer>_camera
  camera_view: live
  show_name: false
  show_state: false
- type: custom:bambu-printer-card
  device: <device id>
  view: details
  plug: switch.printer_plug
  power: sensor.printer_plug_power
```

| Option | Default | Description |
|---|---|---|
| `device` | – | **Required.** Device id of the printer (pick it in the editor). |
| `view` | `printer` | `printer` = picture, `details` = controls, filament list and value tiles |
| `plug` | – | Smart plug of the printer (switch), shown as a button with confirmation |
| `power` | – | Power sensor of the plug |
| `humidity_inverted` | `false` | Set `true` if your AMS humidity index 5 means *dry* |
| `language` | `auto` | `auto`, `de` or `en` |

**Notes**
- Older integration versions only report an AMS *humidity index* (1–5). The card colours 1 green … 5 red. Newer versions report humidity in %, which is used automatically.
- Open-frame printers (P1P, A1, A1 mini) are drawn without the glass door.
- Tap any value to open its entity; temperatures open the target-temperature control.

---

# Deutsch

Eine Dashboard-Karte für Home Assistant, die deinen **Bambu-Lab-Drucker mit seinen AMS** als ein Bild zeigt – mit den Live-Werten direkt im Bild.

- Gezeichneter Drucker mit Fortschritt, Schicht, Restzeit; der Druckkopf fährt beim Drucken
- Düse, Bett, Kammer, Bauteillüfter und Tür direkt im Druckraum
- Bis zu 4 AMS (2 pro Reihe), jede Spule in ihrer **echten Filamentfarbe** mit Restmengen-Ring, aktive Spule pulsiert
- Feuchte und Temperatur je AMS, externe Spule
- Zweite Ansicht `details`: Pause / Weiter / Stopp (mit Rückfrage), Licht, Kamera, Steckdose, Druckgeschwindigkeit, Filamentliste und Kacheln
- Sprachunabhängig: Die Karte findet die Entitäten über das **Gerät** – umbenannte Entitäten und jede HA-Sprache funktionieren
- Deutsche und englische Texte, Karten-Editor

**Installation:** wie oben – in HACS dieses Repository als *Benutzerdefiniertes Repository* (Typ *Dashboard*) hinzufügen und installieren, ab HA 2026.11 unter Einstellungen → Marketplace → *Über Link hinzufügen*.

**Einrichten:** Karte über die Kartenauswahl („Bambu“) hinzufügen und den Drucker wählen. Optionen siehe Tabelle oben (`view: printer` = Bild, `view: details` = Steuerung und Werte).

## License

MIT
