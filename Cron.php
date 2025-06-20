<?php

namespace FacturaScripts\Plugins\ApiConsult;

use FacturaScripts\Core\Template\CronClass;

/**
 * El cron de FacturaScripts ejecutará todos los procesos cron de los plugins activos,
 * siempre y cuando haya sido configurado en el sistema o hosting.
 * Así que si necesita ejecutar algo de forma periódica, el mejor lugar es el cron de su plugin.
 *
 * https://facturascripts.com/publicaciones/el-archivo-cron-php-855
 */
class Cron extends CronClass
{
    public function run(): void
    {
        /*
        $this->job('mi-trabajo')->everyDayAt(8)->run(function () {
            // tu código aquí
            // esto se ejecutará cada día a las 8h
        });
        */
    }
}

