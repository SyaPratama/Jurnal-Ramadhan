import fs from "node:fs";
import { input, select } from "@inquirer/prompts";
import { hashSync } from "bcrypt";
import path from "node:path";

(async () => {
  const answer = (await input({ message: "Key: " })).toLowerCase();
  const cookie = hashSync(answer, 10);
  const pathEnv = path.join(".env");
  let env = fs.readFileSync(pathEnv, {
    encoding: "utf-8",
  });

  if (env.includes("APP_COOKIE=")) {
    env = env.replace(/^APP_COOKIE=.*$/m, `APP_COOKIE='${cookie}'`);
  } else {
    env += `\nAPP_COOKIE='${cookie}'\n`;
  }
  fs.writeFileSync(pathEnv, env, "utf-8");

  console.info("Cookie berhasil dibuat!");
})();
