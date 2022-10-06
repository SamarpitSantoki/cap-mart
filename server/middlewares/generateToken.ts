import jwt from "jsonwebtoken";

const options = {
  expiresIn: "24h",
};

async function generateJWT(payload: Object) {
  try {
    const token = await jwt.sign(
      payload,
      process.env.jwtSecret as string,
      options
    );
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
}

export default generateJWT;
