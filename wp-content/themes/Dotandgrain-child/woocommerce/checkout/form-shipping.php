<?php
/**
 * Checkout shipping information form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-shipping.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 * @global WC_Checkout $checkout
 */

defined( 'ABSPATH' ) || exit;
$formatted_destination    = isset( $formatted_destination ) ? $formatted_destination : WC()->countries->get_formatted_address( $package['destination'], ', ' );
$has_calculated_shipping  = ! empty( $has_calculated_shipping );
$show_shipping_calculator = ! empty( $show_shipping_calculator );
$calculator_text          = '';
?>
<?php foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {?>
    <div class="woocommerce-shipping-totals shipping saSasaSAs">
        <div><?php echo wp_kses_post( $package_name ); ?></div>
        <div data-title="<?php echo esc_attr( $package_name ); ?>">
            <?php if ( $available_methods ) : ?>
                <ul id="shipping_method" class="woocommerce-shipping-methods">
                    <?php foreach ( $available_methods as $method ) : ?>
                        <li>
                            <?php
                            if ( 1 < count( $available_methods ) ) {
                                printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ) ); // WPCS: XSS ok.
                            } else {
                                printf( '<input type="hidden" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" />', $index, esc_attr( sanitize_title( $method->id ) ), esc_attr( $method->id ) ); // WPCS: XSS ok.
                            }
                            printf( '<label for="shipping_method_%1$s_%2$s">%3$s</label>', $index, esc_attr( sanitize_title( $method->id ) ), wc_cart_totals_shipping_method_label( $method ) ); // WPCS: XSS ok.
                            do_action( 'woocommerce_after_shipping_rate', $method, $index );
                            ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
                <?php if ( is_cart() ) : ?>
                    <p class="woocommerce-shipping-destination">
                        <?php
                        if ( $formatted_destination ) {
                            // Translators: $s shipping destination.
                            printf( esc_html__( 'Shipping to %s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' );
                            $calculator_text = esc_html__( 'Change address', 'woocommerce' );
                        } else {
                            echo wp_kses_post( apply_filters( 'woocommerce_shipping_estimate_html', __( 'Shipping options will be updated during checkout.', 'woocommerce' ) ) );
                        }
                        ?>
                    </p>
                <?php endif; ?>
            <?php
            elseif ( ! $has_calculated_shipping || ! $formatted_destination ) :
                if ( is_cart() && 'no' === get_option( 'woocommerce_enable_shipping_calc' ) ) {
                    echo wp_kses_post( apply_filters( 'woocommerce_shipping_not_enabled_on_cart_html', __( 'Shipping costs are calculated during checkout.', 'woocommerce' ) ) );
                } else {
                    //echo wp_kses_post( apply_filters( 'woocommerce_shipping_may_be_available_html', __( 'Enter your address to view shipping options.', 'woocommerce' ) ) );
                }
            elseif ( ! is_cart() ) :
                echo wp_kses_post( apply_filters( 'woocommerce_no_shipping_available_html', __( 'There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.', 'woocommerce' ) ) );
            else :
                // Translators: $s shipping destination.
                echo wp_kses_post( apply_filters( 'woocommerce_cart_no_shipping_available_html', sprintf( esc_html__( 'No shipping options were found for %s.', 'woocommerce' ) . ' ', '<strong>' . esc_html( $formatted_destination ) . '</strong>' ) ) );
                $calculator_text = esc_html__( 'Enter a different address', 'woocommerce' );
            endif;
            ?>

            <?php if ( $show_package_details ) : ?>
                <?php echo '<p class="woocommerce-shipping-contents"><small>' . esc_html( $package_details ) . '</small></p>'; ?>
            <?php endif; ?>

            <?php if ( $show_shipping_calculator ) : ?>
                <?php woocommerce_shipping_calculator( $calculator_text ); ?>
            <?php endif; ?>
        </div>
    </div>
<?php  }; ?>


<div class="woocommerce-shipping-fields">
	<?php if ( true === WC()->cart->needs_shipping_address() ) : ?>

		<h3 id="ship-to-different-address">
			<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
				<input id="ship-to-different-address-checkbox" class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" <?php checked( apply_filters( 'woocommerce_ship_to_different_address_checked', 'shipping' === get_option( 'woocommerce_ship_to_destination' ) ? 1 : 0 ), 1 ); ?> type="checkbox" name="ship_to_different_address" value="1" /> <span><?php esc_html_e( 'Ship to a different address?', 'woocommerce' ); ?></span>
			</label>
		</h3>

		<div class="shipping_address">

			<?php do_action( 'woocommerce_before_checkout_shipping_form', $checkout ); ?>

			<div class="woocommerce-shipping-fields__field-wrapper">
				<?php
				$fields = $checkout->get_checkout_fields( 'shipping' );

				foreach ( $fields as $key => $field ) {
					woocommerce_form_field( $key, $field, $checkout->get_value( $key ) );
				}
				?>
			</div>

			<?php do_action( 'woocommerce_after_checkout_shipping_form', $checkout ); ?>

		</div>

	<?php endif; ?>
</div>
<div class="woocommerce-additional-fields">
	<?php do_action( 'woocommerce_before_order_notes', $checkout ); ?>

	<?php if ( apply_filters( 'woocommerce_enable_order_notes_field', 'yes' === get_option( 'woocommerce_enable_order_comments', 'yes' ) ) ) : ?>

		<?php if ( ! WC()->cart->needs_shipping() || wc_ship_to_billing_address_only() ) : ?>

			<h3><?php esc_html_e( 'SOMETHING WE DON’T HAVE? JUST ASK US!', 'woocommerce' ); ?></h3>

		<?php endif; ?>

		<div class="woocommerce-additional-fields__field-wrapper">
			<?php foreach ( $checkout->get_checkout_fields( 'order' ) as $key => $field ) : ?>
				<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
			<?php endforeach; ?>
		</div>

	<?php endif; ?>

	<?php do_action( 'woocommerce_after_order_notes', $checkout ); ?>
</div>
<?php

add_action( 'woocommerce_after_checkout_billing_form', 'misha_select_field' );
function misha_select_field( $checkout ){

    // you can also add some custom HTML here

    woocommerce_form_field( 'contactmethod', array(
        'type'          => 'select', // text, textarea, select, radio, checkbox, password, about custom validation a little later
        'required'	=> true, // actually this parameter just adds "*" to the field
        'class'         => array('misha-field', 'form-row-wide'), // array only, read more about classes and styling in the previous step
        'label'         => 'Preferred contact method',
        'label_class'   => 'misha-label', // sometimes you need to customize labels, both string and arrays are supported
        'options'	=> array( // options for <select> or <input type="radio" />
            ''		=> 'Please select', // empty values means that field is not selected
            'By phone'	=> 'By phone', // 'value'=>'Name'
            'By email'	=> 'By email'
        )
    ), $checkout->get_value( 'contactmethod' ) );

    // you can also add some custom HTML here

}
?>