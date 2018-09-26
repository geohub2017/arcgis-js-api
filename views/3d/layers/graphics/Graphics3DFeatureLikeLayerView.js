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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../Graphic","../../../../core/Accessor","../../../../core/Handles","../../../../core/promiseUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/webMercatorUtils","../../../../tasks/support/Query","./constants","./Graphics3DCore","./Graphics3DElevationAlignment","./Graphics3DFrustumVisibility","./Graphics3DHighlights","./Graphics3DScaleVisibility","./Graphics3DSpatialIndex","./graphicUtils","../support/attributeUtils"],function(e,t,i,s,n,r,a,l,p,o,h,u,d,c,y,g,f,b,m,v,x){var E=function(e){function t(t){var i=e.call(this)||this;return i._handles=new a,i.highlights=new f,i.suspendResumeExtentMode="computed",i.dataExtent=null,i.suspendResumeExtent=null,i}return i(t,e),Object.defineProperty(t.prototype,"suspended",{get:function(){return this.scaleVisibility&&this.scaleVisibility.suspended||this.frustumVisibility&&this.frustumVisibility.suspended},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return!!(this.graphicsCore&&this.graphicsCore.updating||this.frustumVisibility&&this.frustumVisibility.updating||this.scaleVisibility&&this.scaleVisibility.updating)},enumerable:!0,configurable:!0}),t.prototype.normalizeCtorArgs=function(e){var t=!e.queryGraphicUIDsInExtent&&(e.scaleVisibilityEnabled||e.elevationAlignmentEnabled),i=t?new m({spatialReference:e.owner.view.spatialReference}):null,s=e.frustumVisibilityEnabled?new g:null,n=e.scaleVisibilityEnabled?new b:null,r=e.elevationAlignmentEnabled?new y:null,a=new c({owner:e.owner,layer:e.layer,asyncUpdates:e.asyncGraphicsUpdates,basemapTerrain:e.owner.view.basemapTerrain,elevationFeatureExpressionEnabled:e.elevationFeatureExpressionEnabled,graphicSymbolSupported:!1}),l=e.updateClippingExtent,p=e.queryGraphicUIDsInExtent,o=e.suspendResumeExtentMode,h=e.dataExtent,u=function(e,t,s){return i.queryGraphicUIDsInExtent(e,t,s)};return{graphicsCore:a,frustumVisibility:s,scaleVisibility:n,elevationAlignment:r,spatialIndex:i,updateClippingExtent:l,suspendResumeExtentMode:o,dataExtent:h,queryGraphicUIDsInExtent:p||u}},t.prototype.initialize=function(){var e=this;this.scaleVisibility&&this._handles.add(this.layer.watch(["minScale","maxScale"],function(){return e.scaleVisibility.layerMinMaxScaleChangeHandler()})),this.elevationAlignment&&this._handles.add(this.layer.watch("elevationInfo",function(){return e.graphicsCore.elevationInfoChange()})),this.graphicsCore&&(this._handles.add(this.layer.watch("labelsVisible",function(){return e.graphicsCore.updateVisibilityInfo()})),this._handles.add(this.layer.watch("labelingInfo",function(){return e.graphicsCore.updateLabelingInfo()}))),this.idleClients=[this.frustumVisibility,this.scaleVisibility,this.elevationAlignment,this.graphicsCore]},t.prototype.setup=function(){var e=this;this.frustumVisibility&&this.frustumVisibility.setup(this.owner);var t=this.owner.view.basemapTerrain,i=this.owner.view.elevationProvider;return this.scaleVisibility&&this.scaleVisibility.setup(this.owner,this.layer,this.queryGraphicUIDsInExtent,this.graphicsCore,t),this.elevationAlignment&&this.elevationAlignment.setup(this.owner,this.queryGraphicUIDsInExtent,this.graphicsCore,i),this.highlights&&this.highlights.setup(this.graphicsCore),this._set("labeling",this.owner.view.labeler.addGraphicsOwner(this.graphicsCore,this.scaleVisibility,this.spatialIndex)),this.graphicsCore.setup({elevationAlignment:this.elevationAlignment,scaleVisibility:this.scaleVisibility,spatialIndex:this.spatialIndex,labeling:this.labeling,highlights:this.highlights}),this._handles.add([this.layer.watch("renderer",function(t){return e.graphicsCore.rendererChange(t)}),this.owner.watch("fullOpacity",function(){return e.graphicsCore.opacityChange()})]),this._handles.add(this.layer.on("graphic-update",function(t){return e.graphicsCore.graphicUpdateHandler(t)})),this.setupSuspendResumeExtent(),this._handles.add(this.owner.view.resourceController.registerIdleFrameWorker({needsUpdate:function(){return e.needsIdleUpdate()},idleFrame:function(t){return e.idleUpdate(t)}})),this.updateClippingExtent&&(this._handles.add(this.owner.view.watch("clippingArea",function(){return e._updateClippingExtent()})),this._updateClippingExtent()),this.graphicsCore.startCreateGraphics(),this.graphicsCore.labelsEnabled?this.graphicsCore.updateLabelingInfo():l.resolve()},t.prototype.destroy=function(){this._handles&&(this._handles.destroy(),this._handles=null),this.frustumVisibility&&(this.frustumVisibility.destroy(),this._set("frustumVisibility",null)),this.scaleVisibility&&(this.scaleVisibility.destroy(),this._set("scaleVisibility",null)),this.elevationAlignment&&(this.elevationAlignment.destroy(),this._set("elevationAlignment",null)),this.graphicsCore&&(this.graphicsCore.destroy(),this._set("graphicsCore",null)),this.spatialIndex&&(this.spatialIndex.destroy(),this._set("spatialIndex",null)),this.highlights&&(this.highlights.destroy(),this._set("highlights",null)),this._set("layer",null),this._set("owner",null)},t.prototype.highlight=function(e,t,i){var s=this;if(e instanceof u){var r=this.highlights.acquireSet(t,i),a=r.set,l=r.handle;return this.owner.queryObjectIds(e).then(function(e){return s.highlights.setObjectIds(a,e)}),l}if("number"==typeof e)return this.highlight([e],t,i);if(e instanceof n)return this.highlight([e],t,i);if("toArray"in e&&(e=e.toArray()),Array.isArray(e)&&e.length>0){if(e[0]instanceof n){var p=e;if(!i||!p[0].attributes||null===x.attributeLookup(p[0].attributes,i)){var o=p.map(function(e){return e.uid}),h=this.highlights.acquireSet(t,null),d=h.set,l=h.handle;return this.highlights.setUids(d,o),l}e=p.map(function(e){return x.attributeLookup(e.attributes,i)})}if("number"==typeof e[0]){var c=e,y=this.highlights.acquireSet(t,i),d=y.set,l=y.handle;return this.highlights.setObjectIds(d,c),l}}return{remove:function(){}}},t.prototype.needsIdleUpdate=function(){for(var e=0,t=this.idleClients;e<t.length;e++){var i=t[e];if(i&&i.needsIdleUpdate())return!0}return!1},t.prototype.idleUpdate=function(e){for(var t=0,i=this.idleClients;t<i.length;t++){var s=i[t];s&&s.idleUpdate(e)}},t.prototype._updateClippingExtent=function(){var e=this.owner.view.clippingArea;this.graphicsCore.setClippingExtent(e,this.owner.view.spatialReference)&&(this.updateClippingExtent(e)||this.graphicsCore.recreateAllGraphics())},t.prototype.setupSuspendResumeExtent=function(){var e=this;(this.frustumVisibility||this.scaleVisibility)&&this._handles.add(p.init(this,"suspendResumeExtentMode",function(t){switch(e._handles.remove(C),e.suspendResumeExtentMode){case"computed":e._handles.add(p.init(e.graphicsCore,"computedExtent",function(t){return e.updateSuspendResumeExtent(t)}),C);break;case"data":e._handles.add(p.init(e,"dataExtent",function(t){return e.updateSuspendResumeExtent(t)}),C);break;default:e.suspendResumeExtentMode}}))},t.prototype.updateSuspendResumeExtent=function(e){e?this.suspendResumeExtentChanged(this.extentToSuspendResumeRect(e,this.suspendResumeExtent)):this.suspendResumeExtentChanged(null)},t.prototype.extentToSuspendResumeRect=function(e,t){var i=this.owner.view.spatialReference;if(!e.spatialReference.equals(i)){if(!h.canProject(e,i))return;e=h.project(e,i)}return v.enlargeExtent(e,t,d.SUSPEND_RESUME_EXTENT_OPTIMISM)},t.prototype.suspendResumeExtentChanged=function(e){this.frustumVisibility&&this.frustumVisibility.setExtent(e),this.scaleVisibility&&this.scaleVisibility.setExtent(e)},s([o.property({aliasOf:"graphicsCore.layer"})],t.prototype,"layer",void 0),s([o.property({aliasOf:"graphicsCore.owner"})],t.prototype,"owner",void 0),s([o.property({constructOnly:!0})],t.prototype,"updateClippingExtent",void 0),s([o.property({constructOnly:!0})],t.prototype,"queryGraphicUIDsInExtent",void 0),s([o.property({constructOnly:!0})],t.prototype,"graphicsCore",void 0),s([o.property({constructOnly:!0})],t.prototype,"spatialIndex",void 0),s([o.property({constructOnly:!0})],t.prototype,"scaleVisibility",void 0),s([o.property({constructOnly:!0})],t.prototype,"elevationAlignment",void 0),s([o.property({constructOnly:!0})],t.prototype,"frustumVisibility",void 0),s([o.property({readOnly:!0})],t.prototype,"labeling",void 0),s([o.property({readOnly:!0})],t.prototype,"highlights",void 0),s([o.property()],t.prototype,"suspendResumeExtentMode",void 0),s([o.property()],t.prototype,"dataExtent",void 0),s([o.property({readOnly:!0,dependsOn:["scaleVisibility.suspended","frustumVisibility.suspended"]})],t.prototype,"suspended",null),s([o.property({readOnly:!0,dependsOn:["graphicsCore.updating","frustumVisibility.updating","scaleVisibility.updating"]})],t.prototype,"updating",null),t=s([o.subclass("esri.views.3d.layers.graphics.Graphics3DFeatureLikeLayerView")],t)}(o.declared(r)),C="suspendResumeExtentMode";return E});