<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckDoctorRole{
    
    public function handle(Request $request, Closure $next): Response{
        
        if (Auth::check() && Auth::user()->role === 'doctor') {
            return $next($request);
        }
    
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
