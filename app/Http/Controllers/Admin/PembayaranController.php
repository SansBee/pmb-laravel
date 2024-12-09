<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Pendaftar;


class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::with(['pendaftar.programStudi'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'pendaftar' => [
                        'nama_lengkap' => $item->pendaftar->nama_lengkap,
                        'program_studi' => [
                            'nama' => $item->pendaftar->programStudi->nama
                        ]
                    ],
                    'nominal' => $item->jumlah ?? 0,
                    'status' => $item->status,
                    'bukti_pembayaran' => $item->bukti_pembayaran,
                    'tanggal_pembayaran' => $item->created_at->format('Y-m-d H:i:s')
                ];
            });

        // Debug: Log data yang akan dikirim
        Log::info('Data pembayaran:', ['pembayaran' => $pembayaran]);

        // Di method index, tambahkan log untuk melihat data pendaftar
        Log::info('Data pendaftar:', [
            'pendaftar' => Pendaftar::with('pembayaran')
                ->get()
                ->map(fn($p) => [
                    'id' => $p->id,
                    'nama' => $p->nama_lengkap,
                    'status_pembayaran' => $p->status_pembayaran,
                    'pembayaran_status' => $p->pembayaran?->status
                ])
        ]);

        return Inertia::render('Admin/PMB/Pembayaran/Index', [
            'pembayaran' => $pembayaran
        ]);
    }

    public function showBukti($filename)
    {
        return Storage::response('public/bukti_pembayaran/' . $filename);
    }

    public function update($id)
    {
        $pembayaran = Pembayaran::findOrFail($id);
        
        DB::transaction(function() use ($pembayaran) {
            // Update pembayaran
            $pembayaran->update([
                'status' => 'verified',
                'verified_at' => now(),
                'verified_by' => Auth::id()
            ]);

            // Update status pendaftar
            $pendaftar = Pendaftar::find($pembayaran->pendaftar_id); // Ambil fresh data
            
            Log::info('Status pendaftar sebelum update:', [
                'pendaftar_id' => $pendaftar->id,
                'status_pembayaran' => $pendaftar->status_pembayaran,
                'pembayaran_status' => $pembayaran->status
            ]);

            $updated = $pendaftar->update([
                'status_pembayaran' => 'lunas',
                'status_pendaftaran' => $pendaftar->dokumen()->where('status', '!=', 'verified')->exists() 
                    ? 'verifikasi'
                    : 'diterima'
            ]);

            Log::info('Update status pendaftar:', [
                'success' => $updated,
                'new_status' => $pendaftar->fresh()->status_pembayaran
            ]);
        });

        return redirect()->back()->with('message', 'Pembayaran berhasil diverifikasi');
    }
} 