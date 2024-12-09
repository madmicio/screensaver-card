import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

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
        src: url('${scriptDirectory}/DS-DIGII.TTF') format('truetype');
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
        .time {
          position: absolute;
          width: 50vh;
          // aspect-ratio: 3/2;
          // background-color: red;
          top: 50%;
          left: 5%;
          font-family: displayFont;
        }
        .box {
            position: absolute;
            width: 200px;
            height: 100px;
        }
        #box1 {
            background-color: yellow;
            top: 10%;
            left: 10%;
        }
        // #time {
        //     background-color: red;
        //     top: 50%;
        //     left: 40%;
        }
        #box3 {
            background-color: green;
            bottom: 10%;
            right: 10%;
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
  
    return html`
      <ha-card>
        <div class="main">
          <div id="box1" class="box"></div>
          <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 740 350" style="enable-background:new 0 0 740 350;" class="time" xml:space="preserve">
          <style type="text/css">
            .st0{fill:#FFFFFF;}
            .st1{font-family:'BwModelicaSS01DEMO-HairlineExpanded';}
            .st2{font-size:85.0155px;}
            .st3{font-size:300px;}
          </style>
          <text id="data" transform="matrix(1 0 0 1 0.4752 344.3511)" class="st0 st1 st2">dom : 08 : 12 : 24</text>
          <text id="orologio" transform="matrix(1 0 0 1 0.4749 226.6919)" class="st0 st1 st3">13:59</text>
          </svg>
          <div id="box3" class="box"></div>
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
