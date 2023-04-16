<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(): void{
        Schema::create('medications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->integer('dose_quantity');
            $table->integer('price_per_month');
            $table->string('instructions');
            $table->string('days');
            $table->time('timing');
            $table->tinyInteger('first_of_each_month');
            $table->tinyInteger('on_demand');
            $table->string('image');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['user_id', 'name', 'days', 'timing']);
            
            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('medications');
    }
};
