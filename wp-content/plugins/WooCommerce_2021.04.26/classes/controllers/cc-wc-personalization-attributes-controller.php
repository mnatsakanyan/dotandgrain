<?php
if (!defined('ABSPATH')) {
    exit;
}

class CC_WC_Personalization_Attributes_Controller
{
    public function Init()
    {
        add_filter('woocommerce_product_data_tabs', array($this, 'GetCustomProductTabs'));
        add_action('woocommerce_product_data_panels', array($this, 'GetProductTabContent'));

        add_action('wp_ajax_save_cc_attribute', array($this, 'SaveAttributes'));
        add_action('wp_ajax_get_spec_attribute', array($this, 'GetAttributes'));
        add_action('wp_ajax_delete_spec_attribute', array($this, 'DeleteAttributes'));
        add_action('wp_ajax_get_cc_templates', array($this, 'GetCCTemplates'));
        add_action('wp_ajax_get_cc_images', array($this, 'GetCCImages'));
        add_action('wp_ajax_get_cc_fonts', array($this, 'GetCCFonts'));
    }

    private function GetTemplatesFolder($list)
    {
        $folders = array();
        foreach ($list as $temp) {
            $item = $temp;
            if (strpos($temp, '/') !== false) {
                $item = substr($temp, 0, strrpos($temp, '/'));
                if ($item != "") {
                    if (!in_array($item, $folders)) {
                        $folders[] = $item;
                    }
                }
            }
        }
        return $folders;
    }

    private function JsonToPost()
    {
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === "application/json" || $contentType === "application/json;charset=utf-8") {
            $_POST = json_decode(file_get_contents('php://input'), true);
        }
    }

    public function GetCCTemplates()
    {
        error_reporting(1);
        $ccUrl = get_option('cc_wc_instance_url');
        $result = array();

        if (!$ccUrl) {
            cc_wc_send_json_success($result);
        }

        $listTemplates = array("designs", "mockups");
        $ccUrl .= '/api/ProductTemplates/';

        $arrContextOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
            ),
        );

        foreach ($listTemplates as $template) {
            $list[$template] = file_get_contents($ccUrl . $template, false, stream_context_create($arrContextOptions));
        }

        foreach ($list as $k => $v) {
            if (!$v) {
                $result[$k][] = [];
            }
            $items = json_decode($v, true);
            $result[$k] = $items;
            $result[substr($k, 0, strlen($k) - 1) . "Folders"] = $this->GetFolders($items);

        }
        wp_send_json($result);
    }

    public function GetCCImages()
    {
        $ccUrl = get_option('cc_wc_instance_url');
        $result = array();

        if (!$ccUrl) {
            cc_wc_send_json_success($result);
        }

        $ccUrl .= '/api/ImagePicker/PublicFiles';

        $arrContextOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
            ),
        );

        $list = file_get_contents($ccUrl, false, stream_context_create($arrContextOptions));

        $items = json_decode($list, true);
        $result = $items["items"];

        wp_send_json($result);
    }

    public function GetCCFonts()
    {
        $ccUrl = get_option('cc_wc_instance_url');
        $CcApiKey = get_option('cc_wc_api_key');
        $result = array();

        if (!$ccUrl) {
            cc_wc_send_json_success($result);
        }

        $ccUrl .= '/api/Fonts?includeSubfolders=true';

        $arrContextOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
            ),
            'http' => array(
                'method' => "GET",
                'header' => "X-CustomersCanvasAPIKey: " . $CcApiKey . "\r\n"
            )
        );

        $response = file_get_contents($ccUrl, false, stream_context_create($arrContextOptions));
        if ($response === false) {
            wp_send_json([]);
        } else {
            $jsonResponse = json_decode($response, true);
            wp_send_json($jsonResponse['Items']);
        }
    }

    private function GetFolders($list)
    {
        $folders = [];
        foreach ($list as $temp) {
            $item = $temp;
            if (strpos($temp, "/") !== false) {
                $item = substr($temp, 0, strrpos($temp, '/'));
                if ($item !== "") {
                    if (!in_array($item, $folders)) {
                        $folders[] = $item;
                    }
                }
            }
        }
        return $folders;
    }

    public function GetAttributes()
    {
        $this->JsonToPost();
        if (!isset($_GET['productId'])) {
            cc_wc_send_json_error('Product Id isn\'t specified');
        }

        $id = $_GET['productId'];
        $product = wc_get_product($id);

        if (!$product) {
            cc_wc_send_json_error('Product Id is incorrect');
        }

        $attributes = $product->get_attributes();

        $result = array();
        foreach ($attributes as $attribute) {
            if (strpos($attribute["name"], "cc_") === 0) {
                $attr = new stdClass();
                $attr->id = 0;
                $attr->productId = $id;
                $attr->name = substr($attribute["name"], 3);
                $attr->value = $attribute["options"][0];
                $result[] = $attr;
            }
        }
        wp_send_json($result);
    }

    public function SaveAttributes()
    {
        $this->JsonToPost();
        if (empty($_POST['attributes'])) {
            wp_send_json(array('success ' => 'false', 'responseText ' => __('Attributes are empty', 'customers-canvas-for-wc')));
        }
        $newAttributes = $_POST['attributes'];

        $id = $newAttributes[0]['productId'];
        $product = wc_get_product($id);

        if (!$product) {
            wp_send_json(array('success ' => 'false', 'responseText ' => __('Product Id is incorrect', 'customers-canvas-for-wc')));
        }
        $attributes = $product->get_attributes();

        foreach ($newAttributes as $attr) {
            $name = 'cc_' . sanitize_key($attr['name']);
            $nameVal = sanitize_text_field($attr['name']);
            $value = sanitize_text_field($attr['value']);
            if (array_key_exists($name, $attributes)) {
                unset($attributes[$name]);
            }

            $attribute_object = new WC_Product_Attribute();
            $attribute_object->set_name('cc_' . $nameVal);
            $attribute_object->set_options(array($value));
            $attribute_object->set_visible(0);
            $attribute_object->set_variation(0);
            $attributes[] = $attribute_object;
        }
        $product->set_attributes($attributes);
        $product->save();
        wp_send_json(array('success ' => 'true', 'responseText ' => __('Your data successfuly saved!', 'customers-canvas-for-wc')));
    }

    public function DeleteAttributes()
    {
        $this->JsonToPost();
        if (empty($_POST['list'])) {
            wp_send_json(array('success ' => 'false', 'responseText ' => __('Attributes are empty', 'customers-canvas-for-wc')));
        }
        $removedAttributes = $_POST['list'];

        $id = $removedAttributes[0]['productId'];
        $product = wc_get_product($id);

        if (!$product) {
            wp_send_json(array('success ' => 'false', 'responseText ' => __('Product Id is incorrect', 'customers-canvas-for-wc')));
        }

        $attributes = $product->get_attributes();

        foreach ($attributes as $k => $v) {
            if (strpos($k, "cc_") === 0) {
                unset($attributes[$k]);
            }
        }

        $product->set_attributes($attributes);
        $product->save();

        wp_send_json(array('success ' => 'true', 'responseText ' => __('Your attributes were successfuly removed!', 'customers-canvas-for-wc')));
    }

    public function GetProductTabContent()
    {
        $model = new CC_WC_Product_Editors_Model;
        $model->ProductId = get_the_ID();
        $post = get_post($model->ProductId);
        if ($post->post_modified_gmt == $post->post_date_gmt) {
            $model->IsNew = true;
        } else {
            $model->ConfigName = "single-page.json";
            $jsonmodel = new CC_WC_Product_Editors_JsonModel;
            $jsonmodel->CcUrl = get_option('cc_wc_instance_url');
            $editors = CC_WC_Editor_Service::GetEditors();
            $jsonmodel->EditorList = array();
            $jsonmodel->id = $model->ProductId;

            foreach ($editors as $editor) {
                $jsonmodel->EditorList[] = $this->TranslateEditor($editor);
            }

            $model->JsonModel = json_encode($jsonmodel);

        }
        cc_wc_render_template('product/product-editors.php', $model);
    }

    public function TranslateEditor($editor)
    {
        $jsonEditor = new stdClass();
        $jsonEditor->uid = $editor->Uid;
        $jsonEditor->title = $editor->Title;
        $jsonEditor->name = $editor->Name;
        $jsonEditor->folderName = $editor->FolderName;
        $jsonEditor->allConfigs = array();
        if ($editor->Configs) {
            foreach ($editor->Configs as $config) {
                $jsonConfig = new stdClass();
                $jsonConfig->uid = $config->Uid;
                $jsonConfig->title = $config->Title;
                $jsonConfig->name = $config->Name;
                $jsonConfig->fileName = $config->Name . '.json';
                $jsonConfig->version = $config->Version;
                $jsonConfig->json = json_encode($config->Meta);
                $jsonConfig->fullPath = "";
                $jsonEditor->allConfigs[] = $jsonConfig;
            }
        }

        return $jsonEditor;
    }

    public function GetCustomProductTabs($tabs)
    {
        $tabs['personalize'] = array(
            'label' => __('Personalize', 'customers-canvas-for-wc'),
            'target' => 'personalize_options',
            'class' => [], //array('show_if_simple', 'show_if_variable')
        );
        return $tabs;
    }
}
