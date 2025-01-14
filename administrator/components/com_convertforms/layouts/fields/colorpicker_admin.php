<?php

/**
 * @package         Convert Forms
 * @version         4.2.4 Pro
 * 
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            https://www.tassos.gr
 * @copyright       Copyright © 2023 Tassos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
*/

defined('_JEXEC') or die('Restricted access');

extract($displayData);

$css = @file_get_contents(JPATH_ROOT . '/media/plg_system_nrframework/css/widgets/colorpicker.css');
$css .= '
	.nrf-colorpicker-wrapper#' . $field->input_id . ' input[type="text"] {
		border-color: ' . $field->form['params']->get('inputbordercolor', '#ffffff') . ';
		background: ' . $field->form['params']->get('inputbg', '#ffffff') . ';
	}
';

echo '<style>' . $css . '</style>';
echo $class->toWidget();

?>