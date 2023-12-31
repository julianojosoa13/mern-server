import { Model, ObjectId, Schema, model } from "mongoose";

interface UserDocument {
    name: string;
    email: string;
    password: string;
    verified: boolean;
    avatar?: {url: string; publicId: string}
    tokens: string[];
    favorites: ObjectId[];
    followers: ObjectId[];
    followings: ObjectId[];
}

const userScema =  new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    avatar: {
        type: Object,
        url: String,
        publicId: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Audio"
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    tokens: [String]
}, {timestamps: true})

export default model("User", userScema) as Model<UserDocument>