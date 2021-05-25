(window.multistep_editor_jsonpFunction=window.multistep_editor_jsonpFunction||[]).push([[34],{902:function(t,e){t.exports='<style>\n    .product {\n        border-bottom: 1px solid #E0E0E0;\n    }\n\n    .product:last-child {\n        border-bottom: 1px solid transparent;\n    }\n</style>\n<div class="item-list">\n    <template is="dom-repeat" items="[[itemArray]]" as="product" observe="product" id="test">\n        <div class="product">\n            <au-item-product image="[[product.thumbnail]]" description="{{product.description}}"\n                items="[[product.items]]"></au-item-product>\n        </div>\n    </template>\n</div>'},903:function(t,e){t.exports='<style>\n    .item {\n        display: flex;\n        padding: calc(var(--au-hem)*0.75) 0;\n    }\n\n    .item__image-container {\n        width: calc(var(--au-hem)*3.75);\n        height: calc(var(--au-hem)*3.75);\n        text-align: center;\n    }\n\n    .item__image {\n        display: inline-block;\n        width: calc(var(--au-hem)*3.75);\n        max-height: calc(var(--au-hem)*3.75);\n    }\n\n    .item__info {\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n        margin-left: calc(var(--au-hem)*1);\n        width: calc(100% - var(--au-hem) * 1);\n    }\n\n    .item__description {\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: normal;\n        line-height: calc(var(--au-hem)*1.125);\n        font-size: calc(var(--au-hem)*0.875);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n        color: #333333;\n    }\n\n    .item__action {\n        position: relative;\n        margin: calc(var(--au-hem)*0.5) calc(var(--au-hem)*0.5) calc(var(--au-hem)*0.5) 0;\n    }\n\n    .item__selected-item {\n\n\n        opacity: 0.8;\n\n        background: #F2F4F6;\n        border-radius: calc(var(--au-hem)*0.125);\n\n        padding: calc(var(--au-hem)*0.125) calc(var(--au-hem)*0.25);\n        margin-right: calc(var(--au-hem)*0.5);\n        margin-top: calc(var(--au-hem)*0.5);\n    }\n\n    .item__selected-item .item__selected-name {\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: normal;\n        line-height: calc(var(--au-hem)*0.875);\n        font-size: calc(var(--au-hem)*0.75);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n\n        color: #000000;\n\n        margin-right: calc(var(--au-hem)*0.25);\n    }\n\n    .item__remove-item {\n        border: none;\n        background: transparent;\n    }\n\n    .item__selected-group {\n        display: flex;\n        flex-wrap: wrap;\n    }\n\n    .hidden {\n        display: none !important;\n    }\n\n    .item__action-list {\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: #fff;\n        z-index: 1;\n        width: 100%;\n\n        display: flex;\n        flex-direction: column;\n        padding: calc(var(--au-hem)*0.5);\n        box-shadow: 0px calc(var(--au-hem)*0.25) calc(var(--au-hem)*0.75) rgba(0, 0, 0, 0.25);\n    }\n\n    .item__action-list .item__value {\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: 500;\n        line-height: calc(var(--au-hem)*1);\n        font-size: calc(var(--au-hem)*0.875);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n        color: #30C2FF;\n\n        cursor: pointer;\n        padding: calc(var(--au-hem)*0.5);\n    }\n\n    .item__action-list .item__value:hover {\n        background-color: #F5F7F9;\n        padding: calc(var(--au-hem)*0.5);\n    }\n\n    .item__dropdown {\n        background: transparent;\n        border: none;\n\n        font-family: var(--au-font-family);\n        font-style: normal;\n        font-weight: 500;\n        line-height: calc(var(--au-hem)*1);\n        font-size: calc(var(--au-hem)*0.875);\n        letter-spacing: calc(var(--au-hem)*0.015625);\n        color: #30C2FF;\n    }\n</style>\n<div class="item">\n    <div class="item__image-container">\n        <img class="item__image" src="[[image]]">\n    </div>\n    <div class="item__info">\n        <div class="item__description">[[description]]</div>\n        <div class="item__action">\n            <button class="item__dropdown" onblur="{{closeDropDown}}" onclick="{{openDropDown}}">+ Additional\n                Material</button>\n\n            <div class="item__action-list hidden">\n                <template is="dom-repeat" items="[[items]]" as="option">\n                    <div class="item__value" onclick="{{removeItem()}}">\n                        <paper-checkbox noink type="value" checked="[[option.value]]"></paper-checkbox>\n                        <span class="item__selected-name">[[option.name]]</span>\n                    </div>\n                </template>\n            </div>\n        </div>\n        <div class="item__selected-group">\n            <template is="dom-repeat" items="[[items]]" as="option" filter="isSelected" observe="value">\n                <div class="item__value item__selected-item">\n                    <span class="item__selected-name">[[option.name]]</span>\n                    <button class="item__remove-item" onclick="{{removeItem()}}">\n                        x\n                    </button>\n                </div>\n            </template>\n        </div>\n    </div>\n</div>\n'},968:function(t,e,n){"use strict";n.r(e),n.d(e,"AuWidgetItemList",function(){return d}),n.d(e,"widget",function(){return d});var a=n(0),i=n(902),c=n(172),o=n(1),r=n(903),l=n(15),s=n(6),m=(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}Object(a.d)(e,t),e.prototype.isSelected=function(t){return!0===t.value},e.prototype.openDropDown=function(t){s.a.isSafari()&&t.currentTarget.focus(),t.currentTarget.parentElement.querySelector(".item__action-list").classList.toggle("hidden")},e.prototype.closeDropDown=function(t){var e=t.currentTarget.parentElement.querySelector(".item__action-list");setTimeout(function(){e.classList.toggle("hidden")},150)},e.prototype.changeSelection=function(t){var e=this.items.find(function(e){return e.name===t});this.items=this.items.slice();var n=this.items.indexOf(e);this.set("items."+n+".value",!e.value)},e.prototype.removeItem=function(t){var e=this;return function(t){var n=t.target.parentElement.classList.contains("item__value")?t.target.parentElement.querySelector(".item__selected-name"):t.target.querySelector(".item__selected-name");e.changeSelection(n.textContent)}},Object(a.c)([Object(o.c)({notify:!0}),Object(a.g)("design:type",Array)],e.prototype,"items",void 0),Object(a.c)([Object(o.c)({notify:!0}),Object(a.g)("design:type",String)],e.prototype,"image",void 0),Object(a.c)([Object(o.c)({notify:!0}),Object(a.g)("design:type",String)],e.prototype,"description",void 0),e=Object(a.c)([Object(o.a)("au-item-product",r)],e)}(l.a),n(266)),d=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(a.d)(e,t),e.prototype.updateParams=function(t){this.type=t.type?t.type:"product",this.defaultValue=t.defaultValue;var e=[];t.data&&this.defaultValue&&Object.keys(t.data).forEach(function(e){return Object.keys(t.defaultValue).forEach(function(n){t.data[e][n]=t.data[e][n]?t.data[e][n]:t.defaultValue[n]})}),this.data=t.data,t.data&&Object.keys(t.data).forEach(function(n){return e.push(t.data[n])}),this.itemArray=e},e.prototype.addItem=function(t,e){var n,a=this,i=[],c=((n={})[t]=e,n),o=Object(m.a)(this.data,c);this.defaultValue&&Object.keys(o).forEach(function(t){return Object.keys(a.defaultValue).forEach(function(e){o[t][e]=o[t][e]?o[t][e]:a.defaultValue[e]})}),this.data=o,o&&Object.keys(o).forEach(function(t){return i.push(o[t])}),this.itemArray=i},e.prototype.clearData=function(){this.data={},this.itemArray=[]},Object(a.c)([Object(o.c)(),Object(a.g)("design:type",Object)],e.prototype,"params",void 0),Object(a.c)([Object(o.c)(),Object(a.g)("design:type",String)],e.prototype,"type",void 0),Object(a.c)([Object(o.c)(),Object(a.g)("design:type",Object)],e.prototype,"data",void 0),Object(a.c)([Object(o.c)(),Object(a.g)("design:type",Array)],e.prototype,"itemArray",void 0),e=Object(a.c)([Object(o.a)("au-widget-item-list",i)],e)}(c.c)}}]);