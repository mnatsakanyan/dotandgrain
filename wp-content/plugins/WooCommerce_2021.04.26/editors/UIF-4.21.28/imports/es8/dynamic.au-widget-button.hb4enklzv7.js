(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[16],{757:function(t,n){t.exports='<style>\n    :host {\n        display: block;\n        --iron-icon-height: var(--button-icon-height, 36px);\n        --iron-icon-width: var(--button-icon-width, 36px);\n    }\n\n    #button {\n        @apply --au-header-button-geometry;\n        @apply --au-button-font;\n        margin: 0;\n        width: var(--button-width, --button-icon-width, 100%);\n        height: var(--button-height, --button-icon-height, 100%);\n    }\n\n    #button {\n        background-color: var(--button-background-color, var(--theme-primary-color));\n        color: var(--button-color, var(--theme-interface-color));\n        border: var(--button-border, 0px solid var(--theme-primary-color));\n    }\n\n    #button.primary {\n        background-color: var(--theme-primary-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button.secondary {\n        background-color: var(--theme-interface-color);\n        color: var(--theme-secondary-font-color);\n    }\n\n    #button.success {\n        background-color: var(--theme-success-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button.warning {\n        background-color: var(--theme-warning-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button.danger {\n        background-color: var(--theme-error-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button[disabled] {\n        background: var(--button-disable-background);\n        color: var(--button-disable-color);\n    }\n\n    paper-icon-button {\n        width: var(--button-icon-width, 36px) !important;\n        min-width: var(--button-icon-width, 36px) !important;\n        height: var(--button-icon-height, 36px) !important;\n        padding: 0 0 0 0 !important;\n        background-color: transparent !important;\n        outline: none !important;\n        border: none !important;\n    }\n\n    iron-icon {\n        height: var(--button-icon-height, 36px) !important;\n        width: var(--button-icon-width, 36px) !important;\n    }\n\n    img {\n        width: var(--button-icon-width, 36px) !important;\n        height: var(--button-icon-height, 36px) !important;\n    }\n</style>\n<dom-if if="[[_isTextButton(type)]]">\n    <template>\n        <paper-button id="button" class$="[[classStyle]]" on-tap="_onClick" hidden="[[!visible]]"\n            disabled="[[!enabled]]">\n            <span>[[text]]</span>\n        </paper-button>\n    </template>\n</dom-if>\n<dom-if if="[[!_isTextButton(type)]]">\n    <template>\n        <paper-icon-button src="[[image]]" icon="[[icon]]" id="button" class="img-btn" on-tap="_onClick"\n            hidden="[[!visible]]" disabled="[[!enabled]]"></paper-icon-button>\n    </template>\n</dom-if>\n'},934:function(t,n,o){"use strict";o.r(n),o.d(n,"AuWidgetButton",function(){return b}),o.d(n,"widget",function(){return b});var e=o(0),i=o(757),r=o(1),c=o(172),a=o(6);let b=class extends c.c{constructor(){super(...arguments),this.type="text"}_isTextButton(t){return"text"===t||this.text&&""!==this.text}updateParams(t){this.text=t.text||"",this.image=t.image||"",this.icon=t.icon||"",this.classStyle=t.classStyle,this.visible=t.visible,this.enabled=t.enabled,this.type=void 0===t.type||""===t.type?"text":t.type;const n=[].concat(()=>this.enabled=!1,t.onClick,()=>this.enabled=!0).filter(t=>t);this._onClick=a.a.functionWrapperConstructor(n)}};Object(e.b)([Object(r.c)(),Object(e.d)("design:type",Object)],b.prototype,"params",void 0),Object(e.b)([Object(r.c)(),Object(e.d)("design:type",String)],b.prototype,"text",void 0),Object(e.b)([Object(r.c)(),Object(e.d)("design:type",String)],b.prototype,"image",void 0),Object(e.b)([Object(r.c)(),Object(e.d)("design:type",String)],b.prototype,"icon",void 0),Object(e.b)([Object(r.c)(),Object(e.d)("design:type",String)],b.prototype,"type",void 0),Object(e.b)([Object(r.c)(),Object(e.d)("design:type",String)],b.prototype,"classStyle",void 0),Object(e.b)([Object(r.c)(),Object(e.d)("design:type",Boolean)],b.prototype,"enabled",void 0),Object(e.b)([Object(r.c)(),Object(e.d)("design:type",Boolean)],b.prototype,"visible",void 0),b=Object(e.b)([Object(r.a)("au-widget-button",i)],b)}}]);