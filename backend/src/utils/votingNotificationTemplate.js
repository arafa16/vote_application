const votingNotificationTemplate = (
  name,
  directorName,
  commissionerName,
  voteDate,
) => {
  return `<!DOCTYPE html>
            <html lang="id">
            <head>
            <meta charset="UTF-8">
            <title>Konfirmasi Pemungutan Suara</title>
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
            <h2 style="margin:0;">Konfirmasi Pemungutan Suara</h2>

            <div style="margin-top:8px;font-size:13px;">
            Aplikasi Pemilihan Pengawas dan Pengurus Kopkarla
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
            Terima kasih. Sistem telah berhasil menerima dan mencatat suara Anda pada proses
            <strong>Pemilihan Pengawas dan Pengurus Kopkarla</strong>.
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;">

            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">

            <tr>
            <td width="35%"><strong>Tanggal Voting</strong></td>
            <td>: ${voteDate}</td>
            </tr>

            <tr>
            <td><strong>Calon Pengawas</strong></td>
            <td>: ${commissionerName}</td>
            </tr>

            <tr>
            <td><strong>Calon Pengurus</strong></td>
            <td>: ${directorName}</td>
            </tr>

            </table>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;">

            <p>
            Suara Anda telah tersimpan di sistem dan tidak dapat diubah kembali setelah proses pemungutan suara selesai.
            </p>

            <p>
            Email ini merupakan bukti bahwa proses pemungutan suara Anda telah berhasil dilakukan.
            </p>

            <p>
            Apabila terdapat pertanyaan terkait proses pemilihan, silakan menghubungi
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

module.exports = votingNotificationTemplate;
