(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[34],{901:function(e,t){e.exports='<style>\n    .product {\n        border-bottom: 1px solid #E0E0E0;\n    }\n\n    .product:last-child {\n        border-bottom: 1px solid transparent;\n    }\n</style>\n<div class="item-list">\n    <template is="dom-repeat" items="[[itemArray]]" as="product" observe="product" id="test">\n        <div class="product">\n            <au-item-product image="[[product.thumbnail]]" description="{{product.description}}"\n                items="[[product.items]]"></au-item-product>\n        </div>\n    </template>\n</div>'},902:function(e,t){e.exports='<style>\n    .item {\n        display: flex;\n        padding: calc(var(--au-hem)*0.75) 0;\n    }\n\n    .item__image-container {\n        width: calc(var(--au-hem)*3.75);\n        height: calc(var(--au-hem)*3.75);\n        text-align: center;\n    }\n\n    .item__image {\n        display: inline-block;\n        width: calc(var(--au-hem)*3.75);\n        max-height: calc(var(--au-hem)*3.75);\n    }\n\n    .item__info {\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n        margin-left: calc(var(--au-hem)*1);\n        width: calc(100% - var(--au-hem) * 1);\n    }\n\n    .item__description {\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: normal;\n        line-height: calc(var(--au-hem)*1.125);\n        font-size: calc(var(--au-hem)*0.875);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n        color: #333333;\n    }\n\n    .item__action {\n        position: relative;\n        margin: calc(var(--au-hem)*0.5) calc(var(--au-hem)*0.5) calc(var(--au-hem)*0.5) 0;\n    }\n\n    .item__selected-item {\n\n\n        opacity: 0.8;\n\n        background: #F2F4F6;\n        border-radius: calc(var(--au-hem)*0.125);\n\n        padding: calc(var(--au-hem)*0.125) calc(var(--au-hem)*0.25);\n        margin-right: calc(var(--au-hem)*0.5);\n        margin-top: calc(var(--au-hem)*0.5);\n    }\n\n    .item__selected-item .item__selected-name {\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: normal;\n        line-height: calc(var(--au-hem)*0.875);\n        font-size: calc(var(--au-hem)*0.75);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n\n        color: #000000;\n\n        margin-right: calc(var(--au-hem)*0.25);\n    }\n\n    .item__remove-item {\n        border: none;\n        background: transparent;\n    }\n\n    .item__selected-group {\n        display: flex;\n        flex-wrap: wrap;\n    }\n\n    .hidden {\n        display: none !important;\n    }\n\n    .item__action-list {\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: #fff;\n        z-index: 1;\n        width: 100%;\n\n        display: flex;\n        flex-direction: column;\n        padding: calc(var(--au-hem)*0.5);\n        box-shadow: 0px calc(var(--au-hem)*0.25) calc(var(--au-hem)*0.75) rgba(0, 0, 0, 0.25);\n    }\n\n    .item__action-list .item__value {\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: 500;\n        line-height: calc(var(--au-hem)*1);\n        font-size: calc(var(--au-hem)*0.875);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n        color: #30C2FF;\n\n        cursor: pointer;\n        padding: calc(var(--au-hem)*0.5);\n    }\n\n    .item__action-list .item__value:hover {\n        background-color: #F5F7F9;\n        padding: calc(var(--au-hem)*0.5);\n    }\n\n    .item__dropdown {\n        background: transparent;\n        border: none;\n\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: 500;\n        line-height: calc(var(--au-hem)*1);\n        font-size: calc(var(--au-hem)*0.875);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n        color: #30C2FF;\n    }\n</style>\n<div class="item">\n    <div class="item__image-container">\n        <img class="item__image" src="[[image]]">\n    </div>\n    <div class="item__info">\n        <div class="item__description">[[description]]</div>\n        <div class="item__action">\n            <button class="item__dropdown" onblur="{{closeDropDown}}" onclick="{{openDropDown}}">+ Additional\n                Material</button>\n\n            <div class="item__action-list hidden">\n                <template is="dom-repeat" items="[[items]]" as="option">\n                    <div class="item__value" onclick="{{removeItem()}}">\n                        <paper-checkbox noink type="value" checked="[[option.value]]"></paper-checkbox>\n                        <span class="item__selected-name">[[option.name]]</span>\n                    </div>\n                </template>\n            </div>\n        </div>\n        <div class="item__selected-group">\n            <template is="dom-repeat" items="[[items]]" as="option" filter="isSelected" observe="value">\n                <div class="item__value item__selected-item">\n                    <span class="item__selected-name">[[option.name]]</span>\n                    <button class="item__remove-item" onclick="{{removeItem()}}">\n                        x\n                    </button>\n                </div>\n            </template>\n        </div>\n    </div>\n</div>\n'},966:function(e,t,n){"use strict";n.r(t),n.d(t,"AuWidgetItemList",function(){return u}),n.d(t,"widget",function(){return u});var a=n(0),i=n(901),c=n(172),o=n(1),r=n(902),l=n(15),s=n(6);let d=class extends l.a{isSelected(e){return!0===e.value}openDropDown(e){s.a.isSafari()&&e.currentTarget.focus(),e.currentTarget.parentElement.querySelector(".item__action-list").classList.toggle("hidden")}closeDropDown(e){let t=e.currentTarget.parentElement.querySelector(".item__action-list");setTimeout(()=>{t.classList.toggle("hidden")},150)}changeSelection(e){let t=this.items.find(t=>t.name===e);this.items=this.items.slice();let n=this.items.indexOf(t);this.set(`items.${n}.value`,!t.value)}removeItem(e){return e=>{let t=e.target.parentElement.classList.contains("item__value")?e.target.parentElement.querySelector(".item__selected-name"):e.target.querySelector(".item__selected-name");this.changeSelection(t.textContent)}}};Object(a.b)([Object(o.c)({notify:!0}),Object(a.d)("design:type",Array)],d.prototype,"items",void 0),Object(a.b)([Object(o.c)({notify:!0}),Object(a.d)("design:type",String)],d.prototype,"image",void 0),Object(a.b)([Object(o.c)({notify:!0}),Object(a.d)("design:type",String)],d.prototype,"description",void 0),d=Object(a.b)([Object(o.a)("au-item-product",r)],d);var m=n(266);let u=class extends c.c{updateParams(e){this.type=e.type?e.type:"product",this.defaultValue=e.defaultValue;let t=[];e.data&&this.defaultValue&&Object.keys(e.data).forEach(t=>Object.keys(e.defaultValue).forEach(n=>{e.data[t][n]=e.data[t][n]?e.data[t][n]:e.defaultValue[n]})),this.data=e.data,e.data&&Object.keys(e.data).forEach(n=>t.push(e.data[n])),this.itemArray=t}addItem(e,t){let n=[],a={[e]:t},i=Object(m.a)(this.data,a);this.defaultValue&&Object.keys(i).forEach(e=>Object.keys(this.defaultValue).forEach(t=>{i[e][t]=i[e][t]?i[e][t]:this.defaultValue[t]})),this.data=i,i&&Object.keys(i).forEach(e=>n.push(i[e])),this.itemArray=n}clearData(){this.data={},this.itemArray=[]}};Object(a.b)([Object(o.c)(),Object(a.d)("design:type",Object)],u.prototype,"params",void 0),Object(a.b)([Object(o.c)(),Object(a.d)("design:type",String)],u.prototype,"type",void 0),Object(a.b)([Object(o.c)(),Object(a.d)("design:type",Object)],u.prototype,"data",void 0),Object(a.b)([Object(o.c)(),Object(a.d)("design:type",Array)],u.prototype,"itemArray",void 0),u=Object(a.b)([Object(o.a)("au-widget-item-list",i)],u)}}]);