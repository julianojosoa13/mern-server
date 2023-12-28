import { RequestHandler } from "express"
import nodemailer from 'nodemailer'

import { CreateUser } from "#/@types/user"
import User from "#/models/user"
import { MAILTRAP_PASSWORD, MAILTRAP_USER } from "#/utils/variables"

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

        transport.sendMail({
            to: user.email,
            from: 'auth@myapp.com',
            html: '<h1>12345</h1>'
        })

        res.status(201).json({user})
    } catch(err) {
        console.error(err)
        res.json({error: err})
    }
}