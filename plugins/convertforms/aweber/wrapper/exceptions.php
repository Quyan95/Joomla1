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

// No direct access
defined('_JEXEC') or die('Restricted access');

class AWeberException extends Exception { }

/**
 * Thrown when the API returns an error. (HTTP status >= 400)
 *
 *
 * @uses AWeberException
 * @package
 * @version $id$
 */
class AWeberAPIException extends AWeberException
{

	public $type;
	public $status;
	public $message;
	public $documentation_url;
	public $url;

	public function __construct($error, $url)
	{
		// record specific details of the API exception for processing
		$this->url               = $url;
		$this->type              = $error['type'];
		$this->status            = array_key_exists('status', $error) ? $error['status'] : '';
		$this->message           = $error['message'];
		$this->documentation_url = $error['documentation_url'];

		parent::__construct($this->message);
	}
}

/**
 * Thrown when attempting to use a resource that is not implemented.
 *
 * @uses AWeberException
 * @package
 * @version $id$
 */
class AWeberResourceNotImplemented extends AWeberException
{

	public function __construct($object, $value)
	{
		$this->object = $object;
		$this->value  = $value;
		parent::__construct("Resource \"{$value}\" is not implemented on this resource.");
	}
}

/**
 * AWeberMethodNotImplemented
 *
 * Thrown when attempting to call a method that is not implemented for a resource
 * / collection.  Differs from standard method not defined errors, as this will
 * be thrown when the method is infact implemented on the base class, but the
 * current resource type does not provide access to that method (ie calling
 * getByMessageNumber on a web_forms collection).
 *
 * @uses AWeberException
 * @package
 * @version $id$
 */
class AWeberMethodNotImplemented extends AWeberException
{

	public function __construct($object)
	{
		$this->object = $object;
		parent::__construct("This method is not implemented by the current resource.");

	}
}

/**
 * AWeberOAuthException
 *
 * OAuth exception, as generated by an API JSON error response
 * @uses AWeberException
 * @package
 * @version $id$
 */
class AWeberOAuthException extends AWeberException
{

	public function __construct($type, $message)
	{
		$this->type    = $type;
		$this->message = $message;
		parent::__construct("{$type}: {$message}");
	}
}

/**
 * AWeberOAuthDataMissing
 *
 * Used when a specific piece or pieces of data was not found in the
 * response. This differs from the exception that might be thrown as
 * an AWeberOAuthException when parameters are not provided because
 * it is not the servers' expectations that were not met, but rather
 * the expecations of the client were not met by the server.
 *
 * @uses AWeberException
 * @package
 * @version $id$
 */
class AWeberOAuthDataMissing extends AWeberException
{

	public function __construct($missing)
	{
		if (!is_array($missing))
		{
			$missing = array($missing);
		}

		$this->missing = $missing;
		$required      = join(', ', $this->missing);
		parent::__construct("OAuthDataMissing: Response was expected to contain: {$required}");

	}
}

/**
 * AWeberResponseError
 *
 * This is raised when the server returns a non-JSON response. This
 * should only occur when there is a server or some type of connectivity
 * issue.
 *
 * @uses AWeberException
 * @package
 * @version $id$
 */
class AWeberResponseError extends AWeberException
{

	public function __construct($uri)
	{
		$this->uri = $uri;
		parent::__construct("Request for {$uri} did not respond properly.");
	}

}
