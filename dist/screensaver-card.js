function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class o{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},g="finalized";class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;m[g]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:m}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const $=window,_=$.trustedTypes,b=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,x="?"+A,E=`<${x}>`,S=document,C=()=>S.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,T="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,O=/"/g,M=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),j=new WeakMap,I=S.createTreeWalker(S,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=P;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===P?"!--"===l[1]?r=U:void 0!==l[1]?r=N:void 0!==l[2]?(M.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=null!=n?n:P,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?D:'"'===l[3]?O:z):r===O||r===z?r=D:r===U||r===N?r=P:(r=D,n=void 0);const h=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===P?i+E:c>=0?(s.push(a),i.slice(0,c)+w+i.slice(c)+A+h):i+A+(-2===c?(s.push(void 0),e):h)}return[B(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=V(t,e);if(this.el=W.createElement(l,i),I.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=I.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(w)||e.startsWith(A)){const i=c[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+w).split(A),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?Y:J})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),I.nextNode(),a.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===x)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){var n,o,r,a;if(e===L)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=G(t,l._$AS(t,e.values),l,s)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);I.currentNode=n;let o=I.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new K(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new tt(o,this,t)),this._$AV.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=I.nextNode(),r++)}return I.currentNode=S,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,s){var n;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),k(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>H(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==F&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=W.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new q(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new W(t)),e}T(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new K(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,s[i+r],e,r),a===L&&(a=this._$AH[r]),o||(o=!k(a)||a!==this._$AH[r]),a===F?t=F:t!==F&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}const Q=_?_.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==F?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends J{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=G(this,t,e,0))&&void 0!==i?i:F)===L)return;const s=this._$AH,n=t===F&&s!==F||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==F&&(s===F||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const et=$.litHtmlPolyfillSupport;null==et||et(W,K),(null!==(y=$.litHtmlVersions)&&void 0!==y?y:$.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class nt extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new K(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return L}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:nt}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
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
 */function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):rt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function lt(t){return at({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct,dt;null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;let ht=dt=class extends nt{loadLocalFont(t,e){const i=document.createElement("style");console.log(t),i.textContent=`\n      @font-face {\n        font-family: 'displayFont';\n        src: url('${t}/BwModelica-HairlineExpanded.otf') format('truetype');\n      }\n\n     \n    `,document.head.appendChild(i)}constructor(){super(),this.cg_alert=!1,this.events=[];const t=new URL(import.meta.url).pathname,e=t.substring(0,t.lastIndexOf("/"));this.loadLocalFont(e,t)}static get styles(){return r`
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
    `}filterDuplicateEvents(t){const e=new Set;return t.filter((t=>{const i=`${t.summary}-${t.start}`;return!e.has(i)&&(e.add(i),!0)}))}checkCGAlert(t){const e=new Date;console.log("Ora corrente:",e);const i=t.find((t=>{var i,s;const n=(null===(i=t.start)||void 0===i?void 0:i.dateTime)||t.start,o=(null===(s=t.end)||void 0===s?void 0:s.dateTime)||t.end,r=new Date(n),a=new Date(o);return console.log("Evento:",t.summary,"Inizio:",r,"Fine:",a),"cg_alert"===t.summary&&!isNaN(r.getTime())&&!isNaN(a.getTime())&&r<=e&&e<=a}));this.cg_alert=!!i,console.log("Stato cg_alert:",this.cg_alert)}async getEvents(){var t;const e=null===(t=this.config)||void 0===t?void 0:t.calendar;if(!e)return void console.error("Nessun calendario configurato.");const i=new Date,s=new Date;s.setDate(i.getDate()+7);try{const t=await this.fetchCalendarEvents(this.hass,i,s,[e]);console.log("Eventi recuperati:",t);const n=this.filterDuplicateEvents(t);this.checkCGAlert(n),this.events=n.filter((t=>"cg_alert"!==t.summary)).slice(0,5)}catch(t){console.error("Errore durante il recupero degli eventi:",t),this.events=[]}}async fetchCalendarEvents(t,e,i,s){const n=s.map((s=>t.callApi("GET",`calendars/${s}?start=${e.toISOString()}&end=${i.toISOString()}`)));return(await Promise.allSettled(n)).filter((t=>"fulfilled"===t.status)).flatMap((t=>t.value))}formatEventDate(t){try{const e="object"==typeof t&&"dateTime"in t?t.dateTime:t,i=new Date(e);if(isNaN(i.getTime()))throw new Error("Data non valida");return`${i.toLocaleDateString()} ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch(e){return console.error("Errore nel parsing della data:",t,e),"Data non valida"}}firstUpdated(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("dynamic-card");if(!e)return void console.error("Impossibile trovare il card");const i=()=>{const t=5*Math.floor(7*Math.random()),i=60-t,s=5*Math.floor(7*Math.random()),n=60-s;e.style.padding=`${t}px ${n}px ${i}px ${s}px`};setInterval(i,3e4),i()}setConfig(t){if(!t.entity)throw new Error("Invalid configuration");this.config=t}getCardSize(){return 15}async subscribeToHourlyForecast(){this.unsubscribeHourlyForecast(),this.isConnected&&this.hass&&this.config&&this.config.entity&&this.hassSupportsForecastEvents()&&this.config.entity.startsWith("weather.")&&(this.subscribedToHourlyForecast=this.hass.connection.subscribeMessage((t=>this.hourlyForecastEvent=t),{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:this.config.entity}))}unsubscribeHourlyForecast(){this.subscribedToHourlyForecast&&(this.subscribedToHourlyForecast.then((t=>t())),this.subscribedToHourlyForecast=void 0)}hassSupportsForecastEvents(){var t,e,i;return!!(null===(i=null===(e=null===(t=this.hass)||void 0===t?void 0:t.services)||void 0===e?void 0:e.weather)||void 0===i?void 0:i.get_forecasts)}getHourlyForecast(){var t;const e=null===(t=this.hourlyForecastEvent)||void 0===t?void 0:t.forecast;return null!=e?e:[]}connectedCallback(){super.connectedCallback(),this.subscribeToHourlyForecast(),this.getEvents()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeHourlyForecast()}render(){var t,e,i,s,n,o;const r=this.getHourlyForecast().slice(0,16);let a="";const l=(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),c=(null===(e=null===(t=this.hass)||void 0===t?void 0:t.locale)||void 0===e?void 0:e.language)||"en-US",d=new Date,h=d.toLocaleDateString(c,{weekday:"short"}),u=d.toLocaleDateString(c,{day:"2-digit"}),p=d.toLocaleDateString(c,{month:"2-digit"}),v=d.toLocaleDateString(c,{year:"2-digit"}),f=`${h} : ${u} : ${p} : ${v}`,g=(null===(i=this.config)||void 0===i?void 0:i.entity_icon)||[],m=(null===(s=this.config)||void 0===s?void 0:s.value_entity)||[],y=null===(n=this.config)||void 0===n?void 0:n.entity;if(!y||!this.hass.states[y])return void console.error("Entità meteo non valida o non trovata:",y);const $=this.hass.states[y].state,_=this.hass.states[y].attributes.temperature,b=this.hass.states["sun.sun"];if(!b)return void console.error("Entità sun.sun non trovata");const w="above_horizon"===(null==b?void 0:b.state);let A;return A="partlycloudy"===$?w?"partlycloudy":"partlycloudy-night":$,console.log(this.cg_alert),R`
      <ha-card id="dynamic-card" style="padding: 30px;">
          <div class="main">




  <div class="now-icon">
  <img src="https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/now_icon/${A}.svg"  />
    ${(null===(o=this.config)||void 0===o?void 0:o.internal_temperature)?(()=>{var t;const e=(null===(t=this.config)||void 0===t?void 0:t.internal_temperature)||"",i=e&&this.hass.states[e]?this.hass.states[e].state:null;return R`
                
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
  <text transform="matrix(1 0 0 1 0.1313 290.461)" class="st0 st1 st2">${_}°</text>
  <text transform="matrix(1 0 0 1 660.559 290.461)" class="st0 st1 st2">${i}°</text>
  </svg>

    `})():R`<div class="ext-temp">${_}°</div>`}
  </div>

  <!-- calendario -->

   <h1>Prossimi Eventi</h1>
      <div class="events">
        ${this.events.length>0?this.events.map((t=>R`
                <div class="event">
                  <div class="event-title">${t.summary}</div>
                  <div class="event-time">
                    ${this.formatEventDate(t.start)} - ${this.formatEventDate(t.end)}
                  </div>
                </div>
              `)):R`<div class="no-events">Nessun evento disponibile</div>`}
      </div>

      ${this.cg_alert?R`
            <div class="cg-alert">
              <h2>⚠️ Avviso Importante</h2>
              <p>L'evento "cg_alert" è attualmente in corso. Si prega di prestare attenzione.</p>
            </div>
          `:""}



          















            
          <div id="box1" class="box">
          ${m.length>0?m.map((t=>{const e=this.hass.states[t];if(!e)return R`<div>Entità non trovata: ${t}</div>`;const i=e.attributes.friendly_name||t,s=e.state,n=e.attributes.unit_of_measurement||"";return R`
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
              <div class="time">${l}
              <div class="date">
                  <div>${h}</div>
                  <div>:</div>
                  <div>${u}</div>
                  <div>:</div>
                  <div>${p}</div>
                  <div>:</div>
                  <div>${v}</div>
                </div>
              </div>
          <!--    <div class="date">${f}</div> -->

            </div>
            
        <div id="box3" class="box">
          ${g.length>0?g.map((t=>{const e=t.entity,i=t.icon,s=this.hass.states[e];if(!s||"on"!==s.state)return"";const n=i||s.attributes.icon;return R`
                  <ha-icon
                    .icon="${n}"
                    style="margin: 0 8px; font-size: 24px;"
                    title="${s.attributes.friendly_name||e}"
                  ></ha-icon>
                `})):R`<div>Nessuna entità configurata o attiva</div>`}
        </div>


          </div>
          <div >
            <div class="gradient-bar"></div>
            <div class="timeline">
    
              ${r.length>0?r.map(((t,e)=>{const i=t.condition!==a;a=t.condition;const s=`https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${dt.weatherIconsDay[t.condition]||"unknown"}.svg`,n=t.temperature<10?"cold":t.temperature>25?"hot":"";return R`
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
          </div>

      </ha-card>
    `}};ht.weatherIconsDay={clear:"day","clear-night":"night",cloudy:"cloudy",fog:"fog",hail:"hail",lightning:"lightning","lightning-rainy":"lightning-rainy",partlycloudy:"partlycloudy",pouring:"pouring",rainy:"rainy",snowy:"snowy","snowy-rainy":"snowy-rainy",sunny:"day",windy:"windy","windy-variant":"windy-variant",exceptional:"!!"},t([at({attribute:!1})],ht.prototype,"hass",void 0),t([at({attribute:!1})],ht.prototype,"config",void 0),t([lt()],ht.prototype,"cg_alert",void 0),t([lt()],ht.prototype,"hourlyForecastEvent",void 0),t([lt()],ht.prototype,"subscribedToHourlyForecast",void 0),t([lt()],ht.prototype,"events",void 0),ht=dt=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("screensaver-card")],ht);export{ht as ScreensaverCard};
