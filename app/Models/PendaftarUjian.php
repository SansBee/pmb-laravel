<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PendaftarUjian extends Model
{
    protected $table = 'pendaftar_ujian';

    protected $fillable = [
        'pendaftar_id',
        'jadwal_ujian_id',
        'status',
        'nilai'
    ];

    protected $casts = [
        'nilai' => 'decimal:2'
    ];

    public function pendaftar(): BelongsTo
    {
        return $this->belongsTo(Pendaftar::class);
    }

    public function jadwalUjian(): BelongsTo
    {
        return $this->belongsTo(JadwalUjian::class);
    }
} 