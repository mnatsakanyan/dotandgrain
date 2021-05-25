<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Class use woocommerce hooks to add custom code related to map_checkout shipping
 */
class WC_Hooks {

	public function __construct() {
		// enqueue plugin style and scripts
		add_action( 'wp_enqueue_scripts', array( $this, 'register_map_checkout_styles' ) );
		// enqueue admin scripts
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admi_scripts' ) );
		// add lat and lang admin hidden fields
		add_action( 'woocommerce_admin_order_data_after_order_details', array( $this, 'address_hidden_fields' ) );
		// save admin billing address
		add_action( 'woocommerce_process_shop_order_meta', array( $this, 'admin_field_update_order_meta' ), 50, 1 );

		// save address from map in edit address
		add_action( 'woocommerce_customer_save_address', array( $this, 'my_account_saving_billing_address' ), 10, 1 );
		// Define map address field structure
		add_filter( 'woocommerce_form_field_address_map', array( $this, 'address_map_form_field' ), 50, 4 );
		add_filter( 'woocommerce_form_field_shipping_address_map', array( $this, 'shipping_address_map_form_field' ), 50, 4 );

		// Update order with new fields meta
		// add_action('woocommerce_checkout_update_order_meta', array($this, 'customize_checkout_field_update_order_meta'), 999);

		// Add address map data from submitted form
		add_filter( 'woocommerce_checkout_posted_data', array( $this, 'wc_checkout_address_map_data' ) );
		add_action( 'woocommerce_checkout_order_processed', array( $this, 'save_address_meta' ), 10, 1 );
		// Validate custom billing and shipping address
		add_action( 'woocommerce_checkout_process', array( $this, 'wc_validate_billing_shipping_address' ) );

		add_filter( 'woocommerce_checkout_fields', array( $this, 'change_billing_fields' ), 5, 1 );
	}

	/**
	 * Enqueue plugin style and scripts
	 */

	public function my_custom_checkout_field( $checkout ) {
		esc_attr_e( 'Delivery Date: ', 'add_extra_fields' );
		?>
	<br>
	<input type="text" name="add_delivery_date" class="add_delivery_date" placeholder="Delivery Date">
		<?php
	}
	public function register_map_checkout_styles() {
		global $wpdb;
		// check if is checkout page then enqueue map style and script
		if ( function_exists( 'is_checkout' ) && is_checkout() || is_page( 'my-account' ) ) {
			$google_map_api_key = get_option( 'google_map_api_key' );
			wp_enqueue_script( 'google-map', '//maps.googleapis.com/maps/api/js?key=' . $google_map_api_key . '&libraries=places,geometry', array(), '1.0', false );
			wp_enqueue_script( 'map-script', WC_ADDRESS_AUTOCOMPLETE_URL . 'assets/js/map-script.js', array( 'jquery' ), '1.0', false );
			// get logged in user billing and shipping address data
			$billing_data                = ( is_user_logged_in() && get_user_meta( get_current_user_id(), 'billing_address_map', true ) ) ? get_user_meta( get_current_user_id(), 'billing_address_map', true ) : array();
			$shipping_data               = ( is_user_logged_in() && get_user_meta( get_current_user_id(), 'shipping_address_map', true ) ) ? get_user_meta( get_current_user_id(), 'shipping_address_map', true ) : array();
			$back_end_map                = 'false';
			$woo_default_country         = explode( ':', get_option( 'woocommerce_default_country' ) );
			$woocommerce_default_country = WC()->countries->countries[ $woo_default_country[0] ];

			wp_localize_script(
				'map-script',
				'map_data',
				json_encode(
					array(
						'billing_data'  => $billing_data,
						'shipping_data' => $shipping_data,
					)
				)
			);
			wp_localize_script( 'map-script', 'back_end_map', $back_end_map );
			wp_localize_script( 'map-script', 'woocommerce_default_country', array( 'woocommerce_country' => $woocommerce_default_country ) );

			wp_enqueue_style( 'map-style', WC_ADDRESS_AUTOCOMPLETE_URL . 'assets/css/map-style.css', array(), '1.0', false );
		}
	}

	public function enqueue_admi_scripts() {

		if ( function_exists( 'get_current_screen' ) ) {
			$screen = get_current_screen();
			if ( 'shop_order' == $screen->id ) {
				$google_map_api_key = get_option( 'google_map_api_key' );

				wp_enqueue_script( 'google-map2', '//maps.googleapis.com/maps/api/js?key=' . $google_map_api_key . '&libraries=places', array(), '1.0', false );
				// enqueue map_checkout admin scripts
				wp_enqueue_script( 'admin-billing-address-scripts', WC_ADDRESS_AUTOCOMPLETE_URL . 'assets/js/billing_address_script.js', array(), '1.0', false );
			}
		}
	}

	// add lat and lang admin hidden fields
	public function address_hidden_fields() {
		?>
		<input hidden="" name="_billing_admin_search_lat" id="_billing_admin_search_lat" />
		<input hidden="" name="_billing_admin_search_lng" id="_billing_admin_search_lng" />
		<?php

	}

	// save address from map in edit address
	public function my_account_saving_billing_address( $user_id ) {

		if ( ! isset( $_POST['nonce'] ) && wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'custom_nonce' ) ) {
			exit( 'Not Authorized' );
		}

		$billing_address = ( isset( $_POST['billing_address_map_search_input'] ) ) ? sanitize_text_field( $_POST['billing_address_map_search_input'] ) : '';

		if ( ! empty( $billing_address ) ) {
			$order_address_data = $this->get_order_address_map_data();
			update_user_meta( $user_id, 'billing_address_1', $billing_address );
			update_user_meta( $user_id, 'billing_address_map', $order_address_data['billing_data'] );
		}
	}

	/**
	 * Define map address field structure
	 *
	 * @param type $field
	 * @param type $key
	 * @param type $args
	 * @param type $value
	 * @return string
	 */
	public function address_map_form_field( $field, $key, $args, $value ) {

		$aafw_enable_map = get_option( 'aafw_enable_map', 1 );
		$cssClass        = 'height:auto;margin:0';
		if ( 1 == $aafw_enable_map ) :
			$cssClass = '';
		endif;

		$field  = '<div style="' . $cssClass . '" class="form-row ' . implode( ' ', $args['class'] ) . '" id="' . $args['id'] . '_field">';
		$field .= '<label for="' . $args['id'] . '" class="">' . $args['label'] . '</label>';
		$field .= '<input id="' . $args['id'] . '_search_input" name="' . $args['id'] . '_search_input" class="controls search_input" type="text" placeholder="' . __( 'Your Address', 'address-autocomplete' ) . '">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_lat" name="' . $args['id'] . '_search_lat" class="search_lat">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_lng" name="' . $args['id'] . '_search_lng" class="search_lng">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_city" name="' . $args['id'] . '_search_city" class="search_city">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_country" name="' . $args['id'] . '_search_country" class="search_country">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_find_location" name="' . $args['id'] . '_find_location" class="find_location">';
		if ( 1 == $aafw_enable_map ) :
			$field .= '<div id="' . $args['id'] . '_map" class="address_map"></div>';
		endif;
		$field .= '</div>';

		return $field;
	}

	public function shipping_address_map_form_field( $field, $key, $args, $value ) {
		$aafw_enable_map = get_option( 'aafw_enable_map', 1 );
		$cssClass        = 'height:auto;margin:0';
		if ( 1 == $aafw_enable_map ) :
			$cssClass = '';
		endif;

		$field  = '<div style="' . $cssClass . '" class="form-row ' . implode( ' ', $args['class'] ) . '" id="' . $args['id'] . '_field">';
		$field .= '<label for="' . $args['id'] . '" class="shipping">' . $args['label'] . '</label>';
		$field .= '<input id="' . $args['id'] . '_search_input" name="' . $args['id'] . '_search_input" class="controls search_input" type="text" placeholder="' . __( 'Your Address', 'address-autocomplete' ) . '">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_lat" name="' . $args['id'] . '_search_lat" class="search_lat">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_lng" name="' . $args['id'] . '_search_lng" class="search_lng">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_city" name="' . $args['id'] . '_search_city" class="search_city">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_search_country" name="' . $args['id'] . '_search_country" class="search_country">';
		$field .= '<input type="hidden" id="' . $args['id'] . '_find_location" name="' . $args['id'] . '_find_location" class="find_location">';
		if ( 1 == $aafw_enable_map ) :
			$field .= '<div id="' . $args['id'] . '_map" class="shipping_address_map address_map"></div>';
		endif;
		$field .= '</div>';

		return $field;
	}

	/**
	 * Update order with new fields meta
	 *
	 * @param int $order_id
	 */
	/*
	public function customize_checkout_field_update_order_meta($order_id) {
		// get billing and shipping address map data
		$order_address_data = $this->get_order_address_map_data();
		wp_die('test');
		// save map billing address
		$billing_data = $order_address_data['billing_data'];
		update_post_meta($order_id, '_billing_address_lat', $billing_data['lat']);
		update_post_meta($order_id, '_billing_address_lng', $billing_data['lng']);
		update_post_meta($order_id, '_billing_map_address', $billing_data['search_input']);
		update_post_meta($order_id, '_billing_map_city', $billing_data['search_city']);
		update_post_meta($order_id, '_billing_map_country', $billing_data['search_country']);
		// save map shipping address
		if (isset($_POST['ship_to_different_address']) && $_POST['ship_to_different_address']) {
			$shipping_data = $order_address_data['shipping_data'];
			update_post_meta($order_id, '_shipping_address_lat', $shipping_data['lat']);
			update_post_meta($order_id, '_shipping_address_lng', $shipping_data['lng']);
			update_post_meta($order_id, '_shipping_map_address', $shipping_data['search_input']);
			update_post_meta($order_id, '_shipping_map_city', $shipping_data['search_city']);
			update_post_meta($order_id, '_shipping_map_country', $shipping_data['search_country']);
		}
	}*/

	// save admin billing address
	public function admin_field_update_order_meta( $post_id ) {
		// define variables
		$billing_address = array();
		// get billing data

		if ( ! isset( $_POST['nonce'] ) && wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'custom_nonce' ) ) {
			exit( 'Not Authorized' );
		}

		$billing_address['lat']          = isset( $_POST['_billing_admin_search_lat'] ) ? sanitize_text_field( $_POST['_billing_admin_search_lat'] ) : '';
		$billing_address['lng']          = isset( $_POST['_billing_admin_search_lng'] ) ? sanitize_text_field( $_POST['_billing_admin_search_lng'] ) : '';
		$billing_address['search_input'] = isset( $_POST['_billing_admin_address_map'] ) ? sanitize_text_field( $_POST['_billing_admin_address_map'] ) : '';
		$billing_address['search_city']  = isset( $_POST['_billing_city'] ) ? sanitize_text_field( $_POST['_billing_city'] ) : '';

		update_post_meta( $post_id, '_billing_map_address', $billing_address );
	}

	/**
	 * Add address map data from submitted form
	 *
	 * @param array $post_data
	 * @return array $post_data
	 */
	public function wc_checkout_address_map_data( $post_data ) {

		// get billing and shipping address map data
		$order_address_data = $this->get_order_address_map_data();
		// set checkout posted data billing and shipping address map
		$post_data['billing_address_map'] = $order_address_data['billing_data'];
		if ( isset( $post_data['ship_to_different_address'] ) && $post_data['ship_to_different_address'] ) {
			$post_data['shipping_address_map'] = $order_address_data['shipping_data'];
		} else {
			$shipping_data                     = ( is_user_logged_in() && get_user_meta( get_current_user_id(), 'shipping_address_map', true ) ) ? get_user_meta( get_current_user_id(), 'shipping_address_map', true ) : array();
			$post_data['shipping_address_map'] = $shipping_data;
		}

		return $post_data;
	}

	public function save_address_meta( $order_id ) {
		// get billing and shipping address map data
		$order_address_data = $this->get_order_address_map_data();
		update_post_meta( $order_id, '_billing_address_1', $order_address_data['billing_data']['search_input'] );

		update_post_meta( $order_id, '_billing_admin_address_map', $order_address_data['billing_data']['search_input'] );
	}

	public function get_order_address_map_data() {
		// define variables
		$billing_data  = array();
		$shipping_data = array();
		// get billing data
		if ( ! isset( $_POST['nonce'] ) && wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'custom_nonce' ) ) {
			exit( 'Not Authorized' );
		}

		$billing_data['lat']                = isset( $_POST['billing_address_map_search_lat'] ) ? sanitize_text_field( $_POST['billing_address_map_search_lat'] ) : '';
		$billing_data['lng']                = isset( $_POST['billing_address_map_search_lng'] ) ? sanitize_text_field( $_POST['billing_address_map_search_lng'] ) : '';
		$billing_data['search_input']       = isset( $_POST['billing_address_map_search_input'] ) ? sanitize_text_field( $_POST['billing_address_map_search_input'] ) : '';
		$billing_data['_billing_address_1'] = isset( $_POST['billing_address_map_search_input'] ) ? sanitize_text_field( $_POST['billing_address_map_search_input'] ) : '';
		$billing_data['search_city']        = isset( $_POST['billing_address_map_search_city'] ) ? sanitize_text_field( $_POST['billing_address_map_search_city'] ) : '';
		$billing_data['search_country']     = isset( $_POST['billing_address_map_search_country'] ) ? sanitize_text_field( $_POST['billing_address_map_search_country'] ) : '';
		// $billing_data['find_location'] = isset($_POST['billing_address_map_find_location']) ? sanitize_text_field($_POST['billing_address_map_find_location']) : '';
		// get shipping data
		$shipping_data['lat']            = isset( $_POST['shipping_address_map_search_lat'] ) ? sanitize_text_field( $_POST['shipping_address_map_search_lat'] ) : '';
		$shipping_data['lng']            = isset( $_POST['shipping_address_map_search_lng'] ) ? sanitize_text_field( $_POST['shipping_address_map_search_lng'] ) : '';
		$shipping_data['search_input']   = isset( $_POST['shipping_address_map_search_input'] ) ? sanitize_text_field( $_POST['shipping_address_map_search_input'] ) : '';
		$shipping_data['search_city']    = isset( $_POST['shipping_address_map_search_city'] ) ? sanitize_text_field( $_POST['shipping_address_map_search_city'] ) : '';
		$shipping_data['search_country'] = isset( $_POST['shipping_address_map_search_country'] ) ? sanitize_text_field( $_POST['shipping_address_map_search_country'] ) : '';
		return array(
			'billing_data'  => $billing_data,
			'shipping_data' => $shipping_data,
		);
	}

	/**
	 * Validate custom billing and shipping address
	 */
	public function wc_validate_billing_shipping_address() {

		// validate shipping address and billing address is exist
		if ( ! isset( $_POST['nonce'] ) && wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'custom_nonce' ) ) {
			exit( 'Not Authorized' );
		}

		if ( isset( $_POST['ship_to_different_address'] ) && sanitize_text_field( $_POST['ship_to_different_address'] ) ) {
			if ( ( isset( $_POST['shipping_address_map_search_input'] ) && ! sanitize_text_field( $_POST['shipping_address_map_search_input'] ) ) ) {
				if ( empty( get_option( 'aafw_allow_manual_address' ) ) ) {
					wc_add_notice( __( '<strong>Shipping Address</strong>,is a required field.', 'address-autocomplete' ), 'error' );
				}
			}
		} else {
			if ( ( isset( $_POST['billing_address_map_search_input'] ) && ! sanitize_text_field( $_POST['billing_address_map_search_input'] ) ) || ( isset( $_POST['billing_address_map_search_lat'] ) && ! sanitize_text_field( $_POST['billing_address_map_search_lat'] ) ) || ( isset( $_POST['billing_address_map_search_lng'] ) && ! sanitize_text_field( $_POST['billing_address_map_search_lng'] ) ) ) {
				if ( empty( get_option( 'aafw_allow_manual_address' ) ) ) {
					wc_add_notice( __( '<strong>Billing Address</strong>,is a required field.', 'address-autocomplete' ), 'error' );
				}
			}
		}
		if ( isset( $_POST['billing_address_map_find_location'] ) && 'false' == $_POST['billing_address_map_find_location'] && empty( get_option( 'aafw_allow_manual_address' ) ) ) {
			wc_add_notice( __( '<strong>Location Not found </strong>,please try another location.', 'address-autocomplete' ), 'error' );
		}
	}

	public function change_billing_fields( $fields ) {
		$fields['billing']['billing_address_map']   = array(
			'type'     => 'address_map',
			'class'    => array( 'form-row-wide' ),
			'label'    => apply_filters( 'woo_address_autocomplete_field_label', __( 'Selected Location', 'address-autocomplete' ) ),
			'priority' => 20,
		);
		$fields['shipping']['shipping_address_map'] = array(
			'type'     => 'shipping_address_map',
			'class'    => array( 'form-row-wide' ),
			'label'    => apply_filters( 'woo_shpping_address_autocomplete_field_label', __( 'Selected Location', 'address-autocomplete' ) ),
			'priority' => 20,
		);
		// unset($fields['billing']['billing_address_1']);
		unset( $fields['billing']['billing_address_2'] );
		unset( $fields['shipping']['shipping_address_2'] );
		// unset($fields['billing']['billing_country']);
		$fields['billing']['billing_state']['required']    = false;
		$fields['shipping']['shipping_state']['required']  = false;
		$fields['billing']['billing_address_1']['class']   = array( 'address-fields' );
		$fields['shipping']['shipping_address_1']['class'] = array( 'address-fields' );
		// $fields['billing']['billing_city']['class'] = array('address-fields');
		// $fields['billing']['billing_city']['required'] = false;
		$fields['billing']['billing_state']['class']   = array( 'address-full-w' );
		$fields['shipping']['shipping_state']['class'] = array( 'address-full-w' );
		// $fields['billing']['billing_state']['required'] = false;
		// $fields['billing']['billing_postcode']['class'] = array('address-fields');
		// $fields['billing']['billing_postcode']['required'] = false;
		// $fields['billing']['billing_country']['class'] = array('address-fields');

		return $fields;
	}

}

new WC_Hooks();

