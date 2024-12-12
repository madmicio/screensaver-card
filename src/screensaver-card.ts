import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, stateIcon } from 'custom-card-helpers';


@customElement('screensaver-card')
export class ScreensaverCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private config!: any;
  @state() private cg_alert: boolean = false; // Stato per gestire l'evento cg_alert
  @state() private hourlyForecastEvent?: any;
  @state() private subscribedToHourlyForecast?: Promise<() => void>;
  @state() private events: any[] = []; // Array per salvare gli eventi
  private loadLocalFont(scriptDirectory: string, path: string) {
    const style = document.createElement("style");
    console.log(scriptDirectory);
    style.textContent = `
      @font-face {
        font-family: 'displayFont';
        src: url('${scriptDirectory}/BwModelica-HairlineExpanded.otf') format('truetype');
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
  }

  static get styles() {
    return css`
      ha-card {
        // margin: 30px;
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
        height: 2px;
        background: linear-gradient(to right, black, rgba(255, 255 ,255, 0.3), black);
        // margin-bottom: 16px;
        position: relative;
        top: 42px;
      }
      .timeline {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        overflow-x: auto;
        justify-content: space-between;
        // background-color: red;
        height: auto;
      }
      .timeline-item {
        flex: 0 0 auto;
        text-align: center;
        // min-width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: -webkit-fill-available;
      }
  
      .condition {
        height: 50px;
      }
      .condition img {
        width: 40px;
        height: 40px;
        // margin-bottom: 20px;
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
        color: white;
        /* Imposta una larghezza fissa */
        width: 67vh;
        }

        .time,
        .date {
          
          // width: 100%;
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
          // white-space: nowrap; 
          display: flex;
          justify-content: space-between;
        }
        .box {
            position: absolute;

        }
       

        #box1 {
        bottom: 14%;
        right: 3%;
        display: flex;
        flex-direction: column;
        
        // font-size: 16px;
        color: white;
         //var(--primary-text-color);
        line-height: 1;

      }

      .entity {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        // padding: 4px 8px;
        // background: var(--card-background-color);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: displayFont, monospace;
        margin-top: 1vh;
      }

      .friendly-name {
        // font-weight: bold;
        display: flex;
        justify-content: flex-end;
        font-size: 2vh;
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
        color: #757575 //var(--secondary-text-color);
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
          color: #757575 /* var(--primary-text-color);  Colore personalizzato */
        }

        .now-icon {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 30vw;
        position: absolute;
        top: 1.5%;
        right: 3%;
        }

        .ext-temp {
        font-family:'displayFont'; 
        font-weight: bold;
        font-size: 4vh;
        color: #757575;


      }

      .events {
        margin: 10px 0;
      }
      .event {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .event-title {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .event-time {
        color: #757575;
        font-size: 0.9em;
      }
      .no-events {
        color: #999;
        font-style: italic;
      }
    `;
  }

  // Metodo per filtrare eventi duplicati
private filterDuplicateEvents(events: any[]): any[] {
  const seen = new Set();
  return events.filter((event) => {
    const uniqueKey = `${event.summary}-${event.start}`;
    if (seen.has(uniqueKey)) {
      return false;
    }
    seen.add(uniqueKey);
    return true;
  });
}

  // Metodo per controllare l'evento `cg_alert`
  private checkCGAlert(events: any[]) {
    const now = new Date(); // Ora corrente
    console.log('Ora corrente:', now);
  
    const alertEvent = events.find((event) => {
      const start = event.start?.dateTime || event.start; // Gestione di dateTime o stringa
      const end = event.end?.dateTime || event.end; // Gestione di dateTime o stringa
  
      const startDate = new Date(start); // Converte in oggetto Date
      const endDate = new Date(end); // Converte in oggetto Date
  
      console.log('Evento:', event.summary, 'Inizio:', startDate, 'Fine:', endDate);
  
      return (
        event.summary === 'cg_alert' &&
        !isNaN(startDate.getTime()) &&
        !isNaN(endDate.getTime()) &&
        startDate <= now &&
        now <= endDate
      );
    });
  
    this.cg_alert = !!alertEvent; // Imposta true se l'evento è attivo
    console.log('Stato cg_alert:', this.cg_alert);
  }
  
  
  private async getEvents() {
    const calendarEntity = this.config?.calendar;
    if (!calendarEntity) {
      console.error('Nessun calendario configurato.');
      return;
    }
  
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 7);
  
    try {
      const events = await this.fetchCalendarEvents(this.hass, start, end, [calendarEntity]);
      console.log('Eventi recuperati:', events);
  
      const filteredEvents = this.filterDuplicateEvents(events);
  
      this.checkCGAlert(filteredEvents); // Verifica cg_alert
  
      this.events = filteredEvents.filter((event) => event.summary !== 'cg_alert').slice(0, 5);
    } catch (error) {
      console.error('Errore durante il recupero degli eventi:', error);
      this.events = [];
    }
  }



  // Metodo fetchCalendarEvents
  private async fetchCalendarEvents(
    hass: HomeAssistant,
    start: Date,
    end: Date,
    calendars: string[]
  ): Promise<any[]> {
    const promises = calendars.map((cal) =>
      hass.callApi('GET', `calendars/${cal}?start=${start.toISOString()}&end=${end.toISOString()}`)
    );

    const results = await Promise.allSettled(promises);

    return results
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => (result as PromiseFulfilledResult<any[]>).value);
  }

  // Metodo formatEventDate
  private formatEventDate(dateInput: string | { dateTime: string }): string {
    try {
      const dateStr =
        typeof dateInput === 'object' && 'dateTime' in dateInput ? dateInput.dateTime : dateInput;

      const parsedDate = new Date(dateStr);

      if (isNaN(parsedDate.getTime())) {
        throw new Error('Data non valida');
      }

      return `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } catch (error) {
      console.error('Errore nel parsing della data:', dateInput, error);
      return 'Data non valida';
    }
  }

  firstUpdated() {
    const card = this.shadowRoot?.getElementById('dynamic-card');
  
    if (!card) {
      console.error('Impossibile trovare il card');
      return;
    }
  
    const updatePadding = () => {
      const top = Math.floor(Math.random() * 7) * 5;
      const bottom = 60 - top;
  
      const left = Math.floor(Math.random() * 7) * 5;
      const right = 60 - left;
  
      card.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
    };
  
    // Aggiorna il margine ogni 30 secondi
    setInterval(updatePadding, 30000);
  
    // Imposta il margine iniziale
    updatePadding();
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
    this.getEvents(); // Recupera eventi quando la card viene caricata
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
      const weatherTemperature = this.hass.states[weatherEntity].attributes.temperature;
      const sunEntity = this.hass.states['sun.sun'];
      if (!sunEntity) {
        console.error("Entità sun.sun non trovata");
        return;
      }

      // Determina se è giorno o notte
      const isday = sunEntity?.state === 'above_horizon';

      // Determina l'icona del meteo
      let nowWeatherIcon;
      if (weatherState === 'partlycloudy') {
        nowWeatherIcon = isday ? 'partlycloudy' : 'partlycloudy-night'; // Usa isday per determinare l'icona
      } else {
        nowWeatherIcon = weatherState; // Per tutti gli altri stati
      }
console.log(this.cg_alert);
      
    return html`
      <ha-card id="dynamic-card" style="padding: 30px;">
          <div class="main">




  <div class="now-icon">
  <img src="https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/now_icon/${nowWeatherIcon}.svg"  />
    ${this.config?.internal_temperature
      ? (() => {
          // Calcola internalTemperatureState se internal_temperature è configurato
          const internalTemperature = this.config?.internal_temperature || '';
          const internalTemperatureState =
            internalTemperature && this.hass.states[internalTemperature]
              ? this.hass.states[internalTemperature].state
              : null; // Valore predefinito se non è definito o non esiste

          // Ritorna l'SVG con il valore calcolato
          return html`
                
                  <svg version="1.1" id="Ñëîé_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 1152.78 354.73" style="enable-background:new 0 0 1152.78 354.73; height:6vh;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#757575;}
    .st1{font-family:'displayFont'; font-weight: bold;}
    .st2{font-size:180px;}
  </style>
  <g>
    <path class="st0" d="M1134.59,158.27c1.24,1.14,1.56,2.51,0.97,4.07c-0.56,1.48-2.01,2.44-3.59,2.44h-29.34
      c-16.57,0-30,13.43-30,30v24.55c0,4.16,3.37,7.52,7.52,7.52l0,0c4.16,0,7.52-3.37,7.52-7.52v-24.55c0-8.25,6.69-14.94,14.94-14.94
      h29.43c17.14,0,25.35-21.04,12.74-32.65L853.18,8.75c-3.6-3.31-8.16-4.96-12.73-4.96c-4.57,0-9.14,1.65-12.74,4.97L555.94,147.19
      c-12.6,11.61-4.39,32.65,12.74,32.65h33.18c8.25,0,14.94,6.69,14.94,14.94v138.86c0,8.47,8.83,15.24,17.26,15.24h69.4
      c4.16,0,7.52-3.37,7.52-7.52l0,0c0-4.16-3.37-7.52-7.52-7.52h-69.4c-0.68,0-1.7-0.52-2.21-0.99V194.78c0-16.57-13.43-30-30-30
      h-33.09c-1.59,0-3.04-0.96-3.6-2.44c-0.59-1.56-0.25-2.93,0.98-4.07L837.9,19.83c0.89-0.82,1.88-0.99,2.55-0.99
      c0.67,0,1.65,0.17,2.54,0.99"/>
  </g>
  <text transform="matrix(1 0 0 1 0.1313 290.461)" class="st0 st1 st2">${weatherTemperature}°</text>
  <text transform="matrix(1 0 0 1 660.559 290.461)" class="st0 st1 st2">${internalTemperatureState}°</text>
  </svg>

    `;
        })()
      : html`<div class="ext-temp">${weatherTemperature}°</div>`}
  </div>

  <!-- calendario -->

   <h1>Prossimi Eventi</h1>
      <div class="events">
        ${this.events.length > 0
          ? this.events.map(
              (event: any) => html`
                <div class="event">
                  <div class="event-title">${event.summary}</div>
                  <div class="event-time">
                    ${this.formatEventDate(event.start)} - ${this.formatEventDate(event.end)}
                  </div>
                </div>
              `
            )
          : html`<div class="no-events">Nessun evento disponibile</div>`}
      </div>

      ${this.cg_alert
        ? html`
            <div class="cg-alert">
              <h2>⚠️ Avviso Importante</h2>
              <p>L'evento "cg_alert" è attualmente in corso. Si prega di prestare attenzione.</p>
            </div>
          `
        : ''}



          















            
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
              <div class="time">${currentHour}
              <div class="date">
                  <div>${dayName}</div>
                  <div>:</div>
                  <div>${day}</div>
                  <div>:</div>
                  <div>${month}</div>
                  <div>:</div>
                  <div>${year}</div>
                </div>
              </div>
          <!--    <div class="date">${formattedDate}</div> -->

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
          <div >
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
          </div>

      </ha-card>
    `;
  }
}
