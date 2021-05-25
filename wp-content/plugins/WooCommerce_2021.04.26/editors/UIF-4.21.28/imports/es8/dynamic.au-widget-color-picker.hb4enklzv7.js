(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[20],{906:function(t,e){t.exports='<style>\n    .text {\n        padding-top: 12px;\n        padding-bottom: 12px;\n        @apply --au-body2-font;\n        color: var(--au-widget--color, --theme-text-color-1);\n        --au-hem: var(--au-widget--font-size);\n    }\n\n    .color-picker__label {\n        display: flex;\n        align-items: center;\n        cursor: pointer;\n        outline: none;\n    }\n\n    .color-picker__color {\n        width: 64px;\n        height: 32px;\n        border: 1px solid #E0E0E0;\n        border-radius: 2px;\n        margin-right: 12px;\n    }\n\n    .color-picker__text {\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: normal;\n        font-size: 14px;\n        line-height: 18px;\n\n        color: #333333;\n    }\n\n    color-palette {\n        position: absolute;\n        z-index: 1;\n        outline: none;\n    }\n</style>\n<div tabindex="1" id="label" class="color-picker__label" onclick="{{togglePicker}}">\n    <div class="color-picker__color" style$="background-color:{{displayColor}}"></div>\n    <div class="color-picker__text">{{text}}</div>\n</div>\n\x3c!-- <color-picker id="picker" hidden="{{hiddenColor}}" color="{{color}}" name="{{text}}"></color-picker> --\x3e\n<color-palette tabindex="1" id="palette" color="{{color}}" hidden="{{hiddenColor}}" defaultColor="{{color}}"\n    colors="{{colors}}">\n</color-palette>\n'},907:function(t,e,o){
/*!
 * iro.js v4.2.2
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
t.exports=function(){"use strict";var t=function(){},e={},o=[],n=[];function r(e,r){var i,s,l,a,c=arguments,h=n;for(a=arguments.length;2<a--;)o.push(c[a]);for(r&&null!=r.children&&(o.length||o.push(r.children),delete r.children);o.length;)if((s=o.pop())&&void 0!==s.pop)for(a=s.length;a--;)o.push(s[a]);else"boolean"==typeof s&&(s=null),(l="function"!=typeof e)&&(null==s?s="":"number"==typeof s?s=String(s):"string"!=typeof s&&(l=!1)),l&&i?h[h.length-1]+=s:h===n?h=[s]:h.push(s),i=l;var p=new t;return p.nodeName=e,p.children=h,p.attributes=null==r?void 0:r,p.key=null==r?void 0:r.key,p}function i(t,e){for(var o in e)t[o]=e[o];return t}function s(t,e){null!=t&&("function"==typeof t?t(e):t.current=e)}var l="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,a=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,c=[];function h(t){!t._dirty&&(t._dirty=!0)&&1==c.push(t)&&l(p)}function p(){for(var t;t=c.pop();)t._dirty&&P(t)}function d(t,e){return t.normalizedNodeName===e||t.nodeName.toLowerCase()===e.toLowerCase()}function u(t){var e=i({},t.attributes);e.children=t.children;var o=t.nodeName.defaultProps;if(void 0!==o)for(var n in o)void 0===e[n]&&(e[n]=o[n]);return e}function f(t){var e=t.parentNode;e&&e.removeChild(t)}function v(t,e,o,n,r){if("className"===e&&(e="class"),"key"===e);else if("ref"===e)s(o,null),s(n,t);else if("class"!==e||r)if("style"===e){if(n&&"string"!=typeof n&&"string"!=typeof o||(t.style.cssText=n||""),n&&"object"==typeof n){if("string"!=typeof o)for(var i in o)i in n||(t.style[i]="");for(var i in n)t.style[i]="number"==typeof n[i]&&!1===a.test(i)?n[i]+"px":n[i]}}else if("dangerouslySetInnerHTML"===e)n&&(t.innerHTML=n.__html||"");else if("o"==e[0]&&"n"==e[1]){var l=e!==(e=e.replace(/Capture$/,""));e=e.toLowerCase().substring(2),n?o||t.addEventListener(e,g,l):t.removeEventListener(e,g,l),(t._listeners||(t._listeners={}))[e]=n}else if("list"!==e&&"type"!==e&&!r&&e in t){try{t[e]=null==n?"":n}catch(t){}null!=n&&!1!==n||"spellcheck"==e||t.removeAttribute(e)}else{var c=r&&e!==(e=e.replace(/^xlink:?/,""));null==n||!1===n?c?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.removeAttribute(e):"function"!=typeof n&&(c?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),n):t.setAttribute(e,n))}else t.className=n||""}function g(t){return this._listeners[t.type](t)}var b=[],_=0,y=!1,m=!1;function x(){for(var t;t=b.shift();)t.componentDidMount&&t.componentDidMount()}function w(t,e,o,n,r,i){_++||(y=null!=r&&void 0!==r.ownerSVGElement,m=null!=t&&!("__preactattr_"in t));var s=function t(e,o,n,r,i){var s=e,l=y;if(null!=o&&"boolean"!=typeof o||(o=""),"string"==typeof o||"number"==typeof o)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||i)?e.nodeValue!=o&&(e.nodeValue=o):(s=document.createTextNode(o),e&&(e.parentNode&&e.parentNode.replaceChild(s,e),C(e,!0))),s.__preactattr_=!0,s;var a,c,h=o.nodeName;if("function"==typeof h)return function(t,e,o,n){for(var r=t&&t._component,i=r,s=t,l=r&&t._componentConstructor===e.nodeName,a=l,c=u(e);r&&!a&&(r=r._parentComponent);)a=r.constructor===e.nodeName;return r&&a&&(!n||r._component)?(M(r,c,3,o,n),t=r.base):(i&&!l&&(E(i),t=s=null),r=j(e.nodeName,c,o),t&&!r.nextBase&&(r.nextBase=t,s=null),M(r,c,1,o,n),t=r.base,s&&t!==s&&(s._component=null,C(s,!1))),t}(e,o,n,r);if(y="svg"===h||"foreignObject"!==h&&y,h=String(h),(!e||!d(e,h))&&(a=h,(c=y?document.createElementNS("http://www.w3.org/2000/svg",a):document.createElement(a)).normalizedNodeName=a,s=c,e)){for(;e.firstChild;)s.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(s,e),C(e,!0)}var p=s.firstChild,g=s.__preactattr_,b=o.children;if(null==g){g=s.__preactattr_={};for(var _=s.attributes,x=_.length;x--;)g[_[x].name]=_[x].value}return!m&&b&&1===b.length&&"string"==typeof b[0]&&null!=p&&void 0!==p.splitText&&null==p.nextSibling?p.nodeValue!=b[0]&&(p.nodeValue=b[0]):(b&&b.length||null!=p)&&function(e,o,n,r,i){var s,l,a,c,h,p,u,v,g=e.childNodes,b=[],_={},y=0,m=0,x=g.length,w=0,k=o?o.length:0;if(0!==x)for(var O=0;O<x;O++){var j=g[O],S=j.__preactattr_,M=k&&S?j._component?j._component.__key:S.key:null;null!=M?(y++,_[M]=j):(S||(void 0!==j.splitText?!i||j.nodeValue.trim():i))&&(b[w++]=j)}if(0!==k)for(var O=0;O<k;O++){c=o[O],h=null;var M=c.key;if(null!=M)y&&void 0!==_[M]&&(h=_[M],_[M]=void 0,y--);else if(m<w)for(s=m;s<w;s++)if(void 0!==b[s]&&(p=l=b[s],v=i,"string"==typeof(u=c)||"number"==typeof u?void 0!==p.splitText:"string"==typeof u.nodeName?!p._componentConstructor&&d(p,u.nodeName):v||p._componentConstructor===u.nodeName)){h=l,b[s]=void 0,s===w-1&&w--,s===m&&m++;break}h=t(h,c,n,r),a=g[O],h&&h!==e&&h!==a&&(null==a?e.appendChild(h):h===a.nextSibling?f(a):e.insertBefore(h,a))}if(y)for(var O in _)void 0!==_[O]&&C(_[O],!1);for(;m<=w;)void 0!==(h=b[w--])&&C(h,!1)}(s,b,n,r,m||null!=g.dangerouslySetInnerHTML),function(t,e,o){var n;for(n in o)e&&null!=e[n]||null==o[n]||v(t,n,o[n],o[n]=void 0,y);for(n in e)"children"===n||"innerHTML"===n||n in o&&e[n]===("value"===n||"checked"===n?t[n]:o[n])||v(t,n,o[n],o[n]=e[n],y)}(s,o.attributes,g),y=l,s}(t,e,o,n,i);return r&&s.parentNode!==r&&r.appendChild(s),--_||(m=!1,i||x()),s}function C(t,e){var o=t._component;o?E(o):(null!=t.__preactattr_&&s(t.__preactattr_.ref,null),!1!==e&&null!=t.__preactattr_||f(t),k(t))}function k(t){for(t=t.lastChild;t;){var e=t.previousSibling;C(t,!0),t=e}}var O=[];function j(t,e,o){var n,r=O.length;for(t.prototype&&t.prototype.render?(n=new t(e,o),N.call(n,e,o)):((n=new N(e,o)).constructor=t,n.render=S);r--;)if(O[r].constructor===t)return n.nextBase=O[r].nextBase,O.splice(r,1),n;return n}function S(t,e,o){return this.constructor(t,o)}function M(t,o,n,r,i){t._disable||(t._disable=!0,t.__ref=o.ref,t.__key=o.key,delete o.ref,delete o.key,void 0===t.constructor.getDerivedStateFromProps&&(!t.base||i?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(o,r)),r&&r!==t.context&&(t.prevContext||(t.prevContext=t.context),t.context=r),t.prevProps||(t.prevProps=t.props),t.props=o,t._disable=!1,0!==n&&(1!==n&&!1===e.syncComponentUpdates&&t.base?h(t):P(t,1,i)),s(t.__ref,t))}function P(t,e,o,n){if(!t._disable){var r,s,l,a=t.props,c=t.state,h=t.context,p=t.prevProps||a,d=t.prevState||c,f=t.prevContext||h,v=t.base,g=t.nextBase,y=v||g,m=t._component,k=!1,O=f;if(t.constructor.getDerivedStateFromProps&&(c=i(i({},c),t.constructor.getDerivedStateFromProps(a,c)),t.state=c),v&&(t.props=p,t.state=d,t.context=f,2!==e&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(a,c,h)?k=!0:t.componentWillUpdate&&t.componentWillUpdate(a,c,h),t.props=a,t.state=c,t.context=h),t.prevProps=t.prevState=t.prevContext=t.nextBase=null,t._dirty=!1,!k){r=t.render(a,c,h),t.getChildContext&&(h=i(i({},h),t.getChildContext())),v&&t.getSnapshotBeforeUpdate&&(O=t.getSnapshotBeforeUpdate(p,d));var S,N,H=r&&r.nodeName;if("function"==typeof H){var T=u(r);(s=m)&&s.constructor===H&&T.key==s.__key?M(s,T,1,h,!1):(S=s,t._component=s=j(H,T,h),s.nextBase=s.nextBase||g,s._parentComponent=t,M(s,T,0,h,!1),P(s,1,o,!0)),N=s.base}else l=y,(S=m)&&(l=t._component=null),(y||1===e)&&(l&&(l._component=null),N=w(l,r,h,o||!v,y&&y.parentNode,!0));if(y&&N!==y&&s!==m){var R=y.parentNode;R&&N!==R&&(R.replaceChild(N,y),S||(y._component=null,C(y,!1)))}if(S&&E(S),(t.base=N)&&!n){for(var F=t,A=t;A=A._parentComponent;)(F=A).base=N;N._component=F,N._componentConstructor=F.constructor}}for(!v||o?b.push(t):k||t.componentDidUpdate&&t.componentDidUpdate(p,d,O);t._renderCallbacks.length;)t._renderCallbacks.pop().call(t);_||n||x()}}function E(t){var e=t.base;t._disable=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var o=t._component;o?E(o):e&&(null!=e.__preactattr_&&s(e.__preactattr_.ref,null),f(t.nextBase=e),O.push(t),k(e)),s(t.__ref,null)}function N(t,e){this._dirty=!0,this.context=e,this.props=t,this.state=this.state||{},this._renderCallbacks=[]}function H(t,e,o,n){void 0===n&&(n={});for(var r=0;r<e.length;r++)t.addEventListener(e[r],o,n)}function T(t,e,o,n){void 0===n&&(n={});for(var r=0;r<e.length;r++)t.removeEventListener(e[r],o,n)}i(N.prototype,{setState:function(t,e){this.prevState||(this.prevState=this.state),this.state=i(i({},this.state),"function"==typeof t?t(this.state,this.props):t),e&&this._renderCallbacks.push(e),h(this)},forceUpdate:function(t){t&&this._renderCallbacks.push(t),P(this,2)},render:function(){}});var R="mousedown",F="mousemove",A="mouseup",L="touchstart",I="touchmove",U="touchend",W=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),((e.prototype=Object.create(t&&t.prototype)).constructor=e).prototype.componentDidMount=function(){H(this.base,[R,L],this,{passive:!1})},e.prototype.componentWillUnmount=function(){T(this.base,[R,L],this)},e.prototype.handleEvent=function(t){t.preventDefault();var e=t.touches?t.changedTouches[0]:t,o=e.clientX,n=e.clientY,r=this.base.getBoundingClientRect();switch(t.type){case R:case L:H(document,[F,I,A,U],this,{passive:!1}),this.handleInput(o,n,r,"START");break;case F:case I:this.handleInput(o,n,r,"MOVE");break;case A:case U:this.handleInput(o,n,r,"END"),T(document,[F,I,A,U],this,{passive:!1})}},e}(N);function D(t){var e=window.navigator.userAgent,o=/^((?!chrome|android).)*safari/i.test(e),n=/iPhone|iPod|iPad/i.test(e),r=window.location;return o||n?r.protocol+"//"+r.host+r.pathname+r.search+t:t}function B(t,e,o,n,r){var i=r-n<=180?0:1;return n*=Math.PI/180,r*=Math.PI/180,"M "+(t+o*Math.cos(r))+" "+(e+o*Math.sin(r))+" A "+o+" "+o+" 0 "+i+" 0 "+(t+o*Math.cos(n))+" "+(e+o*Math.sin(n))}function $(t){var e=t.r,o=t.url;return r("svg",{class:"iro__handle",x:t.x,y:t.y,style:{overflow:"visible"}},o&&r("use",Object.assign({},{xlinkHref:D(o)},t.origin)),!o&&r("circle",{class:"iro__handle__inner",r:e,fill:"none","stroke-width":2,stroke:"#000"}),!o&&r("circle",{class:"iro__handle__outer",r:e-2,fill:"none","stroke-width":2,stroke:"#fff"}))}$.defaultProps={x:0,y:0,r:8,url:null,origin:{x:0,y:0}};var V=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),((e.prototype=Object.create(t&&t.prototype)).constructor=e).prototype.render=function(t){var e=t.width,o=t.borderWidth,n=t.handleRadius,i=t.color.hsv,s=e/2-o,l=(360-i.h)*(Math.PI/180),a=i.s/100*(s-t.padding-n-o),c=s+o,h=s+o;return r("svg",{class:"iro__wheel",width:e,height:e,style:{overflow:"visible",display:"block"}},r("defs",null,r("radialGradient",{id:this.uid},r("stop",{offset:"0%","stop-color":"#fff"}),r("stop",{offset:"100%","stop-color":"#fff","stop-opacity":"0"}))),r("g",{class:"iro__wheel__hue","stroke-width":s,fill:"none"},Array.apply(null,{length:360}).map(function(t,e){return r("path",{key:e,d:B(c,h,s/2,e,e+1.5),stroke:"hsl("+(360-e)+", 100%, 50%)"})})),r("circle",{class:"iro__wheel__saturation",cx:c,cy:h,r:s,fill:"url("+D("#"+this.uid)+")"}),t.wheelLightness&&r("circle",{class:"iro__wheel__lightness",cx:c,cy:h,r:s,fill:"#000",opacity:1-i.v/100}),r("circle",{class:"iro__wheel__border",cx:c,cy:h,r:s,fill:"none",stroke:t.borderColor,"stroke-width":o}),r($,{r:n,url:t.handleSvg,origin:t.handleOrigin,x:c+a*Math.cos(l),y:h+a*Math.sin(l)}))},e.prototype.handleInput=function(t,e,o,n){var r=o.left,i=o.top,s=this.props,l=s.width/2,a=l-s.padding-s.handleRadius-s.borderWidth;t=l-(t-r),e=l-(e-i);var c=Math.atan2(e,t),h=360-(Math.round(c*(180/Math.PI))+180),p=Math.min(Math.sqrt(t*t+e*e),a);s.onInput(n,{h,s:Math.round(100/a*p)})},e}(W);function z(t,e){var o=-1<t.indexOf("%"),n=parseFloat(t);return o?e/100*n:n}function G(t){return parseInt(t,16)}function q(t){return t.toString(16).padStart(2,"0")}var J="(?:[-\\+]?\\d+%?)|(?:[-\\+]?\\d*\\.\\d+%?)",X="[\\s|\\(]+("+J+")[,|\\s]+("+J+")[,|\\s]+("+J+")\\s*\\)?",Y="[\\s|\\(]+("+J+")[,|\\s]+("+J+")[,|\\s]+("+J+")[,|\\s]+("+J+")\\s*\\)?",K=new RegExp("rgb"+X),Q=new RegExp("rgba"+Y),Z=new RegExp("hsl"+X),tt=new RegExp("hsla"+Y),et="^(?:#?|0x?)",ot="([0-9a-fA-F]{1})",nt="([0-9a-fA-F]{2})",rt=new RegExp(""+et+ot+ot+ot+"$"),it=new RegExp(""+et+ot+ot+ot+ot+"$"),st=new RegExp(""+et+nt+nt+nt+"$"),lt=new RegExp(""+et+nt+nt+nt+nt+"$"),at=function(t){this._onChange=!1,this._value={h:0,s:0,v:0,a:1},t&&this.set(t)},ct={hsv:{configurable:!0},rgb:{configurable:!0},hsl:{configurable:!0},rgbString:{configurable:!0},hexString:{configurable:!0},hslString:{configurable:!0}};at.prototype.set=function(t){var e="string"==typeof t,o="object"==typeof t;if(e&&/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(t))this.hexString=t;else if(e&&/^rgba?/.test(t))this.rgbString=t;else if(e&&/^hsla?/.test(t))this.hslString=t;else if(o&&t instanceof at)this.hsv=t.hsv;else if(o&&"r"in t&&"g"in t&&"b"in t)this.rgb=t;else if(o&&"h"in t&&"s"in t&&"v"in t)this.hsv=t;else{if(!(o&&"h"in t&&"s"in t&&"l"in t))throw new Error("invalid color value");this.hsl=t}},at.prototype.setChannel=function(t,e,o){var n;this[t]=Object.assign({},this[t],((n={})[e]=o,n))},at.prototype.clone=function(){return new at(this)},at.hsvToRgb=function(t){var e=t.h/60,o=t.s/100,n=t.v/100,r=Math.floor(e),i=e-r,s=n*(1-o),l=n*(1-i*o),a=n*(1-(1-i)*o),c=r%6;return{r:255*[n,l,s,s,a,n][c],g:255*[a,n,n,l,s,s][c],b:255*[s,s,a,n,n,l][c]}},at.rgbToHsv=function(t){var e,o=t.r/255,n=t.g/255,r=t.b/255,i=Math.max(o,n,r),s=Math.min(o,n,r),l=i-s,a=i,c=0===i?0:l/i;switch(i){case s:e=0;break;case o:e=(n-r)/l+(n<r?6:0);break;case n:e=(r-o)/l+2;break;case r:e=(o-n)/l+4}return{h:60*e,s:100*c,v:100*a}},at.hsvToHsl=function(t){var e=t.s/100,o=t.v/100,n=(2-e)*o,r=n<=1?n:2-n,i=r<1e-9?0:e*o/r;return{h:t.h,s:100*i,l:50*n}},at.hslToHsv=function(t){var e=2*t.l,o=t.s*(e<=100?e:200-e)/100,n=e+o<1e-9?0:2*o/(e+o);return{h:t.h,s:100*n,v:(e+o)/2}},ct.hsv.get=function(){var t=this._value;return{h:t.h,s:t.s,v:t.v,a:t.a}},ct.hsv.set=function(t){if(this._onChange){var e=this._value;t=Object.assign({},e,t);var o={};for(var n in e)o[n]=t[n]!=e[n];this._value=t,(o.h||o.s||o.v||o.a)&&this._onChange(this,o)}else this._value=t},ct.rgb.get=function(){var t=at.hsvToRgb(this._value),e=t.r,o=t.g,n=t.b;return{r:Math.round(e),g:Math.round(o),b:Math.round(n)}},ct.rgb.set=function(t){this.hsv=at.rgbToHsv(t)},ct.hsl.get=function(){var t=at.hsvToHsl(this._value),e=t.h,o=t.s,n=t.l;return{h:Math.round(e),s:Math.round(o),l:Math.round(n)}},ct.hsl.set=function(t){this.hsv=at.hslToHsv(t)},ct.rgbString.get=function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},ct.rgbString.set=function(t){var e,o,n,r,i=1;if((e=K.exec(t))?(o=z(e[1],255),n=z(e[2],255),r=z(e[3],255)):(e=Q.exec(t))&&(o=z(e[1],255),n=z(e[2],255),r=z(e[3],255),i=z(e[4],1)),!e)throw new Error("invalid rgb string");this.rgb={r:o,g:n,b:r,a:i}},ct.hexString.get=function(){var t=this.rgb;return"#"+q(t.r)+q(t.g)+q(t.b)},ct.hexString.set=function(t){var e,o,n,r,i=255;if((e=rt.exec(t))?(o=17*G(e[1]),n=17*G(e[2]),r=17*G(e[3])):(e=it.exec(t))?(o=17*G(e[1]),n=17*G(e[2]),r=17*G(e[3]),i=17*G(e[4])):(e=st.exec(t))?(o=G(e[1]),n=G(e[2]),r=G(e[3])):(e=lt.exec(t))&&(o=G(e[1]),n=G(e[2]),r=G(e[3]),i=G(e[4])),!e)throw new Error("invalid hex string");this.rgb={r:o,g:n,b:r,a:i/255}},ct.hslString.get=function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},ct.hslString.set=function(t){var e,o,n,r,i=1;if((e=Z.exec(t))?(o=z(e[1],360),n=z(e[2],100),r=z(e[3],100)):(e=tt.exec(t))&&(o=z(e[1],360),n=z(e[2],100),r=z(e[3],100),i=z(e[4],1)),!e)throw new Error("invalid hsl string");this.hsl={h:o,s:n,l:r,a:i}},Object.defineProperties(at.prototype,ct);var ht=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),((e.prototype=Object.create(t&&t.prototype)).constructor=e).prototype.renderGradient=function(t){var e=t.color.hsv,o=[];switch(t.sliderType){case"hue":o=[{offset:"0",color:"#f00"},{offset:"16.666",color:"#ff0"},{offset:"33.333",color:"#0f0"},{offset:"50",color:"#0ff"},{offset:"66.666",color:"#00f"},{offset:"83.333",color:"#f0f"},{offset:"100",color:"#f00"}];break;case"saturation":var n=at.hsvToHsl({h:e.h,s:0,v:e.v}),i=at.hsvToHsl({h:e.h,s:100,v:e.v});o=[{offset:"0",color:"hsl("+n.h+", "+n.s+"%, "+n.l+"%)"},{offset:"100",color:"hsl("+i.h+", "+i.s+"%, "+i.l+"%)"}];break;case"value":default:var s=at.hsvToHsl({h:e.h,s:e.s,v:100});o=[{offset:"0",color:"#000"},{offset:"100",color:"hsl("+s.h+", "+s.s+"%, "+s.l+"%)"}]}return r("linearGradient",{id:this.uid},o.map(function(t){return r("stop",{offset:t.offset+"%","stop-color":t.color})}))},e.prototype.render=function(t){var e=t.width,o=t.sliderHeight,n=t.borderWidth,i=t.handleRadius;o=o||2*t.padding+2*i+2*n,this.width=e;var s,l=(this.height=o)/2,a=e-2*l,c=t.color.hsv;switch(t.sliderType){case"hue":s=c.h/=3.6;break;case"saturation":s=c.s;break;case"value":default:s=c.v}return r("svg",{class:"iro__slider",width:e,height:o,style:{marginTop:t.sliderMargin,overflow:"visible",display:"block"}},r("defs",null,this.renderGradient(t)),r("rect",{class:"iro__slider__value",rx:l,ry:l,x:n/2,y:n/2,width:e-n,height:o-n,"stroke-width":n,stroke:t.borderColor,fill:"url("+D("#"+this.uid)+")"}),r($,{r:i,url:t.handleSvg,origin:t.handleOrigin,x:l+s/100*a,y:o/2}))},e.prototype.getValueFromPoint=function(t,e,o){var n=o.left,r=this.width-this.height;t-=n+this.height/2;var i=Math.max(Math.min(t,r),0);return Math.round(100/r*i)},e.prototype.handleInput=function(t,e,o,n){var r,i,s=this.getValueFromPoint(t,e,o);switch(this.props.sliderType){case"hue":i="h",s*=3.6;break;case"saturation":i="s";break;case"value":default:i="v"}this.props.onInput(n,((r={})[i]=s,r))},e}(W),pt=function(t){function e(e){t.call(this,e),this.emitHook("init:before"),this._events={},this._mounted=!1,this._colorChangeActive=!1,this.color=new at,this.color._onChange=this.updateColor.bind(this),this.state=Object.assign({},e,{color:this.color}),this.color.set(e.color),this.emitHook("init:state"),e.layout?this.layout=e.layout:this.layout=[{component:V,options:{}},{component:ht,options:{}}],this.emitHook("init:after")}return t&&(e.__proto__=t),((e.prototype=Object.create(t&&t.prototype)).constructor=e).prototype.on=function(t,e){var o=this._events;this.emitHook("event:on",t,e),(o[t]||(o[t]=[])).push(e),"mount"===t&&this._mounted&&this.emit("mount",this),"color:change"===t&&this._mounted&&this.emit("color:change",this.color,{h:!1,s:!1,v:!1,a:!1})},e.prototype.off=function(t,e){var o=this._events[t];this.emitHook("event:off",t,e),o&&o.splice(o.indexOf(e),1)},e.prototype.emit=function(t){for(var e,o=[],n=arguments.length-1;0<n--;)o[n]=arguments[n+1];(e=this).emitHook.apply(e,[t].concat(o));for(var r=this._events[t]||[],i=0;i<r.length;i++)r[i].apply(null,o)},e.prototype.resize=function(t){this.setState({width:t})},e.prototype.reset=function(){this.color.set(this.props.color)},e.addHook=function(t,o){var n=e.pluginHooks;(n[t]||(n[t]=[])).push(o)},e.prototype.emitHook=function(t){for(var o=[],n=arguments.length-1;0<n--;)o[n]=arguments[n+1];for(var r=e.pluginHooks[t]||[],i=0;i<r.length;i++)r[i].apply(this,o)},e.prototype.onMount=function(t){this.el=t,this._mounted=!0,this.emit("mount",this),this.emit("color:change",this.color,{h:!1,s:!1,v:!1,a:!1})},e.prototype.updateColor=function(t,e){this.emitHook("color:beforeUpdate",t,e),this.setState({color:t}),this.emitHook("color:afterUpdate",t,e),this._colorChangeActive||(this._colorChangeActive=!0,this.emit("color:change",t,e),this._colorChangeActive=!1)},e.prototype.handleInput=function(t,e){"START"===t&&this.emit("input:start",this.color),"MOVE"===t&&this.emit("input:mode",this.color),this.color.hsv=e,"END"===t&&this.emit("input:end",this.color)},e.prototype.render=function(t,e){var o=this;return r("div",{class:"iro__colorPicker",style:{display:e.display,width:e.width}},this.layout.map(function(t){var n=t.component,i=t.options;return r(n,Object.assign({},e,i,{onInput:function(t,e){return o.handleInput(t,e)},parent:o}))}))},e}(N);pt.pluginHooks={},pt.defaultProps={width:300,height:300,handleRadius:8,handleSvg:null,handleOrigin:{x:0,y:0},color:"#fff",borderColor:"#fff",borderWidth:0,display:"block",wheelLightness:!0,sliderHeight:null,sliderMargin:12,padding:6,layout:null};var dt,ut,ft,vt,gt=((ut=function(t,e){var o,n=null,i=document.createElement("div");return w(void 0,r(dt,Object.assign({},{ref:function(t){return n=t}},e)),{},!1,i,!1),o=function(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(n.base),n.onMount(e)},"loading"!==document.readyState?o():H(document,["DOMContentLoaded"],o),n}).prototype=(dt=pt).prototype,Object.assign(ut,dt),ut.__component=dt,ut);return vt=[],(ft={Color:at,ColorPicker:gt,ui:{h:r,Component:W,Handle:$,Slider:ht,Wheel:V},util:{resolveUrl:D,createArcPath:B,parseUnit:z,parseHexInt:G,intToHex:q},version:"4.2.2"}).use=function(t,e){void 0===e&&(e={}),-1<vt.indexOf(t)||(t(ft,e),vt.push(t))},ft.installedPlugins=vt,ft}()},963:function(t,e,o){"use strict";o.r(e),o.d(e,"AuWidgetColorPicker",function(){return p}),o.d(e,"widget",function(){return p});var n=o(0),r=o(906),i=o(172),s=o(1),l=o(41),a=o(907);let c=class extends l.a{constructor(){super(...arguments),this.hidden=!0,this.color="#ffffff"}static get styles(){return l["b"]`
        .hidden { 
            display:none !important;
        }
        `}render(){return l["d"]`
            <div class="${this.hidden?"hidden":""}">
                <div id="color-picker-container"></div>
            </div>
        `}updated(t){this.colorPicker.color.hex=t.color}firstUpdated(){this.colorPicker=a.ColorPicker(this.shadowRoot.querySelector("#color-picker-container"),{width:200,color:"#f00"}),this.colorPicker.on("color:change",(t,e)=>{this.color=t.hexString})}};Object(n.b)([Object(l.e)(),Object(n.d)("design:type",Boolean)],c.prototype,"hidden",void 0),Object(n.b)([Object(l.e)(),Object(n.d)("design:type",String)],c.prototype,"color",void 0),c=Object(n.b)([Object(l.c)("color-picker")],c);let h=class extends l.a{constructor(){super(...arguments),this.name="World",this.hidden=!0,this.defaultColor="#ffffff",this.handleChange=(t=>{this.color=t;const e=new CustomEvent("change-color",{detail:this.color});this.dispatchEvent(e)})}static get styles(){return l["b"]`
        .color-palette__div {
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            background: #FFFFFF;
            box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
            border-radius: 2px;
        }
        
        .color-palette--hidden { 
            display: none;
        }
        
        .color-palette__label {
            margin-right: 12px;
            margin-bottom: 12px;
            position: relative;
            width:32px;
            height: 32px;
        }
        .color-palette__label input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            width: 100%;
            height: 100%;
        }
        .color-palette__radio {
            padding: 2px;
            box-shadow: 0 0 0 1px #DCDEDF;
            width: 100%;
            height: 100%;
            border-radius: 2px;
        }
        input:checked ~ .color-palette__radio {
            padding: 2px;
            box-shadow: 0 0 0 2px #30C2FF;
        }
        .color-palette__color {
            width: 100%;
            height: 100%;
        }
        `}render(){return l["d"]`
            <div class="color-palette__div color-palette--${this.hidden?"hidden":""}">
                ${this.colors.map((t,e)=>l["d"]`
                    <label for="color" class="color-palette__label">
                        <input type="radio" name="color"
                         @change="${()=>this.handleChange(t)}" />
                        <div class="color-palette__radio">
                            <div class="color-palette__color" style="background-color:${t.displayColor};"></div>
                        </div>
                    </label>`)}
            </div>
        `}};Object(n.b)([Object(l.e)(),Object(n.d)("design:type",String)],h.prototype,"name",void 0),Object(n.b)([Object(l.e)(),Object(n.d)("design:type",Boolean)],h.prototype,"hidden",void 0),Object(n.b)([Object(l.e)(),Object(n.d)("design:type",String)],h.prototype,"defaultColor",void 0),Object(n.b)([Object(l.e)(),Object(n.d)("design:type",Array)],h.prototype,"colors",void 0),Object(n.b)([Object(l.e)(),Object(n.d)("design:type",Object)],h.prototype,"color",void 0),h=Object(n.b)([Object(l.c)("color-palette")],h);let p=class extends i.b{constructor(){super(...arguments),this.text="Primary color",this.hiddenColor=!0,this.displayColor="#e5e000",this._isRestoring=!1,this.colors=[]}colorChanged(){this._isRestoring||this.emitChange({value:this.color})}get _(){return this.color}clearSelection(){this.color=!1}connectedCallback(){super.connectedCallback(),this.togglePicker=this.togglePicker.bind(this),this.initEvents()}updateParams(t){this.text=t.text,this.colors=t.colors;const e=this.colors.find(t=>t.preselected);!e||this.defaultColor&&JSON.stringify(this.defaultColor.value)===JSON.stringify(e.value)||(this.defaultColor=e||this.colors[0],this.color=this.defaultColor),this.color&&(this.displayColor=this.color.displayColor)}async exportWidgetData(t){return{color:this.color}}async restoreWidgetFromData(t,e){t&&t.color&&this.displayColor!==t.color.displayColor&&(this._isRestoring=!0,this.color=t.color,this.displayColor=this.color.displayColor),this._isRestoring=!1}initEvents(){this.$.palette.addEventListener("change-color",t=>this.changeColor(t)),this.$.palette.addEventListener("blur",t=>this.closePicker()),this.addEventListener("blur",t=>this.closePicker())}togglePicker(){this.hiddenColor=!this.hiddenColor}closePicker(){this.hiddenColor=!0}changeColor(t){this.color=t.detail,this.displayColor=this.color.displayColor}};Object(n.b)([Object(s.c)(),Object(n.d)("design:type",Object)],p.prototype,"params",void 0),Object(n.b)([Object(s.c)(),Object(n.d)("design:type",String)],p.prototype,"text",void 0),Object(n.b)([Object(s.c)(),Object(n.d)("design:type",Object)],p.prototype,"color",void 0),Object(n.b)([Object(s.b)("color"),Object(n.d)("design:type",Function),Object(n.d)("design:paramtypes",[]),Object(n.d)("design:returntype",void 0)],p.prototype,"colorChanged",null),Object(n.b)([Object(s.c)(),Object(n.d)("design:type",Array)],p.prototype,"colors",void 0),p=Object(n.b)([Object(s.a)("au-widget-color-picker",r)],p)}}]);