<?php
$models = array(
    'cc-wc-personalization-controller',
    'cc-wc-personalization-attributes-controller',
    'cc-wc-editors-controller',
    'cc-wc-settings-controller',
    'cc-wc-orders-controller',
);

foreach ($models as $model) {
    require_once "{$model}.php";
}
