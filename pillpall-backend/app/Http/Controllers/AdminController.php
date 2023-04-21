<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\PatientsInfo;
use App\Models\DoctorsInfo;

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

    public function get_report($user_id){

        try{
            $user = User::find($user_id);

            if ($user->role == 'patient'){
                $report= $user->patientsInfo;
            } else {
                $report= $user->doctorsInfo;
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Report retrieved successfully.',
                'user' => $user
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the report.' 
            ]);
        }
    }
    
    public function get_patients(){

        try{

            $user = User::where('role', 'patient')->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Patients retrieved successfully.',
                'user' => $user
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the patients.' 
            ]);
        }
    }

    public function get_doctors(){

        try{

            $user = User::where('role', 'doctor')->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Doctors retrieved successfully.',
                'user' => $user
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the doctors.' 
            ]);
        }
    }

    public function get_approved_doctors(){

        try{

            $user = User::where('role', 'doctor')
                        ->where('approved', 1)
                        ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Approved doctors retrieved successfully.',
                'user' => $user
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the approved doctors.' 
            ]);
        }
    }

    public function get_unapproved_doctors(){

        try{

            $user = User::where('role', 'doctor')
                        ->where('approved', 0)
                        ->get();

            if ($user->isEmpty()) {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'There are no unapproved doctors.'
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Unapproved doctors retrieved successfully.',
                'user' => $user
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the unapproved doctors.' 
            ]);
        }
    }
}
