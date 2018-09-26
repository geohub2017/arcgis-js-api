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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","dojo/Deferred","../../../../geometry","../../../../renderers","../../../../symbols","../../../../core/Accessor","../../../../core/arrayUtils","../../../../core/Error","../../../../core/Handles","../../../../core/iteratorUtils","../../../../core/Logger","../../../../core/ObjectPool","../../../../core/PooledArray","../../../../core/promiseUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/aaBoundingBox","../../../../geometry/support/aaBoundingRect","../../../../layers/Layer","../../../../layers/graphics/dehydratedFeatures","../../../../renderers/support/diffUtils","../../../../renderers/support/rendererConversion","../../../../symbols/support/symbolConversion","./ElevationQuery","./featureExpressionInfoUtils","./Graphics3DGraphic","./Graphics3DOwner","./Graphics3DSymbolFactory","./Graphics3DWebStyleSymbol","./graphicUtils","../../lib/gl-matrix","../../support/mathUtils","../../support/projectionUtils","../../support/PropertiesPool","../../webgl-engine/Stage","../../webgl-engine/lib/FloatingBoxLocalOriginFactory","../../webgl-engine/lib/Layer"],function(e,t,i,r,a,s,n,o,l,h,p,d,c,y,u,g,b,m,f,v,w,S,x,C,G,D,O,U,V,E,I,P,R,F,L,_,A,B,z,W,T,q){var j=new o.Point,N=_.vec3d.create(),k=S.create(),H=g.getLogger("esri.views.3d.layers.graphics.Graphics3DCore"),M=function(e){function t(t){var i=e.call(this)||this;return i.propertiesPool=new z.PropertiesPool({computedExtent:o.Extent},i),i.computedExtent=null,i.symbolCreationContext=new P.Graphics3DSymbolCreationContext,i.graphics={},i.stageLayer=null,i.stage=null,i.graphicsDrapedUids={},i.graphicsBySymbol={},i.graphicsKeys=[],i.symbols={},i.graphicsWithoutSymbol={},i.graphicsWaitingForSymbol=new Set,i.lastFastUpdate=null,i.handles=new y,i.viewSR=null,i.elevationAlignment=null,i.scaleVisibility=null,i.spatialIndex=null,i.labeling=null,i.highlights=null,i.viewElevationProvider=null,i.sharedSymbolResourcesOwnerHandle=null,i.whenGraphics3DGraphicRequests={},i.pendingUpdates=new Map,i.pendingUpdatesPool=new m({initialSize:2e3,allocator:function(){return{add:null,remove:null}},deallocator:function(e){e.add=null,e.remove=null}}),i.symbolWarningLogged=!1,i.geometryWarningLogged=!1,i.asyncUpdates=!1,i.elevationFeatureExpressionEnabled=!0,i.owner=null,i.layer=null,i.hasDraped=!1,i.graphicSymbolSupported=!0,i.minTotalNumberOfFeatures=2e3,i.numberOfGraphics=0,i._visible=void 0,i._startCreateGraphics=!1,i}i(t,e),p=t,Object.defineProperty(t.prototype,"updating",{get:function(){return!!(this.graphicsWaitingForSymbol.size>0||this.needsIdleUpdate()||this.elevationAlignment&&this.elevationAlignment.updating||this.scaleVisibility&&this.scaleVisibility.updating)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxNumberOfFeatures",{get:function(){var e=Math.ceil((this.maxTotalNumberOfVertices||1)/this.maxSymbolNumberOfVertices);return A.clamp(e,this.minTotalNumberOfFeatures,this.maxTotalNumberOfFeatures||1)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxSymbolNumberOfVertices",{get:function(){var e=0;for(var t in this.symbols){var i=this.symbols[t];i&&(e=Math.max(e,i.numberOfVertices))}return 0===e?this._get("maxSymbolNumberOfVertices")||1:e},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){this.viewSR=this.owner.view.spatialReference},t.prototype.setup=function(e){var t=this;this._set("elevationAlignment",e.elevationAlignment),this._set("scaleVisibility",e.scaleVisibility),this._set("spatialIndex",e.spatialIndex),this._set("labeling",e.labeling),this._set("highlights",e.highlights);var i=this.owner.view;this.viewElevationProvider=new V.ViewElevationProvider(this.viewSR,i),this.initializeStage(i,this.layer.uid),this.symbolCreationContext.sharedResources=i.sharedSymbolResources,this.sharedSymbolResourcesOwnerHandle=i.sharedSymbolResources.addGraphicsOwner(this.owner),this.symbolCreationContext.renderer=this.layer.renderer,this.symbolCreationContext.stage=this.stage,this.symbolCreationContext.streamDataSupplier=i.sharedSymbolResources.streamDataSupplier,this.symbolCreationContext.renderSpatialReference=i.renderSpatialReference,this.symbolCreationContext.renderCoordsHelper=i.renderCoordsHelper,this.symbolCreationContext.layer=this.layer,this.symbolCreationContext.layerView=this.owner,this.symbolCreationContext.layerOrder=0,this.symbolCreationContext.localOriginFactory=p.createLocalOriginFactory(),this.symbolCreationContext.elevationProvider=i.elevationProvider;var r=E.extractExpressionInfo(this.layer.elevationInfo,this.elevationFeatureExpressionEnabled);this.symbolCreationContext.featureExpressionInfoContext=E.createContext(r,this.viewSR,H),i.deconflictor.addGraphicsOwner(this),this.symbolCreationContext.screenSizePerspectiveEnabled=i.screenSizePerspectiveEnabled&&this.layer.screenSizePerspectiveEnabled,this.symbolCreationContext.slicePlaneEnabled=!!this.owner.slicePlaneEnabled,this.handles.add(this.owner.watch("suspended",function(){return t.updateLayerVisibility()}));var a="layer"in this.owner?["layer.screenSizePerspectiveEnabled,view.screenSizePerspectiveEnabled"]:"view.screenSizePerspectiveEnabled";this.handles.add([this.owner.watch(a,function(){var e=i.screenSizePerspectiveEnabled&&t.layer.screenSizePerspectiveEnabled;e!==t.symbolCreationContext.screenSizePerspectiveEnabled&&(t.symbolCreationContext.screenSizePerspectiveEnabled=e,t.recreateAllGraphics())}),this.owner.watch("slicePlaneEnabled",function(e){var i=!!e;i!==t.symbolCreationContext.slicePlaneEnabled&&(t.symbolCreationContext.slicePlaneEnabled=i,t.recreateAllGraphics())})]),this.handles.add(v.when(i.basemapTerrain,"tilingScheme",function(e){e.spatialReference.equals(t.symbolCreationContext.overlaySR)||(t.symbolCreationContext.overlaySR=t.basemapTerrain.spatialReference),t.handles.has("loaded-graphics")?t.recreateAllGraphics():t.handles.add(v.on(t.owner,"loadedGraphics","change",function(e){return t.graphicsCollectionChanged(e)},function(){return t.recreateAllGraphics()}),"loaded-graphics")})),this.validateRenderer(this.layer.renderer)},t.prototype.destroy=function(){this.owner.view.deconflictor.removeGraphicsOwner(this),this.owner.view.labeler.removeGraphicsOwner(this),this.clear(),this.stage&&(this.stage.removeFromViewContent([this.stageLayer.id]),this.stage.remove(W.ModelContentType.LAYER,this.stageLayer.id),this.stageLayer=null,this.stage=null),this.handles.destroy(),this.handles=null,this.viewSR=null,this._set("owner",null);for(var e in this.whenGraphics3DGraphicRequests)this.whenGraphics3DGraphicRequests[e].reject(new c("graphic:layer-destroyed","Layer has been destroyed"));this.whenGraphics3DGraphicRequests=null,this.sharedSymbolResourcesOwnerHandle&&(this.sharedSymbolResourcesOwnerHandle.remove(),this.sharedSymbolResourcesOwnerHandle=null),this.propertiesPool&&(this.propertiesPool.destroy(),this.propertiesPool=null),this.pendingUpdatesPool=null},t.prototype.clear=function(){for(var e in this.graphics){this.graphics[e].destroy()}this.spatialIndex&&this.spatialIndex.clear(),this.graphics={},this.graphicsKeys=null,this.numberOfGraphics=0,this.updateLayerVisibility();for(var t in this.symbols){var i=this.symbols[t];i&&i.destroy()}this.symbols={},this.graphicsBySymbol={},this.graphicsWithoutSymbol={},this.graphicsWaitingForSymbol.clear(),this.pendingUpdates.clear(),this.pendingUpdatesPool.clear(),this._set("hasDraped",!1),this.notifyChange("updating")},t.prototype.initializeStage=function(e,t){this.stage=e._stage,this.stageLayer=new q(t,{isPickable:!this.owner.suspended},t),this.stage.add(W.ModelContentType.LAYER,this.stageLayer),this.stage.addToViewContent([this.stageLayer.id])},t.prototype.setDrawingOrder=function(e){this.symbolCreationContext.layerOrder=e;var t=new Set;for(var i in this.symbols){var r=this.symbols[i];r&&r.setDrawOrder(e,t)}t.size>0&&this.stage.getDrapedTextureRenderer().updateRenderOrder(t)},t.prototype.updateLayerVisibility=function(){var e=!!this.owner.suspended,t=this.numberOfGraphics>this.maxNumberOfFeatures*J,i=!e&&!t;i!==this._visible&&(this._visible=i,i?(this.stageLayer.isPickable=!0,this.updateAllGraphicsVisibility()):(this.stageLayer.isPickable=!1,this.hideAllGraphics()))},Object.defineProperty(t.prototype,"graphics3DGraphics",{get:function(){return this.graphics},enumerable:!0,configurable:!0}),t.prototype.getGraphics3DGraphicById=function(e){return this.graphics[e]},Object.defineProperty(t.prototype,"graphics3DGraphicsKeys",{get:function(){return null===this.graphicsKeys&&(this.graphicsKeys=Object.keys(this.graphics)),this.graphicsKeys},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"labelsEnabled",{get:function(){return!(!this.labeling||!this.labeling.layerLabelsEnabled())},enumerable:!0,configurable:!0}),t.prototype.updateLabelingInfo=function(e){return this.labeling&&this.labeling.labelingInfoChange(e)},t.prototype.updateVisibilityInfo=function(){return this.labeling&&this.labeling.visibilityInfoChange()},Object.defineProperty(t.prototype,"symbolUpdateType",{get:function(){if(this.pendingUpdates.size>0)return"unknown";var e=0,t=0;for(var i in this.symbols){var r=this.symbols[i];if(r){var a=r.getFastUpdateStatus();if(a.loading>0)return"unknown";this.graphicsBySymbol[i]&&(t+=a.fast,e+=a.slow)}}return t>=0&&0===e?"fast":e>=0&&0===t?"slow":"mixed"},enumerable:!0,configurable:!0}),t.prototype.needsIdleUpdate=function(){return this.pendingUpdates.size>0||!!this.lastFastUpdate&&performance.now()-this.lastFastUpdate>500},t.prototype.idleUpdate=function(e){var t=this.needsIdleUpdate();this._applyPendingUpdates(e),!e.done()&&this.lastFastUpdate&&(this.lastFastUpdate=null),t!==this.needsIdleUpdate()&&this.notifyChange("updating")},t.prototype.whenGraphics3DGraphic=function(e){var t=this.graphics[e.uid];if(t)return f.resolve(t);var i=this.whenGraphics3DGraphicRequests[e.uid];return i||(i=new n,this.whenGraphics3DGraphicRequests[e.uid]=i),i.promise},t.prototype.boundsForGraphics3DGraphic=function(e,t){return s(this,void 0,void 0,function(){var i,r,s,n,o,l,h,p,d,c;return a(this,function(a){switch(a.label){case 0:return i=this.owner.view.spatialReference,r=this.owner.view.renderSpatialReference,s=this.owner.view.basemapTerrain.spatialReference,n=function(e,t,a){return B.bufferToBuffer(e,r,t,e,i,t,a)},o=function(e,t,r){return B.bufferToBuffer(e,s,t,e,i,t,r)},l=this.viewElevationProvider?{service:this.viewElevationProvider,useViewElevation:t&&t.useViewElevation,minDemResolution:t&&t.minDemResolution,minDemResolutionForPoints:this.owner.view.resolution}:null,[4,e.getProjectedBoundingBox(n,o,l)];case 1:return(h=a.sent())?(p=h.boundingBox,h.requiresDrapedElevation&&(d=this.symbolCreationContext.elevationProvider)&&(S.center(p,N),j.x=N[0],j.y=N[1],j.z=void 0,j.spatialReference=i,c=d.getElevation(j)||0,p[2]=Math.min(p[2],c),p[5]=Math.max(p[5],c)),[2,{boundingBox:p,screenSpaceObjects:h.screenSpaceObjects}]):[2,null]}})})},t.prototype.whenGraphicBounds=function(e,t){var i=this;return v.whenOnce(this.owner,"loadedGraphics").then(function(){var t=i.owner.layer&&i.owner.layer.objectIdField,r=i.owner.loadedGraphics.find(function(i){return i===e||t&&i.attributes&&e.attributes&&i.attributes[t]===e.attributes[t]});if(r)return i.whenGraphics3DGraphic(r);throw new c("internal:graphic-not-part-of-view","Graphic is not part of this view")}).then(function(e){return i.boundsForGraphics3DGraphic(e,t)})},t.prototype.graphicsCollectionChanged=function(e){this._startCreateGraphics&&(this.add(e.added),this.remove(e.removed))},t.prototype.graphicUpdateHandler=function(e){var t=this.graphics[e.graphic.uid];if(t)switch(e.property){case"visible":this.graphicUpdateVisible(t,e);break;case"geometry":case"attributes":case"symbol":this.recreateGraphic(t)}},t.prototype.graphicUpdateVisible=function(e,t){e.setVisibilityFlag(0,t.newValue)&&this.labeling&&(this.lastFastUpdate=performance.now(),this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty())},t.prototype.recreateGraphic=function(e){var t=e.graphic,i=[t];this.remove(i),this.add(i)},t.prototype.beginGraphicUpdate=function(e,t){this.graphicsWaitingForSymbol.add(e.uid),1===this.graphicsWaitingForSymbol.size&&this.notifyChange("updating"),this._get("symbolsUpdating")||this._set("symbolsUpdating",!0)},t.prototype.endGraphicUpdate=function(e){e&&(this.graphicsWaitingForSymbol.delete(e.uid),0===this.graphicsWaitingForSymbol.size&&this.notifyChange("updating")),this._get("symbolsUpdating")&&0===this.graphicsWaitingForSymbol.size&&(this.owner.view.flushDisplayModifications(),this._set("symbolsUpdating",!1))},t.prototype.expandComputedExtent=function(e){var t=k,i=e.spatialReference;G.computeAABB(e,t);var r=this.viewSR,a=p.tmpVec;if(i.equals(r)||B.xyzToVector(t[0],t[1],0,i,a,r)&&(t[0]=a[0],t[1]=a[1],B.xyzToVector(t[3],t[4],0,i,a,r),t[3]=a[0],t[4]=a[1]),A.isFinite(t[0])&&A.isFinite(t[3])&&A.isFinite(t[1])&&A.isFinite(t[4])){var s=this.computedExtent,n=null,o=A.isFinite(t[2])&&A.isFinite(t[5]),l=o&&(!s||null==s.zmin||t[2]<s.zmin),h=o&&(!s||null==s.zmax||t[5]>s.zmax);if(s){(t[0]<s.xmin||t[1]<s.ymin||t[3]>s.xmax||t[4]>s.ymax||l||h)&&(n=this.propertiesPool.get("computedExtent"),n.xmin=Math.min(t[0],s.xmin),n.ymin=Math.min(t[1],s.ymin),n.xmax=Math.max(t[3],s.xmax),n.ymax=Math.max(t[4],s.ymax),n.spatialReference=r)}else n=this.propertiesPool.get("computedExtent"),n.xmin=t[0],n.ymin=t[1],n.xmax=t[3],n.ymax=t[4],n.spatialReference=r;n&&(l&&(n.zmin=t[2]),h&&(n.zmax=t[5]),this._set("computedExtent",n))}},t.prototype.updateHasDraped=function(){var e=!1;for(var t in this.graphicsDrapedUids)if(this.graphicsDrapedUids.hasOwnProperty(t)){e=!0;break}this._set("hasDraped",e)},t.prototype.elevationInfoChange=function(){var e=E.extractExpressionInfo(this.layer.elevationInfo,this.elevationFeatureExpressionEnabled);this.symbolCreationContext.featureExpressionInfoContext=E.createContext(e,this.viewSR,H),this.labeling&&this.labeling.elevationInfoChange(),this.layer.renderer!==this.symbolCreationContext.renderer&&this.rendererChange(this.layer.renderer);for(var t in this.graphicsBySymbol){var i=this.symbols[t],r=this.graphicsBySymbol[t];if(i&&i.layerPropertyChanged("elevationInfo",r))for(var a in r)for(var s=r[a],n=s.graphic,o=s._labelGraphics,l=0;l<o.length;l++){var h=o[l],p=h.graphics3DSymbolLayer;p.updateGraphicElevationContext(n,h)}else this._recreateSymbol(t)}this.elevationAlignment&&this.elevationAlignment.elevationInfoChange()},t.prototype.clearSymbolsAndGraphics=function(){this.clear(),this.elevationAlignment&&this.elevationAlignment.clear(),this.labeling&&this.labeling.clear(),this.stageLayer&&this.stageLayer.invalidateSpatialQueryAccelerator()},t.prototype.startCreateGraphics=function(){this._startCreateGraphics=!0,this.recreateAllGraphics()},t.prototype.recreateAllGraphics=function(){this._startCreateGraphics&&(this.clearSymbolsAndGraphics(),this._set("computedExtent",null),this.symbolCreationContext.screenSizePerspectiveEnabled=this.owner.view.screenSizePerspectiveEnabled&&this.layer.screenSizePerspectiveEnabled,this.symbolCreationContext.slicePlaneEnabled=!!this.owner.slicePlaneEnabled,this.owner.loadedGraphics&&this.owner.view.basemapTerrain.tilingScheme&&this.add(this.owner.loadedGraphics.toArray()))},t.prototype._recreateSymbol=function(e){var t=this.graphicsBySymbol[e],i=[],r=[];for(var a in t){var s=t[a];s.isDraped()&&delete this.graphicsDrapedUids[a],this.spatialIndex&&i.push(s),r.push(s.graphic),s.destroy(),this.removeGraphics3DGraphic(a),this.updateLayerVisibility()}i.length>0&&this.spatialIndex.removeMany(i),this.graphicsBySymbol[e]={};var n=this.symbols[e];n&&n.destroy(),delete this.symbols[e],this.updateHasDraped(),this.add(r)},t.prototype.add=function(e){if(!this.owner.view.basemapTerrain||!this.owner.view.basemapTerrain.tilingScheme)return void H.error("#add()","Cannot add graphics before terrain surface has been initialized");this.asyncUpdates?this._addDelayed(e):this._addImmediate(e),this.notifyChange("updating")},t.prototype._addImmediate=function(e){var t=this;this.geometryWarningLogged=!1,this.symbolWarningLogged=!1,K.clear();for(var i=0,r=e;i<r.length;i++){var a=r[i];this._startAddGraphic(a,K)}K.forEach(function(e){return t._finishAddGraphics(e)}),K.clear(),this.updateHasDraped(),this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty()},t.prototype._addDelayed=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t],a=r.uid,s=this.pendingUpdates.get(a);if(s)s.add=r;else{var n=this.pendingUpdatesPool.pushNew();n.add=r,this.pendingUpdates.set(a,n)}}},t.prototype.remove=function(e){this.asyncUpdates?this._removeDelayed(e):this._removeImmediate(e),this.notifyChange("updating")},t.prototype._removeImmediate=function(e){for(var t=[],i=0,r=e;i<r.length;i++){var a=r[i],s=this._removeGraphic(a);this.spatialIndex&&s&&t.push(s)}t.length>0&&this.spatialIndex.removeMany(t),this.updateHasDraped(),this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty()},t.prototype._removeDelayed=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t],a=r.uid,s=this.pendingUpdates.get(a);if(s)s.add&&(s.remove?s.add=null:this.pendingUpdates.delete(a));else{var n=this.pendingUpdatesPool.pushNew();n.remove=r,this.pendingUpdates.set(a,n)}}0===this.pendingUpdates.size&&this.pendingUpdatesPool.clear()},t.prototype._applyPendingUpdates=function(e){var t=this;if(!e.done()){this.geometryWarningLogged=!1,this.symbolWarningLogged=!1;var i=0;K.clear(),u.everyMap(this.pendingUpdates,function(r,a){if(e.done())return!1;if(r.remove){var s=t._removeGraphic(r.remove);t.spatialIndex&&s&&t.spatialIndex.remove(s)}r.add&&t._startAddGraphic(r.add,K)&&i++,t.pendingUpdates.delete(a),i>1e3&&(K.forEach(function(e){return t._finishAddGraphics(e)}),K.clear(),i=0)}),K.forEach(function(e){return t._finishAddGraphics(e)}),K.clear(),0===this.pendingUpdates.size&&this.pendingUpdatesPool.clear(),this.updateHasDraped(),this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty()}},t.prototype._startAddGraphic=function(e,t){this.graphicsWithoutSymbol[e.uid]=e;var i=e.geometry;if(!i)return this.geometryWarningLogged||(this.geometryWarningLogged=!0,H.warn("Graphic in layer "+this.layer.id+" has no geometry and will not render")),!1;if(!this.graphicSymbolSupported&&e.symbol)return this.symbolWarningLogged||(this.symbolWarningLogged=!0,H.warn("Graphic in layer "+this.layer.id+" is not allowed to have a symbol, use a renderer instead")),!1;var r=this.owner.getRenderingInfo&&this.owner.getRenderingInfo(e);if(!r||!r.symbol)return this.symbolWarningLogged||(this.symbolWarningLogged=!0,H.warn("Graphic in layer "+this.layer.id+" has no symbol and will not render")),!1;var a=r.symbol,s=this.getOrCreateGraphics3DSymbol(a,r.renderer);if(!s)return!1;var n={graphic:e,renderingInfo:r,layer:this.layer};this.expandComputedExtent(i),this.beginGraphicUpdate(e,s);var o=s.symbol.id,l=t.get(o);if(l)l.graphics.push(n);else{var h=Y.acquire();h.clear(),h.push(n),t.set(o,{asyncSymbol:s,graphics:h})}return!0},t.prototype._finishAddGraphics=function(e){var t=this;e.asyncSymbol.then(function(){Q.clear();for(var i=0;i<e.graphics.length;i++){var r=e.graphics.data[i],a=r.graphic;if(t.graphicsWaitingForSymbol.has(a.uid)){var s=t.createGraphics3DGraphic(e.asyncSymbol,r);t.spatialIndex&&s&&Q.push(s)}t.endGraphicUpdate(a)}Q.length>0&&t.spatialIndex.addMany(Q.data,Q.length),Q.clear(),e.graphics.clear(),Y.release(e.graphics),t.labeling&&(t.lastFastUpdate=performance.now(),t.owner.view.labeler.setDirty())},function(){for(var i=0;i<e.graphics.length;i++)t.endGraphicUpdate(e.graphics.data[i].graphic);e.graphics.clear(),Y.release(e.graphics)})},t.prototype._removeGraphic=function(e){var t=e.uid,i=this.graphics[t];if(i){i.isDraped()&&delete this.graphicsDrapedUids[t];var r=i.graphics3DSymbol.symbol.id;i.destroy(),delete this.graphicsBySymbol[r][t],delete this.graphicsWithoutSymbol[t],this.removeGraphics3DGraphic(t),this.labeling&&this.labeling.removeGraphic(i)}else this.graphicsWaitingForSymbol.delete(t);return i},t.prototype.hasLabelingContext=function(e){if(e instanceof h.LabelSymbol3D||e instanceof h.TextSymbol){var t=this.symbolCreationContext.layer;return!!t.labelingInfo&&t.labelingInfo.some(function(t){return t.symbol===e})}return!1},t.prototype.hasValidSymbolCreationContext=function(e){return!(e instanceof h.LabelSymbol3D&&!this.hasLabelingContext(e))||(H.error("LabelSymbol3D is only valid as part of a LabelClass. Using LabelSymbol3D as a renderer symbol is not supported."),!1)},t.prototype.createGraphics3DSymbol=function(e,t){var i=this;if(!this.hasValidSymbolCreationContext(e))return null;var r=U.to3D(e,!0,!1,this.hasLabelingContext(e));if(r.symbol){var a=void 0;if(t&&"backgroundFillSymbol"in t&&t.backgroundFillSymbol){var s=U.to3D(t.backgroundFillSymbol,!1,!0);s.symbol&&"web-style"!==s.symbol.type&&(a=s.symbol.symbolLayers)}var n=R.make(r.symbol,this.symbolCreationContext,a);return n.then(function(){i.notifyChange("maxSymbolNumberOfVertices")}),n}return r.error&&H.error(r.error.message),null},t.prototype.getOrCreateGraphics3DSymbol=function(e,t){var i=this,r=this.symbols[e.id];return void 0===r&&(r=e instanceof h.WebStyleSymbol?new F(e,function(e){return i.createGraphics3DSymbol(e,t)}):this.createGraphics3DSymbol(e,t),this.symbols[e.id]=r),r},t.prototype.addGraphics3DGraphic=function(e){this.graphics[e.graphic.uid]=e,this.graphicsKeys=null,this.numberOfGraphics++,this.updateLayerVisibility()},t.prototype.removeGraphics3DGraphic=function(e){delete this.graphics3DGraphics[e],this.graphicsKeys=null,this.numberOfGraphics--,this.updateLayerVisibility()},t.prototype.createGraphics3DGraphic=function(e,t){var i=t.graphic;if(delete this.graphicsWithoutSymbol[i.uid],!this.symbols[e.symbol.id])return void this.add([i]);if(!this.graphics[i.uid]){var r=e.createGraphics3DGraphic(t),a=e.symbol.id;this.addGraphics3DGraphic(r),this.graphicsBySymbol[a]||(this.graphicsBySymbol[a]={}),this.graphicsBySymbol[a][i.uid]=r,r.initialize(this.stageLayer,this.stage);r.isDraped()&&(this.graphicsDrapedUids[i.uid]=!0,this._set("hasDraped",!0)),r.centroid=null,"point"!==i.geometry.type&&r instanceof I&&(r.centroid=L.computeCentroid(i.geometry),r.centroid&&L.convertPointSR(r.centroid,this.viewSR));var s=this.scaleVisibility&&this.scaleVisibility.scaleRangeActive();this.labeling&&this.labeling.addGraphic(r),s&&this.scaleVisibility.updateGraphicScaleVisibility(r);var n=!!i.visible&&!this.owner.suspended;r.setVisibilityFlag(0,n),this.owner.view.deconflictor.setInitialIconVisibilityFlag(this.layer,r);var o=this.whenGraphics3DGraphicRequests[i.uid];return o&&(delete this.whenGraphics3DGraphicRequests[i.uid],o.resolve(r)),this.highlights&&this.highlights.graphicCreated(r),r}},t.prototype.rendererChange=function(e){var t=this.symbolCreationContext.renderer;if(e!==t){this.validateRenderer(e);var i=D.diff(t,e);this.updateUnchangedSymbolMappings(i,e,t),this.symbolCreationContext.renderer=e,i&&("complete"===i.type?this.recreateAllGraphics():"partial"===i.type&&(this.applyRendererDiff(i,e,t)?this.volatileGraphicsUpdated():this.recreateAllGraphics()))}},t.prototype.diffHasSymbolChange=function(e){for(var t in e.diff)switch(t){case"visualVariables":case"defaultSymbol":case"uniqueValueInfos":break;case"authoringInfo":case"fieldDelimiter":delete e.diff[t];break;default:return!0}return!1},t.prototype.applySymbolSetDiff=function(e,t,i,r){e=e||[],t=t||[];for(var a=[],s=0;s<t.length;s++){var n=t[s],o=this.graphicsBySymbol[n.id];for(var l in o){var h=o[l],p=h.graphic,d=this.layer instanceof C?this.layer:null;n===i.defaultSymbol&&i.getSymbol(G.hydrateGraphic(p,d))===i.defaultSymbol||(h.isDraped()&&delete this.graphicsDrapedUids[l],e.length||i.defaultSymbol?a.push(p):this.graphicsWithoutSymbol[l]=p,h.destroy(),this.highlights&&this.highlights.graphicDeleted(this.graphics[l]),delete o[l],this.removeGraphics3DGraphic(l),this.updateLayerVisibility())}if(void 0===o||0===Object.keys(o).length){delete this.graphicsBySymbol[n.id];var c=this.symbols[n.id];c&&c.destroy(),delete this.symbols[n.id],this.notifyChange("maxSymbolNumberOfVertices")}}if(e.length||a.length){for(var l in this.graphicsWithoutSymbol)a.push(this.graphicsWithoutSymbol[l]);this.graphicsWithoutSymbol={},this.add(a)}this.updateHasDraped(),this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty()},t.prototype.applyUniqueValueRendererDiff=function(e,t,i){var r=e.diff.defaultSymbol,a=e.diff.uniqueValueInfos;if(r||a){var s=a?a.added.map(function(e){return e.symbol}):[],n=a?a.removed.map(function(e){return e.symbol}):[];if(a)for(var o=0;o<a.changed.length;o++)s.push(a.changed[o].newValue.symbol),n.push(a.changed[o].oldValue.symbol);return r?(i.defaultSymbol&&n.push(i.defaultSymbol),t.defaultSymbol&&s.push(t.defaultSymbol)):i.defaultSymbol&&s.length&&n.push(t.defaultSymbol),this.applySymbolSetDiff(s,n,t,i),delete e.diff.defaultSymbol,delete e.diff.uniqueValueInfos,!0}return!1},t.prototype.calculateUnchangedSymbolMapping=function(e,t,i){if(t instanceof l.UniqueValueRenderer&&i instanceof l.UniqueValueRenderer)if(e){if("partial"===e.type){var r=e.diff,a=r.defaultSymbol,s=r.uniqueValueInfos,n=void 0;return n=s?s.unchanged.map(function(e){return{oldId:e.oldValue.symbol.id,newId:e.newValue.symbol.id}}):i.uniqueValueInfos.map(function(e,i){return{oldId:e.symbol.id,newId:t.uniqueValueInfos[i].symbol.id}}),!a&&i.defaultSymbol&&n.push({oldId:i.defaultSymbol.id,newId:t.defaultSymbol.id}),n}}else if(i&&i.defaultSymbol)return[{oldId:i.defaultSymbol.id,newId:t.defaultSymbol.id}];return[]},t.prototype.updateUnchangedSymbolMappings=function(e,t,i){for(var r=this.calculateUnchangedSymbolMapping(e,t,i),a=0,s=r;a<s.length;a++){var n=s[a],o=n.oldId,l=n.newId;if(o&&o!==l){var h=this.graphicsBySymbol[o];delete this.graphicsBySymbol[o],void 0!==h&&(this.graphicsBySymbol[l]=h);var p=this.symbols[o];delete this.symbols[o],void 0!==p&&(this.symbols[l]=p,p.symbol.id=l)}}},t.prototype.applyRendererDiff=function(e,t,i){if(this.diffHasSymbolChange(e))return!1;if(t instanceof l.UniqueValueRenderer&&i instanceof l.UniqueValueRenderer&&this.applyUniqueValueRendererDiff(e,t,i)&&0===Object.keys(e.diff).length)return!0;for(var r in this.graphicsBySymbol){var a=this.symbols[r];if(a){var s=this.graphicsBySymbol[r];if(!a.applyRendererDiff(e,t,s))return!1}}return!0},t.prototype.opacityChange=function(){for(var e in this.graphicsBySymbol){var t=this.symbols[e];t&&t.layerPropertyChanged("opacity")}},t.prototype.setClippingExtent=function(e,t){var i=this.symbolCreationContext.clippingExtent,r=x.create();return B.extentToBoundingRect(e,r,t)?this.symbolCreationContext.clippingExtent=[r[0],r[1],-1/0,r[2],r[3],1/0]:this.symbolCreationContext.clippingExtent=null,!d.equals(this.symbolCreationContext.clippingExtent,i)},t.prototype.forEachGraphics3DGraphic=function(e){var t=this;if(this.owner.loadedGraphics){var i=!1;this.owner.loadedGraphics.forEach(function(r){var a=t.getGraphics3DGraphicById(r.uid);if(a){e(a,r)&&(i=!0)}}),i&&(this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty())}},t.prototype.updateAllGraphicsVisibility=function(){var e=this;this.forEachGraphics3DGraphic(function(t,i){var r=t.setVisibilityFlag(0,i.visible),a=!1;return e.scaleVisibility&&(a=e.scaleVisibility.updateGraphicScaleVisibility(t)),r||a})},t.prototype.hideAllGraphics=function(){this.forEachGraphics3DGraphic(function(e){return e.setVisibilityFlag(0,!1)})},t.prototype.validateRenderer=function(e){var t=O.validateTo3D(e);if(t){var i="Renderer for layer '"+(this.layer.title?this.layer.title+", ":"")+", id:"+this.layer.id+"' is not supported in a SceneView";H.warn(i,t.message)}},t.prototype.volatileGraphicsUpdated=function(){this.labeling&&(this.lastFastUpdate=performance.now(),this.labeling.clear()),this.stageLayer.invalidateSpatialQueryAccelerator(),this.stageLayer.shaderTransformationChanged(),this.notifyChange("updating")},t.createLocalOriginFactory=function(){return new T(5e6,16)},t.prototype.snapshotInternals=function(){var e=this;return{graphics:Object.keys(this.graphics).sort(),symbols:Object.keys(this.symbols).sort(),graphicsBySymbol:Object.keys(this.graphicsBySymbol).sort().map(function(t){return{symbolId:t,graphics:Object.keys(e.graphicsBySymbol[t]).sort()}}),graphicsWithoutSymbol:Object.keys(this.graphicsWithoutSymbol).sort(),graphicsDrapedUids:Object.keys(this.graphicsDrapedUids).sort(),pendingUpdates:this.pendingUpdates}};var p;return t.tmpVec=_.vec3d.create(),r([w.property({readOnly:!0})],t.prototype,"computedExtent",void 0),r([w.property({readOnly:!0})],t.prototype,"elevationAlignment",void 0),r([w.property({readOnly:!0})],t.prototype,"scaleVisibility",void 0),r([w.property({readOnly:!0})],t.prototype,"spatialIndex",void 0),r([w.property({readOnly:!0})],t.prototype,"labeling",void 0),r([w.property({readOnly:!0})],t.prototype,"highlights",void 0),r([w.property()],t.prototype,"asyncUpdates",void 0),r([w.property({constructOnly:!0})],t.prototype,"elevationFeatureExpressionEnabled",void 0),r([w.property({constructOnly:!0})],t.prototype,"owner",void 0),r([w.property({constructOnly:!0})],t.prototype,"layer",void 0),r([w.property({constructOnly:!0})],t.prototype,"basemapTerrain",void 0),r([w.property({readOnly:!0})],t.prototype,"hasDraped",void 0),r([w.property({readOnly:!0})],t.prototype,"symbolsUpdating",void 0),r([w.property({constructOnly:!0})],t.prototype,"graphicSymbolSupported",void 0),r([w.property({readOnly:!0,dependsOn:["elevationAlignment.updating","scaleVisibility.updating"]})],t.prototype,"updating",null),r([w.property({aliasOf:"owner.view.qualitySettings.graphics3D.maxTotalNumberOfVertices"})],t.prototype,"maxTotalNumberOfVertices",void 0),r([w.property({aliasOf:"owner.view.qualitySettings.graphics3D.maxTotalNumberOfFeatures"})],t.prototype,"maxTotalNumberOfFeatures",void 0),r([w.property()],t.prototype,"minTotalNumberOfFeatures",void 0),r([w.property({readOnly:!0,dependsOn:["maxSymbolNumberOfVertices","maxTotalNumberOfVertices","minTotalNumberOfFeatures","maxTotalNumberOfFeatures"]})],t.prototype,"maxNumberOfFeatures",null),r([w.property({readOnly:!0})],t.prototype,"maxSymbolNumberOfVertices",null),t=p=r([w.subclass("esri.views.3d.layers.graphics.Graphics3DCore")],t)}(w.declared(p)),K=new Map,Q=new m,Y=new b(m),J=(function(){function e(){this.add=null,this.remove=null}}(),10);return M});