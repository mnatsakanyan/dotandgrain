<script src="<?php echo cc_wc_script_url('bootstrap/bootstrap.min.js') ?>"></script>
<link rel="stylesheet" href="<?php echo cc_wc_assets_url('bootstrap/bootstrap.min.css') ?>">
<link rel="stylesheet" href="<?php echo cc_wc_assets_url('bootstrap/bootstrap.fix.css') ?>">

<script src="<?php echo cc_wc_script_url('jsoneditor.min.js') ?>"></script>
<link rel="stylesheet" href="<?php echo cc_wc_assets_url('jsoneditor.min.css') ?>">

<div class="wrap">

    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>

    <?php if(!ini_get('allow_url_fopen')) : ?>
        <div class="notice notice-error notice-large notice-alt inline">
            <p>
                <?=  __('Warning! <code>allow_url_fopen</code> setting in <code>php.ini</code> is set to <code>Off</code>. This prevents the plugin from proper functioning. Please change it to <code>On</code>.','customers-canvas-for-wc') ?>
            </p>
        </div>
    <?php endif; ?>

<div id="poststuff">

    <div id="post-body" class="metabox-holder columns-2">

        <!-- main content -->
        <div id="post-body-content">

            <div class="meta-box-sortables ui-sortable">

                <div class="postbox">

                    <h2><span><?php esc_attr_e( 'Settings, editors and configs', 'WpAdminStyle' ); ?></span></h2>

                    <div class="inside">
                                                
                        <ul class="nav nav-pills nav-justified">
                        <li class="nav-item active"><a data-toggle="tab" href="#editors"><?php echo __('Editors', 'customers-canvas-for-wc') ?></a></li>
                        <li class="nav-item" ><a data-toggle="tab" href="#settings"><?php echo __('Settings', 'customers-canvas-for-wc') ?></a></li>
                        </ul>

                        <div class="tab-content">
                        <div id="editors" class="tab-pane fade in active">
                        <script>
                            var editor;
                            jQuery(function () {
                                // create the editor
                                var container = document.getElementById("jsoneditor");
                                var options = { 'modes' :['tree', 'code'], 'mode': 'code'};
                                editor = new JSONEditor(container, options);
                            });
                        </script>

                        <input id="inputConfig" type="file" name="inputConfig" accept=".json" style="display: none;" />
                        <?php add_thickbox();?>

                        <div id="jsoneditor-window" style="display:none;">
                            <div id="jsoneditor" style="width: 100%; height:90%;"></div>
                            <div id="config-editor-errors" class="alert alert-danger" style="display:none;"> </div>
                            <button data-id="" type="button" id="saveConfig" class="btn btn-primary" style="margin-top:20px"><?php echo __('Save config', 'customers-canvas-for-wc') ?></button>
                        </div>
                        <table class="table table-hover">
                            <div class="row">
                                <div class="col-sm-10"></div>
                                <div class="col-sm-2">
                                    <input id="inputEditor" type="file" accept=".zip" name="inputEditor" style="display: none;" />
                                    <button type="button" id="uploadEditor" class="button-primary" style="margin-top:20px">+ <?php echo __('Upload Editor', 'customers-canvas-for-wc') ?></button>
                                </div>
                            </div>
                            <?php /** @var TYPE_NAME $model */
                            if (empty($model->Editors)) {?>

                                <div class="jumbotron text-center">
                                    <h1 class="small"><?php echo __('No editors are installed yet.', 'customers-canvas-for-wc') ?></h1>
                                    <p><?php echo __('Upload a zip file with an editor or put it directly to the <code>Editors</code> folder of a plugin.', 'customers-canvas-for-wc') ?></p>
                                    <p>
                                        <button type="button" class="btn btn-primary btn-lg uploadEditor" style="margin-top:20px">+ <?php echo __('Upload Editor', 'customers-canvas-for-wc') ?></button>
                                    </p>
                                </div>
                            <?php } else {?>
                                <thead>
                                <th><?php echo __('Title', 'customers-canvas-for-wc') ?></th>
                                <th><?php echo __('Action', 'customers-canvas-for-wc') ?></th>
                                </thead>
                                <tbody>
                                <?php foreach ($model->Editors as $editor) {?>
                                        <tr>
                                            <td data-toggle="collapse" data-target="#<?php echo $editor->Uid ?>" class="clickable">
                                                <p>
                                                    <?php echo $editor->Title ?> <small style="margin-left:10px"><?php echo __('version', 'customers-canvas-for-wc') ?> <?php echo $editor->Version ?></small><br />
                                                    <span style="color:#666666"><?php echo $editor->Name ?></span>
                                                </p>
                                            </td>
                                            <td>
                                                <input id="file_<?php echo $editor->Uid ?>" type="file" accept=".zip" name="file_<?php echo $editor->Uid ?>" style="display: none;" />
                                                <button type="button" id="delete_<?php echo $editor->Uid ?>" data-foldername="<?php echo $editor->FolderName ?>" class="button button-link-delete deleteEdit"><?php echo __('Delete', 'customers-canvas-for-wc') ?></button>
                                            </td>
                                        </tr>
                                        <tr id="data_<?php echo $editor->Uid ?>">
                                            <td colspan="3">
                                                <div id="<?php echo $editor->Uid ?>" class="collapse">
                                                <?php if (empty($editor->Configs)) {?>
                                                        <div class="jumbotron text-center">
                                                            <h1 class="small"><?php echo __('No configs are installed yet.', 'customers-canvas-for-wc') ?></h1>
                                                            <p><?php echo __('Upload a zip file with an editor or put it directly to the <code>Editors</code> folder of a plugin.', 'customers-canvas-for-wc') ?></p>
                                                            <p><button type="button" data-editorfolder="<?php echo $editor->FolderName ?>" class="button button-primary button-hero uploadConfig">+ <?php echo __('Upload Config', 'customers-canvas-for-wc') ?></button></p>
                                                        </div>
                                                        <?php } else {?>
                                                        <table class="table table-hover">
                                                            <thead>
                                                                <th><?php echo __('Config', 'customers-canvas-for-wc') ?></th>
                                                                <th><?php echo __('Action', 'customers-canvas-for-wc') ?></th>
                                                            </thead>
                                                            <tbody>
                                                                <div class="row">
                                                                    <div class="col-sm-10"></div>
                                                                    <div class="col-sm-2">
                                                                        <button type="button" id="uploadConfig" data-editorfolder="<?php echo $editor->FolderName ?>" class="button button-primary uploadConfig">+ <?php echo __('Upload Config', 'customers-canvas-for-wc') ?></button>
                                                                    </div>
                                                                </div>
                                                                <?php foreach ($editor->Configs as $config) {?>
                                                                    <tr>
                                                                        <td>
                                                                            <p>
                                                                                <?php echo $config->Title ?>  <small style="margin-left:10px"><?php echo __('version', 'customers-canvas-for-wc') ?> <?php echo $config->Version ?> </small><br />
                                                                                <span style="color:#666666"><?php echo $config->Name ?></span>
                                                                            </p>
                                                                        </td>
                                                                        <td>
                                                                            <input id="file_<?php echo $config->Uid ?>" data-filename="<?php echo $config->Name ?>" data-editorfolder="<?php echo $editor->FolderName ?>" type="file" name="file_<?php echo $config->Uid ?>" accept=".json" style="display: none;" />

                                                                                <button type="button" id="edit_<?php echo $config->Uid ?>" class="button editConfig"><?php echo __('Edit', 'customers-canvas-for-wc') ?></button>
                                                                                <button type="button" id="clone_<?php echo $config->Uid ?>" class="button cloneConfig"><?php echo __('Clone', 'customers-canvas-for-wc') ?></button>

                                                                            <button type="button" id="delete_<?php echo $config->Uid ?>" class="button button-link-delete deleteConfig"><?php echo __('Delete', 'customers-canvas-for-wc') ?></button>
                                                                        </td>
                                                                    </tr>
                                                                    <?php }?>
                                                            </tbody>
                                                        </table>
                                                        <?php }?>

                                                </div>

                                            </td>
                                        </tr>
                                        <?php }?>
                                </tbody>
                                <?php }?>
                        </table>

                        <script>
                            jQuery(function() {
                            jQuery(".deleteEdit").on('click', function () {
                                var proof = confirm('<?php echo __('Are you sure you want to delete that editor?', 'customers-canvas-for-wc') ?>');
                                if (proof) {
                                    var that = this;
                                    var uid = this.id.split("_")[1];
                                    var foldername = jQuery(this).attr('data-foldername');
                                    var data = {
                                        folderName: foldername,
                                        _wpnonce:'<?php echo wp_create_nonce('delete-editor') ?>',
                                        action:'delete_editor'
                                    };
                                    jQuery.ajax({
                                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                                        data: data,
                                        type: 'POST',
                                        success: function (response) {
                                            if (response.status == 'success') {
                                                jQuery(that).closest("tr")[0].remove();
                                                jQuery("#data_" + uid).remove();
                                            }
                                            else {
                                                console.error('error: ' + response.message);
                                            }
                                        },
                                        error: function (xhr, textStatus, thrownError) {
                                            console.error("failed to load" + this.url, textStatus, xhr.status, thrownError, xhr.responseText);
                                        }

                                    });
                                }
                            });
                            jQuery(".cloneConfig").on('click', function() {
                                var uid = this.id.split("_")[1];
                                var foldername = jQuery("#file_" + uid).attr('data-editorfolder');
                                var filename = jQuery("#file_" + uid).attr('data-filename');
                                var data = {
                                        folderName: foldername,
                                        fileName: filename,
                                        _wpnonce:'<?php echo wp_create_nonce('clone-config') ?>',
                                        action:'clone_config'
                                    };

                                jQuery.ajax({
                                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                                        data: data,
                                        type: 'POST',
                                        success: function (response) {
                                            if (response.status == 'success') {
                                                location.reload();
                                            }
                                            else {
                                                console.error('error: ' + response.message);
                                            }
                                        },
                                        error: function (xhr, textStatus, thrownError) {
                                            console.error("failed to load" + this.url, textStatus, xhr.status, thrownError, xhr.responseText);
                                        }
                                    });
                            });
                            jQuery("#saveConfig").on('click', function() {
                                
                                var errorsDiv = jQuery('#config-editor-errors');
                                var content = null;
                                try {
                                    content = editor.get();
                                }
                                catch (err) {
                                    errorsDiv.text(err);
                                    errorsDiv.show();
                                    return;
                                }
                                errorsDiv.hide();
                                var uid = jQuery(this).data('id');
                                var foldername = jQuery("#file_" + uid).attr('data-editorfolder');
                                var filename = jQuery("#file_" + uid).attr('data-filename');
                                var data = {
                                        folderName: foldername,
                                        fileName: filename,
                                        _wpnonce:'<?php echo wp_create_nonce('save-config') ?>',
                                        action:'save_config',
                                        jsonContent: JSON.stringify(content)
                                    };

                                jQuery.ajax({
                                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                                        data: data,
                                        type: 'POST',
                                        success: function (response) {
                                            if (response.status == 'success') {
                                                location.reload();
                                            }
                                            else {
                                                errorsDiv.show();
                                                errorsDiv.text('<?php echo __('Error:', 'customers-canvas-for-wc') ?> ' + response.message);
                                                console.error('error: ' + response.message);
                                            }
                                        },
                                        error: function (xhr, textStatus, thrownError) {
                                            console.error("failed to load" + this.url, textStatus, xhr.status, thrownError, xhr.responseText);
                                        }
                                    });
                            });
                            jQuery("#uploadEditor").on('click', function () {
                                jQuery("#inputEditor").on('change', function () {
                                    var $input = jQuery(this);
                                    var fd = new FormData;
                                    fd.append('files', $input.prop('files')[0]);
                                    fd.append('_wpnonce', '<?php echo wp_create_nonce('upload-editor') ?>');
                                    sendFile('upload_editor', fd, function () { location.reload(); });
                                    jQuery("#inputEditor").unbind("change");
                                });
                                jQuery("#inputEditor").click();
                            });

                            jQuery(".editConfig").on('click', function () {

                                var uid = this.id.split("_")[1];
                                var foldername = jQuery("#file_" + uid).attr('data-editorfolder');
                                var filename = jQuery("#file_" + uid).attr('data-filename');
                                var data = {
                                        folderName: foldername,
                                        fileName: filename,
                                        _wpnonce:'<?php echo wp_create_nonce('get-config-content') ?>',
                                        action:'get_config_content'
                                    };

                                jQuery.ajax({
                                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                                        data: data,
                                        type: 'GET',
                                        success: function (response) {
                                            if (response.status == 'success') {
                                                jQuery("#saveConfig").attr('data-id', uid);
                                                editor.set(response.data);
                                                tb_show("Editor configuration " +filename, "#TB_inline?width=1000&height=700&inlineId=jsoneditor-window");
                                            }
                                            else {
                                                console.error('error: ' + response.message);
                                            }
                                        },
                                        error: function (xhr, textStatus, thrownError) {
                                            console.error("failed to load" + this.url, textStatus, xhr.status, thrownError, xhr.responseText);
                                        }
                                    });

                            });

                            jQuery(".deleteConfig").on('click', function () {
                                var proof = confirm('<?php echo __('Are you sure you want to delete that config?', 'customers-canvas-for-wc') ?>');
                                if (proof) {
                                    var that = this;
                                    var uid = this.id.split("_")[1];
                                    var foldername = jQuery("#file_" + uid).attr('data-editorfolder');
                                    var filename = jQuery("#file_" + uid).attr('data-filename');
                                    var data = {
                                        folderName: foldername,
                                        fileName: filename,
                                        _wpnonce:'<?php echo wp_create_nonce('delete-config') ?>',
                                        action:'delete_config'
                                    };
                                    jQuery.ajax({
                                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                                        data: data,
                                        type: 'POST',
                                        success: function (response) {
                                            if (response.status == 'success') {
                                                jQuery(that).closest("tr")[0].remove()
                                            }
                                            else {
                                                console.error('error: ' + response.message);
                                            }
                                        },
                                        error: function (xhr, textStatus, thrownError) {
                                            console.error("failed to load" + this.url, textStatus, xhr.status, thrownError, xhr.responseText);
                                        }
                                    });
                                }
                            });
                            jQuery(".uploadConfig").on('click', function () {
                                var that = this;
                                jQuery("#inputConfig").on('change', function () {
                                    var $input = jQuery(this);
                                    var fd = new FormData;
                                    var foldername = jQuery(that).attr('data-editorfolder');
                                    fd.append('folderName', foldername);
                                    fd.append('files', $input.prop('files')[0]);
                                    fd.append('_wpnonce', '<?php echo wp_create_nonce('upload-config') ?>');
                                    sendFile('upload_config', fd, function () { location.reload(); });
                                    jQuery("#inputConfig").unbind("change");
                                });
                                jQuery("#inputConfig").click();
                            });

                            function sendFile(url, formData, successCallback) {
                                window.ffdd = formData;
                                formData.append('action', url);
                                jQuery.ajax({
                                    url: '<?php echo admin_url('admin-ajax.php') ?>',
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    type: 'POST',
                                    success: function (response) {
                                        if (response.status == 'success') {
                                            successCallback();
                                        }
                                        else if (response.status == 'warning') {
                                            var proof = confirm(response.message)
                                            if (proof) {
                                                var fd = window.ffdd;
                                                fd.set('isNew', true);
                                                this.data = fd;
                                                jQuery.ajax(this);
                                            }
                                        }
                                        else if (response.status == 'error') {
                                            var text = response.message;
                                            console.error(text);
                                            alert(text);
                                        }
                                    },
                                    error: function (xhr, textStatus, thrownError) {
                                        console.error("failed to load" + this.url, textStatus, xhr.status, thrownError, xhr.responseText);
                                    }
                                });
                            }
                        });
                        </script>
                        </div>
                        <div id="settings" class="tab-pane fade">
                            <div class="table table-hover" style="margin-bottom: 0; padding: 20px; width:100%;">
                                <div class="row mt-5">
                                    <div class="col-sm-4">
                                                <div class="label-wrapper"><label class="control-label" for="di-url"><?php echo __('Dynamic Image URL', 'customers-canvas-for-wc') ?></label></div>
                                            </div>
                                    <div class="col-sm-6">
                                        <input id="di-url" class="form-control text-box single-line" type="text" name="diUrl" value="<?php echo $model->DynamicImageUrl ?>" style="width: 100%;" />
                                    </div>
                                </div>
                                <div class="row mt-5">
                                    <div class="col-sm-4">
                                                <div class="label-wrapper"><label class="control-label" for="preflight-url"><?php echo __('Preflight URL', 'customers-canvas-for-wc') ?></label></div>
                                            </div>
                                    <div class="col-sm-6">
                                        <input id="preflight-url" class="form-control text-box single-line" type="text" name="preflightUrl" value="<?php echo $model->PreflightToolUrl ?>" style="width: 100%;" />
                                    </div>
                                </div>
                                <div class="row mt-5">
                                    <div class="col-sm-4">
                                                <div class="label-wrapper"><label class="control-label" for="origami-url"><?php echo __('Packaging Tool URL', 'customers-canvas-for-wc') ?></label></div>
                                            </div>
                                    <div class="col-sm-6">
                                        <input id="origami-url" class="form-control text-box single-line" type="text" name="origamiUrl" value="<?php echo $model->OrigamiUrl ?>" style="width: 100%;" />
                                    </div>
                                </div>
                                <div class="row mt-5">
                                    <div class="col-sm-4">
                                                <div class="label-wrapper"><label class="control-label" for="cc-url"><?php echo __('Design Editor URL', 'customers-canvas-for-wc') ?></label></div>
                                            </div>
                                    <div class="col-sm-6">
                                        <input id="cc-url" class="form-control text-box single-line" type="text" name="ccUrl" value="<?php echo $model->CcUrl ?>" style="width: 100%;" />
                                    </div>
                                </div>
                                <div class="row mt-5">
                                            <div class="col-sm-4">
                                                <div class="label-wrapper"><label class="control-label" for="cc-api-key"><?php echo __('Design Editor API Key', 'customers-canvas-for-wc') ?></label></div>
                                            </div>
                                            <div class="col-sm-6">
                                                        <input class="form-control text-box single-line" id="cc-api-key" name="ccApiKey" type="text" value="<?php echo $model->CcApiKey ?>">
                                                    </div>
                                </div>
                                <div class="row mt-5">
                                <table class="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 400px;"><?php echo __('Keyword', 'customers-canvas-for-wc') ?></th>
                                                            <th><?php echo __('Description', 'customers-canvas-for-wc') ?></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><code>&lt;order_id&gt; </code> </td>
                                                            <td><?php echo __('order id', 'customers-canvas-for-wc') ?></td>
                                                        </tr>
                                                        <?php /*
                        <tr>
                        <td><code>&lt;store_id&gt;  </code></td>
                        <td><?php echo __('current store id', 'customers-canvas-for-wc') ?></td>
                        </tr>
                        <tr>
                        <td><code>&lt;customer_id&gt; </code> </td>
                        <td><?php echo __('customer id', 'customers-canvas-for-wc') ?></td>
                        </tr>
                        <tr>
                        <td><code>&lt;affiliate_id&gt; </code></td>
                        <td> <?php echo __('affiliate id', 'customers-canvas-for-wc') ?></td>
                        </tr>
                        */?>
                                                        <tr>
                                                            <td><code>&lt;product_id&gt; </code></td>
                                                            <td>  <?php echo __('product id', 'customers-canvas-for-wc') ?></td>
                                                        </tr>
                                                        <tr>
                                                            <td><code>&lt;product_name&gt; </code></td>
                                                            <td>  <?php echo __('product name', 'customers-canvas-for-wc') ?></td>
                                                        </tr>
                                                        <tr>
                                                            <td><code>&lt;product_sku&gt; </code></td>
                                                            <td>  <?php echo __('product sku', 'customers-canvas-for-wc') ?></td>
                                                        </tr>
                                                        <?php /*
                        <tr>
                        <td><code>&lt;product_vendorId&gt; </code></td>
                        <td>  <?php echo __('vendor id', 'customers-canvas-for-wc') ?></td>
                        </tr>
                        <tr>
                        <td><code>&lt;item_guid&gt; </code></td>
                        <td>  <?php echo __('order item guid', 'customers-canvas-for-wc') ?></td>
                        </tr>
                        <tr>
                        <td><code>&lt;item_index&gt; </code></td>
                        <td> <?php echo __('item index in order', 'customers-canvas-for-wc') ?></td>
                        </tr>
                        */?>
                                                        <tr>
                                                            <td><code>&lt;item_quantity&gt; </code></td>
                                                            <td>  <?php echo __('quantity', 'customers-canvas-for-wc') ?></td>
                                                        </tr>
                                                        <?php /*
                        <tr>
                        <td><code>&lt;specattr_<i>NAME</i>&gt;</code></td>
                        <td>  <?php echo __('value of specifcation attribute by name', 'customers-canvas-for-wc') ?> </td>
                        </tr>
                        */?>
                                                    </tbody>
                                                </table>
                                </div>

                                <div class="row mt-5">
                                            <div class="col-sm-4">
                                                <div class="label-wrapper"><label class="control-label" for="fileName-pattern"><?php echo __('File name template the exported PDF files (without extension)', 'customers-canvas-for-wc') ?></label></div>
                                            </div>
                                            <div class="col-sm-6">
                                                <input class="form-control text-box single-line" id="fileName-pattern" name="fileNamePattern" type="text" value="<?php echo $model->FilenamePattern ?>">
                                            </div>
                                        </div>
                                <div class="row mt-5">
                                            <div class="col-sm-4">
                                                <div class="label-wrapper"><label class="control-label" for="order-export"><?php echo __('Add \'Get PDF designs from orders\' button to Admin Order List view', 'customers-canvas-for-wc') ?></label></div>
                                            </div>
                                            <div class="col-sm-6">
                                                <label data-toggle="collapse" data-target="#orderPathGroupDiv" aria-expanded="<?php echo ($model->OrderExport == 'true' ? 'true"' : 'false') ?>" aria-controls="orderPathGroupDiv" class="<?php echo ($model->OrderExport == 'true' ? '' : 'collapsed') ?>">
                                                    <input <?php echo ($model->OrderExport == 'true' ? 'checked="checked"' : '') ?> class="check-box" data-val="true" data-val-required="<?php echo __('Add \'Get PDF designs from orders\' button to Admin Order List view', 'customers-canvas-for-wc') ?>" id="order-export" name="IsOrderExportButton" type="checkbox" value="true">

                                                </label>
                                            </div>
                                </div>
                                <div class="row mt-5">
                                <div class="form-group collapse <?php echo ($model->OrderExport == 'true' ? 'in"' : '') ?>" aria-expanded="<?php echo ($model->OrderExport == 'true' ? 'true"' : 'false') ?>" id="orderPathGroupDiv" style="">
                                                    <div class="col-sm-4">
                                                        <div class="label-wrapper"><label class="control-label" for="order-export-path"><?php echo __('Path to the folder for the exported PDF files', 'customers-canvas-for-wc') ?></label></div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <input class="form-control text-box single-line valid" id="order-export-path" name="orderExportPath" type="text" value="<?php echo $model->OrderExportPath ?>">
                                                    </div>
                                                </div>
                                </div>


                                    <div class="row mt-5">

                                    <div class="col-sm-1" >
                                    <button type="button" id="saveSettings" class="button button-primary"><?php echo __('Save', 'customers-canvas-for-wc') ?></button>
                                    </div>
                                    <div class="col-sm-3" >
                                    <button type="button" id="updateLocalFonts" class="button"><?php echo __('Update local fonts', 'customers-canvas-for-wc') ?></button>
                                    </div>
                                </div>
                                <div class="row mt-5">

                                    <div class="col" >
                                        <div id="settings-result" class="alert">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <script>
                            jQuery(function() {

                                var resultDiv = jQuery("#settings-result");

                                function failedAction(reason)
                                {
                                    resultDiv.removeClass('alert-success');
                                            resultDiv.addClass('alert-danger');
                                            resultDiv.html('<strong>'+reason+'</strong>');
                                };

                                function failedUrl(reason) {
                                    failedAction('<?php echo __('Save failed!', 'customers-canvas-for-wc') ?>' + reason);
                                };

                                jQuery("#updateLocalFonts").on('click', function () {
                                    var baseUrl = "<?php echo $model->CcUrl ?>/api/FontPreview/UpdateLocalFonts";
                                    var apiKey = "<?php echo $model->CcApiKey ?>";

                                    if(!apiKey)
                                    {
                                        failedAction('<?php echo __('Update failed!', 'customers-canvas-for-wc') ?> <?php echo __('Api key is required!', 'customers-canvas-for-wc') ?>');
                                    }

                                    jQuery.ajax({
                                        url: baseUrl,
                                        type: "POST",
                                        headers: { "X-CustomersCanvasAPIKey": apiKey },
                                        processData: false,
                                        contentType: false,
                                        success: function (response) {
                                                            resultDiv.removeClass('alert-danger');
                                                            resultDiv.addClass('alert-success');
                                                            resultDiv.html('<strong><?php echo __('Local fonts were updated successfully!', 'customers-canvas-for-wc') ?></strong>');
                                                    },
                                        error: function (xhr, textStatus, thrownError) {
                                            failedAction('<?php echo __('Update failed!', 'customers-canvas-for-wc') ?>'+ xhr.responseText);
                                        }
                                    });
                                });
                                jQuery("#saveSettings").on('click', function () {
                                    var newCcUrl = jQuery("#cc-url").val();
                                    var newDiUrl = jQuery("#di-url").val();
                                    var newPreflightUrl = jQuery("#preflight-url").val();
                                    var newOrigamiUrl = jQuery("#origami-url").val();

                                    if(!newCcUrl || newCcUrl.length === 0)
                                    {
                                        failedUrl('<?php echo __('Value is empty!', 'customers-canvas-for-wc') ?>');
                                    }
                                    else
                                    {
                                        var data = {
                                                        ccUrl: newCcUrl,
                                                        diUrl: newDiUrl || '',
                                                        preflightUrl: newPreflightUrl || '',
                                                        origamiUrl: newOrigamiUrl || '',
                                                        fileNamePattern:jQuery("#fileName-pattern").val(),
                                                        orderExport:jQuery("#order-export:checkbox:checked").val() || 'false',
                                                        orderExportPath:jQuery("#order-export-path").val(),
                                                        ccApiKey:jQuery("#cc-api-key").val(),
                                                        _wpnonce:'<?php echo wp_create_nonce('update-settings') ?>',
                                                        action:'update_cc_settings'
                                                    };
                                        jQuery.ajax({
                                                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                                                        data: data,
                                                        type: 'POST',
                                                        success: function (response) {
                                                            if (response.status == 'success') {
                                                                resultDiv.removeClass('alert-danger');
                                                                resultDiv.addClass('alert-success');
                                                                resultDiv.html('<strong><?php echo __('Save successful!', 'customers-canvas-for-wc') ?></strong>');
                                                            }
                                                            else {
                                                                failedUrl('<?php echo __('Server error!', 'customers-canvas-for-wc') ?>');
                                                                console.error('error: ' + response.message);
                                                            }
                                                        },
                                                        error: function (xhr, textStatus, thrownError) {
                                                            console.error("failed to load" + this.url, textStatus, xhr.status, thrownError, xhr.responseText);
                                                        }
                                                    });
                                    }
                                });
                            });
                        </script>
                        </div>
                        </div>
                    </div>
                    <!-- .inside -->

                </div>
                <!-- .postbox -->

            </div>
            <!-- .meta-box-sortables .ui-sortable -->

        </div>
        <!-- post-body-content -->

        <!-- sidebar -->
        <div id="postbox-container-1" class="postbox-container">

            <div class="meta-box-sortables">

                <div class="postbox">

                    <h2><span><?php esc_attr_e(
                                'About the plugin', 'WpAdminStyle'
                            ); ?></span></h2>

                    <div class="inside">
                        <p>Learn more about Customer's Canvas from our <a href="https://customerscanvas.com/docs/cc/introduction.htm">documentation</a>. 
                            If you get stuck, feel free to <a href="https://customerscanvas.com/account/cases">contact</a> our support team.
                        </p>
                        <p>&#9400; Copyright <a href="https://aurigma.com">Aurigma</a> 
                        </p>
                    </div>
                    <!-- .inside -->

                </div>
                <!-- .postbox -->

                <div class="postbox">

                    <h2><span><?php esc_attr_e(
                                'Resources & Reference', 'WpAdminStyle'
                            ); ?></span></h2>

                    <div class="inside">
                        <ul>
                            <li><a target="_blank" href="https://customerscanvas.com/docs/cc/getting-started.htm">Getting Started</a></li>
                            <li><a target="_blank" href="https://customerscanvas.com/docs/cc/configuring-products.htm">Configuring Products</a></li>
                            <li><a target="_blank" href="https://customerscanvas.com/docs/cc/supported-markers.htm">Supported Markers</a></li>
                            <li><a target="_blank" href="https://h2.customerscanvas.com">Cloud Control Panel</a></li>
                        </ul>
                    </div>
                    <!-- .inside -->

                </div>
                <!-- .postbox -->

            </div>
            <!-- .meta-box-sortables -->

        </div>
        <!-- #postbox-container-1 .postbox-container -->

    </div>
    <!-- #post-body .metabox-holder .columns-2 -->

    <br class="clear">
</div>
<!-- #poststuff -->

</div>
<!-- .wrap -->