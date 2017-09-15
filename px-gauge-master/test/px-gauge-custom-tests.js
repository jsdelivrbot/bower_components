// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
    // Place any setup steps like variable declaration and initialization here

    // This is the placeholder suite to place custom tests in
    // Use testCase(options) for a more convenient setup of the test cases
    suite('Custom Automation Tests for px-gauge', function() {
        test('Check initial properties of gauge chart', function(done) {
            var el = Polymer.dom(document).querySelector('px-gauge');
            assert.equal(el.value, 0);
            assert.equal(el.min, 0);
            assert.equal(el.max, 100);
            assert.equal(el.error.join(), [
                [0, 12],
                [79, 100]
            ].join());
            done();
        });

        test('Check text value of px-gauge', function(done) {
            setTimeout(function() {
                var el = Polymer.dom(document).querySelector('px-gauge');
                el.value = 50;
                setTimeout(function() {
                    assert.equal(el.querySelector('.text-value').innerText, 50);
                    done();
                }, 1000);
            }, 500)

        });

        test('Check unit text value of px-gauge', function(done) {
            var el = Polymer.dom(document).querySelector('px-gauge');
            el.unit = 'Kw';
            assert.equal(el.querySelector('.text-unit').innerText, 'Kw');
            done();
        });

        test('Check calculated value of px-gauge', function(done) {
            var el = Polymer.dom(document).querySelector('px-gauge');
            el.min = 0;
            el.max = 10;
            el.value = 5;
            assert.equal(el._calculatedValue, 0.5);
            done();
        });

        test('Check color of gauge bar by red color ranges', function(done) {
            //wait for d3 render svg
            setTimeout(function() {
                var el = Polymer.dom(document).querySelector('px-gauge');
                el.min = 0;
                el.max = 100;
                el.value = 80;
                //wait for animation finished
                setTimeout(function() {
                  var chart = el.querySelector('.chart-filled');
                  if(el.querySelector('.chart-filled').classList) {
                    assert.equal(chart.classList.contains('error'), true);
                    done();
                  } else {
                    var classes = chart.getAttribute('class').split(' ');
                    assert.isAtLeast(classes.indexOf('error'), 0);
                    done();
                  }
                }, 1000)
            }, 500);
        });

        test('Check color changing process', function(done) {
            //wait for d3 render svg
            setTimeout(function() {
                var el = Polymer.dom(document).querySelector('px-gauge');
                el.min = 0;
                el.max = 100;
                el.value = 80;
                var testCases = [
                    {
                        v: 80,
                        c: 'error'
                    },
                    {
                        v: 40,
                        c: 'anomaly'
                    },
                    {
                        v: 70,
                        c: 'abnormal'
                    },
                    {
                        v: 50,
                        c: 'normal'
                    }
                ];
                (function execute(index) {
                    if (index == testCases.length) return done();
                    var testCase = testCases[index];
                    el.value = testCase.v;
                    setTimeout(function() {
                      var chart = el.querySelector('.chart-filled');

                      if(el.querySelector('.chart-filled').classList) {
                        assert.equal(chart.classList.contains(testCase.c), true);
                      } else {
                        var classes = chart.getAttribute('class').split(' ');
                        assert.isAtLeast(classes.indexOf(testCase.c), 0);
                      }

                      execute(++index);
                    }, 1000);
                })(0);
            }, 500);
        });

        test('Check position of Needle', function(done) {
            //wait for d3 render svg
            setTimeout(function() {
                var el = Polymer.dom(document).querySelector('px-gauge');
                el.min = 0;
                el.max = 100;
                el.value = 50;
                //wait for animation finished
                setTimeout(function() {
                    assert.equal(el.querySelector('.needle').transform.animVal.getItem('angle').angle, -90);
                    done();
                }, 1000)
            }, 500);
        });
    });
}
