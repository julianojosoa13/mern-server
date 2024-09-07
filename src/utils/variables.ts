const { env } = process as { env: { [key: string]: string } };

export const {
  MONGO_URI,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MAILTRAP_USER,
  MAILTRAP_PASS,
  VERIFICATION_EMAIL,
  PASSWORD_RESET_LINK,
  SIGN_IN_URL,
  JWT_SECRET,
  CLOUD_NAME,
  CLOUD_KEY,
  CLOUD_SECRET,
} = env;
