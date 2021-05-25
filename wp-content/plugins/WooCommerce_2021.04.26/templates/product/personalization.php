<?php ?>
<script id="cchelper-loader" src="<?php echo cc_wc_script_url('cc-init.js') ?>"></script>
<?php /** @var TYPE_NAME $model */
if (empty($model->Error)) : ?>
    <script>
        function loadEditor() {
            var moduleLoader = window.moduleLoader;
            window.ccHelper = window.ccHelper || {};

            // move editor block to body and disable body scroll
            let editorWrapper = jQuery('#editor-wrapper').remove();
            jQuery(document.body).append(editorWrapper);
            document.getElementById('editor-wrapper').style.display = 'none';
            document.getElementById('closebtn').onclick = function() {
            	window.ccHelper.hideEditor();
			}
            window.ccHelper.pluginSettings = {
                customersCanvasBaseUrl: '<?php echo $model->CcUrl ?>',
                dynamicImageUrl: '<?php echo $model->DynamicImageUrl ?>',
                preflightToolUrl: '<?php echo $model->PreflightToolUrl ?>',
                origamiUrl: '<?php echo $model->OrigamiUrl ?>',
                wooCommerceBaseUrl: "<?php echo get_permalink(wc_get_page_id('shop')) ?>",
                language: "<?php echo substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2); ?>",
                currency: "<?php echo get_option('woocommerce_currency') ?>",
                submitUrl: window.location.origin + window.location.pathname + window.location.search,
                cartUrl: "<?php echo wc_get_cart_url() ?>",
                redirectToCartAfterAdd: "<?php echo get_option('woocommerce_cart_redirect_after_add') ?>" === "yes"
            };
            let productModel =  <?php echo $model->ProductOptions ?>;
            productModel.variants = <?php echo json_encode($model->Variations); ?>;

            window.ccHelper.quantity = window.ccHelper.getQuantity ? window.ccHelper.getQuantity() : 1;

            let variantId = window.ccHelper.getProductVariant ? window.ccHelper.getProductVariant() : null;
            if (variantId != null) {
                productModel.selectedVariantId = variantId;
            }

            window.ccHelper.productModel = [productModel];
            let additionalProducts = <?php echo $model->AdditionalProducts ?>;
            for (let product of additionalProducts) {
                product.variants = [];
                window.ccHelper.productModel.push(product);
            }

            window.ccHelper.order = window.ccHelper.getExistingOrder ? window.ccHelper.getExistingOrder() : null;
            if (window.ccHelper.order && window.ccHelper.order.key) {
                window.ccHelper.order.removeItemFromCartUrl = "<?php echo wc_get_cart_remove_url($model->CartKey)?>"   
            }

            const driverUrl = "<?php echo cc_wc_editor_folder($model->Editor->Name) ."/drivers/woocommerce-driver.js"?>";
            const editorJsUrl = "<?php echo cc_wc_editor_folder($model->Editor->Name) . "/" . $model->Editor->Entry ?>";
            const configJsonUrl = "<?php echo cc_wc_editor_folder($model->Editor->Name) . "/configs/" . $model->ConfigName ?>";
            window.ccHelper.user = {id:isNaN('<?php echo $model->UserId ?>') ? 
                '<?php echo $model->UserId ?>' : <?php echo $model->UserId ?> , 
                tokenId:'<?php echo $model->UserToken ?>'};

            moduleLoader.dynamicImport("ecommerceDriver", driverUrl).then(function (driverImportData) {
                window.ccHelper.driver = driverImportData.ecommerceDriver;
                moduleLoader.dynamicImportDefault("editor", editorJsUrl).then(function (editorImportData) {
                    window.ccHelper.editor = editorImportData.editor.editor || editorImportData.editor;
                    moduleLoader.loadJson(configJsonUrl).then(function (config) {
                        window.ccHelper.config = config;
                        let params = window.ccHelper.getQueryParameters();
                        if (params.personalize) {
                            window.ccHelper.loadEditor();
                            window.ccHelper.showEditor();
                        }
                    }, function (err) {
                        console.error(err);
                        console.error("Failed to load config.json from " + configJsonUrl);
                    });
                }, function (err) {
                    console.error(err);
                    console.error("Failed to load editor.js from " + editorJsUrl);
                });
            }, function (err) {
                console.error(err);
                console.error("Failed to load ecommerce-driver.js from " + driverUrl);
            });
        }
        if (window.moduleLoader == undefined) {
            document.getElementById("scriptLoader").addEventListener('load', function () {
                loadEditor();
            });
        } else {
            loadEditor();
        }
    </script>
<?php endif; ?>
<style>
    @media (max-width) {
        #editor-parent {
            margin-left: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
        }
    }
	#editor-wrapper {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 999999;
        top: 0;
        left: 0;
        background-color: rgba(255,255,255, 0.75);
        overflow-y: scroll;
        display: none;
    }
    #editor-parent {
    	margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 40px;
        height: 90%;
    }
    #closebtn-wrapper {
    	height: 40px;
    }
    .closebtn {
    	display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        position: absolute;
        right: 20px;
        font-size: 36px;
        color: black;
        opacity: 0.8;
        text-align: center;
    }
    .closebtn:hover {
        color: black;
        opacity: 1.0;
    }
    .closebtn:active, .closebtn:focus {
      outline: 0;
      opacity: 1.0;
      border: none;
      -moz-outline-style: none;
    }

    .aurigma-editor-parent {
        min-height: 800px;
        height: 800px;
    }

    .aurigma-editor-parent:before {
        display: block;
        content: " ";
        width: 100%;
        background-color: rgba(0, 0, 0, .61);
        height: 0;
    }

    .aurigma-editor-parent:empty:before {
        height: 95vh;
    }

    .aurigma-editor-parent:empty:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        color: white;
        font-size: 24px;
        content: "Please wait.";
    }

    au-wizard {
        z-index: 5;
    }
</style>

<div id="editor-wrapper">
    <div id="closebtn-wrapper">
        <a href="javascript:void(0)" class="closebtn" id="closebtn"> &times;</a>
    </div>
    <div id="editor-parent" class="aurigma-editor-parent">
        <?php if (!empty($model->Error)) : {
            echo __('Error: ', 'customers-canvas-for-wc') . $model->Error;
        } ?>
        <?php endif; ?>
    </div>
</div>