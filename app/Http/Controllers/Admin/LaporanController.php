<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\Pembayaran;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use PDF;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PendaftarExport;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        // Statistik Umum
        $stats = [
            'total_pendaftar' => Pendaftar::count(),
            'pendaftar_baru' => Pendaftar::where('created_at', '>=', now()->subDays(7))->count(),
            'total_pembayaran' => number_format(
                Pembayaran::where('status', 'verified')->sum('jumlah'), 
                0, 
                ',', 
                '.'
            ),
        ];

        // Statistik per Program Studi
        $per_prodi = ProgramStudi::withCount('pendaftar')
            ->get()
            ->map(fn($prodi) => [
                'nama' => $prodi->nama,
                'total' => $prodi->pendaftar_count
            ]);

        // Tren Pendaftaran (7 hari terakhir)
        $tren_pendaftaran = Pendaftar::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($item) => [
                'tanggal' => Carbon::parse($item->date)->format('d/m'),
                'total' => $item->total
            ]);

        // Status Pendaftaran
        $status_pendaftaran = [
            'baru' => Pendaftar::where('status_pendaftaran', 'baru')->count(),
            'verifikasi' => Pendaftar::where('status_pendaftaran', 'verifikasi')->count(),
            'diterima' => Pendaftar::where('status_pendaftaran', 'diterima')->count(),
            'ditolak' => Pendaftar::where('status_pendaftaran', 'ditolak')->count()
        ];

        // Status Pembayaran
        $status_pembayaran = [
            'lunas' => Pendaftar::where('status_pembayaran', 'lunas')->count(),
            'belum_bayar' => Pendaftar::where('status_pembayaran', 'belum_bayar')->count(),
            'ditolak' => Pendaftar::where('status_pembayaran', 'ditolak')->count()
        ];

        // Data Pendaftar (dengan filter)
        $query = Pendaftar::with(['programStudi', 'gelombang'])
            ->latest();

        // Apply filters
        if ($request->filled('tanggal_mulai')) {
            $query->whereDate('created_at', '>=', $request->tanggal_mulai);
        }
        if ($request->filled('tanggal_selesai')) {
            $query->whereDate('created_at', '<=', $request->tanggal_selesai);
        }
        if ($request->filled('program_studi_id')) {
            $query->where('program_studi_id', $request->program_studi_id);
        }
        if ($request->filled('status')) {
            $query->where('status_pendaftaran', $request->status);
        }

        $pendaftar = $query->get();

        return Inertia::render('Admin/PMB/Laporan/Index', [
            'stats' => $stats,
            'per_prodi' => $per_prodi,
            'tren_pendaftaran' => $tren_pendaftaran,
            'status_pendaftaran' => $status_pendaftaran,
            'status_pembayaran' => $status_pembayaran,
            'pendaftar' => $pendaftar,
            'filter' => $request->only(['tanggal_mulai', 'tanggal_selesai', 'program_studi_id', 'status'])
        ]);
    }

    public function export(Request $request)
    {
        $query = $this->getFilteredQuery($request);
        
        return Excel::download(new PendaftarExport($query), 'laporan-pendaftar.xlsx');
    }

    public function exportPdf(Request $request)
    {
        $query = $this->getFilteredQuery($request);
        $pendaftar = $query->get();

        return Inertia::render('Admin/PMB/Laporan/PDF', [
            'pendaftar' => $pendaftar,
            'tanggal' => now()->format('d/m/Y')
        ]);
    }

    private function getFilteredQuery(Request $request)
    {
        $query = Pendaftar::with(['programStudi', 'gelombang'])
            ->latest();

        if ($request->filled('tanggal_mulai')) {
            $query->whereDate('created_at', '>=', $request->tanggal_mulai);
        }
        if ($request->filled('tanggal_selesai')) {
            $query->whereDate('created_at', '<=', $request->tanggal_selesai);
        }
        if ($request->filled('program_studi_id')) {
            $query->where('program_studi_id', $request->program_studi_id);
        }
        if ($request->filled('status')) {
            $query->where('status_pendaftaran', $request->status);
        }

        return $query;
    }
} 