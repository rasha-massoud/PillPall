<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(): void{
        Schema::create('file_numbers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('doctor_name');
            $table->string('address');
            $table->integer('file_number');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['doctor_name', 'address', 'file_number', 'user_id']);
            
            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('file_numbers');
    }
};
