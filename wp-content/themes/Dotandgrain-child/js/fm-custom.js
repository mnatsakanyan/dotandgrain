(function($) {
    $(document).on("click",".fm_register_form .uael-register-submit",function() {
        if($('.fm_checkbox_input').is(':checked')){
            var fm_email = $('.fm_register_form .elementor-field-type-email input').val();
            var register_error = $('.fm_register_form .uael-register-error').size();
            if (fm_email &&  register_error < 1){
                $('#form-field-email').val(fm_email);
                $('.fm_subscribe_form .elementor-button').click();
            }
        }
    });
    $(document).on("click","#billing_postage_options_field .woocommerce-input-wrapper .input-radio",function() {

    });

    $(window).scroll(function(){
        if ($(window).scrollTop() >= 100) {
            $('#fm_header').addClass('fixed-header');
        }
        else {
            $('#fm_header').removeClass('fixed-header');
        }
    });
    $(document).ready(function(){
        /*$("#billing_postage_options_field .woocommerce-input-wrapper label").click(function() {
            alert($(".fm_postage_options ").val());
        });*/

        $("#billing_postage_options_field .woocommerce-input-wrapper input[type='radio']").click(function(){
            var radioValue = $("input[name='billing_postage_options']:checked").val();
            var id = $("input[name='billing_postage_options']:checked").attr('id');
            var  ids=[];
            $("#billing_postage_options_field .woocommerce-input-wrapper input[type='radio']").each((index, elem) => {
                ids.push(elem.id);
            });
            if(radioValue){
                if(id === ids[0]){
                    $('#shipping_method #shipping_method_0_free_shipping1').click();
                }else{
                    $('#shipping_method #shipping_method_0_flat_rate3').click();
                }
            }
        });
    });
})(jQuery);

