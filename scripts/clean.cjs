/**
 * Remove `.next` to fix corrupt dev bundles (MODULE_NOT_FOUND in _document, chunk 404s).
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", ".next");
try {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log("Removed .next");
} catch (e) {
  if (e.code !== "ENOENT") throw e;
  console.log(".next already absent");
}
