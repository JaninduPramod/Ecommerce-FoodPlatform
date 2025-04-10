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

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, SecretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export { LoginUser, verifyToken };
