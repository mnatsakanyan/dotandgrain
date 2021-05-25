<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if (!class_exists('CC_WC_Editors_Model')) {

    class CC_WC_File_Model
    {
        public $Uid;

        public $Title;

        public $Name;

        public $Version;

        public $Valid;

        public $Meta;

        public $MetaPath;

        private function GetMetaFromFiles($path)
        {
            $string = file_get_contents($path);
            if (!$string) {
                return false;
            }

            $meta = json_decode($string, true);
            if (!is_array($meta)) {
                return false;
            }
            
            $name = basename($path, ".json");
            $result = [];

            $result = $meta;
            if (!array_key_exists('name', $result)) {
            	$result['name'] = $name;
            }
            if (!array_key_exists('title', $result)) {
            	$result['title'] = $name;
            }
            if (!array_key_exists('version', $result)) {
            	$result['version'] = "";
            }


            $this->Meta = $result;
            return true;
        }

        public function __construct($path, $metaName)
        {
            $this->MetaPath = $path . $metaName;
            $this->Valid = $this->GetMetaFromFiles($this->MetaPath);
            if ($this->Valid) {
                $this->Name = $this->Meta['name'];
                $this->Title = $this->Meta['title'];
                $this->Version = $this->Meta['version'];
                $this->Uid = md5($this->Name . '_' . $this->Version);
            }
        }

        public function GetContent()
        {
            return $this->Meta;
        }

        public function UpdateAndSave($content)
        {
            // Wordpress aslways adds backslashes before single quotes when handles $_POST and $_GET
            // so we have to remove them with wp_unslash()
            $data = wp_unslash($content);
            if (!$data || empty($data)) {
                return false;
            }

            if (!file_put_contents($this->MetaPath, $data)) {
                return false;
            }
            return true;
        }

        public function UpdateName($newName)
        {
            $this->Meta['name'] = $newName;
            $this->Name = $newName;
            return $this->UpdateAndSave($this->Meta);
        }
    }

    class CC_WC_Editor extends CC_WC_File_Model
    {

        private function LoadConfigs()
        {
            $path = $this->Path . 'configs/';
            if (is_file($path)) {
                return false;
            }

            if (!file_exists($path)) {
                mkdir($path);
            }

            if ($handle = opendir($path)) {
                while (false !== ($file = readdir($handle))) {
                    if (is_file($path . '/' . $file)) {
                        $config = new CC_WC_Config($path, $file);
                        if ($config->Valid) {
                            $this->Configs[] = $config;
                        }

                    }
                }
                closedir($handle);
            }
        }

        public function __construct($folderName)
        {
            $this->FolderName = $folderName;
            $this->Path = CC_WC_EDITORS_PATH . $folderName . '/';
            parent::__construct($this->Path, 'editor.json');
            $this->LoadConfigs();
        }

        public function GetConfig($configName, $filter = 'Name')
        {
            $result = array_filter(
                $this->Configs,
                function ($e) use (&$configName, &$filter) {
                    return $e->$filter == $configName;
                });
            return current($result);
        }

        public function CloneConfig($configName, $overridenName = '')
        {
            $sourcePath = $this->Path . 'configs/' . $configName . '.json';
            if (!is_file($sourcePath)) {
                return false;
            }

            $newName = $overridenName;
            $num = 0;
            $alreadyExists = true;
            while ($alreadyExists) {
                if (empty($overridenName)) {
                    $num++;
                    $newName = $configName . $num;
                }

                $filteredResult = array_filter(
                    $this->Configs,
                    function ($e) use (&$newName) {
                        return $e->Name == $newName;
                    }
                );
                $alreadyExists = !empty($filteredResult);

                if (!empty($overridenName) && $alreadyExists) {
                    return false;
                }

            }
            if (copy($sourcePath, $this->Path . 'configs/' . $newName . '.json')) {
                $config = new CC_WC_Config($this->Path . 'configs/', $newName . '.json');
                if ($config->UpdateName($newName)) {
                    return $config;
                }
            }
            return false;
        }

        public function UpdateConfig($configName, $content)
        {
            $config = $this->GetConfig($configName);

            if (!$config || !$config->Valid) {
                // configuration wasn't found.
                return false;
            }

            $newName = $configName; //$content["name"];

            $rename = false;

            $oldPath = $config->MetaPath;

            if ($newName != $config->Name) {

                if (basename($newName) != $newName) {
                    // configuration name must be a filename, not a path.
                    return false;
                }

                $newConfig = $this->CloneConfig($configName, $newName);

                if (!$newConfig) {
                    // rename failed.
                    return false;
                }
                $rename = true;
                $config = $newConfig;
            }

            $result = $config->UpdateAndSave($content);

            if ($rename) {
                if (!$result) {
                    $oldPath = $config->MetaPath;
                }
                unlink($oldPath);
            }
            return $result;
        }

        public $FolderName;

        public $Configs;

        public $Path;

    }

    class CC_WC_Config extends CC_WC_File_Model
    {
    }

    class CC_WC_Editors_Model
    {
        public $Editors;
    }
}