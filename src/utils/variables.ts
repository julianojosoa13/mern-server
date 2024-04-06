const {env} = process as { env: { [key: string]: string } }

export const { 
    MONGO_URI, 
    PORT, 
    MAILTRAP_USER, 
    MAILTRAP_PASSWORD, 
    VERIFICATION_EMAIL, 
    MAILTRAP_SMTP_HOST, 
    MAILTRAP_SMTP_PORT, 
    RESEND_API_KEY,
    RESEND_SMTP_HOST,
    RESEND_SMTP_PORT,
    RESEND_SMTP_USER,
} = env