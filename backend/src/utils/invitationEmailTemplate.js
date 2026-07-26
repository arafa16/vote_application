const invitationEmailTemplate = (name, linkReset) => {
  return `<!DOCTYPE html>
            <html lang="id">
            <head>
            <meta charset="UTF-8">
            <title>Undangan Aktivasi Akun</title>
            </head>

            <body style="margin:0;padding:30px;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#333;line-height:1.7;">

            <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">

                <table
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                    <td style="background:#2563eb;padding:25px;color:#ffffff;">
                        <h2 style="margin:0;">Undangan Aktivasi Akun</h2>
                        <div style="margin-top:8px;font-size:13px;">
                        Aplikasi Pemilihan Pengawas dan Pengurus Koperasi
                        </div>
                    </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                    <td style="padding:35px;">

                        <p>
                        Yth. <strong>${name}</strong>,
                        </p>

                        <p>
                        Anda terdaftar sebagai <strong>anggota koperasi</strong> yang memiliki hak untuk mengikuti
                        <strong>Pemilihan Pengawas dan Pengurus Koperasi</strong>.
                        </p>

                        <p>
                        Untuk dapat menggunakan aplikasi, silakan melakukan
                        <strong>aktivasi akun</strong> dengan membuat password terlebih dahulu.
                        </p>

                        <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center" style="padding:20px 0;">

                            <a
                                href="${linkReset}"
                                style="
                                background:#2563eb;
                                color:#ffffff;
                                text-decoration:none;
                                padding:14px 36px;
                                display:inline-block;
                                border-radius:6px;
                                font-weight:bold;
                                font-size:12px;
                                ">
                                Buat Password
                            </a>

                            </td>
                        </tr>
                        </table>

                        <p>
                        Apabila tombol di atas tidak dapat digunakan, silakan salin dan buka tautan berikut melalui browser:
                        </p>

                        <p style="word-break:break-all;">
                        <a
                            href="${linkReset}"
                            style="color:#2563eb;text-decoration:none;">
                            ${linkReset}
                        </a>
                        </p>

                        <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

                        <p>
                        <strong>Langkah aktivasi akun:</strong>
                        </p>

                        <ol style="padding-left:18px;">
                        <li>Klik tombol <strong>Buat Password</strong>.</li>
                        <li>Buat password baru untuk akun Anda.</li>
                        <li>Setelah password berhasil dibuat, sistem akan mengirimkan email verifikasi ke alamat email Anda.</li>
                        <li>Buka email tersebut, lalu klik tombol <strong>Verifikasi Akun</strong>.</li>
                        <li>Setelah akun berhasil diverifikasi, Anda dapat login ke aplikasi menggunakan email dan password yang telah dibuat.</li>
                        <li>Ikuti proses pemilihan Pengawas dan Pengurus Koperasi sesuai jadwal yang telah ditentukan.</li>
                        </ol>

                        <p>
                        Demi keamanan akun, mohon untuk tidak membagikan tautan aktivasi ini kepada siapa pun.
                        </p>

                        <p>
                        Apabila Anda tidak merasa pernah menerima undangan ini atau terdapat kesalahan data, silakan segera menghubungi
                        <strong>Admin USP KOPKARLA</strong>.
                        </p>

                        <br>

                        <p style="margin-bottom:0;">
                        Hormat kami,
                        </p>

                        <p style="margin-top:5px;">
                        <strong>KOPKARLA</strong>
                        </p>

                    </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                    <td
                        style="
                        background:#f8f9fa;
                        text-align:center;
                        padding:18px;
                        font-size:11px;
                        color:#777777;
                        ">
                        Email ini dikirim secara otomatis oleh sistem
                        <strong>Aplikasi Pemilihan Pengawas dan Pengurus Koperasi</strong>.
                        <br>
                        Mohon untuk tidak membalas email ini.
                    </td>
                    </tr>

                </table>

                </td>
            </tr>
            </table>

            </body>
            </html>`;
};

module.exports = invitationEmailTemplate;
