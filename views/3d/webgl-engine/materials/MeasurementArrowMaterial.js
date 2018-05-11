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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/text!./MeasurementArrowMaterial.xml","../lib/gl-matrix","../lib/GLMaterial","../lib/Material","../lib/RenderSlot","../lib/ShaderVariations","../lib/Util","./internal/MaterialUtil","../../../webgl/Util"],function(t,e,r,o,n,i,a,s,l,p,f,u){var d=n.vec3d,m=n.mat4d,c=[{name:p.VertexAttrConstants.POSITION,count:3,type:5126,offset:0,stride:36,normalized:!1},{name:p.VertexAttrConstants.NORMAL,count:3,type:5126,offset:12,stride:36,normalized:!1},{name:p.VertexAttrConstants.UV0,count:2,type:5126,offset:24,stride:36,normalized:!1},{name:p.VertexAttrConstants.AUXPOS1,count:1,type:5126,offset:32,stride:36,normalized:!1}],h={width:32,outlineSize:.2,outlineColor:[1,.5,0,1],stripeLength:1,stripeEvenColor:[1,1,1,1],stripeOddColor:[1,.5,0,1],polygonOffset:!1},g=function(t){function e(e,r){var o=t.call(this,r)||this;return o.params=f.copyParameters(e,h),o}return r(e,t),e.prototype.dispose=function(){},e.prototype.getParameterValues=function(){var t=this.params;return{width:t.width,outlineSize:t.outlineSize,outlineColor:t.outlineColor,stripeLength:t.stripeLength,stripeEvenColor:t.stripeEvenColor,stripeOddColor:t.stripeOddColor,polygonOffset:t.polygonOffset}},e.prototype.setParameterValues=function(t){f.updateParameters(this.params,t)&&this.notifyDirty("matChanged")},e.prototype.getParams=function(){return this.params},e.prototype.getOutputAmount=function(t){return 2*(t/2+1)*9},e.prototype.getInstanceBufferLayout=function(){},e.prototype.getVertexBufferLayout=function(){return c},e.prototype.fillInterleaved=function(t,e,r,o,n,i){var a=t.vertexAttr[p.VertexAttrConstants.POSITION].data,s=t.vertexAttr[p.VertexAttrConstants.NORMAL].data,l=a.length/3,h=t&&t.indices&&t.indices.position;h&&h.length!==2*(l-1)&&console.warn("MeasurementArrowMaterial does not support indices");for(var g=i+u.findAttribute(c,p.VertexAttrConstants.POSITION).offset/4,y=i+u.findAttribute(c,p.VertexAttrConstants.NORMAL).offset/4,O=i+u.findAttribute(c,p.VertexAttrConstants.UV0).offset/4,V=i+u.findAttribute(c,p.VertexAttrConstants.AUXPOS1).offset/4,w=v,x=A,S=b,E=C,M=P,U=0,L=0;L<l;++L){var I=3*L;if(d.set3(a[I],a[I+1],a[I+2],w),L<l-1){var z=3*(L+1);d.set3(a[z],a[z+1],a[z+2],x),d.set3(s[z],s[z+1],s[z+2],M),d.normalize(M),d.subtract(x,w,S),d.normalize(S),d.cross(M,S,E),d.normalize(E)}var T=d.dist(w,x);e&&r&&(m.multiplyVec3(e,w),m.multiplyVec3(e,x),m.multiplyVec3(r,E)),f.fill(w,0,n,g,void 0,3),g+=9,f.fill(w,0,n,g,void 0,3),g+=9,f.fill(E,0,n,y,void 0,3),y+=9,f.fill(E,0,n,y,void 0,3),y+=9,n[O]=U,n[O+1]=-1,O+=9,n[O]=U,n[O+1]=1,O+=9,L<l-1&&(U+=T)}for(var L=0;L<l;++L)n[V]=U,V+=9,n[V]=U,V+=9},e.prototype.intersect=function(t,e,r,o,n,i,a,s){},e.prototype.getGLMaterials=function(){return{color:y,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:void 0}},e.prototype.getAllTextureIds=function(){return[]},e.loadShaders=function(t,e,r){t._parse(o);var n=new l("measurement-arrow",["vsMeasurementArrow","fsMeasurementArrow"],null,e,t,r);e.addShaderVariations("measurement-arrow-material-shader-variations",n)},e}(a),y=function(t){function e(e,r,o){var n=t.call(this,e,r)||this;return n.params=f.copyParameters(e.getParams()),n.selectProgram(),n}return r(e,t),e.prototype.selectProgram=function(){this.program=this.programRep.getShaderVariationsProgram("measurement-arrow-material-shader-variations",[])},e.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},e.prototype.beginSlot=function(t){return t===s.OPAQUE_MATERIAL},e.prototype.getProgram=function(){return this.program},e.prototype.getDrawMode=function(t){return t.gl.TRIANGLE_STRIP},e.prototype.bind=function(t,e){var r=this.program;t.setDepthTestEnabled(!0),t.setDepthWriteEnabled(!0),t.setFaceCullingEnabled(!1),t.setBlendingEnabled(!1),this.params.polygonOffset&&(t.setPolygonOffsetFillEnabled(!0),t.setPolygonOffset(0,-4)),t.bindProgram(r),r.setUniform1f("width",this.params.width),r.setUniform1f("outlineSize",this.params.outlineSize),r.setUniform4fv("outlineColor",this.params.outlineColor),r.setUniform1f("stripeLength",this.params.stripeLength),r.setUniform4fv("stripeEvenColor",this.params.stripeEvenColor),r.setUniform4fv("stripeOddColor",this.params.stripeOddColor)},e.prototype.bindView=function(t,e){var r=e.origin,o=this.getProgram();f.bindView(r,e.view,o)},e.prototype.bindInstance=function(t,e){this.getProgram().setUniformMatrix4fv("model",e.transformation)},e.prototype.release=function(t){t.setDepthTestEnabled(!0),t.setDepthWriteEnabled(!0),t.setBlendingEnabled(!1),this.params.polygonOffset&&t.setPolygonOffsetFillEnabled(!1)},e}(i),v=d.create(),A=d.create(),b=d.create(),C=d.create(),P=d.create(),O=m.create();return m.identity(O),g});