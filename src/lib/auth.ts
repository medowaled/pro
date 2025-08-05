export function getJwtSecretKey() {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret || secret.length < 10) {
    throw new Error("JWT Secret is not set or too short!");
  }
  return new TextEncoder().encode(secret);
}
