<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\DoctorsInfo;
use App\Models\PatientsInfo;
use App\Models\UserUser;

class DoctorController extends Controller{

    public function CreateOrUpdateReport(Request $request){
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $doctor = DoctorsInfo::where('user_id', Auth::id())->first();
            if (!$doctor){
                $user = Auth::user();
                $user->first_login = false;
                $user->save();
                $doctor= new DoctorsInfo();
            }
            
            $doctor->user_id = Auth::id();
            $doctor->phone_number = $request->phone_number;
            $doctor->dob = $request->dob;
            $doctor->address = $request->address;
            $doctor->gender = $request->gender;
            $doctor->working_hours = $request->working_hours;
            $doctor->major = $request->major;
            $doctor->certificates = $request->certificates;
            $doctor->expertise = $request->expertise;
            
            if ($request->hasFile('image')) {
                if ($doctor->image) {
                    $oldImagePath = storage_path('app/public/' . $doctor->image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                $imagePath = $request->file('image')->store('images', 'public');
                $doctor->image = str_replace('public/', 'storage/', $imagePath);
            }
            
            $doctor->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Doctor Report created/updated successfully',
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the doctor\'s report.'
            ]);
        }
    }

    public function GetProfile(){
        try {
            $user= Auth::user();
            $doctorInfo= $user->doctorsInfo;
            return response()->json([
                'status' => 'success',
                'message' => 'The report is successfully returned.',
                'user'=>$user,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting the report.'
            ]);
        }
    }

    public function SearchForConnectedPatients(Request $request){

        try{

            $doctor= Auth::user();
            if (!$doctor->approved){
                return response()->json([
                    'status' => 'failure',
                    'message' => 'Doctor not approved.'
                ]);
            }

            $patient = User::where('name', 'like', $request->name)
                        ->where('role', 'patient')
                        ->with('patientsInfo')
                        ->first();

            if (!$patient) {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'No patient found with the given name.'
                ]);
            }

            $doctor= Auth::id();

            $connected= UserUser::where('doctor_id', $doctor)
                            ->where('patient_id', $patient->id)
                            ->first();

            if (!$connected) {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'The patient is not connected to you.'
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'The search worked successfully.',
                'patient' => $patient,
            ]);   
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the connected patient\'s info.'
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
        
            $doctor= Auth::id();

            $connected= UserUser::where('doctor_id', $doctor)
                            ->where('patient_id', $patient->id)
                            ->first();

            if (!$connected) {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'The patient is not connected to you.'
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

    public function GetPatientResults($id){

        try{
            
            $doctor= Auth::user();
            if (!$doctor->approved){
                return response()->json([
                    'status' => 'failure',
                    'message' => 'Doctor not approved.'
                ]);
            }
            
            $patient = User::find($id);

            if (!$patient || $patient->role != 'patient') {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'No patient found with the given ID.'
                ]);
            }
        
            $doctor= Auth::id();

            $connected= UserUser::where('doctor_id', $doctor)
                            ->where('patient_id', $patient->id)
                            ->first();

            if (!$connected) {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'The patient is not connected to you.'
                ]);
            }
            
            $results = $patient->results()->get();
        
            return response()->json([
                'status' => 'success',
                'message' => 'Results retrieved successfully.',
                'patient' => $patient,
                'results' => $results
            ]);
        } catch (exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the patient\'s results.'
            ]);
        }
    }

    public function GetConnectedPatients(){

        try{

            $doctor = Auth::user();

            if ($doctor->role == 'doctor' && $doctor->approved) {
                $connected_patients = UserUser::where('doctor_id', $doctor->id)->get();

                $patient_ids = $connected_patients->pluck('patient_id')->toArray();
    
                $patients_info = PatientsInfo::whereIn('user_id', $patient_ids)
                                ->with('user')
                                ->get();

                return response()->json([
                    'status' => 'success',
                    'message' => 'The search worked successfully.',
                    'patients' => $patients_info,
                ]);
            } else {
                return response()->json([
                    'status' => 'failure',
                    'message' => 'Doctor not approved.',
                ]);
            }
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the connected patients.'
            ]);
        }
  
    }
}
