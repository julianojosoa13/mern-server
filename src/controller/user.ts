import { RequestHandler } from "express"

import { CreateUser } from "#/@types/user"
import User from "#/models/user"

export const create: RequestHandler = async (req: CreateUser, res) => {
    const { email, password, name } = req.body
    const user = new User({email, password, name})
    try { 
        await user.save()
        res.status(201).json({user})
    } catch(err) {
        console.error(err)
        res.json({error: err})
    }
}