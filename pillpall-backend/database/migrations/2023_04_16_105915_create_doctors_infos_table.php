<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    
    public function up(): void{
        Schema::create('doctors_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('image');
            $table->integer('phone_number');
            $table->date('dob');
            $table->string('gender');
            $table->string('address');
            $table->string('working_hours');
            $table->string('major');
            $table->string('certificates');
            $table->string('expertise');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('doctors_infos');
    }
};
