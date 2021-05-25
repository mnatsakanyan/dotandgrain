(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[1],{399:function(e,t,n){"use strict";n.d(t,"a",function(){return i});class i{constructor(e,t=!1){this.optionValue=e,this.disabled=t}equals(e){return this.id===e.id&&this.title===e.title&&this.price===e.price}get value(){return this.optionValue}get id(){return this.optionValue.id}get title(){return this.optionValue.title}get price(){return this.optionValue.price}get color(){return this.optionValue.color}get imageUrl(){return this.optionValue.imageUrl}get props(){return this.optionValue.props}get shownPrice(){return this.optionValue.shownPrice}get preselected(){return this.optionValue.preselected}}},406:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var i=n(0),o=n(419),r=n(399),s=n(6),l=n(1);class d extends o.a{init(e){super.init(e);const t=this._copySelection();this.items=e.values.map((e,t)=>((s.a.isNullOrUndefined(e.id)||-1===e.id)&&(e.id=t),new r.a(e,e.disabled))),s.a.isNotNullOrUndefined(t)&&this._restoreSelection(t),this.enableFilter=s.a.isNotNullOrUndefined(e.props)&&e.props.enableFilter||!1,e.onAvailableOptionValueChange&&e.onAvailableOptionValueChange.subscribe((e,t)=>this.updateItemsAvailability(t)),e.onOptionValueChange&&e.onOptionValueChange.subscribe((e,t)=>this.updateSelectedValue(t))}_copySelection(){return s.a.isNotNullOrUndefined(this.value)?Object.assign({},this.value):void 0}_restoreSelection(e){this.value=this.items.find(t=>t.equals(e))}_isArrayEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}_getItemPriceTitle(e){const t=e=>e&&0!==e?" (+"+this.driver.cart.formatPrice(e)+")":"";let n=t(e.price);return null!==e.shownPrice&&void 0!==e.shownPrice&&(n=t(e.shownPrice*(this.driver.orders.current._priceMultiplier||1))),e.title+n}_isOptionDisabled(e){return this.disabled||e}updateItemsAvailability(e){for(let t=0;t<this.items.length;t++){const n=e.every(e=>e.id!==this.items[t].id);this.set(`items.${t}.disabled`,n)}}_disabledClass(e){return e?"item-disabled":""}}Object(i.b)([Object(l.c)(),Object(i.d)("design:type",Array)],d.prototype,"items",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Boolean)],d.prototype,"enableFilter",void 0)},755:function(e,t,n){"use strict";var i=n(0),o=n(925),r=(n(215),n(926)),s=n(15),l=n(1);let d=class extends s.a{constructor(e=null,t){super(),this.pairedElement=null,this.items=[],this.selectedItem=null,this.notFoundMessage="No results found.",this.opened=!1,this.highlightString="",this.hidden=!0,this._observers=[],this.pairedElement=e,this.driver=t}_itemsIsNotEmpty(e){return e.length>0}_selectedItemChange(e,t){e&&e.id!==(t||{id:-99999}).id&&(this.$.list.clearSelection(),this.$.list.selectItem(e),this.opened=!1)}highlightStringChange(e){this.highLightText(e)}_openedChange(){this.hidden=!this.opened}disconnectedCallback(){super.disconnectedCallback(),this._observers.forEach(e=>{e.disconnect()}),this._observers.length=0,this._observers=[]}connectedCallback(){super.connectedCallback();let e=this,t=new MutationObserver(function(t){t.forEach(t=>{Array.from(t.addedNodes).filter(e=>"paper-item"===e.nodeName.toLowerCase()).forEach(t=>{let n=new MutationObserver(t=>{t.forEach(t=>{if("data-item"===t.attributeName){let n=t.target;n.innerHTML=e.boldizeSubString(n.dataset.item,e.highlightString)}})});e._observers.push(n),n.observe(t,{attributes:!0})})})});e._observers.push(t),t.observe(e.$.list,{childList:!0})}highLightText(e){Array.from(this.querySelectorAllShadow("paper-item")).forEach(e=>{e.innerHTML=e.dataset.item}),0!==e.length&&Array.from(this.querySelectorAllShadow("paper-item")).forEach(t=>{t.innerHTML=this.boldizeSubString(t.dataset.item,e)})}boldizeSubString(e,t){return e.replace(new RegExp(`(${t.toLowerCase().replace(/\s+/g," ")})`,"ig"),"<b>$1</b>").replace(/\s/gi,"&nbsp;")}_handlerForFixBlur(e){if("paper-item"===e.target.tagName.toLowerCase()){e.preventDefault();let t=this.$.list;this.selectedItem=null,this.selectedItem=t.modelForElement(e.target)[t.as],this.pairedElement&&(this.pairedElement.focus(),this.pairedElement.blur())}}_getItemPriceTitle(e){let t=e.price&&0!==e.price?" (+ "+this.driver.cart.formatPrice(e.price)+")":"";return e.title+t}_getItemPrice(e){return e.price&&0!==e.price?" (+ "+this.driver.cart.formatPrice(e.price)+")":""}};Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Array)],d.prototype,"items",void 0),Object(i.b)([Object(l.c)({notify:!0,observer:"_selectedItemChange"}),Object(i.d)("design:type",Object)],d.prototype,"selectedItem",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",String)],d.prototype,"notFoundMessage",void 0),Object(i.b)([Object(l.c)({notify:!0,observer:"_openedChange"}),Object(i.d)("design:type",Object)],d.prototype,"opened",void 0),Object(i.b)([Object(l.c)({notify:!0,observer:"highlightStringChange"}),Object(i.d)("design:type",Object)],d.prototype,"highlightString",void 0),Object(i.b)([Object(l.c)({notify:!0,reflectToAttribute:!0}),Object(i.d)("design:type",Object)],d.prototype,"hidden",void 0),d=Object(i.b)([Object(l.a)("au-filter-list-external-part",r),Object(i.d)("design:paramtypes",[HTMLElement,Object])],d);let p=class extends s.a{constructor(e=[],t=null,n=!1){super(),this.placeholder="",this.filterString="",this.selectedItem=null,this._filteredItems=[],this.isShowMenu=!1,this.enableFilter=!1,this.open=!1,this._dropDownMenu=null,this._paperInput=null,this._interceptor=null,this.isDragEnabled=!1,this.isRemoveEnabled=!1,this.items=e,this.selectedItem=t,this._onNeedAdjustPosition=this._onNeedAdjustPosition.bind(this),this._listenersPairs=[],this.enableFilter=n}_inputDisabledComputed(e){return this._fit(),!this.enableFilter}openStateChanged(){this._fit(),this._active=this.open}activeStateChanged(e){this.open=!!e,this._fit()}containerActiveClassComputed(e,t){return this._fit(),e&&t?"active-selected":e?"active":t?"selected":""}_isShowLeftSlotObserver(e,t){if(this.$.leftControl){let n=this.$.leftControl.classList;return n.remove("hide","show"),n.add(!e||t?"hide":"show"),n.toString()}return""}_isShowRightSlotObserver(e){if(this.$.rightControl){let t=this.$.rightControl.classList;return t.remove("hide","show"),t.add(e?"show":"hide"),t.toString()}return""}_selectedValuePlaceholderObserver(e,t,n){return e&&0===n.length?e.title:n.length>0?"":t}_onFocus(){this._active=!0,this._fit()}_onBlur(e){this._active=!1,this._fit()}_onSelectorBlur(e){return()=>{this._active=!1,this.open=!1,this._fit()}}_onNeedAdjustPosition(){this._active=!1,this._fit()}connectedCallback(){this._dropDownMenu=document.body.appendChild(new d(null,this.driver)),super.connectedCallback(),this._paperInput=this.$.paperinput,this._interceptor=this.$.interceptor,window.document.addEventListener("collapse",this._onNeedAdjustPosition),window.document.addEventListener("drawer",this._onNeedAdjustPosition),window.addEventListener("scroll",this._onNeedAdjustPosition),window.addEventListener("resize",this._onNeedAdjustPosition),this._fit(),this._listenerFunc=(e=>this._keyListener(e)),document.addEventListener("keydown",this._listenerFunc)}_keyListener(e){if(this.root.activeElement===this.$.paperinput)switch(e.keyCode?e.keyCode:e.which?e.which:null){case 38:this.keyboardChangeSelected(-1);break;case 40:this.keyboardChangeSelected(1);break;case 27:this.open&&(this.open=!1);break;case 13:case 32:this.open?this.keyboardApplyChangeSelected():this.keyboardOpenActiveDropdown()}}keyboardChangeSelected(e){if(this._dropDownMenu&&this.open){const t=this._dropDownMenu.$.list,n=t.items,i=t.selectedItem;let o=n.indexOf(i)+e;o>n.length-1&&(o=n.length-1),o<0&&(o=0),t.selectIndex(o)}}keyboardApplyChangeSelected(){this._dropDownMenu&&(this._dropDownMenu.selectedItem=this._dropDownMenu.$.list.selectedItem)}keyboardOpenActiveDropdown(){this.root.activeElement===this.$.paperinput&&(this.open=!0)}_dropdownAperienceObserver(e){e&&(e.addEventListener("selected-item-changed",e=>{null!==e.detail.value&&(this.selectedItem=e.detail.value,this.filterString="")}),this._fit())}_paperInputAperienceObserver(e){this._dropDownMenu&&e&&(this._dropDownMenu.pairedElement=e.querySelector("#paperinput"),this._dropDownMenu.items=this._filteredItems,this._dropDownMenu.highlightString=this.filterString,this._dropDownMenu.opened=!(!this.isShowMenu&&!this._active),this._dropDownMenu.selectedItem=this.selectedItem,this._dropDownMenu.opened&&e.focus(),this._listenAnyScroll(this,e=>{this._fit()}),this._fit(),this.isShowMenu&&(this._active=!0))}disconnectedCallback(){super.disconnectedCallback(),window.document.removeEventListener("collapse",this._onNeedAdjustPosition),window.document.removeEventListener("drawer",this._onNeedAdjustPosition),window.removeEventListener("scroll",this._onNeedAdjustPosition),window.removeEventListener("resize",this._onNeedAdjustPosition),document.body.removeChild(this._dropDownMenu),document.removeEventListener("keydown",this._listenerFunc),this._dropDownMenu=null,this._paperInput=null,this.dispatchEvent(new CustomEvent("disconnected"))}_listenAnyScroll(e,t){if(null===e||e instanceof HTMLDocument)return null;if(e.scrollHeight>e.clientHeight||e.classList.contains("scroll-content")){let n=function(e){t(e.detail?e.detail.originalEvent:e)};e.addEventListener("scroll",n),this._listenersPairs.push({name:"scroll",listener:n,node:e})}this._listenAnyScroll(e.parentNode&&e.parentNode.host?e.parentNode.host:e.parentNode,t)}_init(e){}notifyItemsChanged(e){this._dropDownMenu&&this._dropDownMenu.notifyPath(e.path)}_filterItems(e,t,n){let i=t.base.filter(t=>t.title.toLowerCase().includes(e.toLowerCase()));JSON.stringify(this._filteredItems.map(e=>e.title))!==JSON.stringify(i.map(e=>e.title))&&(this._filteredItems=i),this._fit()}_filteredItemsChanged(){this._dropDownMenu&&(this._dropDownMenu.items=this._filteredItems,this.openChanged())}filterStringChanged(){this._dropDownMenu&&(this._dropDownMenu.highlightString=this.filterString)}openChanged(){this._fit(),this._dropDownMenu&&(this._dropDownMenu.opened=this.open,this._dropDownMenu.selectedItem&&setTimeout(()=>{const e=this._dropDownMenu.items.indexOf(this._dropDownMenu.selectedItem);this._dropDownMenu.$.list.selectIndex(e)},100),this._paperInput&&this.isShowMenu&&this._paperInput.focus())}_fit(){let e=()=>{if(this._dropDownMenu&&this._paperInput){let e=this._dropDownMenu.hidden;this._dropDownMenu.hidden=!1;let t=this._paperInput.getBoundingClientRect(),n=this._dropDownMenu.getBoundingClientRect(),i=n.height+t.bottom>window.innerHeight;this._dropDownMenu.dataset.flip=i,this._dropDownMenu.style.top=i?t.top-n.height+1+"px":t.bottom-1+"px",this._dropDownMenu.style.left=t.left+"px",this._dropDownMenu.style.width=t.width+"px",this._dropDownMenu.hidden=e}};e(),window.setTimeout(e,50)}_selectedItemChanged(e){if(null!==e&&this._dropDownMenu){this._dropDownMenu.selectedItem=e,this.open=!1;let t=this.querySelectorShadow("#filter");t&&t.blur()}}_openMenu(){this.open=!this.open}};Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",String)],p.prototype,"placeholder",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",String)],p.prototype,"filterString",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Object)],p.prototype,"selectedItem",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Array)],p.prototype,"_filteredItems",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Boolean)],p.prototype,"isShowMenu",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Boolean)],p.prototype,"enableFilter",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Object)],p.prototype,"driver",void 0),Object(i.b)([Object(l.c)({notify:!0,observer:"openStateChanged"}),Object(i.d)("design:type",Boolean)],p.prototype,"open",void 0),Object(i.b)([Object(l.c)({notify:!0,computed:"_inputDisabledComputed(enableFilter)"}),Object(i.d)("design:type",Boolean)],p.prototype,"_inputDisabled",void 0),Object(i.b)([Object(l.c)({notify:!0,observer:"_dropdownAperienceObserver"}),Object(i.d)("design:type",d)],p.prototype,"_dropDownMenu",void 0),Object(i.b)([Object(l.c)({notify:!0,observer:"_paperInputAperienceObserver"}),Object(i.d)("design:type",Object)],p.prototype,"_paperInput",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Object)],p.prototype,"_interceptor",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Boolean)],p.prototype,"isDragEnabled",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Boolean)],p.prototype,"isRemoveEnabled",void 0),Object(i.b)([Object(l.c)({notify:!0}),Object(i.d)("design:type",Boolean)],p.prototype,"_active",void 0),Object(i.b)([Object(l.b)("_active","selectedItem"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object]),Object(i.d)("design:returntype",void 0)],p.prototype,"activeStateChanged",null),Object(i.b)([Object(l.c)({notify:!0,computed:"containerActiveClassComputed(_active, selectedItem)"}),Object(i.d)("design:type",String)],p.prototype,"containerActiveClass",void 0),Object(i.b)([Object(l.c)({computed:"_selectedValuePlaceholderObserver(selectedItem, placeholder, filterString)"}),Object(i.d)("design:type",String)],p.prototype,"_selectedValuePlaceholder",void 0),Object(i.b)([Object(l.b)("isDragEnabled","_active"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object,Object]),Object(i.d)("design:returntype",void 0)],p.prototype,"_isShowLeftSlotObserver",null),Object(i.b)([Object(l.b)("isRemoveEnabled"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object]),Object(i.d)("design:returntype",void 0)],p.prototype,"_isShowRightSlotObserver",null),Object(i.b)([Object(l.b)("items.*"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object]),Object(i.d)("design:returntype",void 0)],p.prototype,"notifyItemsChanged",null),Object(i.b)([Object(l.b)("filterString","items.*","open"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[String,Object,Boolean]),Object(i.d)("design:returntype",void 0)],p.prototype,"_filterItems",null),Object(i.b)([Object(l.b)("_filteredItems"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[]),Object(i.d)("design:returntype",void 0)],p.prototype,"_filteredItemsChanged",null),Object(i.b)([Object(l.b)("filterString"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[]),Object(i.d)("design:returntype",void 0)],p.prototype,"filterStringChanged",null),Object(i.b)([Object(l.b)("open"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[]),Object(i.d)("design:returntype",void 0)],p.prototype,"openChanged",null),Object(i.b)([Object(l.b)("selectedItem"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object]),Object(i.d)("design:returntype",void 0)],p.prototype,"_selectedItemChanged",null),p=Object(i.b)([Object(l.a)("au-filter-list",o),Object(i.d)("design:paramtypes",[Object,Object,Boolean])],p)},925:function(e,t){e.exports='<style>\n    :host {\n        display: block;\n        overflow: visible;\n        flex: 1 1 auto;\n        --iron-icon-width: 24px;\n        --iron-icon-height: 24px;\n        z-index: 10;\n        @apply --default-common-control-font;\n    }\n\n    paper-item {\n        background-color: white;\n        cursor: pointer;\n    }\n\n    iron-icon {\n        margin: 0 !important;\n    }\n\n    [slot="prefix"] {\n        background: white;\n        display: inline-block;\n        position: absolute;\n        top: 0;\n        left: 0;\n        padding: 0 10px;\n        font-size: 14px;\n        color: #333333;\n    }\n\n    [hidden] {\n        display: none !important;\n    }\n\n    #interceptor {\n        width: 100%;\n        height: 1px;\n        display: block;\n        background: rgba(0, 0, 0, 0);\n    }\n\n    .list-container {\n        display: inline-flex;\n        width: 100%;\n        align-items: center;\n        flex-direction: row;\n    }\n\n    #paperinput:hover {\n        border-color: rgba(34, 36, 38, .35)\n    }\n\n    #paperinput.active,\n    #paperinput.active-selected {\n        border: 1px solid var(--theme-primary-color, black);\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);\n        border-radius: 3px;\n    }\n\n\n    #paperinput {\n        display: inline-flex;\n        width: 100%;\n        flex-direction: row;\n        padding: 6px 6px 6px 0;\n        box-sizing: border-box;\n        position: relative;\n        border: 1px solid #CCCCCC;\n        border-radius: 3px;\n        align-items: center;\n    }\n\n    #paperinput>.inner {\n        position: relative;\n        flex: 1 1 auto;\n        border: none;\n        font-size: 14px;\n        line-height: 16px;\n        height: 22px;\n        width: 100%;\n        display: flex;\n        outline: none;\n    }\n\n    #paperinput>.inner>.filter {\n        position: absolute;\n        border: none;\n        height: 22px;\n        width: 100%;\n        outline: none;\n        top: 0;\n        left: 0;\n        background: rgba(0, 0, 0, 0);\n        color: #333333;\n        padding: 0;\n        vertical-align: middle;\n        @apply --default-common-control-font;\n\n    }\n\n\n\n    #paperinput>.inner>.value {\n        user-select: none;\n        cursor: default;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        color: #999999;\n        @apply --default-common-control-font;\n    }\n\n    #paperinput.selected>.inner>.value {\n        color: #333333;\n    }\n\n\n    #paperinput .triangle {\n        color: #333333;\n        cursor: pointer;\n        outline: none;\n    }\n\n    au-option-heading {\n        margin-top: 15px;\n        margin-bottom: 15px;\n    }\n\n    ::slotted([slot=right-control]),\n    ::slotted([slot=left-control]) {\n        display: inline-block;\n    }\n\n    .left-control-wrapper.hide {\n        margin-right: 12px;\n    }\n\n    .left-control-wrapper.hide ::slotted([slot=left-control]),\n    .right-control-wrapper.hide ::slotted([slot=right-control]) {\n        display: none;\n    }\n\n    .left-control-wrapper.show {\n        margin-right: 2px;\n    }\n\n    .left-control-wrapper,\n    .right-control-wrapper {\n        display: inline-block;\n    }\n\n    /* можно переопределить стандартный браузерный стиль выбранного элемента */\n    div:focus {\n        outline: 1px solid var(--theme-primary-color, black);\n    }\n</style>\n\n<iron-iconset-svg name="au-filtered-list" size="24">\n    <svg>\n        <defs>\n            <g id="triangle" transform="translate(7 9.99976)">\n                <path d="M2.41421 0C1.52331 0 1.07714 1.07714 1.70711 1.70711L4.29289 4.29289C4.68342 4.68342 5.31658 4.68342 5.70711 4.29289L8.29289 1.70711C8.92286 1.07714 8.47669 0 7.58579 0H2.41421Z" />\n            </g>\n        </defs>\n    </svg>\n</iron-iconset-svg>\n<div class="list-container">\n    <div id="paperinput" class$="[[containerActiveClass]]" tabindex="-1" onblur="{{_onSelectorBlur()}}">\n        <div class="left-control-wrapper" id="leftControl">\n            <slot name="left-control"></slot>\n        </div>\n        <div class="inner">\n            <div style="width:100%" class="value" on-tap="_openMenu">\n                <template is="dom-if" if="[[selectedItem.imageUrl]]">\n                    <img src="[[selectedItem.imageUrl]]" alt="[[selectedItem.title]]">\n                </template>\n                <template is="dom-if" if="[[!selectedItem.imageUrl]]">\n                    [[_selectedValuePlaceholder]]\n                </template>\n            </div>\n\n            <template is="dom-if" if="[[!_inputDisabled]]">\n                <input class="filter" id="filter" value="{{filterString::input}}" tabindex="0" on-focus="_onFocus"\n                    on-blur="_onBlur" />\n            </template>\n        </div>\n        <div class="triangle" tabindex="1" on-tap="_openMenu" onblur="{{_onSelectorBlur()}}">\n            <iron-icon icon="au-filtered-list:triangle"></iron-icon>\n        </div>\n    </div>\n    <div class="right-control-wrapper" id="rightControl">\n        <slot name="right-control"></slot>\n    </div>\n</div>\n<div id="interceptor"></div>'},926:function(e,t){e.exports='<style>\n    :host {\n        display: inline-block;\n\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 350px;\n        height: 150px;\n        z-index: 10000;\n        background: #FFFFFF;\n        border: 1px solid var(--theme-primary-color, black);\n        box-sizing: border-box;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);\n        border-radius: 0 0 3px 3px;\n        border-top: none;\n        outline: none;\n        --paper-item-min-height: 0;\n        --paper-font-subhead_-_font-size: 14px;\n        --paper-font-subhead_-_font-weight: 400;\n        --paper-font-subhead_-_line-height: 16px;\n        @apply --paper-font-common-base;\n    }\n\n    paper-item {\n        background-color: #FFFFFF;\n        padding: 10px;\n        color: rgba(0, 0, 0, 0.87);\n    }\n\n    paper-item[selected] {\n        background-color: #F7F7F7;\n        color: rgba(0, 0, 0, .95);\n        font-weight: bold;\n    }\n\n    paper-item:hover {\n        background-color: #F2F2F2;\n        color: rgba(0, 0, 0, .95);\n        cursor: pointer;\n    }\n\n    paper-item[disabled] {\n        opacity: 0.4;\n    }\n\n    [hidden] {\n        display: none !important;\n    }\n\n    iron-collapse {\n        width: 100%;\n        height: 100%;\n    }\n\n    .not-found {\n        @apply --default-common-control-font;\n        font-size: 14px;\n        line-height: 16px;\n        color: #999999;\n        position: absolute;\n        top: 10px;\n        left: 12px;\n    }\n\n    iron-list {\n        height: 100%;\n        width: 100%;\n    }\n\n    iron-collapse {\n        width: 100%;\n        height: 100%;\n        position: relative;\n    }\n\n    :host([data-flip=true]) {\n        transform: scaleY(-1);\n    }\n\n    :host([data-flip=true]) iron-list {\n        transform: scaleY(-1);\n    }\n\n    :host .filter-list__item {\n        width: 100%;\n        user-select: none;\n    }\n\n    .filter-list__item_type_image {\n        pointer-events: none;\n        vertical-align: middle;\n    }\n</style>\n\n<iron-collapse opened=[[opened]] horizontal=[[true]] id="collapse">\n    <iron-list items={{items}} as="item" selection-enabled=true on-mousedown="_handlerForFixBlur" id="list">\n        <template>\n            <paper-item class="filter-list__item" tabindex$="[[tabIndex]]" name$=[[item.id]] data-item$=[[item.title]]\n                selected$=[[selected]] disabled$="[[item.disabled]]">\n                <template is="dom-if" if="[[item.imageUrl]]">\n                    <div class="filter-list__item_type_image">\n                        <img class="filter-list__item_type_image" src="[[item.imageUrl]]" alt="[[item.title]]">\n                        [[_getItemPrice(item)]]\n                    </div>\n                </template>\n                <template is="dom-if" if="[[!item.imageUrl]]">\n                    <div style="width: 100%; pointer-events: none;">\n                        [[_getItemPriceTitle(item)]]\n                    </div>\n                </template>\n            </paper-item>\n        </template>\n    </iron-list>\n    <div class="not-found" hidden$="[[_itemsIsNotEmpty(items)]]">[[notFoundMessage]]</div>\n</iron-collapse>'}}]);