<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function cc_wc_clear_folder($path)
{
    if (!is_dir($path)) {
        return false;
    }

    $di = new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS);
    $ri = new RecursiveIteratorIterator($di, RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($ri as $file) {
        $file->isDir() ? rmdir($file) : unlink($file);
    }
}

// Used for validating user input
// Source: https://arjunphp.com/check-is-a-string-valid-json-php/
function cc_wc_is_json($string, $return_data = false)
{
    $data = json_decode($string);
    return (json_last_error() == JSON_ERROR_NONE) ? ($return_data ? $data : true) : false;
}

function cc_wc_download_file($url, $filepath)
{
    $newfname = $filepath;
    $file = fopen($url, 'rb');
    if ($file) {
        $newf = fopen($newfname, 'wb');
        if ($newf) {
            while (!feof($file)) {
                $data = fread($file, 1024 * 8);
                if (!$data) {
                    return __("failed to download item");
                } else {
                    $result = fwrite($newf, $data, 1024 * 8);
                    if (!$result) {
                        return __("failed to write item");
                    }
                }
            }
        } else {
            return __("failed to open export folder");
        }
    } else {
        return __("failed to open order item url");
    }
    if ($file) {
        fclose($file);
    }
    if ($newf) {
        fclose($newf);
    }

    return 0;
}

function cc_wc_http_upload_error_text($errorCode)
{
    switch ($errorCode) {
        case 0: //no error; possible file attack!
            return __("There was a problem with your upload.", 'customers-canvas-for-wc');
            break;
        case 1: //uploaded file exceeds the upload_max_filesize directive in php.ini
            return __("The file you are trying to upload is too big.", 'customers-canvas-for-wc');
            break;
        case 2: //uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the html form
            return __("The file you are trying to upload is too big.", 'customers-canvas-for-wc');
            break;
        case 3: //uploaded file was only partially uploaded
            return __("The file you are trying upload was only partially uploaded.", 'customers-canvas-for-wc');
            break;
        case 4: //no file was uploaded
            return __("You must select a file to upload.", 'customers-canvas-for-wc');
            break;
        case 6: // UPLOAD_ERR_NO_TMP_DIR
            return __("Missing a temporary folder.", 'customers-canvas-for-wc');
            break;
        case 7: // UPLOAD_ERR_CANT_WRITE
            return __("Failed to write file to disk.", 'customers-canvas-for-wc');
            break;
        case 8: // UPLOAD_ERR_EXTENSION
            return __("File upload stopped by extension.", 'customers-canvas-for-wc');
            break;
        default: //a default error, just in case!  :)
            return __("There was a problem with your upload.", 'customers-canvas-for-wc');
            break;
    }
}

function cc_wc_delete_folder($path)
{
    if (!is_dir($path)) {
        return false;
    }

    cc_wc_clear_folder($path);
    rmdir($path);
    return true;
}

function cc_wc_assemble_array($key, $vars)
{
    if (is_array($vars[$key])) {
        return $vars[$key];
    }

    $result = array();
    $i = 0;
    $k = $key . '_' . $i;
    while (isset($vars[$k])) {
        $result[] = $vars[$k];
        $i++;
        $k = $key . '_' . $i;
    }
    return $result;
}

function cc_wc_send_json_error($message)
{
    wp_send_json(array('status' => 'error', 'message' => $message));
}

function cc_wc_send_json_success($data = '', $message = '')
{
    wp_send_json(array('status' => 'success', 'message' => $message, 'data' => $data));
}

// Source: https://stackoverflow.com/a/15575293/2652357
function cc_wc_join_paths()
{
    $paths = array();

    foreach (func_get_args() as $arg) {
        if ($arg !== '') {
            $paths[] = $arg;
        }
    }

    return preg_replace('#[\\\\/]+#', '/', join('/', $paths));
}

/**
 * Find matching product variation
 *
 * @param WC_Product $product
 * @param array $attributes
 * @return int Matching variation ID or 0.
 *
 * Taken from https://iconicwp.com/blog/get-default-variation-id-variable-product-woocommerce/
 */
function cc_wc_find_matching_product_variation($product, $attributes)
{
    foreach ($attributes as $key => $value) {
        if (strpos($key, 'attribute_') === 0) {
            continue;
        }
        unset($attributes[$key]);
        $attributes[sprintf('attribute_%s', $key)] = $value;
    }
    if (class_exists('WC_Data_Store')) {
        $data_store = WC_Data_Store::load('product');
        return $data_store->find_matching_product_variation($product, $attributes);
    } else {
        return $product->get_matching_variation($attributes);
    }

}

/**
 * Get variation default attributes
 *
 * @param WC_Product $product
 * @return array
 *   Taken from https://iconicwp.com/blog/get-default-variation-id-variable-product-woocommerce/
 */
function cc_wc_get_default_attributes($product)
{
    if (method_exists($product, 'get_default_attributes')) {

        return $product->get_default_attributes();

    } else {
        return $product->get_variation_default_attributes();
    }
}
