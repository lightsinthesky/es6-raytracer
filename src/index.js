
// Use worker loader to require our worker

var Worker = require("worker-loader!./MonteCarlo.js");
var $ = require('jquery');

// our worker instance
var worker;

// canvas context
var context;

// global w/h for testing
var w = 320;
var h = 240;


// init
(function() {
	console.log('Monte Carlo Renderer v1.0.0');
	var canvas = document.getElementById('viewplane');
	context = canvas.getContext('2d');
	canvas.width = w;
	canvas.height = h;
})();

function clamp(x) { 
	return x<0 ? 0 : x>1 ? 1 : x; 
}

function toInt(x) { 
	return Math.floor(Math.pow(clamp(x),1/2.2)*255+.5); 
}

$("#trace").click(function() {

	// if theres already a worker process, kill it to start fresh
	if (worker) {
		worker.terminate();
	}

	// instantiate new worker process
	worker = new Worker;

	// handle messages from our worker (only one message, done)
	worker.onmessage = function(message) {
		var c = message.data;
		var f=context.getImageData(0,0,w,h);

		// process image data from worker.
        for(var i=0,j=0,k=0; i<w*h; i++) {
               f.data[j++]=toInt(c[k++]); 
               f.data[j++]=toInt(c[k++]); 
               f.data[j++]=toInt(c[k++]); 
               f.data[j++]=255;
        }
        context.putImageData(f,0,0);
	}

	// trigger render start on worker
	worker.postMessage(['start', {}]);

});