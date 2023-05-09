<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicalController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\IoTController;

Route::group(["prefix" => "v0.0.0"], function(){
    Route::post('/register',[AuthController:: class, "register"]);
    Route::post('/login',[AuthController:: class, "login"]);
    Route::post('/logout',[AuthController:: class, "logout"]);
    Route::post('/refresh',[AuthController:: class, "refresh"]);
    
    Route::group(["prefix" => "password"], function(){
        Route::post('/forgot',[ForgotPasswordController:: class, "ForgotPassword"]);
        Route::post('/reset',[ForgotPasswordController:: class, "ResetPassword"])->name('password.reset');
    });
    
    Route::group(["middleware" => ["auth:api"]], function(){

        Route::group(["middleware" => ["check.patient.role"]], function(){

            Route::group(["prefix" => "patient"], function(){
                Route::post('/report',[PatientController:: class, "CreateOrUpdateReport"]);
                Route::get('/get_report',[PatientController:: class, "GetReport"]);
                Route::post('/search',[PatientController:: class, "SearchForDoctor"]);
                Route::post('/connect',[PatientController:: class, "Connect"]);
            });

            Route::group(["prefix" => "med"], function(){
                Route::post('/add_medicine',[MedicalController:: class, "AddMedicine"]);
                Route::post('/delete_medicine',[MedicalController:: class, "DeleteMedicine"]);
                Route::post('/get_medications',[MedicalController:: class, "GetMedications"]);
                Route::post('/add_file_number',[MedicalController:: class, "AddFileNumber"]);
                Route::post('/add_medical_result',[MedicalController:: class, "AddMedicalResult"]);
                Route::get('/get_medical_results',[MedicalController:: class, "GetMedicalResults"]);
                Route::get('/get_file_numbers',[MedicalController:: class, "GetFileNumbers"]);
            });

            Route::group(["prefix" => "chatbot"], function(){
                Route::post('/question',[ChatbotController:: class, "ChatbotQuestion"]);
                Route::post('/replacement',[ChatbotController:: class, "ChatbotReplacement"]);
                Route::post('/effect',[ChatbotController:: class, "ChatbotEffect"]);
                Route::post('/instruction',[ChatbotController:: class, "ChatbotInstruction"]);
            });

            Route::group(["prefix" => "iot"], function(){
                Route::get('/get_medications',[IoTController:: class, "GetCurrentDayMedications"]);
            });

            
            Route::group(["prefix" => "budget"], function(){
                Route::get('/tracker',[BudgetController:: class, "BudgetTracker"]);
            });
        });


        Route::group(["middleware" => ["check.doctor.role"]], function(){

            Route::group(["prefix" => "doctor"], function(){
                Route::post('/report',[DoctorController:: class, "CreateOrUpdateReport"]);
                Route::get('/get_profile',[DoctorController:: class, "GetProfile"]);
                Route::post('/search',[DoctorController:: class, "SearchForConnectedPatients"]);
                Route::get('/get_patient_report/{id}',[DoctorController:: class, "GetPatientReport"]);
                Route::get('/get_patient_results/{id}',[DoctorController:: class, "GetPatientResults"]);
                Route::get('/get_connected_patients',[DoctorController:: class, "GetConnectedPatients"]);
            });
        });
        

        Route::group(["middleware" => ["check.admin.role"]], function(){

            Route::group(["prefix" => "admin"], function(){
                Route::post('/approve',[AdminController:: class, "ApproveDoctor"]);
                Route::get('/get_all_users',[AdminController:: class, "GetAllUsers"]);
                Route::get('/get_report/{user_id}',[AdminController:: class, "GetReport"]);
                Route::get('/get_patients',[AdminController:: class, "GetPatients"]);
                Route::get('/get_doctors',[AdminController:: class, "GetDoctors"]);
                Route::get('/get_approved_doctors',[AdminController:: class, "GetApprovedDoctors"]);
                Route::get('/get_unapproved_doctors',[AdminController:: class, "GetUnapprovedDoctors"]);
                Route::get('/get_patient_report/{id}',[AdminController:: class, "GetPatientReport"]);
            });
            
        });

        Route::group(["prefix" => "password"], function(){
            Route::post('/change',[PasswordController:: class, "ChangePassword"]);
        });

    });
});