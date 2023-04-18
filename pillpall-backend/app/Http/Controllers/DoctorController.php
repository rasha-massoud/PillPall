<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\DoctorsInfo;

class DoctorController extends Controller{
    
    public function __construct(){

        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (Auth::user()->role !== 'doctor') {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            return $next($request);
        });
    }

    public function create_update_report(Request $request){
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $doctor = DoctorsInfo::where('user_id', Auth::id())->first();
            if (!$doctor){
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
                $imagePath = $request->file('image')->store('images');
                $doctor->image = $imagePath;
            }

            $doctor->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Doctor Report created/updated successfully'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the doctor\'s report.'
            ]);
        }
    }

}