export function getJwtSecretKey() {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("JWT secret is not defined.");
  }

  return new TextEncoder().encode(secret);
}
