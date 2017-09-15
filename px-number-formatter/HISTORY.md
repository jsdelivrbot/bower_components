v4.0.0
==================
* Major bump to pick up redesigned sub-dependencies

v3.0.5
==================
* change numbro bower to ~ because numbro's 1.10 is a breaking change

v3.0.4
==================
* fixed value check in number-formatter.html to look for 0

v3.0.3
==================
* clarified license and attribution

v3.0.2
==================
* added links to Numbro API in documentation

v3.0.1
==================
* Ensure we format value on attached for px-number-formatter if we have a value already

v3.0.0
==================
* px-number-formatter now assign the formatted value to the element
directly for performance reason. The formatted value is not reflected in formattedValue anymore
* px-number-formatter-no-display still reflects the formatted value in formattedValue

v2.0.4
==================
* fixed gitgnore, wct conf, name in package.json, updated ghp script

v2.0.3
==================
* Fix behavior typo

v2.0.2
==================
* Fix behavior typo

v2.0.1
==================
* Separated behavior into commonProperties a dev migtht wish to set and the formatting methods and observers
* create px-number-formatter-no-display for encapsulation of formatting properties

v2.0.0
==================
* Initial release of px-number-formatter
* Forked and modified from https://github.com/MeTaNoV/numbro-element
* Moved properties and methods into a behavior for app flexibility.
* Removed numbro-element's spans to avoid IE11 .textContent bug with a '-'
