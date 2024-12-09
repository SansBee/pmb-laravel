<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->string('format_file')->after('kategori')->nullable(); // Kolom format_file ditambahkan
        });
    }

    public function down()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->dropColumn('format_file'); // Hapus kolom format_file jika rollback
        });
    }
};
