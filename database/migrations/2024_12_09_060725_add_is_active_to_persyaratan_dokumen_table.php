<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->boolean('is_active')->default(1)->after('is_wajib'); // Tambahkan kolom is_active
        });
    }

    public function down()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};

