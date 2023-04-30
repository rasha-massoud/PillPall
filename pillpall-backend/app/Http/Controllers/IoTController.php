<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Medication;

class IoTController extends Controller{
    
    public function get_current_day_medication(){
        try{

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
            } else{
                $medication= $user->medications()->where('days', 'like', $day)->orWhere('days', 'Everyday')->get();
            }
    
            $data = [
                'status' => 'success',
                'medications' => $medication
            ];
            return response()->json($data);

            try {

                $serial = new \PhpSerial;
                $serial->deviceSet("COM5");
                $serial->confBaudRate(9600);
                $serial->confParity("none");
                $serial->confCharacterLength(8);
                $serial->confStopBits(1);
                $serial->deviceOpen();
                $serial->sendMessage(json_encode($data));
                $serial->deviceClose();
        
                return response()->json($data);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'An error occurred while communicating with the serial device.'
                ]);
            }
    
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the medicine of the current day.' .$e->getMessage()
            ]);
        }
    }
}
