import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, stateIcon } from 'custom-card-helpers';


@customElement('screensaver-card')
export class ScreensaverCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private config!: any;

  @state() private hourlyForecastEvent?: any;
  @state() private subscribedToHourlyForecast?: Promise<() => void>;

  private loadLocalFont(scriptDirectory: string, path: string) {
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'displayFont';
        src: url('${scriptDirectory}/local/BwModelica-HairlineExpanded.otf') format('truetype');
      }

     
    `;
    document.head.appendChild(style);

  }

  static weatherIconsDay = {
    clear: "day",
    "clear-night": "night",
    cloudy: "cloudy",
    fog: "fog",
    hail: "hail",
    lightning: "lightning",
    "lightning-rainy": "lightning-rainy",
    partlycloudy: "partlycloudy",
    pouring: "pouring",
    rainy: "rainy",
    snowy: "snowy",
    "snowy-rainy": "snowy-rainy",
    sunny: "day",
    windy: "windy",
    "windy-variant": "windy-variant",
    exceptional: "!!",
  };

  constructor() {
    super();
    const scriptPath = new URL(import.meta.url).pathname;
    const scriptDirectory = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
    this.loadLocalFont(scriptDirectory, scriptPath);
    console.log('Font path:', `${scriptDirectory}/DS-DIGII.TTF`);
}

  static get styles() {
    return css`
      ha-card {
        padding: 16px;
        background-color: black;
        margin: 0;
        height: 100vh;
        display: flex;
        // justify-content: center;
        // align-items: center;
        flex-direction: column;
      }
      h2 {
        margin-bottom: 8px;
      }
      .gradient-bar {
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, black, rgba(255, 255 ,255, 0.3), black);
        margin-bottom: 16px;
      }
      .timeline {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        overflow-x: auto;
        justify-content: space-between;
        // background-color: red;
        height: 12vh;
      }
      .timeline-item {
        flex: 0 0 auto;
        text-align: center;
        min-width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      .condition {
        height: 40%;
      }
      .condition img {
        width: 40px;
        height: 40px;
        margin-bottom: 8px;
      }
      .details {
        font-size: 0.9em;
        color: #757575;
      }
      .details .hour {
        font-weight: bold;
      }
      .details .temperature {
        color: #ff5722;
      }
      .details .temperature.cold {
        color: #2196f3; /* Blu */
      }
      .details .temperature.hot {
        color: #f44336; /* Rosso */
      }
      .details .precipitation {
      color: #9e9e9e; /* Grigio */
      font-size: 0.8em;
      }

      .main {
            position: relative;
            width: 100%;
            height: 88vh;
            background-color: black;
        }
        #date-time {
        position: absolute;
        bottom: 14%;
        left: 5%;
        font-family: displayFont, monospace; /* Usa un font monospaziato per numeri uniformi */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        /* Imposta una larghezza fissa */
        width: 67vh;
        }

        .time,
        .date {
          
          width: 100%;
          text-align: center;
          font-family: displayFont, monospace;

          
          line-height: 1;
        }


        .time {
          font-size: 13vw; 
          white-space: nowrap; 
        }


        .date {
          font-size: 4.5vw;
          white-space: nowrap; 
        }
        .box {
            position: absolute;

        }
       

        #box1 {
        bottom: 14.5%;
        right: 3%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 16px;
        color: var(--primary-text-color);

      }

      .entity {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 4px 8px;
        // background: var(--card-background-color);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: displayFont, monospace;
      }

      .friendly-name {
        font-weight: bold;
        display: flex;
        justify-content: flex-end;
      }
        .value {
        display: flex;
        font-size: 2vh;
        margin-top: 0.5vh;
        }

      .state {
        margin-left: auto;
        margin-right: 4px;
      }

      .unit {
        font-style: italic;
        color: var(--secondary-text-color);
      }
        // #time {
        //     background-color: red;
        //     top: 50%;
        //     left: 40%;
        }
        // #box3 {
        //     background-color: green;
        //     bottom: 10%;
        //     right: 10%;
        // }
        #box3 {
          top: 5%;
          left: 7%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap; /* Per andare a capo se ci sono molte icone */
          gap: 8px; /* Spazio tra le icone */
        }

        ha-icon {
          --mdc-icon-size: 4.5vh; /* Dimensione delle icone */
          color: var(--primary-text-color); /* Colore personalizzato */
        }

        .now-icon {
        width: 30vw;
        position: absolute;
        top: 1.5%;
        right: 3%;
        }
    `;
  }

  setConfig(config: any) {
    if (!config.entity) {
      throw new Error('Invalid configuration');
    }
    this.config = config;
  }

  getCardSize() {
    return 15;
  }

  private async subscribeToHourlyForecast() {
    this.unsubscribeHourlyForecast();
    if (
      !this.isConnected ||
      !this.hass ||
      !this.config ||
      !this.config.entity ||
      !this.hassSupportsForecastEvents() ||
      !this.config.entity.startsWith('weather.')
    ) {
      return;
    }

    this.subscribedToHourlyForecast = this.hass.connection.subscribeMessage(
      (evt: any) => (this.hourlyForecastEvent = evt),
      {
        type: 'weather/subscribe_forecast',
        forecast_type: 'hourly',
        entity_id: this.config.entity,
      }
    );
  }

 

  private unsubscribeHourlyForecast() {
    if (this.subscribedToHourlyForecast) {
      this.subscribedToHourlyForecast.then((unsub) => unsub());
      this.subscribedToHourlyForecast = undefined;
    }
  }

  private hassSupportsForecastEvents(): boolean {
    return !!this.hass?.services?.weather?.get_forecasts;
  }

  private getHourlyForecast() {
    const forecast = this.hourlyForecastEvent?.forecast;
    return forecast ?? [];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.subscribeToHourlyForecast();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeHourlyForecast();
  }

  render() {
    const hourlyForecast = this.getHourlyForecast();
    const limitedForecast = hourlyForecast.slice(0, 16); // Prendi i primi 12 elementi
    let previousCondition = ''; // Variabile per tenere traccia della condizione precedente
    const currentHour = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // Ottieni la lingua configurata in Home Assistant o usa 'en-US' come fallback
    const language = this.hass?.locale?.language || 'en-US';

    // Ottieni i componenti della data
    const now = new Date();
    const dayName = now.toLocaleDateString(language, { weekday: 'short' }); // Giorno della settimana
    const day = now.toLocaleDateString(language, { day: '2-digit' });       // Giorno
    const month = now.toLocaleDateString(language, { month: '2-digit' });   // Mese
    const year = now.toLocaleDateString(language, { year: '2-digit' });     // Anno

    // Combina i componenti con il separatore ` : `
    const formattedDate = `${dayName} : ${day} : ${month} : ${year}`;
    const entityIcons = this.config?.entity_icon || [];
    const valueEntities = this.config?.value_entity || [];

    return html`
      <ha-card>
        <div class="main">




<div class="now-icon">
<svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 480 345" style="enable-background:new 0 0 480 345;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFBF1F;}
	.st1{fill:#FFFFFF;}
</style>
<g id="partialy-cloud">
	<g>
		<g>
			<path class="st0" d="M61.11,81.08c9.09,6.9,18.17,13.8,27.26,20.71c1.3,0.99,2.6,1.98,3.9,2.96c1.29,0.98,3.36,0.2,4.1-1.08
				c0.9-1.54,0.22-3.12-1.08-4.1c-9.09-6.9-18.17-13.8-27.26-20.71c-1.3-0.99-2.6-1.98-3.9-2.96c-1.29-0.98-3.36-0.2-4.1,1.08
				C59.13,78.52,59.81,80.1,61.11,81.08L61.11,81.08z"/>
		</g>
	</g>
	<g>
		<g>
			<path class="st0" d="M139.15,32.91c1.55,11.31,3.09,22.61,4.64,33.92c0.22,1.62,0.44,3.24,0.66,4.86
				c0.22,1.61,2.28,2.48,3.69,2.1c1.73-0.48,2.32-2.08,2.1-3.69c-1.55-11.31-3.09-22.61-4.64-33.92c-0.22-1.62-0.44-3.24-0.66-4.86
				c-0.22-1.61-2.28-2.48-3.69-2.1C139.51,29.7,138.93,31.3,139.15,32.91L139.15,32.91z"/>
		</g>
	</g>
	<g>
		<g>
			<path class="st0" d="M106.71,214.18c-6.9,9.09-13.8,18.17-20.71,27.26c-0.99,1.3-1.98,2.6-2.96,3.9c-0.98,1.29-0.2,3.36,1.08,4.1
				c1.54,0.9,3.12,0.22,4.1-1.08c6.9-9.09,13.8-18.17,20.71-27.26c0.99-1.3,1.98-2.6,2.96-3.9c0.98-1.29,0.2-3.36-1.08-4.1
				C109.28,212.2,107.7,212.89,106.71,214.18L106.71,214.18z"/>
		</g>
	</g>
	<g>
		<g>
			<path class="st0" d="M228.4,53.97c-6.9,9.09-13.8,18.17-20.71,27.26c-0.99,1.3-1.98,2.6-2.96,3.9c-0.98,1.29-0.2,3.36,1.08,4.1
				c1.54,0.9,3.12,0.22,4.1-1.08c6.9-9.09,13.8-18.17,20.71-27.26c0.99-1.3,1.98-2.6,2.96-3.9c0.98-1.29,0.2-3.36-1.08-4.1
				C230.97,51.99,229.39,52.67,228.4,53.97L228.4,53.97z"/>
		</g>
	</g>
	<g>
		<g>
			<path class="st0" d="M77.23,159.25c-11.31,1.55-22.61,3.09-33.92,4.64c-1.62,0.22-3.24,0.44-4.86,0.66
				c-1.61,0.22-2.48,2.28-2.1,3.69c0.48,1.73,2.08,2.32,3.69,2.1c11.31-1.55,22.61-3.09,33.92-4.64c1.62-0.22,3.24-0.44,4.86-0.66
				c1.61-0.22,2.48-2.28,2.1-3.69C80.45,159.61,78.85,159.03,77.23,159.25L77.23,159.25z"/>
		</g>
	</g>
	<g>
		<g>
			<path class="st0" d="M193.92,103.69c-9.75-7.36-21.72-11.52-33.93-11.87c-11.83-0.34-23.78,2.95-33.73,9.37
				c-10.59,6.82-18.73,16.9-23.32,28.61c-4.37,11.13-5.1,23.59-2.35,35.2c2.78,11.75,9.28,22.61,18.35,30.58
				c9.36,8.23,20.99,13.32,33.38,14.64c11.82,1.26,23.99-1.26,34.43-6.92c10.83-5.87,19.79-15.3,25.09-26.42
				c5.24-11,6.96-23.27,5.06-35.29c-1.87-11.86-7.54-23.06-15.88-31.68C198.81,107.64,196.42,105.61,193.92,103.69
				c-1.29-0.98-3.36-0.2-4.1,1.08c-0.9,1.54-0.22,3.12,1.08,4.1c17.7,13.53,24.93,37.32,18.32,58.37
				c-3.27,10.43-10.16,20.21-18.93,26.69c-4.4,3.25-9.23,5.83-14.14,7.54c-5.34,1.86-10.42,2.83-15.84,3.02
				c-11.03,0.4-21.74-2.53-31.07-8.58c-9.21-5.96-16.64-15.03-20.53-25.03c-3.96-10.17-4.82-21.16-2.44-31.55
				c2.52-11,8.41-20.85,16.94-28.38c16.53-14.57,41.28-17.24,60.58-6.7c2.48,1.36,4.85,2.91,7.11,4.61c1.29,0.98,3.35,0.21,4.1-1.08
				C195.89,106.26,195.22,104.67,193.92,103.69z"/>
		</g>
	</g>
	<g>
		<path d="M178.58,298.11h197.81c20.87,0,37.79-16.92,37.79-37.79s-27.02-50.54-27.02-51.81c0-27.44-45.02-58.1-47.64-57.68
			c-8.91-37.47-45.76-60.16-85.97-60.16c-47.02,0-105.02,51.85-105.02,98.87c0,0.54,0.03,1.09,0.05,1.63
			c-23.57,5.92-31.69,36.73-31.69,62.13c0,29.99,25.71,59.59,55.69,59.59l12.93-14.77"/>
	</g>
	<g>
		<path d="M338.95,303.5h64c20.87,0,37.79-16.92,37.79-37.79s-16.92-37.79-37.79-37.79h-2.42c0.09-1.25,0.16-2.48,0.16-3.74
			c0-27.44-22.24-49.67-49.67-49.67c-2.73,0-5.4,0.22-8.03,0.65c-8.91-37.47-42.58-65.34-82.79-65.34
			c-47.02,0-85.12,38.11-85.12,85.12c0,0.54,0.03,1.09,0.05,1.63c-23.57,5.92-41.03,27.25-41.03,52.66
			c0,29.99,24.3,54.28,54.28,54.28h26.63"/>
	</g>
	<g>
		<path d="M402.95,303.5c20.87,0,37.79-16.92,37.79-37.79s-16.92-37.79-37.79-37.79h-2.42c0.09-1.25,0.16-2.48,0.16-3.74
			c0-27.44-22.24-49.67-49.67-49.67c-2.73,0-5.4,0.22-8.03,0.65c-8.91-37.47-42.58-65.34-82.79-65.34
			c-47.02,0-85.12,38.11-85.12,85.12c0,0.54,0.03,1.09,0.05,1.63c-23.57,5.92-41.03,27.25-41.03,52.66
			c0,29.99,24.3,54.28,54.28,54.28H402.95z"/>
	</g>
	<g>
		<g>
			<path class="st1" d="M402.95,306.5c17.68-0.1,33.63-11.74,38.95-28.63c5.37-17.05-1.44-35.9-16.1-45.94
				c-7.58-5.19-16.22-7.01-25.27-7.01c1,1,2,2,3,3c0.88-12.23-2.57-24.69-9.84-34.6c-7.03-9.58-17.06-16.71-28.54-19.9
				c-7.49-2.08-15.29-2.36-22.96-1.16c1.23,0.7,2.46,1.4,3.69,2.1c-3.95-16.44-12.69-31.62-24.95-43.27
				c-12.28-11.67-27.92-19.76-44.61-22.8c-16.86-3.06-34.42-1.27-50.22,5.39c-15.07,6.35-28.09,16.82-37.64,30.08
				c-9.65,13.41-15.25,29.54-16.23,46.02c-0.13,2.26-0.19,4.52-0.11,6.78c0.73-0.96,1.47-1.93,2.2-2.89
				c-19.81,5.06-35.87,20.74-41.23,40.5c-5.3,19.51,0.31,40.88,14.5,55.27c10.92,11.08,25.9,17.06,41.39,17.06
				c4.98,0,9.97,0,14.95,0c10.14,0,20.27,0,30.41,0c13.23,0,26.46,0,39.69,0c14.27,0,28.54,0,42.81,0c13.25,0,26.5,0,39.76,0
				c10.15,0,20.3,0,30.45,0c5.08,0,10.16,0,15.23,0C402.51,306.5,402.73,306.5,402.95,306.5c3.86,0,3.87-6,0-6
				c-3.4,0-6.81,0-10.21,0c-8.9,0-17.8,0-26.7,0c-12.38,0-24.76,0-37.14,0c-13.98,0-27.97,0-41.95,0c-13.58,0-27.16,0-40.73,0
				c-11.17,0-22.34,0-33.51,0c-6.88,0-13.76,0-20.63,0c-1.2,0-2.39,0-3.59,0c-7.69-0.02-15.36-1.66-22.3-5.03
				c-16.59-8.07-27.99-24.76-29-43.25c-1.06-19.33,8.96-37.92,25.78-47.55c4.08-2.34,8.42-4.05,12.97-5.22
				c1.24-0.32,2.25-1.6,2.2-2.89c-0.56-15.65,3.97-31.46,12.17-44.75c7.95-12.89,19.45-23.39,32.95-30.24
				c14.15-7.18,30.27-9.95,46.03-8.28c15.68,1.66,30.93,8.12,43.07,18.18c12.19,10.1,21.42,23.59,26.17,38.71
				c0.6,1.9,1.12,3.83,1.59,5.77c0.41,1.7,2.13,2.34,3.69,2.1c11.36-1.78,23.1,0.78,32.73,7.03c8.6,5.58,15.29,14.1,18.62,23.81
				c2.11,6.15,2.87,12.56,2.4,19.04c-0.12,1.62,1.47,3,3,3c3.02,0,6.01,0.02,8.98,0.61c3.63,0.72,7.12,1.96,10.35,3.77
				c6.44,3.6,11.55,9.15,14.69,15.82c6.51,13.81,2.69,30.64-8.61,40.69c-6.31,5.62-14.58,8.63-23,8.68
				C399.09,300.52,399.08,306.52,402.95,306.5z"/>
		</g>
	</g>
</g>
</svg>
</div>





















          
        <div id="box1" class="box">
        ${valueEntities.length > 0
          ? valueEntities.map((entityId: string) => {
              // Ottieni lo stato dell'entità
              const entityState = this.hass.states[entityId];

              // Verifica se l'entità esiste
              if (!entityState) {
                return html`<div>Entità non trovata: ${entityId}</div>`;
              }

              // Estrai il friendly_name, lo stato e l'unit_of_measurement
              const friendlyName = entityState.attributes.friendly_name || entityId;
              const state = entityState.state;
              const unit = entityState.attributes.unit_of_measurement || '';

              return html`
                <div class="entity">
                  <span class="friendly-name">${friendlyName}</span>
                  <div class="value">
                    <span class="state">${state}</span>
                    <span class="unit">${unit}</span>
                  </div>
                </div>
              `;
            })
          : html`<div>Nessuna entità configurata</div>`}
      </div>




          <div id="date-time">
            <div class="time">${currentHour}</div>
            <div class="date">${formattedDate}</div>

          </div>
          
      <div id="box3" class="box">
        ${entityIcons.length > 0
          ? entityIcons.map((entityConfig: any) => {
              // Estrai l'ID dell'entità e l'icona personalizzata
              const entityId = entityConfig.entity;
              const customIcon = entityConfig.icon;

              // Ottieni lo stato dell'entità da Home Assistant
              const entityState = this.hass.states[entityId];

              // Controlla se l'entità esiste e il suo stato è "on"
              if (!entityState || entityState.state !== 'on') {
                return ''; // Non renderizzare nulla se l'entità non è "on"
              }

              // Usa l'icona configurata oppure quella predefinita di Home Assistant
              const icon = customIcon || entityState.attributes.icon;

              return html`
                <ha-icon
                  .icon="${icon}"
                  style="margin: 0 8px; font-size: 24px;"
                  title="${entityState.attributes.friendly_name || entityId}"
                ></ha-icon>
              `;
            })
          : html`<div>Nessuna entità configurata o attiva</div>`}
      </div>


        </div>
        <div class="gradient-bar"></div>
        <div class="timeline">
          ${limitedForecast.length > 0
            ? limitedForecast.map((f: any, index: number) => {
                const showCondition = f.condition !== previousCondition;
                previousCondition = f.condition; // Aggiorna la condizione precedente
  
                const icon = ScreensaverCard.weatherIconsDay[f.condition] || 'unknown';
                const iconUrl = `https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${icon}.svg`;
  
                const temperatureClass =
                  f.temperature < 10 ? 'cold' : f.temperature > 25 ? 'hot' : '';
  
                return html`
                  <div class="timeline-item">
                    ${showCondition
                      ? html`
                          <div class="condition">
                            <img src="${iconUrl}" alt="${f.condition}" />
                          </div>
                        `
                      : html`<div class="condition"></div>`}
                    <div class="details">
                      <div class="hour">${new Date(f.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      <div class="temperature ${temperatureClass}">${f.temperature}°C</div>
                      ${f.precipitation !== 0
                        ? html`<div class="precipitation">${f.precipitation} mm</div>`
                        : ''}
                    </div>
                  </div>
                `;
              })
            : html`<div>Nessuna previsione oraria disponibile</div>`}
        </div>
      </ha-card>
    `;
  }
}
