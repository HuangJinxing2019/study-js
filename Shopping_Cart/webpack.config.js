const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin"),
  // cleanWebpackPlugin = require('clean-webpack-plugin'),
  webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "./src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]-[hash:6].js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    // watchOptions: {
    //   ignored: /node_modules/,
    // },
    port: 8088,
    host: "localhost",
    hot: true,
  },
  plugins: [
    // new cleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ['dist/js', 'dist/*.html']
    // }),
    // new TerserPlugin(),
    new HtmlWebpackPlugin({
      // minify: {
      //   collapseWhitespace: true, //去除回车和空格
      //   removeComments: true, // 删除注释
      // },
      title: "商品列表",
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
};
