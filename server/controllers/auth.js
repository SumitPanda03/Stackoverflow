import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import LoginHistory from "../models/loginHistory.js";
import users from "../models/auth.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if (existinguser) {
            return res.status(404).json({ message: "User already Exist." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json("Something went worng...");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if (!existinguser) {
            return res.status(404).json({ message: "User don't Exist." });
        }
        const isPasswordCrt = await bcrypt.compare(
            password,
            existinguser.password
        );
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { email: existinguser.email, id: existinguser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        const browser = req.useragent.browser;
        const os = req.useragent.os;
        const deviceType = req.useragent.isMobile ? "Mobile" : "Desktop";
        const ip = req.ip;

        const loginHistory = new LoginHistory({
            userId: existinguser._id,
            browser,
            os,
            deviceType,
            ip,
        });
        await loginHistory.save();
        res.status(200).json({ result: existinguser, token ,"loginHistory":loginHistory});
    } catch (error) {
        res.status(500).json("Something went worng...");
    }
};
