import nodemailer from 'nodemailer'

import path from "path"

import User from "#/models/user"
import EmailVerificationToken from "#/models/emailVerificationToken"

import { MAILTRAP_PASSWORD, MAILTRAP_SMTP_HOST, MAILTRAP_SMTP_PORT, MAILTRAP_USER, RESEND_API_KEY, RESEND_SMTP_HOST, RESEND_SMTP_PORT, RESEND_SMTP_USER, VERIFICATION_EMAIL } from "#/utils/variables"
import { generateTemplate } from "#/mail/template"


interface Profile {
    name: string,
    email: string,
    userId: string,
}

const generateEmailTransporter = () => {
    return nodemailer.createTransport({
        host: MAILTRAP_SMTP_HOST,
        port: MAILTRAP_SMTP_PORT,
        auth: {
          user: MAILTRAP_USER,
          pass: MAILTRAP_PASSWORD,
        }
      });
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
    const transport = generateEmailTransporter()

    const {name, email, userId} = profile


    const verificationToken = await EmailVerificationToken.create({
        owner: userId,
        token
    })

    const welcomeMessage = `Hi ${name}, welcome to Podify! There are so much thing that we do for verified users. Use the given OTP to verify your email. `

    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Verify your account",
        html: generateTemplate({
            title: "Welcome to Podify",
            banner: "cid:welcome",
            btnTitle: token,
            link: "#",
            logo: "cid:logo",
            message: welcomeMessage
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname,  "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "welcome.png",
                path: path.join(__dirname,  "../mail/welcome.png"),
                cid: "welcome"
            }
        ]
    })
}


