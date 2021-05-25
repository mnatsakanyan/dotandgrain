(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[37],{915:function(t,e){t.exports='<style>\n    :host {\n        width: 100%;\n        height: 100%;\n    }\n</style>\n\n<iframe id="frameID" width="100%" height="100%" style="border: none;" onload="{{_initIFrame}}"></iframe>\n\n'},969:function(t,e,i){"use strict";i.r(e),i.d(e,"AuWidgetPreflight",function(){return l}),i.d(e,"widget",function(){return l});var s=i(0),a=i(172),n=i(1),r=i(915),o=i(6);class c{constructor(t,e){this.errors=t,this.warnings=e}}var h=i(20);let l=class extends a.c{constructor(){super(),this._eventsInited=!1,this.hasFiles=!1,this.hasEmptyPages=!1,this.hires=[],this.preview=[],this.previews=[],this.origins=[],this.page="",this.failedChecks=new c([],[]),this.stateId="",this.onPageChange=null,this.onError=null,this.__isLocalesInited=!1,this._initIFrame=this._initIFrame.bind(this)}updateParams(t,e){t.onPageChange&&(this.onPageChange=o.a.functionWrapperConstructor(t.onPageChange)),t.onError&&(this.onError=o.a.functionWrapperConstructor(t.onError))}get pages(){return this._element?this._element.pages:0}async updateParamsAsync(t,e){await super.updateParamsAsync(t,e);const i=await this._itemPromise();i.configuration=Object.assign({language:this.language},t.config),i.files=t.files,this.updatePreflightStyles()}async setStep(t){(await this._itemInitedPromise()).setStep(t),this.emitChange()}async setFiles(t){(await this._itemInitedPromise()).files=t}async getResults(){const t=await this._itemInitedPromise(),e=await t.finish();return this.hires=e.hires,this.previews=e.previews,this.origins=e.origins,this.preview=e.previews.map(t=>t.url),this.stateId=e.stateId,this.emitChange(),e}_itemPromise(){return new Promise((t,e)=>{if(this._element)t(this._element);else{const e=()=>{setTimeout(async()=>{if(this._iframeDoc){const e=this._iframeDoc.querySelector("au-preflight-tool");e&&(this._element=e,window.Aurigma=Object.assign(window.Aurigma,this._iframeWin.Aurigma),await this._getLocales(e),this.showPreloader(!1),t(e),await this._initSubscribers(this._element))}this._element||e()},200)};e()}})}_itemInitedPromise(){return new Promise(async(t,e)=>{const i=await this._itemPromise();i.isInited&&t(i),i.addEventListener("inited",e=>{t(i)})})}async _initSubscribers(t){this._eventsInited||(this._eventsInited=!0,t.addEventListener("stepChanged",t=>{this.page=t.detail,this.emitChange(),this.onPageChange&&this.onPageChange(this.page)}),t.addEventListener("failedChecks",t=>{this.failedChecks=t.detail,this.emitChange()}),t.addEventListener("hasFiles",t=>{this.hasFiles=t.detail,this.emitChange()}),t.addEventListener("hasEmptyPages",t=>{this.hasEmptyPages=t.detail,this.emitChange()}),t.addEventListener("error",t=>{this.onError&&this.onError(t.detail)}))}async _getLocales(t){if(!this.__isLocalesInited){let e=await this._getPreflightLocalesFile();for(const i of Object.keys(e))t.addLocalization(i,e[i],!1);t.setLanguage(this.language),this.__isLocalesInited=!0}}updatePreflightStyles(){this.params.style&&Object.keys(this.params.style).forEach(t=>{const e=this._computeValue(this.params.style[t]);this._iframeDoc.documentElement.style.setProperty(t,e)})}async _initIFrame(){this.showPreloader(!0);const t=this.querySelectorShadow("#frameID"),e=t.contentWindow||t,i=t.contentDocument||e.document,s=o.a.getDocumentCustomStyles();let a="<style> html {";for(let t of Object.entries(s))a+=t[0]+":"+t[1]+";";a+="}</style>";const n=await this._getPreflightDistFiles();i.write(n.script),i.write(n.styles),i.write(n.customStyles),i.write(a),i.write(`<div class="iconset" style="display:none;">${document.querySelector('[name="custom-icons"]').innerHTML}</div>`);const r=document.querySelector("iron-iconset-svg")._icons.preloader.getAttribute("viewBox");i.write(`<script> window.AuPreloaderSize = "${r}"; <\/script>`),i.write(`\n        <script>\n            document.addEventListener("DOMContentLoaded", () => {\n                const svgs = Array.from(document.querySelectorAll("div.icon-preflight-logo svg"));\n                svgs.forEach(svg => svg.setAttribute("viewBox", "${r}"));\n            });\n        <\/script>`),i.write('<au-preflight-tool id="preflight"></au-preflight-tool>'),this._iframeDoc=i,this._iframeWin=e}async _getPreflightLocalesFile(){const t=o.a.ensureEndsWith(this._getBackendUrl(),"/")+"static/locales.json?t="+Date.now();try{return await o.a.loadJson(t)}catch(e){return console.warn(`Failed to load locales from Preflight Backend: ${t}`),await o.a.loadJson("static/preflight/locales.json?t="+Date.now())}}async _getPreflightDistFiles(){const t=o.a.ensureEndsWith(this._getBackendUrl(),"/"),e=t+"static/script.html?t="+Date.now(),i=t+"static/style.html?t="+Date.now(),s=t+"static/customStyles.html?t="+Date.now();let a="",n="",r="";try{a=await o.a.loadHtml(i),r=await o.a.loadHtml(e);try{n=await o.a.loadHtml(s)}catch(t){n=await o.a.loadHtml("static/preflight/customStyles.html?t="+Date.now())}}catch(t){console.warn(`Failed to load Preflight scripts from backend ${e}`),a=await o.a.loadHtml(o.a.getPatchedUrl("static/preflight/style.html?t="+Date.now())),n=await o.a.loadHtml(o.a.getPatchedUrl("static/preflight/customStyles.html?t="+Date.now())),r=await o.a.loadHtml(o.a.getPatchedUrl("static/preflight/script.html?t="+Date.now()))}return{script:r,styles:a,customStyles:n}}_getBackendUrl(){const t=this.paramsRaw;if(void 0!==t.config.backendUrl&&-1===t.config.backendUrl.indexOf("{{"))return t.config.backendUrl;const e=this.jsonParamsFetcher.scope;return e.self=this,t[h.a.SCOPE_HEAD_KEY]=this.jsonParamsFetcher.head,this._jsonProcessor.process(t,e).config.backendUrl}async exportWidgetData(t){if(t){const t=await this.getResults();this.stateId=t.stateId}return{stateId:this.stateId,page:this.page}}async restoreWidgetFromData(t,e){if(this._isRestoring=!0,this.stateId=t.stateId,"firefox"===o.a.getBrowser())this._itemInitedPromise().then(e=>{e.setState(t.stateId).then(()=>{t.page&&e.setStep(t.page)})});else{const e=await this._itemInitedPromise();await e.setState(t.stateId),t.page&&e.setStep(t.page)}this._isRestoring=!1}};Object(s.b)([Object(n.c)(),Object(s.d)("design:type",Boolean)],l.prototype,"hasFiles",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",Boolean)],l.prototype,"hasEmptyPages",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",Array)],l.prototype,"hires",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",Array)],l.prototype,"preview",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",Array)],l.prototype,"previews",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",Array)],l.prototype,"origins",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",String)],l.prototype,"page",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",c)],l.prototype,"failedChecks",void 0),Object(s.b)([Object(n.c)(),Object(s.d)("design:type",String)],l.prototype,"stateId",void 0),l=Object(s.b)([Object(n.a)("au-widget-preflight",r),Object(s.d)("design:paramtypes",[])],l)}}]);