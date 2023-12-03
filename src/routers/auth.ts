import { CreateUser } from "#/@types/user";
import User from "#/models/user";
import { Router } from "express";

const router = Router()

router.post("/create", async (req: CreateUser, res) => {
    const { email, password, name } = req.body
    const user = new User({email, password, name})
    try { 
        await user.save()
        res.json({user})
    } catch(err) {
        console.error(err)
        res.json({error: err})
    }
})

export default router