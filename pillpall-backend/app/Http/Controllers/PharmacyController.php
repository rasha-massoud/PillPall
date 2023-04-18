<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;

class PharmacyController extends Controller{

    public function get_nearby_pharmacies(Request $request) {

        try{
            $latitude = $request->input('latitude');
            $longitude = $request->input('longitude');
            
            $url = 'https://api.opencagedata.com/geocode/v1/json';
            $params = [
                'key' => dd(env('OPENCAGE_API_KEY')),
                'pretty' => 1,
                'no_annotations' => 1,
                'limit' => 6,
                'no_dedupe' => 1,
                'abbrv' => 1,
                'q' => 'pharmacy',
                'proximity' => "{$latitude},{$longitude}",
                'radius' => 1000,
            ];
            
            $client = new Client(['cache' => false]);
            $response = $client->get($url, ['query' => $params]);
            $body = $response->getBody();
            
            $data = json_decode($body, true);
            $pharmacies = [];
            foreach ($data['results'] as $result) {
                $pharmacy = [
                    'name' => $result['formatted'],
                    'address' => $result['formatted'],
                    'latitude' => $result['geometry']['lat'],
                    'longitude' => $result['geometry']['lng'],
                ];
                $pharmacies[] = $pharmacy;
            }
            
            return response()->json([
                'status' => 'success',
                'latitude' => $request->input('latitude'),
                'pharmacies' => $pharmacies
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the nearby pharmacies.' 
            ]);
        }
    }
}