<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('jadwal_ujian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gelombang_id')->constrained('gelombang_pmb')->onDelete('cascade');
            $table->enum('jenis_ujian', ['online', 'offline']);
            $table->dateTime('tanggal_ujian');
            $table->string('lokasi');
            $table->string('ruangan');
            $table->integer('kapasitas');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jadwal_ujian');
    }
};