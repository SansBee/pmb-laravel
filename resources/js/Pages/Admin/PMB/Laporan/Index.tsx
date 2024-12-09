import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import Filter from './Filter';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

interface Props {
    stats: {
        total_pendaftar: number;
        pendaftar_baru: number;
        total_pembayaran: number;
        pembayaran_pending: number;
    };
    per_prodi: Array<{
        nama: string;
        total: number;
    }>;
    tren_pendaftaran: Array<{
        tanggal: string;
        total: number;
    }>;
    status_pendaftaran: {
        baru: number;
        verifikasi: number;
        diterima: number;
        ditolak: number;
    };
    status_pembayaran: {
        lunas: number;
        belum_bayar: number;
        ditolak: number;
    };
    pendaftar: Array<{
        id: number;
        nama_lengkap: string;
        program_studi: { nama: string };
        gelombang: { nama_gelombang: string };
        status_pendaftaran: string;
        created_at: string;
    }>;
    filter?: any;
}

export default function LaporanIndex({ stats, per_prodi, tren_pendaftaran, status_pendaftaran, status_pembayaran, pendaftar, filter }: Props) {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <AdminLayout>
            <Head title="Laporan PMB - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Tombol Filter & Export */}
                    <div className="mb-6 flex justify-end space-x-2">
                        <button 
                            onClick={() => setShowFilter(true)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            Filter
                        </button>
                        <a 
                            href={route('admin.laporan.export', filter)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Export Excel
                        </a>
                        <a 
                            href={route('admin.laporan.export-pdf', filter)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Export PDF
                        </a>
                    </div>

                    {/* Statistik Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <StatCard 
                            title="Total Pendaftar" 
                            value={stats.total_pendaftar} 
                        />
                        <StatCard 
                            title="Pendaftar Baru (7 Hari)" 
                            value={stats.pendaftar_baru}
                        />
                        <StatCard 
                            title="Total Pembayaran" 
                            value={`Rp ${stats.total_pembayaran}`}
                        />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Tren Pendaftaran */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium mb-4">Tren Pendaftaran</h3>
                            <Line 
                                data={{
                                    labels: tren_pendaftaran.map(item => item.tanggal),
                                    datasets: [{
                                        label: 'Pendaftar',
                                        data: tren_pendaftaran.map(item => item.total),
                                        borderColor: '#4F46E5',
                                        tension: 0.1
                                    }]
                                }}
                            />
                        </div>

                        {/* Pendaftar per Prodi */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium mb-4">Pendaftar per Program Studi</h3>
                            <Bar 
                                data={{
                                    labels: per_prodi.map(item => item.nama),
                                    datasets: [{
                                        label: 'Pendaftar',
                                        data: per_prodi.map(item => item.total),
                                        backgroundColor: '#4F46E5'
                                    }]
                                }}
                            />
                        </div>

                        {/* Status Pendaftaran */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium mb-4">Status Pendaftaran</h3>
                            <Pie 
                                data={{
                                    labels: ['Baru', 'Verifikasi', 'Diterima', 'Ditolak'],
                                    datasets: [{
                                        data: [
                                            status_pendaftaran.baru,
                                            status_pendaftaran.verifikasi,
                                            status_pendaftaran.diterima,
                                            status_pendaftaran.ditolak
                                        ],
                                        backgroundColor: [
                                            '#FCD34D',
                                            '#60A5FA',
                                            '#34D399',
                                            '#F87171'
                                        ]
                                    }]
                                }}
                            />
                        </div>

                        {/* Status Pembayaran */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium mb-4">Status Pembayaran</h3>
                            <Pie 
                                data={{
                                    labels: ['Lunas', 'Belum Bayar', 'Ditolak'],
                                    datasets: [{
                                        data: [
                                            status_pembayaran.lunas,
                                            status_pembayaran.belum_bayar,
                                            status_pembayaran.ditolak
                                        ],
                                        backgroundColor: [
                                            '#34D399',
                                            '#FCD34D',
                                            '#F87171'
                                        ]
                                    }]
                                }}
                            />
                        </div>
                    </div>

                    {/* Tabel Data */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Data Pendaftar</h2>
                            </div>

                            {/* Table content */}
                            {/* ... (table code remains the same) ... */}
                        </div>
                    </div>
                </div>
            </div>

            {showFilter && (
                <Filter
                    initialFilter={filter}
                    onClose={() => setShowFilter(false)}
                />
            )}
        </AdminLayout>
    );
}

// Komponen StatCard
function StatCard({ title, value }: { title: string; value: number | string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
    );
}