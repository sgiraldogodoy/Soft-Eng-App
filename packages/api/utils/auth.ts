import { decode, verify } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export async function verifyJwt(token: string) {
  const client = jwksClient({
    jwksUri: "https://dev-x61j30sgxmn7t3u3.us.auth0.com/.well-known/jwks.json",
  });

  const decodedToken = decode(token, { complete: true });

  if (!decodedToken) {
    throw new Error("Key is invalid.");
  }

  const kid = decodedToken.header.kid;

  if (!kid) throw new Error("Couldn't find KID.");

  const signingKey = await client.getSigningKey(kid);
  const verified = verify(token, signingKey.getPublicKey());

  return verified;
}
