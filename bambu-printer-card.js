/*! Bambu Printer Card – Bambu Lab printer with its AMS units drawn as one picture, live values inside.
 *  Needs the ha-bambulab integration (https://github.com/greghesp/ha-bambulab).
 *  type: custom:bambu-printer-card
 *    device:  <device_id of the printer>      (pick it in the card editor)
 *    view:    printer | details               (picture  /  controls, filament list, value tiles)
 *    plug:    switch.xyz                      (optional smart plug of the printer)
 *    power:   sensor.xyz                      (optional power sensor)
 *    humidity_inverted: false                 (true if your AMS humidity index 5 means dry)
 *    language: auto | de | en
 *  MIT License
 */
(() => {
  const VERSION = '1.2.0-h2c';
  const TAG = 'bambu-printer-card';
  const DOMAIN = 'bambu_lab';

  const L = {
    de: {
      progress: 'Fortschritt', remaining: 'Restzeit', done: 'Fertig', layer: 'Schicht', nozzle: 'Düse', bed: 'Bett', bedLong: 'Druckbett', chamber: 'Kammer', chamberLong: 'Druckraum',
      fan: 'Lüfter', door: 'Tür', open: 'offen', closed: 'zu', empty: 'leer', emptyLong: 'Leer', unknownTray: 'Unbekannt / leer', active: 'aktiv', slot: 'Slot',
      error: '⚠ Drucker meldet einen Fehler – antippen für Details', offline: 'Drucker offline', off: 'aus', on: 'an', controls: 'Steuerung', pause: 'Pause', resume: 'Weiter', stop: 'Stopp',
      light: 'Licht', camera: 'Kamera', plug: 'Steckdose', filament: 'Filament', values: 'Werte', ext: 'Externe Spule', extShort: 'Ext.', holder: 'Halter', humidity: 'Feuchte',
      qPause: 'Druck pausieren?', aPause: 'Pausieren', qResume: 'Druck fortsetzen?', aResume: 'Fortsetzen', qStop: 'Druck wirklich abbrechen? Das lässt sich nicht rückgängig machen.', aStop: 'Druck abbrechen',
      qPlugOffPrint: 'Achtung, es läuft ein Druck! Steckdose trotzdem ausschalten?', qPlugOff: 'Steckdose des Druckers ausschalten?', qPlugOn: 'Steckdose des Druckers einschalten?', aOff: 'Ausschalten', aOn: 'Einschalten',
      confirm: 'Bitte bestätigen', cancel: 'Abbrechen', speedHint: 'Die Geschwindigkeit lässt sich nur während eines Drucks ändern.',
      speeds: { silent: 'Leise', standard: 'Standard', sport: 'Sport', ludicrous: 'Turbo' },
      actual: 'Ist', target: 'Ziel', temperature: 'Temperatur', partFan: 'Bauteil', auxFan: 'Zusatz', chamberFan: 'Druckraum', hotendFan: 'Hotend',
      job: 'Druckauftrag', speed: 'Tempo', start: 'Start', source: 'Quelle', state: 'Zustand', hms: 'HMS-Fehler', none: 'keine', yes: 'ja', no: 'nein', printError: 'Druckfehler',
      firmware: 'Firmware', update: 'Update da', current: 'aktuell', runtime: 'Laufzeit', connection: 'Verbindung', status: 'Status', online: 'online', offlineS: 'offline', wifi: 'WLAN', mode: 'Modus',
      power: 'Strom', powerW: 'Leistung', tomorrow: 'morgen', min: 'min', h: 'h', noDevice: 'Bitte im Karten-Editor einen Bambu-Lab-Drucker auswählen.', notFound: 'Für dieses Gerät wurden keine Entitäten der Bambu-Lab-Integration gefunden.',
      nozzleL: 'Düse L', nozzleR: 'Düse R', left: 'links', right: 'rechts', drying: 'Trocknung', dryingLeft: 'trocknet, Rest', bedLight: 'Bettlicht',
      hotends: 'Hotends', hotend: 'Hotend', mounted: 'eingesetzt', docked: 'im Rack', hEmpty: 'leer', usedTime: 'Laufzeit', hState: 'Zustand',
      nozzleTypes: { hardened_steel: 'Gehärteter Stahl', stainless_steel: 'Edelstahl', tungsten_carbide: 'Wolframcarbid', brass: 'Messing' },
      ed: { device: 'Drucker', view: 'Ansicht', vPrinter: 'Bild vom Drucker', vDetails: 'Steuerung, Filament und Werte', plug: 'Steckdose (optional)', power: 'Leistungs-Sensor (optional)', hum: 'Feuchte-Index umkehren (5 = trocken)', lang: 'Sprache', auto: 'Automatisch' },
    },
    en: {
      progress: 'Progress', remaining: 'Remaining', done: 'Done', layer: 'Layer', nozzle: 'Nozzle', bed: 'Bed', bedLong: 'Bed', chamber: 'Chamber', chamberLong: 'Chamber',
      fan: 'Fan', door: 'Door', open: 'open', closed: 'closed', empty: 'empty', emptyLong: 'Empty', unknownTray: 'Unknown / empty', active: 'active', slot: 'Slot',
      error: '⚠ The printer reports an error – tap for details', offline: 'Printer offline', off: 'off', on: 'on', controls: 'Controls', pause: 'Pause', resume: 'Resume', stop: 'Stop',
      light: 'Light', camera: 'Camera', plug: 'Plug', filament: 'Filament', values: 'Values', ext: 'External spool', extShort: 'Ext.', holder: 'Holder', humidity: 'Humidity',
      qPause: 'Pause the print?', aPause: 'Pause', qResume: 'Resume the print?', aResume: 'Resume', qStop: 'Really cancel the print? This cannot be undone.', aStop: 'Cancel print',
      qPlugOffPrint: 'A print is running! Switch the plug off anyway?', qPlugOff: 'Switch the printer plug off?', qPlugOn: 'Switch the printer plug on?', aOff: 'Switch off', aOn: 'Switch on',
      confirm: 'Please confirm', cancel: 'Cancel', speedHint: 'The speed can only be changed while printing.',
      speeds: { silent: 'Silent', standard: 'Standard', sport: 'Sport', ludicrous: 'Ludicrous' },
      actual: 'Actual', target: 'Target', temperature: 'Temperature', partFan: 'Part', auxFan: 'Aux', chamberFan: 'Chamber', hotendFan: 'Hotend',
      job: 'Print job', speed: 'Speed', start: 'Start', source: 'Source', state: 'Health', hms: 'HMS errors', none: 'none', yes: 'yes', no: 'no', printError: 'Print error',
      firmware: 'Firmware', update: 'update available', current: 'up to date', runtime: 'Run time', connection: 'Connection', status: 'Status', online: 'online', offlineS: 'offline', wifi: 'Wi-Fi', mode: 'Mode',
      power: 'Power', powerW: 'Power', tomorrow: 'tomorrow', min: 'min', h: 'h', noDevice: 'Please pick a Bambu Lab printer in the card editor.', notFound: 'No Bambu Lab entities were found for this device.',
      nozzleL: 'Nozzle L', nozzleR: 'Nozzle R', left: 'left', right: 'right', drying: 'Drying', dryingLeft: 'drying, left', bedLight: 'Bed light',
      hotends: 'Hotends', hotend: 'Hotend', mounted: 'mounted', docked: 'in rack', hEmpty: 'empty', usedTime: 'Used', hState: 'State',
      nozzleTypes: { hardened_steel: 'Hardened steel', stainless_steel: 'Stainless steel', tungsten_carbide: 'Tungsten carbide', brass: 'Brass' },
      ed: { device: 'Printer', view: 'View', vPrinter: 'Printer picture', vDetails: 'Controls, filament and values', plug: 'Smart plug (optional)', power: 'Power sensor (optional)', hum: 'Invert humidity index (5 = dry)', lang: 'Language', auto: 'Automatic' },
    },
  };

  const esc = (x) => String(x === undefined || x === null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const mix = (t, lo, hi) => { if (isNaN(t)) return '#6E8399'; const k = Math.max(0, Math.min(1, (t - lo) / (hi - lo))); const a = [79, 163, 247], b = [229, 72, 77]; return 'rgb(' + a.map((x, i) => Math.round(x + (b[i] - x) * k)).join(',') + ')'; };
  const STATUS_COLOR = { running: '#4FA3F7', prepare: '#F7AB3E', pause: '#F7AB3E', finish: '#4CC38A', failed: '#E5484D', idle: '#8AA0B6', init: '#8AA0B6', slicing: '#B98AF0', offline: '#4A5D70' };
  const HUM = ['#4CC38A', '#9BD35A', '#F7D04A', '#F7AB3E', '#E5484D'];
  const OPEN_FRAME = /^(P1P|A1)/i;

  const CSS = `
  :host{display:block}
  .karte{background:#0F1A26;border:1px solid #1F3247;border-radius:14px;overflow:hidden;color:#FFFFFF;font-family:Roboto,Arial,sans-serif;line-height:1.3}
  .pad{padding:14px 16px}
  .zeile{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
  .titel{font-size:18px;font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .chip{display:inline-block;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:700;color:#0F1A26;white-space:nowrap}
  .klein{font-size:12px;color:#9FB3C8}
  .bar{height:8px;border-radius:4px;background:#24384E;overflow:hidden;margin:10px 0 8px}
  .bar>div{height:100%;border-radius:4px}
  .werte{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:6px}
  .wert{background:#18293B;border:1px solid #24384E;border-radius:10px;padding:6px 8px;min-width:0}
  .wert b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .wert span{font-size:11px;color:#8AA0B6;font-weight:700}
  svg{display:block;width:100%;height:auto}
  svg text{font-family:Roboto,Arial,sans-serif}
  [data-act]{cursor:pointer}
  .th{animation:th 7s ease-in-out infinite}
  @keyframes th{0%,100%{transform:translateX(-78px)}50%{transform:translateX(78px)}}
  .puls{animation:puls 1.6s ease-in-out infinite}
  @keyframes puls{0%,100%{opacity:1}50%{opacity:.25}}
  .dreh{animation:dreh 1s linear infinite;transform-origin:50% 50%;display:inline-block}
  @keyframes dreh{to{transform:rotate(360deg)}}
  .knoepfe{display:flex;flex-wrap:wrap;gap:8px}
  .knopf{flex:1 1 90px;display:flex;align-items:center;justify-content:center;gap:6px;height:42px;border-radius:12px;border:1px solid #2B4560;background:#18293B;color:#FFFFFF;font:700 13px Roboto,Arial,sans-serif;cursor:pointer;white-space:nowrap;padding:0 10px}
  .knopf.an{background:#2B4560;border-color:#4FA3F7}
  .knopf.rot{border-color:#E5484D;color:#FF9EA1}
  .knopf[disabled]{opacity:.45;cursor:default}
  .knopf ha-icon{--mdc-icon-size:20px}
  .tempo{display:flex;gap:6px;margin-top:8px}
  .tempo .knopf{height:34px;font-size:12px;flex:1 1 60px}
  .gitter{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:10px}
  .kacheln{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(150px,100%),1fr));gap:10px}
  .kachel{background:#18293B;border:1px solid #24384E;border-radius:12px;overflow:hidden;min-width:0}
  .kachel>.streifen{height:5px}
  .kachel>.inhalt{padding:10px 12px}
  .kt{font-size:12px;font-weight:700;color:#8AA0B6;white-space:nowrap;display:flex;align-items:center;gap:6px}
  .kt ha-icon{--mdc-icon-size:16px}
  .kz{display:flex;justify-content:space-between;gap:8px;font-size:13px;margin-top:5px}
  .kz span:first-child{color:#9FB3C8}
  .kz span:last-child{font-weight:700;white-space:nowrap}
  .slot{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:8px 0;border-top:1px solid #24384E}
  .farbe{width:30px;height:30px;border-radius:50%;box-shadow:inset 0 0 0 2px rgba(255,255,255,.25)}
  .farbe.leer{background:transparent!important;box-shadow:none;border:1px dashed #4A5D70}
  .sn{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .rest{text-align:right;font-size:13px;font-weight:700;min-width:52px}
  .rest .mb{height:5px;border-radius:3px;background:#24384E;margin-top:4px;overflow:hidden}
  .rest .mb>div{height:100%;border-radius:3px}
  .ueber{font-size:13px;font-weight:700;color:#C9D6E3;margin:14px 0 8px;display:flex;align-items:center;gap:6px}
  .ueber:first-child{margin-top:0}
  `;

  // ---------- entity lookup (language independent: device + translation_key) ----------
  const SENSOR_KEYS = ['print_status', 'print_progress', 'remaining_time', 'end_time', 'current_layer', 'total_layers', 'subtask_name', 'stage', 'nozzle_temp', 'target_nozzle_temp',
    'bed_temp', 'target_bed_temp', 'chamber_temp', 'cooling_fan_speed', 'aux_fan_speed', 'chamber_fan_speed', 'heatbreak_fan_speed', 'speed_profile', 'nozzle_diameter', 'nozzle_type',
    'total_usage_hours', 'wifi_signal', 'mqtt_mode', 'active_tray', 'print_type', 'start_time'];

  function resolve(hass, deviceId) {
    const ents = Object.values(hass.entities || {});
    const devs = hass.devices || {};
    const map = (devId) => { const m = {}; ents.forEach((e) => { if (e.device_id === devId && e.translation_key) m[e.entity_id.split('.')[0] + ':' + e.translation_key] = e.entity_id; }); return m; };
    // Alle Entities eines Geraets mit gleichem Schluessel (neuere ha-bambulab: alle Faecher heissen 'tray')
    const all = (devId, key) => ents.filter((e) => e.device_id === devId && e.entity_id.split('.')[0] + ':' + e.translation_key === key).map((e) => e.entity_id);
    const num = (s) => { const x = Number(s); return isNaN(x) ? 99 : x; };
    const slotNr = (eid) => { const s = hass.states[eid]; const a = s ? s.attributes.slot : undefined; return a !== undefined ? num(a) : num((eid.match(/(\d+)$/) || [])[1]); };
    const p = map(deviceId);
    const children = Object.values(devs).filter((d) => d.via_device_id === deviceId);
    const nat = (d) => String(d.name_by_user || d.name || '');
    let nFull = 0, nHt = 0;
    const amsDevs = children.filter((d) => /AMS/i.test(d.model || '') || /_AMS_\d/i.test(d.name || ''))
      .sort((a, b) => nat(a).localeCompare(nat(b), undefined, { numeric: true }));
    const nHtAll = amsDevs.filter((d) => /\bHT\b/i.test(d.model || '')).length;
    const ams = amsDevs.map((d) => {
      const m = map(d.id);
      // Alte Integration: tray_1..tray_4; neue: 'tray' mit Attribut 'slot'
      let trays = [1, 2, 3, 4].map((n) => m['sensor:tray_' + n]).filter(Boolean);
      if (!trays.length) trays = all(d.id, 'sensor:tray').sort((a, b) => slotNr(a) - slotNr(b));
      const ht = /\bHT\b/i.test(d.model || '');
      // Anzeigename aus dem Modell: AMS HT bekommt keine fortlaufende Nummer der AMS-Reihe
      const label = ht ? 'AMS HT' + (nHtAll > 1 ? ' ' + (++nHt) : '') : 'AMS ' + (++nFull);
      return { label, ht, temp: m['sensor:ams_temp'], humIdx: m['sensor:humidity_index'], hum: m['sensor:humidity'], drying: m['binary_sensor:drying'], dryLeft: m['sensor:remaining_drying_time'], trays };
    }).filter((a) => a.trays.length);
    ams.forEach((a, i) => { a.nr = i + 1; });
    // Bis zu zwei externe Spulen (H2D/H2C: ExternalSpool, ExternalSpool2)
    const ext = children.filter((d) => /external/i.test(d.model || '') || /externalspool/i.test(d.name || ''))
      .sort((a, b) => nat(a).localeCompare(nat(b), undefined, { numeric: true }))
      .map((d) => map(d.id)['sensor:external_spool']).filter(Boolean);
    // Hotend-Rack: Hotends nach Attribut 'slot', Laufzeiten nach der Nummer im entity_id
    const rackDev = children.find((d) => /hotend ?rack/i.test(d.model || '') || /hotendrack/i.test(d.name || ''));
    let rack = null;
    if (rackDev) {
      const nrOf = (eid) => num((eid.match(/hotend_(\d+)/) || [])[1]);
      const used = {}; all(rackDev.id, 'sensor:hotend_rack_hotend_used_time').forEach((e) => { used[nrOf(e)] = e; });
      const hotends = all(rackDev.id, 'sensor:hotend_rack_hotend').sort((a, b) => slotNr(a) - slotNr(b))
        .map((e) => ({ e, used: used[nrOf(e)] }));
      if (hotends.length) rack = { hotends };
    }
    const dev = devs[deviceId] || {};
    return { p, ams, ext, rack, model: dev.model || '', name: dev.name_by_user || dev.name || '' };
  }

  class BambuPrinterCard extends HTMLElement {
    static getConfigElement() { return document.createElement(TAG + '-editor'); }
    static getStubConfig(hass) {
      const d = Object.values((hass && hass.devices) || {}).find((x) => !x.via_device_id && Object.values(hass.entities || {}).some((e) => e.device_id === x.id && e.platform === DOMAIN));
      return { device: d ? d.id : '', view: 'printer' };
    }
    setConfig(c) {
      if (!c) throw new Error('Invalid configuration');
      this._c = Object.assign({ view: 'printer', humidity_inverted: false, language: 'auto' }, c);
      if (this._c.teil) this._c.view = this._c.teil === 'details' ? 'details' : 'printer';
      this._key = ''; this._r = null; this._rKey = '';
      if (!this.shadowRoot) { this.attachShadow({ mode: 'open' }); this.shadowRoot.addEventListener('click', (ev) => this._click(ev)); }
      if (this._h) this._render();
    }
    getCardSize() { return this._c && this._c.view === 'details' ? 9 : 11; }
    getGridOptions() { return { columns: 'full', rows: 'auto' }; }
    set hass(h) {
      this._h = h;
      const rk = (this._c && this._c.device) + '|' + Object.keys(h.entities || {}).length + '|' + Object.keys(h.devices || {}).length;
      if (rk !== this._rKey) { this._rKey = rk; this._r = this._c && this._c.device ? resolve(h, this._c.device) : null; this._key = ''; }
      const k = this._ids().map((e) => { const s = h.states[e]; return s ? s.state + '@' + s.last_updated : '-'; }).join('|') + '|' + (h.locale && h.locale.language);
      if (k === this._key) return;
      this._key = k;
      this._render();
    }
    get _t() {
      let lang = this._c.language && this._c.language !== 'auto' ? this._c.language : ((this._h && ((this._h.locale && this._h.locale.language) || this._h.language)) || 'en');
      return L[String(lang).slice(0, 2)] || L.en;
    }
    _ids() {
      const r = this._r; if (!r) return [];
      const l = Object.values(r.p);
      r.ams.forEach((a) => { [a.temp, a.humIdx, a.hum, a.drying, a.dryLeft].forEach((x) => x && l.push(x)); l.push(...a.trays); });
      l.push(...r.ext);
      if (r.rack) r.rack.hotends.forEach((h) => { l.push(h.e); if (h.used) l.push(h.used); });
      if (this._c.plug) l.push(this._c.plug);
      if (this._c.power) l.push(this._c.power);
      return l;
    }
    _e(k) { return this._r && this._r.p[k]; }
    _S(e) { return e ? this._h.states[e] : undefined; }
    _st(e) { const s = this._S(e); return s ? String(s.state) : 'unavailable'; }
    _n(e) { const s = this._S(e); return s ? parseFloat(s.state) : NaN; }
    _tr(e) { const s = this._S(e); if (!s) return '--'; try { if (this._h.formatEntityState) return this._h.formatEntityState(s); } catch (x) { /* fallback */ } return String(s.state).replace(/_/g, ' '); }
    _fx(x, d) { return (isNaN(x) || x === null) ? '--' : Number(x).toLocaleString(this._t === L.de ? 'de-DE' : 'en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
    _int(x) { return isNaN(x) ? '--' : String(Math.round(x)); }
    // short: kompakte Form "3:18 h" fuer enge Stellen in der Zeichnung
    _dur(e, short) {
      let m = this._n(e); if (isNaN(m)) return '--';
      const u = ((this._S(e) || {}).attributes || {}).unit_of_measurement;
      if (u === 'h') m *= 60; else if (u === 's') m /= 60;
      m = Math.max(0, Math.round(m));
      if (short) return m >= 60 ? Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0') + ' h' : m + ' min';
      return m >= 60 ? Math.floor(m / 60) + ' h ' + String(m % 60).padStart(2, '0') + ' min' : m + ' min';
    }
    _clock(e) {
      const v = this._st(e); let d;
      const m = v.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?$/);
      if (!m) return '--';
      d = m[8] ? new Date(v.replace(' ', 'T')) : new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
      if (isNaN(d)) return '--';
      const t0 = new Date(); t0.setHours(0, 0, 0, 0);
      const d0 = new Date(d); d0.setHours(0, 0, 0, 0);
      const days = Math.round((d0 - t0) / 86400000);
      const hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
      return days === 0 ? hm : days === 1 ? this._t.tomorrow + ' ' + hm : String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '. ' + hm;
    }
    _tray(e) {
      const s = this._S(e); let at = s ? s.attributes : {};
      let c = String(at.color || '');
      const alpha = c.length === 9 ? parseInt(c.slice(7), 16) : 255;
      // '?' meldet die Integration fuer unbelegte externe Spulen
      if (at.type === '?') at = Object.assign({}, at, { type: '' });
      const unknown = !s || ['unknown', 'unavailable', '', '?'].includes(String(s.state)) || (!at.type && alpha === 0);
      const empty = !!at.empty || unknown;
      c = c.length >= 7 ? c.slice(0, 7) : '#888888';
      const rem = Number(at.remain);
      const remOk = !isNaN(rem) && rem >= 0 && !!at.tag_uid;
      return { e, c, empty, unknown, type: at.type || '', name: String(at.name || (s ? s.state : '')).replace(/^Bambu /, ''), rem: remOk ? Math.max(0, Math.min(100, rem)) : NaN, act: !!at.active, tmin: at.nozzle_temp_min, tmax: at.nozzle_temp_max };
    }
    _humColor(idx) { if (isNaN(idx) || idx < 1) return '#6E8399'; let i = Math.min(5, Math.max(1, Math.round(idx))) - 1; if (this._c.humidity_inverted) i = 4 - i; return HUM[i]; }
    _amsHum(a) {
      if (a.hum && !isNaN(this._n(a.hum))) { const v = this._n(a.hum); return { txt: this._int(v) + '%', col: v >= 50 ? '#E5484D' : v >= 40 ? '#F7AB3E' : v >= 30 ? '#F7D04A' : '#4CC38A', e: a.hum }; }
      const i = this._n(a.humIdx); return { txt: isNaN(i) ? '--' : this._int(i), col: this._humColor(i), e: a.humIdx };
    }
    // Trocknung laeuft? Liefert Restzeit-Text oder null
    _amsDry(a) {
      const on = a.drying ? this._st(a.drying) === 'on' : this._n(a.dryLeft) > 0;
      return on ? { txt: a.dryLeft ? this._dur(a.dryLeft) : '', short: a.dryLeft ? this._dur(a.dryLeft, true) : '', e: a.dryLeft || a.drying } : null;
    }
    // Zwei Duesen (H2D/H2C) oder eine
    _nozzles() {
      const E = (k) => this._e(k);
      const one = (cur, tgt, num, dia, typ, label) => ({ label, t: this._n(E(cur)), z: this._n(E(tgt)), e: E(num) || E(tgt) || E(cur), dia: E(dia), typ: E(typ) });
      if (E('sensor:left_nozzle_temp') && E('sensor:right_nozzle_temp')) {
        return [one('sensor:left_nozzle_temp', 'sensor:left_target_nozzle_temp', 'number:left_target_nozzle_temperature', 'sensor:left_nozzle_diameter', 'sensor:left_nozzle_type', this._t.nozzleL),
          one('sensor:right_nozzle_temp', 'sensor:right_target_nozzle_temp', 'number:right_target_nozzle_temperature', 'sensor:right_nozzle_diameter', 'sensor:right_nozzle_type', this._t.nozzleR)];
      }
      return [one('sensor:nozzle_temp', 'sensor:target_nozzle_temp', 'number:target_nozzle_temperature', 'sensor:nozzle_diameter', 'sensor:nozzle_type', this._t.nozzle)];
    }
    // Hotend aus dem Rack: Zustand mounted/docked/empty, Duese und Filament aus den Attributen
    _hotend(h) {
      const s = this._S(h.e), at = s ? s.attributes : {}, t = this._t;
      const st = s ? String(s.state) : 'unavailable';
      let c = String(at.color || ''); const alpha = c.length === 9 ? parseInt(c.slice(7), 16) : 255;
      c = c.length >= 7 && alpha > 0 ? c.slice(0, 7) : '';
      const fil = ['unknown', ''].includes(String(at.filament_name || '')) ? '' : String(at.filament_name).replace(/^Bambu /, '');
      const used = h.used ? this._n(h.used) : NaN;
      return { e: h.e, nr: at.slot, st, mounted: st === 'mounted', empty: st === 'empty' || st === 'unavailable', c, fil,
        typ: (t.nozzleTypes && t.nozzleTypes[at.nozzle_type]) || String(at.nozzle_type || '').replace(/_/g, ' '),
        dia: at.nozzle_diameter, used, usedE: h.used, ok: !at.status || at.status === 'normal', status: at.status,
        stTxt: st === 'mounted' ? t.mounted : st === 'docked' ? t.docked : st === 'empty' ? t.hEmpty : st };
    }
    _tempTxt(t, z) { return this._int(t) + (isNaN(z) || z <= 0 ? ' °C' : ' / ' + this._int(z) + ' °C'); }
    _status() {
      const e = this._e('sensor:print_status');
      const ds = this._st(e);
      const on = this._e('binary_sensor:online');
      const online = (on ? this._st(on) !== 'off' : true) && !['offline', 'unavailable'].includes(ds);
      const active = ['running', 'prepare', 'pause'].includes(ds);
      let prog = this._n(this._e('sensor:print_progress'));
      prog = (active || ds === 'finish') && !isNaN(prog) ? Math.max(0, Math.min(100, prog)) : 0;
      return { ds, online, active, prog, col: online ? (STATUS_COLOR[ds] || '#8AA0B6') : '#4A5D70', txt: online ? this._tr(e) : this._t.offline };
    }
    // ---------- actions ----------
    _click(ev) {
      const el = ev.composedPath().find((x) => x && x.dataset && x.dataset.act);
      if (!el || el.disabled) return;
      ev.stopPropagation();
      const d = el.dataset;
      if (d.act === 'info') { this.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: d.e } })); return; }
      if (d.act === 'svc') {
        const data = Object.assign({ entity_id: d.e }, d.data ? JSON.parse(d.data) : {});
        const go = () => this._h.callService(d.dom, d.svc, data);
        if (d.ask) this._ask(d.ask, d.yes).then((ok) => { if (ok) go(); }); else go();
      }
    }
    _ask(msg, yes) {
      const t = this._t;
      return new Promise((res) => {
        const o = document.createElement('div');
        o.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;font-family:Roboto,Arial,sans-serif';
        const bs = 'height:42px;padding:0 20px;border-radius:10px;font:700 15px Roboto,Arial,sans-serif;cursor:pointer;';
        o.innerHTML = `<div style="background:#18293B;border:1px solid #2B4560;border-radius:14px;padding:18px;width:calc(100% - 48px);max-width:340px;color:#FFFFFF;box-shadow:0 10px 30px rgba(0,0,0,0.5)"><div style="font-size:17px;font-weight:700;margin-bottom:8px">${esc(t.confirm)}</div><div style="font-size:15px;color:#C9D6E3;line-height:1.4">${esc(msg)}</div><div style="display:flex;gap:10px;justify-content:flex-end;margin-top:18px"><button data-a="0" style="${bs}background:#0F1A26;color:#FFFFFF;border:1px solid #2B4560">${esc(t.cancel)}</button><button data-a="1" style="${bs}background:#387DC5;color:#FFFFFF;border:none">${esc(yes || 'OK')}</button></div></div>`;
        const fin = (ok) => { o.remove(); res(ok); };
        o.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) fin(b.dataset.a === '1'); else if (e.target === o) fin(false); });
        document.body.appendChild(o);
      });
    }
    // ---------- render ----------
    _render() {
      if (!this._h || !this._c || !this.shadowRoot) return;
      let html;
      try {
        if (!this._c.device) html = `<div class="pad klein">${esc(this._t.noDevice)}</div>`;
        else if (!this._r || !this._e('sensor:print_status')) html = `<div class="pad klein">${esc(this._t.notFound)}</div>`;
        else html = this._c.view === 'details' ? this._details() : this._printer();
      } catch (x) { html = `<div class="pad">Bambu Printer Card: ${esc(x.message)}</div>`; }
      this.shadowRoot.innerHTML = `<style>${CSS}</style><div class="karte">${html}</div>`;
    }
    _pill(x, y, label, value, col, anchor, e) {
      const txt = label + ' ' + value; const w = Math.round(txt.length * 5.9 + 18); const x0 = anchor === 'end' ? x - w : x;
      return `<g${e ? ` data-act="info" data-e="${esc(e)}"` : ''}><rect x="${x0}" y="${y}" width="${w}" height="20" rx="10" fill="#0F1A26" fill-opacity="0.82" stroke="${col}" stroke-width="1.2"/><circle cx="${x0 + 10}" cy="${y + 10}" r="3.5" fill="${col}"/><text x="${x0 + 18}" y="${y + 14}" font-size="10.5" fill="#9FB3C8">${esc(label)} <tspan fill="#FFFFFF" font-weight="700">${esc(value)}</tspan></text></g>`;
    }
    _spool(cx, cy, tr, gap) {
      let s = `<g data-act="info" data-e="${esc(tr.e)}"><rect x="${cx - gap / 2 + 2}" y="${cy - 30}" width="${gap - 4}" height="68" fill="transparent"/>`;
      if (tr.empty) {
        s += `<circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="#4A5D70" stroke-width="1.5" stroke-dasharray="3 3"/><text x="${cx}" y="${cy + 4}" font-size="10" fill="#6E8399" text-anchor="middle">${tr.unknown && !tr.type ? '?' : esc(this._t.empty)}</text>`;
      } else {
        const C = 2 * Math.PI * 18.5, dash = isNaN(tr.rem) ? C : C * tr.rem / 100;
        const rc = isNaN(tr.rem) ? '#6E8399' : tr.rem <= 15 ? '#E5484D' : tr.rem <= 30 ? '#F7AB3E' : '#4CC38A';
        s += `<circle cx="${cx}" cy="${cy}" r="18.5" fill="none" stroke="#24303C" stroke-width="3"/>`
          + `<circle cx="${cx}" cy="${cy}" r="18.5" fill="none" stroke="${rc}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"${isNaN(tr.rem) ? ' stroke-opacity="0.35"' : ''}/>`
          + `<circle cx="${cx}" cy="${cy}" r="15" fill="${tr.c}"/><circle cx="${cx}" cy="${cy}" r="15" fill="url(#spuleG)"/>`
          + `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="5" fill="#1B2026" stroke="#5A6672" stroke-width="1.5"/>`;
        if (tr.act) s += `<circle class="puls" cx="${cx}" cy="${cy}" r="21.5" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>`;
      }
      return s;
    }
    _printer() {
      const t = this._t, E = (k) => this._e(k);
      const S = this._status();
      const job = this._st(E('sensor:subtask_name'));
      const model = this._r.model || 'Bambu Lab';
      const title = (S.active || S.ds === 'finish') && !['unknown', 'unavailable', ''].includes(job) ? job : 'Bambu Lab ' + model;
      const stage = this._st(E('sensor:stage'));
      const showStage = S.active && !['idle', 'printing', 'unknown', 'unavailable', 'offline'].includes(stage);
      const lay = this._n(E('sensor:current_layer')), layT = this._n(E('sensor:total_layers'));
      const noz = this._nozzles();
      const tB = this._n(E('sensor:bed_temp')), zB = this._n(E('sensor:target_bed_temp'));
      const tK = this._n(E('sensor:chamber_temp'));
      const fan = this._n(E('sensor:cooling_fan_speed'));
      const door = this._st(E('binary_sensor:door_open')) === 'on';
      const light = this._st(E('light:chamber_light')) === 'on';
      const err = this._st(E('binary_sensor:hms_errors')) === 'on' || this._st(E('binary_sensor:print_error')) === 'on';
      const enclosed = !OPEN_FRAME.test(model);
      const ph = ((Date.now() % 7000) / 1000).toFixed(2);
      // header
      let head = `<div class="pad"><div class="zeile"><div class="titel">${esc(title)}</div><span class="chip" style="background:${S.col}">${esc(S.txt)}</span></div>`;
      if (showStage) head += `<div class="klein" style="margin-top:4px">${esc(this._tr(E('sensor:stage')))}</div>`;
      if (err) head += `<div style="margin-top:6px;color:#FF9EA1;font-size:13px;font-weight:700" data-act="info" data-e="${esc(E('binary_sensor:hms_errors') || E('binary_sensor:print_error'))}">${esc(t.error)}</div>`;
      if (S.active || S.ds === 'finish') {
        head += `<div class="bar"><div style="width:${S.prog}%;background:${S.col}"></div></div><div class="werte">`
          + `<div class="wert" data-act="info" data-e="${esc(E('sensor:print_progress'))}"><span>${t.progress}</span><b>${this._int(S.prog)} %</b></div>`
          + `<div class="wert" data-act="info" data-e="${esc(E('sensor:remaining_time'))}"><span>${t.remaining}</span><b>${S.ds === 'finish' ? '–' : this._dur(E('sensor:remaining_time'))}</b></div>`
          + `<div class="wert" data-act="info" data-e="${esc(E('sensor:end_time'))}"><span>${t.done}</span><b>${S.ds === 'finish' ? '✓' : this._clock(E('sensor:end_time'))}</b></div>`
          + `<div class="wert" data-act="info" data-e="${esc(E('sensor:current_layer'))}"><span>${t.layer}</span><b>${this._int(lay)} / ${this._int(layT)}</b></div></div>`;
      }
      head += '</div>';
      // AMS-Reihen: hoechstens zwei normale AMS je Reihe, schmale AMS HT (1 Fach)
      // haengen sich an die Reihe an. Wird eine Reihe breiter als 400, waechst
      // die viewBox mit und der Drucker wird in der Mitte gezeichnet.
      const ams = this._r.ams;
      const rowsA = [];
      ams.filter((a) => !a.ht).forEach((a, i) => { if (i % 2 === 0) rowsA.push([]); rowsA[rowsA.length - 1].push(a); });
      ams.filter((a) => a.ht).forEach((a) => { if (!rowsA.length || rowsA[rowsA.length - 1].length >= 4) rowsA.push([]); rowsA[rowsA.length - 1].push(a); });
      const boxW = (a, row) => a.ht ? 104 : (row.length === 1 ? 220 : 184);
      const rowW = (row) => row.reduce((s, a) => s + boxW(a, row), 0) + 12 * (row.length - 1);
      const W = Math.max(400, ...rowsA.map((row) => rowW(row) + 20));
      const dx = (W - 400) / 2, cxP = W / 2;
      const top = rowsA.length * 124;
      let amsSvg = '', pipes = '', activeAms = 0, partColor = '';
      rowsA.forEach((row, ri) => {
        let x = (W - rowW(row)) / 2;
        row.forEach((a) => { a._x0 = x; a._w = boxW(a, row); a._y0 = 6 + ri * 124; x += a._w + 12; });
      });
      ams.forEach((a) => {
        const w = a._w, x0 = a._x0, y0 = a._y0, narrow = w < 150;
        const hu = this._amsHum(a), at = this._n(a.temp), dry = this._amsDry(a);
        const tempTxt = a.temp ? `<text x="${x0 + w - 12}" y="${y0 + (narrow ? 110 : 104)}" font-size="${narrow ? 11 : 12}" font-weight="700" fill="#FFFFFF" text-anchor="end" data-act="info" data-e="${esc(a.temp)}">${this._fx(at, narrow ? 0 : 1)} °C</text>` : '';
        const dryTxt = dry ? `<text x="${x0 + w - 12}" y="${y0 + (narrow ? 110 : 104)}" font-size="${narrow ? 11 : 12}" font-weight="700" fill="#F7AB3E" text-anchor="end" data-act="info" data-e="${esc(dry.e)}">♨ ${esc(dry.short)}</text>` : '';
        const hx = narrow ? x0 + 18 : x0 + w / 2 - 6, hy = y0 + (narrow ? 106 : 100);
        let g = `<rect x="${x0}" y="${y0}" width="${w}" height="118" rx="12" fill="url(#amsG)" stroke="${dry ? '#F7AB3E' : '#3A434D'}"/>`
          + `<rect x="${x0 + 8}" y="${y0 + 9}" width="${w - 16}" height="72" rx="9" fill="#0B1016" stroke="#2B3540"/>`
          + `<rect x="${x0 + 8}" y="${y0 + 9}" width="${w - 16}" height="18" rx="9" fill="#FFFFFF" fill-opacity="0.04"/>`
          + `<text x="${x0 + 12}" y="${y0 + (narrow ? 95 : 104)}" font-size="12" font-weight="700" fill="#C9D6E3">${esc(a.label)}</text>`
          + (hu.e ? `<g data-act="info" data-e="${esc(hu.e)}"><path d="M0,-7 C3,-3 5.5,-0.5 5.5,2.5 A5.5,5.5 0 0 1 -5.5,2.5 C-5.5,-0.5 -3,-3 0,-7Z" transform="translate(${hx},${hy})" fill="${hu.col}"/><text x="${hx + 9}" y="${hy + 4}" font-size="${narrow ? 11 : 12}" font-weight="700" fill="${hu.col}">${esc(hu.txt)}</text></g>` : '')
          + (dry ? dryTxt : tempTxt);
        const gap = (w - 16) / Math.max(narrow ? 1 : 4, a.trays.length);
        const off = (w - 16 - gap * a.trays.length) / 2;
        a.trays.forEach((e, i) => {
          const tr = this._tray(e);
          const cx = Math.round(x0 + 8 + off + gap / 2 + gap * i), cy = y0 + 41;
          if (tr.act) { activeAms = a.nr; partColor = tr.c; }
          g += this._spool(cx, cy, tr, gap)
            + `<text x="${cx}" y="${y0 + 75}" font-size="9.5" fill="${tr.act ? '#FFFFFF' : '#8AA0B6'}" text-anchor="middle" font-weight="${tr.act ? 700 : 400}">${i + 1} · ${tr.empty ? '–' : isNaN(tr.rem) ? '?' : this._int(tr.rem) + '%'}</text></g>`;
        });
        amsSvg += g;
        const xm = x0 + w / 2, ya = y0 + 118, act = a.nr === activeAms && S.active;
        pipes += `<path d="M${xm} ${ya} C${xm} ${top + 18} ${cxP} ${top + 10} ${cxP} ${top + 28}" fill="none" stroke="ACTIVE_${a.nr}" stroke-opacity="${act ? 1 : 0.28}" stroke-width="${act ? 3 : 2}"/>`;
      });
      const at = this._tray(E('sensor:active_tray'));
      const exts = this._r.ext.map((e) => this._tray(e));
      const extAct = exts.find((x) => x.act);
      if (!partColor && !at.empty) partColor = at.c;
      if (!partColor && extAct) partColor = extAct.c;
      if (!partColor) partColor = '#9AA6B2';
      pipes = pipes.replace(/ACTIVE_(\d+)/g, (m, n) => (Number(n) === activeAms && S.active ? partColor : '#C9D6E3'));
      // printer body (drawn at y = Y + ...)
      const Y = top + 26 - 150; // shift: original drawing starts at 150
      const yB = Math.round(268 + S.prog * 1.6);
      const bC = mix(tB, 25, 100), kC = mix(tK, 15, 60);
      const printing = S.ds === 'running';
      const part = (S.active || S.ds === 'finish') && S.prog > 0
        ? `<rect x="172" y="268" width="56" height="${yB - 268}" rx="2" fill="${partColor}"/><rect x="172" y="268" width="56" height="${yB - 268}" rx="2" fill="url(#schichtM)"/><rect x="172" y="268" width="56" height="${yB - 268}" rx="2" fill="url(#teilG)"/>`
        : '';
      // Duesenspitzen: eine mittig, oder zwei nebeneinander (links/rechts)
      const tips = (noz.length === 2 ? [190, 210] : [200]).map((x, i) => {
        const n = noz[i], c = mix(n.t, 40, 240), hw = noz.length === 2 ? 5 : 7;
        return `<path d="M${x - hw} 258 L${x + hw} 258 L${x + hw - 3} 266 L${x - hw + 3} 266 Z" fill="${c}"/>` + (n.t > 150 ? `<circle cx="${x}" cy="267" r="${noz.length === 2 ? 4 : 5}" fill="${c}" opacity="0.55"/>` : '');
      }).join('');
      const bedTarget = E('number:target_bed_temperature') || E('sensor:target_bed_temp');
      let pr = `<rect x="34" y="150" width="332" height="330" rx="14" fill="url(#rahmenG)" stroke="#3A434D"/>`
        + `<rect x="42" y="154" width="316" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.06"/>`
        + `<g data-act="info" data-e="${esc(E('sensor:print_progress'))}"><rect x="46" y="164" width="120" height="40" rx="5" fill="#070A0E" stroke="#4A5D70"/>`
        + (S.online
          ? `<text x="56" y="191" font-size="${S.active || S.ds === 'finish' ? 18 : 13}" font-weight="700" fill="${S.col}">${S.active || S.ds === 'finish' ? this._int(S.prog) + ' %' : esc(S.txt).slice(0, 14)}</text>`
            + (S.active ? `<text x="158" y="181" font-size="9" fill="#9FB3C8" text-anchor="end">${this._int(lay)}/${this._int(layT)}</text><text x="158" y="196" font-size="9" fill="#9FB3C8" text-anchor="end">${esc(this._dur(E('sensor:remaining_time')))}</text>` : '')
          : `<text x="56" y="190" font-size="13" fill="#4A5D70">${esc(t.off)}</text>`)
        + `</g>`
        + `<text x="352" y="183" font-size="13" font-weight="700" fill="#C9D6E3" text-anchor="end" letter-spacing="1">${esc(model)}</text>`
        + `<clipPath id="innen"><rect x="48" y="212" width="304" height="252" rx="8"/></clipPath>`
        + `<rect x="48" y="212" width="304" height="252" rx="8" fill="#0A0F14"/>`
        + `<g clip-path="url(#innen)">`
        + (light ? `<rect x="48" y="212" width="304" height="252" fill="url(#lichtG)"/>` : '')
        + `<rect x="66" y="232" width="6" height="236" fill="#2A3036"/><rect x="328" y="232" width="6" height="236" fill="#2A3036"/>`
        + part
        + `<rect x="74" y="${yB}" width="252" height="10" rx="2" fill="#39414A"/><rect x="80" y="${yB - 3}" width="240" height="4" rx="1" fill="#9AA3AB"/><rect x="66" y="${yB + 2}" width="14" height="6" fill="#4A535C"/><rect x="320" y="${yB + 2}" width="14" height="6" fill="#4A535C"/>`
        + `<rect x="54" y="230" width="292" height="8" rx="3" fill="#262B31" stroke="#3E464F"/>`
        + `<g ${printing ? `class="th" style="animation-delay:-${ph}s"` : ''}><rect x="179" y="220" width="42" height="38" rx="6" fill="#DDE3E8" stroke="#9AA6B2"/><rect x="184" y="227" width="32" height="5" rx="2" fill="#2A3036"/><circle cx="210" cy="246" r="5" fill="none" stroke="#7D8893" stroke-width="1.5"/>`
        + tips + `</g>`
        + `</g>`
        + (enclosed ? `<rect x="48" y="212" width="304" height="252" rx="8" fill="url(#glasG)" stroke="${door ? '#F7AB3E' : '#4A5D70'}" stroke-width="${door ? 2 : 1.2}"/><rect x="194" y="300" width="12" height="70" rx="3" fill="#FFFFFF" fill-opacity="0.05"/>` : `<rect x="48" y="212" width="304" height="252" rx="8" fill="none" stroke="#2B3540"/>`)
        + noz.map((n, i) => this._pill(56, 244 + i * 26, n.label, this._tempTxt(n.t, n.z), mix(n.t, 40, 240), 'start', n.e)).join('')
        + (E('sensor:chamber_temp') ? this._pill(344, 244, t.chamber, this._int(tK) + ' °C', kC, 'end', E('sensor:chamber_temp')) : '')
        + (fan > 0 ? this._pill(344, 270, t.fan, this._int(fan) + ' %', '#4FA3F7', 'end', E('fan:cooling_fan') || E('sensor:cooling_fan_speed')) : '')
        + this._pill(56, Math.min(Math.max(yB + 14, 244 + noz.length * 26), 438), t.bed, this._int(tB) + (isNaN(zB) || zB <= 0 ? ' °C' : ' / ' + this._int(zB) + ' °C'), bC, 'start', bedTarget)
        + (door ? this._pill(344, 438, t.door, t.open, '#F7AB3E', 'end', E('binary_sensor:door_open')) : '')
        + (E('light:chamber_light') ? `<g data-act="svc" data-dom="light" data-svc="toggle" data-e="${esc(E('light:chamber_light'))}"><circle cx="200" cy="186" r="13" fill="${light ? '#F7D04A' : '#18293B'}" stroke="${light ? '#F7D04A' : '#4A5D70'}"/><path d="M200 178 a5 5 0 0 1 3 9 v2 h-6 v-2 a5 5 0 0 1 3 -9z M197.5 191 h5 v2 h-5z" fill="${light ? '#0F1A26' : '#8AA0B6'}"/></g>` : '')
        + `<rect x="150" y="469" width="100" height="4" rx="2" fill="${S.col}"${printing ? ' class="puls"' : ''}/>`;
      // Externe Spulen: erste rechts am Drucker (wie bisher), zweite links.
      // Unbelegte Halter (leer und ohne Typ) werden nicht gezeichnet.
      exts.forEach((ext, i) => {
        if (ext.empty && !ext.type) return;
        const cx = i === 0 ? 383 : 17, lbl = exts.length > 1 ? t.extShort + ' ' + (i + 1) : t.extShort;
        pr += `<g data-act="info" data-e="${esc(ext.e)}"><circle cx="${cx}" cy="296" r="13" fill="${ext.c}"/><circle cx="${cx}" cy="296" r="13" fill="url(#spuleG)"/><circle cx="${cx}" cy="296" r="13" fill="none" stroke="#FFFFFF" stroke-opacity="0.28"/><circle cx="${cx}" cy="296" r="4.5" fill="#1B2026"/>`
          + (ext.act ? `<circle class="puls" cx="${cx}" cy="296" r="16.5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>` : '')
          + `<text x="${cx}" y="324" font-size="9" fill="#8AA0B6" text-anchor="middle">${esc(lbl)}</text></g>`;
      });
      // Hotend-Rack unter dem Drucker: Farbe = Filament des Hotends, das
      // eingesetzte erscheint als leerer gestrichelter Platz (es steckt im Druckkopf)
      let rackH = 0;
      if (this._r.rack) {
        const hs = this._r.rack.hotends.map((h) => this._hotend(h));
        rackH = 40;
        pr += `<text x="48" y="506" font-size="10" font-weight="700" fill="#8AA0B6">${esc(t.hotends)}</text>`;
        hs.forEach((h, i) => {
          const cx = Math.round(200 + (i - (hs.length - 1) / 2) * 32), cy = 502;
          pr += `<g data-act="info" data-e="${esc(h.e)}">`
            + (h.mounted || h.empty
              ? `<circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="${h.mounted ? '#4FA3F7' : '#4A5D70'}" stroke-width="1.5" stroke-dasharray="3 2"/>`
              : `<circle cx="${cx}" cy="${cy}" r="9" fill="${h.c || '#3A434D'}"/><circle cx="${cx}" cy="${cy}" r="9" fill="url(#spuleG)"/><circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="${h.ok ? '#FFFFFF' : '#E5484D'}" stroke-opacity="${h.ok ? 0.3 : 1}" stroke-width="${h.ok ? 1 : 2}"/>`)
            + (h.mounted ? `<path d="M${cx - 3} ${cy + 2} L${cx} ${cy - 3} L${cx + 3} ${cy + 2}" fill="none" stroke="#4FA3F7" stroke-width="1.5"/>` : '')
            + `<text x="${cx}" y="${cy + 21}" font-size="9" fill="${h.mounted ? '#FFFFFF' : '#8AA0B6'}" font-weight="${h.mounted ? 700 : 400}" text-anchor="middle">${esc(h.nr || i + 1)}${h.dia ? ' · ' + esc(h.dia) : ''}</text></g>`;
        });
      }
      const H = 492 + rackH + Y;
      const off = S.online ? '' : `<rect x="0" y="0" width="${W}" height="${H}" fill="#0F1A26" fill-opacity="0.55"/><text x="${cxP}" y="${340 + Y}" font-size="22" font-weight="700" fill="#8AA0B6" text-anchor="middle">${esc(t.offline)}</text>`;
      const defs = `<defs>
        <linearGradient id="amsG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#353C44"/><stop offset="1" stop-color="#20252B"/></linearGradient>
        <linearGradient id="rahmenG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2F35"/><stop offset="1" stop-color="#16191D"/></linearGradient>
        <linearGradient id="glasG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9FC7EE" stop-opacity="0.10"/><stop offset="0.45" stop-color="#9FC7EE" stop-opacity="0.02"/><stop offset="1" stop-color="#9FC7EE" stop-opacity="0.08"/></linearGradient>
        <radialGradient id="lichtG" cx="0.5" cy="0" r="0.9"><stop offset="0" stop-color="#FFE8B8" stop-opacity="0.32"/><stop offset="1" stop-color="#FFE8B8" stop-opacity="0"/></radialGradient>
        <radialGradient id="spuleG" cx="0.35" cy="0.3" r="0.75"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.35"/><stop offset="0.6" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.3"/></radialGradient>
        <linearGradient id="teilG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000000" stop-opacity="0.25"/><stop offset="0.4" stop-color="#FFFFFF" stop-opacity="0.12"/><stop offset="1" stop-color="#000000" stop-opacity="0.35"/></linearGradient>
        <pattern id="schichtM" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000000" fill-opacity="0.18"/></pattern>
      </defs>`;
      const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${defs}${pipes}${amsSvg}<g transform="translate(${dx} ${Y})">${pr}</g>${off}</svg>`;
      return head + `<div style="padding:0 10px 12px">${svg}</div>`;
    }
    _tile(title, icon, color, rows, e) {
      return `<div class="kachel"${e ? ` data-act="info" data-e="${esc(e)}"` : ''}><div class="streifen" style="background:${color}"></div><div class="inhalt"><div class="kt"><ha-icon icon="${icon}"></ha-icon>${esc(title)}</div>${rows.filter(Boolean).map((z) => `<div class="kz"><span>${esc(z[0])}</span><span${z[2] ? ` style="color:${z[2]}"` : ''}>${z[1]}</span></div>`).join('')}</div></div>`;
    }
    _details() {
      const t = this._t, E = (k) => this._e(k);
      const S = this._status();
      const ph = ((Date.now() % 1000) / 1000).toFixed(2);
      const btn = (txt, icon, dom, svc, e, o) => {
        o = o || {};
        if (!e) return '';
        return `<button class="knopf${o.on ? ' an' : ''}${o.red ? ' rot' : ''}" data-act="svc" data-dom="${dom}" data-svc="${svc}" data-e="${esc(e)}"${o.ask ? ` data-ask="${esc(o.ask)}" data-yes="${esc(o.yes || 'OK')}"` : ''}${o.data ? ` data-data="${esc(JSON.stringify(o.data))}"` : ''}${o.disabled ? ' disabled' : ''}><ha-icon icon="${icon}"></ha-icon>${esc(txt)}</button>`;
      };
      let h = `<div class="pad"><div class="ueber"><ha-icon icon="mdi:gesture-tap-button"></ha-icon>${t.controls}</div><div class="knoepfe">`;
      if (S.ds === 'running') h += btn(t.pause, 'mdi:pause', 'button', 'press', E('button:pause'), { ask: t.qPause, yes: t.aPause });
      if (S.ds === 'pause') h += btn(t.resume, 'mdi:play', 'button', 'press', E('button:resume'), { ask: t.qResume, yes: t.aResume });
      if (S.active) h += btn(t.stop, 'mdi:stop', 'button', 'press', E('button:stop'), { red: 1, ask: t.qStop, yes: t.aStop });
      const li = this._st(E('light:chamber_light')) === 'on';
      h += btn(t.light, li ? 'mdi:lightbulb-on' : 'mdi:lightbulb-outline', 'light', 'toggle', E('light:chamber_light'), { on: li });
      // H2D/H2C: zusaetzliches Licht am Heizbett
      const lb = this._st(E('light:heatbed_light')) === 'on';
      h += btn(t.bedLight, lb ? 'mdi:lightbulb-on' : 'mdi:lightbulb-outline', 'light', 'toggle', E('light:heatbed_light'), { on: lb });
      const ca = this._st(E('switch:camera')) === 'on';
      h += btn(t.camera, ca ? 'mdi:cctv' : 'mdi:cctv-off', 'switch', 'toggle', E('switch:camera'), { on: ca });
      if (this._c.plug && this._S(this._c.plug)) {
        const so = this._st(this._c.plug) === 'on';
        h += btn(t.plug, 'mdi:power-plug', this._c.plug.split('.')[0], so ? 'turn_off' : 'turn_on', this._c.plug, { on: so, red: so && S.active, ask: so ? (S.active ? t.qPlugOffPrint : t.qPlugOff) : t.qPlugOn, yes: so ? t.aOff : t.aOn });
      }
      h += `</div>`;
      const sel = this._S(E('select:printing_speed'));
      if (sel) {
        const opts = (sel.attributes.options || []).filter((o) => t.speeds[o]);
        h += `<div class="tempo">` + opts.map((o) => btn(t.speeds[o], '', 'select', 'select_option', sel.entity_id, { on: sel.state === o, data: { option: o }, disabled: !S.active }).replace('<ha-icon icon=""></ha-icon>', '')).join('') + `</div>`;
        if (!S.active) h += `<div class="klein" style="margin-top:4px">${esc(t.speedHint)}</div>`;
      }
      // filament
      const row = (tr, label) => {
        const rc = isNaN(tr.rem) ? '#6E8399' : tr.rem <= 15 ? '#E5484D' : tr.rem <= 30 ? '#F7AB3E' : '#4CC38A';
        const temp = tr.tmin && tr.tmax && Number(tr.tmax) > 0 ? ` · ${esc(tr.tmin)}–${esc(tr.tmax)} °C` : '';
        return `<div class="slot" data-act="info" data-e="${esc(tr.e)}"><div class="farbe${tr.empty ? ' leer' : ''}" style="background:${tr.c}${tr.act ? ';box-shadow:0 0 0 3px #0F1A26,0 0 0 5px #FFFFFF' : ''}"></div>`
          + `<div style="min-width:0"><div class="klein">${esc(label)}${tr.act ? ` · <b style="color:#FFFFFF">${t.active}</b>` : ''}</div><div class="sn">${tr.empty ? (tr.unknown ? t.unknownTray : t.emptyLong) : esc(tr.name)}</div><div class="klein">${esc(tr.type)}${temp}</div></div>`
          + `<div class="rest">${tr.empty ? '–' : isNaN(tr.rem) ? '?' : this._int(tr.rem) + ' %'}${tr.empty || isNaN(tr.rem) ? '' : `<div class="mb"><div style="width:${tr.rem}%;background:${rc}"></div></div>`}</div></div>`;
      };
      if (this._r.ams.length || this._r.ext.length) {
        h += `<div class="ueber"><ha-icon icon="mdi:tray-full"></ha-icon>${t.filament}</div><div class="gitter">`;
        this._r.ams.forEach((a) => {
          const hu = this._amsHum(a), dry = this._amsDry(a);
          h += `<div class="kachel"><div class="inhalt"><div class="zeile"><div style="font-size:15px;font-weight:700">${esc(a.label)}</div><div class="klein">`
            + (dry ? `<span data-act="info" data-e="${esc(dry.e)}" style="color:#F7AB3E;font-weight:700">♨ ${t.dryingLeft} ${esc(dry.txt)}</span> · ` : '')
            + (hu.e ? `<span data-act="info" data-e="${esc(hu.e)}" style="color:${hu.col};font-weight:700">💧 ${t.humidity} ${esc(hu.txt)}</span>` : '')
            + (a.temp ? ` · <span data-act="info" data-e="${esc(a.temp)}">${this._fx(this._n(a.temp), 1)} °C</span>` : '') + `</div></div>`;
          a.trays.forEach((e, i) => { h += row(this._tray(e), t.slot + ' ' + (i + 1)); });
          h += `</div></div>`;
        });
        if (this._r.ext.length) h += `<div class="kachel"><div class="inhalt"><div style="font-size:15px;font-weight:700">${t.ext}</div>${this._r.ext.map((e, i) => row(this._tray(e), t.holder + (this._r.ext.length > 1 ? ' ' + (i + 1) : ''))).join('')}</div></div>`;
        h += `</div>`;
      }
      // Hotend-Rack
      if (this._r.rack) {
        h += `<div class="ueber"><ha-icon icon="mdi:printer-3d-nozzle"></ha-icon>${t.hotends}</div><div class="kacheln">`;
        this._r.rack.hotends.forEach((x) => {
          const he = this._hotend(x);
          h += this._tile(t.hotend + ' ' + esc(he.nr || ''), he.mounted ? 'mdi:arrow-up-bold-circle' : 'mdi:printer-3d-nozzle-outline', he.c || '#4A5D70', [
            [t.hState, esc(he.stTxt), he.mounted ? '#4FA3F7' : ''],
            he.dia ? [t.nozzle, esc(he.dia) + ' mm'] : null,
            he.typ ? ['', esc(he.typ)] : null,
            he.fil ? [t.filament, esc(he.fil)] : null,
            isNaN(he.used) ? null : [t.usedTime, this._fx(he.used, 1) + ' h'],
            he.ok ? null : ['⚠', esc(he.status), '#FF9EA1'],
          ], he.e);
        });
        h += `</div>`;
      }
      // tiles
      const noz = this._nozzles();
      const tB = this._n(E('sensor:bed_temp')), zB = this._n(E('sensor:target_bed_temp'));
      const tK = this._n(E('sensor:chamber_temp'));
      const door = this._st(E('binary_sensor:door_open')) === 'on';
      const fanRow = (label, k) => { const e = E(k); if (!e) return null; const x = this._n(e); return [label, (x > 0 ? `<span class="dreh" style="animation-delay:-${ph}s">✻</span> ` : '') + this._int(x) + ' %']; };
      const hms = this._st(E('binary_sensor:hms_errors')) === 'on', pe = this._st(E('binary_sensor:print_error')) === 'on';
      const fw = this._st(E('binary_sensor:firmware_update')) === 'on';
      const on = this._st(E('binary_sensor:online')) === 'on';
      const hmsN = ((this._S(E('binary_sensor:hms_errors')) || {}).attributes || {}).Count;
      const wl = this._n(E('sensor:wifi_signal'));
      h += `<div class="ueber"><ha-icon icon="mdi:information-outline"></ha-icon>${t.values}</div><div class="kacheln">`;
      // Je Duese eine Kachel (H2D/H2C: links und rechts)
      noz.forEach((n) => {
        h += this._tile(n.label, 'mdi:printer-3d-nozzle-heat', mix(n.t, 40, 240), [[t.actual, this._int(n.t) + ' °C'], [t.target, isNaN(n.z) || n.z <= 0 ? t.off : this._int(n.z) + ' °C'], n.dia ? [t.nozzle, esc(this._st(n.dia)) + ' mm' + (n.typ ? ' · ' + esc(this._tr(n.typ)) : '')] : null], n.e);
      });
      h += this._tile(t.bedLong, 'mdi:radiator', mix(tB, 25, 100), [[t.actual, this._int(tB) + ' °C'], [t.target, isNaN(zB) || zB <= 0 ? t.off : this._int(zB) + ' °C']], E('number:target_bed_temperature') || E('sensor:bed_temp'));
      if (E('sensor:chamber_temp') || E('binary_sensor:door_open')) h += this._tile(t.chamberLong, 'mdi:thermometer', mix(tK, 15, 60), [E('sensor:chamber_temp') ? [t.temperature, this._int(tK) + ' °C'] : null, E('binary_sensor:door_open') ? [t.door, door ? t.open : t.closed, door ? '#F7AB3E' : ''] : null, E('light:chamber_light') ? [t.light, this._st(E('light:chamber_light')) === 'on' ? t.on : t.off] : null], E('sensor:chamber_temp'));
      h += this._tile(t.fan, 'mdi:fan', '#4FA3F7', [fanRow(t.partFan, 'sensor:cooling_fan_speed'), fanRow(t.auxFan, 'sensor:aux_fan_speed'), fanRow(t.chamberFan, 'sensor:chamber_fan_speed'), fanRow(t.hotendFan, 'sensor:heatbreak_fan_speed')], E('fan:cooling_fan'));
      h += this._tile(t.job, 'mdi:file-cad-box', '#B98AF0', [[t.speed, t.speeds[this._st(E('sensor:speed_profile'))] || esc(this._tr(E('sensor:speed_profile')))], [t.start, esc(this._clock(E('sensor:start_time')))], E('sensor:print_type') ? [t.source, esc(this._tr(E('sensor:print_type')))] : null], E('sensor:subtask_name'));
      h += this._tile(t.state, 'mdi:shield-check', hms || pe ? '#E5484D' : '#4CC38A', [[t.hms, hms ? (hmsN ? hmsN + ' ' + t.active : t.yes) : t.none, hms ? '#FF9EA1' : ''], [t.printError, pe ? t.yes : t.no, pe ? '#FF9EA1' : ''], E('binary_sensor:firmware_update') ? [t.firmware, fw ? t.update : t.current, fw ? '#F7AB3E' : ''] : null, E('sensor:total_usage_hours') ? [t.runtime, this._int(this._n(E('sensor:total_usage_hours'))) + ' h'] : null], E('binary_sensor:hms_errors'));
      h += this._tile(t.connection, 'mdi:wifi', on ? '#4CC38A' : '#4A5D70', [[t.status, on ? t.online : t.offlineS, on ? '' : '#FF9EA1'], E('sensor:wifi_signal') ? [t.wifi, this._int(wl) + ' dBm', wl < -75 ? '#F7AB3E' : ''] : null, E('sensor:mqtt_mode') ? [t.mode, esc(this._tr(E('sensor:mqtt_mode')))] : null], E('sensor:wifi_signal'));
      if (this._c.power && this._S(this._c.power)) {
        const p = this._n(this._c.power);
        h += this._tile(t.power, 'mdi:flash', '#F7AB3E', [[t.powerW, isNaN(p) ? '--' : this._int(p) + ' W'], this._c.plug && this._S(this._c.plug) ? [t.plug, this._st(this._c.plug) === 'on' ? t.on : t.off] : null], this._c.power);
      }
      h += `</div></div>`;
      return h;
    }
  }

  // ---------- visual editor ----------
  class BambuPrinterCardEditor extends HTMLElement {
    setConfig(c) { this._c = Object.assign({}, c); this._draw(); }
    set hass(h) { this._h = h; this._draw(); }
    _draw() {
      if (!this._h || !this._c) return;
      const lang = String((this._h.locale && this._h.locale.language) || 'en').slice(0, 2);
      const t = (L[lang] || L.en).ed;
      if (!this._f) {
        this._f = document.createElement('ha-form');
        this._f.computeLabel = (s) => ({ device: t.device, view: t.view, plug: t.plug, power: t.power, humidity_inverted: t.hum, language: t.lang })[s.name] || s.name;
        this._f.addEventListener('value-changed', (ev) => {
          this._c = Object.assign({}, this._c, ev.detail.value);
          this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._c }, bubbles: true, composed: true }));
        });
        this.appendChild(this._f);
      }
      this._f.hass = this._h;
      this._f.data = this._c;
      this._f.schema = [
        { name: 'device', required: true, selector: { device: { integration: DOMAIN } } },
        { name: 'view', selector: { select: { mode: 'dropdown', options: [{ value: 'printer', label: t.vPrinter }, { value: 'details', label: t.vDetails }] } } },
        { name: 'plug', selector: { entity: { domain: ['switch', 'light', 'input_boolean'] } } },
        { name: 'power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
        { name: 'humidity_inverted', selector: { boolean: {} } },
        { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t.auto }, { value: 'de', label: 'Deutsch' }, { value: 'en', label: 'English' }] } } },
      ];
    }
  }

  if (!customElements.get(TAG)) customElements.define(TAG, BambuPrinterCard);
  if (!customElements.get(TAG + '-editor')) customElements.define(TAG + '-editor', BambuPrinterCardEditor);
  window.customCards = window.customCards || [];
  if (!window.customCards.find((c) => c.type === TAG)) window.customCards.push({ type: TAG, name: 'Bambu Printer Card', description: 'Bambu Lab printer and AMS as one picture with live values', preview: false, documentationURL: 'https://github.com/ossilampe/bambu-printer-card' });
  console.info('%c BAMBU-PRINTER-CARD %c ' + VERSION, 'background:#4FA3F7;color:#0F1A26;font-weight:700', '');
})();
