import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_BASE_URL;

const createConnection = () => {
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOSTNAME,
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
        },
        logger: true
    });

    return transporter;
}

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    const transporter = createConnection();

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Техническая поддержка" <tech-group@pstu.ru>',
        to: email,
        subject: "Код двухэтапной аутентификации",
        // text: "Hello world?",
        html: `<p>Ваш код двухэтапной аутентификации: ${token}</p>`,
        // headers: { 'x-myheader': 'test header' }
    });

    return info.response;
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    const transporter = createConnection();

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Техническая поддержка" <tech-group@pstu.ru>',
        to: email,
        subject: "Сброс пароля",
        // text: "Hello world?",
        html: `<p>Нажать <a href="${resetLink}">здесь</a> для сброса пароля</p>`,
        // headers: { 'x-myheader': 'test header' }
    });

    return info.response;
}

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    const transporter = createConnection();

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Техническая поддержка" <tech-group@pstu.ru>',
        to: email,
        subject: "Подтверждение элетронной почты",
        // text: "Hello world?",
        html: `<p>Нажать <a href="${confirmLink}">здесь</a> для подтверждения электронной почты</p>`,
        // headers: { 'x-myheader': 'test header' }
    });

    return info.response;
}