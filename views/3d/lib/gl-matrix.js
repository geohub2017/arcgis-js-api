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

/*
 * Copyright (c) 2012 Brandon Jones, Colin MacKenzie IV
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

define([],function(){var t={};return function(t,r){r(t,!0),r(t,!1)}(t,function(t,r){"use strict";var n={};!function(){if("undefined"!=typeof Float32Array){var t=new Float32Array(1),r=new Int32Array(t.buffer);n.invsqrt=function(n){var e=.5*n;t[0]=n;r[0]=1597463007-(r[0]>>1);var a=t[0];return a*(1.5-e*a*a)}}else n.invsqrt=function(t){return 1/Math.sqrt(t)}}();var e=Array;"undefined"!=typeof Float32Array&&(e=r?Float32Array:Array);var a={};a.create=function(t){var r=new e(3);return t?(r[0]=t[0],r[1]=t[1],r[2]=t[2]):r[0]=r[1]=r[2]=0,r},a.createFrom=function(t,r,n){var a=new e(3);return a[0]=t,a[1]=r,a[2]=n,a},a.set=function(t,r){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r},a.set3=function(t,r,n,e){return e[0]=t,e[1]=r,e[2]=n,e},a.equal=function(t,r){return t===r||Math.abs(t[0]-r[0])<1e-6&&Math.abs(t[1]-r[1])<1e-6&&Math.abs(t[2]-r[2])<1e-6},a.max=function(t,r,n){return n[0]=Math.max(t[0],r[0]),n[1]=Math.max(t[1],r[1]),n[2]=Math.max(t[2],r[2]),n},a.min=function(t,r,n){return n[0]=Math.min(t[0],r[0]),n[1]=Math.min(t[1],r[1]),n[2]=Math.min(t[2],r[2]),n},a.add=function(t,r,n){return n&&t!==n?(n[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n):(t[0]+=r[0],t[1]+=r[1],t[2]+=r[2],t)},a.subtract=function(t,r,n){return n&&t!==n?(n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],n):(t[0]-=r[0],t[1]-=r[1],t[2]-=r[2],t)},a.multiply=function(t,r,n){return n&&t!==n?(n[0]=t[0]*r[0],n[1]=t[1]*r[1],n[2]=t[2]*r[2],n):(t[0]*=r[0],t[1]*=r[1],t[2]*=r[2],t)},a.negate=function(t,r){return r||(r=t),r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r},a.scale=function(t,r,n){return n&&t!==n?(n[0]=t[0]*r,n[1]=t[1]*r,n[2]=t[2]*r,n):(t[0]*=r,t[1]*=r,t[2]*=r,t)},a.normalize=function(t,r){r||(r=t);var n=t[0],e=t[1],a=t[2],u=Math.sqrt(n*n+e*e+a*a);return u?1===u?(r[0]=n,r[1]=e,r[2]=a,r):(u=1/u,r[0]=n*u,r[1]=e*u,r[2]=a*u,r):(r[0]=0,r[1]=0,r[2]=0,r)},a.cross=function(t,r,n){n||(n=t);var e=t[0],a=t[1],u=t[2],i=r[0],o=r[1],c=r[2];return n[0]=a*c-u*o,n[1]=u*i-e*c,n[2]=e*o-a*i,n},a.length=function(t){var r=t[0],n=t[1],e=t[2];return Math.sqrt(r*r+n*n+e*e)},a.length2=function(t){var r=t[0],n=t[1],e=t[2];return r*r+n*n+e*e},a.dot=function(t,r){return t[0]*r[0]+t[1]*r[1]+t[2]*r[2]},a.direction=function(t,r,n){n||(n=t);var e=t[0]-r[0],a=t[1]-r[1],u=t[2]-r[2],i=Math.sqrt(e*e+a*a+u*u);return i?(i=1/i,n[0]=e*i,n[1]=a*i,n[2]=u*i,n):(n[0]=0,n[1]=0,n[2]=0,n)},a.lerp=function(t,r,n,e){return e||(e=t),e[0]=t[0]+n*(r[0]-t[0]),e[1]=t[1]+n*(r[1]-t[1]),e[2]=t[2]+n*(r[2]-t[2]),e},a.dist=function(t,r){var n=r[0]-t[0],e=r[1]-t[1],a=r[2]-t[2];return Math.sqrt(n*n+e*e+a*a)},a.dist2=function(t,r){var n=r[0]-t[0],e=r[1]-t[1],a=r[2]-t[2];return n*n+e*e+a*a};var u=null,i=new e(4);a.unproject=function(t,r,n,e,a){a||(a=t),u||(u=l.create());var o=u,c=i;return c[0]=2*(t[0]-e[0])/e[2]-1,c[1]=2*(t[1]-e[1])/e[3]-1,c[2]=2*t[2]-1,c[3]=1,l.multiply(n,r,o),l.inverse(o)?(l.multiplyVec4(o,c),0===c[3]?null:(a[0]=c[0]/c[3],a[1]=c[1]/c[3],a[2]=c[2]/c[3],a)):null};var o=a.createFrom(1,0,0),c=a.createFrom(0,1,0),f=a.createFrom(0,0,1),s=a.create();a.rotationTo=function(t,r,n){n||(n=m.create());var e=a.dot(t,r),u=s;if(e>=1)m.set(b,n);else if(e<1e-6-1)a.cross(o,t,u),a.length(u)<1e-6&&a.cross(c,t,u),a.length(u)<1e-6&&a.cross(f,t,u),a.normalize(u),m.fromAngleAxis(Math.PI,u,n);else{var i=Math.sqrt(2*(1+e)),v=1/i;a.cross(t,r,u),n[0]=u[0]*v,n[1]=u[1]*v,n[2]=u[2]*v,n[3]=.5*i,m.normalize(n)}return n[3]>1?n[3]=1:n[3]<-1&&(n[3]=-1),n};var v=a.create(),M=a.create();a.project=function(t,r,n,e){e||(e=t),a.direction(r,n,v),a.subtract(t,r,M);var u=a.dot(v,M);a.scale(v,u,e),a.add(e,r,e)},a.str=function(t){return"["+t[0]+", "+t[1]+", "+t[2]+"]"};var h={};h.create=function(t){var r=new e(9);return t?(r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8]):r[0]=r[1]=r[2]=r[3]=r[4]=r[5]=r[6]=r[7]=r[8]=0,r},h.createFrom=function(t,r,n,a,u,i,o,c,f){var s=new e(9);return s[0]=t,s[1]=r,s[2]=n,s[3]=a,s[4]=u,s[5]=i,s[6]=o,s[7]=c,s[8]=f,s},h.add=function(t,r,n){return n||(n=t),n[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n[3]=t[3]+r[3],n[4]=t[4]+r[4],n[5]=t[5]+r[5],n[6]=t[6]+r[6],n[7]=t[7]+r[7],n[8]=t[8]+r[8],n},h.subtract=function(t,r,n){return n||(n=t),n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],n[3]=t[3]-r[3],n[4]=t[4]-r[4],n[5]=t[5]-r[5],n[6]=t[6]-r[6],n[7]=t[7]-r[7],n[8]=t[8]-r[8],n},h.determinant=function(t){var r=t[0],n=t[1],e=t[2],a=t[3],u=t[4],i=t[5],o=t[6],c=t[7],f=t[8];return r*(f*u-i*c)+n*(-f*a+i*o)+e*(c*a-u*o)},h.inverse=function(t,r){var n,e=t[0],a=t[1],u=t[2],i=t[3],o=t[4],c=t[5],f=t[6],s=t[7],v=t[8],M=v*o-c*s,l=-v*i+c*f,m=s*i-o*f,b=e*M+a*l+u*m;return b?(n=1/b,r||(r=h.create()),r[0]=M*n,r[1]=(-v*a+u*s)*n,r[2]=(c*a-u*o)*n,r[3]=l*n,r[4]=(v*e-u*f)*n,r[5]=(-c*e+u*i)*n,r[6]=m*n,r[7]=(-s*e+a*f)*n,r[8]=(o*e-a*i)*n,r):null},h.multiply=function(t,r,n){n||(n=t);var e=t[0],a=t[1],u=t[2],i=t[3],o=t[4],c=t[5],f=t[6],s=t[7],v=t[8],M=r[0],h=r[1],l=r[2],m=r[3],b=r[4],d=r[5],q=r[6],y=r[7],p=r[8];return n[0]=M*e+h*i+l*f,n[1]=M*a+h*o+l*s,n[2]=M*u+h*c+l*v,n[3]=m*e+b*i+d*f,n[4]=m*a+b*o+d*s,n[5]=m*u+b*c+d*v,n[6]=q*e+y*i+p*f,n[7]=q*a+y*o+p*s,n[8]=q*u+y*c+p*v,n},h.multiplyVec2=function(t,r,n){n||(n=r);var e=r[0],a=r[1];return n[0]=e*t[0]+a*t[3]+t[6],n[1]=e*t[1]+a*t[4]+t[7],n},h.multiplyVec3=function(t,r,n){n||(n=r);var e=r[0],a=r[1],u=r[2];return n[0]=e*t[0]+a*t[3]+u*t[6],n[1]=e*t[1]+a*t[4]+u*t[7],n[2]=e*t[2]+a*t[5]+u*t[8],n},h.set=function(t,r){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r},h.equal=function(t,r){return t===r||Math.abs(t[0]-r[0])<1e-6&&Math.abs(t[1]-r[1])<1e-6&&Math.abs(t[2]-r[2])<1e-6&&Math.abs(t[3]-r[3])<1e-6&&Math.abs(t[4]-r[4])<1e-6&&Math.abs(t[5]-r[5])<1e-6&&Math.abs(t[6]-r[6])<1e-6&&Math.abs(t[7]-r[7])<1e-6&&Math.abs(t[8]-r[8])<1e-6},h.identity=function(t){return t||(t=h.create()),t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},h.transpose=function(t,r){if(!r||t===r){var n=t[1],e=t[2],a=t[5];return t[1]=t[3],t[2]=t[6],t[3]=n,t[5]=t[7],t[6]=e,t[7]=a,t}return r[0]=t[0],r[1]=t[3],r[2]=t[6],r[3]=t[1],r[4]=t[4],r[5]=t[7],r[6]=t[2],r[7]=t[5],r[8]=t[8],r},h.toMat4=function(t,r){return r||(r=l.create()),r[15]=1,r[14]=0,r[13]=0,r[12]=0,r[11]=0,r[10]=t[8],r[9]=t[7],r[8]=t[6],r[7]=0,r[6]=t[5],r[5]=t[4],r[4]=t[3],r[3]=0,r[2]=t[2],r[1]=t[1],r[0]=t[0],r},h.str=function(t){return"["+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+"]"};var l={};l.create=function(t){var r=new e(16);return 4===arguments.length?(r[0]=arguments[0],r[1]=arguments[1],r[2]=arguments[2],r[3]=arguments[3],r[4]=arguments[4],r[5]=arguments[5],r[6]=arguments[6],r[7]=arguments[7],r[8]=arguments[8],r[9]=arguments[9],r[10]=arguments[10],r[11]=arguments[11],r[12]=arguments[12],r[13]=arguments[13],r[14]=arguments[14],r[15]=arguments[15]):t&&(r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15]),r},l.createFrom=function(t,r,n,a,u,i,o,c,f,s,v,M,h,l,m,b){var d=new e(16);return d[0]=t,d[1]=r,d[2]=n,d[3]=a,d[4]=u,d[5]=i,d[6]=o,d[7]=c,d[8]=f,d[9]=s,d[10]=v,d[11]=M,d[12]=h,d[13]=l,d[14]=m,d[15]=b,d},l.createFromMatrixRowMajor=function(t){var r=new e(16);return r[0]=t[0],r[4]=t[1],r[8]=t[2],r[12]=t[3],r[1]=t[4],r[5]=t[5],r[9]=t[6],r[13]=t[7],r[2]=t[8],r[6]=t[9],r[10]=t[10],r[14]=t[11],r[3]=t[12],r[7]=t[13],r[11]=t[14],r[15]=t[15],r},l.createFromMatrix=function(t){var r=new e(16);return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15],r},l.set=function(t,r){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15],r},l.setRowMajor=function(t,r){return r[0]=t[0],r[4]=t[1],r[8]=t[2],r[12]=t[3],r[1]=t[4],r[5]=t[5],r[9]=t[6],r[13]=t[7],r[2]=t[8],r[6]=t[9],r[10]=t[10],r[14]=t[11],r[3]=t[12],r[7]=t[13],r[11]=t[14],r[15]=t[15],r},l.equal=function(t,r){return t===r||Math.abs(t[0]-r[0])<1e-6&&Math.abs(t[1]-r[1])<1e-6&&Math.abs(t[2]-r[2])<1e-6&&Math.abs(t[3]-r[3])<1e-6&&Math.abs(t[4]-r[4])<1e-6&&Math.abs(t[5]-r[5])<1e-6&&Math.abs(t[6]-r[6])<1e-6&&Math.abs(t[7]-r[7])<1e-6&&Math.abs(t[8]-r[8])<1e-6&&Math.abs(t[9]-r[9])<1e-6&&Math.abs(t[10]-r[10])<1e-6&&Math.abs(t[11]-r[11])<1e-6&&Math.abs(t[12]-r[12])<1e-6&&Math.abs(t[13]-r[13])<1e-6&&Math.abs(t[14]-r[14])<1e-6&&Math.abs(t[15]-r[15])<1e-6},l.identity=function(t){return t||(t=l.create()),t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},l.transpose=function(t,r){if(!r||t===r){var n=t[1],e=t[2],a=t[3],u=t[6],i=t[7],o=t[11];return t[1]=t[4],t[2]=t[8],t[3]=t[12],t[4]=n,t[6]=t[9],t[7]=t[13],t[8]=e,t[9]=u,t[11]=t[14],t[12]=a,t[13]=i,t[14]=o,t}return r[0]=t[0],r[1]=t[4],r[2]=t[8],r[3]=t[12],r[4]=t[1],r[5]=t[5],r[6]=t[9],r[7]=t[13],r[8]=t[2],r[9]=t[6],r[10]=t[10],r[11]=t[14],r[12]=t[3],r[13]=t[7],r[14]=t[11],r[15]=t[15],r},l.determinant=function(t){var r=t[0],n=t[1],e=t[2],a=t[3],u=t[4],i=t[5],o=t[6],c=t[7],f=t[8],s=t[9],v=t[10],M=t[11],h=t[12],l=t[13],m=t[14],b=t[15];return h*s*o*a-f*l*o*a-h*i*v*a+u*l*v*a+f*i*m*a-u*s*m*a-h*s*e*c+f*l*e*c+h*n*v*c-r*l*v*c-f*n*m*c+r*s*m*c+h*i*e*M-u*l*e*M-h*n*o*M+r*l*o*M+u*n*m*M-r*i*m*M-f*i*e*b+u*s*e*b+f*n*o*b-r*s*o*b-u*n*v*b+r*i*v*b},l.inverse=function(t,r){r||(r=t);var n,e=t[0],a=t[1],u=t[2],i=t[3],o=t[4],c=t[5],f=t[6],s=t[7],v=t[8],M=t[9],h=t[10],l=t[11],m=t[12],b=t[13],d=t[14],q=t[15],y=e*c-a*o,p=e*f-u*o,w=e*s-i*o,x=a*f-u*c,g=a*s-i*c,F=u*s-i*f,A=v*b-M*m,R=v*d-h*m,V=v*q-l*m,j=M*d-h*b,z=M*q-l*b,I=h*q-l*d,N=y*I-p*z+w*j+x*V-g*R+F*A;return N?(n=1/N,r[0]=(c*I-f*z+s*j)*n,r[1]=(-a*I+u*z-i*j)*n,r[2]=(b*F-d*g+q*x)*n,r[3]=(-M*F+h*g-l*x)*n,r[4]=(-o*I+f*V-s*R)*n,r[5]=(e*I-u*V+i*R)*n,r[6]=(-m*F+d*w-q*p)*n,r[7]=(v*F-h*w+l*p)*n,r[8]=(o*z-c*V+s*A)*n,r[9]=(-e*z+a*V-i*A)*n,r[10]=(m*g-b*w+q*y)*n,r[11]=(-v*g+M*w-l*y)*n,r[12]=(-o*j+c*R-f*A)*n,r[13]=(e*j-a*R+u*A)*n,r[14]=(-m*x+b*p-d*y)*n,r[15]=(v*x-M*p+h*y)*n,r):null},l.toRotationMat=function(t,r){return r||(r=l.create()),r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},l.toMat3=function(t,r){return r||(r=h.create()),r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[4],r[4]=t[5],r[5]=t[6],r[6]=t[8],r[7]=t[9],r[8]=t[10],r},l.toInverseMat3=function(t,r){var n,e=t[0],a=t[1],u=t[2],i=t[4],o=t[5],c=t[6],f=t[8],s=t[9],v=t[10],M=v*o-c*s,l=-v*i+c*f,m=s*i-o*f,b=e*M+a*l+u*m;return b?(n=1/b,r||(r=h.create()),r[0]=M*n,r[1]=(-v*a+u*s)*n,r[2]=(c*a-u*o)*n,r[3]=l*n,r[4]=(v*e-u*f)*n,r[5]=(-c*e+u*i)*n,r[6]=m*n,r[7]=(-s*e+a*f)*n,r[8]=(o*e-a*i)*n,r):null},l.multiply=function(t,r,n){n||(n=t);var e=t[0],a=t[1],u=t[2],i=t[3],o=t[4],c=t[5],f=t[6],s=t[7],v=t[8],M=t[9],h=t[10],l=t[11],m=t[12],b=t[13],d=t[14],q=t[15],y=r[0],p=r[1],w=r[2],x=r[3];return n[0]=y*e+p*o+w*v+x*m,n[1]=y*a+p*c+w*M+x*b,n[2]=y*u+p*f+w*h+x*d,n[3]=y*i+p*s+w*l+x*q,y=r[4],p=r[5],w=r[6],x=r[7],n[4]=y*e+p*o+w*v+x*m,n[5]=y*a+p*c+w*M+x*b,n[6]=y*u+p*f+w*h+x*d,n[7]=y*i+p*s+w*l+x*q,y=r[8],p=r[9],w=r[10],x=r[11],n[8]=y*e+p*o+w*v+x*m,n[9]=y*a+p*c+w*M+x*b,n[10]=y*u+p*f+w*h+x*d,n[11]=y*i+p*s+w*l+x*q,y=r[12],p=r[13],w=r[14],x=r[15],n[12]=y*e+p*o+w*v+x*m,n[13]=y*a+p*c+w*M+x*b,n[14]=y*u+p*f+w*h+x*d,n[15]=y*i+p*s+w*l+x*q,n},l.multiplyVec3=function(t,r,n){n||(n=r);var e=r[0],a=r[1],u=r[2];return n[0]=t[0]*e+t[4]*a+t[8]*u+t[12],n[1]=t[1]*e+t[5]*a+t[9]*u+t[13],n[2]=t[2]*e+t[6]*a+t[10]*u+t[14],n},l.multiplyVec4=function(t,r,n){n||(n=r);var e=r[0],a=r[1],u=r[2],i=r[3];return n[0]=t[0]*e+t[4]*a+t[8]*u+t[12]*i,n[1]=t[1]*e+t[5]*a+t[9]*u+t[13]*i,n[2]=t[2]*e+t[6]*a+t[10]*u+t[14]*i,n[3]=t[3]*e+t[7]*a+t[11]*u+t[15]*i,n},l.translate=function(t,r,n){var e,a,u,i,o,c,f,s,v,M,h,l,m=r[0],b=r[1],d=r[2];return n&&t!==n?(e=t[0],a=t[1],u=t[2],i=t[3],o=t[4],c=t[5],f=t[6],s=t[7],v=t[8],M=t[9],h=t[10],l=t[11],n[0]=e,n[1]=a,n[2]=u,n[3]=i,n[4]=o,n[5]=c,n[6]=f,n[7]=s,n[8]=v,n[9]=M,n[10]=h,n[11]=l,n[12]=e*m+o*b+v*d+t[12],n[13]=a*m+c*b+M*d+t[13],n[14]=u*m+f*b+h*d+t[14],n[15]=i*m+s*b+l*d+t[15],n):(t[12]=t[0]*m+t[4]*b+t[8]*d+t[12],t[13]=t[1]*m+t[5]*b+t[9]*d+t[13],t[14]=t[2]*m+t[6]*b+t[10]*d+t[14],t[15]=t[3]*m+t[7]*b+t[11]*d+t[15],t)},l.scale=function(t,r,n){var e=r[0],a=r[1],u=r[2];return n&&t!==n?(n[0]=t[0]*e,n[1]=t[1]*e,n[2]=t[2]*e,n[3]=t[3]*e,n[4]=t[4]*a,n[5]=t[5]*a,n[6]=t[6]*a,n[7]=t[7]*a,n[8]=t[8]*u,n[9]=t[9]*u,n[10]=t[10]*u,n[11]=t[11]*u,n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n):(t[0]*=e,t[1]*=e,t[2]*=e,t[3]*=e,t[4]*=a,t[5]*=a,t[6]*=a,t[7]*=a,t[8]*=u,t[9]*=u,t[10]*=u,t[11]*=u,t)},l.maxScale=function(t){var r=Math.sqrt(t[0]*t[0]+t[4]*t[4]+t[8]*t[8]),n=Math.sqrt(t[1]*t[1]+t[5]*t[5]+t[9]*t[9]),e=Math.sqrt(t[2]*t[2]+t[6]*t[6]+t[10]*t[10]);return Math.max(Math.max(r,n),e)},l.rotate=function(t,r,n,e){var a,u,i,o,c,f,s,v,M,h,l,m,b,d,q,y,p,w,x,g,F,A,R,V,j=n[0],z=n[1],I=n[2],N=Math.sqrt(j*j+z*z+I*I);return N?(1!==N&&(N=1/N,j*=N,z*=N,I*=N),a=Math.sin(r),u=Math.cos(r),i=1-u,o=t[0],c=t[1],f=t[2],s=t[3],v=t[4],M=t[5],h=t[6],l=t[7],m=t[8],b=t[9],d=t[10],q=t[11],y=j*j*i+u,p=z*j*i+I*a,w=I*j*i-z*a,x=j*z*i-I*a,g=z*z*i+u,F=I*z*i+j*a,A=j*I*i+z*a,R=z*I*i-j*a,V=I*I*i+u,e?t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]):e=t,e[0]=o*y+v*p+m*w,e[1]=c*y+M*p+b*w,e[2]=f*y+h*p+d*w,e[3]=s*y+l*p+q*w,e[4]=o*x+v*g+m*F,e[5]=c*x+M*g+b*F,e[6]=f*x+h*g+d*F,e[7]=s*x+l*g+q*F,e[8]=o*A+v*R+m*V,e[9]=c*A+M*R+b*V,e[10]=f*A+h*R+d*V,e[11]=s*A+l*R+q*V,e):null},l.rotateX=function(t,r,n){var e=Math.sin(r),a=Math.cos(r),u=t[4],i=t[5],o=t[6],c=t[7],f=t[8],s=t[9],v=t[10],M=t[11];return n?t!==n&&(n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]):n=t,n[4]=u*a+f*e,n[5]=i*a+s*e,n[6]=o*a+v*e,n[7]=c*a+M*e,n[8]=u*-e+f*a,n[9]=i*-e+s*a,n[10]=o*-e+v*a,n[11]=c*-e+M*a,n},l.rotateY=function(t,r,n){var e=Math.sin(r),a=Math.cos(r),u=t[0],i=t[1],o=t[2],c=t[3],f=t[8],s=t[9],v=t[10],M=t[11];return n?t!==n&&(n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]):n=t,n[0]=u*a+f*-e,n[1]=i*a+s*-e,n[2]=o*a+v*-e,n[3]=c*a+M*-e,n[8]=u*e+f*a,n[9]=i*e+s*a,n[10]=o*e+v*a,n[11]=c*e+M*a,n},l.rotateZ=function(t,r,n){var e=Math.sin(r),a=Math.cos(r),u=t[0],i=t[1],o=t[2],c=t[3],f=t[4],s=t[5],v=t[6],M=t[7];return n?t!==n&&(n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]):n=t,n[0]=u*a+f*e,n[1]=i*a+s*e,n[2]=o*a+v*e,n[3]=c*a+M*e,n[4]=u*-e+f*a,n[5]=i*-e+s*a,n[6]=o*-e+v*a,n[7]=c*-e+M*a,n},l.frustum=function(t,r,n,e,a,u,i){i||(i=l.create());var o=r-t,c=e-n,f=u-a;return i[0]=2*a/o,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*a/c,i[6]=0,i[7]=0,i[8]=(r+t)/o,i[9]=(e+n)/c,i[10]=-(u+a)/f,i[11]=-1,i[12]=0,i[13]=0,i[14]=-u*a*2/f,i[15]=0,i},l.perspective=function(t,r,n,e,a){var u=n*Math.tan(t*Math.PI/360),i=u*r;return l.frustum(-i,i,-u,u,n,e,a)},l.ortho=function(t,r,n,e,a,u,i){i||(i=l.create());var o=r-t,c=e-n,f=u-a;return i[0]=2/o,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2/c,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=-2/f,i[11]=0,i[12]=-(t+r)/o,i[13]=-(e+n)/c,i[14]=-(u+a)/f,i[15]=1,i},l.lookAt=function(t,r,n,e){e||(e=l.create());var a,u,i,o,c,f,s,v,M,h,m=t[0],b=t[1],d=t[2],q=n[0],y=n[1],p=n[2],w=r[0],x=r[1],g=r[2];return m===w&&b===x&&d===g?l.identity(e):(s=m-w,v=b-x,M=d-g,h=1/Math.sqrt(s*s+v*v+M*M),s*=h,v*=h,M*=h,a=y*M-p*v,u=p*s-q*M,i=q*v-y*s,h=Math.sqrt(a*a+u*u+i*i),h?(h=1/h,a*=h,u*=h,i*=h):(a=0,u=0,i=0),o=v*i-M*u,c=M*a-s*i,f=s*u-v*a,h=Math.sqrt(o*o+c*c+f*f),h?(h=1/h,o*=h,c*=h,f*=h):(o=0,c=0,f=0),e[0]=a,e[1]=o,e[2]=s,e[3]=0,e[4]=u,e[5]=c,e[6]=v,e[7]=0,e[8]=i,e[9]=f,e[10]=M,e[11]=0,e[12]=-(a*m+u*b+i*d),e[13]=-(o*m+c*b+f*d),e[14]=-(s*m+v*b+M*d),e[15]=1,e)},l.fromRotationTranslation=function(t,r,n){n||(n=l.create());var e=t[0],a=t[1],u=t[2],i=t[3],o=e+e,c=a+a,f=u+u,s=e*o,v=e*c,M=e*f,h=a*c,m=a*f,b=u*f,d=i*o,q=i*c,y=i*f;return n[0]=1-(h+b),n[1]=v+y,n[2]=M-q,n[3]=0,n[4]=v-y,n[5]=1-(s+b),n[6]=m+d,n[7]=0,n[8]=M+q,n[9]=m-d,n[10]=1-(s+h),n[11]=0,n[12]=r[0],n[13]=r[1],n[14]=r[2],n[15]=1,n},l.str=function(t){return"["+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+"]"};var m={};m.create=function(t){var r=new e(4);return t?(r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3]):r[0]=r[1]=r[2]=r[3]=0,r},m.createFrom=function(t,r,n,a){var u=new e(4);return u[0]=t,u[1]=r,u[2]=n,u[3]=a,u},m.set=function(t,r){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r},m.equal=function(t,r){return t===r||Math.abs(t[0]-r[0])<1e-6&&Math.abs(t[1]-r[1])<1e-6&&Math.abs(t[2]-r[2])<1e-6&&Math.abs(t[3]-r[3])<1e-6},m.identity=function(t){return t||(t=m.create()),t[0]=0,t[1]=0,t[2]=0,t[3]=1,t};var b=m.identity();m.calculateW=function(t,r){var n=t[0],e=t[1],a=t[2];return r&&t!==r?(r[0]=n,r[1]=e,r[2]=a,r[3]=-Math.sqrt(Math.abs(1-n*n-e*e-a*a)),r):(t[3]=-Math.sqrt(Math.abs(1-n*n-e*e-a*a)),t)},m.dot=function(t,r){return t[0]*r[0]+t[1]*r[1]+t[2]*r[2]+t[3]*r[3]},m.inverse=function(t,r){var n=t[0],e=t[1],a=t[2],u=t[3],i=n*n+e*e+a*a+u*u,o=i?1/i:0;return r&&t!==r?(r[0]=-t[0]*o,r[1]=-t[1]*o,r[2]=-t[2]*o,r[3]=t[3]*o,r):(t[0]*=-o,t[1]*=-o,t[2]*=-o,t[3]*=o,t)},m.conjugate=function(t,r){return r&&t!==r?(r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r[3]=t[3],r):(t[0]*=-1,t[1]*=-1,t[2]*=-1,t)},m.length=function(t){var r=t[0],n=t[1],e=t[2],a=t[3];return Math.sqrt(r*r+n*n+e*e+a*a)},m.normalize=function(t,r){r||(r=t);var n=t[0],e=t[1],a=t[2],u=t[3],i=Math.sqrt(n*n+e*e+a*a+u*u);return 0===i?(r[0]=0,r[1]=0,r[2]=0,r[3]=0,r):(i=1/i,r[0]=n*i,r[1]=e*i,r[2]=a*i,r[3]=u*i,r)},m.add=function(t,r,n){return n&&t!==n?(n[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n[3]=t[3]+r[3],n):(t[0]+=r[0],t[1]+=r[1],t[2]+=r[2],t[3]+=r[3],t)},m.multiply=function(t,r,n){n||(n=t);var e=t[0],a=t[1],u=t[2],i=t[3],o=r[0],c=r[1],f=r[2],s=r[3];return n[0]=e*s+i*o+a*f-u*c,n[1]=a*s+i*c+u*o-e*f,n[2]=u*s+i*f+e*c-a*o,n[3]=i*s-e*o-a*c-u*f,n},m.multiplyVec3=function(t,r,n){n||(n=r);var e=r[0],a=r[1],u=r[2],i=t[0],o=t[1],c=t[2],f=t[3],s=f*e+o*u-c*a,v=f*a+c*e-i*u,M=f*u+i*a-o*e,h=-i*e-o*a-c*u;return n[0]=s*f+h*-i+v*-c-M*-o,n[1]=v*f+h*-o+M*-i-s*-c,n[2]=M*f+h*-c+s*-o-v*-i,n},m.scale=function(t,r,n){return n&&t!==n?(n[0]=t[0]*r,n[1]=t[1]*r,n[2]=t[2]*r,n[3]=t[3]*r,n):(t[0]*=r,t[1]*=r,t[2]*=r,t[3]*=r,t)},m.toMat3=function(t,r){r||(r=h.create());var n=t[0],e=t[1],a=t[2],u=t[3],i=n+n,o=e+e,c=a+a,f=n*i,s=n*o,v=n*c,M=e*o,l=e*c,m=a*c,b=u*i,d=u*o,q=u*c;return r[0]=1-(M+m),r[1]=s+q,r[2]=v-d,r[3]=s-q,r[4]=1-(f+m),r[5]=l+b,r[6]=v+d,r[7]=l-b,r[8]=1-(f+M),r},m.toMat4=function(t,r){r||(r=l.create());var n=t[0],e=t[1],a=t[2],u=t[3],i=n+n,o=e+e,c=a+a,f=n*i,s=n*o,v=n*c,M=e*o,h=e*c,m=a*c,b=u*i,d=u*o,q=u*c;return r[0]=1-(M+m),r[1]=s+q,r[2]=v-d,r[3]=0,r[4]=s-q,r[5]=1-(f+m),r[6]=h+b,r[7]=0,r[8]=v+d,r[9]=h-b,r[10]=1-(f+M),r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r},m.slerp=function(t,r,n,e){e||(e=t);var a,u,i,o,c=t[0]*r[0]+t[1]*r[1]+t[2]*r[2]+t[3]*r[3];return Math.abs(c)>=1?(e!==t&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3]),e):(a=Math.acos(c),u=Math.sqrt(1-c*c),Math.abs(u)<.001?(e[0]=.5*t[0]+.5*r[0],e[1]=.5*t[1]+.5*r[1],e[2]=.5*t[2]+.5*r[2],e[3]=.5*t[3]+.5*r[3],e):(i=Math.sin((1-n)*a)/u,o=Math.sin(n*a)/u,e[0]=t[0]*i+r[0]*o,e[1]=t[1]*i+r[1]*o,e[2]=t[2]*i+r[2]*o,e[3]=t[3]*i+r[3]*o,e))},m.fromRotationMatrix=function(t,r){r||(r=m.create());var n,e=t[0]+t[4]+t[8];if(e>0)n=Math.sqrt(e+1),r[3]=.5*n,n=.5/n,r[0]=(t[7]-t[5])*n,r[1]=(t[2]-t[6])*n,r[2]=(t[3]-t[1])*n;else{var a=m.fromRotationMatrix.s_iNext=m.fromRotationMatrix.s_iNext||[1,2,0],u=0;t[4]>t[0]&&(u=1),t[8]>t[3*u+u]&&(u=2);var i=a[u],o=a[i];n=Math.sqrt(t[3*u+u]-t[3*i+i]-t[3*o+o]+1),r[u]=.5*n,n=.5/n,r[3]=(t[3*o+i]-t[3*i+o])*n,r[i]=(t[3*i+u]+t[3*u+i])*n,r[o]=(t[3*o+u]+t[3*u+o])*n}return r},h.toQuat4=m.fromRotationMatrix,function(){var t=h.create();m.fromAxes=function(r,n,e,a){return t[0]=n[0],t[3]=n[1],t[6]=n[2],t[1]=e[0],t[4]=e[1],t[7]=e[2],t[2]=r[0],t[5]=r[1],t[8]=r[2],m.fromRotationMatrix(t,a)}}(),m.identity=function(t){return t||(t=m.create()),t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},m.fromAngleAxis=function(t,r,n){n||(n=m.create());var e=.5*t,a=Math.sin(e);return n[3]=Math.cos(e),n[0]=a*r[0],n[1]=a*r[1],n[2]=a*r[2],n},m.toAngleAxis=function(t,r){r||(r=t);var e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2];if(e>0){r[3]=2*Math.acos(t[3]);var a=n.invsqrt(e);r[0]=t[0]*a,r[1]=t[1]*a,r[2]=t[2]*a}else r[3]=0,r[0]=1,r[1]=0,r[2]=0;return r},m.str=function(t){return"["+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+"]"};var d={};d.create=function(t){var r=new e(2);return t?(r[0]=t[0],r[1]=t[1]):(r[0]=0,r[1]=0),r},d.createFrom=function(t,r){var n=new e(2);return n[0]=t,n[1]=r,n},d.add=function(t,r,n){return n||(n=r),n[0]=t[0]+r[0],n[1]=t[1]+r[1],n},d.subtract=function(t,r,n){return n||(n=r),n[0]=t[0]-r[0],n[1]=t[1]-r[1],n},d.multiply=function(t,r,n){return n||(n=r),n[0]=t[0]*r[0],n[1]=t[1]*r[1],n},d.divide=function(t,r,n){return n||(n=r),n[0]=t[0]/r[0],n[1]=t[1]/r[1],n},d.scale=function(t,r,n){return n||(n=t),n[0]=t[0]*r,n[1]=t[1]*r,n},d.dist=function(t,r){var n=r[0]-t[0],e=r[1]-t[1];return Math.sqrt(n*n+e*e)},d.dist2=function(t,r){var n=r[0]-t[0],e=r[1]-t[1];return n*n+e*e},d.set=function(t,r){return r[0]=t[0],r[1]=t[1],r},d.set2=function(t,r,n){return n[0]=t,n[1]=r,n},d.equal=function(t,r){return t===r||Math.abs(t[0]-r[0])<1e-6&&Math.abs(t[1]-r[1])<1e-6},d.negate=function(t,r){return r||(r=t),r[0]=-t[0],r[1]=-t[1],r},d.normalize=function(t,r){r||(r=t);var n=t[0]*t[0]+t[1]*t[1];return n>0?(n=Math.sqrt(n),r[0]=t[0]/n,r[1]=t[1]/n):r[0]=r[1]=0,r},d.cross=function(t,r,n){var e=t[0]*r[1]-t[1]*r[0];return n?(n[0]=n[1]=0,n[2]=e,n):e},d.length=function(t){var r=t[0],n=t[1];return Math.sqrt(r*r+n*n)},d.length2=function(t){var r=t[0],n=t[1];return r*r+n*n},d.dot=function(t,r){return t[0]*r[0]+t[1]*r[1]},d.direction=function(t,r,n){n||(n=t);var e=t[0]-r[0],a=t[1]-r[1],u=e*e+a*a;return u?(u=1/Math.sqrt(u),n[0]=e*u,n[1]=a*u,n):(n[0]=0,n[1]=0,n[2]=0,n)},d.lerp=function(t,r,n,e){return e||(e=t),e[0]=t[0]+n*(r[0]-t[0]),e[1]=t[1]+n*(r[1]-t[1]),e},d.str=function(t){return"["+t[0]+", "+t[1]+"]"};var q={};q.create=function(t){var r=new e(4);return t?(r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3]):r[0]=r[1]=r[2]=r[3]=0,r},q.createFrom=function(t,r,n,a){var u=new e(4);return u[0]=t,u[1]=r,u[2]=n,u[3]=a,u},q.set=function(t,r){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r},q.equal=function(t,r){return t===r||Math.abs(t[0]-r[0])<1e-6&&Math.abs(t[1]-r[1])<1e-6&&Math.abs(t[2]-r[2])<1e-6&&Math.abs(t[3]-r[3])<1e-6},q.identity=function(t){return t||(t=q.create()),t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},q.transpose=function(t,r){if(!r||t===r){var n=t[1];return t[1]=t[2],t[2]=n,t}return r[0]=t[0],r[1]=t[2],r[2]=t[1],r[3]=t[3],r},q.determinant=function(t){return t[0]*t[3]-t[2]*t[1]},q.inverse=function(t,r){r||(r=t);var n=t[0],e=t[1],a=t[2],u=t[3],i=n*u-a*e;return i?(i=1/i,r[0]=u*i,r[1]=-e*i,r[2]=-a*i,r[3]=n*i,r):null},q.multiply=function(t,r,n){n||(n=t);var e=t[0],a=t[1],u=t[2],i=t[3];return n[0]=e*r[0]+a*r[2],n[1]=e*r[1]+a*r[3],n[2]=u*r[0]+i*r[2],n[3]=u*r[1]+i*r[3],n},q.rotate=function(t,r,n){n||(n=t);var e=t[0],a=t[1],u=t[2],i=t[3],o=Math.sin(r),c=Math.cos(r);return n[0]=e*c+a*o,n[1]=e*-o+a*c,n[2]=u*c+i*o,n[3]=u*-o+i*c,n},q.multiplyVec2=function(t,r,n){n||(n=r);var e=r[0],a=r[1];return n[0]=e*t[0]+a*t[1],n[1]=e*t[2]+a*t[3],n},q.scale=function(t,r,n){n||(n=t);var e=t[0],a=t[1],u=t[2],i=t[3],o=r[0],c=r[1];return n[0]=e*o,n[1]=a*c,n[2]=u*o,n[3]=i*c,n},q.str=function(t){return"["+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+"]"};var y={};y.create=function(t){var r=new e(4);return t?(r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3]):(r[0]=0,r[1]=0,r[2]=0,r[3]=0),r},y.createFrom=function(t,r,n,a){var u=new e(4);return u[0]=t,u[1]=r,u[2]=n,u[3]=a,u},y.add=function(t,r,n){return n||(n=r),n[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n[3]=t[3]+r[3],n},y.subtract=function(t,r,n){return n||(n=r),n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],n[3]=t[3]-r[3],n},y.multiply=function(t,r,n){return n||(n=r),n[0]=t[0]*r[0],n[1]=t[1]*r[1],n[2]=t[2]*r[2],n[3]=t[3]*r[3],n},y.divide=function(t,r,n){return n||(n=r),n[0]=t[0]/r[0],n[1]=t[1]/r[1],n[2]=t[2]/r[2],n[3]=t[3]/r[3],n},y.scale=function(t,r,n){return n||(n=t),n[0]=t[0]*r,n[1]=t[1]*r,n[2]=t[2]*r,n[3]=t[3]*r,n},y.set=function(t,r){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r},y.set4=function(t,r,n,e,a){return a[0]=t,a[1]=r,a[2]=n,a[3]=e,a},y.equal=function(t,r){return t===r||Math.abs(t[0]-r[0])<1e-6&&Math.abs(t[1]-r[1])<1e-6&&Math.abs(t[2]-r[2])<1e-6&&Math.abs(t[3]-r[3])<1e-6},y.negate=function(t,r){return r||(r=t),r[0]=-t[0],r[1]=-t[1],r[2]=-t[2],r[3]=-t[3],r},y.length=function(t){var r=t[0],n=t[1],e=t[2],a=t[3];return Math.sqrt(r*r+n*n+e*e+a*a)},y.length2=function(t){var r=t[0],n=t[1],e=t[2],a=t[3];return r*r+n*n+e*e+a*a},y.dot=function(t,r){return t[0]*r[0]+t[1]*r[1]+t[2]*r[2]+t[3]*r[3]},y.lerp=function(t,r,n,e){return e||(e=t),e[0]=t[0]+n*(r[0]-t[0]),e[1]=t[1]+n*(r[1]-t[1]),e[2]=t[2]+n*(r[2]-t[2]),e[3]=t[3]+n*(r[3]-t[3]),e},y.str=function(t){return"["+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+"]"};var p=r?"":"d";t["glMath"+p]=n,t["vec2"+p]=d,t["vec3"+p]=a,t["vec4"+p]=y,t["mat2"+p]=q,t["mat3"+p]=h,t["mat4"+p]=l,t["quat4"+p]=m}),t});