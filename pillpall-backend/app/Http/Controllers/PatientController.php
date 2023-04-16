<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class PatientController extends Controller{
    
    public function create_report(Request $request){
        $user= new User();

        $user->user_id = $request->user_id;
        $user->image = $request->image;
        $user->phone_number = $request->phone_number;
        $user->dob = $request->dob;
        $user->address = $request->address;
        $user->gender = $request->gender;
        $user->blood_type = $request->blood_type;
        $user->height = $request->height;
        $user->weight = $request->weight;
        $user->emergency_name = $request->emergency_name;
        $user->emergency_number = $request->emergency_number;
        $user->emergency_email = $request->emergency_email;
        $user->emergency_contact_relation = $request->emergency_contact_relation;
        $user->body_temperature = $request->body_temperature;
        $user->pulse_rate = $request->pulse_rate;
        $user->respiration_rate = $request->respiration_rate;
        $user->systolic_blood_pressure = $request->systolic_blood_pressure;
        $user->chronic_conditions = $request->chronic_conditions;
        $user->past_surgeries = $request->past_surgeries;
        $user->family_medical_history = $request->family_medical_history;
        $user->allergies = $request->allergies;
        $user->life_style_habits = $request->life_style_habits;
        $user->medications = $request->medications;

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Pateint Report created successfully'
        ]);
    }
}
