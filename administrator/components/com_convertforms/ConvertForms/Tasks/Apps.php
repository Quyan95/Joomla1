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

namespace ConvertForms\Tasks;

use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;

defined('_JEXEC') or die('Restricted access');

class Apps
{
	public static function getApp($name, $data = null)
	{
		if (!$plugin = PluginHelper::getPlugin('convertformsapps', $name))
		{
			throw new \RuntimeException(\JText::sprintf('PLUGIN_NOT_FOUND', $name));
		}

		// On Joomla 4, use bootPlugin()
		if (defined('nrJ4'))
		{
			$app = Factory::getApplication()->bootPlugin($plugin->name, $plugin->type);

		} else 
		{
			// On Joomla 3, use the old classic way to boot up a plugin
			$name = 'plg' . $plugin->type . $plugin->name;
	
			require_once JPATH_PLUGINS . '/convertformsapps/' . $plugin->name . '/' . $plugin->name . '.php';
	
			$dispatcher = \JEventDispatcher::getInstance();

			$app = new $name($dispatcher, (array) $plugin);
		}

		// Provide data options
		$app->setParams($data);

		return $app;
	}

	public static function getList($tasks = null)
	{
		PluginHelper::importPlugin('convertformsapps');

		$apps = \method_exists(static::class, 'getProApps') ? self::getProApps() : [];

		if ($result = Factory::getApplication()->triggerEvent('onConvertFormsAppInfo', [$tasks]))
		{
			// Return an assosiative array for faster manipulation in JS.
			foreach ($result as $app)
			{
				// $app['error'] = [
				// 	'type' => 'proOnly',
				// 	'text' => strip_tags(\JText::sprintf('NR_PROFEATURE_DESC', $app['label'])),
				// ];

				$apps[$app['value']] = $app;
			}
		}

		ksort($apps);

		return $apps;
	}

	
}

?>