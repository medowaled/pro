export function getJwtSecretKey() {
  const secret = process.env.NEXT_JWT_SECRET;
  if (!secret || secret.length < 10) {
    throw new Error("JWT Secret is missing or too weak");
  }
  return new TextEncoder().encode(secret);
}
