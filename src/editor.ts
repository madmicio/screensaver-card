import { customElement, property, state } from "lit/decorators.js";
import { html, css, LitElement } from "lit";
import { EDITOR_CARD_TAG_NAME } from "./const";
import {
  coverIcon,
  binarySensorIcon,
  sensorIcon,
  getEntityAttribute,
  isEntityType,
  defaultIcons,
} from "./utils";

@customElement(EDITOR_CARD_TAG_NAME)
class ScreesaverEditor extends LitElement {
  @property({ attribute: false }) hass: any; // Oggetto Home Assistant
  @state() private _config: any; // Configurazione della card
  @state() private _valueEntities: string[] = []; // Stato per le entità value_entity

  setConfig(config: any) {
    this._config = config;
    this._valueEntities = config?.value_entity || [];
    this._entityIcons = config?.entity_icon || []; // Inizializza _entityIcons con i dati presenti in config
  }

  static get styles() {
    return css`
      .heading {
        font-weight: bold;
        margin-bottom: 1ch;
      }
  
      .select-container {
        display: flex;
        flex-direction: column;
        margin-top: 1ch;
        width: 100%;
      }
  
      ul {
        padding: 0;
        list-style: none;
      }
  
      li {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.5ch;
      }

      .val_sel {
       display: flex;
        // flex-direction: column;
        margin-bottom: 1.5ch;
      }
  
      ha-icon-picker {
        margin-top: 0.5ch;
      }
  
      ha-icon {
        cursor: pointer;
        margin-left: auto;
      }

      .select-item, .select-weather {
          height: 60px;
          border-radius: 16px;
          width: 80%;
      }
      .select-weather {
      margin-bottom: 10px;
      }

      ha-expansion-panel {
      margin-bottom: 10px;
      }

      ha-dialog .content .element-preview > * {
        transform: scale(0.5); /* Riduce il contenuto del 50% */
        transform-origin: top left; /* Punto di partenza della trasformazione */
        width: calc(100% / 0.5); /* Corregge la larghezza per evitare overflow */
        height: calc(100% / 0.5); /* Corregge l'altezza per evitare overflow */
        overflow: hidden; /* Nasconde il contenuto fuoriuscente */
      }
      
      .inputNumber{
        border-radius: 7px;
        height: 30px;
        width: 40px;
        text-align: center;
      }

    `;
  }

  render() {
    if (!this._config) {
      return html`<div class="heading">No configuration available</div>`;
    }
    return html`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>
          Weather Entity Selector
        </h4>
        <div class="content">${this._renderWeatherSelector()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:calendar"></ha-icon>
          Calendar Selector
        </h4>
        <div class="content">
          <div class="number-input-container">
            <label for="number-calendar-events">Number of Events in List:</label>
            <input class="inputNumber"
              id="number-calendar-events"
              type="number"
              min="1"
              value=${this._config.number_calendar_events || 5}
              @change=${this._updateNumberOfEvents}
            />
          </div>
          ${this._renderCalendarSelector()}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:playlist-plus"></ha-icon>
          Value Entity Selector
        </h4>
        <div class="content">${this._renderValueEntitySelector()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:palette"></ha-icon>
          Entity Icon Selector
        </h4>
        <div class="content">${this._renderEntityIconSelector()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:thermometer"></ha-icon>
          Internal Temperature Sensor Selector
        </h4>
        <div class="content">${this._renderSensorDropdowninternal()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:thermometer"></ha-icon>
          External Temperature Sensor Selector
        </h4>
        <div class="content">${this._renderSensorDropdownexternal()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:weather-pouring"></ha-icon>
          Local Rain Sensor Selector
        </h4>
        <div class="content">${this._renderSensorDropdownLocalRain()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:link"></ha-icon>
          Landing Page Input
        </h4>
        <div class="content">${this._renderLandingPageInput()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:check-box-outline"></ha-icon>
          Hide Bar Option
        </h4>
        <div class="content">
          ${this._renderHideBarCheckbox()}
        </div>
      </ha-expansion-panel>
    `;
  }

  private _renderHideBarCheckbox() {
    const isHidden = this._config.hide_bar ?? false;
  
    return html`
      <div class="checkbox-container">
        <ha-formfield label="Hide Bar">
          <ha-checkbox
            ?checked=${isHidden}
            @change=${this._toggleHideBar}
          ></ha-checkbox>
        </ha-formfield>
      </div>
    `;
  }

  private _toggleHideBar(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    this._config = {
      ...this._config,
      hide_bar: isChecked,
    };
  
    this._dispatchConfigUpdate();
  }

  private _updateNumberOfEvents(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
  
    if (value > 0) {
      this._config = {
        ...this._config,
        number_calendar_events: value,
      };
      this._dispatchConfigUpdate();
    }
  }
  

  private _renderCalendarSelector() {
    const calendarEntities = this._getCalendarEntities();

    return html`
      <div class="select-container">
        <div class="heading">Add Calendar</div>
        <div style="display: flex; align-items: center;">
          <select 
            id="calendar_select" 
            class="select-item"
          >
            <option value="">-- Select a Calendar --</option>
            ${calendarEntities.map(
              (entityId: string) =>
                html`<option value="${entityId}">${this.hass.states[entityId]?.attributes?.friendly_name || entityId}</option>`
            )}
          </select>
          <ha-icon
            icon="mdi:plus"
            @click=${this._addCalendar}
          ></ha-icon>
        </div>
        ${this._renderCalendarList()}
      </div>
    `;
  }

  private _renderCalendarList() {
    return html`
      <div style="margin-top: 1ch;">
        ${(this._config.calendars || []).length > 0
          ? html`
              <ul>
                ${(this._config.calendars || []).map(
                  (calendar: string) => html`
                    <div class="val_sel">
                      <span>${this.hass.states[calendar]?.attributes?.friendly_name || calendar}</span>
                      <ha-icon
                        icon="mdi:delete"
                        @click=${() => this._removeCalendar(calendar)}
                      ></ha-icon>
                    </div>
                  `
                )}
              </ul>
            `
          : html`<p>No calendars selected.</p>`}
      </div>
    `;
  }

  private _addCalendar() {
    const selectElement = this.shadowRoot!.getElementById(
      "calendar_select"
    ) as HTMLSelectElement;

    if (selectElement && selectElement.value) {
      const calendarId = selectElement.value;

      if (!this._config.calendars?.includes(calendarId)) {
        this._config = { 
          ...this._config, 
          calendars: [...(this._config.calendars || []), calendarId] 
        };
        this._dispatchConfigUpdate();
      }

      selectElement.value = ""; // Resetta il menu
    }
  }

  private _removeCalendar(calendarId: string) {
    const calendars = (this._config.calendars || []).filter(
      (calendar: string) => calendar !== calendarId
    );

    this._config = {
      ...this._config,
      calendars,
    };
    this._dispatchConfigUpdate();
  }

  private _getCalendarEntities(): string[] {
    return Object.keys(this.hass.states).filter((entityId: string) =>
      entityId.startsWith("calendar.")
    );
  }

  
  
  

  private _renderWeatherSelector() {
    const weatherEntities = this._getWeatherEntities();

    return html`
      <div class="select-container">
        <div class="heading">Select Weather Entity</div>
        <select @change=${this._updateWeatherEntity} class="select-weather">
          <option value="" ?selected=${!this._config?.entity}>
            -- Select an entity --
          </option>
          ${weatherEntities.map(
            (entity) =>
              html`<option
                value=${entity}
                ?selected=${this._config?.entity === entity}
              >
                ${entity}
              </option>`
          )}
        </select>
      </div>
    `;
  }

  private _renderValueEntitySelector() {
    const allEntities = Object.keys(this.hass.states); // Recupera tutte le entità disponibili

    return html`
      <div class="select-container">
        <div class="heading">Add Entities to value_entity</div>
        <div style="display: flex; align-items: center;">
          <select 
            id="value_entity_select" 
            class="select-item"
          >
            <option value="">-- Select an Entity --</option>
            ${allEntities.map(
              (entityId) =>
                html`<option value="${entityId}">${entityId}</option>`
            )}
          </select>
          <ha-icon
            icon="mdi:plus"
            @click=${this._addEntityToValueEntity}
          ></ha-icon>
        </div>
        ${this._renderValueEntityList()}
      </div>
    `;
  }

  private _renderValueEntityList() {
    return html`
      <div style="margin-top: 1ch;">
        ${this._valueEntities.length > 0
          ? html`
              <ul>
                ${this._valueEntities.map(
                  (entity) => html`
                    <div class="val_sel">
                      <span>${entity}</span>
                      <ha-icon
                        icon="mdi:delete"
                        @click=${() =>
                          this._removeEntityFromValueEntity(entity)}
                      ></ha-icon>
                    </div>
                  `
                )}
              </ul>
            `
          : html`<p>No entities selected.</p>`}
      </div>
    `;
  }

  private _getWeatherEntities(): string[] {
    return Object.keys(this.hass.states).filter((entityId) =>
      entityId.startsWith("weather.")
    );
  }

  private _updateWeatherEntity(event: Event) {
    const selectedEntity = (event.target as HTMLSelectElement).value;
    this._config = { ...this._config, entity: selectedEntity };
    this._dispatchConfigUpdate();
  }

  private _addEntityToValueEntity() {
    const selectElement = this.shadowRoot!.getElementById(
      "value_entity_select"
    ) as HTMLSelectElement;

    if (selectElement && selectElement.value) {
      const entityId = selectElement.value;

      if (!this._valueEntities.includes(entityId)) {
        this._valueEntities = [...this._valueEntities, entityId];
        this._config = { ...this._config, value_entity: this._valueEntities };
        this._dispatchConfigUpdate();
      }

      selectElement.value = ""; // Resetta il menu
    }
  }

  private _removeEntityFromValueEntity(entityId: string) {
    this._valueEntities = this._valueEntities.filter((id) => id !== entityId);
    this._config = { ...this._config, value_entity: this._valueEntities };
    this._dispatchConfigUpdate();
  }

  private _entityIcons: { entity: string; icon?: string }[] = []; // Stato locale per entity_icon

  _renderEntityIconSelector() {
    const allEntities = Object.keys(this.hass.states); // Lista di tutte le entità disponibili

    return html`
      <div class="select-container">
        <div class="heading">Add Entities for entity_icon</div>
        <div style="display: flex; align-items: center;">
          <select id="entity_icon_select" class="select-item">
            <option value="">-- Select an Entity --</option>
            ${allEntities.map(
              (entityId) => html`<option value=${entityId}>${entityId}</option>`
            )}
          </select>
          <ha-icon
            icon="mdi:plus"
            @click=${this._addEntityToEntityIcon}
          ></ha-icon>
        </div>
        ${this._renderEntityIconList()}
      </div>
    `;
  }

  _addEntityToEntityIcon() {
    const selectElement = this.shadowRoot!.getElementById(
      "entity_icon_select"
    ) as HTMLSelectElement;

    if (selectElement && selectElement.value) {
      const entityId = selectElement.value;

      // Verifica che l'entità non sia già presente
      if (!this._entityIcons.some((e) => e.entity === entityId)) {
        this._entityIcons = [...this._entityIcons, { entity: entityId }];
        this._updateEntityIconConfig();
      }

      selectElement.value = ""; // Resetta il menu
    }
  }

  _renderEntityIconList() {
    return html`
      <div style="margin-top: 1ch;">
        ${this._entityIcons.length > 0
          ? html`
              <ul>
                ${this._entityIcons.map((entityConfig, index) => {
                  const entityId = entityConfig.entity;
                  const customIcon = entityConfig.icon;

                  // Stato dell'entità da hass
                  const entityState = this.hass.states[entityId];

                  // Determina il tipo e il device_class
                  const entityType = entityId.split(".")[0];
                  const deviceClass = entityState?.attributes?.device_class;

                  // Icona finale da visualizzare
                  let icon;

                  if (customIcon) {
                    icon = customIcon;
                  } else if (isEntityType(entityId, "cover")) {
                    icon = coverIcon(deviceClass);
                  } else if (isEntityType(entityId, "binary_sensor")) {
                    icon = binarySensorIcon(deviceClass);
                  } else if (isEntityType(entityId, "sensor")) {
                    const state = Number(entityState?.state) || 0;
                    icon = sensorIcon(deviceClass, state);
                  } else {
                    icon =
                      defaultIcons[entityType] ||
                      getEntityAttribute(this.hass, entityId, "icon") ||
                      "mdi:eye";
                  }

                  return html`
                    <li>
                      <div style="display: flex; flex-direction: column;">
                        <!-- Nome entità -->
                        <div style="display: flex; align-items: center;">
                          <span>${entityId}</span>
                          <ha-icon
                            icon="mdi:delete"
                            style="margin-left: auto; cursor: pointer;"
                            @click=${() =>
                              this._removeEntityFromEntityIcon(index)}
                          ></ha-icon>
                        </div>

                        <!-- Icon Picker -->
                        <div class="icon-picker" style="margin-top: 0.5ch;">
                          <ha-icon-picker
                            label="Select an icon"
                            .value=${customIcon || icon}
                            @value-changed=${(e: CustomEvent) =>
                              this._updateEntityIcon(index, e.detail.value)}
                          ></ha-icon-picker>
                        </div>
                      </div>
                    </li>
                  `;
                })}
              </ul>
            `
          : html`<p>No entities added yet.</p>`}
      </div>
    `;
  }

  _removeEntityFromEntityIcon(index: number) {
    this._entityIcons = this._entityIcons.filter((_, i) => i !== index);
    this._updateEntityIconConfig();
  }

  _changeEntityIcon(index: number) {
    const customIcon = prompt("Enter the new icon (e.g., mdi:lightbulb):", "");
    if (customIcon) {
      const updatedIcons = [...this._entityIcons];
      updatedIcons[index] = { ...updatedIcons[index], icon: customIcon };
      this._entityIcons = updatedIcons;
      this._updateEntityIconConfig();
    }
  }

  _updateEntityIconConfig() {
    this._config = { ...this._config, entity_icon: this._entityIcons };
    this._dispatchConfigUpdate();
  }

  _dispatchConfigUpdate() {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _updateEntityIcon(index: number, newIcon: string) {
    const updatedIcons = [...this._entityIcons];
    updatedIcons[index] = { ...updatedIcons[index], icon: newIcon }; // Aggiorna l'icona
    this._entityIcons = updatedIcons;
    this._updateEntityIconConfig();
  }

 _renderSensorDropdowninternal() {
  const schema = [
    {
      name: "internal_temperature",
      label: "", // <-- così non mostra "internal_temperature"
      selector: {
        entity: { domain: "sensor" },
      },
    },
  ];

  const data = {
    internal_temperature: this._config?.internal_temperature ?? "",
  };

  return html`
    <div class="select-container" style="margin-top: 2ch;">
      <div class="heading">Select Internal Temperature Sensor</div>

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: any) => s.label ?? ""} 
        @value-changed=${this._onInternalTemperatureChanged}
      ></ha-form>

    </div>
  `;
}

private _onInternalTemperatureChanged(ev: CustomEvent) {
  const value = ev.detail.value?.internal_temperature as string;

  if (value) {
    // (opzionale ma consigliato) accetta solo sensori temperature veri
    const ent = this.hass.states[value];
    const isTemp = ent?.attributes?.device_class === "temperature";

    if (!isTemp) {
      this._removeInternalTemperatureSensor();
      return;
    }

    this._config = {
      ...this._config,
      internal_temperature: value,
    };
  } else {
    this._removeInternalTemperatureSensor();
  }

  this._dispatchConfigUpdate();
}

_removeInternalTemperatureSensor() {
  const { internal_temperature, ...newConfig } = this._config;
  this._config = newConfig;
  this._dispatchConfigUpdate();
}


  _renderSensorDropdownexternal() {
  const schema = [
    {
      name: "external_temperature",
      label: "",
      selector: { entity: { domain: "sensor" } },
    },
  ];


  const data = {
    external_temperature: this._config?.external_temperature ?? "",
  };

  return html`
    <div class="select-container" style="margin-top: 2ch;">
      <div class="heading">Select External Temperature Sensor</div>

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: any) => s.label ?? ""}  // <— NON usare fallback al name
        @value-changed=${this._onExternalTemperatureChanged}
      ></ha-form>
    </div>
  `;
}

private _onExternalTemperatureChanged(ev: CustomEvent) {
  const value = ev.detail.value?.external_temperature as string;

  if (value) {
    // (opzionale) Validazione: accetta solo device_class temperature
    const ent = this.hass.states[value];
    const isTemp = ent?.attributes?.device_class === "temperature";

    if (!isTemp) {
      // se scegli un sensore non-temperature, lo scartiamo
      this._removeExternalTemperatureSensor();
      return;
    }

    this._config = {
      ...this._config,
      external_temperature: value,
    };
  } else {
    this._removeExternalTemperatureSensor();
  }

  this._dispatchConfigUpdate();
}

_removeExternalTemperatureSensor() {
  const { external_temperature, ...newConfig } = this._config;
  this._config = newConfig;
  this._dispatchConfigUpdate();
}











_renderSensorDropdownLocalRain() {
  const schema = [
    {
      name: "rain_sensor",
      label: "",
      selector: { entity: { domain: "sensor" } },
    },
  ];

  const data = {
    rain_sensor: this._config?.rain_sensor ?? "",
  };

  return html`
    <div class="select-container" style="margin-top: 2ch;">
      <div class="heading">Select Local Rain Sensor</div>

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: any) => s.label ?? ""}  // <— NON usare fallback al name
        @value-changed=${this._onRainSensorChanged}
      ></ha-form>

      
    </div>
  `;
}

private _onRainSensorChanged(ev: CustomEvent) {
  const value = ev.detail.value?.rain_sensor as string;

  if (value) {
    this._config = { ...this._config, rain_sensor: value };
  } else {
    this._removeLocalRainSensor();
  }
  this._dispatchConfigUpdate();
}





  _removeLocalRainSensor() {
    const { rain_sensor, ...newConfig } = this._config; // Rimuove la chiave rain_sensor
    this._config = newConfig;
    this._dispatchConfigUpdate();
  }









































  _renderLandingPageInput() {
    return html`
      <div class="select-container" style="margin-top: 2ch;">
        <div class="heading">Set Landing Page</div>
        <div style="display: flex; align-items: center;">
          <input
            type="text"
            id="landing_page_input"
            placeholder="Enter landing page URL es.: /lovelace/0"
            .value=${this._config?.landing_page || ""}
            @input=${this._updateLandingPage}
            style="flex: 1; padding: 0.5ch; font-size: 1em; border: 1px solid var(--divider-color);"
          />
          <ha-icon
            icon="mdi:delete"
            style="cursor: pointer; margin-left: 1ch;"
            @click=${this._removeLandingPage}
          ></ha-icon>
        </div>

        ${this._config?.landing_page
          ? html`
              <div style="margin-top: 1ch;">
                Current: <strong>${this._config.landing_page}</strong>
              </div>
            `
          : ""}
      </div>
    `;
  }

  _updateLandingPage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this._config = {
      ...this._config,
      landing_page: value,
    };

    this._dispatchConfigUpdate();
  }

  _removeLandingPage() {
    const { landing_page, ...newConfig } = this._config; // Rimuove la chiave landing_page
    this._config = newConfig;

    this._dispatchConfigUpdate();

    // Pulisce visivamente l'input text
    const inputElement = this.shadowRoot!.getElementById(
      "landing_page_input"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  }
}
