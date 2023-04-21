<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApprovedDoctor extends Model{
    use HasFactory;

    public function doctor(){
        return $this->belongsTo(User::class, 'doctor_id');
    }
    
    public function admin(){
        return $this->belongsTo(User::class, 'admin_id');
    }
}
