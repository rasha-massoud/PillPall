<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\PatientsInfo;
use App\Models\DoctorsInfo;

class AdminController extends Controller{
    
    public function ApproveDoctor(Request $request){

        try{
            $doctor = User::where('id', $request->doctor_id)
                        ->where('role', 'doctor')
                        ->first();

            if(!$doctor){
                return response()->json([
                    'status' => 'failure',
                    'message' => 'There is no doctor with this id.',
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

    public function GetAllUsers(){
        
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

    public function GetReport($user_id){

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
    
    public function GetPatients(){

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

    public function GetDoctors(){

        try{

            $user = User::where('role', 'doctor')->get();

            if ($user->isEmpty()) {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'There are no doctors.'
                ]);
            }

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

    public function GetApprovedDoctors(){

        try{

            $user = User::where('role', 'doctor')
                        ->where('approved', 1)
                        ->get();

            if ($user->isEmpty()) {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'There are no approved doctors.'
                ]);
            }

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

    public function GetUnapprovedDoctors(){

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

    public function GetPatientReport($id){

        try{
            $patient = User::find($id);

            if (!$patient || $patient->role != 'patient') {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'No patient found with the given ID.'
                ]);
            }

            $report = $patient->patientsInfo()->get();
        
            return response()->json([
                'status' => 'success',
                'message' => 'Report retrieved successfully.',
                'patient' => $patient,
                'report' => $report
            ]);
        } catch (exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the patient\'s report.'
            ]);
        }
    }

    public function GetDoctorReport($id){

        try{
            $doctor = User::find($id);

            if (!$doctor || $doctor->role != 'doctor') {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'No doctor found with the given ID.'
                ]);
            }

            $report = $doctor->doctorsInfo()->get();
        
            return response()->json([
                'status' => 'success',
                'message' => 'Report retrieved successfully.',
                'doctor' => $doctor,
                'report' => $report
            ]);
        } catch (exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the doctor\'s report.'
            ]);
        }
    }
}
