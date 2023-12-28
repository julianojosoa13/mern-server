const {env} = process as { env: { [key: string]: string } }

export const { MONGO_URI, MONGO_PORT, MAILTRAP_USER, MAILTRAP_PASS } = env