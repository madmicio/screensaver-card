/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$5=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$2=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$4?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$3=window,r$1=e$3.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$3.reactiveElementPolyfillSupport,n$4={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$4,reflect:!1,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$4).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$4;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$3.reactiveElementVersions)&&void 0!==s$2?s$2:e$3.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$1=i$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$3=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$3,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$1+s.slice(v)+n$3+w):s+n$3+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$1)||i.startsWith(n$3)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$1).split(n$3),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$3),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$3,t+1));)v.push({type:7,index:r}),t+=n$3.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$1(n){return (t,o)=>void 0!==o?e(n,t,o):i(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return n$1({...t,state:!0})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

var styles = i$2 `
    ha-card {
    background-color: black;
    margin: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
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
    .main-grid {
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
`;

var ScreensaverCard_1;
let ScreensaverCard = ScreensaverCard_1 = class ScreensaverCard extends s {
    loadLocalFont(scriptDirectory, path) {
        const style = document.createElement("style");
        console.log(scriptDirectory);
        style.textContent = `
      @font-face {
        font-family: 'bw_font';
        src: url('${scriptDirectory}/BwModelica-HairlineExpanded.otf') format('truetype');
        // src: url('/local/BwModelica-HairlineExpanded.otf') format('truetype');
      }

     
    `;
        document.head.appendChild(style);
    }
    static get styles() {
        return styles;
    }
    constructor() {
        super();
        this.cg_alert = false; // Stato per gestire l'evento cg_alert
        this.events = []; // Array per salvare gli eventi
        this.calendars = []; // Variabile per memorizzare i calendari
        const scriptPath = new URL(import.meta.url).pathname;
        const scriptDirectory = scriptPath.substring(0, scriptPath.lastIndexOf("/"));
        this.loadLocalFont(scriptDirectory, scriptPath);
    }
    // Metodo per ottenere i calendari configurati
    async getCalendars() {
        try {
            const calendarEntities = this.config?.calendars || [];
            if (!calendarEntities.length) {
                this.calendars = [];
                return;
            }
            const calendars = await Promise.all(calendarEntities.map((calendar) => this.hass.callApi("GET", `calendars/${calendar}`)));
            this.calendars = calendars;
        }
        catch {
            this.calendars = [];
        }
    }
    async getEvents() {
        const calendarEntities = this.config?.calendars || [];
        if (!calendarEntities.length)
            return;
        const start = new Date();
        const end = new Date();
        end.setDate(start.getDate() + 7);
        try {
            const events = await this.fetchCalendarEvents(this.hass, start, end, calendarEntities);
            const filteredEvents = this.filterDuplicateEvents(events);
            this.checkCGAlert(filteredEvents);
            this.events = filteredEvents
                .filter((event) => event.summary !== "cg_alert")
                .slice(0, 5);
        }
        catch {
            this.events = [];
        }
    }
    async fetchCalendarEvents(hass, start, end, calendars) {
        const promises = calendars.map((cal) => hass.callApi("GET", `calendars/${cal}?start=${start.toISOString()}&end=${end.toISOString()}`));
        const results = await Promise.allSettled(promises);
        return results
            .filter((result) => result.status === "fulfilled")
            .flatMap((result) => result.value);
    }
    filterDuplicateEvents(events) {
        const seen = new Set();
        return events.filter((event) => {
            const uniqueKey = `${event.summary}-${event.start}`;
            if (seen.has(uniqueKey))
                return false;
            seen.add(uniqueKey);
            return true;
        });
    }
    checkCGAlert(events) {
        const now = new Date();
        const alertEvent = events.find((event) => {
            const start = event.start?.dateTime || event.start;
            const end = event.end?.dateTime || event.end;
            const startDate = new Date(start);
            const endDate = new Date(end);
            return (event.summary === "cg_alert" &&
                !isNaN(startDate.getTime()) &&
                !isNaN(endDate.getTime()) &&
                startDate <= now &&
                now <= endDate);
        });
        this.cg_alert = !!alertEvent;
    }
    formatEventDate(dateInput) {
        try {
            const dateStr = typeof dateInput === "object" && "dateTime" in dateInput
                ? dateInput.dateTime
                : dateInput;
            const parsedDate = new Date(dateStr);
            if (isNaN(parsedDate.getTime())) {
                throw new Error("invalid date");
            }
            return `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        }
        catch {
            return "invalid date";
        }
    }
    firstUpdated() {
        const card = this.shadowRoot?.getElementById("dynamic-card");
        if (!card) {
            console.error("Could not find the card");
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
    setConfig(config) {
        if (!config.entity) {
            throw new Error("Invalid configuration");
        }
        this.config = config;
    }
    getCardSize() {
        return 15;
    }
    async subscribeToHourlyForecast() {
        this.unsubscribeHourlyForecast();
        if (!this.isConnected ||
            !this.hass ||
            !this.config ||
            !this.config.entity ||
            !this.hassSupportsForecastEvents() ||
            !this.config.entity.startsWith("weather.")) {
            return;
        }
        this.subscribedToHourlyForecast = this.hass.connection.subscribeMessage((evt) => (this.hourlyForecastEvent = evt), {
            type: "weather/subscribe_forecast",
            forecast_type: "hourly",
            entity_id: this.config.entity,
        });
    }
    unsubscribeHourlyForecast() {
        if (this.subscribedToHourlyForecast) {
            this.subscribedToHourlyForecast.then((unsub) => unsub());
            this.subscribedToHourlyForecast = undefined;
        }
    }
    hassSupportsForecastEvents() {
        return !!this.hass?.services?.weather?.get_forecasts;
    }
    getHourlyForecast() {
        const forecast = this.hourlyForecastEvent?.forecast;
        return forecast ?? [];
    }
    connectedCallback() {
        super.connectedCallback();
        this.subscribeToHourlyForecast();
        this.getCalendars(); // Ottieni l'elenco dei calendari
        this.getEvents(); // Richiama la funzione per recuperare gli eventi
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribeHourlyForecast();
    }
    renderEntityState() {
        if (!this.config?.value_entity)
            return x ``;
        const valueEntities = this.config.value_entity;
        return x `
      <div id="entityState" class="icon-state-div-class">
        ${valueEntities.length > 0
            ? valueEntities.map((entityId) => {
                const entityState = this.hass.states[entityId];
                if (!entityState) {
                    return x `<div>Entità non trovata: ${entityId}</div>`;
                }
                const friendlyName = entityState.attributes.friendly_name || entityId;
                const state = entityState.state;
                const unit = entityState.attributes.unit_of_measurement || "";
                return x `
                <div class="entity">
                  <span class="friendly-name">${friendlyName}</span>
                  <div class="value">
                    <span class="state">${state}</span>
                    <span class="unit">${unit}</span>
                  </div>
                </div>
              `;
            })
            : x `<div>Nessuna entità configurata</div>`}
      </div>
    `;
    }
    renderEvents() {
        if (!this.config?.calendars)
            return x ``;
        return x `
      <div class="events">
        ${this.events.length > 0
            ? this.events.map((event) => x `
                <div class="event">
                  <div class="event-title">${event.summary}</div>
                  <div class="event-time">
                    ${this.formatEventDate(event.start)} -
                    ${this.formatEventDate(event.end)}
                  </div>
                </div>
              `)
            : x ``}
      </div>
    `;
    }
    render() {
        const hourlyForecast = this.getHourlyForecast();
        const limitedForecast = hourlyForecast.slice(0, 16); // Prendi i primi 12 elementi
        let previousCondition = ""; // Variabile per tenere traccia della condizione precedente
        const currentHour = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        // Ottieni la lingua configurata in Home Assistant o usa 'en-US' come fallback
        const language = this.hass?.locale?.language || "en-US";
        // Ottieni i componenti della data
        const now = new Date();
        const dayName = now.toLocaleDateString(language, { weekday: "short" }); // Giorno della settimana
        const day = now.toLocaleDateString(language, { day: "2-digit" }); // Giorno
        const month = now.toLocaleDateString(language, { month: "2-digit" }); // Mese
        const year = now.toLocaleDateString(language, { year: "2-digit" }); // Anno
        // Combina i componenti con il separatore ` : `
        const formattedDate = `${dayName} : ${day} : ${month} : ${year}`;
        const entityIcons = this.config?.entity_icon || [];
        this.config?.value_entity || [];
        const weatherEntity = this.config?.entity;
        // Verifica che l'entità di stato del meteo e del sole siano valide
        if (!weatherEntity || !this.hass.states[weatherEntity]) {
            console.error("Invalid or not found weather entity:", weatherEntity);
            return x ``;
        }
        const weatherState = this.hass.states[weatherEntity].state; // Stato attuale del meteo
        const weatherTemperature = this.hass.states[weatherEntity].attributes.temperature;
        const sunEntity = this.hass.states["sun.sun"];
        if (!sunEntity) {
            console.error("Entità sun.sun non trovata");
            return x ``;
        }
        // Determina se è giorno o notte
        const isday = sunEntity?.state === "above_horizon";
        // Determina l'icona del meteo
        let nowWeatherIcon;
        if (weatherState === "partlycloudy") {
            nowWeatherIcon = isday ? "partlycloudy" : "partlycloudy-night"; // Usa isday per determinare l'icona
        }
        else {
            nowWeatherIcon = weatherState; // Per tutti gli altri stati
        }
        const shouldAlternate = this.config?.value_entity && this.config?.calendars;
        const showEntityState = Math.floor((Date.now() / 7000) % 2) === 0;
        return x `
      <ha-card id="dynamic-card" style="padding: 30px;">
        <div class="main-grid">
          ${this.cg_alert ? x ` <div class="cg-alert"></div> ` : ""}
          <div id="icon-state-div" class="icon-state-div-class">
            ${entityIcons.length > 0
            ? entityIcons.map((entityConfig) => {
                // Estrai l'ID dell'entità e l'icona personalizzata
                const entityId = entityConfig.entity;
                const customIcon = entityConfig.icon;
                // Ottieni lo stato dell'entità da Home Assistant
                const entityState = this.hass.states[entityId];
                // Controlla se l'entità esiste e il suo stato è "on"
                if (!entityState || entityState.state !== "on") {
                    return ""; // Non renderizzare nulla se l'entità non è "on"
                }
                // Usa l'icona configurata oppure quella predefinita di Home Assistant
                const icon = customIcon || entityState.attributes.icon;
                return x `
                    <ha-icon
                      .icon="${icon}"
                      style="margin: 0 8px; font-size: 24px;"
                      title="${entityState.attributes.friendly_name ||
                    entityId}"
                    ></ha-icon>
                  `;
            })
            : x `<div>No entities configured or active</div>`}
          </div>

          <div id="date-time">
            <div class="time">
              ${currentHour}
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

          <div class="now-icon">
            <img
              src="https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/now_icon/${nowWeatherIcon}.svg"
            />
          </div>

          <div class="div-temp">
            ${this.config?.internal_temperature
            ? (() => {
                // Calcola internalTemperatureState se internal_temperature è configurato
                const internalTemperature = this.config?.internal_temperature || "";
                const internalTemperatureState = internalTemperature && this.hass.states[internalTemperature]
                    ? this.hass.states[internalTemperature].state
                    : null; // Valore predefinito se non è definito o non esiste
                // Ritorna l'SVG con il valore calcolato
                return x `
                    <svg
                      version="1.1"
                      id="Ñëîé_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1152.78 354.73"
                      style="enable-background:new 0 0 1152.78 354.73; height:6vh;"
                      xml:space="preserve"
                    >
                      <style type="text/css">
                        .st0 {
                          fill: #757575;
                        }
                        .st1 {
                          font-family: "bw_font";
                          font-weight: bold;
                        }
                        .st2 {
                          font-size: 180px;
                        }
                      </style>
                      <g>
                        <path
                          class="st0"
                          d="M1134.59,158.27c1.24,1.14,1.56,2.51,0.97,4.07c-0.56,1.48-2.01,2.44-3.59,2.44h-29.34
  c-16.57,0-30,13.43-30,30v24.55c0,4.16,3.37,7.52,7.52,7.52l0,0c4.16,0,7.52-3.37,7.52-7.52v-24.55c0-8.25,6.69-14.94,14.94-14.94
  h29.43c17.14,0,25.35-21.04,12.74-32.65L853.18,8.75c-3.6-3.31-8.16-4.96-12.73-4.96c-4.57,0-9.14,1.65-12.74,4.97L555.94,147.19
  c-12.6,11.61-4.39,32.65,12.74,32.65h33.18c8.25,0,14.94,6.69,14.94,14.94v138.86c0,8.47,8.83,15.24,17.26,15.24h69.4
  c4.16,0,7.52-3.37,7.52-7.52l0,0c0-4.16-3.37-7.52-7.52-7.52h-69.4c-0.68,0-1.7-0.52-2.21-0.99V194.78c0-16.57-13.43-30-30-30
  h-33.09c-1.59,0-3.04-0.96-3.6-2.44c-0.59-1.56-0.25-2.93,0.98-4.07L837.9,19.83c0.89-0.82,1.88-0.99,2.55-0.99
  c0.67,0,1.65,0.17,2.54,0.99"
                        />
                      </g>
                      <text
                        transform="matrix(1 0 0 1 0.1313 290.461)" 
                        class="st0 st1 st2"
                      >
                        ${weatherTemperature}°
                      </text>
                      <text
                        transform="matrix(1 0 0 1 660.559 290.461)"
                        class="st0 st1 st2"
                      >
                        ${internalTemperatureState}°
                      </text>
                    </svg>
                  `;
            })()
            : x `<div class="ext-temp">${weatherTemperature}°</div>`}
          </div>

          ${shouldAlternate
            ? x `
                <div
                  style="grid-area: cal-event;align-self: end;"
                  class="${showEntityState ? "visible" : "hidden"}"
                >
                  ${showEntityState ? this.renderEntityState() : ""}
                </div>
                <div
                  style="grid-area: cal-event;align-self: end;"
                  class="${!showEntityState ? "visible" : "hidden"}"
                >
                  ${!showEntityState ? this.renderEvents() : ""}
                </div>
              `
            : x `
                ${this.config?.value_entity
                ? x `<div style="grid-area: cal-event;align-self: end;">
                      ${this.renderEntityState()}
                    </div>`
                : ""}
                ${this.config?.calendars
                ? x `<div style="grid-area: cal-event;align-self: end;">
                      ${this.renderEvents()}
                    </div>`
                : ""}
              `}

          <div style="grid-area: tline; margin-top: 7vh;">
            <div class="gradient-bar"></div>
            <div class="timeline">
              ${limitedForecast.length > 0
            ? limitedForecast.map((f, index) => {
                const showCondition = f.condition !== previousCondition;
                previousCondition = f.condition; // Aggiorna la condizione precedente
                const icon = ScreensaverCard_1.weatherIconsDay[f.condition] || "unknown";
                const iconUrl = `https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${icon}.svg`;
                const temperatureClass = f.temperature < 10
                    ? "cold"
                    : f.temperature > 25
                        ? "hot"
                        : "";
                return x `
                      <div class="timeline-item">
                        ${showCondition
                    ? x `
                              <div class="condition">
                                <img src="${iconUrl}" alt="${f.condition}" />
                              </div>
                            `
                    : x `<div class="condition"></div>`}
                        <div class="details">
                          <div class="hour">
                            ${new Date(f.datetime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
                          </div>
                          <div class="temperature ${temperatureClass}">
                            ${f.temperature}°C
                          </div>
                          ${f.precipitation !== 0
                    ? x `<div class="precipitation">
                                ${f.precipitation} mm
                              </div>`
                    : ""}
                        </div>
                      </div>
                    `;
            })
            : x `<div>No hourly forecast available</div>`}
            </div>
          </div>
        </div>
      </ha-card>
    `;
    }
};
ScreensaverCard.weatherIconsDay = {
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
__decorate([
    n$1({ attribute: false }),
    __metadata("design:type", Object)
], ScreensaverCard.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false }),
    __metadata("design:type", Object)
], ScreensaverCard.prototype, "config", void 0);
__decorate([
    t(),
    __metadata("design:type", Boolean)
], ScreensaverCard.prototype, "cg_alert", void 0);
__decorate([
    t(),
    __metadata("design:type", Object)
], ScreensaverCard.prototype, "hourlyForecastEvent", void 0);
__decorate([
    t(),
    __metadata("design:type", Promise)
], ScreensaverCard.prototype, "subscribedToHourlyForecast", void 0);
__decorate([
    t(),
    __metadata("design:type", Array)
], ScreensaverCard.prototype, "events", void 0);
ScreensaverCard = ScreensaverCard_1 = __decorate([
    e$1("screensaver-card"),
    __metadata("design:paramtypes", [])
], ScreensaverCard);

export { ScreensaverCard };
