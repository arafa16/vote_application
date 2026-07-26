const resetPasswordEmailTemplate = (name, linkReset) => {
  return `<!DOCTYPE html>
            <html lang="id">
            <head>
              <meta charset="UTF-8">
              <title>Reset Password</title>
            </head>

            <body style="margin:0;padding:30px;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#333333;line-height:1.7;">

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
            <td align="center">

            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">

              <!-- Header -->
              <tr>
                <td style="background:#2563eb;padding:25px 20px;color:#ffffff;">
                  <h2 style="margin:0;font-size:22px;font-weight:bold;">
                    Reset Password
                  </h2>

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
                    Kami menerima permintaan untuk melakukan <strong>reset password</strong>
                    pada akun Anda.
                  </p>

                  <p>
                    Untuk membuat password baru, silakan klik tombol di bawah ini.
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
                            display:inline-block;
                            padding:14px 34px;
                            border-radius:6px;
                            font-size:12px;
                            font-weight:bold;
                          ">
                          Reset Password
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
                    <strong>Catatan penting:</strong>
                  </p>

                  <ul style="padding-left:18px;">
                    <li>Tautan reset password hanya dapat digunakan dalam batas waktu yang telah ditentukan.</li>
                    <li>Jangan membagikan tautan ini kepada siapa pun.</li>
                    <li>Apabila Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.</li>
                  </ul>

                  <p>
                    Jika Anda mengalami kendala atau merasa terdapat aktivitas yang tidak dikenal pada akun Anda,
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

module.exports = resetPasswordEmailTemplate;
