'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const postcss = [
  require('autoprefixer')({
    browsers: ['last 2 versions', 'ie > 8']
  }),
  require('precss')
]

module.exports = {
  entry: {
    client: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist/assets'),
    filename: '[name].js',
    publicPath: './assets'
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json', '.scss', '.sass'],
    alias: {
      root: path.join(__dirname, '../src'),
      components: path.join(__dirname, '../src/components'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/]
      },
      { //bootstrap requirement
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            } 
          },
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap&indentedSyntax'
          ],
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      inject: true
    }),
    new ExtractTextPlugin('styles.css'),
  ]
}
