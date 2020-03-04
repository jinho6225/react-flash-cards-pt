const { join } = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: join(__dirname, 'dist'),
    port: 3000,
    stats: 'minimal'
  }
}
