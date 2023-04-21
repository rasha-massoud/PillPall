<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
    
    public function get_all_users(){


    }
}
