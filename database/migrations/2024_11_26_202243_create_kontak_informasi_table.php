<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('kontak_informasi', function (Blueprint $table) {
            $table->id();
            $table->string('jenis'); // telepon, whatsapp, email, alamat, sosmed
            $table->string('label');
            $table->text('nilai');
            $table->text('deskripsi')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kontak_informasi');
    }
}; 