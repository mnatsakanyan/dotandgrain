(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[6],{577:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var i=n(0),s=n(406),r=n(6),a=n(28),d=n(14),l=n(1);class o extends s.a{init(e){if(super.init(e),this.maxSelectedItems=r.a.objectDeepValue(e,"props.maxCount")?e.props.maxCount:-1,0!==this.items.length&&r.a.isNullOrUndefined(this.value)){let e=this.items.filter(e=>e.optionValue.preselected);0===e.length&&(e=[this.items.find(e=>0===e.price)]),0===e.length&&(e=[this.items[0]]),this.value=e}}updateSelectedValue(e){const t=this.value.filter(t=>e.some(e=>t.value&&e.id===t.value.id));((e,t)=>e.length!==t.length||e.some(e=>t.every(t=>t.id!==e.optionValue.id)))(t,this.value)&&(this.deselect(this.value),this.select(t),this.value=t)}_copySelection(){return r.a.isNotNullOrUndefined(this.value)?Array.from(this.value):void 0}_restoreSelection(e){let t=this.items.filter(t=>e.some(e=>e.equals(t)));this.select(t)}_maxSelectionItemsChanged(){this.maxSelectedItems>-1&&this.value.length>this.maxSelectedItems&&this.deselect(Array.of(this.getLastSelectedItem()))}_valueChange(e){this._valueObserver(this.value)}_valueObserver(e){this._debouncerValueObserver=a.a.debounce(this._debouncerValueObserver,d.d.after(20),()=>{this._maxSelectionItemsChanged(),this._onOptionChange()})}}Object(i.b)([Object(l.b)("maxSelectedItems"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[]),Object(i.d)("design:returntype",void 0)],o.prototype,"_maxSelectionItemsChanged",null),Object(i.b)([Object(l.b)("value.splices"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object]),Object(i.d)("design:returntype",void 0)],o.prototype,"_valueChange",null),Object(i.b)([Object(l.c)(),Object(i.d)("design:type",Array)],o.prototype,"value",void 0),Object(i.b)([Object(l.b)("value"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object]),Object(i.d)("design:returntype",void 0)],o.prototype,"_valueObserver",null),Object(i.b)([Object(l.c)(),Object(i.d)("design:type",Object)],o.prototype,"maxSelectedItems",void 0)},927:function(e,t){e.exports='<style>\n    :host {\n        display: -ms-grid;\n        display: grid;\n        -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n        -ms-grid-rows: 100px 1fr 30px;\n        grid-template-rows: auto 1fr 24px;\n        width: 100%;\n        overflow: hidden;\n    }\n\n    .add-btn {\n        @apply --default-common-control-font;\n        color: var(--theme-primary-color);\n        white-space: nowrap;\n        cursor: pointer;\n        user-select: none;\n        display: inline-flex;\n        align-items: center;\n    }\n\n    .add-btn iron-icon {\n        margin-left: 2px;\n    }\n\n    .add-btn:hover {\n        color: #18A3FF;\n    }\n\n    .add-btn:active {\n        color: #0A95FF;\n        filter: drop-shadow(0 0 0.5px currentColor);\n    }\n\n    .remove-btn {\n        color: #999999;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .remove-btn:hover {\n        color: #888888;\n    }\n\n    .remove-btn:active {\n        color: #777777;\n        filter: drop-shadow(0 0 0.5px currentColor);\n    }\n\n    .drag-btn {\n        color: #BBBBBB;\n        outline: none;\n        cursor: move;\n        cursor: grab;\n        cursor: -moz-grab;\n        cursor: -webkit-grab;\n    }\n\n    .drag-btn:active {\n        cursor: grabbing;\n        cursor: -moz-grabbing;\n        cursor: -webkit-grabbing;\n    }\n\n    .drag-btn:hover {\n        color: #443e3e;\n    }\n\n    .listgroup-container {\n        counter-reset: items;\n        margin-bottom: 20px;\n    }\n\n    .listgroup-container>.au-filter-list-wrapper>au-filter-list::before {\n        @apply --default-common-control-font-caption;\n        color: #666666;\n        margin-bottom: 6px;\n        counter-increment: items;\n        content: attr(data-alias) " "counter(items);\n        display: inline-block;\n    }\n\n    .au-filter-list-wrapper+.au-filter-list-wrapper {\n        margin-top: 15px;\n    }\n\n    [slot="right-control"] {\n        margin-left: 10px;\n    }\n\n    [draggable] {\n        -moz-user-select: none;\n        -khtml-user-select: none;\n        -webkit-user-select: none;\n        user-select: none;\n        -khtml-user-drag: element;\n        -webkit-user-drag: element;\n    }\n\n    iron-icon {\n        pointer-events: none;\n    }\n\n    .au-filter-list-wrapper {\n        display: inline-block;\n        overflow: visible;\n        width: 100%;\n    }\n\n    .au-filter-list-wrapper.dragging,\n    .au-filter-list-wrapper.over {\n        border-radius: 3px;\n\n        width: 100%;\n        height: 100%;\n        z-index: 1000;\n        padding: 5px;\n    }\n\n    .au-filter-list-wrapper.dragging {\n        opacity: 0.5;\n        background: #FFFF;\n    }\n\n    .au-filter-list-wrapper.over {\n        background: var(--theme-primary-color);\n        opacity: 0.15;\n    }\n\n    .au-filter-list-wrapper>au-filter-list {\n        width: 100%;\n    }\n\n    .au-filter-list-wrapper.over>au-filter-list,\n    .au-filter-list-wrapper.dragging>au-filter-list {\n        width: calc(100% - 10px);\n    }\n\n    [hidden] {\n        display: none !important;\n    }\n</style>\n\n<iron-iconset-svg name="au-filtered-list-group" size="24">\n    <svg>\n        <defs>\n            <g id="plus" transform="translate(5 5)">\n                <path d="M13 8H8V13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13V8H1C0.45 8 0 7.55 0 7C0 6.45 0.45 6 1 6H6V1C6 0.45 6.45 0 7 0C7.55 0 8 0.45 8 1V6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z" />\n            </g>\n            <g id="cross" transform="translate(5.40771 5.40771)">\n                <path d="M12.8925 0.3025C12.5025 -0.0874998 11.8725 -0.0874998 11.4825 0.3025L6.5925 5.1825L1.7025 0.2925C1.3125 -0.0975 0.6825 -0.0975 0.2925 0.2925C-0.0975 0.6825 -0.0975 1.3125 0.2925 1.7025L5.1825 6.5925L0.2925 11.4825C-0.0975 11.8725 -0.0975 12.5025 0.2925 12.8925C0.6825 13.2825 1.3125 13.2825 1.7025 12.8925L6.5925 8.0025L11.4825 12.8925C11.8725 13.2825 12.5025 13.2825 12.8925 12.8925C13.2825 12.5025 13.2825 11.8725 12.8925 11.4825L8.0025 6.5925L12.8925 1.7025C13.2725 1.3225 13.2725 0.6825 12.8925 0.3025Z" />\n            </g>\n            <g id="drag" transform="translate(9 5)">\n                <path d="M6 0H4V2H6V0Z" />\n                <path d="M4 4H6V6H4V4Z" />\n                <path d="M6 8H4V10H6V8Z" />\n                <path d="M6 12H4V14H6V12Z" />\n                <path d="M0 12H2V14H0V12Z" />\n                <path d="M2 8H0V10H2V8Z" />\n                <path d="M0 4H2V6H0V4Z" />\n                <path d="M2 0H0V2H2V0Z" />\n            </g>\n        </defs>\n    </svg>\n</iron-iconset-svg>\n\n<div class="listgroup-container" id="container">\n    <dom-repeat items="[[_listInstancesGuids]]" as="listGuid" on-dom-change="_filterListsRerendered">\n        <template>\n            <div class="au-filter-list-wrapper">\n                <au-filter-list items="[[items]]" data-alias="Team" id="[[listGuid.id]]" selected-item="{{listGuid.selected}}"\n                    draggable="true" is-show-menu="[[_isShowMenu]]" enable-filter="[[enableFilter]]" driver="[[driver]]">\n                    <div class="remove-btn" slot="right-control" on-tap="_removeList" data-list="[[listGuid.id]]">\n                        <iron-icon icon="au-filtered-list-group:cross" style="margin:0;"></iron-icon>\n                    </div>\n                    <div class="drag-btn" slot="left-control" data-list="[[listGuid]]">\n                        <iron-icon icon="au-filtered-list-group:drag" slot="left-control" style="margin:0;"></iron-icon>\n                    </div>\n                </au-filter-list>\n            </div>\n        </template>\n    </dom-repeat>\n</div>\n<div class="add-btn" on-tap="_addList" hidden$="[[_hideAddBtn]]">\n    <iron-icon icon="au-filtered-list-group:plus"></iron-icon>\n    {{addNewItemCaption}}\n</div>'},956:function(e,t,n){"use strict";n.r(t),n.d(t,"AuFilteredListGroup",function(){return l}),n.d(t,"option",function(){return l});var i=n(0),s=n(927),r=n(577),a=(n(295),n(1)),d=(n(755),n(6));let l=class extends r.a{constructor(e){super(e),this._listInstancesGuids=[],this._selectedToIdMap={},this._isShowMenu=!1,this._removeList=this._removeList.bind(this)}connectedCallback(){super.connectedCallback(),this._isShowMenu=!1,this._addList()}getLastSelectedItem(){return this.value.length>0?this.value[0]:null}select(e){const t=this._listInstancesGuids.filter(e=>!e.selected).length;if(t<e.length)for(let n=0;n<e.length-t;n++)this._addList();for(const t of e){const e=this._listInstancesGuids.findIndex(e=>!e.selected);this.set(`_listInstancesGuids.${e}.selected`,t)}}deselect(e){for(const t of e){const e=this._listInstancesGuids.map((e,n)=>e.selected&&e.selected.id===t.id?n:-1).filter(e=>-1!==e);e.length>0&&e.forEach(e=>this.set(`_listInstancesGuids.${e}.selected`,null))}}_selectedIdsChange(e){}_removeList(e){let t=e.currentTarget.dataList,n=this._listInstancesGuids.find(e=>e.id===t);if(n){let e=this._listInstancesGuids.indexOf(n);this.splice("_listInstancesGuids",e,1)}}_addList(){var e=null;0===this._listInstancesGuids.length&&this.value&&(e=this.value[0]||null);let t={id:d.a.guid(),selected:e};this.push("_listInstancesGuids",t)}_hideAddBtnCompute(e,t){return!(t<=0)&&e.base.length>=t}_filterListsRerendered(e){let t=Array.from(this.querySelectorAllShadow("au-filter-list")||[]);t.forEach(e=>{this._addDnDHandlers(e),this._addSelectedItemHandler(e)}),t.forEach((e,t,n)=>{e.isDragEnabled=1!==n.length,e.isRemoveEnabled=1!==n.length,e.placeholder=this.title})}_addSelectedItemHandler(e){if("true"===e.dataset.listenSelected)return;let t=()=>{let e=Array.from(this.querySelectorAllShadow("au-filter-list")||[]);this.set("value",e.map(e=>e.selectedItem).filter(e=>!!e))};e.addEventListener("selected-item-changed",t),e.addEventListener("disconnected",t),e.dataset.listenSelected=!0}_handleDragStart(e,t){return t.target.querySelector(".drag-btn")===(this.shadowRoot.elementFromPoint?this.shadowRoot.elementFromPoint(t.clientX,t.clientY):document.elementFromPoint(t.clientX,t.clientY))?(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text",e.id),e.parentElement.classList.add("dragging"),!0):(t.preventDefault(),!1)}_handleDragOver(e,t){return t.preventDefault(),e.parentElement.classList.add("over"),t.dataTransfer.dropEffect="move",!1}_handleDragLeave(e,t){e.parentElement.classList.remove("over")}_handleDrop(e,t){t.preventDefault(),t.stopPropagation();let n=t.dataTransfer.getData("text"),i=t.currentTarget.id;return this._listInstancesGuidsSwap(n,i),e.parentElement.classList.remove("over"),!1}_handleDragEnd(e,t){e.parentElement.classList.remove("over","dragging")}_addDnDHandlers(e){"true"!==e.dataset.listenDrag&&(e.addEventListener("dragstart",this._handleDragStart.bind(this,e),!1),e.addEventListener("dragover",this._handleDragOver.bind(this,e),!1),e.addEventListener("dragleave",this._handleDragLeave.bind(this,e),!1),e.addEventListener("drop",this._handleDrop.bind(this,e),!1),e.addEventListener("dragend",this._handleDragEnd.bind(this,e),!1),e.dataset.listenDrag=!0)}_listInstancesGuidsSwap(e,t){let n=this.querySelectorShadow(`[id="${e}"]`),i=this.querySelectorShadow(`[id="${t}"]`),s=i.selectedItem;i.selectedItem=n.selectedItem,n.selectedItem=s}init(e){super.init(e),this.addNewItemCaption=d.a.isNotNullOrUndefined(e.props)&&e.props.addNewItemCaption?e.props.addNewItemCaption:"Add"}};Object(i.b)([Object(a.c)({notify:!0}),Object(i.d)("design:type",Array)],l.prototype,"_listInstancesGuids",void 0),Object(i.b)([Object(a.c)({notify:!0}),Object(i.d)("design:type",Object)],l.prototype,"_selectedToIdMap",void 0),Object(i.b)([Object(a.c)({computed:"_hideAddBtnCompute(_listInstancesGuids.*, maxSelectedItems)"}),Object(i.d)("design:type",Boolean)],l.prototype,"_hideAddBtn",void 0),Object(i.b)([Object(a.c)({notify:!0}),Object(i.d)("design:type",Boolean)],l.prototype,"_isShowMenu",void 0),Object(i.b)([Object(a.b)("_listInstancesGuids.*","maxSelectedItems"),Object(i.d)("design:type",Function),Object(i.d)("design:paramtypes",[Object,Number]),Object(i.d)("design:returntype",void 0)],l.prototype,"_hideAddBtnCompute",null),Object(i.b)([Object(a.c)({notify:!0}),Object(i.d)("design:type",String)],l.prototype,"addNewItemCaption",void 0),l=Object(i.b)([Object(a.a)("au-option-filtered-list-group",s),Object(i.d)("design:paramtypes",[Object])],l)}}]);