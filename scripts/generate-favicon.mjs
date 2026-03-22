import pngToIco from "png-to-ico";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pngPath = path.join(__dirname, "..", "public", "favicon.png");
const outputPath = path.join(__dirname, "..", "public", "favicon.ico");

async function main() {
  try {
    const buf = await pngToIco(pngPath);
    fs.writeFileSync(outputPath, buf);
    console.log("Generated public/favicon.ico");
  } catch (err) {
    console.error("Error generating favicon.ico:", err?.message ?? err);
    process.exit(1);
  }
}

main();
