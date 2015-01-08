// Basic sphere class, handles intersection

import Vec from './Vec.js';

class Sphere {

	constructor(radius, position, emission, color, type) {
		this.rad = radius;
		this.p = position;
		this.e = emission;
		this.c = color;
		this.refl = type; // DIFF, SPEC, REFR
	}

	intersect(r) {

		var op = Vec.sub(this.p , r.o); //
        
        var t;
        var eps = 1e-4;
        var b = op.dot(r.d);
        
        var det = b * b - op.dot(op) + this.rad * this.rad;
        
        if (det < 0) {
        	return 0;
        } else { 
        	det = Math.sqrt(det);
        }
        
        return (t=b-det) > eps ? t : ((t=b+det)>eps ? t : 0);
	}
}

export default Sphere;