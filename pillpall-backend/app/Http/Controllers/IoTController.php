<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class IoTController extends Controller{
    
    public function get_current_day_medication(){
        try{

            $user = auth()->user();
    
            $date = Carbon::now()->toDateString();
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
    
            return response()->json([
                'status' => 'success',
                'message' => 'Medications returned successfully',
                'medications' => $medication
            ]);
    
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the medicine of the selected day.'  .$e->getMessage()
            ]);
        }
    }
}
