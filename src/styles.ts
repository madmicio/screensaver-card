import { css } from "lit";
export default css`

    ha-card {
    height: 100%;
    
    background-color: black;
    display: grid;
    grid-template-areas:
        ". icon icon now_icon alert"
        ". . . temp ."
        ". date . cal-event ."
        "tline tline tline tline tline";
    grid-template-columns: 7vw auto auto auto 1vw;
    grid-template-rows: auto auto 1fr auto;
    padding-top: 1vw;
    }

    .ineditor {
    transform: scale(0.3); /* Riduce il contenuto del 50% */
    transform-origin: top left; /* Punto di partenza della trasformazione */
    width: fit-content;
    // width: 1000px; /* Corregge la larghezza per evitare overflow */
    // height: 780px; /* Corregge l'altezza per evitare overflow */
    // overflow: hidden; /* Nasconde il contenuto fuoriuscente */
    }
    h2 {
    margin-bottom: 8px;
    }
    .gradient-bar {
    width: 100%;
    height: 2px;
    background: linear-gradient(
        to right,
        black,
        rgba(255, 255, 255, 0.3),
        black
    );
    position: relative;
    top: 42px;
    }
    .timeline {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    overflow-x: auto;
    justify-content: space-between;
    height: auto;
    }
    .timeline-item {
    flex: 0 0 auto;
    text-align: center;
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
    color: #2196f3;
    }
    .details .temperature.hot {
    color: #f44336;
    }
    .details .precipitation {
    color: #9e9e9e;
    font-size: 0.8em;
    }
    // .main-grid {
    // height: 100%;
    // background-color: black;
    // display: grid;
    // grid-template-areas:
    //     ". icon icon now_icon alert"
    //     ". . . temp ."
    //     ". date . cal-event ."
    //     "tline tline tline tline tline";
    // grid-template-columns: 7vw auto auto auto 1vw;
    // grid-template-rows: auto auto 1fr auto;
    // padding-top: 1vw;
    // }
    .div-temp {
    grid-area: temp;
    justify-self: end;
    }
    #date-time {
    grid-area: date;
    font-family: bw_font, monospace;
    color: white;
    align-self: end;
    justify-self: start;
    }
    .time,
    .date {
    text-align: center;
    font-family: bw_font, monospace;
    line-height: 1;
    }
    .time {
    font-size: 13vw;
    white-space: nowrap;
    }
    .date {
    font-size: 4.5vw;
    display: flex;
    justify-content: space-between;
    }
    #entityState {
    display: flex;
    flex-direction: column;
    justify-content: end;
    line-height: 1;
    }
    .entity {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 1vh;
    }
    .friendly-name {
    display: flex;
    justify-content: flex-end;
    font-size: 1.7vh;
    color: #757575;
    }
    .value {
    display: flex;
    font-size: 2vh;
    margin-top: 0.5vh;
    color: white;
    }
    .state {
    margin-left: auto;
    margin-right: 4px;
    }
    .unit {
    font-style: italic;
    color: #757575;
    }
    #icon-state-div {
    grid-area: icon;
    margin-top: 4vh;
    }
    ha-icon {
    --mdc-icon-size: 4.5vh;
    color: #757575;
    }
    .now-icon {
    grid-area: now_icon;
    justify-self: end;
    width: 27vw;
    height: 100%;
    }
    .ext-temp {
    font-family: "bw_font";
    font-weight: bold;
    font-size: 4vh;
    color: #757575;
    }
    .events {
    display: flex;
    flex-direction: column;
    justify-content: end;
    color: white;
    line-height: 1;
    }
    .event {
    margin-bottom: 10px;
    text-align: right;
    color: white;
    }
    .event-title {
    text-align: right;
    margin-top: 1vh;
    font-size: 2vh;
    }
    .event-time {
    color: #757575;
    text-align: right;
    font-size: 1.7vh;
    }
    .no-events {
    color: #999;
    font-style: italic;
    text-align: right;
    }
    .cg-alert {
    grid-area: alert;
    width: 2vw;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: red;
    position: relative;
    top: 1.5%;
    right: 100%;
    opacity: 0.6;
    }
    .hidden {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    }
    .visible {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    }
    .number-input-container {
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    }

    .number-input-container label {
    margin-bottom: 0.5em;
    font-weight: bold;
    }

    .number-input-container input {
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    width: 100px;
    }




    
`;