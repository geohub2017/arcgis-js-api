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

define(["require","exports","dojo/number","../kernel","../moment","./FunctionWrapper","./ImmutableArray","./ImmutablePathArray","./ImmutablePointArray","../geometry/Extent","../geometry/Geometry","../geometry/Multipoint","../geometry/Point","../geometry/Polygon","../geometry/Polyline"],function(n,e,r,t,i,u,o,a,l,f,c,s,d,m,g){function y(n,e,r){if(""===e)return n;if(null===e)return n;if(void 0===e)return n;if(e===r)return n;if(e===r)return n;do{n=n.replace(e,r)}while(-1!==n.indexOf(e));return n}function p(n){return n instanceof Y||n instanceof u||n instanceof $}function v(n){return!!h(n)||(!!S(n)||(!!C(n)||(!!N(n)||(null===n||(n===e.voidOperation||"number"==typeof n)))))}function x(n,e){return void 0===n?e:n}function h(n){return"string"==typeof n||n instanceof String}function N(n){return"boolean"==typeof n}function S(n){return"number"==typeof n}function O(n){return n instanceof Array}function T(n){return n&&void 0!==n.isFeatureCursor}function b(n){return n instanceof o}function C(n){return n instanceof Date}function _(n,e,r){if(n.length<e||n.length>r)throw new Error("Function called with wrong number of Parameters")}function I(){var n=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var r=(n+16*Math.random())%16|0;return n=Math.floor(n/16),("x"===e?r:3&r|8).toString(16)})}function F(n,e){return!1===isNaN(n)?void 0===e||null===e||""===e?n.toString():(e=y(e,"‰",""),e=y(e,"¤",""),r.format(n,{pattern:e})):n.toString()}function j(n,e){var r=i(n);return void 0===e||null===e||""===e?r.format():r.format(R(e))}function R(n){return n.replace(/(LTS)|L|l/g,function(n){return"["+n+"]"})}function k(n,e,r){switch(r){case">":return n>e;case"<":return n<e;case">=":return n>=e;case"<=":return n<=e}return!1}function D(n,r,t){if(null===n){if(null===r||r===e.voidOperation)return k(null,null,t);if(S(r))return k(0,r,t);if(h(r))return k(0,G(r),t);if(N(r))return k(0,G(r),t);if(C(r))return k(0,r.getTime(),t)}if(n===e.voidOperation){if(null===r||r===e.voidOperation)return k(null,null,t);if(S(r))return k(0,r,t);if(h(r))return k(0,G(r),t);if(N(r))return k(0,G(r),t);if(C(r))return k(0,r.getTime(),t)}else if(S(n)){if(S(r))return k(n,r,t);if(N(r))return k(n,G(r),t);if(null===r||r===e.voidOperation)return k(n,0,t);if(h(r))return k(n,G(r),t);if(C(r))return k(n,r.getTime(),t)}else if(h(n)){if(h(r))return k(J(n),J(r),t);if(C(r))return k(G(n),r.getTime(),t);if(S(r))return k(G(n),r,t);if(null===r||r===e.voidOperation)return k(G(n),0,t);if(N(r))return k(G(n),G(r),t)}else if(C(n)){if(C(r))return k(n,r,t);if(null===r||r===e.voidOperation)return k(n.getTime(),0,t);if(S(r))return k(n.getTime(),r,t);if(N(r))return k(n.getTime(),G(r),t);if(h(r))return k(n.getTime(),G(r),t)}else if(N(n)){if(N(r))return k(n,r,t);if(S(r))return k(G(n),G(r),t);if(C(r))return k(G(n),r.getTime(),t);if(null===r||r===e.voidOperation)return k(G(n),0,t);if(h(r))return k(G(n),G(r),t)}return!!w(n,r)&&("<="===t||">="===t)}function w(n,r){if(n===r)return!0;if(null===n&&r===e.voidOperation||null===r&&n===e.voidOperation)return!0;if(C(n)&&C(r))return n.getTime()===r.getTime();if(n instanceof a)return n.equalityTest(r);if(n instanceof l)return n.equalityTest(r);if(n instanceof d&&r instanceof d){var t=void 0,i=void 0;if(e.isVersion4?(t=n.cache._arcadeCacheId,i=r.cache._arcadeCacheId):(t=n.getCacheValue("_arcadeCacheId"),i=r.getCacheValue("_arcadeCacheId")),void 0!==t&&null!==t)return t===i}if(void 0!==n&&void 0!==r&&null!==n&&null!==r&&"object"==typeof n&&"object"==typeof r){if(n._arcadeCacheId===r._arcadeCacheId&&void 0!==n._arcadeCacheId&&null!==n._arcadeCacheId)return!0;if(n._underlyingGraphic===r._underlyingGraphic&&void 0!==n._underlyingGraphic&&null!==n._underlyingGraphic)return!0}return!1}function J(n,r){if(h(n))return n;if(null===n)return"";if(S(n))return F(n,r);if(N(n))return n.toString();if(C(n))return j(n,r);if(n instanceof c)return JSON.stringify(n.toJSON());if(O(n)){for(var t=[],i=0;i<n.length;i++)t[i]=P(n[i]);return"["+t.join(",")+"]"}if(n instanceof o){for(var t=[],i=0;i<n.length();i++)t[i]=P(n.get(i));return"["+t.join(",")+"]"}return null!==n&&"object"==typeof n&&void 0!==n.castToText?n.castToText():p(n)?"object, Function":(e.voidOperation,"")}function V(n){var e=[];if(!1===O(n))return null;if(n instanceof o){for(var r=0;r<n.length();r++)e[r]=G(n.get(r));return e}for(var r=0;r<n.length;r++)e[r]=G(n[r]);return e}function A(n,r){if(h(n))return n;if(null===n)return"";if(S(n))return F(n,r);if(N(n))return n.toString();if(C(n))return j(n,r);if(n instanceof c)return n instanceof f?'{"xmin":'+n.xmin.toString()+',"ymin":'+n.ymin.toString()+","+(n.hasZ?'"zmin":'+n.zmin.toString()+",":"")+(n.hasM?'"mmin":'+n.mmin.toString()+",":"")+'"xmax":'+n.xmax.toString()+',"ymax":'+n.ymax.toString()+","+(n.hasZ?'"zmax":'+n.zmax.toString()+",":"")+(n.hasM?'"mmax":'+n.mmax.toString()+",":"")+'"spatialReference":'+W(n.spatialReference)+"}":W(n.toJSON(),function(n,e){return n.key===e.key?0:"spatialReference"===n.key?1:"spatialReference"===e.key?-1:n.key<e.key?-1:n.key>e.key?1:0});if(O(n)){for(var t=[],i=0;i<n.length;i++)t[i]=P(n[i]);return"["+t.join(",")+"]"}if(n instanceof o){for(var t=[],i=0;i<n.length();i++)t[i]=P(n.get(i));return"["+t.join(",")+"]"}return null!==n&&"object"==typeof n&&void 0!==n.castToText?n.castToText():p(n)?"object, Function":(e.voidOperation,"")}function P(n){if(null===n)return"null";if(N(n)||S(n)||h(n))return JSON.stringify(n);if(n instanceof c)return A(n);if(n instanceof o)return A(n);if(n instanceof Array)return A(n);if(n instanceof Date)return JSON.stringify(j(n,""));if(null!==n&&"object"==typeof n){if(void 0!==n.castToText)return n.castToText()}else if(n===e.voidOperation)return"null";return"null"}function G(n,t){return S(n)?n:null===n?0:""===n?0:C(n)?NaN:N(n)?n?1:0:O(n)?NaN:""===n?NaN:void 0===n?NaN:void 0!==t&&h(n)?(t=y(t,"‰",""),t=y(t,"¤",""),r.parse(n,{pattern:t})):n===e.voidOperation?0:Number(n)}function M(n,e){if(C(n))return n;if(h(n)){var r=i(n,[void 0===e||null===e||""===e?i.ISO_8601:e]);if(r.isValid())return r.toDate()}return null}function z(n,e){if(C(n))return i(n);if(h(n)){var r=i(n,[void 0===e||null===e||""===e?i.ISO_8601:e]);if(r.isValid())return r}return null}function E(n){return N(n)?n:h(n)?"true"===(n=n.toLowerCase()):!!S(n)&&(0!==n&&!isNaN(n))}function L(n,e){return null===n||void 0===n?null:(null!==n.spatialReference&&void 0!==n.spatialReference||(n.spatialReference=e),n)}function q(n){return null===n?null:n instanceof d?"NaN"===n.x||null===n.x||isNaN(n.x)?null:n:n instanceof m?0===n.rings.length?null:n:n instanceof g?0===n.paths.length?null:n:n instanceof s?0===n.points.length?null:n:n instanceof f?"NaN"===n.xmin||null===n.xmin||isNaN(n.xmin)?null:n:null}function U(n,e){if(!n)return null;if(!n.domain)return null;var r=null;e="string"===n.field.type||"esriFieldTypeString"===n.field.type?J(e):G(e);for(var t=0;t<n.domain.codedValues.length;t++){var i=n.domain.codedValues[t];i.code===e&&(r=i)}return null===r?null:r.name}function B(n,e){if(!n)return null;if(!n.domain)return null;var r=null;e=J(e);for(var t=0;t<n.domain.codedValues.length;t++){var i=n.domain.codedValues[t];i.name===e&&(r=i)}return null===r?null:r.code}function Z(n,e,r,t){if(void 0===r&&(r=null),!e)return null;if(!e.fields)return null;for(var i=null,u=0;u<e.fields.length;u++){var o=e.fields[u];o.name.toLowerCase()===n.toString().toLowerCase()&&(i=o)}if(null===i)return null;var a,l;return t||(t=r&&e.typeIdField&&r._field(e.typeIdField)),null!=t&&e.types.some(function(n){return n.id===t&&(a=n.domains&&n.domains[i.name],a&&"inherited"===a.type&&(a=K(i.name,e),l=!0),!0)}),l||a||(a=K(n,e)),{field:i,domain:a}}function K(n,e){var r;return e.fields.some(function(e){return e.name===n&&(r=e.domain),!!r}),r}function W(n,e){e||(e={}),"function"==typeof e&&(e={cmp:e});var r="boolean"==typeof e.cycles&&e.cycles,t=e.cmp&&function(n){return function(e){return function(r,t){var i={key:r,value:e[r]},u={key:t,value:e[t]};return n(i,u)}}}(e.cmp),i=[];return function n(e){if(e&&e.toJSON&&"function"==typeof e.toJSON&&(e=e.toJSON()),void 0!==e){if("number"==typeof e)return isFinite(e)?""+e:"null";if("object"!=typeof e)return JSON.stringify(e);var u,o;if(Array.isArray(e)){for(o="[",u=0;u<e.length;u++)u&&(o+=","),o+=n(e[u])||"null";return o+"]"}if(null===e)return"null";if(-1!==i.indexOf(e)){if(r)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var a=i.push(e)-1,l=Object.keys(e).sort(t&&t(e));for(o="",u=0;u<l.length;u++){var f=l[u],c=n(e[f]);c&&(o&&(o+=","),o+=JSON.stringify(f)+":"+c)}return i.splice(a,1),"{"+o+"}"}}(n)}function H(n){if(null===n)return null;for(var e=[],r=0,t=n;r<t.length;r++){var i=t[r];i&&i.declaredClass&&"esri.arcade.Feature"===i.declaredClass?e.push(i.geometry()):e.push(i)}return e}Object.defineProperty(e,"__esModule",{value:!0});var Q=function(){function n(n){this.value=n}return n}(),X=function(){function n(n){this.value=n}return n}(),Y=function(){function n(n){this.fn=n}return n}(),$=function(){function n(n){this.fn=n}return n}();e.NativeFunction=Y,e.ImplicitResult=X,e.ReturnResult=Q,e.SizzleFunction=$,e.isVersion4=0===t.version.indexOf("4."),e.voidOperation={type:"VOID"},e.breakResult={type:"BREAK"},e.continueResult={type:"CONTINUE"},e.multiReplace=y,e.isFunctionParameter=p,e.isSimpleType=v,e.defaultUndefined=x,e.isString=h,e.isBoolean=N,e.isNumber=S,e.isArray=O,e.isFeatureCursor=T,e.isImmutableArray=b,e.isDate=C,e.pcCheck=_,e.generateUUID=I,e.formatNumber=F,e.formatDate=j,e.standardiseDateFormat=R,e.greaterThanLessThan=D,e.equalityTest=w,e.toString=J,e.toNumberArray=V,e.toStringExplicit=A,e.toNumber=G,e.toDate=M,e.toDateM=z,e.toBoolean=E,e.fixSpatialReference=L,e.fixNullGeometry=q,e.getDomainValue=U,e.getDomainCode=B,e.getDomain=Z,e.stableStringify=W,e.autoCastFeatureToGeometry=H});