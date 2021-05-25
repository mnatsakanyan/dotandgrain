(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[37],{917:function(t,e){t.exports='<style>\n    :host {\n        width: 100%;\n        height: 100%;\n    }\n</style>\n\n<iframe id="frameID" width="100%" height="100%" style="border: none;" onload="{{_initIFrame}}"></iframe>\n\n'},971:function(t,e,n){"use strict";n.r(e),n.d(e,"AuWidgetPreflight",function(){return u}),n.d(e,"widget",function(){return u});var i=n(0),r=n(172),s=n(1),o=n(917),a=n(6),c=function(){return function(t,e){this.errors=t,this.warnings=e}}(),l=n(20),u=function(t){function e(){var e=t.call(this)||this;return e._eventsInited=!1,e.hasFiles=!1,e.hasEmptyPages=!1,e.hires=[],e.preview=[],e.previews=[],e.origins=[],e.page="",e.failedChecks=new c([],[]),e.stateId="",e.onPageChange=null,e.onError=null,e.__isLocalesInited=!1,e._initIFrame=e._initIFrame.bind(e),e}return Object(i.d)(e,t),e.prototype.updateParams=function(t,e){t.onPageChange&&(this.onPageChange=a.a.functionWrapperConstructor(t.onPageChange)),t.onError&&(this.onError=a.a.functionWrapperConstructor(t.onError))},Object.defineProperty(e.prototype,"pages",{get:function(){return this._element?this._element.pages:0},enumerable:!1,configurable:!0}),e.prototype.updateParamsAsync=function(e,n){return Object(i.b)(this,void 0,void 0,function(){var r;return Object(i.e)(this,function(i){switch(i.label){case 0:return[4,t.prototype.updateParamsAsync.call(this,e,n)];case 1:return i.sent(),[4,this._itemPromise()];case 2:return(r=i.sent()).configuration=Object.assign({language:this.language},e.config),r.files=e.files,this.updatePreflightStyles(),[2]}})})},e.prototype.setStep=function(t){return Object(i.b)(this,void 0,void 0,function(){return Object(i.e)(this,function(e){switch(e.label){case 0:return[4,this._itemInitedPromise()];case 1:return e.sent().setStep(t),this.emitChange(),[2]}})})},e.prototype.setFiles=function(t){return Object(i.b)(this,void 0,void 0,function(){return Object(i.e)(this,function(e){switch(e.label){case 0:return[4,this._itemInitedPromise()];case 1:return e.sent().files=t,[2]}})})},e.prototype.getResults=function(){return Object(i.b)(this,void 0,void 0,function(){var t;return Object(i.e)(this,function(e){switch(e.label){case 0:return[4,this._itemInitedPromise()];case 1:return[4,e.sent().finish()];case 2:return t=e.sent(),this.hires=t.hires,this.previews=t.previews,this.origins=t.origins,this.preview=t.previews.map(function(t){return t.url}),this.stateId=t.stateId,this.emitChange(),[2,t]}})})},e.prototype._itemPromise=function(){var t=this;return new Promise(function(e,n){if(t._element)e(t._element);else{var r=function(){setTimeout(function(){return Object(i.b)(t,void 0,void 0,function(){var t;return Object(i.e)(this,function(n){switch(n.label){case 0:return this._iframeDoc&&(t=this._iframeDoc.querySelector("au-preflight-tool"))?(this._element=t,window.Aurigma=Object.assign(window.Aurigma,this._iframeWin.Aurigma),[4,this._getLocales(t)]):[3,3];case 1:return n.sent(),this.showPreloader(!1),e(t),[4,this._initSubscribers(this._element)];case 2:n.sent(),n.label=3;case 3:return this._element||r(),[2]}})})},200)};r()}})},e.prototype._itemInitedPromise=function(){var t=this;return new Promise(function(e,n){return Object(i.b)(t,void 0,void 0,function(){var t;return Object(i.e)(this,function(n){switch(n.label){case 0:return[4,this._itemPromise()];case 1:return(t=n.sent()).isInited&&e(t),t.addEventListener("inited",function(n){e(t)}),[2]}})})})},e.prototype._initSubscribers=function(t){return Object(i.b)(this,void 0,void 0,function(){var e=this;return Object(i.e)(this,function(n){return this._eventsInited||(this._eventsInited=!0,t.addEventListener("stepChanged",function(t){e.page=t.detail,e.emitChange(),e.onPageChange&&e.onPageChange(e.page)}),t.addEventListener("failedChecks",function(t){e.failedChecks=t.detail,e.emitChange()}),t.addEventListener("hasFiles",function(t){e.hasFiles=t.detail,e.emitChange()}),t.addEventListener("hasEmptyPages",function(t){e.hasEmptyPages=t.detail,e.emitChange()}),t.addEventListener("error",function(t){e.onError&&e.onError(t.detail)})),[2]})})},e.prototype._getLocales=function(t){return Object(i.b)(this,void 0,void 0,function(){var e,n,r,s,o,a;return Object(i.e)(this,function(c){switch(c.label){case 0:return this.__isLocalesInited?[3,2]:[4,this._getPreflightLocalesFile()];case 1:e=c.sent();try{for(n=Object(i.k)(Object.keys(e)),r=n.next();!r.done;r=n.next())s=r.value,t.addLocalization(s,e[s],!1)}catch(t){o={error:t}}finally{try{r&&!r.done&&(a=n.return)&&a.call(n)}finally{if(o)throw o.error}}t.setLanguage(this.language),this.__isLocalesInited=!0,c.label=2;case 2:return[2]}})})},e.prototype.updatePreflightStyles=function(){var t=this;this.params.style&&Object.keys(this.params.style).forEach(function(e){var n=t._computeValue(t.params.style[e]);t._iframeDoc.documentElement.style.setProperty(e,n)})},e.prototype._initIFrame=function(){return Object(i.b)(this,void 0,void 0,function(){var t,e,n,r,s,o,c,l,u,h,d,p,g;return Object(i.e)(this,function(f){switch(f.label){case 0:this.showPreloader(!0),t=this.querySelectorShadow("#frameID"),e=t.contentWindow||t,n=t.contentDocument||e.document,r=a.a.getDocumentCustomStyles(),s="<style> html {";try{for(o=Object(i.k)(Object.entries(r)),c=o.next();!c.done;c=o.next())l=c.value,s+=l[0]+":"+l[1]+";"}catch(t){p={error:t}}finally{try{c&&!c.done&&(g=o.return)&&g.call(o)}finally{if(p)throw p.error}}return s+="}</style>",[4,this._getPreflightDistFiles()];case 1:return u=f.sent(),n.write(u.script),n.write(u.styles),n.write(u.customStyles),n.write(s),n.write('<div class="iconset" style="display:none;">'+document.querySelector('[name="custom-icons"]').innerHTML+"</div>"),h=document.querySelector("iron-iconset-svg")._icons.preloader,d=h.getAttribute("viewBox"),n.write('<script> window.AuPreloaderSize = "'+d+'"; <\/script>'),n.write('\n        <script>\n            document.addEventListener("DOMContentLoaded", () => {\n                const svgs = Array.from(document.querySelectorAll("div.icon-preflight-logo svg"));\n                svgs.forEach(svg => svg.setAttribute("viewBox", "'+d+'"));\n            });\n        <\/script>'),n.write('<au-preflight-tool id="preflight"></au-preflight-tool>'),this._iframeDoc=n,this._iframeWin=e,[2]}})})},e.prototype._getPreflightLocalesFile=function(){return Object(i.b)(this,void 0,void 0,function(){var t,e;return Object(i.e)(this,function(n){switch(n.label){case 0:t=a.a.ensureEndsWith(this._getBackendUrl(),"/"),e=t+"static/locales.json?t="+Date.now(),n.label=1;case 1:return n.trys.push([1,3,,5]),[4,a.a.loadJson(e)];case 2:return[2,n.sent()];case 3:return n.sent(),console.warn("Failed to load locales from Preflight Backend: "+e),[4,a.a.loadJson("static/preflight/locales.json?t="+Date.now())];case 4:return[2,n.sent()];case 5:return[2]}})})},e.prototype._getPreflightDistFiles=function(){return Object(i.b)(this,void 0,void 0,function(){var t,e,n,r,s,o,c;return Object(i.e)(this,function(i){switch(i.label){case 0:t=a.a.ensureEndsWith(this._getBackendUrl(),"/"),e=t+"static/script.html?t="+Date.now(),n=t+"static/style.html?t="+Date.now(),r=t+"static/customStyles.html?t="+Date.now(),s="",o="",c="",i.label=1;case 1:return i.trys.push([1,9,,13]),[4,a.a.loadHtml(n)];case 2:return s=i.sent(),[4,a.a.loadHtml(e)];case 3:c=i.sent(),i.label=4;case 4:return i.trys.push([4,6,,8]),[4,a.a.loadHtml(r)];case 5:return o=i.sent(),[3,8];case 6:return i.sent(),[4,a.a.loadHtml("static/preflight/customStyles.html?t="+Date.now())];case 7:return o=i.sent(),[3,8];case 8:return[3,13];case 9:return i.sent(),console.warn("Failed to load Preflight scripts from backend "+e),[4,a.a.loadHtml(a.a.getPatchedUrl("static/preflight/style.html?t="+Date.now()))];case 10:return s=i.sent(),[4,a.a.loadHtml(a.a.getPatchedUrl("static/preflight/customStyles.html?t="+Date.now()))];case 11:return o=i.sent(),[4,a.a.loadHtml(a.a.getPatchedUrl("static/preflight/script.html?t="+Date.now()))];case 12:return c=i.sent(),[3,13];case 13:return[2,{script:c,styles:s,customStyles:o}]}})})},e.prototype._getBackendUrl=function(){var t=this.paramsRaw;if(void 0!==t.config.backendUrl&&-1===t.config.backendUrl.indexOf("{{"))return t.config.backendUrl;var e=this.jsonParamsFetcher.scope;return e.self=this,t[l.a.SCOPE_HEAD_KEY]=this.jsonParamsFetcher.head,this._jsonProcessor.process(t,e).config.backendUrl},e.prototype.exportWidgetData=function(t){return Object(i.b)(this,void 0,void 0,function(){var e;return Object(i.e)(this,function(n){switch(n.label){case 0:return t?[4,this.getResults()]:[3,2];case 1:e=n.sent(),this.stateId=e.stateId,n.label=2;case 2:return[2,{stateId:this.stateId,page:this.page}]}})})},e.prototype.restoreWidgetFromData=function(t,e){return Object(i.b)(this,void 0,void 0,function(){var e;return Object(i.e)(this,function(n){switch(n.label){case 0:return this._isRestoring=!0,this.stateId=t.stateId,"firefox"!==a.a.getBrowser()?[3,1]:(this._itemInitedPromise().then(function(e){e.setState(t.stateId).then(function(){t.page&&e.setStep(t.page)})}),[3,4]);case 1:return[4,this._itemInitedPromise()];case 2:return[4,(e=n.sent()).setState(t.stateId)];case 3:n.sent(),t.page&&e.setStep(t.page),n.label=4;case 4:return this._isRestoring=!1,[2]}})})},Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Boolean)],e.prototype,"hasFiles",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Boolean)],e.prototype,"hasEmptyPages",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Array)],e.prototype,"hires",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Array)],e.prototype,"preview",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Array)],e.prototype,"previews",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Array)],e.prototype,"origins",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",String)],e.prototype,"page",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",c)],e.prototype,"failedChecks",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",String)],e.prototype,"stateId",void 0),e=Object(i.c)([Object(s.a)("au-widget-preflight",o),Object(i.g)("design:paramtypes",[])],e)}(r.c)}}]);