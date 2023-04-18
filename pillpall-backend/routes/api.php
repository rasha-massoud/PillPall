<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicalController;
use App\Http\Controllers\PharmacyController;

Route::group(["prefix" => "v0.0.0"], function(){
    Route::post('/register',[AuthController:: class, "register"]);
    Route::post('/login',[AuthController:: class, "login"]);
    Route::post('/logout',[AuthController:: class, "logout"]);
    Route::post('/refresh',[AuthController:: class, "refresh"]);
    
    Route::group(["middleware" => ["auth:api"]], function(){
        Route::post('/create_update_report',[PatientController:: class, "create_update_report"]);
        Route::get('/get_report',[PatientController:: class, "get_report"]);

        Route::post('/add_medicine',[MedicalController:: class, "add_medicine"]);
        Route::post('/delete_medicine',[MedicalController:: class, "delete_medicine"]);
        Route::post('/get_medications',[MedicalController:: class, "get_medications"]);
        Route::post('/add_file_number',[MedicalController:: class, "add_file_number"]);
        Route::post('/add_medical_result',[MedicalController:: class, "add_medical_result"]);
        Route::get('/get_medical_results',[MedicalController:: class, "get_medical_results"]);

        Route::get('/get_nearby_pharmacies', [PharmacyController:: class, 'get_nearby_pharmacies']);

        
    });
});