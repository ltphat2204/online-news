import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_APPPASS,
    },
});

export const sendOTP = async (toEmail, otp) => {
    const mailOptions = {
        from: 'documentofkelvin@gmail.com',
        to: toEmail,
        subject: 'Mã xác thực tài khoản OTP',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <table width="538" align="center">
                    <tbody>
                        <!-- Header -->
                        <tr style="text-align:center;vertical-align:middle">
                            <td style="height:65px;background-color:#01345e;text-align:center;vertical-align:middle;">
                                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                    <img src="/public/assets/Header mail.png" width="538" height="65" alt="Trang báo Điện tử Crispy Chicken Rice" style="display: block;">
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                            <td style="background-color:#fffff0;border:1px solid #ddd;">
                                <table width="470" border="0" align="center" cellpadding="0" cellspacing="0" style="padding-left:5px;padding-right:5px;padding-bottom:10px">
                                    <tbody>
                                        <tr>
                                            <td style="padding-top:32px;text-align:center">
                                                <h1 style="padding-top:16px;padding-bottom:9px;font-size:24px;color:#2f8bbf;font:30px/34px Arial,Helvetica,sans-serif">
                                                    MÃ XÁC THỰC TÀI KHOẢN
                                                </h1><br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top:12px">
                                                <span style="font-size:15px;color:#666666;font-family:Verdana,Arial,Helvetica,sans-serif">
                                                    <p>Quý Đọc giả đang thực hiện thao tác xác thực thông tin tài khoản trên Trang báo Điện tử Crispy Chicken Rice</p>
                                                </span>
                                                <p><span style="font-size:24px;font-family:Arial,Helvetica,sans-serif;font-weight:bold"><span class="il">OTP</span> - </span><span style="font-size:24px;color:#f27d00;font-family:Arial,Helvetica,sans-serif;font-weight:bold">${otp}</span></p>
                                                <span style="font-size:12px;color:#666666;font-family:Verdana,Arial,Helvetica,sans-serif;font-style:italic">
                                                    <p>(<span style="color:red">*</span>) Lưu ý: Mã <span class="il">OTP</span> chỉ có giá trị trong vòng 5 phút.</p>
                                                </span>
                                            </td>
                                        </tr>
                                        <!-- Footer -->
                                        <tr>
                                            <td style="padding-bottom:10px"></td>
                                        </tr>
                                        <tr bgcolor="#083961">
                                            <td style="padding:20px;font-size:12px;line-height:17px;color:#c6d4df;font-family:Verdana,Arial,Helvetica,sans-serif">
                                                <p style="padding-bottom:10px;color:#c6d4df">Thư này được gửi đến Quý Đọc giả với mục đích xác thực thông tin email được đăng ký và thông tin người dùng là chính xác.</p>
                                                <p style="padding-bottom:10px;color:#c6d4df">Quá trình xác thực được hoàn tất thông qua việc Quý Đọc giả gửi lại mã <span class="il">OTP</span> đến Trang báo Điện tử Crispy Chicken Rice. <span style="color:#ffffff;font-weight:bold">Tất cả các thông báo khác từ Trang báo Điện tử Crispy Chicken Rice sẽ được gửi đến Quý Đọc giả thông qua email hiện tại.</span></p>
                                                <p style="padding-bottom:10px;color:#c6d4df"><span style="color:#ffffff;font-weight:bold">Nếu email không còn sử dụng</span>, Quý Đọc giả xin vui lòng tiến hành thay đổi lại thông tin email. </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-size:12px;color:#6d7880;padding-top:16px;padding-bottom:40px"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};