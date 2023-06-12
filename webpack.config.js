const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/iuai.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "iuai.js",
    path: path.resolve(__dirname, ""),
    library: {
      name: "iuai",
      type: "umd",
    },
    globalObject: "this",
  },
};
