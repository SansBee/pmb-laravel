<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PersyaratanDokumen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Dokumen;
use App\Notifications\DokumenVerified;
use Illuminate\Support\Facades\Auth;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        $query = PersyaratanDokumen::query();

        // Filter pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nama_dokumen', 'like', "%{$search}%")
                  ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        // Filter kategori
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        // Urutkan berdasarkan kategori dan urutan
        $dokumen = $query->orderBy('kategori')
                        ->orderBy('urutan')
                        ->get()
                        ->map(function($doc) {
                            return [
                                ...$doc->toArray(),
                                'formatted_size' => $doc->formatted_size,
                                'format_description' => $doc->format_description,
                                'format_example' => $doc->format_example
                            ];
                        });

        return Inertia::render('Admin/PMB/Dokumen/Index', [
            'dokumen' => $dokumen,
            'kategori_list' => PersyaratanDokumen::KATEGORI,
            'format_list' => PersyaratanDokumen::FORMAT_FILE,
            'size_type_list' => PersyaratanDokumen::SIZE_TYPE,
            'filters' => $request->only(['search', 'kategori'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_dokumen' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|string',
            'format_file' => 'required|string',
            'max_size' => 'required|integer|min:1',
            'size_type' => 'required|in:KB,MB',
            'is_wajib' => 'boolean',
            'is_active' => 'boolean'
        ]);

        // Set urutan berdasarkan kategori
        $lastUrutan = PersyaratanDokumen::where('kategori', $request->kategori)
            ->max('urutan');
        
        $data = $request->all();
        $data['urutan'] = ($lastUrutan ?? 0) + 1;

        PersyaratanDokumen::create($data);

        return redirect()->back()->with('message', 'Dokumen berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $dokumen = PersyaratanDokumen::findOrFail($id);

        $request->validate([
            'nama_dokumen' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|string',
            'format_file' => 'required|string',
            'max_size' => 'required|integer|min:1',
            'size_type' => 'required|in:KB,MB',
            'is_wajib' => 'boolean',
            'is_active' => 'boolean'
        ]);

        $dokumen->update($request->all());

        return redirect()->back()->with('message', 'Dokumen berhasil diupdate');
    }

    public function destroy($id)
    {
        $dokumen = PersyaratanDokumen::findOrFail($id);
        $dokumen->delete();
        
        return redirect()->back()->with('message', 'Dokumen berhasil dihapus');
    }

    public function reorder(Request $request)
    {
        $updates = $request->validate([
            'updates' => 'required|array',
            'updates.*.id' => 'required|exists:persyaratan_dokumen,id',
            'updates.*.urutan' => 'required|integer|min:0'
        ]);

        foreach ($updates['updates'] as $item) {
            PersyaratanDokumen::where('id', $item['id'])
                ->update(['urutan' => $item['urutan']]);
        }

        return response()->json(['message' => 'Urutan berhasil diperbarui']);
    }

    public function verify($id)
    {
        $dokumen = Dokumen::findOrFail($id);
        $dokumen->update([
            'status' => 'verified',
            'verified_at' => now(),
            'verified_by' => Auth::id()
        ]);

        // Update status pendaftar jika semua dokumen terverifikasi
        $pendaftar = $dokumen->pendaftar;
        if (!$pendaftar->dokumen()->where('status', '!=', 'verified')->exists()) {
            // Semua dokumen sudah diverifikasi
            $pendaftar->update([
                'status_pendaftaran' => $pendaftar->status_pembayaran === 'lunas' 
                    ? 'diterima'    // Jika sudah bayar
                    : 'verifikasi'  // Jika belum bayar
            ]);
        }

        return redirect()->back()->with('message', 'Dokumen berhasil diverifikasi');
    }
} 