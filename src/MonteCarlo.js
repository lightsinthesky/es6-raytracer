// Basic entryway into our renderer


// ES6 imports
import Scene from './montecarlo/Scene.js';
import Renderer from './montecarlo/Renderer.js';

// handle received messages
onmessage = function(_arg) {

	// unused
	var type = _arg.data[0];
	var data = _arg.data[1];

	// instantiate renderer and scene
	var renderer = new Renderer(new Scene());

    // start render process
	renderer.execute();
}
