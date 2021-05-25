<?php

/**
 * Plugin Name: Address Field Autocomplete For WooCommerce
 * Description: Address autocomplete is a extension which allows us to sync with google maps location detector at checkout page. Let's suppose if anyone is selecting location from google map so the relevant address field will be fetched automatically and will reflect at Address, Country, City, State and Zip code fields. You don’t need to fill these fields manually.
 * Version: 1.0.1
 * Tags: Address Autocomplete, Address autocomplete woocommerce, woocommerce, address, address autocomplete for order form
 * Author: wpexpertsio
 * Author URI: http://wpexpert.io/
 * Developer: wpexpertsio
 * Developer URI: https://wpexperts.io/
 * Text Domain: address-field-autocomplete-for-woocommerce
 *
 * Woo: 6410264:b4a478b9598605a7df2da90f91daa58c
 * WC requires at least: 3.0
 * WC tested up to: 4.4.1
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
// Define WC_ADDRESS_AUTOCOMPLETE_URL.
if ( ! defined( 'WC_ADDRESS_AUTOCOMPLETE_URL' ) ) {
	define( 'WC_ADDRESS_AUTOCOMPLETE_URL', plugin_dir_url( __FILE__ ) );
}

// Define WC_ADDRESS_AUTOCOMPLETE_PATH.
if ( ! defined( 'WC_ADDRESS_AUTOCOMPLETE_PATH' ) ) {
	define( 'WC_ADDRESS_AUTOCOMPLETE_PATH', plugin_dir_path( __FILE__ ) );
}

class WC_Map_Checkout {

	public function __construct() {
		// Check if WooCommerce is active
		require_once ABSPATH . '/wp-admin/includes/plugin.php';
		if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
			add_action( 'admin_notices', array( $this, 'woocommerce_require_activation' ) );
			return;
		}
		// include wc map checkout shipping method
		include WC_ADDRESS_AUTOCOMPLETE_PATH . 'includes/classes/wc-hooks.php';
		include WC_ADDRESS_AUTOCOMPLETE_PATH . 'includes/classes/map-option.php';

		add_filter( 'doing_it_wrong_trigger_error', array( $this, 'aafw_doing_wrong' ), 10, 0 );
	}

	public function aafw_doing_wrong() {
		return false;
	}

	// show require woocommerce activation plugin
	public function woocommerce_require_activation() {
		/* translators: %s: search term */
		echo '<div class="error"><p>' . sprintf( esc_html_e( 'You have not activated the base plugin %s. Please activate it to use wc map checkout plugin.', 'address-autocomplete' ), '<b>Woocommerce</b>' ) . '</p></div>';
	}

}

new WC_Map_Checkout();
