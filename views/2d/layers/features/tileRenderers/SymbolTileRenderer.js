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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/assignHelper","../../../../../renderers","../../../../../core/Accessor","../../../../../core/Logger","../../../../../core/screenUtils","../../../../../core/accessorSupport/decorators","../../../../../geometry/support/aaBoundingRect","../../../../../renderers/support/diffUtils","../../../engine/webgl/rendererInfoUtils","../../../engine/webgl/visualVariablesUtils","../../../engine/webgl/WGLFeatureView","../../../engine/webgl/WGLTile","./BaseTileRenderer"],function(e,i,t,r,n,o,l,a,s,u,f,c,p,d,h,g,v){function b(e){for(var i in e.diff){var t=e.diff[i];if("collection"===t.type){if(0!==t.changed.length||0!==t.added.length||0!==t.removed.length)return!0}else if("visualVariables"!==i&&"authoringInfo"!==i)return!0}return!1}function y(e){if(!e.visualVariables||!e.visualVariables.length)return e;var i=e.clone(),t=i.visualVariables.map(function(e){return V(e)?w(e):e});return i.visualVariables=t,i}function V(e){return("size"===e.type||"color"===e.type||"opacity"===e.type)&&null!=e.stops}function w(e){return e.stops=T(e.type,e.stops),e}function m(e,i,t){return(1-t)*e+t*i}function I(e,i){for(var t=i[0],r=i.slice(1),n=r.pop(),o=r[0].value,l=r[r.length-1].value,a=(l-o)/x,u=[],f=o;f<l;f+=a){for(var c=0;f>=r[c].value;)c++;var p=r[c],d=i[c-1],h=f-d.value,g=p.value===d.value?1:h/(p.value-d.value);if("color"===e){var v=r[c],b=i[c-1],y=v.color.clone();y.r=m(b.color.r,y.r,g),y.g=m(b.color.g,y.g,g),y.b=m(b.color.b,y.b,g),y.a=m(b.color.a,y.a,g),u.push({value:f,color:y,label:v.label})}else if("size"===e){var V=r[c],w=i[c-1],I=s.toPt(V.size),R=s.toPt(w.size),T=m(R,I,g);u.push({value:f,size:T,label:V.label})}else{var S=r[c],O=i[c-1],N=m(O.opacity,S.opacity,g);u.push({value:f,opacity:N,label:S.label})}}return[t].concat(u,[n])}function R(e){for(var i=e[0],t=e.slice(1),r=t.pop();t.length>x;){for(var n=0,o=0,l=1;l<t.length;l++){var a=t[l-1],s=t[l],u=Math.abs(s.value-a.value);u>o&&(o=u,n=l)}t.splice(n,1)}return[i].concat(t,[r])}function T(e,i){return i.length<=O?i:(S.warn("Found "+i.length+" Visual Variable stops, but MapView only supports "+O+". Displayed stops will be simplified."),i.length>2*O?I(e,i):R(i))}Object.defineProperty(i,"__esModule",{value:!0});var S=a.getLogger("esri.views.2d.layers.features.tileRenderer.SymbolTileRenderer"),O=8,x=O-2,N=function(e){function i(i){return e.call(this)||this}return t(i,e),i.prototype.initialize=function(){},i.prototype.createTile=function(e){var i=f.create();return this.tileInfoView.getTileBounds(i,e),new g(e,i)},i.prototype.disposeTile=function(e){this.featuresView.removeChild(e)},i.prototype.highlight=function(e){return this.featuresView.highlight(e)},i.prototype.hitTest=function(e,i){return this.featuresView.hitTest(e,i)},i.prototype.supportsRenderer=function(e){return null!=e&&p.isRendererWebGLCompatible(e)&&-1!==["simple","class-breaks","unique-value"].indexOf(e.type)},i.prototype.getProcessorConfiguration=function(){var e=this.layer;return{type:"symbol",renderer:y(e.renderer).toJSON(),devicePixelRatio:window.devicePixelRatio||1,definitionExpression:e.definitionExpression,outFields:e.outFields.slice().sort(),gdbVersion:e.gdbVersion,historicMoment:e.historicMoment&&e.historicMoment.getTime(),labelingInfo:e.labelingInfo&&e.labelingInfo.map(function(e){return e.toJSON()})}},i.prototype.needsProcessorReconfiguration=function(e){var i=this.wouldClear(e),t=this.configuration;return this.configuration=e,i||t.definitionExpression!==e.definitionExpression},i.prototype.wouldClear=function(e){var i=this.configuration;if(!i||i.outFields.join()!==e.outFields.join()||c.diff(i.labelingInfo,e.labelingInfo))return!0;var t=this.configuration&&o.fromJSON(this.configuration.renderer)||null,r=e&&o.fromJSON(e.renderer)||null,n=c.diff(t,r);if(!n)return!1;switch(n.type){case"complete":return!0;case"partial":if(b(n))return!0;if(n.diff.visualVariables){var l=this.featuresView.visualVariablesInfo,a=this.tileInfoView.tileInfo.spatialReference,s={fields:this.layer.fields.map(function(e){return e.toJSON()})},u=p.getNormalizedRenderer(r,a,s),f=d.convertVisualVariables(u.visualVariables).vvFields;return!!c.diff(l.vvFields,f)}}},i.prototype.clear=function(){this.featuresView.disposeWebGLResources()},i.prototype.applyConfiguration=function(e){var i=o.fromJSON(e.renderer),t={fields:this.layer.fields.map(function(e){return e.toJSON()})},r=p.getNormalizedRenderer(i,this.tileInfoView.tileInfo.spatialReference,t);this.configuration=e,this.featuresView.visualVariablesInfo=d.convertVisualVariables(r.visualVariables)},i.prototype.install=function(e){var i=new h.default({highlightOptions:this.highlightOptions,tileInfoView:this.tileInfoView,layer:this.layer,layerView:this.layerView});this.featuresView=i,i.install(e)},i.prototype.uninstall=function(e){this.featuresView.uninstall(e)},i.prototype.onTileData=function(e){var i=this.tiles.get(e.tileKey);i&&this.featuresView.onTileData(i,e.data)},i.prototype.onTileError=function(e){var i=this.tiles.get(e.tileKey);i&&this.featuresView.onTileError(i)},i.prototype.getMaterialItems=function(e){return this.featuresView.getMaterialItems(e)},i=r([u.subclass()],i)}(u.declared(l,v.default));i.default=N});