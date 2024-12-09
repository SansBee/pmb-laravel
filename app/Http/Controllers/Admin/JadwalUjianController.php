<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JadwalUjian;
use App\Models\GelombangPMB;
use App\Models\PendaftarUjian;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class JadwalUjianController extends Controller
{
    public function index()
    {
        $jadwal = JadwalUjian::with(['gelombang', 'pendaftar'])
            ->orderBy('tanggal_ujian', 'desc')
            ->get();

        $gelombang = GelombangPMB::where('is_active', true)->get();

        return Inertia::render('Admin/PMB/JadwalUjian/Index', [
            'jadwal' => $jadwal,
            'gelombang' => $gelombang
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all());
        
        $validated = $request->validate([
            'gelombang_id' => 'required|exists:gelombang_pmb,id',
            'jenis_ujian' => 'required|in:online,offline',
            'tanggal_ujian' => 'required|date',
            'lokasi' => 'required|string',
            'ruangan' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        try {
            Log::info('Validated data:', $validated);
            $jadwal = JadwalUjian::create($validated);
            Log::info('Created jadwal:', $jadwal->toArray());
            return redirect()->back()->with('message', 'Jadwal ujian berhasil ditambahkan');
        } catch (\Exception $e) {
            Log::error('Error creating jadwal:', ['error' => $e->getMessage()]);
            return redirect()->back()
                ->with('error', 'Gagal menambahkan jadwal ujian: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $jadwal = JadwalUjian::findOrFail($id);

        $validated = $request->validate([
            'gelombang_id' => 'required|exists:gelombang_pmb,id',
            'jenis_ujian' => 'required|in:online,offline',
            'tanggal_ujian' => 'required|date',
            'lokasi' => 'required|string',
            'ruangan' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        try {
            $jadwal->update($validated);
            return redirect()->back()->with('message', 'Jadwal ujian berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Gagal memperbarui jadwal ujian: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $jadwal = JadwalUjian::findOrFail($id);
        $jadwal->delete();

        return redirect()->back()->with('message', 'Jadwal ujian berhasil dihapus');
    }

    public function showPeserta($id)
    {
        $jadwalUjian = JadwalUjian::with(['pendaftar.pendaftar.programStudi'])
            ->findOrFail($id);

        return Inertia::render('Admin/PMB/JadwalUjian/PesertaModal', [
            'jadwalUjian' => $jadwalUjian
        ]);
    }

    public function updateStatusPeserta(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:terdaftar,hadir,tidak_hadir',
            'nilai' => 'nullable|numeric|min:0|max:100'
        ]);

        $pendaftarUjian = PendaftarUjian::findOrFail($id);
        $pendaftarUjian->update([
            'status' => $request->status,
            'nilai' => $request->status === 'hadir' ? $request->nilai : null
        ]);

        // Update status pendaftar jika perlu
        if ($request->status === 'hadir') {
            $pendaftar = $pendaftarUjian->pendaftar;
            $pendaftar->update([
                'status_pendaftaran' => 'selesai_ujian'
            ]);
        }

        return back()->with('success', 'Status peserta berhasil diupdate');
    }

    public function daftarkanPeserta(Request $request, $id)
    {
        $jadwalUjian = JadwalUjian::findOrFail($id);
        
        // Cek kapasitas
        if ($jadwalUjian->pendaftar()->count() >= $jadwalUjian->kapasitas) {
            return back()->with('error', 'Kapasitas ruangan sudah penuh');
        }

        // Daftarkan peserta
        $pendaftarUjian = PendaftarUjian::create([
            'pendaftar_id' => $request->pendaftar_id,
            'jadwal_ujian_id' => $id,
            'status' => 'terdaftar'
        ]);

        // Update status pendaftar
        $pendaftar = $pendaftarUjian->pendaftar;
        $pendaftar->update([
            'status_pendaftaran' => 'menunggu_ujian'
        ]);

        return back()->with('success', 'Peserta berhasil didaftarkan');
    }
} 