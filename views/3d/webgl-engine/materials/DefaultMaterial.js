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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/has","../../layers/graphics/graphicUtils","../../lib/gl-matrix","../../support/buffer/InterleavedLayout","../lib/GLMaterialTexture","../lib/Material","../lib/RenderSlot","../lib/Util","./internal/bufferWriters","./internal/MaterialUtil","./internal/MaterialUtil","../shaders/DefaultPrograms"],function(e,t,r,i,a,n,o,s,l,c,p,d,u,m,v){function f(e,t){return!e.slicePlaneEnabled&&(e.cullFace?"none"!==e.cullFace:!e.transparent&&!e.doubleSided)}function h(e,t,r){f(t,r)?(e.setFaceCullingEnabled(!0),"front"===t.cullFace?e.setCullFace(1028):e.setCullFace(1029)):e.setFaceCullingEnabled(!1)}function g(e){e.setFaceCullingEnabled(!1)}function b(e,t){return e?c.TRANSPARENT_MATERIAL:t?c.STENCIL_MATERIAL:c.OPAQUE_MATERIAL}function P(e,t){var r=t.vvSizeEnabled;t.vvSizeEnabled?(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)):r&&e.setUniform3fv("vvSizeValue",t.vvSizeValue),r&&(e.setUniform3fv("vvSymbolAnchor",t.vvSymbolAnchor),a.computeObjectRotation(t.vvSymbolRotation[2],t.vvSymbolRotation[0],t.vvSymbolRotation[1],n.mat4d.identity(F)),e.setUniformMatrix3fv("vvSymbolRotation",n.mat4d.toMat3(F,D))),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors))}var S=p.assert,y={DIFFUSE:0,COMPONENT_COLOR:1},x=function(e){function t(r,i){var a=e.call(this,i)||this;return a.supportsEdges=!0,a.params=m.copyParameters(r,z),a.instanced=!!r.instanced,a.vertexBufferLayout=t.getVertexBufferLayout(a.params),a.instanceBufferLayout=a.instanced?t.getInstanceBufferLayout(a.params):null,a.bufferWriter=new I(a.vertexBufferLayout,a.instanceBufferLayout),a}return r(t,e),t.prototype.isVisible=function(){var t=this.params;if(!e.prototype.isVisible.call(this)||0===t.layerOpacity)return!1;var r=t.instanced,i=t.vertexColors,a=t.symbolColors,n=!!r&&r.indexOf("color")>-1,o=t.vvColorEnabled,s="replace"===t.colorMixMode,l=t.opacity>0,c=t.externalColor&&t.externalColor[3]>0;return i&&(n||o||a)?!!s||l:i?s?c:l:n||o||a?!!s||l:s?c:l},t.prototype.getParams=function(){return this.params},t.prototype.getParameterValues=function(){return m.copyParameters(this.params)},t.prototype.setParameterValues=function(e){var t=this.params;for(var r in e)"textureId"===r&&S(t.textureId,"Can only change texture of material that already has a texture"),"castShadows"===r&&S(e.castShadows===t.castShadows,"Can not change shadow casting behavior."),t[r]=e[r];this.notifyDirty("matChanged")},t.prototype.intersect=function(e,t,r,i,a,o,s,l){if(null!==this.params.verticalOffset){var c=i.camera;n.vec3d.set3(r[12],r[13],r[14],L);var p=n.vec3d.subtract(L,c.eye,A),d=n.vec3d.length(p),u=n.vec3d.scale(p,1/d),v=null,f=null;switch(i.viewingMode){case"global":f=n.vec3d.normalize(L,N);break;case"local":f=n.vec3d.set(U,N)}this.params.screenSizePerspective&&(v=n.vec3d.dot(f,u));var h=m.verticalOffsetAtDistance(c,d,this.params.verticalOffset,v,this.params.screenSizePerspective);n.vec3d.scale(f,h),n.mat3d.multiplyVec3(i.transformInverseRotation,f,R),a=n.vec3d.subtract(a,R,V),o=n.vec3d.subtract(o,R,B)}m.intersectTriangleGeometry(e,t,r,i,a,o,s)},t.prototype.getGLMaterials=function(){return{color:w,depthShadowMap:this.params.castShadows?C:null,normal:M,depth:O,highlight:T}},t.prototype.getAllTextureIds=function(){return this.params.textureId?[this.params.textureId]:[]},t.getVertexBufferLayout=function(e){var t=o.newLayout().vec3f("position");return e.groundNormalShading||(t=e.compressedNormals?t.vec2i16("normalCompressed",{glNormalized:!0}):t.vec3f("normal")),e.textureId&&(t=t.vec2f("uv0"),e.atlasRegions&&(t=t.vec4u16("region",{glNormalized:!0}))),e.vertexColors&&(t=t.vec4u8("color")),e.symbolColors&&(t=t.vec4u8("symbolColor")),e.componentIndices&&(t=t.u16("componentIndex").u16("_padding",{glPadding:!0})),t},t.getInstanceBufferLayout=function(e){var t=o.newLayout();return t=e.instancedDoublePrecision?t.vec3f("modelOriginHi").vec3f("modelOriginLo").mat3f("model").mat3f("modelNormal"):t.mat4f("model").mat4f("modelNormal"),e.instanced&&e.instanced.indexOf("color")>-1&&(t=t.vec4f("instanceColor")),e.instanced&&e.instanced.indexOf("featureAttribute")>-1&&(t=t.vec4f("instanceFeatureAttribute")),t},t}(l),w=function(e){function t(t,r,i){var a=this,n=t.getParams();a=e.call(this,t,r,i,n.textureId,n.textureInitTransparent)||this,a.params=m.copyParameters(n);var o=a.params;a.slot=b(o.transparent,o.writeStencil),a.texturing=o.textureId?o.atlasRegions?"AtlasTextured":"Textured":"none";var s=o.instanced;return a.instanced=!!s,a.instancedColor=!!s&&s.indexOf("color")>-1,a._createPrograms(),a}return r(t,e),t.prototype._createPrograms=function(){var e=this;this.programs=u.BindParametersMap.create(this.params,function(t){return e._createProgram(t)})},t.prototype._createProgram=function(e){var t=this.params;return this.programRep.getProgram(v.colorPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,vertexColors:t.vertexColors,symbolColors:t.symbolColors,flipV:t.flipV,doubleSided:t.doubleSided&&"normal"===t.doubleSidedType,windowOrderDoubleSided:t.doubleSided&&"winding-order"===t.doubleSidedType,instanced:!!this.instanced,instancedDoublePrecision:t.instancedDoublePrecision,instancedColor:this.instancedColor,receiveShadows:e.receiveShadows,receiveSSAO:e.receiveSSAO,vvSize:t.vvSizeEnabled,vvColor:t.vvColorEnabled,verticalOffset:null!==t.verticalOffset,screenSizePerspective:null!==t.screenSizePerspective,slice:t.slicePlaneEnabled,groundNormalShading:t.groundNormalShading,compressedNormals:t.compressedNormals,componentColor:null!=t.componentColorBuffer,transparencyDiscard:t.transparent,alphaCoverageCorrection:E})},t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program||this.getPrograms()[0]},t.prototype.getPrograms=function(){return u.BindParametersMap.programs(this.programs)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.slot=b(this.params.transparent,this.params.writeStencil),this.updateTexture(this.params.textureId),this._createPrograms()},t.prototype.bind=function(e,t){var r=this.params,i=this.program=u.BindParametersMap.lookup(this.programs,t);e.bindProgram(i),i.setUniform3fv("ambient",r.ambient),i.setUniform3fv("diffuse",r.diffuse),i.setUniform3fv("specular",r.specular),i.setUniform4fv("externalColor",r.externalColor),i.setUniform1i("colorMixMode",m.colorMixModes[r.colorMixMode]),i.setUniform1f("opacity",r.opacity),i.setUniform1f("layerOpacity",r.layerOpacity),m.bindVerticalOffset(r.verticalOffset,t,i),m.bindScreenSizePerspective(r.screenSizePerspective,t,i),P(i,r),this.bindTexture(e,i),"none"!==this.texturing&&this.bindTextureSize(e,i),e.setBlendFunctionSeparate(770,771,1,771),r.inverseWindingOrder&&e.setFrontFace(2304),r.transparent?(e.setBlendingEnabled(!0),r.blendModeOneOne?(e.setBlendFunction(1,1),e.setDepthWriteEnabled(!1)):e.setBlendFunctionSeparate(770,771,1,771)):e.setBlendingEnabled(!1),r.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(2,2)),h(e,r,t),e.setDepthTestEnabled(!0),r.componentIndices&&r.componentColorBuffer&&(r.componentColorBuffer.updateTexture(),r.componentColorBuffer.bind(i,{texName:"uComponentColorTex",invDimName:"uComponentColorTexInvDim",unit:y.COMPONENT_COLOR}))},t.prototype.release=function(e,t){e.setPolygonOffsetFillEnabled(!1),g(e),e.setBlendingEnabled(!1),e.setBlendFunctionSeparate(770,771,1,771),e.setDepthWriteEnabled(!0),e.setFrontFace(2305)},t.prototype.bindView=function(e,t){var r=this.program=u.BindParametersMap.lookup(this.programs,t),i=this.params,a=i.instancedDoublePrecision?[t.viewInvTransp[3],t.viewInvTransp[7],t.viewInvTransp[11]]:t.origin;m.bindView(a,t.view,r),m.bindCamPos(a,t.viewInvTransp,r),i.instancedDoublePrecision&&m.bindViewOriginDouble(a,r),i.slicePlaneEnabled&&m.bindSlicePlane(a,t.slicePlane,r),t.shadowMappingEnabled&&t.shadowMap.bindView(r,a)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(e){return 4},t}(s),O=function(e){function t(t,r,i,a){void 0===a&&(a=!1);var n=e.call(this,t,r,i,t.getParams().textureId)||this;return n.params=m.copyParameters(t.getParams()),n.instanced=!!n.params.instanced,n.texturing=t.bufferWriter.vertexBufferLayout.hasField("uv0")?n.params.atlasRegions?"AtlasTextured":"Textured":"none",n.biased=a,n.selectProgram(),n.selectSlot(),n}return r(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(v.depthPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,instanced:this.instanced,instancedDoublePrecision:this.params.instancedDoublePrecision,shadowMap:this.biased,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,transparencyDiscard:this.params.transparent,alphaCoverageCorrection:E})},t.prototype.selectSlot=function(){this.slot=b(this.params.transparent,this.params.writeStencil)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var r=this.program,i=this.params;e.bindProgram(r),r.setUniform2fv("nearFar",t.nearFar),i.inverseWindingOrder&&e.setFrontFace(2304),m.bindVerticalOffset(i.verticalOffset,t,r),m.bindScreenSizePerspective(i.screenSizePerspective,t,r),P(r,i),this.bindTexture(e,r),h(e,i,t),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){var t=this.params;g(e),t.inverseWindingOrder&&e.setFrontFace(2305)},t.prototype.bindView=function(e,t){var r=this.program,i=this.params,a=i.instancedDoublePrecision?[t.viewInvTransp[3],t.viewInvTransp[7],t.viewInvTransp[11]]:t.origin;m.bindView(a,t.view,r),i.slicePlaneEnabled&&m.bindSlicePlane(t.origin,t.slicePlane,r),i.screenSizePerspective&&m.bindCamPos(a,t.viewInvTransp,r),i.instancedDoublePrecision&&m.bindViewOriginDouble(a,r)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(e){return 4},t}(s),C=function(e){function t(t,r,i){return e.call(this,t,r,i,!0)||this}return r(t,e),t}(O),M=function(e){function t(t,r,i,a){void 0===a&&(a=!1);var n=e.call(this,t,r,i,t.getParams().textureId)||this;return n.params=m.copyParameters(t.getParams()),n.instanced=!!n.params.instanced,n.texturing=t.bufferWriter.vertexBufferLayout.hasField("uv0")?n.params.atlasRegions?"AtlasTextured":"Textured":"none",n.selectProgram(),n.selectSlot(),n}return r(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(v.normalPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,instanced:this.instanced,instancedDoublePrecision:this.params.instancedDoublePrecision,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,compressedNormals:this.params.compressedNormals,transparencyDiscard:this.params.transparent,alphaCoverageCorrection:E})},t.prototype.selectSlot=function(){this.slot=b(this.params.transparent,this.params.writeStencil)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var r=this.program,i=this.params;e.bindProgram(r),this.bindTexture(e,r),m.bindVerticalOffset(i.verticalOffset,t,r),m.bindScreenSizePerspective(i.screenSizePerspective,t,r),P(r,i),h(e,i,t),i.inverseWindingOrder&&e.setFrontFace(2304),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){var t=this.params;g(e),t.inverseWindingOrder&&e.setFrontFace(2305)},t.prototype.bindView=function(e,t){var r=this.program,i=this.params,a=i.instancedDoublePrecision?[t.viewInvTransp[3],t.viewInvTransp[7],t.viewInvTransp[11]]:t.origin;m.bindView(a,t.view,r),r.setUniformMatrix4fv("viewNormal",t.viewInvTransp),i.slicePlaneEnabled&&m.bindSlicePlane(t.origin,t.slicePlane,r),i.screenSizePerspective&&m.bindCamPos(a,t.viewInvTransp,r),i.instancedDoublePrecision&&m.bindViewOriginDouble(a,r)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(e){return 4},t}(s),T=function(e){function t(t,r,i,a){void 0===a&&(a=!1);var n=e.call(this,t,r,i,t.getParams().textureId)||this;return n.params=m.copyParameters(t.getParams()),n.instanced=!!n.params.instanced,n.texturing=t.bufferWriter.vertexBufferLayout.hasField("uv0")?n.params.atlasRegions?"AtlasTextured":"Textured":"none",n.selectProgram(),n.selectSlot(),n}return r(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(v.highlightPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,instanced:this.instanced,instancedDoublePrecision:this.params.instancedDoublePrecision,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,transparencyDiscard:this.params.transparent,alphaCoverageCorrection:E})},t.prototype.selectSlot=function(){this.slot=b(this.params.transparent,this.params.writeStencil)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var r=this.program,i=this.params;e.bindProgram(r),this.bindTexture(e,r),m.bindVerticalOffset(i.verticalOffset,t,r),m.bindScreenSizePerspective(i.screenSizePerspective,t,r),P(r,i),h(e,i,t),i.inverseWindingOrder&&e.setFrontFace(2304),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){var t=this.params;g(e),t.inverseWindingOrder&&e.setFrontFace(2304)},t.prototype.bindView=function(e,t){var r=this.program,i=this.params,a=i.instancedDoublePrecision?[t.viewInvTransp[3],t.viewInvTransp[7],t.viewInvTransp[11]]:t.origin;m.bindView(a,t.view,r),i.slicePlaneEnabled&&m.bindSlicePlane(t.origin,t.slicePlane,r),i.screenSizePerspective&&m.bindCamPos(a,t.viewInvTransp,r),i.instancedDoublePrecision&&m.bindViewOriginDouble(a,r)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(e){return 4},t}(s),z={textureId:void 0,textureInitTransparent:!1,ambient:[.2,.2,.2],diffuse:[.8,.8,.8],specular:[0,0,0],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,blendModeOneOne:!1,inverseWindingOrder:!1,vertexColors:!1,symbolColors:!1,componentIndices:!1,componentColorBuffer:null,flipV:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:void 0,instanced:void 0,instancedDoublePrecision:!1,compressedNormals:!1,groundNormalShading:!1,writeStencil:!1,receiveSSAO:!0,castShadows:!0,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvSizeValue:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvSymbolAnchor:[0,0,0],vvSymbolRotation:[0,0,0],transparent:!1,polygonOffset:!1,atlasRegions:!1},I=function(){function e(e,t){this.vertexBufferLayout=e,this.instanceBufferLayout=t}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return e.indices.position.length},e.prototype.write=function(e,t,r,i,a){d.writeDefaultAttributes(t,r,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,i,a)},e}(),E=!!i("enable-feature:skallweit/lod-rendering"),D=n.mat3d.create(),F=n.mat4d.create(),V=n.vec3d.create(),B=n.vec3d.create(),U=n.vec3d.createFrom(0,0,1),N=n.vec3d.create(),R=n.vec3d.create(),L=n.vec3d.create(),A=n.vec3d.create();return x});