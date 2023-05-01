<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\Medication;

class BudgetController extends Controller{
    
    public function BudgetTracker(){

        try{
            $current_month = date('F');
            $current_year = date('Y');
            
            $medication_prices = array();
            
            for ($i = 0; $i < 3; $i++) {
                $month = date('F', strtotime("-$i month"));
                $year = ($month == $current_month) ? $current_year : $current_year - 1;
                
                $medication_prices[$month] = Medication::where('user_id', Auth::id())
                                                ->where('month', $month)
                                                ->orWhere('month', 'All')
                                                ->sum('price_per_month');
            }
            
            return response()->json([
                'status' => 'success',
                'message' => 'Budget successfully retrieved.',
                'prices' => $medication_prices
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the budget.'
            ]);
        }
    }

}
