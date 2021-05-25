<?php
if (!defined('ABSPATH')) {
    exit;
}

class CC_WC_Orders_Controller
{

    public function Init()
    {
        add_filter('woocommerce_admin_order_item_thumbnail', array($this, 'GetOrderImage'), 10, 3);
        add_filter('woocommerce_order_item_get_formatted_meta_data', array($this, 'FilterMetaData'));
        add_filter('wp_kses_allowed_html', array($this, 'FilterAllowedHtml'), 10, 2);
        add_filter('woocommerce_display_item_meta', array($this, 'FilterItemMeta'), 10, 3);
        add_filter('bulk_actions-edit-shop_order', array($this, 'AddExportBulkAction'), 20, 1);
        add_action('woocommerce_checkout_create_order_line_item', array($this, 'CreateOrderItemMeta'), 10, 3);
        add_action('handle_bulk_actions-edit-shop_order', array($this, 'HandleExportOrders'), 10, 3);
        add_action('admin_notices', array($this, 'OutputExportNotice'));
        add_action('woocommerce_after_order_itemmeta', array($this, 'DisplayOrderItemMeta'), 10, 3);
    }

    public function DisplayOrderItemMeta($item_id, $item, $product)
    {
        $data = $item->get_meta('cc-urls');
        if (!empty($data)) {
            foreach ($data as $url) {
                $fileName = $this->PrepareFilename($item);
                if ($fileName) {
                    $url .= '/' . $fileName;
                }
                printf('<div><a href="%s">' . __('Download design', 'customers-canvas-for-wc') . '</a></div>', $url);
            }
        }
        $data = $item->get_meta('cc-data');
        if (!empty($data)) {
            foreach ($data as $k => $v) {
                if ($k == "snapshot")
                    continue;

                if ($this->isValidURL($v)) {
                    if (is_numeric($k)) {
                        printf('<div><a href="%s">' . $v . '</a></div>', $v);
                    } else {
                        printf('<div><b>' . $k . ': </b><a href="%s">' . $v . '</a></div>', $v);
                    }
                } else {
                    echo '<div><b>' . $k . ':</b> ' . $v . '</div>';
                }
            }
        }
    }

    protected function startsWith($str, $prefix)
    {
        $length = strlen($prefix);
        return (substr($str, 0, $length) === $prefix);
    }

    protected function isValidURL($url)
    {
        return $this->startsWith($url, "http");
        // return preg_match('/^(http|https):\\/\\/[a-z0-9_]+([\\-\\.]{1}[a-z_0-9]+)*\\.[_a-z]{2,5}' . '((:[0-9]{1,5})?\\/.*)?$/i', $url);
    }

    public function AddExportBulkAction($actions)
    {
        if (get_option('cc_wc_order_export') == 'true') {
            $actions['export_designs'] = __('Export PDF designs', 'woocommerce');
        }
        return $actions;
    }

    public function HandleExportOrders($redirect_to, $action, $post_ids)
    {
        if (get_option('cc_wc_order_export') != 'true') {
            return $redirect_to;
        }

        $exportPath = stripslashes(get_option('cc_wc_order_export_path'));
        $fileNamePattern = get_option('cc_wc_filename_pattern');

        $redirect_to = remove_query_arg(array(
            'export_designs',
            'error',
            'processed_count',
            'processed_ids',
        ), $redirect_to);

        if (empty($exportPath)) {
            $redirect_to = add_query_arg(array(
                'export_designs' => '1',
                'error' => 'Export path is empty.',
            ), $redirect_to);
        }
        if ($action !== 'export_designs') {
            return $redirect_to;
        }

        $processed_ids = array();
        $error = '';

        foreach ($post_ids as $post_id) {
            $order = wc_get_order($post_id);
            $order_data = $order->get_data();
            $items = $order->get_items();
            foreach ($items as $item) {
                $data = $item->get_meta('cc-urls');
                $url = $data[0];
                $dir = $this->PrepareNameFromPattern($exportPath, $item);

                if (!file_exists($dir)) {
                    mkdir($dir, 0777, true);
                }

                $fileName = $this->PrepareNameFromPattern($fileNamePattern, $item);

                if (!$fileName) {
                    $fileName = basename($url, '.pdf');
                }
                $mainName = cc_wc_join_paths($dir, $fileName);
                $newPath = $mainName . '.pdf';
                $copyNum = 1;
                while (file_exists(($newPath))) {
                    $newPath = $mainName . '(' . $copyNum++ . ').pdf';
                }

                $local_error = cc_wc_download_file($url, $newPath);

                if ($local_error) {
                    $error .= $local_error . '|';
                } else {
                    $processed_ids[] = $post_id;
                }

            }

        }

        if (!empty($error)) {
            $redirect_to = add_query_arg(array(
                'error' => $error,
            ), $redirect_to);
        }

        return $redirect_to = add_query_arg(array(
            'export_designs' => '1',
            'processed_count' => count($processed_ids),
            'processed_ids' => implode(',', $processed_ids),
        ), $redirect_to);
    }

    private function PrepareFilename($item)
    {
        $str = get_option('cc_wc_filename_pattern');

        return $this->PrepareNameFromPattern($str, $item);
    }

    private function PrepareNameFromPattern($pattern, $item)
    {
        if (empty($pattern)) {
            return false;
        }

        $sep = "<>";
        $tokens = array();
        $next = strtok($pattern, $sep);

        while ($next !== false) {
            $tokens[] = $next;
            $next = strtok($sep);
        }

        $result = '';
        foreach ($tokens as $token) {
            $result .= $this->MapFilenameToken($item, $token);
        }

        return $result;
    }

    private function MapFilenameToken($item, $token)
    {
        switch ($token) {
            case 'order_id':
                return $item->get_order_id();
            case 'product_id':
                return $item->get_product_id();
            case 'product_name':
                return $item->get_name();
            case 'product_sku':
                $product = $item->get_product();
                return $product->get_sku();
            case 'item_quantity':
                return $item->get_quantity();
        }
        // It's not a supported token. We will treat it as a constant part of pattern
        return $token;
    }

    public function OutputExportNotice()
    {
        if (empty($_REQUEST['export_designs'])) {
            return;
        }

        if (!empty($_REQUEST['error'])) {
            $errors = explode('|', $_REQUEST['error']);
            $msg = '';
            foreach ($errors as $error) {
                if ($error) {
                    $msg .= '<p>' . esc_html__('Export failed', 'customers-canvas-for-wc') . ': ' . esc_html($error) . '</p>';
                }

            }

            printf('<div id="message" class="error">%s</div>', $msg);
        }

        $count = intval($_REQUEST['processed_count']);

        if ($count > 0) {
            printf('<div id="message" class="updated"><p>' .
                _n(esc_html__('Exported %s Order design.', 'customers-canvas-for-wc'),
                    esc_html__('Exported %s Orders designs.', 'customers-canvas-for-wc'),
                    $count,
                    'write_downloads'
                ) . '</p></div>', $count);
        }
    }

    public function FilterAllowedHtml($allowed, $context)
    {
        if (is_array($context)) {
            return $allowed;
        }

        if ($context === 'post') {
            $allowed['a']['data-fancybox'] = true;
        }

        return $allowed;
    }

    public function FilterItemMeta($html, $item, $args)
    {
        $html = '';
        $strings = array();

        foreach ($item->get_formatted_meta_data() as $meta_id => $meta) {
            $query = 'Download #';
            if (isset($meta->key) && substr($meta->key, 0, strlen($query)) !== $query) {

                $value = $args['autop'] ? wp_kses_post($meta->display_value) : wp_kses_post(make_clickable(trim($meta->display_value)));
                $strings[] = '<strong class="wc-item-meta-label">' . wp_kses_post($meta->display_key) . ':</strong> ' . $value;
            }
        }

        if ($strings) {
            $html = $args['before'] . implode($args['separator'], $strings) . $args['after'];
        }
        return $html;
    }

    public function FilterMetaData($formatted_meta)
    {
        $temp_metas = [];
        foreach ($formatted_meta as $key => $meta) {
            if (isset($meta->key) && !in_array($meta->key, [
                    'cc-images',
                ])) {
                $temp_metas[$key] = $meta;
            }
        }
        return $temp_metas;
    }

    public function CreateOrderItemMeta($item, $cart_item_key, $values)
    {
        if (isset($values['cc-data'])) {
            $item->update_meta_data('cc-images', $values['cc-data']['images']);
            $item->update_meta_data('cc-urls', $values['cc-data']['urls']);
            $item->update_meta_data('cc-data', $values['cc-data']['data']);
        }
    }

    public function GetOrderImage($image, $id, $item)
    {
        $data = $item->get_meta_data();

        $result = array_filter(
            $data,
            function ($e) {
                return $e->key == 'cc-images';
            });
        if ($result) {
            $images = current($result)->value;
            $html = '';
            $i = 0;
            foreach ($images as $image) {
                if ($i < 1) {
                    $html .= '<a data-fancybox="' . $id . '" href="' . $image . '"><img src="' . $image . '"></a>';
                } else {
                    $html .= '<a data-fancybox="' . $id . '" href="' . $image . '" style="display:none"></a>';
                }
                $i++;
            }

            return $html;
        } else {
            return $image;
        }
    }
}
