<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Ubah kolom status_pembayaran menjadi string sementara
        Schema::table('pendaftar', function (Blueprint $table) {
            $table->string('status_pembayaran')->change();
        });

        // Update nilai yang ada
        DB::table('pendaftar')
            ->where('status_pembayaran', 'belum_bayar')
            ->update(['status_pembayaran' => 'belum_bayar']);
        
        // Ubah kembali menjadi enum dengan nilai baru
        DB::statement("ALTER TABLE pendaftar MODIFY status_pembayaran ENUM('belum_bayar', 'menunggu_verifikasi', 'lunas', 'ditolak') DEFAULT 'belum_bayar'");
    }

    public function down()
    {
        // Kembalikan ke enum awal jika perlu rollback
        DB::statement("ALTER TABLE pendaftar MODIFY status_pembayaran ENUM('belum_bayar', 'lunas') DEFAULT 'belum_bayar'");
    }
};