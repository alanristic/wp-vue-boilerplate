<?php

namespace productio\Classes;

class LoadAssets
{
    public function admin()
    {
        Vite::enqueueScript('productio-script-boot', 'admin/start.js', array('jquery'), PRODUCTIO_VERSION, true);
    }
  
}
