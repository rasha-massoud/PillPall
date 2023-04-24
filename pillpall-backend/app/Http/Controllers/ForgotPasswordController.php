<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller{
    
    public function forgotPassword(Request $request){
        $request->validate(['email' => 'required|email']);
 
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
                    ? response()->json(['message' => 'Reset password link sent on your email id.'])
                    : response()->json(['message' => 'Unable to send reset link.'], 500);
   
    }



}
