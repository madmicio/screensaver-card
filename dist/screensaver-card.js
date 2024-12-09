function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class o{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(i,t,s)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var c;const a=window,h=a.trustedTypes,d=h?h.emptyScript:"",u=a.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},f="finalized";class y extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $;y[f]=!0,y.elementProperties=new Map,y.elementStyles=[],y.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:y}),(null!==(c=a.reactiveElementVersions)&&void 0!==c?c:a.reactiveElementVersions=[]).push("1.6.3");const m=window,_=m.trustedTypes,b=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,E=`<${x}>`,S=document,C=()=>S.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,P="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,z=/>/g,M=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,N=/"/g,O=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),j=new WeakMap,I=S.createTreeWalker(S,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let l,c,a=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===U?"!--"===c[1]?r=T:void 0!==c[1]?r=z:void 0!==c[2]?(O.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=M):void 0!==c[3]&&(r=M):r===M?">"===c[0]?(r=null!=n?n:U,a=-1):void 0===c[1]?a=-2:(a=r.lastIndex-c[2].length,l=c[1],r=void 0===c[3]?M:'"'===c[3]?N:F):r===N||r===F?r=M:r===T||r===z?r=U:(r=M,n=void 0);const d=r===M&&t[e+1].startsWith("/>")?" ":"";o+=r===U?i+E:a>=0?(s.push(l),i.slice(0,a)+A+i.slice(a)+w+d):i+w+(-2===a?(s.push(void 0),e):d)}return[B(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[c,a]=V(t,e);if(this.el=W.createElement(c,i),I.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=I.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(A)||e.startsWith(w)){const i=a[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+A).split(w),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?Y:J})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),I.nextNode(),l.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===x)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)l.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,s){var n,o,r,l;if(e===L)return e;let c=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const a=k(e)?void 0:e._$litDirective$;return(null==c?void 0:c.constructor)!==a&&(null===(o=null==c?void 0:c._$AO)||void 0===o||o.call(c,!1),void 0===a?c=void 0:(c=new a(t),c._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=c:i._$Cl=c),void 0!==c&&(e=q(t,c._$AS(t,e.values),c,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);I.currentNode=n;let o=I.nextNode(),r=0,l=0,c=s[0];for(;void 0!==c;){if(r===c.index){let e;2===c.type?e=new G(o,o.nextSibling,this,t):1===c.type?e=new c.ctor(o,c.name,c.strings,this,t):6===c.type&&(e=new tt(o,this,t)),this._$AV.push(e),c=s[++l]}r!==(null==c?void 0:c.index)&&(o=I.nextNode(),r++)}return I.currentNode=S,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{constructor(t,e,i,s){var n;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),k(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>H(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=W.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new K(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new W(t)),e}T(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new G(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,s,n){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=q(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=q(this,s[i+r],e,r),l===L&&(l=this._$AH[r]),o||(o=!k(l)||l!==this._$AH[r]),l===D?t=D:t!==D&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const Q=_?_.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends J{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:D)===L)return;const s=this._$AH,n=t===D&&s!==D||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==D&&(s===D||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=m.litHtmlPolyfillSupport;null==et||et(W,G),(null!==($=m.litHtmlVersions)&&void 0!==$?$:m.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new G(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return L}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:nt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):rt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ct(t){return lt({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var at,ht;null===(at=window.HTMLSlotElement)||void 0===at||at.prototype.assignedElements;let dt=ht=class extends nt{loadLocalFont(t,e){const i=document.createElement("style");i.textContent=`\n      @font-face {\n        font-family: 'displayFont';\n        src: url('${t}/local/BwModelica-HairlineExpanded.otf') format('truetype');\n      }\n\n     \n    `,document.head.appendChild(i)}constructor(){super();const t=new URL(import.meta.url).pathname,e=t.substring(0,t.lastIndexOf("/"));this.loadLocalFont(e,t),console.log("Font path:",`${e}/DS-DIGII.TTF`)}static get styles(){return r`
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
    `}setConfig(t){if(!t.entity)throw new Error("Invalid configuration");this.config=t}getCardSize(){return 15}async subscribeToHourlyForecast(){this.unsubscribeHourlyForecast(),this.isConnected&&this.hass&&this.config&&this.config.entity&&this.hassSupportsForecastEvents()&&this.config.entity.startsWith("weather.")&&(this.subscribedToHourlyForecast=this.hass.connection.subscribeMessage((t=>this.hourlyForecastEvent=t),{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:this.config.entity}))}unsubscribeHourlyForecast(){this.subscribedToHourlyForecast&&(this.subscribedToHourlyForecast.then((t=>t())),this.subscribedToHourlyForecast=void 0)}hassSupportsForecastEvents(){var t,e,i;return!!(null===(i=null===(e=null===(t=this.hass)||void 0===t?void 0:t.services)||void 0===e?void 0:e.weather)||void 0===i?void 0:i.get_forecasts)}getHourlyForecast(){var t;const e=null===(t=this.hourlyForecastEvent)||void 0===t?void 0:t.forecast;return null!=e?e:[]}connectedCallback(){super.connectedCallback(),this.subscribeToHourlyForecast()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeHourlyForecast()}render(){var t,e,i,s;const n=this.getHourlyForecast().slice(0,16);let o="";const r=(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),l=(null===(e=null===(t=this.hass)||void 0===t?void 0:t.locale)||void 0===e?void 0:e.language)||"en-US",c=new Date,a=`${c.toLocaleDateString(l,{weekday:"short"})} : ${c.toLocaleDateString(l,{day:"2-digit"})} : ${c.toLocaleDateString(l,{month:"2-digit"})} : ${c.toLocaleDateString(l,{year:"2-digit"})}`,h=(null===(i=this.config)||void 0===i?void 0:i.entity_icon)||[],d=(null===(s=this.config)||void 0===s?void 0:s.value_entity)||[];return R`
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
        ${d.length>0?d.map((t=>{const e=this.hass.states[t];if(!e)return R`<div>Entità non trovata: ${t}</div>`;const i=e.attributes.friendly_name||t,s=e.state,n=e.attributes.unit_of_measurement||"";return R`
                <div class="entity">
                  <span class="friendly-name">${i}</span>
                  <div class="value">
                    <span class="state">${s}</span>
                    <span class="unit">${n}</span>
                  </div>
                </div>
              `})):R`<div>Nessuna entità configurata</div>`}
      </div>




          <div id="date-time">
            <div class="time">${r}</div>
            <div class="date">${a}</div>

          </div>
          
      <div id="box3" class="box">
        ${h.length>0?h.map((t=>{const e=t.entity,i=t.icon,s=this.hass.states[e];if(!s||"on"!==s.state)return"";const n=i||s.attributes.icon;return R`
                <ha-icon
                  .icon="${n}"
                  style="margin: 0 8px; font-size: 24px;"
                  title="${s.attributes.friendly_name||e}"
                ></ha-icon>
              `})):R`<div>Nessuna entità configurata o attiva</div>`}
      </div>


        </div>
        <div class="gradient-bar"></div>
        <div class="timeline">
          ${n.length>0?n.map(((t,e)=>{const i=t.condition!==o;o=t.condition;const s=`https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${ht.weatherIconsDay[t.condition]||"unknown"}.svg`,n=t.temperature<10?"cold":t.temperature>25?"hot":"";return R`
                  <div class="timeline-item">
                    ${i?R`
                          <div class="condition">
                            <img src="${s}" alt="${t.condition}" />
                          </div>
                        `:R`<div class="condition"></div>`}
                    <div class="details">
                      <div class="hour">${new Date(t.datetime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
                      <div class="temperature ${n}">${t.temperature}°C</div>
                      ${0!==t.precipitation?R`<div class="precipitation">${t.precipitation} mm</div>`:""}
                    </div>
                  </div>
                `})):R`<div>Nessuna previsione oraria disponibile</div>`}
        </div>
      </ha-card>
    `}};dt.weatherIconsDay={clear:"day","clear-night":"night",cloudy:"cloudy",fog:"fog",hail:"hail",lightning:"lightning","lightning-rainy":"lightning-rainy",partlycloudy:"partlycloudy",pouring:"pouring",rainy:"rainy",snowy:"snowy","snowy-rainy":"snowy-rainy",sunny:"day",windy:"windy","windy-variant":"windy-variant",exceptional:"!!"},t([lt({attribute:!1})],dt.prototype,"hass",void 0),t([lt({attribute:!1})],dt.prototype,"config",void 0),t([ct()],dt.prototype,"hourlyForecastEvent",void 0),t([ct()],dt.prototype,"subscribedToHourlyForecast",void 0),dt=ht=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("screensaver-card")],dt);export{dt as ScreensaverCard};
