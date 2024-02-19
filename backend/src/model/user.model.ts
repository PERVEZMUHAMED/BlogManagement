import { Schema, model, Types } from "mongoose";
import { isEmail } from "validator";
import User from "./Interface/user.model.interface";

const userSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, "Please enter userName"]
    },
    email: {
        type: String,
        validate: [isEmail, "please enter valid email Address"],
        required: [true, "please enter email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    personalDetails: {
        gender: String,
        age: Number,
        mobileNo: String
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true });
export default model<User>("users", userSchema);