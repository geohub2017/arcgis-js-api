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

define(["require","exports","../../../../core/tsSupport/awaiterHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/assignHelper","../../../../core/lang","../../../../core/promiseUtils","../../../../core/urlUtils","../../../../core/Version","./BinaryStreamReader","./fillDefaults","./pathUtils","../../lib/gl-matrix","../../support/buffer/BufferView","../../support/buffer/bufferViewUtil"],function(e,t,r,n,o,s,i,a,u,c,f,d,p,l,h){function b(e){return r(this,void 0,void 0,function(){return n(this,function(t){return[2,i.create(function(t,r){var n=new Blob([e]),o=new FileReader;o.onload=function(){var e=o.result;t(JSON.parse(e))},o.onerror=function(e){r(e)},o.readAsText(n)})]})})}function y(e,t){return r(this,void 0,void 0,function(){return n(this,function(r){return[2,i.create(function(r,n){var o=new Blob([e],{type:t}),s=URL.createObjectURL(o),i=new Image;i.addEventListener("load",function(){URL.revokeObjectURL(s),r(i)}),i.addEventListener("error",function(e){URL.revokeObjectURL(s),n(e)}),i.src=s})]})})}Object.defineProperty(t,"__esModule",{value:!0});var m,O={MAGIC:1179937895,CHUNK_TYPE_JSON:1313821514,CHUNK_TYPE_BIN:5130562,MIN_HEADER_LENGTH:20},v=function(){function e(e,t,r,n,o){this.context=e,this.errorContext=t,this.uri=r,this.json=n,this.glbBuffer=o,this.bufferCache=new Map,this.textureCache=new Map,this.materialCache=new Map,this.nodeParentMap=new Map,this.nodeTransformCache=new Map,this.baseUri=d.splitURI(this.uri).dirPart,this.checkVersionSupported(),this.checkRequiredExtensionsSupported(),t.errorUnsupportedIf(null==n.scene,"A scene must be defined."),t.errorUnsupportedIf(null==n.scenes,"Scenes must be defined."),t.errorUnsupportedIf(null==n.meshes,"Meshes must be defined"),t.errorUnsupportedIf(null==n.nodes,"Nodes must be defined."),this.computeNodeParents()}return e.load=function(t,o,i){return r(this,void 0,void 0,function(){var r,a,u;return n(this,function(n){switch(n.label){case 0:return s.endsWith(i,".gltf")?[4,t.loadJson(i)]:[3,2];case 1:return r=n.sent(),[2,new e(t,o,i,r)];case 2:return s.endsWith(i,".glb")?[4,t.loadBinary(i)]:[3,5];case 3:return a=n.sent(),[4,e.parseGLB(o,a)];case 4:return u=n.sent(),[2,new e(t,o,i,u.json,u.binaryData)];case 5:o.error('URI needs to end in ".gltf" or ".glb"'),n.label=6;case 6:return[2]}})})},e.parseGLB=function(e,t){return r(this,void 0,void 0,function(){var r,o,s,i,a,u,f,d,p;return n(this,function(n){switch(n.label){case 0:r=new c.BinaryStreamReader(t),e.assert(r.remainingBytes()>=12,"GLB binary data is insufficiently large."),o=r.readUint32(),s=r.readUint32(),i=r.readUint32(),e.assert(o===O.MAGIC,"Magic first 4 bytes do not fit to expected GLB value."),e.assert(t.byteLength>=i,"GLB binary data is smalller than header specifies."),e.errorUnsupportedIf(2!==s,"Only GLB container version 2 is supported."),a=0,n.label=1;case 1:return r.remainingBytes()>=8?(d=r.readUint32(),p=r.readUint32(),0!==a?[3,3]:(e.assert(p===O.CHUNK_TYPE_JSON,"First GLB chunck must be JSON."),e.assert(d>=0,"No JSON data found."),[4,b(r.readUint8Array(d))])):[3,5];case 2:return u=n.sent(),[3,4];case 3:1===a?(e.errorUnsupportedIf(p!==O.CHUNK_TYPE_BIN,"Second GLB chunck expected to be BIN."),f=r.readUint8Array(d)):e.warnUnsupported("More than 2 GLB chunks detected. Skipping."),n.label=4;case 4:return a+=1,[3,1];case 5:return u||e.error("No GLB JSON chunk detected."),[2,{json:u,binaryData:f}]}})})},e.prototype.getBuffer=function(e){return r(this,void 0,void 0,function(){var t,r,o,s;return n(this,function(n){switch(n.label){case 0:return t=this.json.buffers[e],(r=this.errorContext,null==t.uri)?(r.assert(null!=this.glbBuffer,"GLB buffer not present"),[2,this.glbBuffer]):(o=this.bufferCache.get(e),o?[3,2]:[4,this.context.loadBinary(this.resolveUri(t.uri))]);case 1:s=n.sent(),o=new Uint8Array(s),this.bufferCache.set(e,o),r.assert(o.byteLength===t.byteLength,"Buffer byte lengths should match."),n.label=2;case 2:return[2,o]}})})},e.prototype.getAccessor=function(e){return r(this,void 0,void 0,function(){var t,r,o,s,i,a,u,c;return n(this,function(n){switch(n.label){case 0:return t=this.json.accessors[e],r=this.errorContext,r.errorUnsupportedIf(null==t.bufferView,"An accessor bufferView is required."),r.errorUnsupportedIf(t.type in["MAT2","MAT3","MAT4"],"AttributeType "+t.type+" is not supported"),o=this.json.bufferViews[t.bufferView],[4,this.getBuffer(o.buffer)];case 1:return s=n.sent(),i=T[t.type],a=g[t.componentType],u=i*a,c=o.byteStride||u,[2,{raw:s.buffer,byteStride:c,byteOffset:s.byteOffset+(o.byteOffset||0)+(t.byteOffset||0),entryCount:t.count,isDenselyPacked:c===u,componentCount:i,componentByteSize:a,componentType:t.componentType,min:t.min,max:t.max}]}})})},e.prototype.getIndexData=function(e){return r(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return null==e.indices?[2,null]:(t=this.errorContext,[4,this.getAccessor(e.indices)]);case 1:if(r=n.sent(),t.errorUnsupportedIf(5121===r.componentType,"uint8 indices are not supported."),r.isDenselyPacked)switch(r.componentType){case 5123:return[2,new Uint16Array(r.raw,r.byteOffset,r.entryCount)];case 5125:return[2,new Uint32Array(r.raw,r.byteOffset,r.entryCount)]}else switch(r.componentType){case 5123:return[2,h.makeDenseSingle(new l.BufferViewUint16(r.raw,r.byteOffset,r.byteOffset+r.byteStride,r.byteStride*r.entryCount))];case 5125:return[2,h.makeDenseSingle(new l.BufferViewUint32(r.raw,r.byteOffset,r.byteOffset+r.byteStride,r.byteStride*r.entryCount))]}return[2]}})})},e.prototype.getPositionData=function(e){return r(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return t=this.errorContext,t.errorUnsupportedIf(null==e.attributes.POSITION,"POSITION vertex data is required."),[4,this.getAccessor(e.attributes.POSITION)];case 1:return r=n.sent(),t.errorUnsupportedIf(5126!==r.componentType,"[POSITION attribute] Expected type FLOAT, found "+x[r.componentType]),t.errorUnsupportedIf(3!==r.componentCount,"POSITION attribute must have 3 components."),[2,new l.BufferViewVec3f(r.raw,r.byteOffset,r.byteStride,r.byteOffset+r.byteStride*r.entryCount)]}})})},e.prototype.getNormalData=function(e){return r(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return t=this.errorContext,t.errorUnsupportedIf(null==e.attributes.NORMAL,"NORMAL vertex data is required."),[4,this.getAccessor(e.attributes.NORMAL)];case 1:return r=n.sent(),t.errorUnsupportedIf(5126!==r.componentType,"[NORMAL attribute] Expected type FLOAT, found "+x[r.componentType]),t.errorUnsupportedIf(3!==r.componentCount,"NORMAL attribute must have 3 components."),[2,new l.BufferViewVec3f(r.raw,r.byteOffset,r.byteStride,r.byteOffset+r.byteStride*r.entryCount)]}})})},e.prototype.getTextureCoordinates=function(e){return r(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return t=this.errorContext,t.errorUnsupportedIf(null==e.attributes.TEXCOORD_0,"TEXCOORD_0 vertex data is required."),[4,this.getAccessor(e.attributes.TEXCOORD_0)];case 1:return r=n.sent(),t.errorUnsupportedIf(5126!==r.componentType,"[TEXCOORD_0 attribute] Expected type FLOAT, found "+x[r.componentType]),t.errorUnsupportedIf(2!==r.componentCount,"TEXCOORD_0 attribute must have 2 components."),[2,new l.BufferViewVec2f(r.raw,r.byteOffset,r.byteStride,r.byteOffset+r.byteStride*r.entryCount)]}})})},e.prototype.getVertexColors=function(e){return r(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return t=this.errorContext,t.errorUnsupportedIf(null==e.attributes.COLOR_0,"COLOR_0 vertex data is required."),[4,this.getAccessor(e.attributes.COLOR_0)];case 1:return r=n.sent(),(t.errorUnsupportedIf(4!==r.componentCount,"COLOR_0 attribute must have 4 components."),5126===r.componentType)?[2,new l.BufferViewVec4f(r.raw,r.byteOffset,r.byteStride,r.byteOffset+r.byteStride*r.entryCount)]:5121===r.componentType?[2,new l.BufferViewVec4u8(r.raw,r.byteOffset,r.byteStride,r.byteOffset+r.byteStride*r.entryCount)]:(t.errorUnsupported("[COLOR_0 attribute] Unsupported component type: "+x[r.componentType]),[2])}})})},e.prototype.getMaterial=function(e){return r(this,void 0,void 0,function(){var t,r,o,s,i,a;return n(this,function(n){switch(n.label){case 0:return t=this.errorContext,(r=this.materialCache.get(e.material))?[3,3]:(o=f.material(this.json.materials[e.material]),s=o.pbrMetallicRoughness,i=!!e.attributes.COLOR_0,a=void 0,s.baseColorTexture?(t.errorUnsupportedIf(0!==(s.baseColorTexture.texCoord||0),"Only TEXCOORD_0 is supported"),[4,this.getTexture(s.baseColorTexture.index)]):[3,2]);case 1:a=n.sent(),n.label=2;case 2:r={alphaMode:o.alphaMode,color:s.baseColorFactor,doubleSided:!!o.doubleSided,colorTexture:a,name:o.name,vertexColors:i},n.label=3;case 3:return[2,r]}})})},e.prototype.getTexture=function(e){return r(this,void 0,void 0,function(){var t,r,o,s,i,a,u,c;return n(this,function(n){switch(n.label){case 0:return t=this.errorContext,(r=this.json.textures[e],o=f.textureSampler(r.sampler),t.errorUnsupportedIf(null==r.source,"source must be defined for a texture"),s=this.json.images[r.source],i=this.textureCache.get(e))?[3,6]:(a=void 0,s.uri?[4,this.context.loadImage(this.resolveUri(s.uri))]:[3,2]);case 1:return a=n.sent(),[3,5];case 2:return t.errorUnsupportedIf(null==s.bufferView,"Image bufferView must be defined."),t.errorUnsupportedIf(null==s.mimeType,"Image mimeType must be defined."),u=this.json.bufferViews[s.bufferView],[4,this.getBuffer(u.buffer)];case 3:return c=n.sent(),t.errorUnsupportedIf(null!=u.byteStride,"byteStride not supported for image buffer"),[4,y(new Uint8Array(c.buffer,c.byteOffset+(u.byteOffset||0),u.byteLength),s.mimeType)];case 4:a=n.sent(),n.label=5;case 5:i={data:a,wrapS:o.wrapS,wrapT:o.wrapT,minFilter:o.minFilter,name:s.name},this.textureCache.set(e,i),n.label=6;case 6:return[2,i]}})})},e.prototype.getNodeTransform=function(e){if(void 0===e)return C;var t=this.nodeTransformCache.get(e);if(!t){var r=this.getNodeTransform(this.getNodeParent(e)),n=this.json.nodes[e];n.matrix?t=p.mat4d.multiply(r,n.matrix,p.mat4d.create()):n.translation||n.rotation||n.scale?(t=p.mat4d.create(r),n.translation&&p.mat4d.translate(t,n.translation,t),n.rotation&&(p.quat4d.toAngleAxis(n.rotation,U),p.mat4d.rotate(t,U[3],U,t)),n.scale&&p.mat4d.scale(t,n.scale,t)):t=r,this.nodeTransformCache.set(e,t)}return t},e.prototype.resolveUri=function(e){return a.isDataProtocol(e)?e:this.baseUri+e},e.prototype.getNodeParent=function(e){return this.nodeParentMap.get(e)},e.prototype.checkVersionSupported=function(){u.Version.parse(this.json.asset.version,"glTF").validate(w)},e.prototype.checkRequiredExtensionsSupported=function(){var e=this.json,t=this.errorContext;e.extensionsRequired&&0!==e.extensionsRequired.length&&t.errorUnsupportedIf(!0,"Extensions: "+e.extensionsRequired.join(", "))},e.prototype.computeNodeParents=function(){var e=this;this.json.nodes.forEach(function(t,r){t.children&&t.children.forEach(function(t){e.nodeParentMap.set(t,r)})})},e}();t.Resource=v;var w=new u.Version(2,0,"glTF"),C=p.mat4d.rotateX(p.mat4d.identity(),Math.PI/2),U=p.quat4d.create(),T={SCALAR:1,VEC2:2,VEC3:3,VEC4:4},g=(m={},m[5120]=1,m[5121]=1,m[5122]=2,m[5123]=2,m[5126]=4,m[5125]=4,m),x={5120:"BYTE",5121:"UNSIGNED_BYTE",5122:"SHORT",5123:"UNSIGNED_SHORT",5125:"UNSIGNED_INT",5126:"FLOAT"}});