<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserUser extends Model{

    protected $table = 'user_user';
    
    protected $fillable = [
        'patient_id',
        'doctor_id',
    ];

    public function patient(){
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function doctor(){
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
