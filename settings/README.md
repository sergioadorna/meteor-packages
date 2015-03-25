# Settings Package:
## Description:
Enable Settings object to access Meteor.settings object and safely returns the default value provided when the object is not defined.

## Usage:
ex:
Imagine we want to access a setting located in: Meteor.settings.moduleName.moduleSetting, this is the code we would need:
```Javascript
    var settingValue = Settings.get('fallbackValue','moduleName','moduleSetting');
```
in case the key is not found settingVal will be assigned the value 'fallbackValue'

> Note: remember that from the client side you can only access the settings defined in Meteor.settings.public object

## Settings api:
#### Settings.get(defaultValue, keyA, keyB, ...keyN)
This function tries to access Meteor.settings[keyA][keyB]...[keyN] and returns a defaultValue when
the key is not defined.

#### Settings.getPublic(defaultValue, keyA, keyB, ...keyN)
This function tries to access Meteor.settings.public[keyA][keyB]...[keyN] and returns a defaultValue when
the key is not defined.
