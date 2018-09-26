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

define(["require","exports","../GeometryUtils","../../webgl/BufferObject","../../webgl/Texture","../../webgl/VertexArrayObject"],function(t,e,r,i,a,n){return function(){function t(t){this._initialized=!1,this._maxWidth=0,this._programOptions={id:!1,pattern:!1},this._programCache=t,this._color=new Float32Array([1,0,0,1])}return t.prototype.dispose=function(){this._outlineVertexArrayObject&&(this._outlineVertexArrayObject.dispose(),this._outlineVertexArrayObject=null),this._tileInfoVertexArrayObject&&(this._tileInfoVertexArrayObject.dispose(),this._tileInfoVertexArrayObject=null)},t.prototype.render=function(t,e){this._initialized||this._initialize(t);var r=this._programCache.getProgram(0,0,this._programOptions);if(r){t.bindVAO(this._outlineVertexArrayObject),t.bindProgram(r),r.setUniformMatrix4fv("u_transformMatrix",e.tileTransform.transform),r.setUniform2fv("u_normalized_origin",e.tileTransform.displayCoord),r.setUniform1f("u_coord_range",e.coordRange),r.setUniform1f("u_depth",0),r.setUniform4fv("u_color",this._color),t.setLineWidth(2),t.drawArrays(3,0,4),t.bindVAO();var i=this._getTexture(t,e);if(i){var a=this._programCache.getProgram(7,0,null);a&&(t.bindVAO(this._tileInfoVertexArrayObject),t.bindProgram(a),t.bindTexture(i,0),a.setUniformMatrix4fv("u_transformMatrix",e.tileTransform.transform),a.setUniform2fv("u_normalized_origin",e.tileTransform.displayCoord),a.setUniform1f("u_depth",0),a.setUniform1f("u_coord_ratio",e.coordRange/512),a.setUniform2f("u_delta",8,8),a.setUniform2f("u_dimensions",i.descriptor.width,i.descriptor.height),t.drawArrays(5,0,4),t.bindVAO())}}},t.prototype._initialize=function(t){if(this._initialized)return!0;var e={geometry:[{name:"a_pos",count:2,type:5120,offset:0,stride:2,normalized:!1,divisor:0}]},r=new Int8Array([0,0,1,0,1,1,0,1]),a=i.createVertex(t,35044,r),o=new n(t,this._programCache.getProgramAttributes(0),e,{geometry:a}),s=new Int8Array([0,0,1,0,0,1,1,1]),l=i.createVertex(t,35044,s),h=new n(t,this._programCache.getProgramAttributes(7),e,{geometry:l});return this._outlineVertexArrayObject=o,this._tileInfoVertexArrayObject=h,this._initialized=!0,!0},t.prototype._getTexture=function(t,e){if(e.texture)return e.texture;this._canvas||(this._canvas=document.createElement("canvas"),this._canvas.setAttribute("id","canvas2d"),this._canvas.setAttribute("width","256"),this._canvas.setAttribute("height","32"),this._canvas.setAttribute("style","display:none"));var i=e.key.id,n=this._canvas.getContext("2d");n.font="24px sans-serif",n.textAlign="left",n.textBaseline="middle";var o=n.measureText(i),s=Math.pow(2,Math.ceil(r.log2(o.width+2)));s>this._maxWidth&&(this._maxWidth=s);return n.clearRect(0,0,this._maxWidth,32),n.fillStyle=e.key.level>e.refKey.level?"red":"blue",n.fillText(i,0,16),e.texture=new a(t,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728},this._canvas),e.texture},t}()});