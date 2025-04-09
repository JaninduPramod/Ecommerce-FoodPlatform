import jwt from "jsonwebtoken";
import { userLogin } from "../Models/userModel.mjs";

const SecretKey = "urbanEcommerceSecretKey";

const LoginUser = async (req, res) => {
  try {
    const loginCredentials = req.body;
    const response = await userLogin(loginCredentials);

    if (typeof response === "string") {
      return res.status(200).json({ msg: response });
    }

    const user = response[0];

    const token = jwt.sign(
      {
        userId: user.USER_ID,
        email: user.USER_EMAIL,
        role: user.USER_ROLE,
      },
      SecretKey,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error during login" });
  }
};

export { LoginUser };
