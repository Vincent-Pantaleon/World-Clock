const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/app.js', // adjust the entry file based on your project structure
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
