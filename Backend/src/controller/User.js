import userModel from "../model/User.js"


export const signup = async (req, res) => {
    const { email, name, password, location } = req.body
    const user = new userModel({
        email,
        name,
        password,
        location
    })
    await user.save()
    if (!user) {
        return res.status(400).json({ message: "User not created" })

    }
    return res.status(200).json({ message: "User created" })

}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findByCredentials(email, password)
        return res.status(200).json({ success: true, message: "User found", data: user })

    } catch (error) {
        return res.status(200).json({ success: false, message: error.message })


    }

}