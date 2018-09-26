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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../geometry","../../../Graphic","../../../core/Accessor","../../../core/Handles","../../../core/accessorSupport/decorators","../../../symbols/SimpleMarkerSymbol"],function(e,t,i,r,n,o,c,s,a,h){var p=function(){function e(e){this.selectedGraphics=e,this.type="vertex-select"}return e}(),l=function(){function e(e){this.selectedGraphics=e,this.type="vertex-deselect"}return e}(),v=function(){function e(e,t,i,r,n){this.vertices=e,this.graphics=t,this.graphicIndex=i,this.native=r,this.screenPoint=n,this.type="vertex-move-start"}return e}(),d=function(){function e(e,t,i,r,n){this.vertices=e,this.graphics=t,this.graphicIndex=i,this.native=r,this.screenPoint=n,this.type="vertex-move"}return e}(),u=function(){function e(e,t,i,r,n){this.vertices=e,this.graphics=t,this.graphicIndex=i,this.native=r,this.screenPoint=n,this.type="vertex-move-stop"}return e}();return function(e){function t(t){var i=e.call(this,t)||this;return i.view=null,i._activeGraphic=null,i._handles=new s,i._hoverGraphic=null,i._pointerDownEvent=null,i._selectedGraphics=[],i.layer=null,i.graphics=[],i.pointSymbol=new h({type:"simple-marker",style:"circle",size:6,color:[33,205,255],outline:{color:[0,12,255],width:1}}),i.pointHoverSymbol=new h({type:"simple-marker",style:"circle",size:8,color:[33,205,255],outline:{color:[0,12,255],width:1}}),i.selectedPointSymbol=new h({type:"simple-marker",style:"circle",size:8,color:[255,255,255],outline:{color:[0,12,255],width:1}}),i.vertices=[],i}return i(t,e),t.prototype.destroy=function(){this.reset(),this._handles.removeAll()},t.prototype.update=function(e){var t=this;return this.reset(),e.layer&&(this.layer=e.layer),e.vertices&&(this.vertices=e.vertices),e.view&&(this.view=e.view),this.graphics=this._createVertexGraphics(this.vertices),this.layer&&this.layer.addMany(this.graphics),this._handles.add([this.view.on("click",function(e){return t._clickHandler(e)}),this.view.on("immediate-click",function(i){return t._immediateClickHandler(i,e.handles)}),this.view.on("pointer-down",function(e){return t._pointerDownHandler(e)}),this.view.on("pointer-move",function(e){return t._pointerMoveHandler(e)}),this.view.on("pointer-up",function(e){return t._pointerUpHandler(e)}),this.view.on("drag",function(i){return t._dragHandler(i,e.handles)})])},t.prototype.refresh=function(){this.reset(),this.graphics=this._createVertexGraphics(this.vertices),this.layer&&this.layer.addMany(this.graphics)},t.prototype.reset=function(){this.layer&&this.layer.removeMany(this.graphics),this.graphics=[],this.layer&&this.layer.removeMany(this._selectedGraphics),this._selectedGraphics=[],this.layer&&this.layer.remove(this._activeGraphic),this._activeGraphic=null},t.prototype._createVertexGraphics=function(e){var t=this,i=e||this.vertices,r=[];return i.forEach(function(e,i){e.forEach(function(e,c){var s=e[0],a=e[1],h=new n.Point({x:s,y:a,spatialReference:t.view.spatialReference});r.push(new o({attributes:{pathIndex:i,vertexIndex:c,handleIndex:r.length},geometry:h,symbol:t.pointSymbol}))})}),r.forEach(function(e,t){var i=[],n=e.geometry;r.forEach(function(e,r){if(t!==r){var o=e.geometry;n.x===o.x&&n.y===o.y&&i.push(r)}}),e.attributes.relatedGraphicIndices=i}),r},t.prototype._updateGraphic=function(e,t){var i=e.attributes,r=i.pathIndex,n=i.vertexIndex;e.set("geometry",t),this.vertices[r][n]=[t.x,t.y]},t.prototype._clickHandler=function(e){},t.prototype._immediateClickHandler=function(e,t){var i=this;this.view.hitTest(e).then(function(r){var n=r.results,o=e.native.shiftKey;if(n.length&&n[0].graphic){var c=n[0].graphic;if(i.graphics.indexOf(c)>-1){if(o||(i._selectedGraphics.forEach(function(e){e.set("symbol",i.pointSymbol)}),i._selectedGraphics=[],t.onDeselect(new l(i._selectedGraphics))),-1===i._selectedGraphics.indexOf(c))i._selectedGraphics.push(c),c.set("symbol",i.selectedPointSymbol),t.onSelect(new p(i._selectedGraphics));else{var s=i._selectedGraphics.indexOf(c);i._selectedGraphics.splice(s,1),c.set("symbol",i.pointHoverSymbol),t.onDeselect(new l(i._selectedGraphics))}return}}i._selectedGraphics.forEach(function(e){e.set("symbol",i.pointSymbol)}),i._selectedGraphics=[],t.onDeselect(new l(i._selectedGraphics))})},t.prototype._pointerDownHandler=function(e){var t=this;this._pointerDownEvent=e,this.view.hitTest(e).then(function(e){var i=e.results;if(i.length&&i[0].graphic){var r=i[0].graphic;t.graphics.indexOf(r)>-1?t._activeGraphic=r:r!==t._activeGraphic&&(t._pointerDownEvent=null,t._activeGraphic=null)}else t._pointerDownEvent=null,t._activeGraphic=null})},t.prototype._pointerUpHandler=function(e){this._pointerDownEvent=null,this._activeGraphic=null},t.prototype._pointerMoveHandler=function(e){var t=this;this.view.hitTest(e).then(function(e){var i=e.results;if(i.length&&i[0].graphic){var r=i[0].graphic;if(r===t._hoverGraphic)return;if(t.graphics.indexOf(r)>-1){if(t._hoverGraphic){var n=t.graphics.indexOf(t._hoverGraphic),o=t.graphics[n],c=t._selectedGraphics.indexOf(t._hoverGraphic)>-1?t.selectedPointSymbol:t.pointSymbol;o.set("symbol",c),t._hoverGraphic=null}t._hoverGraphic=r;var s=t._selectedGraphics.indexOf(r)>-1?t.selectedPointSymbol:t.pointHoverSymbol;return void r.set("symbol",s)}}if(t._hoverGraphic){var n=t.graphics.indexOf(t._hoverGraphic),o=t.graphics[n],s=t._selectedGraphics.indexOf(t._hoverGraphic)>-1?t.selectedPointSymbol:t.pointSymbol;o.set("symbol",s),t._hoverGraphic=null}})},t.prototype._dragHandler=function(e,t){var i=this;this._pointerDownEvent&&e.stopPropagation(),this.view.hitTest(e).then(function(r){if(i._pointerDownEvent&&i._activeGraphic){var n=i.graphics.indexOf(i._activeGraphic);-1===i._selectedGraphics.indexOf(i._activeGraphic)&&(i._selectedGraphics.forEach(function(e){e.set("symbol",i.pointSymbol)}),i._selectedGraphics=[],i._selectedGraphics.push(i._activeGraphic),i._activeGraphic.set("symbol",i.selectedPointSymbol),t.onSelect(new p(i._selectedGraphics)));var o=i.view.toMap(r.screenPoint),c=i._activeGraphic.attributes.relatedGraphicIndices;if(c.length&&c.forEach(function(e){var t=i.graphics[e];i._updateGraphic(t,o)}),i._selectedGraphics.length>1){var s=i.view.toScreen(i._activeGraphic.geometry),a=Math.round(e.x-s.x),h=Math.round(e.y-s.y);i._selectedGraphics.forEach(function(e,t){if(e!==i._activeGraphic){var r=i.view.toScreen(e.geometry);i._updateGraphic(e,i.view.toMap(r.x+a,r.y+h))}})}i._updateGraphic(i._activeGraphic,o),"start"===e.action?t.onMoveStart(new v(i.vertices,i.graphics,n,e,r.screenPoint)):"end"===e.action?t.onMoveStop(new u(i.vertices,i.graphics,n,e,r.screenPoint)):t.onMove(new d(i.vertices,i.graphics,n,e,r.screenPoint))}})},r([a.property()],t.prototype,"view",void 0),r([a.property()],t.prototype,"layer",void 0),r([a.property()],t.prototype,"graphics",void 0),r([a.property()],t.prototype,"pointSymbol",void 0),r([a.property()],t.prototype,"pointHoverSymbol",void 0),r([a.property()],t.prototype,"selectedPointSymbol",void 0),r([a.property()],t.prototype,"vertices",void 0),t=r([a.subclass("esri.views.2d.VertexMover")],t)}(a.declared(c))});