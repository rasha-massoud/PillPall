<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\Medication;

class MedicalController extends Controller{
    
    public function add_edit_medicine(Request $request){

        try{
            $medicine = Medication::find($name, $request->name)
                                    ->where($id, Auth::id())
                                    ->first();

            if(!$medicine) $medicine = new Medication();

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
                'message' => 'Medicine added/edited successfully'
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding/editing the medicine.'
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

    
}
