const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./router'); // وارد کردن فایل router
// const nodemailer = require('nodemailer');  // اضافه کردن nodemailer
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('4VX7HFANA6XNXH3W2SE2952X'); 
// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
const nodemailer = require('nodemailer');
const rundomCode = require('./shoosiz/script/component/rundom');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'shoosiz')));


// console.log(rundomCode(6))
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohammad0setayeshi@gmail.com",
      pass: "qfje ngeu kfoo eywx"
    }
  });
  
  app.post('/apis/findEmailpart/sendEmail', async (req, res) => {
    // console.log('first')
      const { email } = req.body;
  
      if (!email) {
          return res.status(400).json({ success: false, message: 'ایمیل ارسال نشده است.' });
      }
  
      const code = rundomCode(5); // تولید کد 5 رقمی
  
      const mailOptions = {
          from: "mohammad0setayeshi@gmail.com",
          to: email,
          subject: "کد تأیید شما",
          text: `کد تأیید شما: ${code}`,
          html: `<h2>کد تأیید شما در  <strong> SHOOSIZ </strong></h2>
          <h1> ${code} </h1>`,
      };

      transporter.sendMail(mailOptions)
    .then(() => {
        res.status(200).json({ success: true, message: "ایمیل ارسال شد.", code });
    })
    .catch(error => {
        console.error("خطا در ارسال ایمیل:", error);
        res.status(500).json({ success: false, message: "خطا در ارسال ایمیل.", error: error.message });
    });
    //   try {
    //       await transporter.sendMail(mailOptions);
    //       res.status(200).json({ success: true, message: "ایمیل ارسال شد.", code });
    //     } catch (error) {
    //       console.log(code)
    //       console.error("خطا در ارسال ایمیل:", error);
    //       res.status(500).json({ success: false, message: "خطا در ارسال ایمیل.", error });
    //   }
  });
  

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({ username: 'api', key: 'b865e52808c0c6a76c4b8cff0f18aedb-d8df908e-180a547e' });  // API Key شما اینجا قرار می‌گیرد

// app.post('/apis/findEmailpart/sendEmail', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ success: false, message: 'ایمیل ارسال نشده است.' });
//     }

//     const code = Math.floor(100000 + Math.random() * 900000); // تولید کد 6 رقمی

//     const message = {
//         from: 'mohammad0setayeshi@gmail.com', // ایمیل ارسال‌کننده
//         to: [email], // ایمیل گیرنده
//         subject: 'کد تأیید شما',
//         text: `کد تأیید شما: ${code}`,
//         html: `<p>کد تأیید شما: <strong>${code}</strong></p>`,
//     };

//     try {
//         await mg.messages.create('sandboxe6256db6712645659810f9181a326484.mailgun.org', message);
//         res.status(200).json({ success: true, message: 'ایمیل ارسال شد.', code });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, message: 'خطا در ارسال ایمیل.', error });
//     }
// });

// app.post('/apis/findEmailpart/sendEmail', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ success: false, message: 'ایمیل ارسال نشده است.' });
//     }

//     const code = Math.floor(100000 + Math.random() * 900000); // تولید کد 6 رقمی

//     try {
//         // ارسال ایمیل با استفاده از Mailgun
//         const message = await mg.messages.create('sandbox-yourdomain.mailgun.org', { // اینجا دامنه خود را وارد کنید
//             from: 'mailgun@yourdomain.mailgun.org', // ایمیل ارسال‌کننده
//             to: [email], // ایمیل گیرنده
//             subject: 'کد تأیید شما',
//             text: `کد تأیید شما: ${code}`,
//             html: `<p>کد تأیید شما: <strong>${code}</strong></p>`,
//         });

//         res.status(200).json({ success: true, message: 'ایمیل ارسال شد.', code });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, message: 'خطا در ارسال ایمیل.', error });
//     }
// });




// app.post('/apis/findEmailpart/sendEmail', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ success: false, message: 'ایمیل ارسال نشده است.' });
//     }

//     const code = Math.floor(100000 + Math.random() * 900000); // تولید کد 6 رقمی

//     const message = {
//         to: email, // ایمیل گیرنده
//         from: 'your-email@example.com', // ایمیل ارسال‌کننده (تأیید شده در SendGrid)
//         subject: 'کد تأیید شما',
//         text: `کد تأیید شما: ${code}`,
//         html: `<p>کد تأیید شما: <strong>${code}</strong></p>`,
//     };

//     try {
//         await sgMail.send(message);
//         res.status(200).json({ success: true, message: 'ایمیل ارسال شد.', code });
//     } catch (error) {
//         console.error('Error sending email:', error.response ? error.response.body : error);
//         res.status(500).json({ success: false, message: 'خطا در ارسال ایمیل.', error });
//     }
// });

// مسیر جدید برای ارسال کد تأیید به ایمیل
// app.post('/apis/findEmailpart/sendEmail', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ success: false, message: 'ایمیل ارسال نشده است.' });
//     }

//     const code = Math.floor(100000 + Math.random() * 900000);  // کد 6 رقمی

//     // تنظیمات SMTP برای ارسال ایمیل
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'mohammad0setayeshi@gmail.com',  // ایمیل ارسال کننده
//             pass: 'SETIZ7X@MO86$'         // پسورد ایمیل
//         }
//     });

//     const mailOptions = {
//         from: 'mohammad0setayeshi@gmail.com',
//         to: email,
//         subject: 'کد تأیید شما',
//         text: `کد تأیید شما: ${code}`
//     };

//     try {
//         // ارسال ایمیل
//         await transporter.sendMail(mailOptions);
        
//         res.status(200).json({ success: true, message: 'ایمیل ارسال شد.', code });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, message: 'خطا در ارسال ایمیل.', error });
//     }
// });

// مسیرهای دیگر و شروع سرور
app.get('*', (req, res) => {
    const myRout = req.path;
    const routeData = router(myRout);
    console.log(routeData);

    if (myRout.endsWith('.html')) {
        res.status(404).sendFile(path.join(__dirname, 'shoosiz', 'notfind404.html'));
    }

    if (routeData) {
        res.set('X-Scroll-To-ID', routeData.id);
        res.sendFile(path.join(__dirname, 'shoosiz', routeData.rout));
    } else {
        res.status(404).sendFile(path.join(__dirname, 'shoosiz', 'notfind404.html'));
    }
});

// راه‌اندازی سرور
app.listen(PORT, () => {
    console.log(`سرور در حال اجرا است: http://localhost:${PORT}`);
});



// const express = require('express');
// const path = require('path');  // برای مدیریت مسیرها
// const cors = require('cors');  // برای فعال‌سازی CORS (در صورت نیاز)
// // const db = require('./db'); // وارد کردن اتصال به دیتابیس
// const router = require('./router'); // وارد کردن فایل روتر

// const app = express();
// const PORT = 3001;

// // فعال‌سازی CORS در صورت نیاز
// app.use(cors());
// app.use(express.json());

// // Middleware برای ارائه فایل‌های استاتیک (HTML، CSS، JS)
// app.use(express.static(path.join(__dirname, 'shoosiz')));
// // app.use(express.static(path.join(__dirname,'loginpart')));



// app.get('*', (req, res) => {
//   const myRout = req.path;
//   const routeData = router(myRout); // ارسال مسیر به فایل روتر
//   console.log(routeData)

//     if (myRout.endsWith('.html')) {
//     res.status(404).sendFile(path.join(__dirname, 'shoosiz', 'notfind404.html'));
//         // return res.status(403).send('Access Denied'); // ارسال کد وضعیت 403
//       }

//     if (routeData) {
//       console.log(routeData.id)
//       res.set('X-Scroll-To-ID', routeData.id); // پیام را در یک هدر سفارشی ارسال می‌کنیم
//       res.sendFile(path.join(__dirname, 'shoosiz', routeData.rout)
//       //  , () => {if (routeData.id) {
//       //     console.log('پیام اسکرول برای:', routeData.id);
//       //     // res.set('X-Scroll-To-ID', routeData.id); // پیام را در یک هدر سفارشی ارسال می‌کنیم
//       // }}
//     )
//     } else {
//       res.status(404).sendFile(path.join(__dirname, 'shoosiz', 'notfind404.html'));
//     }
//   });


//   app.listen(PORT, () => {
//     console.log(`سرور در حال اجرا است: http://localhost:${PORT}`);
//   });