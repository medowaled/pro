import { jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
  id: string;
  role: string;
  name: string;
}

export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret) {
    console.warn("JWT_SECRET is not set in environment variables, using default secret");
    return new Uint8Array(Buffer.from('your-secret-key', 'utf-8'));
  }
  return new Uint8Array(Buffer.from(secret, 'utf-8'));
}

export async function verifyAuth(token: string): Promise<UserJwtPayload> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as unknown as UserJwtPayload;
  } catch (err) {
    console.error("Token verification failed:", err); 
    throw new Error("Your token has expired or is invalid.");
  }
}
