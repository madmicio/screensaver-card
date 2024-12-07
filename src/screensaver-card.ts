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
    fog: "cloudy",
    hail: "rainy-7",
    lightning: "thunder",
    "lightning-rainy": "thunder",
    partlycloudy: "cloudy-day-3",
    pouring: "rainy-6",
    rainy: "rainy-5",
    snowy: "snowy-6",
    "snowy-rainy": "rainy-7",
    sunny: "day",
    windy: "cloudy",
    "windy-variant": "cloudy-day-3",
    exceptional: "!!",
  };

  static get styles() {
    return css`
      ha-card {
        padding: 16px;
      }
      .timeline {
        display: flex;
        overflow-x: auto;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
      }
      .timeline-item {
        flex: 0 0 auto;
        text-align: center;
        margin-right: 16px;
        padding: 8px;
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        min-width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    let previousCondition = ''; // Variabile per tenere traccia della condizione precedente
  
    return html`
      <ha-card>
        <h1>Previsioni Meteo</h1>
        <h2>Orarie</h2>
        <div class="timeline">
          ${hourlyForecast.length > 0
            ? hourlyForecast.map((f: any, index: number) => {
                const showCondition = f.condition !== previousCondition;
                previousCondition = f.condition; // Aggiorna la condizione precedente
  
                // Ottieni l'icona corrispondente alla condizione
                const icon = ScreensaverCard.weatherIconsDay[f.condition] || 'unknown';
                console.log(icon);
  
                return html`
                  <div class="timeline-item">
                    ${showCondition
                      ? html`<div class="condition">
                          <img src="./icons/${icon}.svg" alt="${f.condition}" />
                        </div>`
                      : html`<div class="condition"></div>`}
                    <div class="details">
                      <div class="hour">${new Date(f.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      <div class="temperature">${f.temperature}°C</div>
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
