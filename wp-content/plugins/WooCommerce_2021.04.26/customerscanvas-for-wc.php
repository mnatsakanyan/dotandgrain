<?php
/*
Plugin Name: Aurigma Personalization Plugin
Plugin URI:
Version: 1.4.5[26.04.2021]
Description: Using this plugin you can associate your products with Customer's Canvas (https://customerscanvas.com) to allow your users personalizing them. It works great for personalizable products like business printing, photo products, custom apparel, drinkware and many more.
Author: Aurigma Inc.
Author URI: https://aurigma.com
Text Domain: customers-canvas-for-wc
Domain Path: /languages/

License: MIT
License URI:  https://opensource.org/licenses/MIT
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Check if WooCommerce is active
 **/
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {

    define('CC_WC_PLUGIN_PATH', plugin_dir_path(__FILE__));
    define('CC_WC_PLUGIN_URL', plugin_dir_url(__FILE__));
    define('CC_WC_EDITORS_PATH', CC_WC_PLUGIN_PATH . 'editors/');

    /**
     * Localisation
     **/
    load_plugin_textdomain('customers-canvas-for-wc', false, dirname(plugin_basename(__FILE__)) . '/languages/');

    require_once 'init.php';

}
