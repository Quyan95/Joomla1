<?php

/**
 * @package         EngageBox
 * @version         6.1.4 Pro
 *
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            http://www.tassos.gr
 * @copyright       Copyright © 2023 Tassos Marinos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
 */

defined( '_JEXEC' ) or die( 'Restricted access' );

use Joomla\CMS\Plugin\CMSPlugin;

class plgSystemTGeoIP extends CMSPlugin
{
    /**
     *  Joomla Application Object
     *
     *  @var  object
     */
    protected $app;

    /**
     *  Auto load plugin language 
     *
     *  @var  boolean
     */
    protected $autoloadLanguage = true;

    /**
     *  GeoIP Class
     *
     *  @var  object
     */
    private $geoIP;

    /**
     *  Load GeoIP Classes
     *
     *  @return  void
     */
    private function loadGeoIP()
    {
        $path = JPATH_PLUGINS . '/system/tgeoip';

        if (!class_exists('TGeoIP'))
        {
            if (@file_exists($path . '/helper/tgeoip.php'))
            {
                if (@include_once($path . '/vendor/autoload.php'))
                {
                    @include_once $path . '/helper/tgeoip.php';
                }
            }
        }

        $this->geoIP = new TGeoIP();
    }

    /**
     *  Listens to AJAX requests on ?option=com_ajax&format=raw&plugin=tgeoip
     *
     *  @return void
     */
    public function onAjaxTgeoip()
    {
        JSession::checkToken('request') or die('Invalid Token');

        // Only in admin
        if (!$this->app->isClient('administrator'))
        {
            return;
        }

        $this->loadGeoIP();

        $task = $this->app->input->get('task', 'update');

        $this->geoIP->setKey($this->app->input->get('license_key', ''));
        
        switch ($task)
        {
            // Update database and redirect
            case 'update-red': 

                $result = $this->geoIP->updateDatabase();

                if ($result === true)
                {
                    $msg = JText::_('PLG_SYSTEM_TGEOIP_DATABASE_UPDATED');
                    $msgType = 'message';
                } else
                {
                    $msgType = 'error';
                    $msg = $result;
                }

                $return = base64_decode($this->app->input->get->getBase64('return', null));

                $this->app->enqueueMessage($msg, $msgType);
                $this->app->redirect($return);
                break;

            // Update database
            case 'update':
                echo $this->geoIP->updateDatabase();
                break;
                
            // IP Lookup
            case 'get':
                $ip = $this->app->input->get('ip');
                echo json_encode($this->geoIP->setIP($ip)->getRecord());
                break;
        }
    }
}
