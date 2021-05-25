<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

require_once CC_WC_PLUGIN_PATH . 'utils.php';

function cc_wc_initialize()
{
    // It's done here, because some classes have dependencies for WP/WC classes.
    // And so we require them via init hook.
    require_once CC_WC_PLUGIN_PATH . 'classes/require.php';

}

function cc_wc_init_controller()
{
    $personalization_controller = new CC_WC_Personalization_Controller();
    $personalization_controller->Init();

    $attributes_controller = new CC_WC_Personalization_Attributes_Controller();
    $attributes_controller->Init();

    $editors_controller = new CC_WC_Editors_Controller();
    $editors_controller->Init();

    $settings_controller = new CC_WC_Settings_Controller();
    $settings_controller->Init();

    $orders_controller = new CC_WC_Orders_Controller();
    $orders_controller->Init();
}

add_action('init', 'cc_wc_initialize');
add_action('init', 'cc_wc_init_controller');

function cc_wc_render_template($name, $model = null)
{
    include CC_WC_PLUGIN_PATH . 'templates/' . $name;
}

function cc_wc_editor_folder($editorName)
{
    return CC_WC_PLUGIN_URL . 'editors/' . $editorName;
}

function cc_wc_assets_url($path)
{
    return CC_WC_PLUGIN_URL . 'assets/' . $path;
}

function cc_wc_script_url($path)
{
    return cc_wc_assets_url('js/' . $path);
}

function cc_wc_echo_script($path)
{
    echo cc_wc_script_url($path);
}

function cc_wc_setup_admin_assets()
{
    wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.3.1.min.js');
    //wp_enqueue_script('jquery-ui', 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js');

    //wp_register_script('mediaelement', plugins_url('wp-mediaelement.min.js', __FILE__), array('jquery'), '4.8.2', true);

    //wp_enqueue_script("bootstrap", cc_wc_script_url('bootstrap/bootstrap.min.js'));
    //wp_enqueue_style('bootstrap', cc_wc_assets_url('bootstrap/bootstrap.min.css'));
    //wp_enqueue_style('bootstrap-fix', cc_wc_assets_url('bootstrap/bootstrap.fix.css'));

    wp_enqueue_style('cc-wc-admin', cc_wc_assets_url('cc-wc-admin.css'));
    //wp_enqueue_script('jsoneditor', cc_wc_script_url('jsoneditor.min.js'));
    //wp_enqueue_style('jsoneditor-styles', cc_wc_assets_url('jsoneditor.min.css'));
    wp_enqueue_script('fancybox', cc_wc_script_url('jquery.fancybox.min.js'), array('jquery'));
    wp_enqueue_style('fancybox-styles', cc_wc_assets_url('jquery.fancybox.min.css'));
    wp_enqueue_script("cc-wc-fancybox-init", cc_wc_script_url('cc-wc-fancybox-init.js'));
}

add_action('admin_enqueue_scripts', 'cc_wc_setup_admin_assets');
