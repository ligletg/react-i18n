var req = require.context('./languages/', true, /\.json.*$/);
var language = navigator.language.split('-')[0];
var exports = {};

req.keys().forEach(function (file) {
  var locale = file.replace('./', '').replace('.json', '');
  exports[locale] = req(file);
});

var i18n = {
  t: (id, cmp) => {
    var ret = exports[language][cmp.constructor.displayName][id];
    ret.defaultMessage += "_translated";
    return ret.defaultMessage;
  },
  locale: language
};

export {i18n};