<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Auth\Passwords\CanResetPassword;

use App\Models\Result;
use App\Models\FileNumber;
use App\Models\Medication;
use App\Models\DoctorsInfo;
use App\Models\PatientsInfo;
use App\Models\Chatbot;

class User extends Authenticatable implements JWTSubject{
    use HasFactory, Notifiable, CanResetPassword;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }
    
    public function users(){
        return $this->belongsToMany(User::class, 'user_user', 'patient_id', 'doctor_id');
    }

    public function results(){
        return $this->hasMany(Result::class);
    }

    public function fileNumbers(){
        return $this->hasMany(FileNumber::class);
    }

    public function medications(){
        return $this->hasMany(Medication::class);
    }

    public function doctorsInfo(){
        return $this->hasOne(DoctorsInfo::class);
    }

    public function patientsInfo(){
        return $this->hasOne(PatientsInfo::class);
    }

    public function chatbots(){
        return $this->hasMany(Chatbot::class);
    }

    public function approvedDoctors(){
        return $this->hasMany(ApprovedDoctor::class, 'doctor_id');
    }
}