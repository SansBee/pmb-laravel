<!DOCTYPE html>
<html>
<head>
    <title>Laporan Pendaftar</title>
    <style>
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border: 1px solid #ddd; }
        th { background: #f3f4f6; }
    </style>
</head>
<body>
    <h2>Laporan Pendaftar PMB</h2>
    <p>Tanggal: {{ $tanggal }}</p>

    <table>
        <thead>
            <tr>
                <th>Nama</th>
                <th>Program Studi</th>
                <th>Gelombang</th>
                <th>Status</th>
                <th>Pembayaran</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pendaftar as $p)
            <tr>
                <td>{{ $p->nama_lengkap }}</td>
                <td>{{ $p->programStudi->nama }}</td>
                <td>{{ $p->gelombang->nama_gelombang }}</td>
                <td>{{ $p->status_pendaftaran }}</td>
                <td>{{ $p->status_pembayaran }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html> 