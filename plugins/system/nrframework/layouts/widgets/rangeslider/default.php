<?php

/**
 * @package         EngageBox
 * @version         6.1.4 Pro
 * 
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            https://www.tassos.gr
 * @copyright       Copyright © 2023 Tassos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
*/

defined('_JEXEC') or die('Restricted access');

extract($displayData);

if (!$readonly && !$disabled)
{
	JHtml::script('plg_system_nrframework/widgets/slider.js', ['relative' => true, 'version' => 'auto']);
}

if ($load_stylesheet)
{
	JHtml::stylesheet('plg_system_nrframework/widgets/slider.css', ['relative' => true, 'version' => 'auto']);
}

if ($load_css_vars)
{
	JFactory::getDocument()->addStyleDeclaration('
		.nrf-slider-wrapper.' . $id . ' {
			--base-color: ' . $base_color . ';
			--progress-color: ' . $color . ';
			--input-bg-color: ' . $input_bg_color . ';
			--input-border-color: ' . $input_border_color . ';
			--thumb-shadow-color: ' . $color . '26' . ';
		}
	');
}
?>
<div class="nrf-widget nrf-slider-wrapper <?php echo $css_class; ?>">
	<input
		type="range"
		class="nrf-slider-range PrivateSwitchBase-input"
		min="<?php echo $min; ?>"
		max="<?php echo $max; ?>"
		step="<?php echo $step; ?>"
		value="<?php echo $value; ?>"
		<?php if ($load_css_vars): ?>
			data-base-color="<?php echo $base_color; ?>"
			data-progress-color="<?php echo $color; ?>"
			style="background: linear-gradient(to right, <?php echo $color; ?> 0%, <?php echo $color . ' ' . $bar_percentage; ?>%, <?php echo $base_color . ' ' . $bar_percentage; ?>%, <?php echo $base_color; ?> 100%)"
		<?php endif; ?>
		<?php if ($readonly || $disabled): ?>
		disabled
		<?php endif; ?>
	/>
	<input
		type="number"
		value="<?php echo $value; ?>"
		id="<?php echo $id; ?>"
		name="<?php echo $name; ?>"
		min="<?php echo $min; ?>"
		max="<?php echo $max; ?>"
		step="<?php echo $step; ?>"
		class="nrf-slider-value form-control<?php echo !empty($input_class) ? ' ' . $input_class : ''; ?>"
		<?php if ($readonly || $disabled): ?>
		readonly
		<?php endif; ?>
	/>
</div>