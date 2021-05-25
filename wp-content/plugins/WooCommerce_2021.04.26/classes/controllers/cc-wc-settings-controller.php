<?php
if (!defined('ABSPATH')) {
    exit;
}

class CC_WC_Settings_Controller
{
    public function Init()
    {
        add_action('admin_menu', array($this, 'AddOptionsPage'));
        add_action('wp_ajax_update_cc_settings', array($this, 'UpdateSettings'));
    }

    public function AddOptionsPage()
    {
        add_options_page(__('Settings', 'customers-canvas-for-wc'),
            __('Personalization Plugin', 'customers-canvas-for-wc'),
            'manage_options', 'cc-settings', array($this, 'GetSettingsPage'));
    }

    public function GetSettingsPage()
    {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.', 'customers-canvas-for-wc'));
        }
        $model = new CC_WC_Editors_Model;

        $model->Editors = CC_WC_Editor_Service::GetEditors();

        $model->CcUrl = get_option('cc_wc_instance_url');
        $model->DynamicImageUrl = get_option('cc_wc_di_url');
        $model->PreflightToolUrl = get_option('cc_wc_preflight_url');
        $model->OrigamiUrl = get_option('cc_wc_origami_url');

        $model->FilenamePattern = get_option('cc_wc_filename_pattern');

        $model->OrderExport = get_option('cc_wc_order_export');

        $model->OrderExportPath = stripslashes(get_option('cc_wc_order_export_path'));

        $model->CcApiKey = get_option('cc_wc_api_key');

        cc_wc_render_template('settings.php', $model);
    }

    public function UpdateSettings()
    {
        check_ajax_referer('update-settings', '_wpnonce');

        if (!isset($_POST['ccUrl']) || empty($_POST['ccUrl'])) {
            cc_wc_send_json_error(__('Url wasn\'t specified', 'customers-canvas-for-wc'));
        }

        // uncomment this to enable CC url validation
//        if (!wp_http_validate_url($_POST['ccUrl'])) {
//            cc_wc_send_json_error(__('Invalid url specified', 'customers-canvas-for-wc'));
//        }

        $exportPath = $_POST['orderExportPath'];
        if ($_POST['orderExport'] == 'true' && empty($exportPath)) {
            cc_wc_send_json_error(__('Invalid export path specified', 'customers-canvas-for-wc'));
        }

        update_option('cc_wc_instance_url', $_POST['ccUrl'], false);
        update_option('cc_wc_di_url', $_POST['diUrl'], false);
        update_option('cc_wc_preflight_url', $_POST['preflightUrl'], false);
        update_option('cc_wc_origami_url', $_POST['origamiUrl'], false);

        update_option('cc_wc_api_key', $_POST['ccApiKey'], false);

        update_option('cc_wc_filename_pattern', $_POST['fileNamePattern'], false);

        update_option('cc_wc_order_export', $_POST['orderExport'], false);

        update_option('cc_wc_order_export_path', $_POST['orderExportPath'], false);

        cc_wc_send_json_success();
    }

}
