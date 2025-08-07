import jwt from "jsonwebtoken";

export function getJwtSecretKey() {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret || secret.length === 0) {
    console.error("❌ JWT secret is not defined in environment variables");
    // Fallback secret for development
    return "fallback-secret-key-for-development-2024";
  }

  return secret;
}

export function verifyAuth(token: string) {
  return new Promise((resolve, reject) => {
    const secretKey = getJwtSecretKey();
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
