import { jwtVerify } from 'jose';

export function getJwtSecretKey() {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("JWT secret is not defined.");
  }

  return secret;
}

export async function verifyAuth(token: string) {
  try {
    const secretKey = new TextEncoder().encode(getJwtSecretKey());
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
