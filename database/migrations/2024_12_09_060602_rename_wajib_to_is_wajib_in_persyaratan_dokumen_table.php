<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->renameColumn('wajib', 'is_wajib');
        });
    }

    public function down()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->renameColumn('is_wajib', 'wajib');
        });
    }
};

