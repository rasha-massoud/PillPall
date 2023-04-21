<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;

class PasswordController extends Controller{
    
    public function change_password(Request $request){

        try{

            $request->validate([
                'password' => 'required|string|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/',
                'confirm_password' => 'required|string|same:password',
            ]);
        
            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation Error',
                ]);
            }
        
            $user = Auth::user();
            $user->password = Hash::make($request->password);
            $user->save();
        
            return response()->json([
                'status' => 'success',
                'message' => 'Password changed successfully.',
            ]);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while changing the password.' 
            ]);
        }
    }
}
