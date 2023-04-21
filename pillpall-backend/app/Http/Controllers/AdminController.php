<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\ApprovedDoctor;


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
            $admin = auth()->user();

            $approvedDoctor = new ApprovedDoctor;

            $approvedDoctor->admin_id = Auth::id();
            $approvedDoctor->doctor_id = $request->doctor_id;
            $approvedDoctor->status = 'approved';
            $approvedDoctor->save();

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


    }
}
