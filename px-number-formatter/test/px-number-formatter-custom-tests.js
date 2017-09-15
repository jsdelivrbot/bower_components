// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {

  suite('px-number-formatter default zero format', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');

    suiteSetup(function() {
      formatter.set('value', 0);
      formatterNoDisplay.set('value', 0);
    });

    test('Check 0 format nodisplay', function() {
      assert.equal(formatterNoDisplay.formattedValue, '0');
    });
    test('Check 0 format', function() {
      assert.equal(formatter.targetElement.textContent, '0');
    });
  });

  suite('px-number-formatter default format', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');
    suiteSetup(function() {
      formatter.set('value', 1000);
      formatterNoDisplay.set('value', 1000);
    });

    test('Check formattedValue nodisplay', function() {
      assert.equal(formatterNoDisplay.formattedValue, '1,000');
    });
     test('Check formattedValue', function() {
      assert.equal(formatter.targetElement.textContent, '1,000');
    });
  });

  suite('px-number-formatter different format', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');
    suiteSetup(function() {
      formatter.set('format', '0.000');
      formatterNoDisplay.set('format', '0.000');
    });

    test('Check formattedValue nodisplay', function() {
      assert.equal(formatterNoDisplay.formattedValue, '1000.000');
    });
    test('Check formattedValue', function() {
      assert.equal(formatter.targetElement.textContent, '1000.000');
    });
  });

  suite('px-number-formatter currency', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');
    suiteSetup(function() {
      formatter.set('currency', true);
      formatterNoDisplay.set('currency', true);
    });

    test('Check formattedValue nodisplay', function() {
      assert.equal(formatterNoDisplay.formattedValue, '$1000.000');
    });
    test('Check formattedValue', function() {
      assert.equal(formatter.targetElement.textContent, '$1000.000');
    });
  });

  suite('px-number-formatter culture', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');
    suiteSetup(function() {
      formatter.set('culture', 'fr-FR');
      formatterNoDisplay.set('culture', 'fr-FR');
    });

    test('Check formattedValue nodisplay', function() {
      assert.equal(formatterNoDisplay.formattedValue, '1000,000€');
    });
    test('Check formattedValue', function() {
      assert.equal(formatter.targetElement.textContent, '1000,000€');
    });
  });

  suite('px-number-formatter NaN state', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');
    suiteSetup(function() {
      formatter.set('currency', false);
      formatter.set('value', null);
      formatterNoDisplay.set('currency', false);
      formatterNoDisplay.set('value', null);
    });

    test('Check formattedValue nodisplay', function() {
      assert.equal(formatterNoDisplay.formattedValue, '');
    });
    test('Check formattedValue', function() {
      assert.equal(formatter.targetElement.textContent, '');
    });
  });

  suite('px-number-formatter different zero format', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');
    suiteSetup(function() {
      formatter.set('zeroFormat', 'N/A');
      formatter.set('value', 0);
      formatterNoDisplay.set('zeroFormat', 'N/A');
      formatterNoDisplay.set('value', 0);
    });

    test('Check formattedValue nodisplay', function() {
      assert.equal(formatterNoDisplay.formattedValue, 'N/A');
    });
    test('Check formattedValue', function() {
      assert.equal(formatter.targetElement.textContent, 'N/A');
    });
  });

  suite('px-number-formatter unformat', function() {
    var formatter = document.getElementById('formatter'),
        formatterNoDisplay = document.getElementById('formatterNoDisplay');
    suiteSetup(function() {
      formatter.set('unformat', '5.000,000');
      formatterNoDisplay.set('unformat', '5.000,000');
    });

    test('Check unformattedValue nodisplay', function() {
      assert.equal(formatterNoDisplay.unformattedValue, 5000);
    });
    test('Check unformattedValue', function() {
      assert.equal(formatter.unformattedValue, 5000);
    });
  });
}
