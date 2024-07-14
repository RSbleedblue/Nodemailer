import nodemailer from 'nodemailer';


const sendConfirmation = async (email, name) => {

    try {

        const password = process.env.MAIL_PASS;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rivansh63@gmail.com',
                pass: password
            }
        });

        let mailOptions = {
            from: 'Rivansh NodeMailer',
            to: email,
            subject: 'Registration Successful',
            text: `Hello ${name},\n\nYou have successfully registered.`
        };

        await transporter.sendMail(mailOptions);
        console.log('Mail sent');
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

export default sendConfirmation;
