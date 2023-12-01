const {env} = process

export const MONGO_URI = env.MONGO_URI as string
export const MONGO_PORT = env.PORT || 8989