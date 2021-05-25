(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[29],{885:function(n,t){n.exports='<style>\n    .collapse-title {\n        @apply --au-widget-title-font;\n    }\n\n    .tab-icon {\n        margin: 8px;\n    }\n\n    .group-container {\n        width: 100%;\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        box-sizing: border-box;\n    }\n\n    .toggle-title {\n        cursor: pointer;\n    }\n</style>\n<div class="group-container" id="container">\n    <dom-repeat items="{{tabs}}" as="tab">\n        <template>\n            <au-collapse name="[[tab.title]]" opened="[[tab.opened]]" on-opened-changed="_onOpenedChange"\n                data-tab$="[[index]]">\n                <span slot="collapse-trigger" class="collapse-title">\n                    <dom-if if="{{tab.icon}}">\n                        <template>\n                            <iron-icon icon="{{tab.icon}}" class="tab-icon"></iron-icon>\n                            <au-icon-fixer></au-icon-fixer>\n                        </template>\n                    </dom-if>\n                    <dom-if if="{{tab.title}}">\n                        <template>\n                            <span class="toggle-title">{{tab.title}}</span>\n                        </template>\n                    </dom-if>\n                </span>\n                <span slot="collapse-content">\n                    <dom-repeat items="{{tab.widgets}}" as="widget" id="repeater">\n                        <template>\n                            <au-widget name="{{widget.name}}" group="{{self}}" language="{{language}}"\n                                driver="{{driver}}" definition="{{widget}}"></au-widget>\n                        </template>\n                    </dom-repeat>\n                </span>\n            </au-collapse>\n        </template>\n    </dom-repeat>\n</div>'},886:function(n,t){n.exports='<style>\n    :host {\n        --group-padding-title-horizontal: calc(1.25 * var(--au-hem));\n        --group-padding-title-vertical: calc(1 * var(--au-hem));\n\n        --group-padding-content-top: calc(0.25 * var(--au-hem));\n        --group-padding-content-left: calc(1.25 * var(--au-hem));\n        --group-padding-content-right: calc(1.25 * var(--au-hem));\n        --group-padding-content-bottom: calc(1.875 * var(--au-hem));\n    }\n\n    .title {\n        @apply --au-widget-title-font;\n    }\n\n    .tab-icon {\n        margin: calc(0.5 * var(--au-hem));\n    }\n\n    .noncollapse-container {\n        height: 100%;\n        display: flex;\n        flex-direction: var(--au-flex-direction, column);\n        justify-content: var(--au-justify-content, unset);\n        width: var(--group-content-width, "100%");\n\n        background-color: var(--theme-background-color);\n        border: var(--au-collapse_-_border);\n        box-sizing: border-box;\n    }\n\n    .toggle-title {\n        cursor: pointer;\n    }\n\n    .noncollapse-title {\n        padding: var(--group-padding-title-vertical, 16px) var(--group-padding-title-horizontal, 20px) 0;\n        z-index: 1;\n        background-color: var(--theme-background-color);\n    }\n\n    .noncollapse-content {\n        padding: var(--group-padding-content-top, 4px) var(--group-padding-content-right, 20px) var(--group-padding-content-bottom, 30px) var(--group-padding-content-left, 20px);\n        margin-top: var(--group-padding-title-vertical, 16px);\n        margin-bottom: var(--group-padding-title-vertical, 16px);\n        flex-direction: var(--au-flex-direction, column);\n        height: calc(100% - var(--group-padding-content-top, 4px) - var(--group-padding-content-bottom, 30px) - var(--group-padding-title-vertical, 16px) - var(--group-padding-title-vertical, 16px));\n        overflow: unset !important;\n        display: inherit;\n    }\n\n    .noncollapse-content au-widget {\n        margin-bottom: var(--group-padding-content-bottom, 30px);\n        height: var(--au-widget-height, auto);\n        width: var(--au-width, 100%);\n    }\n\n    .last-line {\n        height: var(--group-padding-content-bottom, 30px);\n        width: 100%;\n    }\n\n    .scroll-content {\n        display: flex;\n        flex-direction: inherit;\n        justify-content: inherit;\n    }\n</style>\n<div class="noncollapse-container" id="container">\n    <template is="dom-if" if="{{scrollable}}">\n        <au-custom-scroll></au-custom-scroll>\n    </template>\n    <dom-repeat items="{{tabs}}" as="tab">\n        <template>\n            <dom-if if="{{tab.title}}">\n                <template>\n                    <div class="noncollapse-title" data-tab$="[[index]]">\n                        <dom-if if="{{tab.icon}}">\n                            <template>\n                                <iron-icon icon="{{tab.icon}}" class="tab-icon"></iron-icon>\n                                <au-icon-fixer></au-icon-fixer>\n                            </template>\n                        </dom-if>\n                        <dom-if if="{{tab.title}}">\n                            <template>\n                                <span class="title">{{tab.title}}</span>\n                            </template>\n                        </dom-if>\n                    </div>\n                </template>\n            </dom-if>\n            <div class="noncollapse-content" data-tab$="[[index]]">\n                <dom-repeat items="{{tab.widgets}}" as="widget" id="repeater">\n                    <template>\n                        <au-widget name="{{widget.name}}" group="{{self}}" language="{{language}}" driver="{{driver}}"\n                            definition="{{widget}}"></au-widget>\n                    </template>\n                </dom-repeat>\n                <div class="last-line"></div>\n            </div>\n        </template>\n    </dom-repeat>\n</div>'},887:function(n,t){n.exports='<style>\n    iron-selector {\n        background: var(--au-collapse-background-color, #ffffff);\n        height: 90%;\n    }\n\n    :host iron-selector {\n        background: var(--au-collapse-background-color, #ffffff);\n        height: 90%;\n    }\n\n    .group-container {\n        margin-left: 0px !important;\n        margin-right: 0px !important;\n        padding-left: 0px !important;\n        padding-right: 0px !important;\n    }\n\n    .group-container.horizontal,\n    .group-container.vertical {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-direction: normal;\n        border: 1px solid var(--theme-border-color);\n        box-sizing: border-box;\n    }\n\n    .group-container.vertical {\n        -webkit-box-orient: horizontal;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        height: 100%;\n    }\n\n    .group-container.horizontal {\n        -webkit-box-orient: vertical;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -webkit-box-flex: 1;\n        -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n        height: 100%;\n        width: 100%;\n    }\n\n    .group-container.vertical paper-listbox,\n    .group-container.horizontal paper-listbox {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: start;\n        -ms-flex-pack: start;\n        justify-content: flex-start;\n        padding: 0;\n    }\n\n    .group-container.vertical paper-listbox {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        height: 100%;\n        width: 80px;\n        background-color: var(--au-tabbed-group-container-tab-background);\n    }\n\n    .group-container.horizontal paper-listbox {\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        height: 50px;\n        background-color: var(--au-tabbed-group-container-tab-background);\n    }\n\n    .group-container.vertical paper-listbox>.tab-container,\n    .group-container.horizontal paper-listbox>.tab-container {\n        display: -webkit-inline-box;\n        display: -ms-inline-flexbox;\n        display: inline-flex;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n        -webkit-box-pack: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        -ms-user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n        background-color: var(--au-tabbed-group-tab-background);\n        color: var(--au-tabbed-group-tab-color);\n        outline: none;\n    }\n\n    .group-container.vertical paper-listbox>.tab-container:hover,\n    .group-container.horizontal paper-listbox>.tab-container:hover {\n        background-color: var(--au-tabbed-group-tab-hover-background);\n    }\n\n    .group-container.vertical paper-listbox>.tab-container.iron-selected,\n    .group-container.horizontal paper-listbox>.tab-container.iron-selected {\n        background-color: var(--theme-interface-color);\n        color: var(--theme-primary-color);\n        -webkit-box-shadow: none;\n        box-shadow: none;\n    }\n\n    .group-container.vertical paper-listbox>.tab-container {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        min-height: 58px;\n        width: 80px;\n        padding-top: 18px;\n        padding-bottom: 14px;\n        margin: 0 auto;\n    }\n\n    .group-container.vertical paper-listbox>.tab-container .toggle-title {\n        word-break: keep-all;\n        width: 100%;\n        @apply --au-caption-font;\n        margin-top: 8px;\n    }\n\n    .group-container.horizontal paper-listbox>.tab-container {\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n        flex: 1 1 auto;\n    }\n\n    .tab-container {\n        padding-top: 13px;\n        padding-bottom: 13px;\n        -webkit-box-pack: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n    }\n\n    .toggle-title {\n        @apply --au-button-font;\n        @apply --break-words;\n        text-align: center;\n    }\n\n    iron-selector>paper-item:not(.iron-selected) {\n        display: none;\n    }\n\n    iron-selector>paper-item {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -webkit-box-pack: start;\n        -ms-flex-pack: start;\n        justify-content: flex-start;\n        padding: 0px 16px 30px;\n        margin-top: 20px;\n        margin-bottom: 30px;\n        flex: 1 1 100%;\n        max-height: 630px;\n    }\n\n    paper-item:focus:before {\n        background-color: transparent;\n    }\n\n    iron-selector {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -webkit-box-pack: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 100%;\n    }\n</style>\n<div class$="group-container [[containerLayout]]" id="container"\n    style="height: 100% !important; min-height: 100% !important;">\n    <paper-listbox id="selector" selected="{{selectedIndex}}">\n        <template is="dom-repeat" items="{{tabs}}" as="tab">\n            <div class="tab-container" name="{{tab.title}}" data-tab$="[[index]]">\n                <dom-if if="{{tab.icon}}">\n                    <template>\n                        <iron-icon icon="{{tab.icon}}"></iron-icon>\n                        <au-icon-fixer></au-icon-fixer>\n                    </template>\n                </dom-if>\n                <dom-if if="{{tab.title}}">\n                    <template>\n                        <span class="toggle-title">{{tab.title}}</span>\n                    </template>\n                </dom-if>\n            </div>\n        </template>\n    </paper-listbox>\n    <div style="flex: 1 1 100%; display: flex; height: 100%; max-height: 100%!important; min-height: 93%!important;">\n        <iron-selector style="height: 100%!important; max-height: 96% !important;" attr-for-selected="id"\n            selected="[[selectedIndex]]">\n\n            <template is="dom-repeat" items="[[tabs]]" as="tab">\n                <paper-item style="height: 100%" id="[[index]]" data-tab$="[[index]]">\n                    <au-custom-scroll></au-custom-scroll>\n                    <dom-repeat items="[[tab.widgets]]" as="widget" id="repeater">\n                        <template>\n                            <au-widget name="[[widget.name]]" group="{{self}}" language="{{language}}"\n                                driver="[[driver]]" definition="[[widget]]">\n                            </au-widget>\n                        </template>\n                    </dom-repeat>\n                </paper-item>\n            </template>\n\n        </iron-selector>\n    </div>\n</div>'},888:function(n,t){n.exports='<style>\n    :host {\n        display: flex;\n        flex-direction: row;\n        flex: 0 0 auto;\n        --iron-icon-width: 24px;\n        --iron-icon-height: 24px;\n        background: var(--au-collapse-background-color, #f5f5f5);\n        @apply --au-collapse;\n    }\n\n    #trigger {\n        @apply --layout-horizontal;\n        @apply --layout-center;\n        padding-left: 16px;\n        padding-right: 16px;\n        background: var(--au-collapse-trigger-color, #E8E8E8);\n        flex: 0 0 auto;\n        flex-direction: row-reverse;\n        cursor: pointer;\n    }\n\n    #trigger ::slotted([slot=collapse-trigger]) {\n        display: inline-flex;\n        width: 100%;\n        height: var(--au-collapse-height, 38px);\n        justify-content: left;\n        align-items: center;\n    }\n\n    iron-collapse ::slotted([slot=collapse-content]) {\n        width: 100%;\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        justify-content: flex-start;\n    }\n\n    iron-collapse {\n        padding-left: 16px;\n        padding-right: 16px;\n        overflow-y: auto;\n        overflow-x: hidden;\n        max-height: 650px;\n        position: relative;\n        z-index: 1;\n        flex: 1 1 auto;\n    }\n\n    :host([opened]) {\n        flex: 1 1 auto;\n        height: 100px;\n    }\n\n    .collapse-container {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n    }\n\n    .open {\n        transform: rotate(180deg);\n        transition: transform 0.25s ease;\n    }\n\n    .close {\n        transform: rotate(360deg);\n        transition: transform 0.25s ease;\n    }\n\n    #trigger iron-icon {\n        z-index: 9;\n        color: var(--theme-text-color-1);\n    }\n</style>\n<div class="collapse-container">\n    <div id="trigger" on-tap="toggle">\n        <iron-icon icon="au-icons:expand_more" class$="[[_toggle(opened)]]" hidden$="[[noIcons]]"></iron-icon>\n        <au-icon-fixer></au-icon-fixer>\n        <slot name="collapse-trigger"></slot>\n    </div>\n    <iron-collapse id="collapse" horizontal="[[horizontal]]" no-animation="[[noAnimation]]" opened="[[opened]]">\n        <au-custom-scroll></au-custom-scroll>\n        <slot name="collapse-content"></slot>\n    </iron-collapse>\n</div>'},964:function(n,t,e){"use strict";e.r(t),e.d(t,"AuWidgetGroup",function(){return h}),e.d(t,"widget",function(){return h});var o,i=e(0),a=e(885),r=e(886),l=e(887),c=e(172),p=e(888),s=e(1),d=(function(n){function t(){var t=n.call(this)||this;return t.horizontal=!1,t.noAnimation=!1,t.opened=!0,t.noIcons=!1,t.collapseListener=t.collapseListener.bind(t),t}Object(i.d)(t,n),t.prototype.show=function(){this.open()},t.prototype.hide=function(){this.close()},t.prototype.open=function(){this.opened=!0},t.prototype.close=function(){this.opened=!1},t.prototype.toggle=function(){this.$.collapse.addEventListener("transitionend",this.collapseListener),this.opened=!this.opened},t.prototype._toggle=function(n){return n?"open":"close"},t.prototype.dispatchCollapse=function(){this.dispatchEvent(new CustomEvent("collapse",{detail:this.opened})),window.document.dispatchEvent(new CustomEvent("collapse",{detail:this.opened}))},t.prototype.collapseListener=function(){this.dispatchCollapse(),this.$.collapse.removeEventListener("transitionend",this.collapseListener)},t.prototype.connectedCallback=function(){n.prototype.connectedCallback.call(this)},Object(i.c)([Object(s.c)({notify:!0}),Object(i.g)("design:type",Boolean)],t.prototype,"horizontal",void 0),Object(i.c)([Object(s.c)({notify:!0}),Object(i.g)("design:type",Boolean)],t.prototype,"noAnimation",void 0),Object(i.c)([Object(s.c)({notify:!0,reflectToAttribute:!0}),Object(i.g)("design:type",Boolean)],t.prototype,"opened",void 0),Object(i.c)([Object(s.c)({notify:!0}),Object(i.g)("design:type",Boolean)],t.prototype,"noIcons",void 0),t=Object(i.c)([Object(s.a)("au-collapse",p),Object(i.g)("design:paramtypes",[])],t)}(e(15).a),e(6)),b=e(44),u=e(889),g=e(16);!function(n){n[n.htab=0]="htab",n[n.vtab=1]="vtab",n[n.collapsible=2]="collapsible",n[n.noncollapsible=3]="noncollapsible"}(o||(o={}));var m=e(20),f='\n            <style>\n                :host {\n                    --paper-item-selected-weight:400;\n                    --paper-listbox-background-color: transparent;\n                    width: 100%;\n                    height:100%;\n                    display: flex;\n                    flex-direction: column;\n                }\n                [hidden] {\n                    display: none !important;\n                }\n                au-widget {\n                    display:inline-table;\n                    margin-bottom:24px;\n                }\n                @media not all and (min-resolution:.001dpcm) { \n                    @supports (-webkit-appearance:none) and (not (stroke-color:transparent)) {\n                        au-widget { \n                            display:flex !important;\n                            padding-right:8px;\n                        }\n                    }\n                }\n                @media not all and (min-resolution:.001dpcm) { \n                    @supports (-webkit-appearance:none) and (stroke-color:transparent) {\n                        au-widget { \n                            display:flex !important;\n                            padding-right:8px;\n                        }\n                    }\n                }\n                @media screen and (min-color-index:0) and(-webkit-min-device-pixel-ratio:0){ \n                    @media {\n                        au-widget {\n                            display:flex !important;\n                            margin-bottom:24px;\n                            padding-right:8px;\n                        }\n                    }\n                }\n                @media screen and (-webkit-min-device-pixel-ratio:0) {\n                    au-widget {\n                        display:flex !important;\n                        margin-bottom:24px;\n                        margin-right:4px;\n                    }\n                }\n            </style>\n            <dom-if if="[[templateSwitch]]">\n                <template>\n                    <dom-if if="[[isNonCollapsible(type)]]">\n                        <template>\n                            '+r+'\n                        </template>\n                    </dom-if>\n                    <dom-if if="[[isCollapsible(type)]]">\n                        <template>\n                            '+a+'\n                        </template>\n                    </dom-if>                  \n                </template>\n            </dom-if>\n            <dom-if if="[[!templateSwitch]]">\n                <template>\n                    '+l+"\n                </template>\n            </dom-if>\n",h=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.format="full-height",t.tabs=[],t.selectedIndex=0,t.containerLayout="",t.templateSwitch=!0,t.accordion=!0,t.selectedTitle="",t.unifySelection=!1,t}return Object(i.d)(t,n),Object.defineProperty(t,"template",{get:function(){},enumerable:!1,configurable:!0}),t.prototype.clearSelection=function(){this.selectedIndex=-1},Object.defineProperty(t.prototype,"_",{get:function(){return b.Maybe.maybe(this._currentWidget).bind(function(n){return n._})},enumerable:!1,configurable:!0}),t.prototype.connectedCallback=function(){var t=this;this.self=this,n.prototype.connectedCallback.call(this),this.selectedIndex=0,this.tabs.forEach(function(n){n.widgets.forEach(function(t){t.format="group",n.title&&(t.formatTitle="subtitle")})});var e=[].concat.apply([],Object(i.i)(this.tabs.map(function(n){return n.widgets}))).map(function(n){return n.name});this.observable.pipe(Object(u.filter)(function(n){return n.header===g.a.WIDGET_CHANGE&&e.indexOf(n.name)>=0&&!!n.sender._})).subscribe(function(n){var o=t.jsonParamsFetcher.scope;t._currentWidget=n.sender,t.unifySelection&&e.filter(function(t){return t!==n.name}).forEach(function(n){b.Maybe.maybe(o.$).map(function(t){return t[n]}).map(function(n){return(n.clearSelection||function(){}).bind(n)}).chain(function(n){return n()})})}),setTimeout(function(){if(t.auWizard._isVerticalMobileLayout){var n=t.querySelectorShadow(".noncollapse-content");n&&(n.style.paddingBottom="0px",n.style.marginBottom="0px")}},200)},t.prototype._paramsRawObserver=function(t){n.prototype._paramsRawObserver.call(this,t),this.updateParams(t)},t.prototype._onOpenedChange=function(n){var t=this;n.detail.value&&this.accordion&&this.tabs.forEach(function(e,o){var i=n.target.name===e.title;t.set("tabs."+o+".opened",i)})},t.prototype.updateParams=function(n){var t=this;this.scrollable=!1!==n.scrollable,this.type=o[n.type]||o.htab,this.unifySelection=!!n.unifySelection,this.accordion=!!d.a.typeofCheck(n.accordion,"undefined")||n.accordion,this.type===o.vtab||this.type===o.htab?(this.containerLayout=this.type===o.htab?"horizontal":"vertical",this.templateSwitch=!1):this.templateSwitch=!0;var e=this.tabs.map(function(n){return!!n.opened}),i=n.tabs||[];(e.forEach(function(n,e){n&&(t.selectedIndex=e),i[e]&&(i[e].opened=n)}),this.tabs=i,this.accordion)&&(!this.tabs.find(function(n){return n.opened})&&this.tabs.length>0&&(this.tabs[0].opened=!0))},t.prototype.recompileParams=function(n,t,e){var o=this;void 0===e&&(e=!1);var i=JSON.parse(JSON.stringify(this.originWidget.definition.params));i[m.a.SCOPE_HEAD_KEY]=this.jsonParamsFetcher.head,this._jsonProcessor.process(i,n).tabs.map(function(n,t){Object.keys(n).forEach(function(e){"id"!==e&&"widgets"!==e&&(o.tabs[t][e]=n[e])})}),this.updateVisibleParams(),this.oldParams=this.params,this.params=t},t.prototype.updateVisibleParams=function(){var n=this;this.tabs.forEach(function(t,e){var o=t.visible;null!==o&&void 0!==o&&Array.from(n.querySelectorAllShadow("[data-tab='"+e+"']")).forEach(function(n){return n.hidden=!o})})},t.prototype.isCollapsible=function(n){return this.type===o.collapsible},t.prototype.isNonCollapsible=function(n){return this.type===o.noncollapsible},Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Object)],t.prototype,"params",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Array)],t.prototype,"tabs",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Object)],t.prototype,"type",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Boolean)],t.prototype,"scrollable",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Number)],t.prototype,"selectedIndex",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",String)],t.prototype,"containerLayout",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Boolean)],t.prototype,"templateSwitch",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Boolean)],t.prototype,"accordion",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",String)],t.prototype,"selectedTitle",void 0),Object(i.c)([Object(s.c)(),Object(i.g)("design:type",Object),Object(i.g)("design:paramtypes",[])],t.prototype,"_",null),t=Object(i.c)([Object(s.a)("au-widget-group",f)],t)}(c.b)}}]);