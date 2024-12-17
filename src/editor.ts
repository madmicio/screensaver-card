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
          Temperature Sensor Selector
        </h4>
        <div class="content">${this._renderSensorDropdown()}</div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:link"></ha-icon>
          Landing Page Input
        </h4>
        <div class="content">${this._renderLandingPageInput()}</div>
      </ha-expansion-panel>
    `;
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
          <select id="value_entity_select" class="select-item">
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

  _renderSensorDropdown() {
    // Filtra solo i sensori con device_class="temperature"
    const temperatureSensors = Object.keys(this.hass.states).filter(
      (entityId) => {
        const entity = this.hass.states[entityId];
        return (
          entityId.startsWith("sensor.") &&
          entity.attributes?.device_class === "temperature"
        );
      }
    );

    return html`
      <div class="select-container" style="margin-top: 2ch;">
        <div class="heading">Select Internal Temperature Sensor</div>
        <div style="display: flex; align-items: center;">
          <select id="internal_temperature_select" class="select-item">
            <option value="" ?selected=${!this._config?.internal_temperature}>
              -- Select a Temperature Sensor --
            </option>
            ${temperatureSensors.map(
              (entityId) => html`
                <option
                  value=${entityId}
                  ?selected=${this._config?.internal_temperature === entityId}
                >
                  ${entityId}
                </option>
              `
            )}
          </select>
          <ha-icon
            icon="mdi:check"
            style="cursor: pointer; margin-left: 1ch;"
            @click=${this._setInternalTemperatureSensor}
          ></ha-icon>
        </div>

        <!-- Visualizza l'entità selezionata con l'icona cestino -->
        ${this._config?.internal_temperature
          ? html`
              <div style="display: flex; align-items: center; margin-top: 1ch;">
                <span style="flex: 1;">
                  Selected:
                  <strong>${this._config.internal_temperature}</strong>
                </span>
                <ha-icon
                  icon="mdi:delete"
                  style="cursor: pointer;"
                  @click=${this._removeInternalTemperatureSensor}
                ></ha-icon>
              </div>
            `
          : ""}
      </div>
    `;
  }

  _removeInternalTemperatureSensor() {
    const { internal_temperature, ...newConfig } = this._config; // Rimuove la chiave internal_temperature
    this._config = newConfig;
    this._dispatchConfigUpdate();
  }

  _setInternalTemperatureSensor() {
    const selectElement = this.shadowRoot!.getElementById(
      "internal_temperature_select"
    ) as HTMLSelectElement;

    const selectedValue = selectElement.value;

    if (selectedValue) {
      this._config = {
        ...this._config,
        internal_temperature: selectedValue,
      };
    } else {
      // Rimuove la chiave se selezione vuota
      this._removeInternalTemperatureSensor();
    }

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
