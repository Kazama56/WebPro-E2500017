import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true }
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email: email })
    if (!user) {
        throw new Error(" user not found")


    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("password not matched")
    }
    return user

}
// const user
const userModel = mongoose.model("User", userSchema)
export default userModel