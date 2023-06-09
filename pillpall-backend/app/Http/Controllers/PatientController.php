<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\PatientsInfo;
use App\Models\DoctorsInfo;
use App\Models\UserUser;

class PatientController extends Controller{

    public function CreateOrUpdateReport(Request $request){

        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $patient = PatientsInfo::where('user_id', Auth::id())->first();

            if (!$patient){
                $user = Auth::user();
                $user->approved = true;
                $user->first_login = false;
                $user->save();

                $patient= new PatientsInfo();
            }

            $patient->user_id = Auth::id();
            $patient->phone_number = $request->phone_number;
            $patient->dob = $request->dob;
            $patient->address = $request->address;
            $patient->gender = $request->gender;
            $patient->blood_type = $request->blood_type;
            $patient->height = $request->height;
            $patient->weight = $request->weight;
            $patient->emergency_name = $request->emergency_name;
            $patient->emergency_number = $request->emergency_number;
            $patient->emergency_email = $request->emergency_email;
            $patient->emergency_contact_relation = $request->emergency_contact_relation;
            $patient->body_temperature = $request->body_temperature;
            $patient->pulse_rate = $request->pulse_rate;
            $patient->respiration_rate = $request->respiration_rate;
            $patient->systolic_blood_pressure = $request->systolic_blood_pressure;
            $patient->chronic_conditions = $request->chronic_conditions;
            $patient->past_surgeries = $request->past_surgeries;
            $patient->family_medical_history = $request->family_medical_history;
            $patient->allergies = $request->allergies;
            $patient->life_style_habits = $request->life_style_habits;
            $patient->medications = $request->medications;

            if ($request->hasFile('image')) {
                if ($patient->image) {
                    $oldImagePath = storage_path('app/public/' . $patient->image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                $imagePath = $request->file('image')->store('images', 'public');
                $patient->image = str_replace('public/', 'storage/', $imagePath);
            }

            $patient->save();


            return response()->json([
                'status' => 'success',
                'message' => 'Pateint Report created/updated successfully'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the patient report.'
            ]);
        }
    }

    public function GetReport(){

        try {
            $user= Auth::user();
            $patientInfo= $user->patientsInfo;
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

    public function SearchForDoctor(Request $request){

        try{
            if ($request->search_by === 'name') {
                $doctors = User::where($request->search_by, 'like', $request->search_for)
                            ->where('role', 'doctor')
                            ->where('approved', 1)
                            ->with('doctorsInfo')
                            ->get()
                            ->map(function ($doctor) {
                                return [
                                    'id' => $doctor->id,
                                    'name' => $doctor->name,
                                    'email' => $doctor->email,
                                    'email_verified_at' => $doctor->email_verified_at,
                                    'role' => $doctor->role,
                                    'created_at' => $doctor->created_at,
                                    'updated_at' => $doctor->updated_at,
                                    'doctors_info' => $doctor->doctorsInfo
                                ];
                });
            } else {
                $doctors = User::where('approved', 1)->whereHas('doctorsInfo', function($query) use ($request) {
                    $query->where('major', 'like', $request->search_for);
                })
                ->where('role', 'doctor')
                ->with('doctorsInfo')
                ->get();
            }

            if ($doctors->isEmpty()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'The search worked successfully but there is no doctor as mentioned or doctor not approved yet.',
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'The search worked successfully.',
                'doctors' => $doctors,
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while searching.'
            ]);
        }
    }

    public function Connect(Request $request){

        try{

            $doctor = User::where('id', $request->doctor_id)->where('role', 'doctor')->first();

            if(!$doctor){
                return response()->json([
                    'status' => 'error', 
                    'message' => 'Doctor not found.'
                ]);
            }

            $user= Auth::id();

            $userUser = new UserUser;
            $userUser->patient_id = Auth::id();
            $userUser->doctor_id = $request->doctor_id;
            $userUser->save();

            return response()->json([
                'status' => 'success', 
                'message' => 'Connection added successfully.'
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while connecting.'
            ]);
        }
    }
}
