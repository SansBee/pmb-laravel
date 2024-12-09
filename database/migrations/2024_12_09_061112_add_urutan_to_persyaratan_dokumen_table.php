<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            if (!Schema::hasColumn('persyaratan_dokumen', 'urutan')) {
                $table->integer('urutan')->default(0)->after('kategori');
            }
        });
    }

    public function down()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->dropColumn('urutan');
        });
    }
};