import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

interface Pembayaran {
    id: number;
    pendaftar: {
        nama_lengkap: string;
        program_studi: {
            nama: string;
        };
    };
    nominal: number;
    status: string;
    bukti_pembayaran: string;
    tanggal_pembayaran: string;
}

interface Props {
    pembayaran: Pembayaran[];
}

export default function PembayaranIndex({ pembayaran = [] }: Props) {
    // Debug: Log data yang diterima
    console.log('Data pembayaran:', pembayaran);

    // Pastikan pembayaran adalah array
    const pembayaranList = Array.isArray(pembayaran) ? pembayaran : [];

    return (
        <AdminLayout>
            <Head title="Pembayaran PMB - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Pembayaran PMB</h2>

                            {pembayaranList.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    Tidak ada data pembayaran
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Pendaftar
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nominal
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pembayaranList.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.pendaftar.nama_lengkap}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {item.pendaftar.program_studi.nama}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            Rp {item.nominal ? item.nominal.toLocaleString() : '0'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            item.status === 'verified' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : item.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(item.tanggal_pembayaran).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <a 
                                                            href={route('admin.pembayaran.bukti', item.bukti_pembayaran)}
                                                            target="_blank"
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                        >
                                                            Lihat Bukti
                                                        </a>
                                                        {item.status === 'pending' && (
                                                            <button 
                                                                onClick={() => router.put(route('admin.pembayaran.update', item.id))}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                Verifikasi
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 