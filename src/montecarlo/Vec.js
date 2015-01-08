// Port of Vector class

class Vec {
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	static add(a,b) {
		return new Vec(a.x+b.x, a.y+b.y, a.z+b.z);
	}

	static sub(a,b) {
		return new Vec(a.x-b.x, a.y-b.y, a.z-b.z);
	}

	static mud(a,b) {
		return new Vec(a.x*b, a.y*b, a.z*b);
	}

	static crs(a,b) {
		return new Vec(a.y*b.z-a.z*b.y, a.z*b.x-a.x*b.z, a.x*b.y-a.y*b.x);
	}

	mult(b) {
		return new Vec(this.x*b.x,this.y*b.y,this.z*b.z);
	}

	norm() {
		var t = this; 
		var il=1/Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z); 
		t.x*=il; 
		t.y*=il; 
		t.z*=il; 
		return t;
	}

	dot(b) {
		return this.x*b.x+this.y*b.y+this.z*b.z;
	}

}

export default Vec;