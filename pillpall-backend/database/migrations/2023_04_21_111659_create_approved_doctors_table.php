<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    
    public function up(): void{
        Schema::create('approved_doctors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('doctor_id');
            $table->unsignedBigInteger('admin_id');
            $table->string('status')->default('unapproved');

            $table->foreign('doctor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('admin_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['doctor_id', 'admin_id']);

            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('approved_doctors');
    }
};
