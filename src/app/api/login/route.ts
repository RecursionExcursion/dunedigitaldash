import { hashString } from "../../../lib/crypto";
import { setCookie } from "../../../service/cookie-service";
import { createToken } from "../../../service/token-service";
import neonQueries from "../neon";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const res = await neonQueries.getUserByUsername(username);

  //user not found or bad password
  if (!res[0] || (await hashString(password)) !== res[0].password) {
    return new Response(null, {
      status: 404,
    });
  }

  const user = res[0];

  const token = await createToken({
    sub: user.id,
    name: user.username,
    iss: "DuneDigitalDash",
  });

  await setCookie("user-session", token, 60 * 60 * 24 * 7); //7 days

  return new Response(null, {
    status: 200,
  });
}
