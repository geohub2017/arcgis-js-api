// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../../geometry/support/aaBoundingBox","../lib/gl-matrix","../support/ArrayPool","../support/earthUtils","../support/mathUtils","./TerrainConst"],function(r,e,t,a,n,o,i,u){function f(r){h.put(r.vertexAttributes),r.vertexAttributes=null,r.indices=null}function v(r,e,t){for(var a=0;a<t.length;a++){var n=t[a];if(n){var o=n.safeWidth,f=n.width,v=n.pixelData,s=i.clamp(n.dy*(n.y1-e),0,o),c=i.clamp(n.dx*(r-n.x0),0,o),l=Math.floor(s),m=Math.floor(c),I=l*f+m,d=I+f,y=v[I],A=v[d],h=v[I+1],g=v[d+1];if(y+A+h+g<.5*u.ELEVATION_NODATA_VALUE){s-=l,c-=m;var S=y+(h-y)*c;return S+(A+(g-A)*c-S)*s}}}return null}function s(r,e,n,u,f,s,c,m,A){var g=n[0],S=n[1],x=n[2],L=n[3],_=.1*o.earthRadius*(L-S),b=r-1,w=r-1,O=r*r,P=2*b+2*w,k=h.get(5*(O+P)),N=A.geometryInfo.boundingBox;t.empty(N);for(var R=e[2]-e[0],U=e[3]-e[1],B=x-g,V=s[0],X=s[1],G=s[2],D=0;D<=b;D++){var W=D/b,j=g+W*B;p[D]=Math.sin(j),M[D]=Math.cos(j),T[D]=W,E[D]=e[0]+W*R}for(var q=u&&!!(1&c),C=u&&!!(2&c),F=0,z=0;z<=w;z++){var H=z/w,J=i.lerp(S,L,H),K=Math.cos(J),Q=Math.sin(J),Y=void 0;u?(Y=o.earthRadius/2*Math.log((1+Q)/(1-Q)),H=(Y-e[1])/U):Y=180*J/Math.PI;for(var D=0;D<=b;D++){var W=T[D],Z=p[D],$=M[D],rr=o.earthRadius;f&&(rr+=v(E[D],Y,f)||0);var er=$*K*rr,tr=Z*K*rr,ar=Q*rr,nr=er-V,or=tr-X,ir=ar-G;I(nr,or,ir,N);var ur=5*F;k[ur+0]=nr,k[ur+1]=or,k[ur+2]=ir,k[ur+3]=W,k[ur+4]=H;var fr=y(D,z,b,w);if(fr>-1){var vr=5*(O+fr),sr=q&&0===z?-1:C&&z===w?1:0,cr=0===sr?nr:-V,lr=0===sr?or:-X,mr=0===sr?ir:o.earthRadius*sr-G;k[vr+0]=cr,k[vr+1]=lr,k[vr+2]=mr,k[vr+3]=0===sr?d(W,H):W,k[vr+4]=0===sr?_:H,0!==sr&&I(cr,lr,mr,N)}++F}}A.geometryInfo.numVertsPerRow=r,A.geometryInfo.vertexAttributes=k,A.geometryInfo.skirtLength=_,a.vec4d.set4(0,0,1,1,A.geometryInfo.uvOffsetAndScale),l(A.geometryInfo,r,u?c:0,m)}function c(r,e,n,o,i,u,f){var s=e[0],c=e[1],m=e[2]-s,A=e[3]-c,g=u?Math.max(0,(u[0]-e[0])/m):0,S=u?Math.max(0,(u[1]-e[1])/A):0,p=u?Math.min(1,(u[2]-e[0])/m):1,M=u?Math.min(1,(u[3]-e[1])/A):1,T=p>g?1/(p-g):1,E=M>S?1/(M-S):1,x=-g*T,L=-S*E,_=.1*m,b=r-1,w=r-1,O=r*r,P=2*b+2*w,k=h.get(5*(O+P)),N=f.geometryInfo.boundingBox;t.empty(N);for(var R=0,U=0;U<=w;U++){var B=U/w,V=L+B*E,X=c+B*A;u&&(X<u[1]?(X=u[1],V=0):X>u[3]&&(X=u[3],V=1));for(var G=0;G<=b;G++){var D=G/b,W=x+D*T,j=s+D*m;u&&(j<u[0]?(j=u[0],W=0):j>u[2]&&(j=u[2],W=1));var q=n?v(j,X,n)||0:0,C=j-o[0],F=X-o[1],z=q-o[2];I(C,F,z,N),k[5*R]=C,k[5*R+1]=F,k[5*R+2]=z,k[5*R+3]=W,k[5*R+4]=V;var H=y(G,U,b,b);if(H>-1){var J=5*(O+H);k[J]=C,k[J+1]=F,k[J+2]=z,k[J+3]=d(W,V),k[J+4]=_}++R}}f.geometryInfo.numVertsPerRow=r,f.geometryInfo.vertexAttributes=k,f.geometryInfo.skirtLength=_,a.vec4d.set4(g,S,p-g,M-S,f.geometryInfo.uvOffsetAndScale),l(f.geometryInfo,r,0,i)}function l(r,e,t,a){var n=(2&t)>0,o=e+(a?1024:0)+(n?2048:0),i=S[o];i||(i=m(e,n,a),S[o]=i),r.indices=i.values,r.numSurfaceIndices=i.numSurfaceIndices,r.numSkirtIndices=i.numSkirtIndices,r.numWithoutSkirtIndices=r.numSurfaceIndices+(t?6*(e-1)*(a?2:1):0)}function m(r,e,t){var a=r-1,n=r-1,o=r*r,i=2*a+2*n,u=a*n*2*3,f=6*i,v=6*(2*a+n-1);t&&(u*=2,f*=2,v*=2);for(var s,c,l,m,I=o+i>g?new Uint32Array(u+f):new Uint16Array(u+f),d=0,h=0,S=u,p=0,M=0;M<=n;M++){e&&(p=0===M?v:M===n?-v:0),S+=p;for(var T=0;T<=a;T++){var E=y(T,M,a,n);if(E>-1){var x=A(T,M,a,n);0!==x&&(s=d,c=o+E,l=o+(0===T&&1===M?0:E+1),m=d+x,t?(I[S+0]=s,I[S+1]=c,I[S+2]=c,I[S+3]=l,I[S+4]=l,I[S+5]=s,I[S+6]=l,I[S+7]=m,I[S+8]=m,I[S+9]=s,I[S+10]=s,I[S+11]=l,S+=12):(I[S+0]=s,I[S+1]=c,I[S+2]=l,I[S+3]=l,I[S+4]=m,I[S+5]=s,S+=6))}++d,T<a&&M<n&&(s=M*(a+1)+T,c=s+1,l=c+(a+1),m=l-1,t?(I[h+0]=s,I[h+1]=c,I[h+2]=c,I[h+3]=l,I[h+4]=l,I[h+5]=s,I[h+6]=l,I[h+7]=m,I[h+8]=m,I[h+9]=s,I[h+10]=s,I[h+11]=l,h+=12):(I[h+0]=s,I[h+1]=c,I[h+2]=l,I[h+3]=l,I[h+4]=m,I[h+5]=s,h+=6))}S-=p}return{values:I,numSurfaceIndices:u,numSkirtIndices:f}}function I(r,e,t,a){r<a[0]&&(a[0]=r),r>a[3]&&(a[3]=r),e<a[1]&&(a[1]=e),e>a[4]&&(a[4]=e),t<a[2]&&(a[2]=t),t>a[5]&&(a[5]=t)}function d(r,e){var t=e>r?1:0;return 2+4*t+(1-2*t)*(r+e)}function y(r,e,t,a){return 0===e?r:r===t?t+e:e===a?t+a+(t-r):0===r&&e>0?2*t+a+(a-e):-1}function A(r,e,t,a){return 0===e&&r!==t?1:r===t&&e!==a?t+1:e===a&&0!==r?-1:0===r&&0!==e?-(t+1):0}Object.defineProperty(e,"__esModule",{value:!0});var h=new n.ArrayPool(Float32Array);e.releaseGeometry=f,e.elevationSampler=v;var g=65536;e.createSphericalGlobeTile=s,e.createPlanarGlobeTile=c;var S=[],p=new Array(u.MAX_TILE_TESSELATION+1),M=new Array(u.MAX_TILE_TESSELATION+1),T=new Array(u.MAX_TILE_TESSELATION+1),E=new Array(u.MAX_TILE_TESSELATION+1)});