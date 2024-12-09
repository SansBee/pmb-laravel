<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Database\Eloquent\Builder;

class PendaftarExport implements FromQuery, WithHeadings, WithMapping
{
    protected $query;

    public function __construct(Builder $query)
    {
        $this->query = $query;
    }

    public function query()
    {
        return $this->query;
    }

    public function headings(): array
    {
        return [
            'Nama Lengkap',
            'Program Studi',
            'Gelombang',
            'Status Pendaftaran',
            'Status Pembayaran',
            'Tanggal Daftar'
        ];
    }

    public function map($pendaftar): array
    {
        return [
            $pendaftar->nama_lengkap,
            $pendaftar->programStudi->nama,
            $pendaftar->gelombang->nama_gelombang,
            $pendaftar->status_pendaftaran,
            $pendaftar->status_pembayaran,
            $pendaftar->created_at->format('d/m/Y')
        ];
    }
} 