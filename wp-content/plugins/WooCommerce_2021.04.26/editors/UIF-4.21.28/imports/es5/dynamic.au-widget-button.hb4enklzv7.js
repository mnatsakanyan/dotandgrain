(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[16],{760:function(t,n){t.exports='<style>\n    :host {\n        display: block;\n        --iron-icon-height: var(--button-icon-height, 36px);\n        --iron-icon-width: var(--button-icon-width, 36px);\n    }\n\n    #button {\n        @apply --au-header-button-geometry;\n        @apply --au-button-font;\n        margin: 0;\n        width: var(--button-width, --button-icon-width, 100%);\n        height: var(--button-height, --button-icon-height, 100%);\n    }\n\n    #button {\n        background-color: var(--button-background-color, var(--theme-primary-color));\n        color: var(--button-color, var(--theme-interface-color));\n        border: var(--button-border, 0px solid var(--theme-primary-color));\n    }\n\n    #button.primary {\n        background-color: var(--theme-primary-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button.secondary {\n        background-color: var(--theme-interface-color);\n        color: var(--theme-secondary-font-color);\n    }\n\n    #button.success {\n        background-color: var(--theme-success-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button.warning {\n        background-color: var(--theme-warning-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button.danger {\n        background-color: var(--theme-error-color);\n        color: var(--theme-interface-color);\n    }\n\n    #button[disabled] {\n        background: var(--button-disable-background);\n        color: var(--button-disable-color);\n    }\n\n    paper-icon-button {\n        width: var(--button-icon-width, 36px) !important;\n        min-width: var(--button-icon-width, 36px) !important;\n        height: var(--button-icon-height, 36px) !important;\n        padding: 0 0 0 0 !important;\n        background-color: transparent !important;\n        outline: none !important;\n        border: none !important;\n    }\n\n    iron-icon {\n        height: var(--button-icon-height, 36px) !important;\n        width: var(--button-icon-width, 36px) !important;\n    }\n\n    img {\n        width: var(--button-icon-width, 36px) !important;\n        height: var(--button-icon-height, 36px) !important;\n    }\n</style>\n<dom-if if="[[_isTextButton(type)]]">\n    <template>\n        <paper-button id="button" class$="[[classStyle]]" on-tap="_onClick" hidden="[[!visible]]"\n            disabled="[[!enabled]]">\n            <span>[[text]]</span>\n        </paper-button>\n    </template>\n</dom-if>\n<dom-if if="[[!_isTextButton(type)]]">\n    <template>\n        <paper-icon-button src="[[image]]" icon="[[icon]]" id="button" class="img-btn" on-tap="_onClick"\n            hidden="[[!visible]]" disabled="[[!enabled]]"></paper-icon-button>\n    </template>\n</dom-if>\n'},936:function(t,n,o){"use strict";o.r(n),o.d(n,"AuWidgetButton",function(){return p}),o.d(n,"widget",function(){return p});var e=o(0),i=o(760),r=o(1),c=o(172),a=o(6),p=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.type="text",n}return Object(e.d)(n,t),n.prototype._isTextButton=function(t){return"text"===t||this.text&&""!==this.text},n.prototype.updateParams=function(t){var n=this;this.text=t.text||"",this.image=t.image||"",this.icon=t.icon||"",this.classStyle=t.classStyle,this.visible=t.visible,this.enabled=t.enabled,this.type=void 0===t.type||""===t.type?"text":t.type;var o=[].concat(function(){return n.enabled=!1},t.onClick,function(){return n.enabled=!0}).filter(function(t){return t});this._onClick=a.a.functionWrapperConstructor(o)},Object(e.c)([Object(r.c)(),Object(e.g)("design:type",Object)],n.prototype,"params",void 0),Object(e.c)([Object(r.c)(),Object(e.g)("design:type",String)],n.prototype,"text",void 0),Object(e.c)([Object(r.c)(),Object(e.g)("design:type",String)],n.prototype,"image",void 0),Object(e.c)([Object(r.c)(),Object(e.g)("design:type",String)],n.prototype,"icon",void 0),Object(e.c)([Object(r.c)(),Object(e.g)("design:type",String)],n.prototype,"type",void 0),Object(e.c)([Object(r.c)(),Object(e.g)("design:type",String)],n.prototype,"classStyle",void 0),Object(e.c)([Object(r.c)(),Object(e.g)("design:type",Boolean)],n.prototype,"enabled",void 0),Object(e.c)([Object(r.c)(),Object(e.g)("design:type",Boolean)],n.prototype,"visible",void 0),n=Object(e.c)([Object(r.a)("au-widget-button",i)],n)}(c.c)}}]);