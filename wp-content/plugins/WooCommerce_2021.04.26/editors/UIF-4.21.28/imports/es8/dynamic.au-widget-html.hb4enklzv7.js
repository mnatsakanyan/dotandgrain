(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[31],{890:function(t,n){t.exports='<style>\n    :host {\n        width: 100%;\n        height: 100%;\n        display: block;\n    }\n\n    h1 {\n        @apply --au-h1-font\n    }\n\n    h2 {\n        @apply --au-h2-font\n    }\n\n    h3 {\n        @apply --au-h3-font\n    }\n\n    h4 {\n        @apply --au-h4-font\n    }\n\n    .subtitle1 {\n        @apply --au-subtitle1-font\n    }\n\n    .subtitle2 {\n        @apply --au-subtitle2-font\n    }\n\n    div,\n    p,\n    span {\n        @apply --au-body2-font\n    }\n\n    .body1 {\n        @apply --au-body1-font\n    }\n\n    .button {\n        @apply --au-button-font\n    }\n\n    .caption {\n        @apply --au-caption-font\n    }\n\n    .overline {\n        @apply --au-overline-font\n    }\n</style>\n<div class="html" id="container"></div>'},891:function(t,n){var e={transform:function(t,n,i){var r={events:[],html:""},a={events:!1};if(a=e._extend(a,i),void 0!==n||void 0!==t){var s="string"==typeof t?JSON.parse(t):t;r=e._transform(s,n,a)}return a.events?r:r.html},_extend:function(t,n){var e={};for(var i in t)e[i]=t[i];for(var i in n)e[i]=n[i];return e},_append:function(t,n){var e={html:"",event:[]};return void 0!==t&&void 0!==n&&(e.html=t.html+n.html,e.events=t.events.concat(n.events)),e},_isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},_transform:function(t,n,i){var r={events:[],html:""};if(e._isArray(t))for(var a=t.length,s=0;s<a;++s)r=e._append(r,e._apply(t[s],n,s,i));else"object"==typeof t&&(r=e._append(r,e._apply(t,n,void 0,i)));return r},_apply:function(t,n,i,r){var a={events:[],html:""};if(e._isArray(n))for(var s=n.length,o=0;o<s;++o)a=e._append(a,e._apply(t,n[o],i,r));else if("object"==typeof n){var l="<>";if(void 0===n[l]&&(l="tag"),void 0!==n[l]){var c=e._getValue(t,n,l,i);a.html+="<"+c;var p,u={events:[],html:""};for(var h in n)switch(h){case"tag":case"<>":break;case"text":var d=n[h];if(e._isArray(d));else if("function"==typeof d){var f=d.call(t,t,i);if(!e._isArray(f))switch(typeof f){case"function":case"undefined":case"object":break;default:u.html+=e.toText(f)}}else p=e.toText(e._getValue(t,n,h,i));break;case"children":case"html":d=n[h];if(e._isArray(d))u=e._append(u,e._apply(t,d,i,r));else if("function"==typeof d){f=d.call(t,t,i);if(!e._isArray(f))switch(typeof f){case"object":void 0!==f.html&&void 0!==f.events&&(u=e._append(u,f));break;case"function":case"undefined":break;default:u.html+=f}}else p=e._getValue(t,n,h,i);break;default:var v=!1;if(h.length>2&&"on"==h.substring(0,2).toLowerCase()){if(r.events){var b={action:n[h],obj:t,data:r.eventData,index:i},m=e._guid();a.events[a.events.length]={id:m,type:h.substring(2),data:b},a.html+=" json2html-event-id-"+h.substring(2)+"='"+m+"'"}v=!0}if(!v){var y,g=e._getValue(t,n,h,i);if(void 0!==g)y="string"==typeof g?'"'+g.replace(/"/g,"&quot;")+'"':g,a.html+=" "+h+"="+y}}a.html+=">",p&&(a.html+=p),(a=e._append(a,u)).html+="</"+c+">"}}return a},_guid:function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+t()+"-"+t()+t()},_getValue:function(t,n,i,r){var a=n[i],s=typeof a;return"function"===s?a.call(t,t,r):"string"===s?new e._tokenizer([/\$\{([^\}\{]+)\}/],function(n,e,i){return e?n.replace(i,function(n,e){for(var i=e.split("."),r=t,a="",s=i.length,o=0;o<s;++o){if(i[o].length>0)if(null===(r=r[i[o]])||void 0===r)break}return null!==r&&void 0!==r&&(a=r),a}):n}).parse(a).join(""):a},toText:function(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/\//g,"&#x2F;")},_tokenizer:function(t,n){if(!(this instanceof e._tokenizer))return new e._tokenizer(t,n);this.tokenizers=t.splice?t:[t],n&&(this.doBuild=n),this.parse=function(t){this.src=t,this.ended=!1,this.tokens=[];do{this.next()}while(!this.ended);return this.tokens},this.build=function(t,n){t&&this.tokens.push(this.doBuild?this.doBuild(t,n,this.tkn):t)},this.next=function(){var t,n=this;n.findMin(),t=n.src.slice(0,n.min),n.build(t,!1),n.src=n.src.slice(n.min).replace(n.tkn,function(t){return n.build(t,!0),""}),n.src||(n.ended=!0)},this.findMin=function(){var t,n,e=0;for(this.min=-1,this.tkn="";void 0!==(t=this.tokenizers[e++]);)-1!=(n=this.src[t.test?"search":"indexOf"](t))&&(-1==this.min||n<this.min)&&(this.tkn=t,this.min=n);-1==this.min&&(this.min=this.src.length)}}};t.exports=e},938:function(t,n,e){"use strict";e.r(n),e.d(n,"AuWidgetHtml",function(){return l}),e.d(n,"widget",function(){return l});var i=e(0),r=e(890),a=e(172),s=e(891),o=e(1);let l=class extends a.c{constructor(){super(...arguments),this._isRestoring=!1}updateParams(t){this.data=t.data||{},this.template=t.template,this.$.container.innerHTML=s.transform(this.data,this.template)}async exportWidgetData(t){return this.$&&this.$.container?{html:this.$.container.innerHTML}:null}async restoreWidgetFromData(t,n){t&&t.html!==this.$.container.innerHTML&&(this.$.container.innerHTML=t.html)}};Object(i.b)([Object(o.c)(),Object(i.d)("design:type",Object)],l.prototype,"params",void 0),Object(i.b)([Object(o.c)(),Object(i.d)("design:type",Object)],l.prototype,"data",void 0),Object(i.b)([Object(o.c)(),Object(i.d)("design:type",Object)],l.prototype,"template",void 0),l=Object(i.b)([Object(o.a)("au-widget-html",r)],l)}}]);