import { jwtVerify } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret || secret.length === 0) {
    console.error("❌ JWT secret is not defined in environment variables");
    // Fallback secret for development
    return "fallback-secret-key-for-development-2024";
  }

  return secret;
}

export async function verifyAuth(token: string) {
  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));
    return payload;
  } catch (error) {
    throw error;
  }
}
