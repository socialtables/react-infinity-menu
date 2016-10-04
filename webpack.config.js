module.exports = {
  entry: {
    'example/compiled/index': './example/src/index'
  },

  output: {
    path: '.',
    filename: '[name].js',
    publicPath: '/example/compiled/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional=es7.objectRestSpread'},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
    query: {
      presets: [
        'babel-preset-es2015',
        'babel-preset-react',
        'babel-preset-stage-0',
      ].map(require.resolve),
    }
  }
};
