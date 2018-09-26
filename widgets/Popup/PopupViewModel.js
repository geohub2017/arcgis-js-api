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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/assignHelper","../../core/Collection","../../core/Error","../../core/Handles","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/Point","../../geometry/support/webMercatorUtils","../../support/actions/ActionBase","../../support/actions/ActionButton","../../support/actions/ActionToggle","../../views/support/layerViewUtils","../support/AnchorElementViewModel","../support/GoTo"],function(e,t,o,n,r,i,s,a,p,l,u,c,d,h,y,g,f,v,m,b){var w=new g({id:"zoom-to"}),_=i.ofType({key:"type",defaultKeyValue:"button",base:y,typeMap:{button:g,toggle:f}}),P=new _([w]),F=p.getLogger("esri.widgets.Popup.PopupViewModel");return function(e){function t(t){var o=e.call(this)||this;return o._handles=new a,o._pendingPromises=new Set,o._zoomToLocation=null,o.actions=P,o.autoCloseEnabled=!1,o.content=null,o.highlightEnabled=!0,o.title=null,o.updateLocationEnabled=!1,o.view=null,o.visible=!1,o.zoomFactor=4,o}return o(t,e),t.prototype.initialize=function(){var e=this;this._handles.add([this.on("view-change",this._autoClose),u.watch(this,["highlightEnabled","selectedFeature","visible","view"],this._highlightFeature),u.watch(this,"view.animation.state",function(t){e._zoomToLocation||(w.disabled="waiting-for-target"===t)})])},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null,this._pendingPromises.clear(),this.view=null},Object.defineProperty(t.prototype,"allActions",{get:function(){var e=this._get("allActions")||new _;e.removeAll();var t=this.selectedFeature&&("function"==typeof this.selectedFeature.getEffectivePopupTemplate&&this.selectedFeature.getEffectivePopupTemplate()||this.selectedFeature.popupTemplate),o=t&&t.actions,n=t&&t.overwriteActions,r=n?o:this.actions.concat(o);return r&&r.filter(Boolean).forEach(function(t){return e.add(t)}),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"featureCount",{get:function(){return this.features.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"features",{get:function(){return this._get("features")||[]},set:function(e){var t=e||[];this._set("features",t);var o=this,n=o.pendingPromisesCount,r=o.promiseCount,i=o.selectedFeatureIndex,s=r&&t.length;if(s&&n&&-1===i)return void(this.selectedFeatureIndex=0);s&&-1!==i||(this.selectedFeatureIndex=t.length?0:-1)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"location",{get:function(){return this._get("location")||null},set:function(e){var t=this.get("location"),o=this.get("view.spatialReference.isWebMercator");e&&e.get("spatialReference.isWGS84")&&o&&(e=h.geographicToWebMercator(e)),this._set("location",e),e!==t&&this._centerAtLocation()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pendingPromisesCount",{get:function(){return this._pendingPromises.size},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"waitingForResult",{get:function(){return this.pendingPromisesCount>0&&0===this.featureCount},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"promiseCount",{get:function(){return this.promises.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"promises",{get:function(){return this._get("promises")||[]},set:function(e){var t=this,o=this._get("promises");if(o&&o.forEach(function(e){e&&"function"==typeof e.cancel&&e.cancel()}),this._pendingPromises.clear(),this.features=[],!Array.isArray(e)||!e.length)return this._set("promises",[]),void this.notifyChange("pendingPromisesCount");this._set("promises",e),e=e.slice(0),e.forEach(function(e){t._pendingPromises.add(e);var o=function(o){t._updatePendingPromises(e),t._updateFeatures(o)},n=function(){return t._updatePendingPromises(e)};e.then(o,n)}),this.notifyChange("pendingPromisesCount")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedFeature",{get:function(){var e=this,t=e.features,o=e.selectedFeatureIndex,n=e.updateLocationEnabled;if(-1===o)return null;var r=t[o];return r?(n&&(this.location=this._getPointFromGeometry(r.geometry)),r):null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedFeatureIndex",{get:function(){var e=this._get("selectedFeatureIndex");return"number"==typeof e?e:-1},set:function(e){var t=this.featureCount;e=isNaN(e)||e<-1||!t?-1:(e+t)%t,this._set("selectedFeatureIndex",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0}),t.prototype.centerAtLocation=function(){var e=this,t=e.location,o=e.view;if(!t||!o){var n=new s("center-at-location:invalid-location-or-view","Cannot center at a location without a location and view.",{location:t,view:o});return F.error(n),l.reject(n)}return this.callGoTo({target:{target:t,scale:o.scale}})},t.prototype.clear=function(){this.set({promises:[],features:[],content:null,title:null,location:null})},t.prototype.open=function(e){var t={updateLocationEnabled:!1,promises:[]};this.set(r({visible:!1},t,e)),this._setVisibleWhenContentExists()},t.prototype.triggerAction=function(e){var t=this.allActions.getItemAt(e);t&&this.emit("trigger-action",{action:t})},t.prototype.next=function(){return this.selectedFeatureIndex=this.selectedFeatureIndex+1,this},t.prototype.previous=function(){return this.selectedFeatureIndex=this.selectedFeatureIndex-1,this},t.prototype.zoomToLocation=function(){var e=this,t=this,o=t.location,n=t.selectedFeature,r=t.view,i=t.zoomFactor;if(!o||!r){var a=new s("zoom-to:invalid-location-or-view","Cannot zoom to location without a location and view.",{location:o,view:r});return F.error(a),l.reject(a)}var p=r.scale/i,u=this.get("selectedFeature.geometry"),c=n&&"3d"===r.type,d=u||c,h=d?n:o,y=u&&"point"===u.type,g=d&&y&&this._isScreenSize(n),f={target:h,scale:g?p:void 0};w.active=!0,w.disabled=!0;var v=this.callGoTo({target:f}).then(function(){g&&y&&(e.location=u),w.active=!1,w.disabled=!1,e._zoomToLocation=null}).catch(function(){w.active=!1,w.disabled=!1,e._zoomToLocation=null});return this._zoomToLocation=v,v},t.prototype._updatePendingPromises=function(e){e&&this._pendingPromises.has(e)&&(this._pendingPromises.delete(e),this.notifyChange("pendingPromisesCount"))},t.prototype._setVisibleWhenContentExists=function(){var e=this,t=this,o=t._handles,n=t.promiseCount;if(o.remove("pendingVisible"),!n)return void this.set("visible",!0);var r=u.init(this,"pendingPromisesCount",function(t){e.featureCount&&(e.set("visible",!0),o.remove("pendingVisible")),t||o.remove("pendingVisible")});o.add(r,"pendingVisible")},t.prototype._autoClose=function(){this.autoCloseEnabled&&(this.visible=!1)},t.prototype._isScreenSize=function(e){var t=this.view;if("3d"!==t.type||"esri.Graphic"!==e.declaredClass)return!0;var o=t.getViewForGraphic(e);if(o&&o.whenGraphicBounds){var n=!1;return o.whenGraphicBounds(e,{useViewElevation:!0}).then(function(e){n=!e||!e.boundingBox||e.boundingBox[0]===e.boundingBox[3]&&e.boundingBox[1]===e.boundingBox[4]&&e.boundingBox[2]===e.boundingBox[5]}),n}return!0},t.prototype._getPointFromGeometry=function(e){return e?"point"===e.type?e:"extent"===e.type?e.center:"polygon"===e.type?e.centroid:"multipoint"===e.type?e.extent.center:"polyline"===e.type?e.extent.center:null:null},t.prototype._centerAtLocation=function(){var e=this,t=e.location,o=e.updateLocationEnabled,n=this.get("view.extent");o&&n&&t&&!n.contains(t)&&this.centerAtLocation()},t.prototype._highlightFeature=function(){var e=this;this._handles.remove("highlight");var t=this,o=t.selectedFeature,n=t.highlightEnabled,r=t.view,i=t.visible;if(o&&r&&n&&i){var s=o.layer;s&&r.when(function(){r.whenLayerView(s).then(function(t){if(t&&v.hasHighlight(t)){var n=s.objectIdField,r=o.attributes,i=r&&r[n],a=t.highlight(i||o,{});e._handles.add(a,"highlight")}})})}},t.prototype._updateFeatures=function(e){var t=this.features;if(e&&e.length){if(!t.length)return void(this.features=e);var o=e.filter(function(e){return-1===t.indexOf(e)});this.features=t.concat(o)}},n([c.property({type:_})],t.prototype,"actions",void 0),n([c.property({dependsOn:["actions.length","selectedFeature.sourceLayer.popupTemplate.actions.length","selectedFeature.sourceLayer.popupTemplate.overwriteActions","selectedFeature.popupTemplate.actions.length","selectedFeature.popupTemplate.overwriteActions"],readOnly:!0})],t.prototype,"allActions",null),n([c.property()],t.prototype,"autoCloseEnabled",void 0),n([c.property()],t.prototype,"content",void 0),n([c.property({readOnly:!0,dependsOn:["features"]})],t.prototype,"featureCount",null),n([c.property()],t.prototype,"features",null),n([c.property()],t.prototype,"highlightEnabled",void 0),n([c.property({type:d})],t.prototype,"location",null),n([c.property({readOnly:!0,dependsOn:["promises"]})],t.prototype,"pendingPromisesCount",null),n([c.property({readOnly:!0,dependsOn:["featureCount","pendingPromisesCount"]})],t.prototype,"waitingForResult",null),n([c.property({readOnly:!0,dependsOn:["promises"]})],t.prototype,"promiseCount",null),n([c.property()],t.prototype,"promises",null),n([c.property({value:null,readOnly:!0,dependsOn:["features","selectedFeatureIndex","updateLocationEnabled"]})],t.prototype,"selectedFeature",null),n([c.property({value:-1})],t.prototype,"selectedFeatureIndex",null),n([c.property({readOnly:!0,dependsOn:["view.ready"]})],t.prototype,"state",null),n([c.property()],t.prototype,"title",void 0),n([c.property()],t.prototype,"updateLocationEnabled",void 0),n([c.property()],t.prototype,"view",void 0),n([c.property()],t.prototype,"visible",void 0),n([c.property()],t.prototype,"zoomFactor",void 0),n([c.property()],t.prototype,"centerAtLocation",null),n([c.property()],t.prototype,"clear",null),n([c.property()],t.prototype,"triggerAction",null),n([c.property()],t.prototype,"next",null),n([c.property()],t.prototype,"previous",null),n([c.property()],t.prototype,"zoomToLocation",null),t=n([c.subclass("esri.widgets.Popup.PopupViewModel")],t)}(c.declared(m,b))});