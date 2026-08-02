const successActivationTemplate = (name, loginLink) => {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Aktivasi Akun Berhasil</title>
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
            <h2 style="margin:0;">Aktivasi Akun Berhasil</h2>
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
              Selamat! Akun Anda telah berhasil <strong>diaktifkan</strong>.
            </p>

            <p>
              Kini Anda dapat menggunakan aplikasi untuk mengikuti proses
              <strong>Pemilihan Pengawas dan Pengurus Koperasi</strong>.
            </p>

            <p>
              Silakan login menggunakan email dan password yang telah Anda buat.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:20px 0;">

                  <a
                    href="${loginLink}"
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
                    Login ke Aplikasi
                  </a>

                </td>
              </tr>
            </table>

            <p>
              Apabila tombol di atas tidak dapat digunakan, silakan salin dan buka tautan berikut melalui browser:
            </p>

            <p style="word-break:break-all;">
              <a
                href="${loginLink}"
                style="color:#16a34a;text-decoration:none;"
              >
                ${loginLink}
              </a>
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

            <p>
              <strong>Setelah login, Anda dapat:</strong>
            </p>

            <ul style="padding-left:18px;">
              <li>Melihat profil calon Pengawas dan Pengurus.</li>
              <li>Mengikuti proses pemungutan suara sesuai jadwal yang telah ditetapkan.</li>
              <li>Melihat status dan riwayat pemungutan suara.</li>
              <li>Mengelola informasi akun Anda.</li>
            </ul>

            <p>
              Demi keamanan akun, jangan pernah membagikan password Anda kepada siapa pun.
            </p>

            <p>
              Jika Anda mengalami kendala saat login, silakan menghubungi
              <strong>Sekretariat Kopkarla</strong>.
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
            <strong>Aplikasi Pemilihan Pengawas dan Pengurus Kopkarla</strong>.
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

module.exports = successActivationTemplate;
