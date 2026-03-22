const pngToIco = require("png-to-ico");
const fs = require("fs");
const path = require("path");

const pngPath = path.join(__dirname, "..", "public", "favicon.png");
const outputPath = path.join(__dirname, "..", "public", "favicon.ico");

pngToIco(pngPath)
  .then((buf) => {
    fs.writeFileSync(outputPath, buf);
    console.log("Generated public/favicon.ico");
  })
  .catch((err) => {
    console.error("Error generating favicon.ico:", err?.message ?? err);
    process.exit(1);
  });
