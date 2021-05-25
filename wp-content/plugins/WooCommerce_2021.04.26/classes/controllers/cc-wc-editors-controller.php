<?php
if (!defined('ABSPATH')) {
	exit;
}

class CC_WC_Editors_Controller
{
	public function Init()
	{
		add_action('wp_ajax_upload_editor', array($this, 'UploadEditor'));
		add_action('wp_ajax_upload_config', array($this, 'UploadConfig'));
		add_action('wp_ajax_delete_editor', array($this, 'DeleteEditor'));
		add_action('wp_ajax_delete_config', array($this, 'DeleteConfig'));
		add_action('wp_ajax_clone_config', array($this, 'CloneConfig'));
		add_action('wp_ajax_save_config', array($this, 'SaveConfig'));
		add_action('wp_ajax_get_config_content', array($this, 'GetConfigContent'));
	}

	public function CloneConfig()
	{
		check_ajax_referer('clone-config', '_wpnonce');

		if (!isset($_POST['folderName']) || empty($_POST['folderName'])) {
			cc_wc_send_json_error(__('Editor\'s folder wasn\'t specified', 'customers-canvas-for-wc'));
		}

		if (!isset($_POST['fileName']) || empty($_POST['fileName'])) {
			cc_wc_send_json_error(__('Configuration wasn\'t specified', 'customers-canvas-for-wc'));
		}

		$editor = CC_WC_Editor_Service::GetEditor(basename($_POST['folderName']));
		if (!$editor || !$editor->Valid) {
			cc_wc_send_json_error(__('Failed to load editor.', 'customers-canvas-for-wc'));
		}

		if ($editor->CloneConfig(basename($_POST['fileName']))) {
			cc_wc_send_json_success();
		}

		cc_wc_send_json_error(__('Clone failed.', 'customers-canvas-for-wc'));
	}

	public function SaveConfig()
	{
		check_ajax_referer('save-config', '_wpnonce');

		if (!isset($_POST['folderName']) || empty($_POST['folderName'])) {
			cc_wc_send_json_error(__('Editor\'s folder wasn\'t specified', 'customers-canvas-for-wc'));
		}

		if (!isset($_POST['fileName']) || empty($_POST['fileName'])) {
			cc_wc_send_json_error(__('Configuration wasn\'t specified', 'customers-canvas-for-wc'));
		}

		if (!isset($_POST['jsonContent']) || empty($_POST['jsonContent'])) {
			cc_wc_send_json_error(__('Content wasn\'t provided', 'customers-canvas-for-wc'));
		}

		$editor = CC_WC_Editor_Service::GetEditor(basename($_POST['folderName']));
		if (!$editor || !$editor->Valid) {
			cc_wc_send_json_error(__('Failed to load editor.', 'customers-canvas-for-wc'));
		}

		//TODO: add validation.
		// if(!cc_wc_is_json($_POST['content']))
		//     cc_wc_send_json_error(__('Update failed', 'customers-canvas-for-wc'));

		$configText = $_POST['jsonContent'];
		$configText = str_replace("","",$configText);
		if (!$editor->UpdateConfig($_POST['fileName'], $configText)) {
			cc_wc_send_json_error(__('Update failed', 'customers-canvas-for-wc'));
		}
		cc_wc_send_json_success();
	}

	public function GetConfigContent()
	{
		check_ajax_referer('get-config-content', '_wpnonce');

		if (!isset($_GET['folderName']) || empty($_GET['folderName'])) {
			cc_wc_send_json_error(__('Editor\'s folder wasn\'t specified', 'customers-canvas-for-wc'));
		}

		if (!isset($_GET['fileName']) || empty($_GET['fileName'])) {
			cc_wc_send_json_error(__('Configuration wasn\'t specified', 'customers-canvas-for-wc'));
		}

		$editor = CC_WC_Editor_Service::GetEditor(basename($_GET['folderName']));

		if (!$editor || !$editor->Valid) {
			cc_wc_send_json_error(__('Failed to load editor.', 'customers-canvas-for-wc'));
		}

		$config = $editor->GetConfig(basename($_GET['fileName']));

		if (!$config || !$config->Valid) {
			cc_wc_send_json_error(__('Failed to load config.', 'customers-canvas-for-wc'));
		}

		cc_wc_send_json_success($config->GetContent());
	}

	public function UploadEditor()
	{
		check_ajax_referer('upload-editor', '_wpnonce');

		// TODO: check permissions.

		if (isset($_FILES['files']) && $_FILES['files']['size'] != 0 && is_uploaded_file($_FILES['files']['tmp_name'])) {
			$extension = end(explode('.', $_FILES['files']['name']));
			if ($extension != 'zip') {
				cc_wc_send_json_error(__('Wrong file format only .zip are accepted', 'customers-canvas-for-wc'));
			} else {
				$uploader = new CC_WC_Editor_Uploader();
				$res = $uploader->Upload($_FILES['files']['tmp_name']);
				if ($res->Error) {
					cc_wc_send_json_error($res->Message);
				}
			}
		} else {
			// There was error while uploading file
			/** @var TYPE_NAME $HTTP_POST_FILES */
			cc_wc_send_json_error(cc_wc_http_upload_error_text($HTTP_POST_FILES['userfile']['error']));
		}

		cc_wc_send_json_success();
	}

	public function UploadConfig()
	{
		check_ajax_referer('upload-config', '_wpnonce');

		if (isset($_FILES['files']) && $_FILES['files']['size'] != 0 && is_uploaded_file($_FILES['files']['tmp_name'])) {
			$extension = end(explode('.', $_FILES['files']['name']));
			if ($extension != 'json') {
				cc_wc_send_json_error(__('Wrong file format only .json are accepted', 'customers-canvas-for-wc'));
			}

			if (!isset($_POST['folderName']) || empty($_POST['folderName'])) {
				cc_wc_send_json_error(__('Editor\'s folder wasn\'t specified', 'customers-canvas-for-wc'));
			}

			$uploader = new CC_WC_Editor_Uploader();
			// let's strip it to the file name, in order to limit any tricks with path.
			$name = basename($_FILES['files']['name']);
			$res = $uploader->UploadConfig($name, $_FILES['files']['tmp_name'], $_POST['folderName'] . '/');
			if ($res->Error) {
				cc_wc_send_json_error($res->Message);
			}

		} else {
			// There was error while uploading file
			/** @var TYPE_NAME $HTTP_POST_FILES */
			cc_wc_send_json_error(cc_wc_http_upload_error_text($HTTP_POST_FILES['userfile']['error']));
		}

		cc_wc_send_json_success();
	}

	public function DeleteEditor()
	{
		check_ajax_referer('delete-editor', '_wpnonce');

		if (isset($_POST['folderName']) && !empty($_POST['folderName'])) {
			$folder = CC_WC_EDITORS_PATH . basename($_POST['folderName']);
			if (is_dir($folder)) {
				if (cc_wc_delete_folder($folder)) {
					cc_wc_send_json_success();
				}
			} else {
				cc_wc_send_json_error(__('Editor\'s folder wasn\'t found', 'customers-canvas-for-wc'));
			}
		}
		cc_wc_send_json_error(__('Editor\'s folder wasn\'t specified.', 'customers-canvas-for-wc'));
	}

	public function DeleteConfig()
	{
		check_ajax_referer('delete-config', '_wpnonce');

		if (!isset($_POST['folderName']) || empty($_POST['folderName'])) {
			cc_wc_send_json_error(__('Editor\'s folder wasn\'t specified.', 'customers-canvas-for-wc'));
		}

		if (!isset($_POST['fileName']) || empty($_POST['fileName'])) {
			cc_wc_send_json_error(__('Config name wasn\'t specified.', 'customers-canvas-for-wc'));
		}

		$folder = CC_WC_EDITORS_PATH . basename($_POST['folderName']);
		if (is_dir($folder)) {
			$path = $folder . '/configs/' . basename($_POST['fileName']) . '.json';
			if (is_file($path)) {
				if (!unlink($path)) {
					cc_wc_send_json_error(__('Error during config removal.', 'customers-canvas-for-wc'));
				}
				cc_wc_send_json_success();
			} else {
				cc_wc_send_json_error(__('Config file wasn\'t found', 'customers-canvas-for-wc'));
			}
		} else {
			cc_wc_send_json_error(__('Editor\'s folder wasn\'t found', 'customers-canvas-for-wc'));
		}
	}
}
