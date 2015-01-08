// Main renderer implementation
// straight port of smallpt js 

import Vec from './Vec.js';
import Ray from './Ray.js';

class Renderer {
	
	constructor(scene) {
		this.scene = scene;
        this.startTime = new Date().getTime();
        this.doneTime = 0;
	}

	clamp(x){ return x<0 ? 0 : x>1 ? 1 : x; }

    toInt(x){ return Math.floor(Math.pow(this.clamp(x),1/2.2)*255+.5); }


	radiance(r, depth) {
		 var isc = {t:0, id:0};                        
                                                     
        if (!this.scene.intersect(r, isc)) return new Vec(0,0,0);   

        var id=isc.id, t=isc.t, obj=this.scene.items[id];      

        var x = Vec.add(r.o,Vec.mud(r.d, t)); 
        var n = Vec.sub(x,obj.p).norm();
        var nl= n.dot(r.d) < 0 ? n : Vec.mud(n,-1);
        var f = obj.c;
        
        var p = f.x>f.y && f.x>f.z ? f.x : f.y>f.z ? f.y : f.z; 

        if (++depth>5) 
        	if (Math.random()<p) 
        		f=Vec.mud(f,(1/p)); 
        	else return obj.e; 
        
        if (obj.refl == 0){                       
            var r1=2*Math.PI*Math.random(), 
            	r2=Math.random(), 
            	r2s=Math.sqrt(r2);
            
            var w=nl, 
            	u=Vec.crs((Math.abs(w.x)>.1 ? new Vec(0,1,0) : new Vec(1,0,0)) ,w).norm();
            var v=Vec.crs(w,u);
            
            var d = Vec.add(Vec.mud(u,Math.cos(r1)*r2s), 
            	Vec.add(Vec.mud(v,Math.sin(r1)*r2s), Vec.mud(w,Math.sqrt(1-r2)))).norm();


            return Vec.add(obj.e, f.mult(this.radiance(new Ray(x,d),depth)));

        } else if (obj.refl == 1) {
            return Vec.add(obj.e, f.mult(this.radiance(new Ray(x,Vec.sub(r.d,Vec.mud(n,2*n.dot(r.d)))),depth)));            
        }
        
        var reflRay = new Ray(x,Vec.sub(r.d,Vec.mud(n,2*n.dot(r.d))));
        var into = n.dot(nl)>0;
        var nc=1, 
        	nt=1.5, 
        	nnt=into?nc/nt:nt/nc, 
        	ddn=r.d.dot(nl), 
        	cos2t;
        
        if ((cos2t=1-nnt*nnt*(1-ddn*ddn))<0)          // Total internal reflection
            return Vec.add(obj.e, f.mult(this.radiance(reflRay,depth)));
        
        var tdir = Vec.sub(Vec.mud(r.d,nnt), Vec.mud(n,(into?1:-1)*(ddn*nnt+Math.sqrt(cos2t)))).norm();
        
        var a=nt-nc;
        var b=nt+nc;
        var R0=a*a/(b*b);
        var c = 1 - (into ? -ddn : tdir.dot(n));
        var Re=R0+(1-R0)*c*c*c*c*c;
        var Tr=1-Re;
        var P=.25+.5*Re;
        var RP=Re/P;
        var TP=Tr/(1-P);
    
        return Vec.add(obj.e, f.mult((depth>2 ? (Math.random()<P ?   // Russian roulette
            Vec.mud(this.radiance(reflRay,depth),RP):Vec.mud(this.radiance(new Ray(x,tdir),depth),TP)) :
            Vec.add(Vec.mud(this.radiance(reflRay,depth),Re),Vec.mud(this.radiance(new Ray(x,tdir),depth),Tr)))));    

    }

	execute() {

		var w = 320;
		var h = 240;

		var samps = 16;

		var cam = new Ray(new Vec(50,52,295.6), new Vec(0,-0.042612,-1).norm());
        var cx = new Vec(w * .5135 / h, 0, 0);
        var cy = Vec.mud(Vec.crs(cx, cam.d).norm(), .5135);
        var r = new Vec(0,0,0);
        var c = new Float32Array(3*w*h);        

        for (var y = 0; y < h; y++) {
        	for (var x=0; x < w; x++) {
        		for (var sy=0, i=(h-y-1)*w+x; sy<2; sy++)  {
        			for (var sx=0; sx<2; sx++, r=new Vec(0,0,0)) { 
        				for (var s=0; s<samps; s++) { 

        					var r1 = 2*Math.random();
        					var dx=r1<1 ? Math.sqrt(r1)-1: 1-Math.sqrt(2-r1);

                            var r2=2*Math.random();
                            var dy=r2<1 ? Math.sqrt(r2)-1: 1-Math.sqrt(2-r2);
                            
                            var d = Vec.add(Vec.mud(cx,( ( (sx+.5 + dx)/2 + x)/w - .5)) ,
                                    Vec.add(Vec.mud(cy,( ( (sy+.5 + dy)/2 + y)/h - .5)), cam.d));
                            
                            r = Vec.add(r, Vec.mud(this.radiance(new Ray(Vec.add(cam.o, Vec.mud(d, 140)), d.norm()), 0),1./samps));
                        }
                        c[3*i]   += this.clamp(r.x)*0.25; 
                        c[3*i+1] += this.clamp(r.y)*0.25; 
                        c[3*i+2] += this.clamp(r.z)*0.25;        			
                    }
        		}
        	}
        }

        postMessage(c);
        this.doneTime =  (new Date().getTime()-this.startTime);
        console.log('complete: ' + this.doneTime + 'ms');
        
	}


}

export default Renderer;