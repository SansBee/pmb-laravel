<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetodePembayaran extends Model
{
    protected $table = 'metode_pembayaran';
    
    protected $fillable = [
        'nama_metode',
        'nomor_rekening',
        'atas_nama',
        'instruksi',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];
} 