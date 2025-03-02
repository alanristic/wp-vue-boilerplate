<?php

/**
 * Autoloader
 *
 * @package PluginClassName
 */

if (!defined('ABSPATH')) {
    exit;
}
if (!function_exists('PluginClassNameAutoload')) {
    /**
     * Plugin autoloader.
     *
     * Pattern (with or without <Subnamespace>):
     *  <Namespace>/<Subnamespace>.../Class_Name (or Classname)
     *  'includes/subdir.../class-name.php' or '...classname.php'
     *
     * @since 0.0.1
     *
     * @param $class
     */
    function PluginClassNameAutoload($class)
    {
        // Do not load unless in plugin domain.
        $namespace = 'PluginClassName';
        if (strpos($class, $namespace) !== 0) {
            return;
        }

        // Converts Class_Name (class convention) to class-name (file convention).

        // Remove the root namespace.
        $unprefixed = substr($class, strlen($namespace));

        // Build the file path.
        $file_path = str_replace('\\', DIRECTORY_SEPARATOR, $unprefixed);

        $file      = dirname(__FILE__) . $file_path . '.php';

        if (file_exists($file)) {
            require $file;
        }
    }
    
    // Register the autoloader.
    spl_autoload_register('PluginClassNameAutoload');
}
