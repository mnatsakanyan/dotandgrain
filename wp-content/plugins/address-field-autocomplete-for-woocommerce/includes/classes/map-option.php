<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
// define Map method
if ( ! class_exists( 'Map_Option' ) ) {

	class Map_Option {

		public function __construct() {

			// register Map options
			add_action( 'admin_init', array( $this, 'map_option_options' ) );
			// add Map settings
			add_action( 'admin_menu', array( $this, 'map_option_settings' ) );
		}

		/**
		 * Add Map settings
		 */
		public function map_option_settings() {
			// add a new menu item. This is a top level menu item i.e., this menu item can have sub menus
			add_submenu_page( 'woocommerce', __( 'Google Map API', 'address-autocomplete' ), __( 'Google Map API', 'address-autocomplete' ), 'manage_options', 'map-option', array( $this, 'map_option_options_page' ) );
		}

		public function map_option_options_page() {
			?>
			<div class="wrap">
				<h1><?php echo esc_html__( 'Google Map API', 'address-autocomplete' ); ?></h1>
				<form method="post" action="options.php">
					<?php settings_fields( 'map_fields' ); ?>
					<?php do_settings_sections( 'map-options' ); ?>
					<?php submit_button(); ?>
				</form>
			</div>
			<?php
		}

		/**
		 * Register Map options
		 */
		public function map_option_options() {
			// section name, display name, callback to print description of section, page to which section is attached.
			add_settings_section( 'map_fields', __( 'Google Api Data', 'address-autocomplete' ), null, 'map-options' );

			add_settings_field( 'google_map_api_key', __( 'Google API Key', 'address-autocomplete' ), array( $this, 'display_google_map_api_key' ), 'map-options', 'map_fields' );
			// section name, form element name, callback for sanitization

			add_settings_field( 'aafw_allow_manual_address', __( 'Allow Manual Addresses', 'address-autocomplete' ), array( $this, 'display_manual_address_field' ), 'map-options', 'map_fields' );

			// add setting to create option to disable map from frontend.
			add_settings_field( 'aafw_enable_map', __( 'Enable Map', 'address-autocomplete' ), array( $this, 'display_enable_map_field' ), 'map-options', 'map_fields' );

			register_setting( 'map_fields', 'google_map_api_key' );
			register_setting( 'map_fields', 'aafw_allow_manual_address' );
			register_setting( 'map_fields', 'aafw_enable_map' );
		}

		public function display_google_map_api_key() {
			$google_map_api_key = get_option( 'google_map_api_key' );
			?>
			<input type="text" name="google_map_api_key" value="<?php echo esc_attr( $google_map_api_key ); ?>">
			<?php
		}

		public function display_manual_address_field() {
			$aafw_allow_manual_address = get_option( 'aafw_allow_manual_address' );
			?>
			<input type="checkbox" id="aafw_allow_manual_address" name="aafw_allow_manual_address" value="1" <?php checked( 1, $aafw_allow_manual_address, true ); ?> />
			<span> <?php esc_html_e( 'Enable this to accept manual addresses from customers. Addresses will not be validated by google maps.' ); ?> </span>
			<?php
		}

		public function display_enable_map_field() {
			$aafw_enable_map = get_option( 'aafw_enable_map', 1 );
			?>
			<input type="checkbox" id="aafw_enable_map" name="aafw_enable_map" value="1" <?php checked( 1, $aafw_enable_map, true ); ?> />
			<span> <?php esc_html_e( 'Enable this, if you want to show map on checkout page. Addresses will not be validated by google maps.' ); ?> </span>
			<?php
		}

	}

	new Map_Option();
}
