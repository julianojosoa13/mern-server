import { Router } from "express";

import { create, generateForgetPasswordLink, sendReVerificationMail, verifyEmail } from "#/controller/user";
import { validate } from "#/middleware/validator";
import { CreateUserSchema, EmailVerificationBody } from "#/utils/validationSchema";

const router = Router()

router.post("/create", validate(CreateUserSchema), create )
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail )
router.post("/re-verify-email", sendReVerificationMail )
router.post("/forget-password", generateForgetPasswordLink )

export default router