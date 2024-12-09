<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pendaftar_ujian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftar_id')->constrained('pendaftar')->onDelete('cascade');
            $table->foreignId('jadwal_ujian_id')->constrained('jadwal_ujian')->onDelete('cascade');
            $table->enum('status', ['terdaftar', 'hadir', 'tidak_hadir'])->default('terdaftar');
            $table->decimal('nilai', 5, 2)->nullable();
            $table->timestamps();

            // Tambahkan unique constraint untuk mencegah pendaftar terdaftar di jadwal yang sama
            $table->unique(['pendaftar_id', 'jadwal_ujian_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('pendaftar_ujian');
    }
};