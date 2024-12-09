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


    const weatherEntity = this.config?.entity;

        // Verifica che l'entità di stato del meteo e del sole siano valide
        if (!weatherEntity || !this.hass.states[weatherEntity]) {
          console.error("Entità meteo non valida o non trovata:", weatherEntity);
          return;
        }

        const weatherState = this.hass.states[weatherEntity].state; // Stato attuale del meteo

        const sunEntity = this.hass.states['sun.sun'];
        if (!sunEntity || !sunEntity.attributes.next_dawn || !sunEntity.attributes.next_dusk) {
          console.error("Entità sun.sun non valida o attributi mancanti");
          return;
        }

        // Ottieni gli orari di alba e tramonto
        const nextDawn = new Date(sunEntity.attributes.next_dawn);
        const nextDusk = new Date(sunEntity.attributes.next_dusk);
        const nowNight = new Date(); // Ora attuale

        // Determina l'icona del meteo
        let nowWeatherIcon;
        if (weatherState === 'partlycloudy') {
          if (nowNight >= nextDusk || nowNight < nextDawn) {
            nowWeatherIcon = 'partlycloudy-night'; // Dopo il tramonto o prima dell'alba
          } else {
            nowWeatherIcon = 'partlycloudy'; // Durante il giorno
          }
        } else {
          nowWeatherIcon = weatherState; // Per tutti gli altri stati
        }

        console.log("Icona corrente del meteo:", nowWeatherIcon);


    return html`
      <ha-card>
        <div class="main">




<div class="now-icon">
<img src="https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/now_icon/${nowWeatherIcon}.svg"  />
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
