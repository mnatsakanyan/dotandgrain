window.attributeMigrator=function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=27)}([function(e,t,r){"use strict";var n=r(2),s=r(11),o=Object.prototype.toString;function a(e){return"[object Array]"===o.call(e)}function i(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===o.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:s,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:i,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return i(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]=r}for(var n=0,s=arguments.length;n<s;n++)u(arguments[n],r);return t},deepMerge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]="object"==typeof r?e({},r):r}for(var n=0,s=arguments.length;n<s;n++)u(arguments[n],r);return t},extend:function(e,t,r){return u(t,function(t,s){e[s]=r&&"function"==typeof t?n(t,r):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,r){e.exports=r(10)},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";var n=r(0);function s(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(n.isURLSearchParams(t))o=t.toString();else{var a=[];n.forEach(t,function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(s(t)+"="+s(e))}))}),o=a.join("&")}if(o){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";(function(t){var n=r(0),s=r(17),o={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var i,c={adapter:(void 0!==t&&"[object process]"===Object.prototype.toString.call(t)?i=r(6):"undefined"!=typeof XMLHttpRequest&&(i=r(6)),i),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],function(e){c.headers[e]={}}),n.forEach(["post","put","patch"],function(e){c.headers[e]=n.merge(o)}),e.exports=c}).call(this,r(16))},function(e,t,r){"use strict";var n=r(0),s=r(18),o=r(3),a=r(20),i=r(21),c=r(7);e.exports=function(e){return new Promise(function(t,u){var l=e.data,f=e.headers;n.isFormData(l)&&delete f["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",h=e.auth.password||"";f.Authorization="Basic "+btoa(p+":"+h)}if(d.open(e.method.toUpperCase(),o(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in d?a(d.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:r,config:e,request:d};s(t,u,n),d=null}},d.onabort=function(){d&&(u(c("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){u(c("Network Error",e,null,d)),d=null},d.ontimeout=function(){u(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var m=r(22),g=(e.withCredentials||i(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;g&&(f[e.xsrfHeaderName]=g)}if("setRequestHeader"in d&&n.forEach(f,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete f[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),u(e),d=null)}),void 0===l&&(l=null),d.send(l)})}},function(e,t,r){"use strict";var n=r(19);e.exports=function(e,t,r,s,o){var a=new Error(e);return n(a,t,r,s,o)}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){t=t||{};var r={};return n.forEach(["url","method","params","data"],function(e){void 0!==t[e]&&(r[e]=t[e])}),n.forEach(["headers","auth","proxy"],function(s){n.isObject(t[s])?r[s]=n.deepMerge(e[s],t[s]):void 0!==t[s]?r[s]=t[s]:n.isObject(e[s])?r[s]=n.deepMerge(e[s]):void 0!==e[s]&&(r[s]=e[s])}),n.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])}),r}},function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,r){"use strict";var n=r(0),s=r(2),o=r(12),a=r(8);function i(e){var t=new o(e),r=s(o.prototype.request,t);return n.extend(r,o.prototype,t),n.extend(r,t),r}var c=i(r(5));c.Axios=o,c.create=function(e){return i(a(c.defaults,e))},c.Cancel=r(9),c.CancelToken=r(25),c.isCancel=r(4),c.all=function(e){return Promise.all(e)},c.spread=r(26),e.exports=c,e.exports.default=c},function(e,t){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,t,r){"use strict";var n=r(0),s=r(3),o=r(13),a=r(14),i=r(8);function c(e){this.defaults=e,this.interceptors={request:new o,response:new o}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=i(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var t=[a,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=i(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],function(e){c.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}}),n.forEach(["post","put","patch"],function(e){c.prototype[e]=function(t,r,s){return this.request(n.merge(s||{},{method:e,url:t,data:r}))}}),e.exports=c},function(e,t,r){"use strict";var n=r(0);function s(){this.handlers=[]}s.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},s.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},s.prototype.forEach=function(e){n.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=s},function(e,t,r){"use strict";var n=r(0),s=r(15),o=r(4),a=r(5),i=r(23),c=r(24);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!i(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||a.adapter)(e).then(function(t){return u(e),t.data=s(t.data,t.headers,e.transformResponse),t},function(t){return o(t)||(u(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},function(e,t){var r,n,s=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function i(e){if(r===setTimeout)return setTimeout(e,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(e){r=o}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var c,u=[],l=!1,f=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&p())}function p(){if(!l){var e=i(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new h(e,t)),1!==u.length||l||i(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=m,s.addListener=m,s.once=m,s.off=m,s.removeListener=m,s.removeAllListeners=m,s.emit=m,s.prependListener=m,s.prependOnceListener=m,s.listeners=function(e){return[]},s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},function(e,t,r){"use strict";var n=r(7);e.exports=function(e,t,r){var s=r.config.validateStatus;!s||s(r.status)?e(r):t(n("Request failed with status code "+r.status,r.config,null,r.request,r))}},function(e,t,r){"use strict";e.exports=function(e,t,r,n,s){return e.config=t,r&&(e.code=r),e.request=n,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,r){"use strict";var n=r(0),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,o,a={};return e?(n.forEach(e.split("\n"),function(e){if(o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t){if(a[t]&&s.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([r]):a[t]?a[t]+", "+r:r}}),a):a}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function s(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=s(window.location.href),function(t){var r=n.isString(t)?s(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,s,o,a){var i=[];i.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),n.isString(s)&&i.push("path="+s),n.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var n=r(9);function s(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new n(e),t(r.reason))})}s.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},s.source=function(){var e;return{token:new s(function(t){e=t}),cancel:e}},e.exports=s},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,r){"use strict";r.r(t);class n{constructor(e){this.title=e.title,this.name=e.name,this.version=e.version?e.version:"",this.defaultConfigId="",this.allConfigs=[]}}class s{constructor(e){this.uid=e.uid,this.fileName=e.fileName,this.name=e.name,this.title=e.title,this.version=e.version}}class o{constructor(){this.attributes=[]}}class a{static MapType(e){const t=e.toLowerCase();switch(t){case"text":return"text";case"list":return"list";case"number":return"number";case"checkbox":return"checkbox";case"color":return"rgb-color";case"design":return"designlegacy";case"mockup":return"mockuplegacy";case"designfolder":return"designfolderlegacy";case"mockupfolder":return"mockupfolderlegacy";default:throw`TypeMapper error: unexpected attribute type: ${t}.`}}}class i{}class c{}class u{constructor(e,t){this.type=e,this.message=t}}class l extends i{parse(e){return new c}getType(){return"design"}}class f extends i{parse(e){return new c}getType(){return"mockup"}}class d extends i{parse(e){return new c}getType(){return"designfolder"}}class p extends i{parse(e){return new c}getType(){return"mockupfolder"}}class h extends i{parse(e){return new c}getType(){return"text"}}class m extends i{parse(e){const t=new c;return e.settings.values&&(t.values=e.settings.values.reduce((e,t)=>(e[t]=t,e),{})),t}getType(){return"list"}}class g extends i{parse(e){return new c}getType(){return"color"}}class y extends i{parse(e){const t=new c,r=void 0!==e.settings.min,n=void 0!==e.settings.max;if(r||n){if(t.validations=[],r){const r=new u("min",`Minimum value is ${e.settings.min}`);r.min=e.settings.min,t.validations.push(r)}if(n){const r=new u("max",`Maximum value is ${e.settings.max}`);r.max=e.settings.max,t.validations.push(r)}}return t}getType(){return"number"}}class w extends i{parse(e){return new c}getType(){return"checkbox"}}class b{static ParseAttribute(e){const t=e.type||e.settings.type,r=b.getSuitableParser(t).parse(e);return r.name=e.name,r.label=e.settings.label||e.name,e.settings.defaultValue&&(r.defaultValue=e.settings.defaultValue),r.type=a.MapType(t),r}static getSuitableParser(e){let t;const r=e.toLowerCase();switch(r){case"design":t=l;break;case"mockup":t=f;break;case"designfolder":t=d;break;case"mockupfolder":t=p;break;case"text":t=h;break;case"list":t=m;break;case"color":t=g;break;case"number":t=y;break;case"checkbox":t=w;break;default:throw`AttributeParser error: unexpected attribute type: ${r}.`}return new t}}var v,x=r(1),k=r.n(x);class T{static async Post(e,t){return(await k.a.post(e,t)).data}static async Get(e){return(await k.a.get(e)).data}}class C{static getBaseUrl(e){switch(e){case"hosted":return"";case"woocommerce":return window.location.href.split("wp-admin/")[0];case"nopcommerce":return window.location.href.split("Admin/Product/")[0]}}}class S{static async getMetafields(e,t="hosted"){let r;const n=C.getBaseUrl(t);switch(t){case"hosted":r=T.Post(n+"/shopify/GetMetafileds",{productId:e});break;case"woocommerce":r=T.Post(n+"wp-admin/admin-ajax.php?action=get_spec_attribute&productId="+e,{});break;case"nopcommerce":r=T.Post(n+"Admin/CcProduct/GetSpecAttributes?productId="+e,{})}return r}}class _{constructor(e){this._ccUrl=e}}class E{static getFileName(e){const t=e.split("/");return t[t.length-1]}static ensureStartWith(e,t){return e.startsWith(t)?e:t+e}static ensureEndWith(e,t){return e.endsWith(t)?e:e+t}static guid(){const e=()=>Math.floor(65536*(1+Math.random())).toString(16).substring(1);return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}}class P extends _{handleData(e,t=!1,r){const n="/api/ProductTemplates/"+(t?"mockups":"designs")+"/",s={};let o=e.slice();r.folder&&(o=o.filter(e=>e.startsWith(r.folder)),!1===r.showSubFolders&&(o=o.filter(e=>1===e.replace(E.ensureEndWith(r.folder,"/"),"").split("/").length)));for(const e of o){let t=e;!0===r.filenameOnly&&(t=E.getFileName(e));let o=e;r.folder&&(o=o.substr(r.folder.length+(r.folder.endsWith("/")?0:1))),s[t]={fileName:o,previewUrl:this._ccUrl+n+e+"?width=200&height=200&mode=design"}}return s}}class N extends _{handleData(e,t){const r={};let n=e.slice();t.folder&&(n=n.filter(e=>e.startsWith(t.folder)));for(const e of n){let n=e;!0===t.filenameOnly&&(n=E.getFileName(e));let s=e;t.folder&&(s=s.substr(t.folder.length+(t.folder.endsWith("/")?0:1))),r[n]=s}return r}}class j extends _{handleData(e,t){const r={};for(const n of e){let e=n.path;!0===t.filenameOnly&&(e=n.name);let s=n.path.replace("public:","");t.folder&&s.startsWith(t.folder)&&(s=s.substr(t.folder.length+(t.folder.endsWith("/")?0:1))),r[e]={fileName:s,previewUrl:n.originalUrl+"?width=200&height=200&angle=1"}}return r}}class U extends _{handleData(e,t){const r={};Array.isArray(e)||(e=[]);for(const t of e)r[t.postscriptName||t.PostScriptName]=this._ccUrl+`/api/FontPreview?fontPsName=${t.postscriptName||t.PostScriptName}&fontSize=17&previewText=${t.fullName||t.FullName}&scale=2`;return r}}class A extends _{handleData(e,t){let r=e.folders.slice();return t.folder&&(r=r.filter(e=>e.startsWith(t.folder)).map(e=>e.substr(t.folder.length+(t.folder.endsWith("/")?0:1)))),r.reduce((e,r)=>{const n=r.split("/");let s,o=e;return n.forEach((e,r)=>{if(!(s=o.find(t=>t.name===e))){let a=t.folder||"";a.endsWith("/")&&(a=a.substr(0,a.length-1)),a+=n.slice(0,r).reduce((e,t)=>e+"/"+t,"")+"/",s=new D(e,v.Folder,a),o.push(s)}o=s.children}),e},[])}}class D{constructor(e,t,r){this.id=E.guid(),this.name=e,this.value=void 0===r?e:r+(r.endsWith("/")?"":"/")+e,this.type=t,this.children=[]}}!function(e){e[e.Folder=0]="Folder",e[e.File=1]="File"}(v||(v={}));class O extends _{handleData(e){return e.reduce((e,t)=>(e[t]=t,e),{})}}class R{constructor(e){this._ccUrl=e}handleData(e,t){const r=t.type,n=this.getHandler(r);if(!n)return e;const s=-1!==r.toLowerCase().indexOf("mockup");if(n instanceof P)return n.handleData(s?e.mockups:e.designs,s,t);if(n instanceof N)return n.handleData(s?e.mockupFolders:e.designFolders,t);if(n instanceof j)return n.handleData(e,t);if(n instanceof U)return n.handleData(e,t);if(n instanceof A){const r=e;return n.handleData(s?{items:r.mockups,folders:r.mockupFolders}:{items:r.designs,folders:r.designFolders},t)}if(n instanceof O)return n.handleData(e);throw`Unexpected handler type: ${typeof n} for type ${r}`}getHandler(e){let t;switch(e){case"mockuplegacy":case"designlegacy":case"design-item":case"mockup-item":t=P;break;case"mockupfolderlegacy":case"designfolderlegacy":t=N;break;case"mockup-folder":case"design-folder":t=A;break;case"font":t=U;break;case"public-gallery-item":t=j;break;case"remote-list":t=O}return t?new t(this._ccUrl):null}}class F{constructor(e,t,r,n){this._ccUrl=e,this._templatesUrl=t,this._picturesUrl=r,this._fontsUrl=n,this._cacheKey="__attributeManagerMigrator",window[this._cacheKey]=window[this._cacheKey]||{}}addToCache(e,t){window[this._cacheKey][e]=t}cacheExist(e){return void 0!==window[this._cacheKey][e]}getFromCache(e){return window[this._cacheKey][e]}async fetchData(e,t,r=!0){const n=e;let s=null;if(this.cacheExist(n)&&(s=this.getFromCache(n)),s){if(e!==this._picturesUrl)return s;{let e=s;return t.folder?e.filter(e=>e.path.startsWith("public:"+t.folder)):e}}const o=r?await T.Post(e,t):await T.Get(e);return this.addToCache(n,o),o}async getPublicGalleryData(e){let t=this._picturesUrl;return this.fetchData(t,{folder:e})}async getFontData(){return this.fetchData(this._fontsUrl,{})}async getTemplates(){return this.fetchData(this._templatesUrl,{})}async getRemoteData(e){return this.fetchData(e.remote.url,e.remote.data,"post"===e.remote.method.toLowerCase())}async getValues(e){let t=new R(this._ccUrl);let r;switch(e.type){case"design-item":case"design-folder":case"mockup-item":case"mockup-folder":case"designlegacy":case"designfolderlegacy":case"mockuplegacy":case"mockupfolderlegacy":r=await this.getTemplates();break;case"public-gallery-item":r=await this.getPublicGalleryData(e.folder);break;case"font":r=await this.getFontData();break;case"remote-list":r=await this.getRemoteData(e)}return t.handleData(r,e)}}class L{static GetProvider(e,t){let r=null;const n=C.getBaseUrl(t);switch(t){case"hosted":r=new F(e,n+"/shopify/CustomersCanvasTemplates",n+"/shopify/CustomersCanvasPublicGallery",n+"/shopify/CustomersCanvasFonts");break;case"woocommerce":r=new F(e,n+"wp-admin/admin-ajax.php?action=get_cc_templates",n+"wp-admin/admin-ajax.php?action=get_cc_images",n+"wp-admin/admin-ajax.php?action=get_cc_fonts");break;case"nopcommerce":r=new F(e,n+"Admin/CcTemplates/GetTemplates",n+"Admin/CcTemplates/GetImages",n+"Admin/CcTemplates/GetFonts")}return r}}class B{constructor(e,t,r="hosted"){this._ccUrl=e,this._productId=t,this.metafields=[],this._dataProvider=L.GetProvider(e,r),this._migratorType=r}async prefetchData(){return await Promise.all([(()=>{const e=new c;return e.type="design-item",this._dataProvider.getValues(e)})(),(()=>{const e=new c;return e.type="public-gallery-item",this._dataProvider.getValues(e)})(),(()=>{const e=new c;return e.type="font",this._dataProvider.getValues(e)})()])}async migrateEditors(e){return await this.prefetchData(),this.metafields=await S.getMetafields(this._productId,this._migratorType),Promise.all(e.map(async e=>await this.migrateEditor(e)))}async migrateEditor(e){const t=new n(e);return t.allConfigs=await Promise.all(e.allConfigs.map(async e=>await this.migrateEditorConfig(e))),t}async migrateEditorConfig(e){const t=new s(e),r=JSON.parse(e.json),n=await this.migrateConfig(r,e.name);return t.json=JSON.stringify(n),t}async migrateConfig(e,t){const r=new o;r.name=t;let n=e.config||e;if(n.attributes)r.attributes=n.attributes;else if(n.attributeNames){r.attributes=[];for(const[e,t]of Object.entries(n.attributeNames))t.settings=t.settings||{},r.attributes.push(b.ParseAttribute(t))}for(const e of r.attributes)s=e.type,-1!==["design-item","design-folder","designlegacy","designfolderlegacy","mockuplegacy","mockupfolderlegacy","mockup-item","mockup-folder","public-gallery-item","font","remote-list"].indexOf(s)&&(e.values=await this._dataProvider.getValues(e)),"mockup-item"===e.type&&(e.type="design-item"),"mockup-folder"===e.type&&(e.type="design-folder"),"design-folder"===e.type&&(e.filenameOnly=!1,e.allowSelectFiles=!1,e.allowSelectFolders=!0,e.selectOnlyLeafs=!0),"remote-list"===e.type&&(e.type="list");var s;return r}}r.d(t,"Migrator",function(){return B}),r.d(t,"MetafieldService",function(){return S})}]);