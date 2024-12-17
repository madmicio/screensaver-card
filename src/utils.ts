// Controlla se lo stato dell'entità è "attivo"
export function isStateOn(entityState: any): boolean {
    if (!entityState) return false;
  
    const state = entityState.state.toLowerCase();
    const numericState = Number(state);
  
    const activeStringStates = [
      'on', 'open', 'opening', 'closing', 'cleaning', 'true', 'idle', 'home',
      'playing', 'paused', 'locked', 'occupied', 'available', 'running', 'active',
      'connected', 'online', 'mowing', 'starting', 'heat', 'cool', 'dry',
      'heat_cool', 'fan_only', 'auto', 'alarm'
    ];
  
    return activeStringStates.includes(state) || numericState > 0;
  }
  
  // Restituisce l'icona per una entità di tipo "cover"
  export function coverIcon(deviceClass: string): string {
    switch (deviceClass) {
      case 'awning': return "mdi:awning-outline";
      case 'blind': return "mdi:blinds-open";
      case 'curtain': return "mdi:curtains-open";
      case 'damper': return "mdi:window-shutter-open";
      case 'door': return "mdi:door-open";
      case 'garage': return "mdi:garage-open";
      case 'gate': return "mdi:gate-open";
      case 'shade': return "mdi:roller-shade";
      case 'shutter': return "mdi:window-shutter-open";
      case 'window': return "mdi:window-open";
      default: return "mdi:window-shutter-open";
    }
  }
  
  // Restituisce l'icona per una entità di tipo "binary_sensor"
  export function binarySensorIcon(deviceClass: string): string {
    switch (deviceClass) {
      case 'battery': return "mdi:battery-outline";
      case 'motion': return "mdi:motion-sensor";
      case 'door': return "mdi:door-open";
      case 'garage_door': return "mdi:garage-open";
      default: return "mdi:checkbox-marked-circle";
    }
  }
  
  // Restituisce l'icona per una entità di tipo "sensor"
  export function sensorIcon(deviceClass: string, state: number): string {
    switch (deviceClass) {
      case 'battery':
        if (state >= 90) return "mdi:battery";
        if (state >= 80) return "mdi:battery-90";
        if (state >= 70) return "mdi:battery-80";
        if (state >= 60) return "mdi:battery-70";
        if (state >= 50) return "mdi:battery-60";
        if (state >= 40) return "mdi:battery-50";
        if (state >= 30) return "mdi:battery-40";
        if (state >= 20) return "mdi:battery-30";
        if (state >= 10) return "mdi:battery-20";
        return "mdi:battery-alert";
      case 'humidity': return "mdi:water-percent";
      case 'temperature': return "mdi:thermometer";
      default: return "mdi:eye";
    }
  }
  
  // Recupera un attributo specifico di un'entità
  export function getEntityAttribute(hass: any, entity: string, attribute: string): string {
    const entityState = hass.states[entity];
    return entityState?.attributes?.[attribute] ?? '';
  }
  
  // Controlla se un'entità appartiene a un tipo specifico
  export function isEntityType(entity: string, entityType: string): boolean {
    return entity?.startsWith(entityType + ".") ?? false;
  }
  
  // Icone di default per entità generiche
  export const defaultIcons: { [key: string]: string } = {
    alarm_control_panel: 'mdi:shield',
    alert: "mdi:alert",
    automation: "mdi:playlist-play",
    calendar: "mdi:calendar",
    camera: "mdi:video",
    climate: "mdi:thermostat",
    device_tracker: "mdi:account",
    fan: "mdi:fan",
    light: "mdi:lightbulb",
    lock: 'mdi:lock',
    media_player: 'mdi:speaker',
    person: "mdi:account",
    plant: "mdi:flower",
    remote: "mdi:remote",
    scene: "mdi:palette",
    script: "mdi:file-document",
    switch: "mdi:flash",
    timer: "mdi:timer",
    vacuum: "mdi:robot-vacuum",
    weather: "mdi:white-balance-sunny",
    sun: "mdi:white-balance-sunny",
  };
  