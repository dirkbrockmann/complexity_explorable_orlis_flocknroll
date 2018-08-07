(function(exports){

// dom elements for widgets (sliders, toggles, buttons and radiobuttons)
// they take widget objects and translate them to svg elements
// that can be added using d3.append(), e.g. select().append(buttonElement)
// the widgets are bound to the svg elements

 
exports.buttonElement = function(d,i){

	var backbox ;
	var hakenschniepel = document.createElementNS("http://www.w3.org/2000/svg", "g");	

	var s = d3.select(hakenschniepel).append("g")
	//	.attr("transform","translate("+(-d.size()/2)+","+(-d.size()/2)+")")
		.attr("class", "button")
		.attr("id", "button_" + d.id())

	if (d.shape()=="rect"){
		backbox = s.append("rect")
			.attr("width",d.size())
			.attr("height",d.size())
			.attr("transform","translate("+(-d.size()/2)+","+(-d.size()/2)+")")
			.attr("rx",5).attr("ry",5)
	} else {
		backbox = s.append("circle")
			.attr("r",d.size()/2)
			//.attr("transform","translate("+d.size()/2+","+d.size()/2+")")
	}
	
	backbox.attr("class","button-background")
		.on("mouseover",function(x){
			d3.select(this).attr("class","button-background-hover")
			d3.select("#button_" + d.id()).select("path")
				.attr("class","button-symbol-hover")
		})
		.on("mouseout",function(){
			d3.select(this).attr("class","button-background")
			d3.select("#button_" + d.id()).select("path")
				.attr("class","button-symbol")
		})
		.on("click",d.click)
	
	s.append("path")
		.attr("d",symbol(d.actions()[d.value()],d.symbolSize()/2))
		.attr("class","button-symbol")
	
	
	if (d.name!=""){
		
			var xpos,ypos,anchor,valign;
		
			if(d.label() == "top") {
				xpos = 0;
				ypos = -d.size()/2-5;
				anchor = "middle";
				valign ="bottom";
			
			}
		
			if(d.label() == "bottom") {
				xpos = 0;
				ypos = d.size()/2+5;
				anchor = "middle";
				valign = "hanging";
			}
		
			if(d.label() == "right") {
				xpos = d.size() / 2 + 5;
				ypos = 0;
				anchor = "start";
				valign ="middle";
			}
		
			if(d.label() == "left") {
				xpos =  - d.size() / 2 - 5;
				ypos = 0;
				anchor = "end";
				valign ="middle";
			}

			s.append("text").text(d.name())
				.attr("class", "tag")
				.style("opacity",1)
				.style("text-anchor",anchor)
				.style("font-size",d.fontSize())
				.style("alignment-baseline",valign)
				.attr("transform", "translate(" + (xpos) + "," + (ypos) + ")")
		
		}
	
	
	return hakenschniepel;
}

exports.toggleElement = function(d,i){
	
	d.X = d3.scaleOrdinal()
		.domain([false,true])
		.range([0, 2*d.size() ])
	
	var hakenschniepel = document.createElementNS("http://www.w3.org/2000/svg", "g");	
	
	var s = d3.select(hakenschniepel)
		.attr("class", "toggle")
		.attr("id", "toggle_" + d.id())

	s.append("line")
		.attr("class", "track")
		.attr("x1", d.X.range()[0]).attr("x2", d.X.range()[1])
		.style("stroke-width", 2*d.size() + 2 * d.border())
	
	s.append("line")
		.attr("id", "inset_" + d.id())
		.attr("class", d.parameter().value ? "track-inset-lit" : "track-inset")
		.attr("x1", d.X.range()[0]).attr("x2", d.X.range()[1])
		.style("stroke-width", 2*d.size())
	
	s.append("line")
		.attr("class", "track-overlay")
		.attr("x1", d.X.range()[0]).attr("x2", d.X.range()[1])
		.style("stroke-width", 2* d.size())
		.on("click",d.click)
		
	s.insert("circle", ".track-overlay")
		.attr("class", "handle")
		.attr("id", "handle_" + d.id())
		.attr("r", d.size())
		.attr("cx", d.X(d.value()));

	if (d.name()!=""){
		
		var xpos,ypos,anchor,valign;
		
		if(d.label() == "top") {
			xpos = d.size();
			ypos = -2*d.size();
			anchor = "middle";
			valign ="middle";
			
		}
		
		if(d.label() == "bottom") {
			xpos = d.size();
			ypos = 2*d.size();
			anchor = "middle";
			valign ="middle";
		}
		
		if(d.label() == "right") {
			xpos = d.size() + 3 * d.size();
			ypos = 0;
			anchor = "start";
			valign ="middle";
		}
		
		if(d.label() == "left") {
			xpos = d.size() -3 * d.size();
			ypos = 0;
			anchor = "end";
			valign ="middle";
		}

		s.append("text").text(d.name())
			.attr("class", "tag")
			.style("opacity",1)
			.style("text-anchor",anchor)
			.style("font-size",d.fontSize())
			.style("alignment-baseline",valign)
			.attr("transform", "translate(" + (xpos) + "," + (ypos) + ")")
		
	}
	

	return hakenschniepel;	
	
	
}

exports.sliderElement = function(d,i) {
	
	var hakenschniepel = document.createElementNS("http://www.w3.org/2000/svg", "g")

	d.X = d3.scaleLinear()
		.domain(d.range())
		.range([0, d.width()]).clamp(true);

	
	var s = d3.select(hakenschniepel)
		.attr("class", "slider")
		.attr("id", "slider_" + d.id())

	s.append("line")
		.attr("class", "track")
		.attr("x1", d.X.range()[0]).attr("x2", d.X.range()[1])
		.style("stroke-width", d.trackSize() + 2 * d.trackBorder())

	s.append("line")
		.attr("class", "track-inset")
		.attr("x1", d.X.range()[0]).attr("x2", d.X.range()[1])
		.style("stroke-width", d.trackSize())

	s.append("line")
		.attr("class", "track-overlay")
		.attr("x1", d.X.range()[0]).attr("x2", d.X.range()[1])
		.style("stroke-width", 2* d.handleSize())
		.call(d3.drag()
			.on("start drag", function() {
				var value = d.X.invert(d3.event.x);
				d3.selectAll("#handle_" + d.id()).attr("cx", d.X(value))
				d.parameter().value = value;
				d.update(d);
			})
		);

	s.insert("circle", ".track-overlay")
		.attr("class", "handle")
		.attr("id", "handle_" + d.id())
		.attr("r", d.handleSize())
		.attr("cx", d.X(d.value()));


	if(d.name()!=""){					
	
		var xpos,ypos,anchor,valign="middle";
		
		ypos = d.label().match(/bottom/i)!=null ? 2 * d.handleSize() : - 2 * d.handleSize();
		xpos = d.label().match(/right/i)!=null ? d.width() : (d.label().match(/center/i)!=null ? d.width() / 2 : 0);
		anchor = d.label().match(/right/i)!=null ? "end" : (d.label().match(/center/i)!=null ? "middle" : "start")
				
		s.append("text").text(d.name())
			.attr("class", "tag")
			.style("text-anchor",anchor)
			.style("alignment-baseline",valign)
			.style("font-size",d.fontSize())
			.style("opacity",1)
			.attr("transform", "translate(" + (xpos) + "," + (ypos) + ")")
	}
	
	return hakenschniepel;
}

exports.radioElement = function(d,i){
	
	var hakenschniepel = document.createElementNS("http://www.w3.org/2000/svg", "g");
	var N = d.choices().length;
	var n = d3.range(N);
	var b = new widget.block([N],d.size(),0,"[]");
	
	var checkbox = d3.select(hakenschniepel).attr("class","radio").attr("id","radio_"+d.id());

	var button = checkbox.selectAll(".radiobutton").data(n).enter().append("g")
		.attr("class","radiobutton")
		.attr("id",function(x,j){return "radiobutton_"+ d.id() + "_" +j})
		.attr("transform",function(x,j){
			return d.alignment()=="vertical" ? "translate(0,"+b.x(j)+")" : "translate("+b.x(j)+",0)";
		})
	
	var background, led;
	
	if (d.shape()=="rect"){
		
		background = button.append("rect")
			.attr("width",d.buttonSize())
			.attr("height",d.buttonSize())
			.attr("rx",2)
			.attr("ry",2)
			.attr("class","radiobutton-background")
			.attr("transform","translate("+(-d.buttonSize()/2)+","+(-d.buttonSize()/2)+")")
		
		led = button.append("rect")
			.attr("width",d.buttonInnerSize())
			.attr("height",d.buttonInnerSize())
			.attr("rx",2)
			.attr("ry",2)
			.attr("class","radiobutton-off")
			.attr("transform","translate("+(-d.buttonInnerSize()/2)+","+(-d.buttonInnerSize()/2)+")")
			.attr("class",function(x,j){return j==d.value() ? "radiobutton-on" : "radiobutton-off"})
	} else {
		
		background = button.append("circle")
			.attr("r",d.buttonSize()/2)	
			.attr("class","radiobutton-background")
		
		led = button.append("circle")
			.attr("r",d.buttonInnerSize()/2)
			.attr("class",function(x,j){return j==d.value() ? "radiobutton-on" : "radiobutton-off"})
		
	}
	
	background
		.on("mouseover",function(x,j){
			d3.select("#radiobutton_"+d.id() + "_" +j).select(".radiobutton-off")
			.attr("class","radiobutton-hover")

		})
		.on("mouseout",function(){
				led.attr("class",function(x,j){return j==d.value() ? "radiobutton-on" : "radiobutton-off"})
		})
		.on("click",function(x,j){
			d.parameter().value=j;
			led.attr("class",function(z,k){return k==d.value() ? "radiobutton-on" : "radiobutton-off"})
			d.update(d);
		})
	
	
	var xpos,ypos,anchor,valign;

	xpos = d.buttonSize();
	ypos = 0;
	anchor = "start";
	valign = "middle";
	
	if(d.label()=="left"){
		xpos = -d.buttonSize();
		ypos = 0;
		anchor = "end";
		valign = "middle";
	}
	
	if(d.label()=="bottom"){
		ypos = d.buttonSize();
		xpos = 0;
		anchor = "middle";
		valign = "hanging";
	}
	
	if(d.label()=="top"){
		ypos = -d.buttonSize();
		xpos = 0;
		anchor = "middle";
		valign = "bottom";
	}
	
	
	button.append("text")
		.attr("class","tag")
		.text(function(x,j){return d.choices()[j]})
		.attr("alignment-baseline",valign)
		.attr("transform","translate("+(xpos)+","+ypos+")")
		.style("font-size",d.fontSize())
		.attr("text-anchor",anchor)
	
	return hakenschniepel;
}

// control element objects

exports.button = function(p){
	
	var parameter = p,
		size = 50,
		symbolSize = 25,
		shape = "round",
		label = "bottom",
		fontSize = 12,
		update = function(x){};

	var that = this;

		this.parameter = getset(parameter);
		this.size = getset(size);
		this.symbolSize = getset(symbolSize);
		this.shape = getset(shape);
		this.fontSize = getset(fontSize);
		this.label = getset(label);
		
		this.name = function() {return  parameter.name};
		this.id = function() {return parameter.id};
		this.value = function() {return parameter.value};
		this.actions = function() {return parameter.actions};
		
		this.update = function(a) { if ("function" === typeof a) {update = a; return this} else { update(a) }}
		
		this.click = function (a){
			parameter.value = (parameter.value + 1) % parameter.actions.length;
			
			d3.select("#button_"+parameter.id).select("class",".button-background")
				.transition().duration(1000).attr("class","button-background-lit")
				.transition().duration(1000).attr("class","button-background")
			
			d3.select("#button_"+parameter.id).selectAll("path")
				.attr("d",symbol(parameter.actions[parameter.value],that.symbolSize()/2))
				.transition().attr("class","button-symbol-lit")
				.transition().attr("class","button-symbol")
			
			that.update(that);
		};
}

exports.toggle = function(p){
	var parameter = p,
		size = 8,
		fontSize = 12,
		border = 0.5,
		label = "top",
		update = function(x){};
		
		var that = this;
		
		this.parameter = getset(parameter);
		this.update = getset(update);
		this.size = getset(size);		
		this.border = getset(border);
		this.label = getset(label);
		this.fontSize = getset(fontSize);		

		this.value = function() {return parameter.value};
		this.name = function() {return  parameter.name};
		this.id = function() {return parameter.id};
		
		this.update = function(a) { if ("function" === typeof a) {update = a; return this} else { update(a) }};
		this.click = function(){
			parameter.value = ! parameter.value;
			d3.selectAll("#handle_" + parameter.id).transition()
				.attr("cx", that.X(parameter.value))
			d3.selectAll("#inset_"+parameter.id)
				.attr("class",parameter.value ?  "track-inset-lit" : "track-inset")
			that.update(that);
		}
}

exports.slider = function(p){
	
	var parameter = p,
		width = 100,
		handleSize = 10,
		trackSize = 6,
	fontSize = 12,
		trackBorder = 0.5,
		label = "top-left", 
		update = function(x){};
	
	var that = this;
	
	this.parameter = getset(parameter);

	this.handleSize = getset(handleSize);
	this.trackSize = getset(trackSize);
	this.trackBorder = getset(trackBorder);
	this.fontSize = getset(fontSize);
	this.label = getset(label);
	this.width = getset(width);
	this.range = function() {return parameter.range};
	this.value = function() {return parameter.value};
	this.name = function() {return  parameter.name};
	this.id = function() {return parameter.id};
	
	this.click = function(x) {
					d3.selectAll("#handle_" + parameter.id).transition().attr("cx", that.X(x))
					parameter.value = x;
					that.update(that);
	}
	
	this.update = function(a) { if ("function" === typeof a) {update = a; return this} else { update(a) }};
}

exports.radio = function (p){
var parameter = p,
	size = 200,
	buttonSize = 20,
	buttonInnerSize = 12,
	fontSize = 12,
	padding = 5,
	alignment = "vertical",
	shape = "rect",
	label = "right",
	update = function(x){};
	var that = this;
	
	this.parameter = getset(parameter);
	this.size = getset(size);
	this.fontSize = getset(fontSize);
	this.buttonSize = getset(buttonSize);
	this.alignment = getset(alignment);
	this.buttonInnerSize = getset(buttonInnerSize);
	this.shape = getset(shape);
	this.padding = getset(padding);
	this.label = getset(label);
		
	this.name = function() {return  parameter.name};
	this.id = function() {return parameter.id};
	this.value = function() {return parameter.value};
	this.choices = function() {return parameter.choices};
	this.click = function(j){
			parameter.value=j;
			d3.select("#radio_"+parameter.id).selectAll(".radiobutton-on").attr("class","radiobutton-off");
			d3.select("#radio_"+parameter.id).selectAll(".radiobutton-off").attr("class",function(z,k){
				return k==j ? "radiobutton-on" : "radiobutton-off"
			});
			that.update(that);
	}	
	
	this.update = function(a) { if ("function" === typeof a) {update = a; return this} else { update(a) }};
}

exports.block = function(blocks,size,gap,t){
	var type;
	var x0;
	var n = blocks.length;
	var N = d3.sum(blocks);
	var white = size - (n-1) * gap;
	var sigma = Array(blocks[0]).fill(0);
	var i = 0;
	while(i++<(n-1)){ sigma = sigma.concat( Array(blocks[i]).fill(i)) }



	if (typeof t === "undefined") {type = "()"} else (type=t);

	switch (type){
		case "()":
//			N += 1;
			x0 = 0.5;
			break;
		case "(]":
			x0 = 1;
			break;
		case "[)":
			x0 = 0;
			break;
		case "[]":
			x0 = 0;
			N -= 1;
			break;
		default:		
				
	}
	
	var dx = white / N;	
	
	this.x = function(n){return  dx * x0 + n * dx + gap * sigma[n]}
}

// helper functions

function getset(arg){
	return function(a) { if ("undefined" === typeof a) {return arg } else {arg = a; return this }};
}

function symbol(type,scale){
	
	if (typeof scale === "undefined") {scale = 100}
	
	switch (type) {
	case "play":
		return function() {
				var p = d3.path();
				p.moveTo(scale * 1, scale * 0);
				p.lineTo(scale * (-0.5), scale * (Math.sqrt(3) / 2))
				p.lineTo(scale * (-0.5), scale * ( - Math.sqrt(3) / 2))
				p.closePath();
	
				return p.toString();
			}	
			break;
	case "back":
		return function() {
				var p = d3.path();
				p.moveTo( - scale * 1, scale * 0);
				p.lineTo(scale * (0.5), scale * (Math.sqrt(3) / 2))
				p.lineTo(scale * (0.5), scale * ( - Math.sqrt(3) / 2))
				p.closePath();

				return p.toString();
			}	
				break;		
	case "pause":
			return function() {
					var g = 1 / 3;
					var p = d3.path();
					var c = 0.9
					p.moveTo(scale * c, scale * c);
					p.lineTo(scale * c, scale * (-c))
					p.lineTo(scale * (c * g), scale * ( - c))
					p.lineTo(scale * (c * g), scale * (  c))
					p.closePath();
		
					p.moveTo(- scale * c, scale * c);
					p.lineTo(- scale * c, scale * (-c))
					p.lineTo(- scale * (c * g), scale * ( - c))
					p.lineTo(- scale * (c * g), scale * (  c))
					p.closePath();
		
	
					return p.toString();
				};
				break;
		case "reload":
			return function() {
		
					var theta = Math.PI/2.5;
					var theta1 = theta / 2;
					var theta0 = 2*Math.PI - theta / 2;
					var width = 0.5;
					var arrow_width = 0.6;
					var arrow_height = 0.6;
		
					var p = d3.path();
		
					p.moveTo(scale * Math.cos (theta0), scale * Math.sin(theta0));
					p.arc(0,0,scale,theta0,theta1,true);
					p.lineTo(scale *(1-width) * Math.cos (theta1), scale *(1-width) * Math.sin (theta1))
					p.arc(0,0,scale * (1-width),theta1,theta0,false);
					p.lineTo(scale * (1 - arrow_width - width / 2 ) * Math.cos(theta0), scale * (1 - arrow_width - width / 2  ) * Math.sin(theta0))
		
					var w0 = [scale *(1 - width / 2) * Math.cos(theta0),scale * (1 - width / 2) * Math.sin(theta0)]
					var z = [scale * arrow_height * Math.cos(theta0+Math.PI / 2), scale * arrow_height * Math.sin(theta0+Math.PI / 2)] 
		
					p.lineTo(w0[0]+z[0], w0[1]+z[1])
					p.lineTo(scale * (1 + arrow_width - width / 2  ) * Math.cos(theta0), scale * (1 + arrow_width - width / 2 ) * Math.sin(theta0))
		
		
		
					p.closePath();
		
	
					return p.toString();
				};
				break;
		case "stop":
				return 	function() {
		var p = d3.path();
		var c = 0.9
		p.moveTo(scale * c, scale * c);
		p.lineTo(scale *(-c), scale * c)
		p.lineTo(scale * (-c), scale * ( - c))
		p.lineTo(scale * (c), scale * ( - c))
		p.closePath();
	
		return p.toString();
	}	;
	break;
	default:
		return function(){
			var p = d3.path();
			p.arc(0,0,scale,0,2*Math.PI,true);
			p.closePath();
			return p.toString();
		};
		
					
	}
}

})(this.widget = {})

