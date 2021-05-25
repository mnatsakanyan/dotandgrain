<?php
if (!defined('ABSPATH')) {
    exit;
}

class CC_WC_Personalization_Controller
{
    public $Personalization;

    public function Init()
    {
        // remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);

        add_action('template_redirect', array($this, 'PreparePersonalization'));
        add_action('wp_ajax_finish_personalization', array($this, 'FinishPersonalization'));
        add_action('wp_ajax_nopriv_finish_personalization', array($this, 'FinishPersonalization'));
        add_filter('woocommerce_cart_item_thumbnail', array($this, 'GetCartImage'), 10, 3);
        add_filter('woocommerce_get_cart_item_from_session', array($this, 'RestoreCartItem'), 10, 3);

        add_filter('woocommerce_get_item_data', array($this, 'GetCartItemData'), 10, 2);
        add_filter('woocommerce_loop_add_to_cart_link', array($this, 'FilterLoopAddToCartLink'), 10, 3);

        // add script to head for customizing "add to cart" button
        add_filter('wp_head', array($this, 'personalize_script'));

        // add additional data to order
        // set higher priority bc of [Measurement Price Calculator] compability; if still not working with this plugin, set to 1
        add_filter('woocommerce_add_cart_item_data', array($this, 'add_cart_item_data'), 2, 4);

        // personalize (add to cart) button text
        add_filter('add_to_cart_text', array($this, 'woo_custom_cart_button_text')); // < 2.1
        add_filter('woocommerce_product_add_to_cart_text', array($this, 'woo_custom_cart_button_text'));// 2.1 +
        add_filter('woocommerce_product_single_add_to_cart_text', array($this, 'woo_custom_cart_button_text'));// 2.1 +
        add_filter('single_add_to_cart_text', array($this, 'woo_custom_cart_button_text'));
        add_filter('woocommerce_add_to_cart_button_text', array($this, 'woo_custom_cart_button_text'));
    }

    // show add-to-cart button in floating window in top of display
    // public function product_add_to_cart_url($url) {
    //      return $url . "&personalize=true";
    // }

    public function add_cart_item_data($cart_item_data, $product_id, $variation_id, $quantity)
    {
        $data = array();
        $product = wc_get_product($product_id);
        $isPersonalizableProduct = $this->IsProductPersonalizable($product);
        if ($isPersonalizableProduct && isset($_REQUEST['personalize']) && $_REQUEST['personalize'] == true) {

            $data['images'] = $_REQUEST['images'];
            $data['urls'] = $_REQUEST['download_urls'];
            $data['data'] = $_REQUEST['data'];
            if (isset($_REQUEST['variation_id'])) {
                $data['variationId'] = $_REQUEST['variation_id'];
            }
            if ($data['data'] && $data['data']['snapshot']) {
                $data['snapshot'] = $data['data']['snapshot'];
            }
        }
        $result = array();
        $result['cc-data'] = $data;

        return $result;
    }

    public function personalize_script()
    {
        if ($this->CurrentProductPersonalizable()) {
            echo
               "<script id=\"scriptLoader\" type=\"module\">
                        import moduleLoader from '" . cc_wc_script_url('moduleLoader.js') . "';
                        window.moduleLoader = moduleLoader;
                        document.getElementById(\"scriptLoader\").dispatchEvent(new Event('load'));
                </script>
				<script>
					document.addEventListener('DOMContentLoaded', function () {
						let forms = document.querySelectorAll('form.cart');
						forms.forEach(function(form) {
							let button = form.querySelector('button[type=\'submit\']');
							if (button.href)
								button.href = '#';
							button.type = 'button';
							button.onclick = function(e){
                                e.preventDefault();
                                e.stopPropagation();
								if (jQuery(this).is('.disabled')) {
                                    alert('Personalization is not available until you choose needed options');
                                    return;
                                }
                                if (window.ccHelper && window.ccHelper.checkRequiredExtraProductOptions && !window.ccHelper.checkRequiredExtraProductOptions()) {
                                    alert('Personalization is not available until you choose needed options');
                                    return;
                                }
								let formStringData = jQuery(form).serialize();
								if (button.name) {
									formStringData += '&' + button.name + '=' + button.value;
								}
                                let url = formStringData.replace('add-to-cart', 'productId') + '&personalize=true';
                                
                                let symbol = window.location.href.indexOf('?') === -1 ? '?' : '&';
                                let newUrl = window.location.href.replace('#','') + symbol + url;
                                let updatedLocation = window.ccHelper.getUpdatedQuesryString(window.location.href, newUrl);
                                window.history.pushState({ path: updatedLocation }, '', updatedLocation);
                                window.ccHelper.loadEditor();
                                window.ccHelper.showEditor();
							};
                        });
                        
                        // remove message from url
                        try {
                            let curUrl = window.location.href;
                            if (curUrl.indexOf('message=1') !== -1) {
                                let newUrl = curUrl.replace('?message=1','').replace('&message=1','');
                                window.history.pushState({}, window.document.title, newUrl);
                            }
                        }
                        catch(ex) { }

					});
				</script>";
        }
    }


    public function woo_custom_cart_button_text()
    {
        $isPersonalizableProduct = $this->CurrentProductPersonalizable();
        if ($isPersonalizableProduct) {
            return __('Personalize', 'customers-canvas-for-wc');
        } else {
            return __('Add to cart', 'woocommerce');
        }
    }

    public function FilterLoopAddToCartLink($link = '', $product = null, $args = [])
    {
        if ($this->IsProductPersonalizable($product)) {
            $class = 'button au-personalize';
            // removing ajax style in order to redirect user to personalize page.
            if (isset($args['class'])) {
                $tempArgs = explode(' ', $args['class']);
                $tempArgs = array_filter($tempArgs,
                    function ($arg) {
                        return $arg != 'ajax_add_to_cart';
                    });
            }
            /** @var TYPE_NAME $product_id */
            $url = get_permalink($product->id);
            $url = add_query_arg(array(
                'personalize' => 'true',
            ),
                $url);
            $link = sprintf('<a href="%s" data-quantity="%s" class="%s" %s>%s</a>',
                esc_url($url),
                esc_attr(isset($args['quantity']) ? $args['quantity'] : 1),
                esc_attr($class),
                isset($args['attributes']) ? wc_implode_html_attributes($args['attributes']) : '',
                esc_html('Personalize')
            );
        }
        return $link;
    }

    // return from cart
    public function GetCartItemData($data, $cartItem)
    {
        if (isset($cartItem['cc-data'])
            && isset($cartItem['cc-data']['data'])
            && isset($cartItem['cc-data']['data']['snapshot'])) {
            $product_id = $cartItem['product_id'];
            $key = $cartItem['key'];
            $url = get_permalink($product_id);
            $orderData = $cartItem['cc-data']['data'];
            $snapshot = "";
            if ($orderData) {
                $snapshot = $orderData['snapshot'];
            }
            $url = add_query_arg(array(
                'personalize' => 'true',
                'snapshot' => $snapshot,
                'cartKey' => $key,
                'variationId' => $cartItem['cc-data']['variationId'],
                'quantity' => $cartItem['quantity'],
            ),
                $url);
            $data[] = array(
                'name' => 'Personalize',
                'value' => '<a href="' . $url . '">Edit</a>',
            );
        }
        return $data;
    }

    public function RestoreCartItem($cartItemData, $cartItemSessionData, $cartItemKey)
    {
        if (isset($cartItemSessionData['cc-data'])) {
            $cartItemData['cc-data'] = $cartItemSessionData['cc-data'];
        }
        return $cartItemData;
    }

    public function GetCartImage($product_get_image, $cart_item, $cart_item_key)
    {
        $contents = WC()->cart->get_cart_contents();
        if (!$contents || !$contents[$cart_item_key] || !$contents[$cart_item_key]['cc-data'] || !$contents[$cart_item_key]['cc-data']['images'] || !$contents[$cart_item_key]['cc-data']['images'][0])
            return $product_get_image;
        return '<img src="' . $contents[$cart_item_key]['cc-data']['images'][0] . '"/>';
    }

    public function PreparePersonalization()
    {
        if ($this->CurrentProductPersonalizable()) {
            $this->Personalization = true;

            //remove_all_actions('woocommerce_before_single_product_summary');
            //remove_all_actions('woocommerce_before_single_product');
            //remove_all_actions('woocommerce_single_product_summary');
            //remove_all_actions('woocommerce_after_single_product_summary');
            //remove_all_actions('woocommerce_after_single_product');
            add_action('woocommerce_before_single_product_summary', array($this, 'RenderEditor'));

            // remove_all_actions('woocommerce_before_main_content');
            // add_action('woocommerce_before_main_content', array($this, 'RenderEditor'));

        } else {
            $this->Personalization = false;
            if ($this->CurrentProductPersonalizable() && $_GET['message'] == 1) {
                $productId = get_the_ID();
                wc_add_to_cart_message($productId, true);
            }
        }
    }

    public function ValidateUrls($urls)
    {
        $baseUrl = get_option('cc_wc_instance_url');
        $length = strlen($baseUrl);
        foreach ($urls as $url) {
            if (!(substr($url, 0, $length) === $baseUrl)) {
                return false;
            }
        }
        return true;
    }

    public function FinishPersonalization()
    {
        // enable nonces in order to limit forgery.
        //check_ajax_referer('finish-personalization', '_wpnonce');

        // Think about validating input.
        $id = absint($_POST['product_id']);
        $data = array();
        $data['images'] = cc_wc_assemble_array('images', $_POST);
        if (isset($_POST['downloadurl'])) {
            $data['urls'] = cc_wc_assemble_array('downloadurl', $_POST);
        } else {
            $data['urls'] = cc_wc_assemble_array('download_urls', $_POST);
        }

        // disable url validation for packaging
        // if(!$this->ValidateUrls($data['urls']) || !$this->ValidateUrls($data['images']))
        // {
        //      cc_wc_send_json_error('Incorrect data');
        //      return;
        // }

        $variationId = $_POST['variation_id'];
        $data['variationId'] = $variationId;
        $cartKey = $_POST['cart_key'];
        if (!empty($cartKey)) {
            WC()->cart->remove_cart_item($cartKey);
        }
        $quantity = $_POST['quantity'];
        $variations = array();

        if ($variationId) {
            $variations = wc_get_product_variation_attributes($variationId);
        }
        if (isset($_POST['data'])) {
            $data['data'] = [];
            foreach ($_POST['data'] as $k => $v) {
                if ($k == 'snapshot')
                    $data['snapshot'] = $v;

                $data['data'][$k] = $v;
            }
        }

        WC()->cart->add_to_cart($id, $quantity, $variationId, $variations, array('cc-data' => $data));
        cc_wc_send_json_success();
    }

    private function GetCustomProductModel($product)
    {
        $options = new stdClass();
        $options->options = array();
        $options->sku = $product->get_sku();
        $options->title = $product->get_title();
        $options->price = $product->get_price();
        $options->attributes = array();
        $options->id = $product->get_id();

        $attributes = $product->get_attributes();

        $id = 100;
        foreach ($attributes as $attribute) {
            $attrName = $attribute["name"];
            if (strpos($attrName, "cc_") === 0) {
                $attrName = substr($attrName, 3);
                $attr = new stdClass();
                $attr->id = $id;
                $attr->title = $attrName;
                $attr->value = $attribute["options"][0];
                $options->attributes[] = $attr;
                $id++;
            }
        }

        return $options;
    }
    
    public function get_user_token($userId)
    {
        $ccUrl = get_option('cc_wc_instance_url');
        $CcApiKey = get_option('cc_wc_api_key');
        $arrContextOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
            ),
            'http' => array(
                'method' => "POST",
                'header' => "X-CustomersCanvasAPIKey: " . $CcApiKey . "\r\n" .  "Content-Type: application/json\r\n" . "Content-Length: 0\r\n" . "Accept: application/json\r\n"
            )
        );
                            
        //$userId = get_current_user_id();
        $url = $ccUrl . "/api/Auth/Users/" . $userId . "/Tokens";
        $result = file_get_contents($url, false, stream_context_create($arrContextOptions));
        $data = json_decode($result);

        return $data->{'tokenId'};
    }

    public function RenderEditor()
    {
        $productId = get_the_ID();
        $product = wc_get_product($productId);
        $model = new CC_WC_Product_Personalization_Model();

        $model->CcUrl = get_option('cc_wc_instance_url');
        $model->DynamicImageUrl = get_option('cc_wc_di_url');
        $model->PreflightToolUrl = get_option('cc_wc_preflight_url');
        $model->OrigamiUrl = get_option('cc_wc_origami_url');
        $model->AdditionalProducts = json_encode(array());
        $model->ProductId = $productId;

        $options = $this->GetCustomProductModel($product);

        $attributes = $product->get_attributes();
        $configName = "";
        $editor = "";
        foreach ($attributes as $attribute) {
            if ($attribute["name"] == "cc_editor") {
                $editor = CC_WC_Editor_Service::GetEditorByTitle($attribute["options"][0]);
            } else if ($attribute["name"] == "cc_editor_config") {
                $configName = $attribute["options"][0];
            }
        }

        if (!$editor || !$configName) {
            $model->Error = __('Personalizable product is not configured correctly.', 'customers-canvas-for-wc');
            cc_wc_render_template('product/personalization.php', $model);
        }

        $config = $editor->GetConfig($configName, 'Name');
        if (!$config) {
            $model->Error = __('Personalizable product is not configured correctly.', 'customers-canvas-for-wc');
            cc_wc_render_template('product/personalization.php', $model);
        }

        $model->ConfigName = $config->Name . ".json";

        $entry = $editor->Meta["entry"];
        $model->Editor = new stdClass();
        $model->Editor->Entry = !empty($entry) ? $entry : "editor.js";
        $model->Editor->Name = $editor->FolderName;

        if (!empty($_GET['cartKey'])) {
            $model->CartKey = $_GET['cartKey'];
        }

        if (!empty($_GET['snapshot'])) {
            $snapshot = new stdClass();
            $snapshot->snapshot = $_GET['snapshot'];
            $model->RestoreData = json_encode($snapshot);
        } else {
            $model->RestoreData = "null";
        }

        $curUserId = get_current_user_id();
        if ($curUserId == 0 || $curUserId == "0") {
            $curUserId = uniqid('wc_cc_', false);
        }
        $model->UserId = $curUserId;
        $model->UserToken = $this->get_user_token($curUserId);
        $model->Variations = array();

        if ($product->is_type('variable')) {
            foreach ($product->get_variation_attributes() as $taxonomy => $terms_slug) {

                // To get the attribute label (in WooCommerce 3+)
                $taxonomy_label = wc_attribute_label($taxonomy, $product);

                foreach ($terms_slug as $term) {
                    // Getting the term object from the slug
                    $term_name = get_term_by('slug', $term, $taxonomy)->name;

                    // If it's a product private attribute, it won't be found by get_term_by('slug').
                    // And it's already has names in terms.
                    if (!$term_name)
                        $term_name = $term;

                    // Setting the terms ID and values in the array
                    $attributes_and_terms_names['attribute_' . sanitize_title($taxonomy)][$term] = $term_name;
                }
            }

            $taxonomy_labels = array();
            foreach ($product->get_variation_attributes() as $taxonomy => $terms_slug) {
                $taxonomy_labels['attribute_' . sanitize_title($taxonomy)] = wc_attribute_label($taxonomy, $product);
            }
            $available_variations = $product->get_available_variations();
            foreach ($available_variations as $variation) {
                if ($variation['is_in_stock'] && $variation['is_purchasable']) {
                    $var = new stdClass();
                    $var->id = $variation['variation_id'];
                    $var->price = $variation['display_price'];
                    $var->attributes = array();

                    foreach ($variation['attributes'] as $key => $value) {
                        $var->attributes[$key] = new stdClass();
                        $var->attributes[$key]->id = $value;
                        $var->attributes[$key]->value = $attributes_and_terms_names[$key][$value];
                        $var->attributes[$key]->label = $taxonomy_labels[$key];
                    }
                    if (!empty($var->attributes)) {
                        $model->Variations[] = $var;
                    }

                }
            }

            $selectedVariationId = 0;
            if (!empty($_GET['variationId'])) {
                $selectedVariationId = intval($_GET['variationId']);
            } else {
                $defaultAttributes = cc_wc_get_default_attributes($product);
                $selectedVariationId = cc_wc_find_matching_product_variation($product, $defaultAttributes);
            }
            $options->selectedVariantId = $selectedVariationId;
        }
        if ($product->is_type('grouped')) {
            $productArr = array_filter(array_map('wc_get_product', $product->get_children()), 'wc_products_array_filter_visible_grouped');
            $products = [];
            foreach ($productArr as $plainProductModel) {
                $products[] = $this->GetCustomProductModel($plainProductModel);
            }
            $model->AdditionalProducts = json_encode(array_values($products));
        }

        $model->ProductOptions = json_encode($options);

        cc_wc_render_template('product/personalization.php', $model);
    }

    // check is product personalizable

    private function CurrentProductPersonalizable()
    {
        $id = get_the_ID();
        if ($id) {
            return $this->IsProductPersonalizableId($id);
        }
        return false;
    }

    private function IsProductPersonalizableId($productId)
    {
        $product = wc_get_product($productId);
        return $this->IsProductPersonalizable($product);
    }

    private function IsProductPersonalizable($product)
    {
        if ($product) {
            $attributes = $product->get_attributes();
            return !empty($attributes['cc_editor']) && !empty($attributes['cc_editor_config']);
        }
        return false;
    }
}