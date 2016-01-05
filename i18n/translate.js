var req = require.context('./languages/', true, /\.json.*$/);
var language = navigator.language.split('-')[0];
var exports = {};

req.keys().forEach(function (file) {
  var locale = file.replace('./', '').replace('.json', '');
  exports[locale] = req(file);
});


var t = (str) => {
  if (exports[language][str] !== undefined) {
    return exports[language][str];
  }
  return "_" + str.toUpperCase() + "_";
};
export {t};