/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	// Basic entryway into our renderer


	// ES6 imports
	var Scene = _interopRequire(__webpack_require__(1));

	var Renderer = _interopRequire(__webpack_require__(4));

	// handle received messages
	onmessage = function (_arg) {
	  // unused
	  var type = _arg.data[0];
	  var data = _arg.data[1];

	  // instantiate renderer and scene
	  var renderer = new Renderer(new Scene());

	  // start render process
	  renderer.execute();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	// Basic Scene, manages collection of Spheres

	var Vec = _interopRequire(__webpack_require__(2));

	var Sphere = _interopRequire(__webpack_require__(3));

	var Scene = function Scene() {
	  this.items = [];

	  this.items.push(new Sphere(100000, new Vec(100000 + 1, 40.8, 81.6), new Vec(0, 0, 0), new Vec(0.75, 0.25, 0.25), 0));
	  this.items.push(new Sphere(100000, new Vec(-100000 + 99, 40.8, 81.6), new Vec(0, 0, 0), new Vec(0.25, 0.25, 0.75), 0));
	  this.items.push(new Sphere(100000, new Vec(50, 40.8, 100000), new Vec(0, 0, 0), new Vec(0.75, 0.75, 0.75), 0));
	  this.items.push(new Sphere(100000, new Vec(50, 40.8, -100000 + 170), new Vec(0, 0, 0), new Vec(0, 0, 0), 0));
	  this.items.push(new Sphere(100000, new Vec(50, 100000, 81.6), new Vec(0, 0, 0), new Vec(0.75, 0.75, 0.75), 0));
	  this.items.push(new Sphere(100000, new Vec(50, -100000 + 81.6, 81.6), new Vec(0, 0, 0), new Vec(0.75, 0.75, 0.75), 0));
	  this.items.push(new Sphere(16.5, new Vec(27, 16.5, 47), new Vec(0, 0, 0), new Vec(0.99, 0.99, 0.99), 1));
	  this.items.push(new Sphere(16.5, new Vec(73, 16.5, 78), new Vec(0, 0, 0), new Vec(0.99, 0.99, 0.99), 2));
	  this.items.push(new Sphere(600, new Vec(50, 681.6 - 0.27, 81.6), new Vec(12, 12, 12), new Vec(0, 0, 0), 0));
	};

	Scene.prototype.intersect = function (r, isc) {
	  var n = this.items.length,
	      d,
	      inf = 100000000000000000000;isc.t = 100000000000000000000;

	  for (var i = n; i--;) {
	    if ((d = this.items[i].intersect(r)) && d < isc.t) {
	      isc.t = d;
	      isc.id = i;
	    }
	  }
	  return isc.t < inf;
	};

	module.exports = Scene;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// Port of Vector class

	var Vec = function Vec(x, y, z) {
	  this.x = x;
	  this.y = y;
	  this.z = z;
	};

	Vec.add = function (a, b) {
	  return new Vec(a.x + b.x, a.y + b.y, a.z + b.z);
	};

	Vec.sub = function (a, b) {
	  return new Vec(a.x - b.x, a.y - b.y, a.z - b.z);
	};

	Vec.mud = function (a, b) {
	  return new Vec(a.x * b, a.y * b, a.z * b);
	};

	Vec.crs = function (a, b) {
	  return new Vec(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
	};

	Vec.prototype.mult = function (b) {
	  return new Vec(this.x * b.x, this.y * b.y, this.z * b.z);
	};

	Vec.prototype.norm = function () {
	  var t = this;
	  var il = 1 / Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z);
	  t.x *= il;
	  t.y *= il;
	  t.z *= il;
	  return t;
	};

	Vec.prototype.dot = function (b) {
	  return this.x * b.x + this.y * b.y + this.z * b.z;
	};

	module.exports = Vec;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	// Basic sphere class, handles intersection

	var Vec = _interopRequire(__webpack_require__(2));

	var Sphere = function Sphere(radius, position, emission, color, type) {
	  this.rad = radius;
	  this.p = position;
	  this.e = emission;
	  this.c = color;
	  this.refl = type; // DIFF, SPEC, REFR
	};

	Sphere.prototype.intersect = function (r) {
	  var op = Vec.sub(this.p, r.o); //

	  var t;
	  var eps = 0.0001;
	  var b = op.dot(r.d);

	  var det = b * b - op.dot(op) + this.rad * this.rad;

	  if (det < 0) {
	    return 0;
	  } else {
	    det = Math.sqrt(det);
	  }

	  return (t = b - det) > eps ? t : (t = b + det) > eps ? t : 0;
	};

	module.exports = Sphere;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	// Main renderer implementation
	// straight port of smallpt js

	var Vec = _interopRequire(__webpack_require__(2));

	var Ray = _interopRequire(__webpack_require__(5));

	var Renderer = function Renderer(scene) {
	  this.scene = scene;
	  this.startTime = new Date().getTime();
	  this.doneTime = 0;
	};

	Renderer.prototype.clamp = function (x) {
	  return x < 0 ? 0 : x > 1 ? 1 : x;
	};

	Renderer.prototype.toInt = function (x) {
	  return Math.floor(Math.pow(this.clamp(x), 1 / 2.2) * 255 + 0.5);
	};

	Renderer.prototype.radiance = function (r, depth) {
	  var isc = { t: 0, id: 0 };

	  if (!this.scene.intersect(r, isc)) return new Vec(0, 0, 0);

	  var id = isc.id,
	      t = isc.t,
	      obj = this.scene.items[id];

	  var x = Vec.add(r.o, Vec.mud(r.d, t));
	  var n = Vec.sub(x, obj.p).norm();
	  var nl = n.dot(r.d) < 0 ? n : Vec.mud(n, -1);
	  var f = obj.c;

	  var p = f.x > f.y && f.x > f.z ? f.x : f.y > f.z ? f.y : f.z;

	  if (++depth > 5) if (Math.random() < p) f = Vec.mud(f, 1 / p);else return obj.e;

	  if (obj.refl == 0) {
	    var r1 = 2 * Math.PI * Math.random(),
	        r2 = Math.random(),
	        r2s = Math.sqrt(r2);

	    var w = nl,
	        u = Vec.crs(Math.abs(w.x) > 0.1 ? new Vec(0, 1, 0) : new Vec(1, 0, 0), w).norm();
	    var v = Vec.crs(w, u);

	    var d = Vec.add(Vec.mud(u, Math.cos(r1) * r2s), Vec.add(Vec.mud(v, Math.sin(r1) * r2s), Vec.mud(w, Math.sqrt(1 - r2)))).norm();


	    return Vec.add(obj.e, f.mult(this.radiance(new Ray(x, d), depth)));
	  } else if (obj.refl == 1) {
	    return Vec.add(obj.e, f.mult(this.radiance(new Ray(x, Vec.sub(r.d, Vec.mud(n, 2 * n.dot(r.d)))), depth)));
	  }

	  var reflRay = new Ray(x, Vec.sub(r.d, Vec.mud(n, 2 * n.dot(r.d))));
	  var into = n.dot(nl) > 0;
	  var nc = 1,
	      nt = 1.5,
	      nnt = into ? nc / nt : nt / nc,
	      ddn = r.d.dot(nl),
	      cos2t;

	  if ((cos2t = 1 - nnt * nnt * (1 - ddn * ddn)) < 0) // Total internal reflection
	    return Vec.add(obj.e, f.mult(this.radiance(reflRay, depth)));

	  var tdir = Vec.sub(Vec.mud(r.d, nnt), Vec.mud(n, (into ? 1 : -1) * (ddn * nnt + Math.sqrt(cos2t)))).norm();

	  var a = nt - nc;
	  var b = nt + nc;
	  var R0 = a * a / (b * b);
	  var c = 1 - (into ? -ddn : tdir.dot(n));
	  var Re = R0 + (1 - R0) * c * c * c * c * c;
	  var Tr = 1 - Re;
	  var P = 0.25 + 0.5 * Re;
	  var RP = Re / P;
	  var TP = Tr / (1 - P);

	  return Vec.add(obj.e, f.mult(depth > 2 ? Math.random() < P ? // Russian roulette
	  Vec.mud(this.radiance(reflRay, depth), RP) : Vec.mud(this.radiance(new Ray(x, tdir), depth), TP) : Vec.add(Vec.mud(this.radiance(reflRay, depth), Re), Vec.mud(this.radiance(new Ray(x, tdir), depth), Tr))));
	};

	Renderer.prototype.execute = function () {
	  var w = 320;
	  var h = 240;

	  var samps = 16;

	  var cam = new Ray(new Vec(50, 52, 295.6), new Vec(0, -0.042612, -1).norm());
	  var cx = new Vec(w * 0.5135 / h, 0, 0);
	  var cy = Vec.mud(Vec.crs(cx, cam.d).norm(), 0.5135);
	  var r = new Vec(0, 0, 0);
	  var c = new Float32Array(3 * w * h);

	  for (var y = 0; y < h; y++) {
	    for (var x = 0; x < w; x++) {
	      for (var sy = 0,
	          i = (h - y - 1) * w + x; sy < 2; sy++) {
	        for (var sx = 0; sx < 2; sx++, r = new Vec(0, 0, 0)) {
	          for (var s = 0; s < samps; s++) {
	            var r1 = 2 * Math.random();
	            var dx = r1 < 1 ? Math.sqrt(r1) - 1 : 1 - Math.sqrt(2 - r1);

	            var r2 = 2 * Math.random();
	            var dy = r2 < 1 ? Math.sqrt(r2) - 1 : 1 - Math.sqrt(2 - r2);

	            var d = Vec.add(Vec.mud(cx, ((sx + 0.5 + dx) / 2 + x) / w - 0.5), Vec.add(Vec.mud(cy, ((sy + 0.5 + dy) / 2 + y) / h - 0.5), cam.d));

	            r = Vec.add(r, Vec.mud(this.radiance(new Ray(Vec.add(cam.o, Vec.mud(d, 140)), d.norm()), 0), 1 / samps));
	          }
	          c[3 * i] += this.clamp(r.x) * 0.25;
	          c[3 * i + 1] += this.clamp(r.y) * 0.25;
	          c[3 * i + 2] += this.clamp(r.z) * 0.25;
	        }
	      }
	    }
	  }

	  postMessage(c);
	  this.doneTime = new Date().getTime() - this.startTime;
	  console.log("complete: " + this.doneTime + "ms");
	};

	module.exports = Renderer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// Basic Ray Data Class

	var Ray = function Ray(origin, direction) {
	  this.o = origin;
	  this.d = direction;
	};

	module.exports = Ray;

/***/ }
/******/ ])