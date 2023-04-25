<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(): void{
        Schema::table('file_numbers', function (Blueprint $table) {
            $table->string('image')->nullable()->change();
        });
    }

    public function down(): void{
        Schema::table('file_numbers', function (Blueprint $table) {
        });
    }
};