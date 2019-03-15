const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const roadhog = require('./.roadhogrc');

function fixProducIconPath(less) {
  if (process.env.NODE_ENV === 'production') {
    let { '@icon-url': url } = less;
    const publicPath = roadhog.publicPath;

    if (url && url.length > 0) {
      url = '\'' + publicPath + url.slice(1);
      url = url.replace(/\/\//g, '/');
      less['@icon-url'] = url;
    }
  }
  return less;
}

module.exports = () => {
  const themePath = path.join(__dirname, './src/theme/default.less');
  let less = lessToJs(fs.readFileSync(themePath, 'utf8'));
  less = fixProducIconPath(less);
  console.dir(less);
  return less;
};
