const HtmlWebPackPlugin = require ('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase:  './dist'
  },
  entry: [
    "./src/index.js"
  ],
  output: { //NEW
      path: path.join(__dirname, 'dist'),
      filename: "[name].js"
  }, //NEW ends
  plugins: [
    htmlPlugin,
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: { name: '/static/[name].[ext]' }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
