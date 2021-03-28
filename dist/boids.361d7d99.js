parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Zarc":[function(require,module,exports) {
"use strict";function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var u=n[t];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}function t(e,t,u){return t&&n(e.prototype,t),u&&n(e,u),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vector2=void 0;var u=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;e(this,n),this.x=t,this.y=u}return t(n,null,[{key:"add",value:function(e,t){return new n(e.x+t.x,e.y+t.y)}},{key:"subtract",value:function(e,t){return new n(e.x-t.x,e.y-t.y)}},{key:"mult",value:function(e,t){return new n(e.x*t,e.y*t)}},{key:"limit",value:function(e,t){return n.magnitude(e)>t?n.setMagnitude(e,t):e}},{key:"magnitude",value:function(e){return Math.sqrt(e.x*e.x+e.y*e.y)}},{key:"magnitudeSq",value:function(e){return e.x*e.x+e.y*e.y}},{key:"setMagnitude",value:function(e,t){return n.mult(n.normalize(e),t)}},{key:"normalize",value:function(e){var t=n.magnitude(e);return 0!==t?new n(e.x/t,e.y/t):e}},{key:"copy",value:function(e){return new n(e.x,e.y)}}]),n}();exports.Vector2=u;
},{}],"2/s5":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}function i(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){s=!0,a=t},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw a}}}}function r(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}Object.defineProperty(exports,"__esModule",{value:!0});var a=require("../lib/vector2"),c=document.createElement("canvas"),s=c.getContext("2d");c.width=1e3,c.height=800,document.body.appendChild(c);var l=150,h=4,u=!1,d=10,f=60,y=20,v=40,p=6,g=15,m=10,b=.3,w=.3,V=.3,x=function t(){S(),M(),requestAnimationFrame(t)},M=function(){L.update();var t,e=i(k);try{for(e.s();!(t=e.n()).done;){t.value.update()}}catch(n){e.e(n)}finally{e.f()}},S=function(){s.clearRect(0,0,c.width,c.height),s.fillStyle="#0007";var t,e=i(k);try{for(e.s();!(t=e.n()).done;){var n=t.value;s.fillRect(n.x,n.y,n.w,n.h)}}catch(r){e.e(r)}finally{e.f()}L.render()},I=function(){function e(n,i){t(this,e),this.acceleration=new a.Vector2,this.isSpecial=!1,this.position=n,this.velocity=i}return n(e,[{key:"update",value:function(){var t=this.position;t.x,t.y;this.velocity=a.Vector2.add(this.velocity,this.acceleration),this.velocity=a.Vector2.setMagnitude(this.velocity,Math.min(a.Vector2.magnitude(this.velocity),h)),this.position=a.Vector2.add(this.position,this.velocity),this.position.x<0&&(this.position.x+=c.width),this.position.y<0&&(this.position.y+=c.height),this.position.x>c.width&&(this.position.x-=c.width),this.position.y>c.height&&(this.position.y-=c.height),this.acceleration=new a.Vector2}},{key:"render",value:function(){var t=this.position,e=t.x,n=t.y,i=this.isSpecial,r=1*this.velocity.x+0*this.velocity.y,o=1*this.velocity.y-0*this.velocity.x,c=Math.atan2(o,r);c<0&&(c=2*Math.PI+c);var l=a.Vector2.setMagnitude(this.velocity,y);if(i){s.beginPath(),s.arc(e,n,f,0,2*Math.PI),s.closePath(),s.fillStyle="#d3f1ed77",s.fill();var h=[l];s.strokeStyle="green";for(var u=1;u<=p;u++){var v=Math.PI/180*(u*g),m=Math.cos(v),b=Math.sin(v),w=new a.Vector2(l.x*m-l.y*b,l.x*b+l.y*m);h.push(w);var V=-Math.PI/180*(u*g),x=Math.cos(V),M=Math.sin(V),S=new a.Vector2(l.x*x-l.y*M,l.x*M+l.y*x);h.push(S)}for(var I=0,P=h;I<P.length;I++){var E=P[I],k=j(e+E.x,n+E.y);s.beginPath(),s.moveTo(e,n),s.lineTo(e+E.x,n+E.y),s.closePath(),s.strokeStyle=k?"green":"red",s.stroke()}}s.fillStyle=i?"#ed1b56":"#00a2ff",s.save(),s.translate(e,n),s.rotate(c),s.translate(-e,-n),s.beginPath(),s.moveTo(e+d,n),s.lineTo(e-d,n+d/2),s.lineTo(e-d,n-d/2),s.closePath(),s.fill(),s.restore()}}]),e}(),P=function(){function e(){t(this,e),this.boids=[],this.obstacles=[];for(var n=[],i=0;i<l;++i){var r=new a.Vector2(A(0,c.width),A(0,c.height)),o=a.Vector2.setMagnitude(new a.Vector2(T(-1,1),T(-1,1)),h);n.push(new I(r,o))}this.boids=n}return n(e,[{key:"update",value:function(){var t,e=i(this.boids);try{for(e.s();!(t=e.n()).done;){var n,r=t.value,o=[],c=i(this.boids);try{for(c.s();!(n=c.n()).done;){var s=n.value;if(r!==s){var l=a.Vector2.subtract(s.position,r.position);a.Vector2.magnitudeSq(l)<f*f&&o.push(s)}}}catch(X){c.e(X)}finally{c.f()}if(o.length){var h,u=new a.Vector2,d=i(o);try{for(d.s();!(h=d.n()).done;){var m=h.value;u=a.Vector2.add(m.position,u)}}catch(X){d.e(X)}finally{d.f()}u=a.Vector2.mult(u,1/o.length);var x=a.Vector2.subtract(u,r.position);r.acceleration=a.Vector2.add(r.acceleration,a.Vector2.setMagnitude(x,V));var M,S=i(o);try{for(S.s();!(M=S.n()).done;){var I=M.value,P=a.Vector2.subtract(r.position,I.position),E=a.Vector2.magnitudeSq(P);if(!(E>v*v)){var k=1-E/(v*v);r.acceleration=a.Vector2.add(r.acceleration,a.Vector2.setMagnitude(P,k*b))}}}catch(X){S.e(X)}finally{S.f()}var A,T=new a.Vector2,B=i(o);try{for(B.s();!(A=B.n()).done;){var L=A.value;T=a.Vector2.add(T,L.velocity)}}catch(X){B.e(X)}finally{B.f()}T=a.Vector2.mult(T,1/o.length),r.acceleration=a.Vector2.add(r.acceleration,a.Vector2.setMagnitude(T,w))}var q=r.position,C=q.x,O=q.y,R=a.Vector2.setMagnitude(r.velocity,y),_=j(C+R.x,O+R.y),F=null;if(!_)for(var U=1;U<=p;U++){var $=Math.PI/180*(U*g),z=Math.cos($),D=Math.sin($),G=new a.Vector2(R.x*z-R.y*D,R.x*D+R.y*z);if(j(C+G.x,O+G.y)){F=a.Vector2.subtract(G,r.velocity);break}var H=-Math.PI/180*(U*g),J=Math.cos(H),K=Math.sin(H),N=new a.Vector2(R.x*J-R.y*K,R.x*K+R.y*J);if(j(C+N.x,O+N.y)){F=a.Vector2.subtract(N,r.velocity);break}}F&&(F=a.Vector2.setMagnitude(F,2),r.acceleration=a.Vector2.add(r.acceleration,F))}}catch(X){e.e(X)}finally{e.f()}var Q,W=i(this.boids);try{for(W.s();!(Q=W.n()).done;){Q.value.update()}}catch(X){W.e(X)}finally{W.f()}}},{key:"render",value:function(){var t,e=i(this.boids);try{for(e.s();!(t=e.n()).done;){t.value.render()}}catch(n){e.e(n)}finally{e.f()}}}]),e}(),E=function(){function e(n,i,r,o,a,c){t(this,e),this.x=n,this.y=i,this.w=r,this.h=o,this.dx=a,this.dy=c}return n(e,[{key:"update",value:function(){u&&(this.y+=this.dy,this.x+=this.dx,(this.y<20||this.y+this.h>c.height-20)&&(this.dy*=-1),(this.x<20||this.x+this.w>c.width-20)&&(this.dx*=-1))}}]),e}(),k=[];function A(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t)+t)}function T(t,e){return Math.random()*(e-t)+t}function j(t,e){if(t<m||e<m||t>c.width-m||e>c.height-m)return!1;var n,r=i(k);try{for(r.s();!(n=r.n()).done;){if(B(t,e,n.value))return!1}}catch(o){r.e(o)}finally{r.f()}return!0}function B(t,e,n){if(n instanceof E){var i=n.x-m,r=n.y-m,o=n.x+n.w+m,a=n.y+n.h+m;return!(t<i||e<r||t>o||e>a)}return!1}k.push(new E(40,40,100,300,T(-2,2),T(-2,2))),k.push(new E(250,200,150,150,T(-2,2),T(-2,2))),k.push(new E(450,400,150,150,T(-2,2),T(-2,2))),k.push(new E(750,220,100,150,T(-2,2),T(-2,2))),k.push(new E(650,650,200,100,T(-2,2),T(-2,2))),document.getElementById("separation").addEventListener("input",function(t){b=t.target.value}),document.getElementById("alignment").addEventListener("input",function(t){w=t.target.value}),document.getElementById("cohesion").addEventListener("input",function(t){V=t.target.value}),document.getElementById("obstacles").addEventListener("input",function(t){u=t.target.checked}),document.getElementById("speed").addEventListener("input",function(t){h=t.target.value});var L=new P;x();
},{"../lib/vector2":"Zarc"}]},{},["2/s5"], null)