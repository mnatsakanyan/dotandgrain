<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );
         
if ( !function_exists( 'child_theme_configurator_css' ) ):
    function child_theme_configurator_css() {
        wp_enqueue_style( 'chld_thm_cfg_child', trailingslashit( get_stylesheet_directory_uri() ) . 'style.css', array( 'twenty-twenty-one-style','twenty-twenty-one-style','twenty-twenty-one-print-style' ) );
    }
endif;
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );

// END ENQUEUE PARENT ACTION
function fm_include_css(){
    wp_enqueue_style( 'fm-responsive', get_stylesheet_directory_uri() . '/css/fm-custom.css',array(),rand(1,99) );
}
add_action('wp_enqueue_scripts','fm_include_css');
function fm_include_js(){
    wp_enqueue_script('vh-custom-js', get_stylesheet_directory_uri() . '/js/fm-custom.js', array('jquery'), rand(1, 99));

}
add_action('wp_enqueue_scripts', 'fm_include_js');

add_filter('body_class','fm_logged_in_filter');
function fm_logged_in_filter($classes) {
    global $product;

    if( is_user_logged_in() ) {
        $classes[] = 'fm_login';
    } else {
        $classes[] = 'fm_logout';
    }
    if( is_singular( 'product' ) &&  get_the_id() == "1073" ) {
        $classes[] = 'product_simple_kit';
    }

    return $classes;
}
add_filter( 'woocommerce_order_button_html', 'fm_chekout_button_text' );
function fm_chekout_button_text( $button_html ) {
    $button_html = str_replace( 'Place order', 'PROCEED TO PAYMENT', $button_html );
    return $button_html;
}

add_action( 'gettext','fm_change_forgot_pass_text' );
function fm_change_forgot_pass_text( $text ) {
    if ( 'Lost your password?' === $text ) {
        $text = 'Forgot Your Password?';
    }
    return $text;
}



function fm_display_order_kit_page_content( ) {
    global $product;
    if( $product->id == "1073" ) {
        echo do_shortcode('[elementor-template id="1116"]');
    }
}

// Hook this function up.
add_action( 'woocommerce_after_single_product_summary','fm_display_order_kit_page_content', 1 );

add_action('template_redirect', 'woocommerce_remove_product_from_cart');

function woocommerce_remove_product_from_cart(){
    global $woocommerce;
    $items = $woocommerce->cart->get_cart();
     foreach ($items as $item => $values) {
            if (get_the_ID() == 1073) {
                if ($values['product_id'] != 1073) {
                    WC()->cart->remove_cart_item($item);
                }
            }
            if (get_the_ID() == 985) {
                if ($values['product_id'] == 1073) {
                    WC()->cart->remove_cart_item($item);
                }
            }
     }
}

