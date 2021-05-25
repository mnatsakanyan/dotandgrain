<?php
$models = array(
    'editor-uploader',
);

foreach ($models as $model) {
    require_once "{$model}.php";
}
