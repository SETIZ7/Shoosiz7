const express = require('express');
const app = express();

// تعریف یک مسیر ساده برای تست
app.get('/', (req, res) => {
    res.send('سرور کار می‌کند!');
});

// راه‌اندازی سرور
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`سرور در حال اجرا است بر روی http://localhost:${PORT}`);
});


// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');

// const app = express();

// // Middleware برای خواندن داده‌های POST
// app.use(bodyParser.json());

// app.post('*',(q,s)=>{
//     s.status(400).json({ success: false, message: 'ایمیل ارسال نشده است.' });
// })

// // Endpoint برای ارسال ایمیل
// app.post('/send-code', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ success: false, message: 'ایمیل ارسال نشده است.' });
//     }

//     // تولید کد تأیید
//     const code = Math.floor(100000 + Math.random() * 900000); // کد 6 رقمی

//     // تنظیمات SMTP
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'mohammad0setayeshi@gmail.com',
//             pass: 'SETIZ7X@MO86$'
//         }
//     });

//     // مشخصات ایمیل
//     const mailOptions = {
//         from: 'mohammad0setayeshi@gmail.com',
//         to: email,
//         subject: 'کد تأیید شما',
//         text: `کد تأیید شما: ${code}`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ success: true, message: 'ایمیل ارسال شد.', code });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, message: 'خطا در ارسال ایمیل.', error });
//     }
// });

// // راه‌اندازی سرور (در صورت نیاز)
// const PORT = 3002;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });





// const express = require('express');
// const nodemailer = require('nodemailer');

// const router = express.Router();

// router.post('/send-code', async (req, res) => {
//   const { email } = req.body;
//   const code = Math.floor(100000 + Math.random() * 900000);

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password'
//     }
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'کد تأیید شما',
//     text: `کد تأیید شما: ${code}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: 'Email sent', code });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to send email', error });
//   }
// });

// module.exports = router;



// const nodemailer = require('nodemailer');

// // تنظیمات SMTP (برای Gmail)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com', // ایمیل شما
//     pass: 'your-email-password' // رمز عبور ایمیل یا App Password
//   }
// });

// // تابع ارسال ایمیل
// async function sendEmail(to, subject, text) {
//   const mailOptions = {
//     from: 'your-email@gmail.com', // فرستنده
//     to: to, // گیرنده
//     subject: subject, // موضوع
//     text: text // متن ایمیل
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// // ارسال ایمیل
// sendEmail('recipient@example.com', 'کد تأیید', 'کد شما: 123456');
