/**
 * Loads `.env.development` (and `.env.local`, etc.) before `next dev` runs.
 * Without this, `PORT` in `.env.development` is ignored — Next reads the CLI default (3000) first.
 */
const { loadEnvConfig } = require("@next/env");
const { spawn } = require("child_process");
const path = require("path");

const projectDir = path.join(__dirname, "..");
// `true` = load `.env.development` (not `.env.production`)
loadEnvConfig(projectDir, true);

const nextCli = path.join(projectDir, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextCli, "dev"], {
  stdio: "inherit",
  cwd: projectDir,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
