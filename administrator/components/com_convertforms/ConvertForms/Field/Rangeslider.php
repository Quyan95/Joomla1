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

namespace ConvertForms\Field;

defined('_JEXEC') or die('Restricted access');

class RangeSlider extends \ConvertForms\Field
{
	/**
	 *  Filter user value before saving into the database
	 *
	 *  @var  string
	 */
	protected $filterInput = 'FLOAT';
	
	/**
	 *  Remove common fields from the form rendering
	 *
	 *  @var  mixed
	 */
	protected $excludeFields = [
		'placeholder',
		'browserautocomplete',
		'size',
		'inputmask',
		'inputcssclass'
	];
}