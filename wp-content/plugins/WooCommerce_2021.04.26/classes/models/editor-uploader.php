<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if (!class_exists('CC_WC_Editor_Uploader')) {
    class CC_WC_Editor_Uploader
    {
        public function UploadConfig($name, $tmpPath, $editorPath)
        {
            $result = new stdClass();
            $result->Error = false;
            if (!is_dir(CC_WC_EDITORS_PATH . $editorPath)) {
                $result->Error = true;
                $result->Message = __('Editor\'s folder wasn\'t found.', 'customers-canvas-for-wc');
            } else {
                $path = CC_WC_EDITORS_PATH . $editorPath . 'configs/';
                if (!move_uploaded_file($tmpPath, $path . $name)) {
                    $result->Error = true;
                    $result->Message = __('Error during file move.', 'customers-canvas-for-wc');
                } else {
                    $config = new CC_WC_Config($path, $name);
                    if (!$config->Valid) {
                        $result->Error = true;
                        $result->Message = __('Invalid config file.', 'customers-canvas-for-wc');
                    }
                }
            }

            return $result;
        }

        public function Upload($path)
        {
            $result = new stdClass();
            $result->Error = false;
            $res = $this->ExtractToTemp($path);
            if (!$res) {
                $result->Error = true;
                $result->Message = __("Error during zip extraction.", 'customers-canvas-for-wc');
                return $result; // TODO: return extraction error.
            }

            $editor = new CC_WC_Editor('temp');

            if (!$editor->Valid) {
                $result->Error = true;
                $result->Message = __("Error during editor initialization. Meta file is absent or corrupted.", 'customers-canvas-for-wc');
                $this->ClearTemp();
                return $result;
            }

            $newPath = $this->CreateEditorFolder($editor);

            if (!$newPath) {
                $result->Error = true;
                $result->Message = __("Failed to create new folder.", 'customers-canvas-for-wc');
                $this->ClearTemp();
                return $result;
            }

            $res = $this->MoveToDestination($newPath);
            if ($res !== true) {
                $result->Error = true;
                $result->Message = $res;
                $this->ClearTemp();
            }

            return $result;
        }

        private function ClearTemp()
        {
            cc_wc_clear_folder(CC_WC_EDITORS_PATH . 'temp');
        }

        private static function CreateEditorFolder($editor)
        {
            $newPath = CC_WC_EDITORS_PATH . $editor->Name;
            if (!is_dir($newPath)) {
                $res = mkdir($newPath, 0777, true);
                if (!$res) {
                    return false;
                }
            } 
            return $newPath;
        }

        private static function MoveToDestination($newPath)
        {
            $srcPath = CC_WC_EDITORS_PATH . 'temp';
            if (file_exists($newPath)) {
                if (is_dir($newPath)) {
                    if (is_writable($newPath)) {
                        if ($handle = opendir($srcPath)) {
                            while (false !== ($file = readdir($handle))) {
                                rename($srcPath . '/' . $file, $newPath . '/' . $file);
                            }
                            closedir($handle);
                            return true;
                        } else {
                            return "$srcPath could not be opened.\n";
                        }
                    } else {
                        return "$newPath is not writable!\n";
                    }
                } else {
                    return "$newPath is not a directory!\n";
                }
            } else {
                return "$newPath does not exist\n";
            }
        }

        private static function ExtractToTemp($path)
        {
            $zip = new ZipArchive;
            $res = $zip->open($path);
            if ($res === true) {
                $zip->extractTo(CC_WC_EDITORS_PATH . 'temp/');
                $zip->close();
                return true;
            } else {
                return false;
            }
        }

    }

}
