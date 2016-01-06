var req = require.context('./languages/', true, /\.json.*$/);
var language = navigator.language.split('-')[0];
var exports = {};

req.keys().forEach(function (file) {
  var locale = file.replace('./', '').replace('.json', '');
  exports[locale] = req(file);
});

var i18n = {
  t: (str, cmp) => {
    console.log('translating ' + cmp.constructor.displayName + "...");
    if (exports[language][cmp.constructor.displayName] !== undefined
        && exports[language][cmp.constructor.displayName][str] !== undefined) {
      return "+" + exports[language][cmp.constructor.displayName][str] + "+";
    }
    return "_" + str.toUpperCase() + "_"; //fallback
  },
  locale: language
};

export {i18n};