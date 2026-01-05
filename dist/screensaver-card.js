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

const CARD_VERSION = "v@SCREENSAVERL_CARD_VERSION_PLACEHOLDER@";
const CARD_TAG_NAME = "screensaver-card";
const EDITOR_CARD_TAG_NAME = "screensaver-editor";

var styles = i$2 `

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

// Controlla se lo stato dell'entità è "attivo"
function isStateOn(entityState) {
    if (!entityState)
        return false;
    const state = entityState.state.toLowerCase();
    const numericState = Number(state);
    const activeStringStates = [
        'on', 'open', 'opening', 'closing', 'cleaning', 'true', 'idle', 'home',
        'playing', 'paused', 'locked', 'occupied', 'available', 'running', 'active',
        'connected', 'online', 'mowing', 'starting', 'heat', 'cool', 'dry',
        'heat_cool', 'fan_only', 'auto', 'alarm'
    ];
    return activeStringStates.includes(state) || numericState > 0;
}
// Restituisce l'icona per una entità di tipo "cover"
function coverIcon(deviceClass) {
    switch (deviceClass) {
        case 'awning': return "mdi:awning-outline";
        case 'blind': return "mdi:blinds-open";
        case 'curtain': return "mdi:curtains-open";
        case 'damper': return "mdi:window-shutter-open";
        case 'door': return "mdi:door-open";
        case 'garage': return "mdi:garage-open";
        case 'gate': return "mdi:gate-open";
        case 'shade': return "mdi:roller-shade";
        case 'shutter': return "mdi:window-shutter-open";
        case 'window': return "mdi:window-open";
        default: return "mdi:window-shutter-open";
    }
}
// Restituisce l'icona per una entità di tipo "binary_sensor"
function binarySensorIcon(deviceClass) {
    switch (deviceClass) {
        case 'battery': return "mdi:battery-outline";
        case 'motion': return "mdi:motion-sensor";
        case 'door': return "mdi:door-open";
        case 'garage_door': return "mdi:garage-open";
        default: return "mdi:checkbox-marked-circle";
    }
}
// Restituisce l'icona per una entità di tipo "sensor"
function sensorIcon(deviceClass, state) {
    switch (deviceClass) {
        case 'battery':
            if (state >= 90)
                return "mdi:battery";
            if (state >= 80)
                return "mdi:battery-90";
            if (state >= 70)
                return "mdi:battery-80";
            if (state >= 60)
                return "mdi:battery-70";
            if (state >= 50)
                return "mdi:battery-60";
            if (state >= 40)
                return "mdi:battery-50";
            if (state >= 30)
                return "mdi:battery-40";
            if (state >= 20)
                return "mdi:battery-30";
            if (state >= 10)
                return "mdi:battery-20";
            return "mdi:battery-alert";
        case 'humidity': return "mdi:water-percent";
        case 'temperature': return "mdi:thermometer";
        default: return "mdi:eye";
    }
}
// Recupera un attributo specifico di un'entità
function getEntityAttribute(hass, entity, attribute) {
    const entityState = hass.states[entity];
    return entityState?.attributes?.[attribute] ?? '';
}
// Controlla se un'entità appartiene a un tipo specifico
function isEntityType(entity, entityType) {
    return entity?.startsWith(entityType + ".") ?? false;
}
// Icone di default per entità generiche
const defaultIcons = {
    alarm_control_panel: 'mdi:shield',
    alert: "mdi:alert",
    automation: "mdi:playlist-play",
    calendar: "mdi:calendar",
    camera: "mdi:video",
    climate: "mdi:thermostat",
    device_tracker: "mdi:account",
    fan: "mdi:fan",
    light: "mdi:lightbulb",
    lock: 'mdi:lock',
    media_player: 'mdi:speaker',
    person: "mdi:account",
    plant: "mdi:flower",
    remote: "mdi:remote",
    scene: "mdi:palette",
    script: "mdi:file-document",
    switch: "mdi:flash",
    timer: "mdi:timer",
    vacuum: "mdi:robot-vacuum",
    weather: "mdi:white-balance-sunny",
    sun: "mdi:white-balance-sunny",
};

let ScreesaverEditor = class ScreesaverEditor extends s {
    constructor() {
        super(...arguments);
        this._valueEntities = []; // Stato per le entità value_entity
        this._entityIcons = []; // Stato locale per entity_icon
    }
    setConfig(config) {
        this._config = config;
        this._valueEntities = config?.value_entity || [];
        this._entityIcons = config?.entity_icon || []; // Inizializza _entityIcons con i dati presenti in config
    }
    static get styles() {
        return i$2 `
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
            return x `<div class="heading">No configuration available</div>`;
        }
        return x `
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
    _renderHideBarCheckbox() {
        const isHidden = this._config.hide_bar ?? false;
        return x `
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
    _toggleHideBar(event) {
        const isChecked = event.target.checked;
        this._config = {
            ...this._config,
            hide_bar: isChecked,
        };
        this._dispatchConfigUpdate();
    }
    _updateNumberOfEvents(event) {
        const input = event.target;
        const value = parseInt(input.value, 10);
        if (value > 0) {
            this._config = {
                ...this._config,
                number_calendar_events: value,
            };
            this._dispatchConfigUpdate();
        }
    }
    _renderCalendarSelector() {
        const calendarEntities = this._getCalendarEntities();
        return x `
      <div class="select-container">
        <div class="heading">Add Calendar</div>
        <div style="display: flex; align-items: center;">
          <select 
            id="calendar_select" 
            class="select-item"
          >
            <option value="">-- Select a Calendar --</option>
            ${calendarEntities.map((entityId) => x `<option value="${entityId}">${this.hass.states[entityId]?.attributes?.friendly_name || entityId}</option>`)}
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
    _renderCalendarList() {
        return x `
      <div style="margin-top: 1ch;">
        ${(this._config.calendars || []).length > 0
            ? x `
              <ul>
                ${(this._config.calendars || []).map((calendar) => x `
                    <div class="val_sel">
                      <span>${this.hass.states[calendar]?.attributes?.friendly_name || calendar}</span>
                      <ha-icon
                        icon="mdi:delete"
                        @click=${() => this._removeCalendar(calendar)}
                      ></ha-icon>
                    </div>
                  `)}
              </ul>
            `
            : x `<p>No calendars selected.</p>`}
      </div>
    `;
    }
    _addCalendar() {
        const selectElement = this.shadowRoot.getElementById("calendar_select");
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
    _removeCalendar(calendarId) {
        const calendars = (this._config.calendars || []).filter((calendar) => calendar !== calendarId);
        this._config = {
            ...this._config,
            calendars,
        };
        this._dispatchConfigUpdate();
    }
    _getCalendarEntities() {
        return Object.keys(this.hass.states).filter((entityId) => entityId.startsWith("calendar."));
    }
    _renderWeatherSelector() {
        const weatherEntities = this._getWeatherEntities();
        return x `
      <div class="select-container">
        <div class="heading">Select Weather Entity</div>
        <select @change=${this._updateWeatherEntity} class="select-weather">
          <option value="" ?selected=${!this._config?.entity}>
            -- Select an entity --
          </option>
          ${weatherEntities.map((entity) => x `<option
                value=${entity}
                ?selected=${this._config?.entity === entity}
              >
                ${entity}
              </option>`)}
        </select>
      </div>
    `;
    }
    _renderValueEntitySelector() {
        const allEntities = Object.keys(this.hass.states); // Recupera tutte le entità disponibili
        return x `
      <div class="select-container">
        <div class="heading">Add Entities to value_entity</div>
        <div style="display: flex; align-items: center;">
          <select 
            id="value_entity_select" 
            class="select-item"
          >
            <option value="">-- Select an Entity --</option>
            ${allEntities.map((entityId) => x `<option value="${entityId}">${entityId}</option>`)}
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
    _renderValueEntityList() {
        return x `
      <div style="margin-top: 1ch;">
        ${this._valueEntities.length > 0
            ? x `
              <ul>
                ${this._valueEntities.map((entity) => x `
                    <div class="val_sel">
                      <span>${entity}</span>
                      <ha-icon
                        icon="mdi:delete"
                        @click=${() => this._removeEntityFromValueEntity(entity)}
                      ></ha-icon>
                    </div>
                  `)}
              </ul>
            `
            : x `<p>No entities selected.</p>`}
      </div>
    `;
    }
    _getWeatherEntities() {
        return Object.keys(this.hass.states).filter((entityId) => entityId.startsWith("weather."));
    }
    _updateWeatherEntity(event) {
        const selectedEntity = event.target.value;
        this._config = { ...this._config, entity: selectedEntity };
        this._dispatchConfigUpdate();
    }
    _addEntityToValueEntity() {
        const selectElement = this.shadowRoot.getElementById("value_entity_select");
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
    _removeEntityFromValueEntity(entityId) {
        this._valueEntities = this._valueEntities.filter((id) => id !== entityId);
        this._config = { ...this._config, value_entity: this._valueEntities };
        this._dispatchConfigUpdate();
    }
    _renderEntityIconSelector() {
        const allEntities = Object.keys(this.hass.states); // Lista di tutte le entità disponibili
        return x `
      <div class="select-container">
        <div class="heading">Add Entities for entity_icon</div>
        <div style="display: flex; align-items: center;">
          <select id="entity_icon_select" class="select-item">
            <option value="">-- Select an Entity --</option>
            ${allEntities.map((entityId) => x `<option value=${entityId}>${entityId}</option>`)}
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
        const selectElement = this.shadowRoot.getElementById("entity_icon_select");
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
        return x `
      <div style="margin-top: 1ch;">
        ${this._entityIcons.length > 0
            ? x `
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
                }
                else if (isEntityType(entityId, "cover")) {
                    icon = coverIcon(deviceClass);
                }
                else if (isEntityType(entityId, "binary_sensor")) {
                    icon = binarySensorIcon(deviceClass);
                }
                else if (isEntityType(entityId, "sensor")) {
                    const state = Number(entityState?.state) || 0;
                    icon = sensorIcon(deviceClass, state);
                }
                else {
                    icon =
                        defaultIcons[entityType] ||
                            getEntityAttribute(this.hass, entityId, "icon") ||
                            "mdi:eye";
                }
                return x `
                    <li>
                      <div style="display: flex; flex-direction: column;">
                        <!-- Nome entità -->
                        <div style="display: flex; align-items: center;">
                          <span>${entityId}</span>
                          <ha-icon
                            icon="mdi:delete"
                            style="margin-left: auto; cursor: pointer;"
                            @click=${() => this._removeEntityFromEntityIcon(index)}
                          ></ha-icon>
                        </div>

                        <!-- Icon Picker -->
                        <div class="icon-picker" style="margin-top: 0.5ch;">
                          <ha-icon-picker
                            label="Select an icon"
                            .value=${customIcon || icon}
                            @value-changed=${(e) => this._updateEntityIcon(index, e.detail.value)}
                          ></ha-icon-picker>
                        </div>
                      </div>
                    </li>
                  `;
            })}
              </ul>
            `
            : x `<p>No entities added yet.</p>`}
      </div>
    `;
    }
    _removeEntityFromEntityIcon(index) {
        this._entityIcons = this._entityIcons.filter((_, i) => i !== index);
        this._updateEntityIconConfig();
    }
    _changeEntityIcon(index) {
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
    _updateEntityIcon(index, newIcon) {
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
        return x `
    <div class="select-container" style="margin-top: 2ch;">
      <div class="heading">Select Internal Temperature Sensor</div>

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s) => s.label ?? ""} 
        @value-changed=${this._onInternalTemperatureChanged}
      ></ha-form>

    </div>
  `;
    }
    _onInternalTemperatureChanged(ev) {
        const value = ev.detail.value?.internal_temperature;
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
        }
        else {
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
        return x `
    <div class="select-container" style="margin-top: 2ch;">
      <div class="heading">Select External Temperature Sensor</div>

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s) => s.label ?? ""}  // <— NON usare fallback al name
        @value-changed=${this._onExternalTemperatureChanged}
      ></ha-form>
    </div>
  `;
    }
    _onExternalTemperatureChanged(ev) {
        const value = ev.detail.value?.external_temperature;
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
        }
        else {
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
        return x `
    <div class="select-container" style="margin-top: 2ch;">
      <div class="heading">Select Local Rain Sensor</div>

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s) => s.label ?? ""}  // <— NON usare fallback al name
        @value-changed=${this._onRainSensorChanged}
      ></ha-form>

      
    </div>
  `;
    }
    _onRainSensorChanged(ev) {
        const value = ev.detail.value?.rain_sensor;
        if (value) {
            this._config = { ...this._config, rain_sensor: value };
        }
        else {
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
        return x `
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
            ? x `
              <div style="margin-top: 1ch;">
                Current: <strong>${this._config.landing_page}</strong>
              </div>
            `
            : ""}
      </div>
    `;
    }
    _updateLandingPage(event) {
        const inputElement = event.target;
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
        const inputElement = this.shadowRoot.getElementById("landing_page_input");
        if (inputElement) {
            inputElement.value = "";
        }
    }
};
__decorate([
    n$1({ attribute: false }),
    __metadata("design:type", Object)
], ScreesaverEditor.prototype, "hass", void 0);
__decorate([
    t(),
    __metadata("design:type", Object)
], ScreesaverEditor.prototype, "_config", void 0);
__decorate([
    t(),
    __metadata("design:type", Array)
], ScreesaverEditor.prototype, "_valueEntities", void 0);
ScreesaverEditor = __decorate([
    e$1(EDITOR_CARD_TAG_NAME)
], ScreesaverEditor);

var ScreensaverCard_1;
const line1 = "  Screensaver Card  ";
const line2 = `  version: ${CARD_VERSION}  `;
/* eslint no-console: 0 */
console.info(`%c${line1}\n%c${line2}`, "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray");
// Allow this card to appear in the card chooser menu
const windowWithCards = window;
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
    type: CARD_TAG_NAME,
    name: "Screensaver",
    preview: true,
    description: "screensaver editor",
});
let ScreensaverCard = ScreensaverCard_1 = class ScreensaverCard extends s {
    loadLocalFont(scriptDirectory, path) {
        const style = document.createElement("style");
        style.textContent = `
      @font-face {
        font-family: 'bw_font';
        src: url('${scriptDirectory}/BwModelica-HairlineExpanded.otf') format('truetype');
        // src: url('/local/BwModelica-HairlineExpanded.otf') format('truetype');
      }

     
    `;
        document.head.appendChild(style);
    }
    static getConfigElement() {
        // Create and return an editor element
        return document.createElement(EDITOR_CARD_TAG_NAME);
    }
    static get styles() {
        return styles;
    }
    constructor() {
        super();
        this.cg_alert = false; // Stato per gestire l'evento cg_alert
        this.events = []; // Array per salvare gli eventi
        this._isEditor = false;
        this.calendars = []; // Variabile per memorizzare i calendari
        this.originalHeader = null;
        const scriptPath = new URL(import.meta.url).pathname;
        const scriptDirectory = scriptPath.substring(0, scriptPath.lastIndexOf("/"));
        this.loadLocalFont(scriptDirectory, scriptPath);
    }
    _isInEditor() {
        function isInEditor(e) {
            return ((e.parentElement?.tagName?.toLowerCase() === "hui-card" &&
                "preview" in (e.parentElement?.attributes ?? [])) ||
                (e.parentElement?.tagName?.toLowerCase() === "hui-section" &&
                    "preview" in (e.parentElement?.attributes ?? [])) ||
                e.parentElement?.tagName?.toLowerCase() === "hui-card-preview" ||
                (e.parentElement != null && isInEditor(e.parentElement)) ||
                (e.parentNode?.toString() == "[object ShadowRoot]" &&
                    isInEditor(e.getRootNode().host)));
        }
        return isInEditor(this);
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
        const Nevents = this.config?.number_calendar_events || 5;
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
                .slice(0, Nevents);
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
        const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Solo data senza orario
        // Filtra gli eventi con summary "cg_alert"
        const cgAlertEvents = events.filter((event) => event.summary === "cg_alert");
        const alertEvent = cgAlertEvents.find((event) => {
            const start = event.start?.dateTime || event.start?.date;
            const end = event.end?.dateTime || event.end?.date;
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                if (event.start?.date && event.end?.date) {
                    // Controllo solo sulla data (inclusivo per eventi tutto il giorno)
                    return startDate <= nowDate && nowDate <= endDate;
                }
                else if (event.start?.dateTime && event.end?.dateTime) {
                    // Controllo data e orario
                    return startDate <= now && now <= endDate;
                }
            }
            return false;
        });
        // Imposta cg_alert solo se si è nel giorno dell'evento o nell'intervallo orario
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
        this._isEditor = this._isInEditor(); // Verifica solo al primo aggiornamento
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
        if (this.config?.hide_bar) {
            this.activateKioskMode();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribeHourlyForecast();
        if (this.config?.hide_bar) {
            this.restoreOriginalState();
        }
    }
    activateKioskMode() {
        // Imposta il padding del div con id "view"
        const viewDiv = document
            .querySelector("body > home-assistant")?.shadowRoot
            ?.querySelector("home-assistant-main")?.shadowRoot
            ?.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace")?.shadowRoot
            ?.querySelector("hui-root")?.shadowRoot
            ?.querySelector("#view");
        if (viewDiv) {
            viewDiv.style.setProperty("padding", "0px");
            console.log("Padding del div '#view' impostato a 0px.");
        }
        else {
            console.error("Div con id '#view' non trovato.");
        }
        // Imposta la larghezza del drawer
        const haDrawer = document
            .querySelector("body > home-assistant")?.shadowRoot
            ?.querySelector("home-assistant-main")?.shadowRoot
            ?.querySelector("ha-drawer");
        if (haDrawer) {
            haDrawer.style.setProperty("--mdc-drawer-width", "0px");
            console.log("Stile '--mdc-drawer-width' impostato a 0px.");
        }
        else {
            console.error("Elemento 'ha-drawer' non trovato.");
        }
        // Imposta lo stile display:none per il div.header
        const headerDiv = document
            .querySelector("body > home-assistant")?.shadowRoot
            ?.querySelector("home-assistant-main")?.shadowRoot
            ?.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace")?.shadowRoot
            ?.querySelector("hui-root")?.shadowRoot
            ?.querySelector("div > div.header");
        if (headerDiv) {
            headerDiv.style.setProperty("display", "none");
            console.log("Stile 'display: none' applicato a 'div.header'.");
        }
        else {
            console.error("Elemento 'div.header' non trovato.");
        }
    }
    restoreOriginalState() {
        // Ripristina il padding del div con id "view"
        const viewDiv = document
            .querySelector("body > home-assistant")?.shadowRoot
            ?.querySelector("home-assistant-main")?.shadowRoot
            ?.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace")?.shadowRoot
            ?.querySelector("hui-root")?.shadowRoot
            ?.querySelector("#view");
        if (viewDiv) {
            viewDiv.style.setProperty("padding", "calc(var(--header-height) + env(safe-area-inset-top))");
            console.log("Padding del div '#view' ripristinato.");
        }
        // Ripristina la larghezza del drawer
        const haDrawer = document
            .querySelector("body > home-assistant")?.shadowRoot
            ?.querySelector("home-assistant-main")?.shadowRoot
            ?.querySelector("ha-drawer");
        if (haDrawer) {
            haDrawer.style.setProperty("--mdc-drawer-width", "calc(256px + env(safe-area-inset-left))");
            console.log("Stile '--mdc-drawer-width' ripristinato.");
        }
        // Ripristina lo stile display del div.header
        const headerDiv = document
            .querySelector("body > home-assistant")?.shadowRoot
            ?.querySelector("home-assistant-main")?.shadowRoot
            ?.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace")?.shadowRoot
            ?.querySelector("hui-root")?.shadowRoot
            ?.querySelector("div > div.header");
        if (headerDiv) {
            headerDiv.style.removeProperty("display");
            console.log("Stile 'display' ripristinato per 'div.header'.");
        }
        else {
            console.error("Elemento 'div.header' non trovato per il ripristino.");
        }
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
                let state = entityState.state;
                // Controlla se lo stato è un numero valido e arrotonda
                const numericState = parseFloat(state);
                if (!isNaN(numericState) && isFinite(numericState)) {
                    state = numericState.toFixed(1); // Arrotonda a un solo decimale
                }
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
                    ${event.start?.dateTime && event.end?.dateTime
                ? x `${this.formatEventDate(event.start)} -
                        ${this.formatEventDate(event.end)}`
                : x `${event.start?.date || ""}`}
                  </div>
                </div>
              `)
            : x ``}
      </div>
    `;
    }
    navigateTo(path) {
        if (this.hass && this.hass.navigate) {
            this.hass.navigate(path);
        }
        else {
            window.history.pushState(null, "", path);
            window.dispatchEvent(new Event("location-changed"));
        }
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
        const weatherEntity = this.config?.entity;
        // Verifica che l'entità di stato del meteo e del sole siano valide
        if (!weatherEntity || !this.hass.states[weatherEntity]) {
            console.error("Invalid or not found weather entity:", weatherEntity);
            return x ``;
        }
        const weatherState = this.hass.states[weatherEntity].state; // Stato attuale del meteo
        const unifOfMesurament = this.hass.states[weatherEntity].attributes.temperature_unit;
        const rainUnit = this.hass.states[weatherEntity].attributes.precipitation_unit;
        const weatherTemperature = Number(this.config.external_temperature &&
            this.hass.states[this.config.external_temperature]
            ? this.hass.states[this.config.external_temperature].state
            : this.hass.states[weatherEntity]?.attributes?.temperature).toFixed(1);
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
            nowWeatherIcon = isday ? "partlycloudy" : "partlycloudy-night";
        }
        else if (this.config.rain_sensor &&
            this.hass.states[this.config.rain_sensor]?.state === "raining") {
            nowWeatherIcon = "raining";
        }
        else {
            nowWeatherIcon = weatherState;
        }
        const shouldAlternate = this.config?.value_entity && this.config?.calendars;
        const showEntityState = Math.floor((Date.now() / 7000) % 2) === 0;
        return x `
      <ha-card
        id="dynamic-card"
        style="padding: 30px;"
        class="${this._isEditor ? "ineditor" : ""}"
        @click=${() => this.config.landing_page
            ? this.navigateTo(this.config.landing_page)
            : null}
      >
        ${this.cg_alert ? x ` <div class="cg-alert"></div> ` : ""}
        <div id="icon-state-div" class="icon-state-div-class">
          ${entityIcons.length > 0
            ? entityIcons.map((entityConfig) => {
                // Estrai l'ID dell'entità e l'icona personalizzata
                const entityId = entityConfig.entity;
                const customIcon = entityConfig.icon;
                // Ottieni lo stato dell'entità da Home Assistant
                const entityState = this.hass.states[entityId];
                if (!entityState || !isStateOn(entityState)) {
                    return ""; // Non renderizzare nulla se l'entità non è attiva
                }
                // Determina il tipo dell'entità e il device_class
                const entityType = entityId.split(".")[0]; // Ottieni il tipo dell'entità (es: sensor, cover)
                entityState.attributes.device_class;
                // Icona finale da visualizzare
                let icon;
                if (customIcon) {
                    icon = customIcon; // Usa l'icona configurata
                }
                else if (isEntityType(entityId, "cover")) {
                    const deviceClass = getEntityAttribute(this.hass, entityId, "device_class");
                    icon = coverIcon(deviceClass);
                }
                else if (isEntityType(entityId, "binary_sensor")) {
                    const deviceClass = getEntityAttribute(this.hass, entityId, "device_class");
                    icon = binarySensorIcon(deviceClass);
                }
                else if (isEntityType(entityId, "sensor")) {
                    const deviceClass = getEntityAttribute(this.hass, entityId, "device_class");
                    const state = Number(this.hass.states[entityId]?.state) || 0;
                    icon = sensorIcon(deviceClass, state);
                }
                else {
                    icon =
                        defaultIcons[entityType] ||
                            getEntityAttribute(this.hass, entityId, "icon") ||
                            "mdi:eye";
                }
                return x `
                  <ha-icon
                    .icon="${icon}"
                    style="margin: 0 8px; font-size: 24px;"
                    title="${entityState.attributes.friendly_name || entityId}"
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
                const temperatureClass = unifOfMesurament === "°C"
                    ? f.temperature < 10
                        ? "cold"
                        : f.temperature > 25
                            ? "hot"
                            : ""
                    : unifOfMesurament === "°F"
                        ? f.temperature < 50
                            ? "cold"
                            : f.temperature > 77
                                ? "hot"
                                : ""
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
                          ${f.temperature}${unifOfMesurament}
                        </div>
                        ${f.precipitation !== 0
                    ? x `<div class="precipitation">
                              ${f.precipitation} ${rainUnit}
                            </div>`
                    : ""}
                      </div>
                    </div>
                  `;
            })
            : x `<div>No hourly forecast available</div>`}
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
