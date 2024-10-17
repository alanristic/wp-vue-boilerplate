<?php

/**
 * Plugin Name: Productio
 * Plugin URI: #
 * Description: A sample WordPress boilerplace plugin to implement Vue & Vite with TailwindCSS etc..
 * Author: Alan R
 * Author URI: #
 * Version: 0.0.1
 * Text Domain: productio
 */
define('PRODUCTIO_URL', plugin_dir_url(__FILE__));
define('PRODUCTIO_DIR', plugin_dir_path(__FILE__));

define('PRODUCTIO_VERSION', '0.0.1');

// This will automatically update, when you run 'dev' or 'production'
define('PRODUCTIO_DEVELOPMENT', 'yes');

class productio {
    /**
     * Boot the plugin
     */
    public function boot()
    {
        $this->loadClasses();
        $this->registerShortCodes();
        $this->ActivatePlugin();
        $this->renderMenu();
        $this->disableUpdateNag();
        $this->loadTextDomain();
    }

    /**
     * Load all classes (autoloader)
     */
    public function loadClasses()
    {
        require PRODUCTIO_DIR . 'includes/autoload.php';
    }

    public function renderMenu()
    {
        add_action('admin_menu', function () {
            if (!current_user_can('manage_options')) {
                return;
            }
            global $submenu;
            add_menu_page(
                'productio',
                'Productio',
                'manage_options',
                'productio.php',
                array($this, 'renderAdminPage'),
                'dashicons-editor-code',
                25
            );
            $submenu['productio.php']['dashboard'] = array(
                'Dashboard',
                'manage_options',
                'admin.php?page=productio.php#/',
            );
            $submenu['productio.php']['contact'] = array(
                'Contact',
                'manage_options',
                'admin.php?page=productio.php#/contact',
            );
        });
    }

    /**
     * Main admin Page where the Vue app will be rendered
     * For translatable string localization you may use like this
     * 
     *      add_filter('productio/frontend_translatable_strings', function($translatable){
     *          $translatable['world'] = __('World', 'productio');
     *          return $translatable;
     *      }, 10, 1);
     */
    public function renderAdminPage()
    {
        $loadAssets = new \productio\Classes\LoadAssets();
        $loadAssets->admin();

        $translatable = apply_filters('productio/frontend_translatable_strings', array(
            'hello' => __('Hello', 'productio'),
        ));

        $productio = apply_filters('productio/admin_app_vars', array(
            'assets_url' => PRODUCTIO_URL . 'assets/',
            'ajaxurl' => admin_url('admin-ajax.php'),
            'i18n' => $translatable
        ));

        wp_localize_script('productio-script-boot', 'productioAdmin', $productio);

        echo '<div class="productio-admin-page" id="productio_app">
            <div class="main-menu text-white-200 bg-wheat-600 p-4">
                <router-link to="/">
                    Home
                </router-link> |
                <router-link to="/contact" >
                    Contacts
                </router-link>
            </div>
            <hr/>
            <router-view></router-view>
        </div>';
    }

    /*
    * NB: text-domain should match exact same as plugin directory name (Plugin Name)
    * WordPress plugin convention: if plugin name is "My Plugin", then text-domain should be "my-plugin"
    * 
    * For PHP you can use __() or _e() function to translate text like this __('My Text', 'productio')
    * For Vue you can use $t('My Text') to translate text, You must have to localize "My Text" in PHP first
    * Check example in "renderAdminPage" function, how to localize text for Vue in i18n array
    */
    public function loadTextDomain()
    {
        load_plugin_textdomain('productio', false, basename(dirname(__FILE__)) . '/languages');
    }


    /**
     * Disable update nag for the dashboard area
     */
    public function disableUpdateNag()
    {
        add_action('admin_init', function () {
            $disablePages = [
                'productio.php',
            ];

            if (isset($_GET['page']) && in_array($_GET['page'], $disablePages)) {
                remove_all_actions('admin_notices');
            }
        }, 20);
    }


    /**
     * Activate plugin
     * Migrate DB tables if needed
     */
    public function ActivatePlugin()
    {
        register_activation_hook(__FILE__, function ($newWorkWide) {
            require_once(PRODUCTIO_DIR . 'includes/Classes/Activator.php');
            $activator = new \productio\Classes\Activator();
            $activator->migrateDatabases($newWorkWide);
        });
    }


    /**
     * Register ShortCodes here
     */
    public function registerShortCodes()
    {
        // Use add_shortcode('shortcode_name', 'function_name') to register shortcode
    }
}

(new productio())->boot();



