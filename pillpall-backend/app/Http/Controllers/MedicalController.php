<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Medication;

class MedicalController extends Controller{
    
    public function add_medicine(Request $request){

        try{
            $medicine = new Medication();

            $medicine->user_id = Auth::id();
            $medicine->name = $request->name;
            $medicine->dose_quantity = $request->dose_quantity;
            $medicine->price_per_month = $request->price_per_month;
            $medicine->instructions = $request->instructions;
            $medicine->days = $request->days;
            $medicine->timing = $request->timing;
            $medicine->first_of_each_month = $request->first_of_each_month;
            $medicine->on_demand = $request->on_demand;
            $medicine->image = $request->image;
    
            $medicine->save();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Medicine added successfully'
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the medicine.' 
            ]);
        }
        
    }

    public function delete_medicine(Request $request){

        try{
            $medicine = Medication::where('name', $request->name)
                                    ->where('dose_quantity', $request->dose_quantity)
                                    ->where('days', $request->days)
                                    ->where('timing', $request->timing)
                                    ->where('user_id', Auth::id())
                                    ->first();            
    
            if ($medicine) $medicine->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine deleted successfully'
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the medicine.'
            ]);
        }
        
    }

    public function get_medications($day, $date){

        try{
            
            $user = auth()->user();

            $date = Carbon::parse($date); 
            $is_first_of_month = $date->day == 1;
            if ($is_first_of_month) {
                $medication= $user->medications::where('days', 'like', $day)
                                ->orWhere(function($query) use ($is_first_of_month) {
                                    if ($is_first_of_month) $query->where('first_of_each_month', true);
                                })
                                ->get();    
            }
            else{
                $medication= $user->medications::where('days', 'like', $day);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Medications returned successfully',
                'medications' => $medication
            ]);

        } catch(exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the medicine of the selected day.'
            ]);
        }
    }

    
}
