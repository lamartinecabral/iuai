// @ts-check

const fs = require("fs");
const pkg = require("./package.json");

const build = fs.readFileSync("./iuai.js").toString();

const result = build
  .replace(
    `Object.defineProperty(exports, "__esModule", { value: true });\n`,
    ""
  )
  .replace(`version: "__version__",`, `version: "${pkg.version}",`);

fs.writeFileSync("./iuai.js", `!(function(){\n` + result + `})()\n`);
