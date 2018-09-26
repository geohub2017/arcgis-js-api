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

define(["require","exports","../../../../core/tsSupport/generatorHelper","@dojo/framework/shim/Set","dojo/number","dstore/Csv","../../../../geometry","../../../../request","../../../../core/Error","../../../../core/has","../../../../core/lang","../../../../core/promiseUtils","../../../../core/urlUtils","../../../../geometry/projection","../../../../geometry/support/spatialReferenceUtils","../../../../geometry/support/webMercatorUtils","../../OptimizedFeature","../../OptimizedGeometry","../../data/DefaultSpatialIndex","../../data/QueryEngine","../../../../tasks/support/Query"],function(e,t,r,i,n,a,o,l,u,s,d,f,p,c,m,y,g,v,h,F,N){Object.defineProperty(t,"__esModule",{value:!0});var _=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong"];t.csvLatitudeFieldNames=["lat","latitude","y","ycenter","latitude83","latdecdeg","point-y"],t.csvLongitudeFieldNames=["lon","lng","long","longitude","x","xcenter","longitude83","longdecdeg","point-x"],t.csvDetectedDelimiters=[","," ",";","|","\t"];var b=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i,I=[0,0],x=function(){function e(e,t){this.x=e,this.y=t}return e}(),D=function(){var e=n._parseInfo(),t=new RegExp("^"+e.regexp+"$"),r=new RegExp("["+e.group+"\\s\\xa0]","g"),i=e.factor;return function(n){var a=t.exec(n);if(e.factor=i,!a)return NaN;var o=a[1];if(!a[1]){if(!a[2])return NaN;o=a[2],e.factor*=-1}return+(o=o.replace(r,"").replace(e.decimal,"."))*e.factor}}(),T=function(){function e(){this._queryEngine=null}return e.prototype.load=function(e){var t=this;return f.all([this._fetch(e.url),this._checkProjection(e)]).then(function(r){var i=r[0],n=t._parse(i,e.parsing);return t._queryEngine=t._createQueryEngine(i,n),n.layerDefinition.extent=t._queryEngine.fullExtent,n})},e.prototype.applyEdits=function(e){return f.reject(new u("csv-source:editing-not-supported","applyEdits() is not supported on CSVLayer"))},e.prototype.queryFeatures=function(e){return void 0===e&&(e={}),this._queryEngine.executeQuery(N.fromJSON(e))},e.prototype.queryFeatureCount=function(e){return void 0===e&&(e={}),this._queryEngine.executeQueryForCount(N.fromJSON(e))},e.prototype.queryObjectIds=function(e){return void 0===e&&(e={}),this._queryEngine.executeQueryForIds(N.fromJSON(e))},e.prototype.queryExtent=function(e){return void 0===e&&(e={}),this._queryEngine.executeQueryForExtent(N.fromJSON(e))},e.prototype._fetch=function(e){if(!e)return f.reject(new u("csv-source:invalid-source","url not defined"));var t=p.urlToObject(e);return l(t.path,{query:t.query,responseType:"text"}).then(function(e){return e.data})},e.prototype._parse=function(e,t){void 0===t&&(t={});for(var r={columnDelimiter:t.columnDelimiter,layerDefinition:null,locationInfo:{latitudeFieldName:t.latitudeField,longitudeFieldName:t.longitudeField}};e&&"\n"===e[0];)e=e.slice(1);"\n"!==e[e.length-1]&&(e+="\n");var i=this._readFirstLine(e);if(!i)throw new u("csv","CSV is empty",{csv:e});if(!t.columnDelimiter){var n=this._inferDelimiter(i);if(!n)throw new u("csv-source:invalid-delimiter","Unable to detect the delimiter from CSV");r.columnDelimiter=n}var a=i.split(r.columnDelimiter),o=r.layerDefinition={name:"csv",geometryType:"esriGeometryPoint",objectIdField:null,fields:[],extent:{xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:t.spatialReference||{wkid:102100}}};if(!t.latitudeField||!t.longitudeField){var l=this._inferLocationInfo(a);if(!t.longitudeField&&!l.longitudeFieldName||!t.latitudeField&&!l.latitudeFieldName)throw new u("csv","Unable to identify latitudeField and/or longitudeField from CSV");r.locationInfo={longitudeFieldName:t.longitudeField||l.longitudeFieldName,latitudeFieldName:t.latitudeField||l.latitudeFieldName}}var s=this._inferFields(e,r.columnDelimiter,a,r.locationInfo);if(t.fields&&t.fields.length){for(var f=new Map,p=0,c=t.fields;p<c.length;p++){var m=c[p];f.set(m.name.toLowerCase(),m)}for(var y=0,g=s;y<g.length;y++){var m=g[y],v=f.get(m.name.toLowerCase());if(v){var h=m.name;d.mixin(m,v),m.name=h}}}return o.fields=s,o.fields.some(function(e){return"esriFieldTypeOID"===e.type&&(o.objectIdField=e.name,!0)})||(o.objectIdField="__OBJECTID",o.fields.unshift({name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1})),r},e.prototype._inferLocationInfo=function(e){var r=null,i=null;return e.forEach(function(e){var n,a=e.toLowerCase();n=t.csvLatitudeFieldNames.indexOf(a),-1===n||i||(i=e),-1===(n=t.csvLongitudeFieldNames.indexOf(a))||r||(r=e)}),{longitudeFieldName:r,latitudeFieldName:i}},e.prototype._inferFields=function(e,t,r,i){for(var n=[],a=this._sampleLines(e).map(function(e){return e.split(t).map(function(e){return e.trim()})}),o=this,l=0;l<r.length;l++)!function(e){var t=r[e];if(t===i.longitudeFieldName||t===i.latitudeFieldName)n.push({name:t,type:"esriFieldTypeDouble",alias:t});else{var l=a.map(function(t){return t[e]}),u=o._inferFieldType(l),s={name:t.replace(/[\s\'’‘\.\-\/\(\)]+/g,"_"),type:null,alias:t};switch(u){case"integer":s.type="esriFieldTypeInteger";break;case"double":s.type="esriFieldTypeDouble";break;case"date":s.type="esriFieldTypeDate",s.length=36;break;default:s.type="esriFieldTypeString",s.length=255}n.push(s)}}(l);return n},e.prototype._inferFieldType=function(e){var t=this;if(!e.length)return"string";var r=/[^+-.,0-9]/;return e.map(function(e){var i=!1;if(""===e||r.test(e))i=!0;else{var n=D(e);if(!isNaN(n))return/[.,]/.test(e)?"double":n>214783647||n<-214783648?"double":"integer";if(-1===e.indexOf("E"))i=!0;else{if(n=Number(e),!isNaN(n))return"double";if(-1===e.indexOf(","))i=!0;else{if(e=e.replace(",","."),n=Number(e),!isNaN(n))return"double";i=!0}}}if(i){if(/^[-]?\d*[.,]?\d*$/.test(e))return"string";var a=new Date(e);return t._isValidDate(a,e)?"date":"string"}return"string"}).reduce(function(e,t){return e===t?t:"string"===e||"string"===t?"string":"double"===e||"double"===t?"double":void 0})},e.prototype._isValidDate=function(e,t){if(!e||"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))return!1;var r=!0;if(s("chrome")&&/\d+\W*$/.test(t)){var i=t.match(/[a-zA-Z]{2,}/);if(i){for(var n=!1,a=0;!n&&a<=i.length;)n=!b.test(i[a]),a++;r=!n}}return r},e.prototype._readFirstLine=function(e){return e.substring(0,e.indexOf("\n")).trim()},e.prototype._sampleLines=function(e,t){void 0===t&&(t=10);for(var r=!1,i=[],n=e.indexOf("\n")+1;!r&&i.length<t;){var a=e.indexOf("\n",n);if(-1!==a){var o=void 0;o=-1===a&&n<e.length-1?e.substring(n).trim():e.substring(n,a).trim(),o&&i.push(o),n=a+1}else r=!0}return i},e.prototype._inferDelimiter=function(e){var r=0,i="";return t.csvDetectedDelimiters.forEach(function(t){var n=e.split(t).length;n>r&&(r=n,i=t)}),""===i?null:i},e.prototype._createQueryEngine=function(e,t){for(var r,n=t.locationInfo,l=n.latitudeFieldName,u=n.longitudeFieldName,s=t.layerDefinition,d=s.objectIdField,f=s.fields,p=s.extent,N=[],b=[],T=new i.Set,w=new i.Set,E=[],O=0,S=f;O<S.length;O++){var j=S[O],q=j.name,C=j.type;"esriFieldTypeDate"===C?T.add(q):_.indexOf(C)>-1&&w.add(q),q!==d&&E.push(q)}var L=new a;L.delimiter=t.columnDelimiter,L.fieldNames=E,L.newline="\n";var R=L.parse(e),V=0;R.shift();for(var k=0,P=R;k<P.length;k++){var M=P[k],Q=this._parseCoordinateValue(M[l]),G=this._parseCoordinateValue(M[u]);if(null!=G&&null!=Q&&!isNaN(Q)&&!isNaN(G)){M[l]=Q,M[u]=G;for(var J in M)if(J!==l&&J!==u)if(T.has(J)){var U=new Date(M[J]);M[J]=this._isValidDate(U,M[J])?U.getTime():null}else if(w.has(J)){var Y=D(M[J]);isNaN(Y)?M[J]=null:M[J]=Y}M[d]=V,V++,N.push(new x(G,Q)),b.push(M)}}if(!m.equals({wkid:4326},p.spatialReference))if(m.isWebMercator(p.spatialReference))for(var W=0,$=N;W<$.length;W++){var z=$[W];r=y.lngLatToXY(z.x,z.y,I),z.x=r[0],z.y=r[1]}else N=c.projectMany(N,o.SpatialReference.WGS84,p.spatialReference,null,!0);for(var A=new h.default({geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1}),B=new F.default({fields:t.layerDefinition.fields,geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1,objectIdField:d,spatialReference:p.spatialReference||{wkid:4326},cacheSpatialQueries:!0,spatialIndex:A}),Z=[],H=0;H<N.length;H++){var X=N[H],K=X.x,ee=X.y,te=b[H];te[d]=H+1,Z.push(new g.default(new v.default([],[K,ee]),te,null,te[d]))}return A.addMany(Z),B},e.prototype._parseCoordinateValue=function(e){if(null==e||""===e)return null;var t=D(e);return(isNaN(t)||Math.abs(t)>181)&&(t=parseFloat(e)),t},e.prototype._checkProjection=function(e){if(!e||!e.parsing||!e.parsing.spatialReference)return f.resolve();var t=e.parsing&&e.parsing.spatialReference;return!t||y.canProject(o.SpatialReference.WGS84,t)?f.resolve():c.isSupported()?c.load():f.reject(new u("csv-layer","Projection not supported"))},e}();t.default=T});