<?php
$models = array(
    'editor-service',
);

foreach ($models as $model) {
    require_once "{$model}.php";
}
