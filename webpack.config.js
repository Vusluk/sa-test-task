const path = require('path');

const dev = process.env.NODE_ENV === 'development';

const jsModule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
};

const stylusModule = {
  test: /\.styl$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: {
          localIdentName: dev ? '[folder]__[local]--[hash:base64:5]' : '[hash:base64:5]',
        },
      },
    },
    'stylus-loader',
  ],
};

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-source-map' : false,
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, dev ? 'public' : 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [ jsModule, stylusModule ],
  },
  devServer: {
    contentBase: './public'
  },  
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
