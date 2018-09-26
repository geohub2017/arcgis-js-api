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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../enums","../Utils","./WGLGeometryBrush","../shaders/MaterialPrograms","../../../../webgl/Texture","../../../../webgl/VertexArrayObject"],function(e,t,i,r,o,a,n,s,v){Object.defineProperty(t,"__esModule",{value:!0});var d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._iconVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:24,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:24,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:24,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]},t._iconVertexAttributesWithVV={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:40,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:40,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:40,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:40,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:40,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:40,normalized:!1,divisor:0},{name:"a_vv",count:4,type:5126,offset:24,stride:40,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]},t._iconVertexAttributesWithHeatmap={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:28,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:28,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:28,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:28,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:28,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:28,normalized:!1,divisor:0},{name:"a_weight",count:1,type:5126,offset:24,stride:28,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]},t._spritesTextureSize=new Float32Array(2),t}return i(t,e),t.prototype.dispose=function(){},t.prototype.getGeometryType=function(){return r.WGLGeometryType.MARKER},t.prototype.drawGeometry=function(e,t,i,r){var o=e.context,a=e.painter,n=e.rendererInfo,s=e.drawPhase,v=i.indexCount,d=i.indexFrom,l=i.materialInfo,u=l.materialKeyInfo,f=u.heatmap,m=a.materialManager.getProgram(l.materialKey,s);if(m){o.bindProgram(m);var p=this._getVAO(o,t,u.hasVV(),f);if(o.bindVAO(p),f){var y=this._getIntensityTexture(o,n.heatmapParameters);o.bindTexture(y,1),m.setUniform1i("u_texture",1),this._spritesTextureSize[0]=Math.round(n.heatmapParameters.radius),this._spritesTextureSize[1]=Math.round(n.heatmapParameters.radius)}else{var c=l.texBindingInfo[0],_=c.pageId;a.textureManager.bindSpritePage(o,_,c.unit),m.setUniform1i(c.semantic,c.unit);var x=a.textureManager.sprites;this._spritesTextureSize[0]=x.getWidth(_)/4,this._spritesTextureSize[1]=x.getHeight(_)/4}var z=n.vvMaterialParameters.vvRotationEnabled&&"geographic"===n.vvMaterialParameters.vvRotationType?a.extrudeMatrix:a.extrudeNoRotationMatrix;m.setUniformMatrix4fv("u_transformMatrix",t.tileTransform.transform),m.setUniformMatrix4fv("u_extrudeMatrix",z),m.setUniform2fv("u_normalized_origin",t.tileTransform.displayCoord),m.setUniform2fv("u_mosaicSize",this._spritesTextureSize),m.setUniform1f("u_opacity",1),u.vvSizeMinMaxValue&&m.setUniform4fv("u_vvSizeMinMaxValue",n.vvSizeMinMaxValue),u.vvSizeScaleStops&&m.setUniform1f("u_vvSizeScaleStopsValue",n.vvSizeScaleStopsValue),u.vvSizeFieldStops&&(m.setUniform1fv("u_vvSizeFieldStopsValues",n.vvSizeFieldStopsValues),m.setUniform1fv("u_vvSizeFieldStopsSizes",n.vvSizeFieldStopsSizes)),u.vvSizeUnitValue&&m.setUniform1f("u_vvSizeUnitValueWorldToPixelsRatio",n.vvSizeUnitValueToPixelsRatio),u.vvColor&&(m.setUniform1fv("u_vvColorValues",n.vvColorValues),m.setUniform4fv("u_vvColors",n.vvColors)),u.vvOpacity&&(m.setUniform1fv("u_vvOpacityValues",n.vvOpacityValues),m.setUniform1fv("u_vvOpacities",n.vvOpacities)),u.vvRotation&&m.setUniform1f("u_vvRotationType","geographic"===n.vvMaterialParameters.vvRotationType?0:1),o.drawElements(4,v,5125,4*d),o.bindVAO(null)}},t.prototype._getVAO=function(e,t,i,r){if(t.iconGeometry.vao)return t.iconGeometry.vao;var a=t.iconGeometry.vertexBufferMap[o.C_VBO_GEOMETRY],s=t.iconGeometry.vertexBufferMap[o.C_VBO_VISIBILITY],d=t.iconGeometry.indexBuffer;return a&&d?(t.iconGeometry.vao=i?new v(e,n.icon.attributes,this._iconVertexAttributesWithVV,{geometry:a,visibility:s},d):r?new v(e,n.icon.attributes,this._iconVertexAttributesWithHeatmap,{geometry:a,visibility:s},d):new v(e,n.icon.attributes,this._iconVertexAttributes,{geometry:a,visibility:s},d),t.iconGeometry.vao):null},t.prototype._getIntensityTexture=function(e,t){if(t.intensityKernel&&!t.refreshIntensityKernel)return t.intensityKernel;t.intensityKernel&&(t.intensityKernel.dispose(),t.intensityKernel=null);for(var i=t.radius,r=t.kernelSize,o=t.blurRadius,a=i*i,n=[],v=-1;++v<r;)n[v]=Math.exp(-Math.pow(v-o,2)/(2*a))/(Math.sqrt(2*Math.PI)*(i/2));for(var d,l,u,f=[],m=0;m<r;m++)for(l=n[m],v=0;v<r;v++)u=m*r+v,d=n[v],f[4*u+0]=l*d,f[4*u+1]=0,f[4*u+2]=0,f[4*u+3]=1;var p=new s(e,{target:3553,pixelFormat:6408,internalFormat:e.capabilities.colorBufferFloat.RGBA32F,dataType:5126,samplingMode:e.capabilities.textureFloatLinear?9729:9728,wrapMode:33071,width:r,height:r},new Float32Array(f));return t.intensityKernel=p,t.refreshIntensityKernel=!1,p},t}(a.default);t.default=d});