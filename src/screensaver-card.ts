import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

@customElement('screensaver-card')
export class ScreensaverCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private config!: any;

  @state() private hourlyForecastEvent?: any;
  @state() private subscribedToHourlyForecast?: Promise<() => void>;

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
    const limitedForecast = hourlyForecast.slice(0, 12); // Prendi i primi 12 elementi
    let previousCondition = ''; // Variabile per tenere traccia della condizione precedente

    return html`
      <ha-card>
        <h1>Previsioni Meteo</h1>
        <h2>Orarie</h2>
        <div class="gradient-bar"></div>
        <div class="timeline">
          ${limitedForecast.length > 0
            ? limitedForecast.map((f: any, index: number) => {
                const showCondition = f.condition !== previousCondition;
                previousCondition = f.condition; // Aggiorna la condizione precedente

                const icon = ScreensaverCard.weatherIconsDay[f.condition] || 'unknown';
                const iconUrl = `https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${icon}.svg`;

                // Classi dinamiche per la temperatura
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
