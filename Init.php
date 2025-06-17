<?php

namespace FacturaScripts\Plugins\ApiConsult;

use FacturaScripts\Core\Template\InitClass;

/**
 * Los plugins pueden contener un archivo Init.php en el que se definen procesos a ejecutar
 * cada vez que carga FacturaScripts o cuando se instala o actualiza el plugin.
 *
 * https://facturascripts.com/publicaciones/el-archivo-init-php-307
 */
class Init extends InitClass
{
    /**
     * Code to load every time FacturaScripts starts.
     */
    public function init(): void
    {
        // Aquí puedes añadir código que se ejecutará al iniciar FacturaScripts.
    }

    /**
     * Code that is executed when uninstalling a plugin.
     */
    public function uninstall(): void
    {
        // Aquí puedes añadir código que se ejecutará al desinstalar el plugin.
    }

    /**
     * Code to load every time the plugin is enabled or updated.
     */
    public function update(): void
    {
        // Aquí puedes añadir código que se ejecutará al actualizar el plugin.
    }
}
