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

define(["require","exports","./Utils"],function(e,r,f){return function(){function e(){this.geometries=[{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}}]}return e.deserialize=function(r){for(var t=new e,i=0;i<5;++i){t.geometries[i].indexBuffer=new Uint32Array(r.geometries[i].indexBuffer),t.geometries[i].vertexBuffer={};for(var u in r.geometries[i].vertexBuffer)t.geometries[i].vertexBuffer[u]={data:f.allocateTypedArrayBufferwithData(r.geometries[i].vertexBuffer[u].data,r.geometries[i].vertexBuffer[u].stride),stride:r.geometries[i].vertexBuffer[u].stride}}return t},e.prototype.serialize=function(){for(var e={geometries:[{indexBuffer:this.geometries[0].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[1].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[2].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[3].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[4].indexBuffer.buffer,vertexBuffer:{}}]},r=0;r<5;++r)for(var f in this.geometries[r].vertexBuffer)e.geometries[r].vertexBuffer[f]={data:this.geometries[r].vertexBuffer[f].data.buffer,stride:this.geometries[r].vertexBuffer[f].stride};return e},e.prototype.getBuffers=function(){for(var e=[],r=0;r<5;++r){e.push(this.geometries[r].indexBuffer.buffer);for(var f in this.geometries[r].vertexBuffer)e.push(this.geometries[r].vertexBuffer[f].data.buffer)}return e},e}()});