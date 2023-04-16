<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(): void{
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->date('testing_date');
            $table->string('file_name');
            $table->string('description');
            $table->string('file_path');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['testing_date', 'file_name', 'description', 'file_path', 'user_id']);

            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('results');
    }
};
