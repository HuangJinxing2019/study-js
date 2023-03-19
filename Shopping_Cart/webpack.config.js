const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "./src/js/index.js"),
    detail: path.resolve(__dirname, "./src/js/detail.js"),
    cart: path.resolve(__dirname, "./src/js/cart.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]-[hash:6].js",
    clean: {
      keep(asset){
        return asset.startsWith('scripts') || asset.startsWith('fonts') || asset.startsWith('css')
      }
    },
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
                plugins: [
                  ['postcss-preset-env', { browsers: 'last 20 versions' }]
                ]
              }
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
        test: /\.tpl$/,
        loader: "ejs-loader",
        options: {
          esModule: false,
        }
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
    ],
  },
  devServer: {
    watchFiles: ['scr/**'],
    port: 8088,
    host: "localhost",
    hot: true,
    static: ['./dist'],
  },
  plugins: [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: false, //去除回车和空格
        removeComments: true, // 删除注释
      },
      title: "商品列表",
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: false, //去除回车和空格
        removeComments: true, // 删除注释
      },
      title: "商品详情",
      filename: "detail.html",
      template: path.resolve(__dirname, "src/detail.html"),
      chunks: ['detail'],
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: false, //去除回车和空格
        removeComments: true, // 删除注释
      },
      title: "购物车",
      filename: "cart.html",
      template: path.resolve(__dirname, "src/cart.html"),
      chunks: ['cart'],
    }),
  ],
};
