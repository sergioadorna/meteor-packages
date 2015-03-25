var packageName = "Settings (settings.js): ";

Tinytest.add(packageName + '_addCurry() check types and return values', function(test){

  var obj = {foo: 'bar'};
  var curriedGet = _addCurry(obj);
  var defaultValue = 'default value';

  // check that it returns a function
  test.equal(typeof curriedGet, 'function');

  // check that it returns the expected key value
  test.equal(curriedGet(defaultValue, 'foo'), 'bar');

  // check that it returns the default value when the key doesn't exist
  test.equal(curriedGet(defaultValue, 'non-existing-key'), defaultValue);

});

Tinytest.add(packageName + '_addCurry() when generating Settings.get()', function(test){

  Meteor._ensure(Meteor, 'settings', 'test', 'get');
  Meteor.settings.test.get = '1';

  var curriedGet = _addCurry(Meteor.settings);

  // check that curried function and Settings.get method are the same function
  test.equal(curriedGet.toString(), Settings.get.toString());

  // check that curried function and Settings.get method return the same and they are not returning the default value:
  test.equal(curriedGet('default','test','get'), Settings.get('default','test','get'));
  test.notEqual('default', Settings.get('default', 'test', 'get'));

});

Tinytest.add(packageName + '_addCurry() generates Settings.getPublic()', function(test){

  Meteor._ensure(Meteor, 'settings', 'public', 'test' );
  Meteor.settings.public.test = '1';

  var curriedGet = _addCurry(Meteor.settings.public);

  // test that curried function and Settings.getPublic method are the same function:
  test.equal(curriedGet.toString(), Settings.getPublic.toString());

  // test that curried function and Settings.getPublic method return the same and they are not returning the default value:
  test.equal(curriedGet('default', 'test'), Settings.getPublic('default', 'test'));
  test.notEqual('default', Settings.getPublic('default', 'test'));

});

Tinytest.add(packageName + 'Settings.get() when trying to get non-existing key', function (test) {

  var defaultValue = 'This is the default value';
  var settingValue = Settings.get(defaultValue, 'non-existing', 'key');

  // it should return the default value
  test.equal(defaultValue, settingValue);

});


Tinytest.add(packageName + 'Settings.get() check default value when trying to get existing key', function (test) {

  // set the key Meteor.settings.one.foo
  Meteor._ensure(Meteor.settings, 'one', 'foo');
  Meteor.settings.one.foo = 'This is one foo';

  var defaultValue = 'default value';
  var settingValue = Settings.get(defaultValue,'one','foo');

  // it should return the setting value
  test.equal(settingValue, Meteor.settings.one.foo);

});

Tinytest.add(packageName + 'Settings.get() when no arguments provided', function (test) {

  // it should return the initial object
  test.equal(Settings.get(), Meteor.settings);

});

Tinytest.add(packageName + 'Settings.getPublic() when no arguments provided', function(test) {

  // it should return the initial object
  test.equal(Settings.getPublic(), Meteor.settings.public);

});

Tinytest.add(packageName + 'Settings.get() when Meteor.settings.key does not exist', function(test) {

  var currentSettings = Meteor.settings;
  var defaultValue = '';

  // empty the settings object
  Meteor.settings = undefined;

  // check that trying to access undefined keys in the object returns the default value
  test.equal(defaultValue, Settings.get(defaultValue, 'foo','bar'));

  // put back the settings
  Meteor.settings = currentSettings;
});
