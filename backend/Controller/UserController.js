import UserModel from "../Models/UserModel.js";
import sendConfirmation from "../utils/sendConfirmationMail.js";

class UserController {
    constructor() {}

    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const data = { name, email, password };
            console.log(data);
            const checkUser = await UserModel.findOne({ email });
            if (checkUser) {
                return res.status(400).json({ message: "Email ID already registered, please use a different one", success: false });
            }
            const user = new UserModel(data);
            await user.save();
            await sendConfirmation(email,name);
            return res.status(201).json({ message: "User successfully created!", data: user, success: true });
        } catch (error) {
            res.status(500).json({ message: "User registration failed", success: false });
        }
    }
}

export default UserController;
