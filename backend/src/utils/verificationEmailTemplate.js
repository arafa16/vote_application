const verificationEmailTemplate = (name, linkVerification) => {
  return `<!DOCTYPE html>
            <html lang="id">
            <head>
            <meta charset="UTF-8">
            <title>Verifikasi Aktivasi Akun</title>
            </head>

            <body style="margin:0;padding:30px;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#333;line-height:1.7;">

            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                <td align="center">

                    <table
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;"
                    >

                    <!-- Header -->
                    <tr>
                        <td style="background:#16a34a;padding:25px;color:#ffffff;">
                        <h2 style="margin:0;">Verifikasi Aktivasi Akun</h2>
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
                            Password akun Anda telah berhasil dibuat.
                        </p>

                        <p>
                            Sebelum dapat menggunakan aplikasi, Anda perlu melakukan
                            <strong>verifikasi aktivasi akun</strong>.
                        </p>

                        <p>
                            Silakan klik tombol di bawah ini untuk mengaktifkan akun Anda.
                        </p>

                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                            <td align="center" style="padding:20px 0;">

                                <a
                                href="${linkVerification}"
                                style="
                                    background:#16a34a;
                                    color:#ffffff;
                                    text-decoration:none;
                                    padding:14px 36px;
                                    display:inline-block;
                                    border-radius:6px;
                                    font-weight:bold;
                                    font-size:12px;
                                "
                                >
                                Verifikasi Akun
                                </a>

                            </td>
                            </tr>
                        </table>

                        <p>
                            Apabila tombol di atas tidak dapat digunakan, silakan salin dan buka tautan berikut melalui browser:
                        </p>

                        <p style="word-break:break-all;">
                            <a
                            href="${linkVerification}"
                            style="color:#16a34a;text-decoration:none;"
                            >
                            ${linkVerification}
                            </a>
                        </p>

                        <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

                        <p>
                            <strong>Setelah akun berhasil diverifikasi, Anda dapat:</strong>
                        </p>

                        <ul style="padding-left:18px;">
                            <li>Login ke aplikasi menggunakan email dan password yang telah dibuat.</li>
                            <li>Melihat profil calon Pengawas dan Pengurus.</li>
                            <li>Mengikuti proses pemungutan suara sesuai jadwal yang telah ditetapkan.</li>
                            <li>Melihat status dan riwayat pemungutan suara.</li>
                        </ul>

                        <p>
                            Demi keamanan akun, mohon untuk tidak membagikan tautan verifikasi ini kepada siapa pun.
                        </p>

                        <p>
                            Apabila Anda tidak melakukan pembuatan password atau merasa terdapat kesalahan data,
                            silakan segera menghubungi <strong>Admin USP KOPKARLA</strong>.
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
                        "
                        >
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

module.exports = verificationEmailTemplate;
