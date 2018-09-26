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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Handles","../../../core/Logger","../../../core/promiseUtils","../../../core/accessorSupport/decorators","../../../geometry/Extent","../../../geometry/support/aaBoundingRect","./LayerView3D","./support/overlayImageUtils","./support/projectExtentUtils","../lib/gl-matrix","../support/debugFlags","../webgl-engine/Stage","../webgl-engine/lib/RenderGeometry","../webgl-engine/lib/Texture","../webgl-engine/materials/DefaultMaterial","../../layers/RefreshableLayerView"],function(e,t,r,i,a,n,o,s,l,d,h,p,g,c,u,m,y,f,_,v){var x=n.getLogger("esri.views.3d.layers.DynamicLayerView3D"),w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.supportsDraping=!0,t.hasDraped=!0,t.fullExtentInLocalViewSpatialReference=null,t.overlayUpdating=!1,t.maximumDataResolution=null,t._handles=new a,t._images=[],t._extents=[],t}return r(t,e),Object.defineProperty(t.prototype,"drawingOrder",{get:function(){return this._get("drawingOrder")},set:function(e){if(e!==this._get("drawingOrder")){this._set("drawingOrder",e);var t=new Set;this._images.forEach(function(r){r&&r.material&&(r.material.renderPriority=e,t.add(r.material.id))}),t.size>0&&(this.view._stage.getDrapedTextureRenderer().updateRenderOrder(t),this.emit("draped-data-change"))}},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.drawingOrder=this.view.getDrawingOrder(this.layer.uid),this.addResolvingPromise(g.toViewIfLocal(this).then(function(t){return e._set("fullExtentInLocalViewSpatialReference",t)})),this._handles.add(this.watch("suspended",function(){return e._suspendedChangeHandler()}));var t=this.notifyChange.bind(this,"suspended");this._handles.add(this.view.resourceController.registerIdleFrameWorker({idleBegin:function(){e._isScaleRangeActive()&&t()}})),this._isScaleRangeLayer()&&this._handles.add([this.layer.watch("minScale",t),this.layer.watch("maxScale",t)],"layer"),this._handles.add([this.watch("fullOpacity",this._opacityChangeHandler.bind(this)),this.layer.on("redraw",this._layerRedrawHandler.bind(this))],"layer")},t.prototype.destroy=function(){this.clear(),this._handles.destroy()},t.prototype.setDrapingExtent=function(e,t,r,i,a){var n=this._extentAndSizeAtResolution(t,r,i),o=n.size,s=n.extent;if("imageMaxWidth"in this.layer||"imageMaxHeight"in this.layer){var l=this.layer.imageMaxWidth,h=this.layer.imageMaxHeight;o.width>l&&(o.height=Math.floor(o.height*l/o.width),o.width=l),o.height>h&&(o.width=Math.floor(o.width*h/o.height),o.height=h)}var p=this._extents[e];p&&d.equals(p.extent,s)&&!this._imageSizeDiffers(s,r,p.imageSize,o)||(this._extents[e]={extent:d.create(s),spatialReference:r,imageSize:o,renderLocalOrigin:a},this.suspended||this._fetch(e))},t.prototype.getGraphicFromGraphicUid=function(e){return o.reject()},t.prototype.clear=function(){for(var e=0;e<this._images.length;e++)this._clearImage(e)},t.prototype.doRefresh=function(){this.suspended||this.refetch()},t.prototype.canResume=function(){if(!this.inherited(arguments))return!1;if(this._isScaleRangeLayer()){var e=this.layer,t=e.minScale,r=e.maxScale;if(t>0||r>0){var i=this.view.scale;if(i<r||t>0&&i>t)return!1}}return!0},t.prototype.isUpdating=function(){if(this.overlayUpdating)return!0;for(var e=0,t=this._images;e<t.length;e++){if(t[e].loadingPromise)return!0}return!1},t.prototype.processResult=function(e,t){(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement)&&(e.image=t)},t.prototype.updateImage=function(e){return!1},t.prototype.refetch=function(){for(var e=0;e<this._extents.length;e++)this._extents[e]&&this._fetch(e)},t.prototype.beforeFetch=function(){},t.prototype.findExtentInfoAt=function(e){for(var t=0,r=this._extents;t<r.length;t++){var i=r[t],a=i.extent;if(new l(a[0],a[1],a[2],a[3],i.spatialReference).contains(e))return i}return null},t.prototype._imageSizeDiffers=function(e,t,r,i){if(!this.maximumDataResolution)return!0;if(u.TESTS_DISABLE_UPDATE_THROTTLE_THRESHOLDS)return!0;var a=d.width(e)/this.maximumDataResolution.x,n=d.height(e)/this.maximumDataResolution.y,o=a/r.width,s=n/r.height,l=a/i.width,h=n/i.height,p=Math.abs(o-l),g=Math.abs(s-h);return p>1.5||g>1.5},t.prototype._fetch=function(e){var t=this;if(!this.suspended){this.beforeFetch();var r=this._extents[e],i=r.extent,a=new l(i[0],i[1],i[2],i[3],r.spatialReference);this._images[e]||(this._images[e]={texture:null,material:null,rendergeometry:null,loadingPromise:null,image:null,pixelData:null,renderExtent:d.create(i)});var n=this._images[e];if(n.loadingPromise&&n.loadingPromise.cancel(),0===a.width||0===a.height)return void this._clearImage(e);n.loadingPromise=this.layer.fetchImage(a,r.imageSize.width,r.imageSize.height,{requestAsImageElement:!0}),n.loadingPromise.then(function(r){d.set(n.renderExtent,i),t.processResult(n,r),t._createStageObjects(e,n.image),0===e&&t._images[1]&&t._images[1].rendergeometry&&t._createStageObjects(1,null),t.notifyChange("updating"),t.emit("draped-data-change")}).catch(function(e){e&&"CancelError"!==e.name&&"cancel"!==e.dojoType&&x.error(e),t.notifyChange("updating")}).always(function(){n.loadingPromise=null}),this.notifyChange("updating")}},t.prototype._clearImage=function(e){var t=this._images[e],r=this.view._stage;t&&(t.rendergeometry&&(r.getDrapedTextureRenderer().removeRenderGeometries([t.rendergeometry]),t.rendergeometry=null),t.texture&&(r.remove(m.ModelContentType.TEXTURE,t.texture.id),t.texture=null),t.material&&(r.remove(m.ModelContentType.MATERIAL,t.material.id),t.material=null),t.loadingPromise&&(t.loadingPromise.cancel(),t.loadingPromise=null),t.image=null,t.pixelData=null)},t.prototype._createStageObjects=function(e,t){var r=this.view._stage,i=r.getDrapedTextureRenderer(),a=this._images[e];t&&(a.texture&&r.remove(m.ModelContentType.TEXTURE,a.texture.id),a.texture=new f(t,"dynamicLayer",{width:t.width,height:t.height,wrapClamp:!0}),r.add(m.ModelContentType.TEXTURE,a.texture)),a.material?t&&a.material.setParameterValues({textureId:a.texture.id}):(a.material=new _({ambient:[1,1,1],diffuse:[0,0,0],transparent:!0,opacity:this.fullOpacity,textureId:a.texture.id,receiveSSAO:!1},"dynamicLayer"),a.material.renderPriority=this.drawingOrder,r.add(m.ModelContentType.MATERIAL,a.material));var n,o=this._extents[e].renderLocalOrigin;if(0===e)n=p.createGeometryForExtent(a.renderExtent,-1);else{if(1!==e)return void console.error("DynamicLayerView3D._createStageObjects: Invalid extent idx");var s=this._images[0].renderExtent;if(!s)return;n=p.createOuterImageGeometry(s,a.renderExtent,-1)}var l=new y(n);l.material=a.material,l.origin=o,l.transformation=c.mat4d.identity(),l.name="dynamicLayer",l.uniqueName="dynamicLayer#"+n.id,i.addRenderGeometries([l]),a.rendergeometry&&i.removeRenderGeometries([a.rendergeometry]),a.rendergeometry=l},t.prototype._isScaleRangeLayer=function(){return"minScale"in this.layer&&"maxScale"in this.layer},t.prototype._isScaleRangeActive=function(){return!!this._isScaleRangeLayer()&&(this.layer.minScale>0||this.layer.maxScale>0)},t.prototype._extentAndSizeAtResolution=function(e,t,r){var i=d.width(e)/d.height(e),a={width:r,height:r};i>1.0001?a.height=r/i:i<.9999&&(a.width=r*i);var n=this._clippedExtent(e,t,S);return a.width=Math.round(a.width/(d.width(e)/d.width(n))),a.height=Math.round(a.height/(d.height(e)/d.height(n))),{size:a,extent:n}},t.prototype._clippedExtent=function(e,t,r){if("local"!==this.view.viewingMode)return d.set(r,e);var i=this.view.basemapTerrain,a=i.extent;return i.ready&&a?d.intersection(e,a,r):d.set(r,e)},t.prototype._opacityChangeHandler=function(e){for(var t=0,r=this._images;t<r.length;t++){var i=r[t];i&&i.material&&i.material.setParameterValues({opacity:e})}this.emit("draped-data-change")},t.prototype._layerRedrawHandler=function(){for(var e=!1,t=0;t<this._images.length;t++){var r=this._images[t];this.updateImage(r)&&(e=!0,this._createStageObjects(t,r.image))}e&&this.emit("draped-data-change")},t.prototype._suspendedChangeHandler=function(){if(this.suspended)this.clear(),this.emit("draped-data-change");else for(var e=0;e<this._extents.length;e++)this._fetch(e)},i([s.property()],t.prototype,"layer",void 0),i([s.property({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],t.prototype,"suspended",void 0),i([s.property({type:Boolean})],t.prototype,"supportsDraping",void 0),i([s.property({type:Boolean})],t.prototype,"hasDraped",void 0),i([s.property({value:0,type:Number})],t.prototype,"drawingOrder",null),i([s.property({readOnly:!0})],t.prototype,"fullExtentInLocalViewSpatialReference",void 0),i([s.property()],t.prototype,"overlayUpdating",void 0),i([s.property({dependsOn:["overlayUpdating"]})],t.prototype,"updating",void 0),t=i([s.subclass("esri.views.3d.layers.DynamicLayerView3D")],t)}(s.declared(h,v)),S=d.create();return w});