import { RequestHandler } from "express"
import nodemailer from 'nodemailer'

import path from "path"

import { CreateUser } from "#/@types/user"
import User from "#/models/user"
import EmailVerificationToken from "#/models/emailVerificationToken"

import { MAILTRAP_PASSWORD, MAILTRAP_USER } from "#/utils/variables"
import { generateToken } from "#/utils/helper"
import { generateTemplate } from "#/mail/template"

export const create: RequestHandler = async (req: CreateUser, res) => {
    const { email, password, name } = req.body
    const user = new User({email, password, name})
    try { 
        await user.save()

        // send verification email
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: MAILTRAP_USER,
              pass: MAILTRAP_PASSWORD,
            }
          });

        const token = generateToken()

        
        const verificationToken = await EmailVerificationToken.create({
            owner: user._id,
            token
        })
        
        const welcomeMessage = `Hi ${name}, welcome to Podify! There are so much thing that we do for verified users. Use the given OTP to verify your email. `

        transport.sendMail({
            to: user.email,
            from: 'josoajuliano@gmail.com',
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

        res.status(201).json({user})
    } catch(err) {
        console.error(err)
        res.json({error: err})
    }
}