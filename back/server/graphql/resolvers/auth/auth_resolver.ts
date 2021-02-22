import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authQueries = {
  login: async (_, { email, password }) => {
    const user: any = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User with such email does not exist!");
    }

    console.log("UserPassword", user.password);
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log("password", hashedPassword);


    const isPasswordEuqal = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordEuqal) {
      throw new Error("Password is not correct!");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "cryptoCashKey",
      {
        expiresIn: "1h",
      }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
