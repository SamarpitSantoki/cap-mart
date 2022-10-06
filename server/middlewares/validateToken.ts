import jwt from "jsonwebtoken";
import User from "../models/UserSchema";

async function validateToken(req: any, res: any, next: any) {
  const auhorizationHeader = req.headers.authorization;
  let result;

  if (!auhorizationHeader) {
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  const options = {
    expiresIn: "24h",
  };

  try {
    let user = await User.findOne({
      accessToken: token,
    });

    if (!user) {
      result = {
        error: true,
        message: "Authorization error",
      };

      return res.status(403).json(result);
    }

    result = jwt.verify(
      token,
      process.env.jwtSecret as string,
      options as jwt.VerifyOptions
    );

    if (!user.email === (result as any).email) {
      result = {
        error: true,
        message: "Invalid token",
      };

      return res.status(401).json(result);
    }

    if (user.isAdmin) (result as any).isadmin = true;

    req.headers = result;

    next();
  } catch (error: any) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        error: true,
        message: "Token expired",
      });
    }

    return res.status(403).json({
      error: true,
      message: "Authentication error",
    });
  }
}

export default validateToken;
