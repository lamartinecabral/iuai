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
  },
  devtool: "source-map",
  target: ["es5", "web"],
};
