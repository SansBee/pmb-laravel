import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica'
    },
    title: {
        fontSize: 18,
        marginBottom: 10
    },
    table: {
        width: '100%',
        marginTop: 10
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        minHeight: 24
    },
    tableHeader: {
        backgroundColor: '#f3f4f6'
    },
    tableCell: {
        width: '20%',
        padding: 5,
        fontSize: 10
    }
});

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

export default function LaporanPendaftarPDF({ pendaftar, tanggal }: Props) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Laporan Pendaftar PMB</Text>
                <Text>Tanggal: {tanggal}</Text>

                <View style={styles.table}>
                    {/* Header */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCell}>Nama</Text>
                        <Text style={styles.tableCell}>Program Studi</Text>
                        <Text style={styles.tableCell}>Gelombang</Text>
                        <Text style={styles.tableCell}>Status</Text>
                        <Text style={styles.tableCell}>Pembayaran</Text>
                    </View>

                    {/* Data */}
                    {pendaftar.map((p, i) => (
                        <View key={i} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{p.nama_lengkap}</Text>
                            <Text style={styles.tableCell}>{p.program_studi.nama}</Text>
                            <Text style={styles.tableCell}>{p.gelombang.nama_gelombang}</Text>
                            <Text style={styles.tableCell}>{p.status_pendaftaran}</Text>
                            <Text style={styles.tableCell}>{p.status_pembayaran}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
} 