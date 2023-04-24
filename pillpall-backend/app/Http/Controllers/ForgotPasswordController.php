<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;

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

    public function reset_password(Request $request){
        
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/',
            'confirm_password' => 'required|string|same:password',
            'token' => 'required|string',
        ]);

        $response = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordReset($user));
            }
        );

        return $response == Password::PASSWORD_RESET
                    ? response()->json(['message' => 'Password reset successfully.'])
                    : response()->json(['message' => 'Unable to reset password.'], 500);
    }

}
