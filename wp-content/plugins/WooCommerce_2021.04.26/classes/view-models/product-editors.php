<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if (!class_exists('CC_WC_Product_Editors_Model')) {
    class CC_WC_Product_Editors_Model
    {
        public $ProductId;

        public $ConfigName;
        public $SelectedEditor;

        public $JsonModel;

        public $Editors;

        public $IsNew;
    }

    class CC_WC_Product_Editors_JsonModel
    {
        public $CcUrl;

        public $ProductId;

        public $EditorList;

    }
}
