<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;

class AdminController extends Controller{
    
    public function __construct(){

        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (Auth::user()->role !== 'admin') {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            return $next($request);
        });
    }
    
    public function approve(Request $request){

        try{
            $doctor = User::where('id', $request->doctor_id)
                        ->where('role', 'doctor')
                        ->first();

            if(!$doctor){
                return response()->json([
                    'status' => 'failure',
                    'message' => 'There is no doctor with this id.'
                ]);
            }

            $doctor->approved = true;
            $doctor->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Doctor approved successfully.'
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while approving.' 
            ]);
        }
    }

    public function get_all_users(){
        
        try{
            $users = User::where('role', '<>', 'admin')->get();
            
            return response()->json([
                'status' => 'success',
                'users' => $users
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting all users.' 
            ]);
        }

    }
}
