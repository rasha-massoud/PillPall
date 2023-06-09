<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(): void{
        Schema::create('patients_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('image');
            $table->string('phone_number');
            $table->date('dob');
            $table->string('address');
            $table->string('gender');
            $table->string('blood_type');
            $table->integer('height');
            $table->integer('weight');
            $table->string('emergency_name');
            $table->string('emergency_number');
            $table->string('emergency_email');
            $table->string('emergency_contact_relation');
            $table->integer('body_temperature');
            $table->integer('pulse_rate');
            $table->integer('respiration_rate');
            $table->integer('systolic_blood_pressure');
            $table->string('chronic_conditions');
            $table->string('past_surgeries');
            $table->string('family_medical_history');
            $table->string('allergies');
            $table->string('life_style_habits');
            $table->string('medications');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('patients_infos');
    }
};
