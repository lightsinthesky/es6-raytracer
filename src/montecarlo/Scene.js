// Basic Scene, manages collection of Spheres

import Vec from './Vec.js';
import Sphere from './Sphere.js';

class Scene {
	constructor() {
		this.items = [];
		
		this.items.push(new Sphere(100000,  new Vec(100000+1,40.8,81.6), new Vec(0,0,0),   new Vec(.75,.25,.25), 0));
		this.items.push(new Sphere(100000,  new Vec(-100000+99,40.8,81.6), new Vec(0,0,0), new Vec(.25,.25,.75), 0));
		this.items.push(new Sphere(100000,  new Vec(50,40.8,100000), new Vec(0,0,0),       new Vec(.75,.75,.75), 0));
		this.items.push(new Sphere(100000,  new Vec(50,40.8,-100000+170), new Vec(0,0,0),  new Vec(0,0,0), 0));
		this.items.push(new Sphere(100000,  new Vec(50,100000,81.6), new Vec(0,0,0), 		 new Vec(.75,.75,.75), 0));
		this.items.push(new Sphere(100000,  new Vec(50,-100000+81.6,81.6), new Vec(0,0,0), new Vec(.75,.75,.75), 0));
		this.items.push(new Sphere(16.5, new Vec(27,16.5,47), new Vec(0,0,0), 		 new Vec(.99,.99,.99), 1));
		this.items.push(new Sphere(16.5, new Vec(73,16.5,78), new Vec(0,0,0), 		 new Vec(.99,.99,.99), 2));
		this.items.push(new Sphere(600,  new Vec(50,681.6-.27,81.6), new Vec(12,12,12), new Vec(0,0,0), 0));
	}

	intersect(r, isc) {
		var n=this.items.length, d, inf=1e20; isc.t=1e20;

        for(var i=n;i--;) {
        	if((d = this.items[i].intersect(r)) && d < isc.t) { 
        		isc.t=d;
        		isc.id=i;
        	}
        }
        return isc.t < inf;
	}
}

export default Scene;