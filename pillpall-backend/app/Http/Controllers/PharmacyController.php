<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;

class PharmacyController extends Controller{

    public function get_nearby_pharmacies($lat, $lng) {
        $client = new Client();
        $response = $client->get("https://nominatim.openstreetmap.org/search.php?q=pharmacy&format=json&lat={$lat}&lon={$lng}&radius=5000");
        $data = json_decode($response->getBody());
    
        $pharmacies = array();
        $count = 0;
        foreach ($data as $location) {
            if ($location->class == 'amenity' && $location->type == 'pharmacy' && $count < 6) {
                $pharmacies[] = array(
                    'name' => $location->display_name,
                    'latitude' => $location->lat,
                    'longitude' => $location->lon
                );
                $count++;
            }
        }
    
        return response()->json($pharmacies);
    }
}
