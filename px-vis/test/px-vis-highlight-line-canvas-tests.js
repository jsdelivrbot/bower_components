document.addEventListener("WebComponentsReady", function() {
  runTests();
});

function runTests() {
  suite('px-vis-highlight-line renders parallel axis highlight', function() {
    var parallelScale = document.getElementById('parallelScale'),
        parallelSVG = document.getElementById('parallelSVG'),
        parallelhighlight = document.getElementById('parallelhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done) {
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y2": 1,
            "y3": 1,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          },{
            "x": 1397160780000,
            "y": 10,
            "y2": 3,
            "y3": 8,
            'cat': 'b'
          },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397219100000,
            "y": 6,
            "y2": 27,
            "y3": 14,
            'cat': 'b'
          }
        ],
        completeSeriesConfig = {
          "x":{
            "type":"line",
            "name":"mySeries",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "a":{
            "type":"line",
            "name":"a",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "b":{
            "type":"line",
            "name":"b",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[1]]
          }
        },
        dim = ['y','y2', 'y3'],
        chartExtents = {"x": ['y','y2','y3'], "y": {'y': [0,10], 'y2':[0,27], 'y3':[0,14] }},
        categories = ['a','b'],
        w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      parallelSVG.set('width',w);
      parallelSVG.set('height',h);
      parallelSVG.set('margin',m);

      parallelScale.set('width',w);
      parallelScale.set('height',h);
      parallelScale.set('margin',m);
      parallelScale.set('completeSeriesConfig',completeSeriesConfig);
      parallelScale.set('chartExtents',chartExtents);
      parallelScale.set('dimensions',dim);
      parallelScale.set('axes',dim);
      parallelScale.set('chartData',d);


      parallelhighlight.set('canvasContext', parallelSVG.canvasContextTop);
      parallelhighlight.set('layersToMask', parallelSVG.canvasContext);
      parallelhighlight.set('dimensions',dim);
      parallelhighlight.set('timeData', 'x');
      parallelhighlight.set('completeSeriesConfig',completeSeriesConfig);
      parallelhighlight.set('seriesId',"x");
      parallelhighlight.set('categoryKey',"cat");
      parallelhighlight.set('categories',categories);
      parallelhighlight.set('chartData',d);

      setTimeout(function() { done(); }, 100);

    });

    test('parallelhighlight fixture is created', function() {
      assert.isTrue(parallelhighlight !== null);
    });

    test('line within parallelhighlight is created', function() {
      assert.isTrue(parallelhighlight.$.myHighlighter !== null);
    });

    test('parallelhighlight highlightData not created', function() {
      assert.isUndefined(parallelhighlight._highlightData);
    });

    test('parallelhighlight base layer is not muted', function() {
      assert.isFalse(parallelSVG.canvasContext.canvas.classList.contains("secondaryDataMask"));
    });

    test('parallelhighlight has transition', function() {
      assert.equal(parallelSVG.canvasContext.canvas.style.transition.slice(0,12), 'opacity 0.2s');
    });

    test('parallelhighlight didnt create defaultEmptyData', function() {
      assert.isNull(parallelhighlight.defaultEmptyData);
    });
  }); //suite


  suite('px-vis-highlight-line draws the highlight', function() {
    var parallelScale = document.getElementById('parallelScale'),
        parallelSVG = document.getElementById('parallelSVG'),
        parallelhighlight = document.getElementById('parallelhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }],
            "timeStamps": [1397160780000]
          };

      parallelhighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer gets masked', function() {
      assert.isTrue(parallelSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('_highlightData is created', function() {
      assert.deepEqual(parallelhighlight._highlightData, [{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }]);
    });
  }); //suite

  suite('px-vis-highlight-line clears the highlight', function() {
    var parallelScale = document.getElementById('parallelScale'),
        parallelSVG = document.getElementById('parallelSVG'),
        parallelhighlight = document.getElementById('parallelhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[],
            "timeStamps": []
          };

      parallelhighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer has transition', function() {
      assert.isFalse(parallelSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('data is empty', function() {
      assert.deepEqual(parallelhighlight._highlightData, []);
    });
  }); //suite









  suite('px-vis-highlight-line renders radar axis highlight', function() {
    var radarScale = document.getElementById('radarScale'),
        radarSVG = document.getElementById('radarSVG'),
        radarhighlight = document.getElementById('radarhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done) {
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y2": 1,
            "y3": 1,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          },{
            "x": 1397160780000,
            "y": 10,
            "y2": 3,
            "y3": 8,
            'cat': 'b'
          },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397219100000,
            "y": 6,
            "y2": 27,
            "y3": 14,
            'cat': 'b'
          }
        ],
        completeSeriesConfig = {
          "x":{
            "type":"line",
            "name":"mySeries",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "a":{
            "type":"line",
            "name":"a",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "b":{
            "type":"line",
            "name":"b",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[1]]
          }
        },
        dim = ['y','y2', 'y3'],
        chartExtents = { "x": ['y','y2','y3'], "y": [0,27] },
        categories = ['a','b'],
        w = 500,
        h = 500,
        min = 480/2,
        offset = [250,250],
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      radarSVG.set('width',w);
      radarSVG.set('height',h);
      radarSVG.set('margin',m);
      radarSVG.set('offset',offset);

      radarScale.set('width',min);
      radarScale.set('margin',m);
      radarScale.set('centerOffset',50);
      radarScale.set('amplitudeKeys',dim);
      radarScale.set('chartExtents',chartExtents);
      radarScale.set('dimensions',dim);
      radarScale.set('axes',dim);
      radarScale.set('chartData',d);

      radarhighlight.set('canvasContext', radarSVG.canvasContextTop);
      radarhighlight.set('layersToMask', radarSVG.canvasContext);
      radarhighlight.set('dimensions',dim);
      radarhighlight.set('timeData', 'x');
      radarhighlight.set('completeSeriesConfig',completeSeriesConfig);
      radarhighlight.set('seriesId',"x");
      radarhighlight.set('chartData',d);

      setTimeout(function() { done(); }, 100);

    });

    test('radarhighlight fixture is created', function() {
      assert.isTrue(radarhighlight !== null);
    });

    test('line within radarhighlight is created', function() {
      assert.isTrue(radarhighlight.$.myHighlighter !== null);
    });

    test('radarhighlight highlightData not created', function() {
      assert.isUndefined(radarhighlight._highlightData);
    });

    test('radarhighlight base layer is not muted', function() {
      assert.isFalse(radarSVG.canvasContext.canvas.classList.contains("secondaryDataMask"));
    });

    test('radarhighlight didnt create defaultEmptyData', function() {
      assert.isNull(radarhighlight.defaultEmptyData);
    });

  }); //suite


  suite('px-vis-highlight-line draws the highlight', function() {
    var radarScale = document.getElementById('radarScale'),
        radarSVG = document.getElementById('radarSVG'),
        radarhighlight = document.getElementById('radarhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
        "rawData":[{
          "x": 1397160780000,
          "y": 10,
          "y2": 3,
          "y3": 8,
          'cat': 'b'
        }],
        "timeStamps": [1397160780000]
      };

      radarhighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer gets masked', function() {
      assert.isTrue(radarSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('_highlightData is created', function() {
      assert.deepEqual(radarhighlight._highlightData, [{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }]);
      });
  }); //suite

  suite('px-vis-highlight-line clears the highlight', function() {
    var radarScale = document.getElementById('radarScale'),
        radarSVG = document.getElementById('radarSVG'),
        radarhighlight = document.getElementById('radarhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[],
            "timeStamps": []
          };

      radarhighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer has transition', function() {
      assert.isFalse(radarSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('data is empty', function() {
      assert.deepEqual(radarhighlight._highlightData, []);
    });
  }); //suite









  suite('px-vis-highlight-line renders different dataset highlight', function() {
    var differentScale = document.getElementById('differentScale'),
        differentSVG = document.getElementById('differentSVG'),
        differenthighlight = document.getElementById('differenthighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done) {
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y2": 1,
            "y3": 1,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          },{
            "x": 1397160780000,
            "y": 10,
            "y2": 3,
            "y3": 8,
            'cat': 'b'
          },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397219100000,
            "y": 6,
            "y2": 27,
            "y3": 14,
            'cat': 'b'
          }
        ],
        completeSeriesConfig = {
          "x":{
            "type":"line",
            "name":"mySeries",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "a":{
            "type":"line",
            "name":"a",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "b":{
            "type":"line",
            "name":"b",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[1]]
          }
        },
        dim = ['y','y2', 'y3'],
        chartExtents = {"x": ['y','y2','y3'], "y": {'y': [0,10], 'y2':[0,27], 'y3':[0,14] }},
        categories = ['a','b'],
        w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      differentSVG.set('width',w);
      differentSVG.set('height',h);
      differentSVG.set('margin',m);

      differentScale.set('width',w);
      differentScale.set('height',h);
      differentScale.set('margin',m);
      differentScale.set('completeSeriesConfig',completeSeriesConfig);
      differentScale.set('chartExtents',chartExtents);
      differentScale.set('dimensions',dim);
      differentScale.set('axes',dim);
      differentScale.set('chartData',d);

      differenthighlight.set('canvasContext', differentSVG.canvasContextTop);
      differenthighlight.set('layersToMask', differentSVG.canvasContext);
      differenthighlight.set('dimensions',dim);
      differenthighlight.set('timeData', 'x');
      differenthighlight.set('completeSeriesConfig',completeSeriesConfig);
      differenthighlight.set('seriesId',"x");
      differenthighlight.set('categoryKey',"cat");
      differenthighlight.set('categories',categories);
      differenthighlight.set('chartData',d);

      setTimeout(function() { done(); }, 100);
    });

    test('differenthighlight fixture is created', function() {
      assert.isTrue(differenthighlight !== null);
    });

    test('line within differenthighlight is created', function() {
      assert.isTrue(differenthighlight.$.myHighlighter !== null);
    });

    test('differenthighlight highlightData not created', function() {
      assert.isUndefined(differenthighlight._highlightData);
    });

    test('differenthighlight base layer is not muted', function() {
      assert.isFalse(differentSVG.canvasContext.canvas.classList.contains("secondaryDataMask"));
    });

    test('differenthighlight has transition', function() {
      assert.equal(differentSVG.canvasContext.canvas.style.transition.slice(0,12), 'opacity 0.2s');
    });

    test('differenthighlight didnt create defaultEmptyData', function() {
      assert.isNull(differenthighlight.defaultEmptyData);
    });
  }); //suite


  suite('px-vis-highlight-line draws the highlight', function() {
    var differentScale = document.getElementById('differentScale'),
        differentSVG = document.getElementById('differentSVG'),
        differenthighlight = document.getElementById('differenthighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[{
              "x": 1397160780000,
              "y": 100,
              "y2": 100,
              "y3": 100,
              'cat': 'b'
            }],
            "timeStamps": [1397160780000]
          };

      differenthighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer gets masked', function() {
      assert.isTrue(differentSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

     test('_highlightData is created', function() {
      assert.deepEqual(differenthighlight._highlightData, [{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }]);
      });
  }); //suite

  suite('px-vis-highlight-line clears the highlight', function() {
    var differentScale = document.getElementById('differentScale'),
        differentSVG = document.getElementById('differentSVG'),
        differenthighlight = document.getElementById('differenthighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[],
            "timeStamps": []
          };

      differenthighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer has transition', function() {
      assert.isFalse(differentSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('data is empty', function() {
      assert.deepEqual(differenthighlight._highlightData, []);
    });
  }); //suite







  suite('px-vis-highlight-line renders fuzz dataset highlight', function() {
    var fuzzScale = document.getElementById('fuzzScale'),
        fuzzSVG = document.getElementById('fuzzSVG'),
        fuzzhighlight = document.getElementById('fuzzhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done) {
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y2": 1,
            "y3": 1,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          },{
            "x": 1397160780000,
            "y": 10,
            "y2": 3,
            "y3": 8,
            'cat': 'b'
          },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397219100000,
            "y": 6,
            "y2": 27,
            "y3": 14,
            'cat': 'b'
          }
        ],
        completeSeriesConfig = {
          "x":{
            "type":"line",
            "name":"mySeries",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "a":{
            "type":"line",
            "name":"a",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "b":{
            "type":"line",
            "name":"b",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[1]]
          }
        },
        dim = ['y','y2', 'y3'],
        chartExtents = {"x": ['y','y2','y3'], "y": {'y': [0,10], 'y2':[0,27], 'y3':[0,14] }},
        categories = ['a','b'],
        w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      fuzzSVG.set('width',w);
      fuzzSVG.set('height',h);
      fuzzSVG.set('margin',m);

      fuzzScale.set('width',w);
      fuzzScale.set('height',h);
      fuzzScale.set('margin',m);
      fuzzScale.set('completeSeriesConfig',completeSeriesConfig);
      fuzzScale.set('chartExtents',chartExtents);
      fuzzScale.set('dimensions',dim);
      fuzzScale.set('axes',dim);
      fuzzScale.set('chartData',d);

      fuzzhighlight.set('canvasContext', fuzzSVG.canvasContextTop);
      fuzzhighlight.set('layersToMask', fuzzSVG.canvasContext);
      fuzzhighlight.set('dimensions',dim);
      fuzzhighlight.set('timeData', 'x');
      fuzzhighlight.set('completeSeriesConfig',completeSeriesConfig);
      fuzzhighlight.set('seriesId',"x");
      fuzzhighlight.set('categoryKey',"cat");
      fuzzhighlight.set('categories',categories);
      fuzzhighlight.set('chartData',d);

      setTimeout(function() { done(); }, 100);
    });

    test('fuzzhighlight fixture is created', function() {
      assert.isTrue(fuzzhighlight !== null);
    });

    test('line within fuzzhighlight is created', function() {
      assert.isTrue(fuzzhighlight.$.myHighlighter !== null);
    });

    test('fuzzhighlight highlightData not created', function() {
      assert.isUndefined(fuzzhighlight._highlightData);
    });

    test('fuzzhighlight base layer is not muted', function() {
      assert.isFalse(fuzzSVG.canvasContext.canvas.classList.contains("secondaryDataMask"));
    });

    test('fuzzhighlight has transition', function() {
      assert.equal(fuzzSVG.canvasContext.canvas.style.transition.slice(0,12), 'opacity 0.2s');
    });

    test('fuzzhighlight didnt create defaultEmptyData', function() {
      assert.isNull(fuzzhighlight.defaultEmptyData);
    });
  }); //suite


  suite('px-vis-highlight-line draws the highlight', function() {
    var fuzzScale = document.getElementById('fuzzScale'),
        fuzzSVG = document.getElementById('fuzzSVG'),
        fuzzhighlight = document.getElementById('fuzzhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[{
              "x": 1397160800000,
              "y": 100,
              "y2": 100,
              "y3": 100,
              'cat': 'b'
            }],
            "timeStamps": [1397160800000]
          };

      fuzzhighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer gets masked', function() {
      assert.isTrue(fuzzSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

     test('_highlightData is created', function() {
      assert.deepEqual(fuzzhighlight._highlightData, [{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          }]);
      });
  }); //suite

  suite('px-vis-highlight-line clears the highlight', function() {
    var fuzzScale = document.getElementById('fuzzScale'),
        fuzzSVG = document.getElementById('fuzzSVG'),
        fuzzhighlight = document.getElementById('fuzzhighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[],
            "timeStamps": []
          };

      fuzzhighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer has transition', function() {
      assert.isFalse(fuzzSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('data is empty', function() {
      assert.deepEqual(fuzzhighlight._highlightData, []);
    });
  }); //suite









  suite('px-vis-highlight-line renders generating crosshair data axis highlight', function() {
    var generatingScale = document.getElementById('generatingScale'),
        generatingSVG = document.getElementById('generatingSVG'),
        generatinghighlight = document.getElementById('generatinghighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done) {
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y2": 1,
            "y3": 1,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          },{
            "x": 1397160780000,
            "y": 10,
            "y2": 3,
            "y3": 8,
            'cat': 'b'
          },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397219100000,
            "y": 6,
            "y2": 27,
            "y3": 14,
            'cat': 'b'
          }
        ],
        completeSeriesConfig = {
          "x":{
            "type":"line",
            "name":"mySeries",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "a":{
            "type":"line",
            "name":"a",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "b":{
            "type":"line",
            "name":"b",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[1]]
          }
        },
        dim = ['y','y2', 'y3'],
        chartExtents = {"x": ['y','y2','y3'], "y": {'y': [0,10], 'y2':[0,27], 'y3':[0,14] }},
        categories = ['a','b'],
        w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      generatingSVG.set('width',w);
      generatingSVG.set('height',h);
      generatingSVG.set('margin',m);

      generatingScale.set('width',w);
      generatingScale.set('height',h);
      generatingScale.set('margin',m);
      generatingScale.set('completeSeriesConfig',completeSeriesConfig);
      generatingScale.set('chartExtents',chartExtents);
      generatingScale.set('dimensions',dim);
      generatingScale.set('axes',dim);
      generatingScale.set('chartData',d);

      generatinghighlight.set('canvasContext', generatingSVG.canvasContextTop);
      generatinghighlight.set('layersToMask', generatingSVG.canvasContext);
      generatinghighlight.set('dimensions',dim);
      generatinghighlight.set('timeData', 'x');
      generatinghighlight.set('completeSeriesConfig',completeSeriesConfig);
      generatinghighlight.set('seriesId',"x");
      generatinghighlight.set('chartData',d);

      setTimeout(function() { done(); }, 100);
    });

    test('generatinghighlight fixture is created', function() {
      assert.isTrue(generatinghighlight !== null);
    });

    test('line within generatinghighlight is created', function() {
      assert.isTrue(generatinghighlight.$.myHighlighter !== null);
    });

    test('generatinghighlight highlightData not created', function() {
      assert.isUndefined(generatinghighlight._highlightData);
    });

    test('generatinghighlight base layer is not muted', function() {
      assert.isFalse(generatingSVG.canvasContext.canvas.classList.contains("secondaryDataMask"));
    });

    test('generatinghighlight has transition', function() {
      assert.equal(generatingSVG.canvasContext.canvas.style.transition.slice(0,12), 'opacity 0.2s');
    });

    test('generatinghighlight didnt create defaultEmptyData', function() {
      assert.isNull(generatinghighlight.defaultEmptyData);
    });
  }); //suite


  suite('px-vis-highlight-line draws the highlight', function() {
    var generatingScale = document.getElementById('generatingScale'),
        generatingSVG = document.getElementById('generatingSVG'),
        generatinghighlight = document.getElementById('generatinghighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }],
            "timeStamps": [1397160780000]
          };

      generatinghighlight.set('generatingCrosshairData',true);
      generatinghighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer gets masked', function() {
      assert.isFalse(generatingSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('generatinghighlight highlightData not created', function() {
      assert.deepEqual(generatinghighlight._highlightData, []);
    });

  }); //suite

  suite('px-vis-highlight-line clears the highlight', function() {
    var generatingScale = document.getElementById('generatingScale'),
        generatingSVG = document.getElementById('generatingSVG'),
        generatinghighlight = document.getElementById('generatinghighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[],
            "timeStamps": []
          };

      generatinghighlight.set("generatingCrosshairData", false);
      generatinghighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer has transition', function() {
      assert.isFalse(generatingSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('data is empty', function() {
      assert.deepEqual(generatinghighlight._highlightData, []);
    });
  }); //suite












  suite('px-vis-highlight-line forces display when generatingCrosshairData', function() {
    var forceScale = document.getElementById('forceScale'),
        forceSVG = document.getElementById('forceSVG'),
        forcehighlight = document.getElementById('forcehighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done) {
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y2": 1,
            "y3": 1,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          },{
            "x": 1397160780000,
            "y": 10,
            "y2": 3,
            "y3": 8,
            'cat': 'b'
          },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397219100000,
            "y": 6,
            "y2": 27,
            "y3": 14,
            'cat': 'b'
          }
        ],
        completeSeriesConfig = {
          "x":{
            "type":"line",
            "name":"mySeries",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "a":{
            "type":"line",
            "name":"a",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "b":{
            "type":"line",
            "name":"b",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[1]]
          }
        },
        dim = ['y','y2', 'y3'],
        chartExtents = {"x": ['y','y2','y3'], "y": {'y': [0,10], 'y2':[0,27], 'y3':[0,14] }},
        categories = ['a','b'],
        w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      forceSVG.set('width',w);
      forceSVG.set('height',h);
      forceSVG.set('margin',m);

      forceScale.set('width',w);
      forceScale.set('height',h);
      forceScale.set('margin',m);
      forceScale.set('completeSeriesConfig',completeSeriesConfig);
      forceScale.set('chartExtents',chartExtents);
      forceScale.set('dimensions',dim);
      forceScale.set('axes',dim);
      forceScale.set('chartData',d);

      forcehighlight.set('canvasContext', forceSVG.canvasContextTop);
      forcehighlight.set('layersToMask', forceSVG.canvasContext);
      forcehighlight.set('dimensions',dim);
      forcehighlight.set('timeData', 'x');
      forcehighlight.set('completeSeriesConfig',completeSeriesConfig);
      forcehighlight.set('seriesId',"x");
      forcehighlight.set('chartData',d);
      forcehighlight.set('drawWithLocalCrosshairData',true);

      setTimeout(function() { done(); }, 100);

    });

    test('forcehighlight fixture is created', function() {
      assert.isTrue(forcehighlight !== null);
    });

    test('line within forcehighlight is created', function() {
      assert.isTrue(forcehighlight.$.myHighlighter !== null);
    });

    test('forcehighlight highlightData not created', function() {
      assert.isUndefined(forcehighlight._highlightData);
    });

    test('forcehighlight base layer is not muted', function() {
      assert.isFalse(forceSVG.canvasContext.canvas.classList.contains("secondaryDataMask"));
    });

    test('forcehighlight has transition', function() {
      assert.equal(forceSVG.canvasContext.canvas.style.transition.slice(0,12), 'opacity 0.2s');
    });

    test('forcehighlight didnt create defaultEmptyData', function() {
      assert.isNull(forcehighlight.defaultEmptyData);
    });
  }); //suite


  suite('px-vis-highlight-line draws the highlight', function() {
    var forceScale = document.getElementById('forceScale'),
        forceSVG = document.getElementById('forceSVG'),
        forcehighlight = document.getElementById('forcehighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }],
            "timeStamps": [1397160780000]
          };

      forcehighlight.setAttribute("generatingCrosshairData", true);
      forcehighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer gets masked', function() {
      assert.isTrue(forceSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('_highlightData is created', function() {
      assert.deepEqual(forcehighlight._highlightData, [{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }]);
    });
  }); //suite

  suite('px-vis-highlight-line clears the highlight', function() {
    var forceScale = document.getElementById('forceScale'),
        forceSVG = document.getElementById('forceSVG'),
        forcehighlight = document.getElementById('forcehighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[],
            "timeStamps": []
          };

      forcehighlight.setAttribute("generatingCrosshairData", false);
      forcehighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer has transition', function() {
      assert.isFalse(forceSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('data is empty', function() {
      assert.deepEqual(forcehighlight._highlightData, []);
    });
  }); //suite












  suite('px-vis-highlight-line creates tooltipData', function() {
    var tooltipScale = document.getElementById('tooltipScale'),
        tooltipSVG = document.getElementById('tooltipSVG'),
        tooltiphighlight = document.getElementById('tooltiphighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done) {
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y2": 1,
            "y3": 1,
            'cat': 'a'
          },{
            "x": 1397131620000,
            "y": 6,
            "y2": 21,
            "y3": 14,
            'cat': 'a'
          },{
            "x": 1397160780000,
            "y": 10,
            "y2": 3,
            "y3": 8,
            'cat': 'b'
          },{
            "x": 1397189940000,
            "y": 4,
            "y2": 10,
            "y3": 12,
            'cat': 'a'
          },{
            "x": 1397219100000,
            "y": 6,
            "y2": 27,
            "y3": 14,
            'cat': 'b'
          }
        ],
        completeSeriesConfig = {
          "x":{
            "type":"line",
            "name":"mySeries",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "a":{
            "type":"line",
            "name":"a",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[0]]
          },
          "b":{
            "type":"line",
            "name":"b",
            "x":['y','y2', 'y3'],
            "y":['y','y2', 'y3'],
            "color": colorSet[colorOrder[1]]
          }
        },
        dim = ['y','y2', 'y3'],
        chartExtents = {"x": ['y','y2','y3'], "y": {'y': [0,10], 'y2':[0,27], 'y3':[0,14] }},
        categories = ['a','b'],
        w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      tooltipSVG.set('width',w);
      tooltipSVG.set('height',h);
      tooltipSVG.set('margin',m);

      tooltipScale.set('width',w);
      tooltipScale.set('height',h);
      tooltipScale.set('margin',m);
      tooltipScale.set('completeSeriesConfig',completeSeriesConfig);
      tooltipScale.set('chartExtents',chartExtents);
      tooltipScale.set('dimensions',dim);
      tooltipScale.set('axes',dim);
      tooltipScale.set('chartData',d);

      tooltiphighlight.set('canvasContext', tooltipSVG.canvasContextTop);
      tooltiphighlight.set('layersToMask', tooltipSVG.canvasContext);
      tooltiphighlight.set('dimensions',dim);
      tooltiphighlight.set('timeData', 'x');
      tooltiphighlight.set('completeSeriesConfig',completeSeriesConfig);
      tooltiphighlight.set('seriesId',"x");
      tooltiphighlight.set('chartData',d);
      tooltiphighlight.set('showTooltipData',true);
      tooltiphighlight.set('margin',m);

      setTimeout(function() { done(); }, 100);

    });

    test('tooltiphighlight fixture is created', function() {
      assert.isTrue(tooltiphighlight !== null);
    });

    test('tooltiphighlight highlightData not created', function() {
      assert.isUndefined(tooltiphighlight._highlightData);
    });

    test('tooltiphighlight didnt create defaultEmptyData', function() {
        assert.isNull(tooltiphighlight.defaultEmptyData);
      });
  }); //suite


  suite('px-vis-highlight-line draws the highlight', function() {
    var tooltipScale = document.getElementById('tooltipScale'),
        tooltipSVG = document.getElementById('tooltipSVG'),
        tooltiphighlight = document.getElementById('tooltiphighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }],
            "timeStamps": [1397160780000]
          };

      tooltiphighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('_highlightData is created', function() {
      assert.deepEqual(tooltiphighlight._highlightData, [{
              "x": 1397160780000,
              "y": 10,
              "y2": 3,
              "y3": 8,
              'cat': 'b'
            }]);
    });

    test('tooltiphighlight created defaultEmptyData', function() {

      assert.equal(tooltiphighlight.defaultEmptyData.mouse, null);
      assert.equal(tooltiphighlight.defaultEmptyData.dataPos[0], 423);
      assert.closeTo(tooltiphighlight.defaultEmptyData.dataPos[1], 2182, 2);
      assert.equal(tooltiphighlight.defaultEmptyData.time, 1397160780000);
      assert.deepEqual(tooltiphighlight.defaultEmptyData.dataset, {"x":1397160780000,"y":10,"y2":3,"y3":8,"cat":"b"});
      assert.deepEqual(tooltiphighlight.defaultEmptyData.series, [{"name":"y","value":{"y":10,"y2":3,"y3":8}},{"name":"y2","value":{"y":10,"y2":3,"y3":8}},{"name":"y3","value":{"y":10,"y2":3,"y3":8}}]);
      assert.equal(tooltiphighlight.defaultEmptyData.color.split(" ").join(""), "rgb(93,165,218)");
      assert.deepEqual(tooltiphighlight.defaultEmptyData.tooltipConfig, {"y":{"color":"rgb(93,165,218)","name":"y","yAxisUnit":"","y":"y"},"y2":{"color":"rgb(93,165,218)","name":"y2","yAxisUnit":"","y":"y2"},"y3":{"color":"rgb(93,165,218)","name":"y3","yAxisUnit":"","y":"y3"}});
    });
  }); //suite

  suite('px-vis-highlight-line clears the highlight', function() {
    var tooltipScale = document.getElementById('tooltipScale'),
        tooltipSVG = document.getElementById('tooltipSVG'),
        tooltiphighlight = document.getElementById('tooltiphighlight');

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;
    var linePath;

    suiteSetup(function(done){
      var d = {
            "rawData":[],
            "timeStamps": []
          };

      tooltiphighlight.set("crosshairData", d);

      setTimeout(function() { done(); }, 100);
    });

    test('datalayer has transition', function() {
      assert.isFalse(tooltipSVG.canvasContext.canvas.classList.contains('secondaryDataMask'));
    });

    test('data is empty', function() {
      assert.deepEqual(tooltiphighlight._highlightData, []);
    });
  }); //suite

}
