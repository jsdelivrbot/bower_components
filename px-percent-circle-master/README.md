# px-percent-circle [![Build Status](https://travis-ci.org/PredixDev/px-percent-circle.svg?branch=master)](https://travis-ci.org/PredixDev/px-percent-circle)
[![px-percent-circle demo](px-percent-circle.png?raw=true)](https://PredixDev.github.io/px-percent-circle/)

## Overview

px-percent-circle is a Predix UI component that provides a very simple donut chart style visualization. Given a value and a maximum value, the donut fills from the vertical position clockwise around the donut.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-percent-circle --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-percent-circle/px-percent-circle.html"/>
```

Finally, use the component in your application:

```
<px-percent-circle value="30" maximum="50"></px-percent-circle>
```

<br />
<hr />

## Documentation

Read the full API and view the demo [here](https://PredixDev.github.io/px-percent-circle/px-percent-circle/).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.




### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/generalelectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-percent-circle/issues) to submit any bugs you might find.
