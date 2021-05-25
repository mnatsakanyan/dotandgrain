<?php

$models = array(
    'product-editors',
    'editors',
    'cc-wc-product-personalization-model',
);

foreach ($models as $model) {
    require_once "{$model}.php";
}
