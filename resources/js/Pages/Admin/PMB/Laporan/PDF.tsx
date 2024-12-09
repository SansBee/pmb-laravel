import { PDFViewer } from '@react-pdf/renderer';
import LaporanPendaftarPDF from '@/Components/PDF/LaporanPendaftarPDF';

interface Props {
    pendaftar: Array<{
        nama_lengkap: string;
        program_studi: { nama: string };
        gelombang: { nama_gelombang: string };
        status_pendaftaran: string;
        status_pembayaran: string;
    }>;
    tanggal: string;
}

export default function PDF({ pendaftar, tanggal }: Props) {
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <LaporanPendaftarPDF 
                pendaftar={pendaftar}
                tanggal={tanggal}
            />
        </PDFViewer>
    );
} 