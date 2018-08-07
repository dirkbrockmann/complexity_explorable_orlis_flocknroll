# Orli's Flock & Roll

This complexity explorable is part of the site [Complexity Explorables](http://www.complexity-explorables.org/) and is called
[**Orli's Flock'n Roll**](http://www.complexity-explorables.org/explorables/orlis-flockn-roll/). For More information visit the website.

# Files

## index.html

This file is essentially the header that loads fonts externally and some other stuff:

### CSS

1. `<link rel="stylesheet" type="text/css" href="widget.v2.2.css" />`: the styles for the widget
2. `<link rel="stylesheet" type="text/css" href="styles.css" />`: the styles for the page
3. `<link rel="stylesheet" type="text/css" href="collective-behavior.css" />`: the styles for this particular explorable

### header javascript

1.  `<script type="text/javascript" src="d3.v4.min.js"></script>` : the version of D3js used in this explorable
2.  `<script type="text/javascript" src="widget.v2.2.js"></script>` : the js code for the widgets

### Container

The js code for the explorable (see below) inserts the display and the control boxes into the DOM here:

```
<div class="toolbox">
	<div id="collective_behavior_display" class="toolbox display-panel"></div>
	<div id="collective_behavior_controls" class="toolbox control-panel"></div>
</div>
```

### Explorable Code

Finally the explorable code is loaded here:

```
<script type="text/javascript" src="orlis-collective-behavior.js"></script>
```

and executed

# Installation

1. make a directory
2. add all the files to it
3. launch a local http server from that directory
4. open the directory in a browser

