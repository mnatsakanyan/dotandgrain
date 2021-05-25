window.ccHelper = Object.assign(window.ccHelper || {}, {
    editorLoaded: false,
    localizations: {
        "en": {
            closingWarning: "If you close this window you will lose your personalized design. Close window?"
        },
        "ru": {
            closingWarning: "Если вы закроете это окно, персонализированный дизайн будет утерян. Закрыть окно?"
        }
    },
    getQueryParameters: function (url) {
        const params = {};
        if (!url) url = window.location.href;
        const queryIndex = url.lastIndexOf('?');
        const query = url.substring(queryIndex === -1 ? url.length : queryIndex + 1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        delete params[""];
        return params;
    }, 
    getExistingOrder: function () {
        const queryParams = this.getQueryParameters();
        const stateId = queryParams["stateId"];
        const snapshot = queryParams["snapshot"];
        const key = queryParams["cartKey"];
        if (stateId || snapshot) {
            return {
                state: stateId,
                key: key,
                snapshot: snapshot
            };
        }
        return null;
    },
    getProductVariant: function() {
        try
        {
            let queryParams = this.getQueryParameters();
            if (queryParams.variant) {
                return Number(queryParams.variant);
            }
            if (queryParams.variation_id) {
                return Number(queryParams.variation_id);
            }
            return null;

        } catch (error) {
            return null;
        }
    },
    getQuantity: function() {
        let queryParams = this.getQueryParameters();
        return queryParams.quantity || 1;
    },
    loadNow: function() {
        let queryParams = this.getQueryParameters();
        if (queryParams['personalize'] && queryParams['personalize'] == 'true') {
            return true;
        } else {
            return false;
        }
    },
    getUpdatedQuesryString: function(oldUrl, newUrl) {
        let queryParams = this.getQueryParameters(oldUrl);
        let newParams = this.getQueryParameters(newUrl);
        if (Object.keys(queryParams).length == 0) {
            return newUrl;
        }

        Object.keys(queryParams).forEach(x => {
            if (Object.keys(newParams).includes(x)) {
                oldUrl = oldUrl.replace(`${x}=${queryParams[x]}`, `${x}=${newParams[x]}`);
            }
        });
        return oldUrl;
    },
    updateQuantities: function() {
        let queryParams = this.getQueryParameters();
        let regex = new RegExp(/quantity\[(\d*)\]/);
        let quantityParams = Object.entries(queryParams).filter(x => regex.test(decodeURIComponent(x[0])));

        for (let quantityParam of quantityParams) {
            let value = Number(regex.exec(quantityParam[0])[1]);
            let lineItem = this.ecDriver.cart.lineItems.find(x => x.product.id === value);
            if (lineItem) {
                lineItem.quantity = Number(quantityParam[1]);
            }
        }
    },
    updateQuantity: function() {
        let quantity = this.getQuantity();
        if (this.ecDriver) {
            this.ecDriver.cart.lineItems[0].quantity = quantity;
        }
    },
    updateVariant: function() {
        let variant = this.getProductVariant();
        if (variant != null && this.ecDriver) {
            this.ecDriver.products.current.updateVariant(variant);
        }
    },
    updatePluginSettings: function() {
        this.pluginSettings.submitUrl = window.location.origin + window.location.pathname + window.location.search;
        if (this.ecDriver) {
            this.ecDriver.settings.endpoints.submitNewItem = this.pluginSettings.submitUrl;
        }
    },
    showEditor: function() {
        // move editor block to body and disable body scroll
        document.getElementById('editor-wrapper').style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        let editor = document.getElementsByTagName('au-wizard')[0];
        if (editor != null && editor != undefined) {
            editor.switchToStep(0);
        }
    },

    hideEditor: function() {
        // move editor block to body and disable body scroll
        let lang = document.getElementsByTagName("html")[0].getAttribute("lang");
        if (lang == undefined || lang == null || lang == "") {
            lang = "en";
        } else {
            lang = lang.substring(0, 2).toLowerCase();
        }
        if (this.localizations[lang] == undefined) {
            lang = "en";
        }
        let close = confirm(this.localizations[lang].closingWarning);
        if (close) {
            document.body.style.overflow = 'auto';
            document.getElementsByTagName('html')[0].style.overflow = 'scroll';
            document.getElementById('editor-wrapper').style.display = 'none';
            document.getElementById('editor-parent').innerHTML = '';
            this.editorLoaded = false;
            let updatedLocation = window.location.href.replace(window.location.search, '');
            window.history.pushState({ path: updatedLocation }, '', updatedLocation);
        }
    },

    loadEditor: function() {
        let self = this;

        // update driver only
        if (self.editorLoaded) {
            self.updateQuantities();
            self.updateQuantity();
            self.updateVariant();
            self.updatePluginSettings();
            return;
        }

        // init
        let variantId = self.getProductVariant();
        if (variantId != null && self.productModel[0].selectedVariantId != variantId) {
            self.productModel[0].selectedVariantId = variantId;
        }
        self.quantity = self.getQuantity();

        self.driver.init(self.productModel, self.editor, self.config, self.pluginSettings, self.order, self.quantity, self.user).then(function (curDriver) {
            self.ecDriver = curDriver;
            const editorid = "#editor-parent";
            const parentDiv = jQuery(editorid)[0];
            self.ecDriver.products.current.renderEditor(parentDiv);

            parentDiv.addEventListener("load", function (e) {
                setTimeout(function () {
                    self.updateQuantities();
                    self.updateQuantity();
                    self.updateVariant();
                    self.updatePluginSettings();
                    self.editorLoaded  = true;
                }, 1000);
            });
            curDriver.orders.current.onSubmitting.subscribe(async function (order) {
                /* [ Extra Product Options (Product Addons) for WooCommerce ] support */
                let thwepofFieldsElement = document.getElementById('thwepof_product_fields');
            	if (thwepofFieldsElement && thwepofFieldsElement.value && thwepofFieldsElement.value.length > 0) {
                    let fields = thwepofFieldsElement.value.split(',');
                	curDriver.orders.current.externalData['thwepof_product_fields'] = thwepofFieldsElement.value;
                    fields.forEach(x => {
                    	curDriver.orders.current.externalData[x] = document.getElementById(x).value;
                    });
                }
                /* [ WooCommerce Measurement Price Calculator ] support */
                let wmpcTotalElement = document.getElementById('_measurement_needed');
                let wmpcTotalUnitElement = document.getElementById('_measurement_needed_unit');
            	if (!!wmpcTotalElement && !!wmpcTotalUnitElement) {
                	order.externalData['_measurement_needed'] = wmpcTotalElement.value;
                    order.externalData['_measurement_needed_unit'] = wmpcTotalUnitElement.value;
                    let wmpcCookiesValuesObject = Cookies.getJSON(wc_price_calculator_params.cookie_name);
                    Object.keys(wmpcCookiesValuesObject).forEach(x => {
                    	order.externalData[x] = cookiesValuesObject[x];
                    });
                }
                /* custom remove (driver remove not working when WP uses nonce for links) */
                if (self.order && self.order.key && self.order.removeItemFromCartUrl) {
                    await fetch (self.order.removeItemFromCartUrl.replace("&amp;", "&"));
                }
            });
            curDriver.orders.current.onSubmitted.subscribe(function (order) {
                // add your custom logic for further order processing when the redirect to cart is disabled.
                document.body.style.overflow = 'auto';
                document.getElementById('editor-wrapper').style.display = 'none';
                if (!window.ccHelper.pluginSettings.redirectToCartAfterAdd) {
                    let url = window.location.href.slice(0, window.location.href.indexOf("?"));
                    /*if (url === window.location.origin + "/") {
                        url = window.location.href;
                    } 
                    let regexpString ="productid=" + self.productModel[0].id + "&personalize=true";
                    let regexp = new RegExp("[?&]" + regexpString)
                    url = url.toLowerCase().replace(regexp, "");
                    url += (url.indexOf("?") === -1 ? "?" : "&" ) + "message=1";*/
                    window.location.href = url;
                }
            });
        }, function (err) {
            console.error(err);
            console.error("Failed to init driver");
        });
    },

    /* [ Extra Product Options (Product Addons) for WooCommerce ] support */
    checkRequiredExtraProductOptions() {
        let thwepofFieldsElement = document.getElementById('thwepof_product_fields');
        if (thwepofFieldsElement && thwepofFieldsElement.value && thwepofFieldsElement.value.length > 0) {
            let unsettedRequiredFields = thwepofFieldsElement.value.split(',')
                .filter(x => document.getElementById(x).classList.contains('validate-required')
                && (document.getElementById(x).value == null || document.getElementById(x).value == undefined || document.getElementById(x).value == ""));
            return unsettedRequiredFields.length == 0;
        } else {
            return true;
        }
    }
});