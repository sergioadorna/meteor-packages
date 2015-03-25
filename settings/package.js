Package.describe({
  name: 'sergioadorna:settings',
  version: '1.0.0',
  summary: 'Safely access Meteor.settings and provide default value fallback',
  git: 'https://github.com/sergioadorna/meteor-packages/settings',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4.2');
  api.addFiles('settings.js');
  api.export('Settings');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles([
    'settings.js',
    'settings-tests.js'
  ]);
});
