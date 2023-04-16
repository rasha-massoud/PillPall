<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\PatientsInfo;

class PatientController extends Controller{
    
    public function create_report(Request $request){
        // if (!$request->user()) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        try {
            $patient= new PatientsInfo();

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
                $imagePath = $request->file('image')->store('images');
                $patient->image = $imagePath;
            }

            $patient->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Pateint Report created successfully'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the patient report.' . $e->getMessage()
            ]);
        }
    }
}
