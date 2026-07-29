import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleAuth = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email, name: name || email.split('@')[0] });
        }
        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token,
            {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        return res.status(200).json({ message: "login successful", token, user });


    } catch (err) {
        console.log(`google login error ${err}`);
       
        return res.status(500).json({ message: "google login error" });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.log(`logout error ${err}`);
        return res.status(500).json({ message: "logout error" });
    }
}

