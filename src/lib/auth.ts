export function getJwtSecretKey() {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("JWT Secret is not set in environment variables.");
  }
  return new TextEncoder().encode(secret);
}
