<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicalController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ChatbotController;

Route::group(["prefix" => "v0.0.0"], function(){
    Route::post('/register',[AuthController:: class, "register"]);
    Route::post('/login',[AuthController:: class, "login"]);
    Route::post('/logout',[AuthController:: class, "logout"]);
    Route::post('/refresh',[AuthController:: class, "refresh"]);
    
    Route::group(["middleware" => ["auth:api"]], function(){
        Route::post('/patient_report',[PatientController:: class, "create_update_report"]);
        Route::get('/get_report',[PatientController:: class, "get_report"]);
        Route::post('/search_for_doctor',[PatientController:: class, "search_for_doctor"]);
        Route::post('/connect',[PatientController:: class, "connect"]);

        Route::post('/add_medicine',[MedicalController:: class, "add_medicine"]);
        Route::post('/delete_medicine',[MedicalController:: class, "delete_medicine"]);
        Route::post('/get_medications',[MedicalController:: class, "get_medications"]);
        Route::post('/add_file_number',[MedicalController:: class, "add_file_number"]);
        Route::post('/add_medical_result',[MedicalController:: class, "add_medical_result"]);
        Route::get('/get_medical_results',[MedicalController:: class, "get_medical_results"]);
        Route::get('/get_file_numbers',[MedicalController:: class, "get_file_numbers"]);

        Route::get('/get_nearby_pharmacies', [PharmacyController:: class, 'get_nearby_pharmacies']);

        Route::post('/doctor_report',[DoctorController:: class, "create_update_report"]);
        Route::post('/view_connected_patients',[DoctorController:: class, "view_connected_patients"]);
        Route::get('/get_patient_report/{id}',[DoctorController:: class, "get_patient_report"]);
        Route::get('/get_patient_results/{id}',[DoctorController:: class, "get_patient_results"]);

        Route::post('/chatbot_question',[ChatbotController:: class, "chatbot_question"]);
        Route::post('/chatbot_replacement',[ChatbotController:: class, "chatbot_replacement"]);
        Route::post('/chatbot_effect',[ChatbotController:: class, "chatbot_effect"]);
        Route::post('/chatbot_instruction',[ChatbotController:: class, "chatbot_instruction"]);

    });
});