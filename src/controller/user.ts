import { RequestHandler } from "express"

import { CreateUser, ForgetPasswordRequest, ReVerifyEmailRequest, VerifyEmailRequest } from "#/@types/user"

import { generateToken } from "#/utils/helper"
import { sendVerificationMail } from "#/utils/mail"
import { isValidObjectId } from "mongoose"

import User from "#/models/user"
import EmailVerificationToken from "#/models/emailVerificationToken"
import PasswordResetToken from "#/models/passwordResetToken"

import crypto from "crypto"
import { PASSWORD_RESET_LINK } from "#/utils/variables"

export const create: RequestHandler = async (req: CreateUser, res) => {
    const { email, password, name } = req.body
    const user = new User({email, password, name})
    try { 
        await user.save()

        const token = generateToken()

        const verificationToken = await EmailVerificationToken.create({
            owner: user._id.toString(),
            token
        })

        sendVerificationMail(token, {name, email, userId: user._id.toString()})
        
        res.status(201).json({user: {id: user._id, name, email}})
    } catch(err) {
        console.error(err)
        res.json({error: err})
    }
}

export const verifyEmail: RequestHandler = async (req: VerifyEmailRequest, res) => {
    const { token, userId } = req.body
    const verificationToken = await EmailVerificationToken.findOne({
        owner: userId   
    })

    if(!verificationToken) return res.status(403).json({error: "Invalid token"})

    const matched = await verificationToken.compareToken(token)

    if(!matched) return res.status(403).json({error: "Invalid token"})  

    await User.findByIdAndUpdate(userId, {
        verified: true
    })

    await EmailVerificationToken.findByIdAndDelete(verificationToken._id)

    res.json({message: "Your email is now verified"})
}

export const sendReVerificationMail: RequestHandler = async (req: ReVerifyEmailRequest, res) => {
    const { userId } = req.body
    
    if(!isValidObjectId(userId)) res.status(403).json({error: "Invalid request!"})
 
    const user = await User.findById(userId)

    if(!user) return res.status(403).json({error: "Invalid request!"})
    
    await EmailVerificationToken.findOneAndDelete({owner: userId})

    const token = generateToken()
    
    const verificationToken = await EmailVerificationToken.create({
        owner: userId,
        token
    })

    const {name, email} = user

    sendVerificationMail(token, {name, email, userId})

    res.json({message: "Please check your mail!"})
}

export const generateForgetPasswordLink: RequestHandler = async (req: ForgetPasswordRequest, res) => {
    const { email } = req.body
    
    const user = await User.findOne({email})

    if(!user) return res.status(404).json("Account not found!")

    // generate the link
    // https://juliano-josoa.dev/reset-password?token=lmqdfhqler34512155&userId=dfqlmjlsqe2dqr5ae457rae

    const token = crypto.randomBytes(36).toString("hex")

    await PasswordResetToken.create({
        owner: user._id,
        token,
    })

    const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`

    res.json({resetLink})
}