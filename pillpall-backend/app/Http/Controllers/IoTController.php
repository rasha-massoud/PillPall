<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;
use Carbon\Carbon;
use GuzzleHttp\Client;

use App\Models\User;
use App\Models\Medication;

class IoTController extends Controller
{
    public function GetCurrentDayMedications()
    {
        try {
            $user = auth()->user();
            $date = Carbon::now();
            $day = Carbon::now()->format('l');
    
            $is_first_of_month = $date->day == 1;
            if ($is_first_of_month) {
                $medication = $user->medications()
                    ->where(function ($query) use ($day, $is_first_of_month) {
                        $query->where(function ($query) use ($day) {
                            $query->where('days', 'like', "%$day%")
                                ->orWhere('days', 'Everyday');
                        });
                        if ($is_first_of_month) {
                            $query->orWhere(function ($query) {
                                $query->where('first_of_each_month', true);
                            }); 
                        }
                    })
                    ->get();
            } else {
                $medication = $user->medications()->where('days', 'like', $day)->orWhere('days', 'Everyday')->get();
            }
    
            $client = new Client();
            $response = $client->post('http://192.168.1.100', [
                'json' => [
                    'medications' => $medication
                ]
            ]);

            if ($response->getStatusCode() === 200) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Medications sent successfully to Arduino',
                    'medications' => $medication
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to send medications to Arduino'
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the medicine of the current day: ' . $e->getMessage()
            ]);
        }
    }
}