<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if (!class_exists('CC_WC_Editor_Service')) {
    class CC_WC_Editor_Service
    {
        public static function GetEditors()
        {
            $result = array();
            if (!file_exists(CC_WC_EDITORS_PATH)) {
                mkdir(CC_WC_EDITORS_PATH, 0777, true);
            }
            $di = new DirectoryIterator(CC_WC_EDITORS_PATH);
            foreach ($di as $editorFolder) {
                if ($editorFolder->isDot() || !$editorFolder->IsDir() || $editorFolder->getFilename() == 'temp') {
                    continue;
                }

                $editor = new CC_WC_Editor($editorFolder->getFilename());
                if ($editor->Valid) {
                    $result[] = $editor;
                }
            }

            return $result;
        }

        public static function GetEditorByTitle($editorTitle)
        {
            $editors = self::GetEditors();

            $result = array_filter(
                $editors,
                function ($e) use (&$editorTitle) {
                    return $e->Title == $editorTitle;
                });

            return current($result);
        }

        public static function GetEditor($editorName)
        {
            $editor = new CC_WC_Editor($editorName);

            if ($editor->Valid) {
                return $editor;
            }
            return null;
        }
    }
}
