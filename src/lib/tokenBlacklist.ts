// lib/tokenBlacklist.ts
const blacklistedTokens = new Set<string>();

export function blacklistToken(token: string) {
  blacklistedTokens.add(token);
}

export function isTokenBlacklisted(token: string) {
  return blacklistedTokens.has(token);
}
