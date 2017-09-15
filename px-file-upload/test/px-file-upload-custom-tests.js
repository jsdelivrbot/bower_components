// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-file-upload', function() {
    var uploadEl = Polymer.dom(document).querySelector('#px-file-upload');
    var filelist = {0: {name:'Test.txt',size: 5000,type:"text/plain"}};
    test('Check that fixture  is created', function(done){
      assert.isDefined(uploadEl);
      done();
    });
    test('Check that label button exists', function(done){
      var button = uploadEl.$$('#fileButton');
      assert.isDefined(button);
      done();
    });
    test('Check that fixture has multiple property', function(done){
      var multiple = uploadEl.multiple;
      assert.isTrue(multiple);
      done();
    });
    test('Check that hidden input is really hidden', function(done){
      var input = uploadEl.$$('#fileInput');
      assert.isTrue(input.hidden);
      done();
    });
  });
}
