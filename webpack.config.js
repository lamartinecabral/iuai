const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
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
    filename: "index.js",
    path: path.resolve(__dirname, "src"),
    library: {
      name: "iuai",
      type: "umd",
    },
    globalObject: "this",
  },
};
