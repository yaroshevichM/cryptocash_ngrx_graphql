import jwt from "jsonwebtoken";

export const isAuth = ({req}) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return {
      isAuth: false,
    };
  }

  const token = authHeader;

  if (!token || token === "") {
    return {
      isAuth: false,
    };
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "cryptoCashKey");
  } catch (error) {
    return {
      isAuth: false,
    };
  }

  if (!decodedToken) {
    return {
      isAuth: false,
    };
  }
  return {
    isAuth: true,
    userId: decodedToken.userId,
  };
};
