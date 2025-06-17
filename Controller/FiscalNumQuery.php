<?php

namespace FacturaScripts\Plugins\ApiConsult\Controller;

use FacturaScripts\Core\Base\Controller;
use FacturaScripts\Core\Tools;

class FiscalNumQuery extends Controller
{
    public function getPageData(): array
    {
        $pageData = parent::getPageData();
        $pageData["menu"] = "";
        $pageData["title"] = "FiscalNumQuery";
        $pageData["icon"] = "fas fa-file";
        return $pageData;
    }

    public function privateCore(&$response, $user, $permissions): void
    {
        parent::privateCore($response, $user, $permissions);
        $this->apiConsult();
    }

    public function apiConsult()
    {
        $token = Tools::settings('apiconsult', 'token');
        $cifnif = $this->request->get('cifnif');

        if (!$token) {
            $json_data = json_encode(['error' => 'No se ha configurado adecuadamente el TOKEN.']);
            header('Content-Type: application/json');
            echo $json_data;
            exit; // 👈 DETIENE TODO
        }

        $url = "https://apiconsult.zampisoft.com/api/consultar?identificacion=" . urlencode($cifnif) . "&token=" . urlencode($token);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        if ($response === false) {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error al consultar datos externos.']);
            exit;
        }

        // Muy importante: solo imprimimos el JSON recibido y salimos
        header('Content-Type: application/json');
        echo $response;
        exit; // 👈 FUNDAMENTAL
    }



    public function publicCore(&$response): void
    {
        parent::publicCore($response);
        // Este controlador no tiene lógica pública.
    }
}
