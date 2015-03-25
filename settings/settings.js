/**
 * Enable Settings object to access Meteor.settings object
 * safely returns the default value provided when the object
 * is not defined.
 */

/***
 * Initialize Meteor.settings.public in case is not available yet
 */
Meteor._ensure(Meteor, 'settings', 'public');

/***
 * function(defaultValue, a,b,c,d) returns a[b][c][d] value, if a[b] or a[b][c] doesn't exist returns defaultValue
 * @param initialObject
 * @returns {Function}
 * @private
 */
_addCurry = function (initialObject) {

  return function (defaultValue /*, arguments*/) {
    var obj = initialObject;
    // start in 1 to skip first values(0 is defaultValue)
    for (var i = 1; i < arguments.length; i++) {
      if (!obj || !(arguments[i] in obj)) {
        return defaultValue;
      }
      obj = obj[arguments[i]];
    }

    return obj;
  };
};

/***
 * define the Settings object in the global scope
 * @type {{get: Function, getPublic: Function}}
 */
Settings = {
  get: _addCurry(Meteor.settings),
  getPublic: _addCurry(Meteor.settings.public)
};
