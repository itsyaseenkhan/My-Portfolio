// import nodemailer from  "nodemailer";

// export const sendEmail = async(options) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         service: process.env.SMTP_SERVICE,
//         auth:{
//               user: process.env.SMTP_MAIL,
//               pass: process.env.SMTP_PASSWORD,
//         }
//     });
//     const mailOptions = {
//         from : process.env.SMTP_MAIL,
//         to :  options.email,
//         Subject : options.Subject,
//         text:   options.message,
//     }
//    await transporter.sendMail(mailOptions); 

// };



  import { Resend } from "resend";

  const resend = new Resend(process.env.RESEND_API_KEY);

  const sendEmail = async (options) => {
    try {
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>", 
        to: options.email,
        subject: options.subject,
        html: `<p>${options.message}</p>`,
      });
      console.log("✅ Email sent successfully via Resend!");
    } catch (error) {
      console.error("❌ Email sending failed:", error.message);
      throw new Error(error.message);
    }
  };

  export default sendEmail;


