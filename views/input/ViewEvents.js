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

define(["require","exports","../../core/tsSupport/extendsHelper","../../geometry/ScreenPoint","../3d/support/mathUtils","./InputHandler"],function(t,e,n,r,a,o){function i(t){return!!u[t]}function p(t){for(var e=0,n=t;e<n.length;e++){if(!i(n[e]))return!1}return!0}Object.defineProperty(e,"__esModule",{value:!0});var s,u={click:!0,"double-click":!0,"immediate-click":!0,hold:!0,drag:!0,"key-down":!0,"key-up":!0,"pointer-down":!0,"pointer-move":!0,"pointer-up":!0,"pointer-drag":!0,"mouse-wheel":!0,"pointer-enter":!0,"pointer-leave":!0,gamepad:!0};!function(t){t[t.Left=0]="Left",t[t.Middle=1]="Middle",t[t.Right=2]="Right"}(s||(s={}));var c=function(){function t(t){this.handlers=new Map,this.counter=0,this.handlerCounts=new Map,this.view=t,this.inputManager=null}return t.prototype.connect=function(t){var e=this;t&&this.disconnect(),this.inputManager=t,this.handlers.forEach(function(t,n){return e.inputManager.installHandlers(n,[t])})},t.prototype.disconnect=function(){var t=this;this.inputManager&&this.handlers.forEach(function(e,n){return t.inputManager.uninstallHandlers(n)}),this.inputManager=null},t.prototype.destroy=function(){this.disconnect(),this.handlers.clear(),this.view=null},t.prototype.register=function(t,e,n){var r=this,a=Array.isArray(t)?t:t.split(",");if(!p(a))return a.some(i)&&console.error("Error: registering input events and other events on the view at the same time is not supported."),null;var o=Array.isArray(e)?e:[];n=Array.isArray(e)?n:e;var s=this.createUniqueGroupName(),u=new d(this.view,a,o,n);this.handlers.set(s,u);for(var c=0,l=a;c<l.length;c++){var g=l[c],m=this.handlerCounts.get(g)||0;this.handlerCounts.set(g,m+1)}return this.inputManager&&this.inputManager.installHandlers(s,[u]),{remove:function(){return r.removeHandler(s,a)}}},t.prototype.hasHandler=function(t){return!!this.handlerCounts.get(t)},t.prototype.removeHandler=function(t,e){if(this.handlers.has(t)){this.handlers.delete(t);for(var n=0,r=e;n<r.length;n++){var a=r[n],o=this.handlerCounts.get(a);void 0===o?console.error("Trying to remove handler for event that has no handlers registered: ",a):1===o?this.handlerCounts.delete(a):this.handlerCounts.set(a,o-1)}}this.inputManager&&this.inputManager.uninstallHandlers(t)},t.prototype.createUniqueGroupName=function(){return this.counter+=1,"viewEvents_"+this.counter},t}();e.ViewEvents=c;var d=function(t){function e(e,n,r,a){var o=t.call(this,!0)||this;o.view=e;for(var i=0,p=n;i<p.length;i++){var s=p[i];switch(s){case"click":o.registerIncoming("click",r,function(t){return a(o.wrapClick(t))});break;case"double-click":o.registerIncoming("double-click",r,function(t){return a(o.wrapDoubleClick(t))});break;case"immediate-click":o.registerIncoming("immediate-click",r,function(t){return a(o.wrapImmediateClick(t))});break;case"hold":o.registerIncoming("hold",r,function(t){return a(o.wrapHold(t))});break;case"drag":o.registerIncoming("drag",r,function(t){var e=o.wrapDrag(t);e&&a(e)});break;case"key-down":o.registerIncoming("key-down",r,function(t){return a(o.wrapKeyDown(t))});break;case"key-up":o.registerIncoming("key-up",r,function(t){return a(o.wrapKeyUp(t))});break;case"pointer-down":o.registerIncoming("pointer-down",r,function(t){return a(o.wrapPointer(t,"pointer-down"))});break;case"pointer-move":o.registerIncoming("pointer-move",r,function(t){return a(o.wrapPointer(t,"pointer-move"))});break;case"pointer-up":o.registerIncoming("pointer-up",r,function(t){return a(o.wrapPointer(t,"pointer-up"))});break;case"pointer-drag":o.registerIncoming("pointer-drag",r,function(t){return a(o.wrapPointerDrag(t))});break;case"mouse-wheel":o.registerIncoming("mouse-wheel",r,function(t){return a(o.wrapMouseWheel(t))});break;case"pointer-enter":o.registerIncoming("pointer-enter",r,function(t){return a(o.wrapPointer(t,"pointer-enter"))});break;case"pointer-leave":o.registerIncoming("pointer-leave",r,function(t){return a(o.wrapPointer(t,"pointer-leave"))});break;case"gamepad":o.registerIncoming("gamepad",r,function(t){a(o.wrapGamepad(t))})}}return o}return n(e,t),e.prototype.wrapClick=function(t){var e=t.data,n=e.pointerType,a=e.button,o=e.buttons,i=e.x,p=e.y;return{type:"click",pointerType:n,button:a,buttons:o,x:i,y:p,native:e.native,timestamp:t.timestamp,screenPoint:new r(i,p),mapPoint:this.view.toMap(i,p),stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapDoubleClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y;return{type:"double-click",pointerType:n,button:r,buttons:a,x:o,y:i,native:e.native,timestamp:t.timestamp,mapPoint:this.view.toMap(o,i),stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapImmediateClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y;return{type:"immediate-click",pointerType:n,button:r,buttons:a,x:o,y:i,native:e.native,timestamp:t.timestamp,mapPoint:this.view.toMap(o,i),stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapHold=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y;return{type:"hold",pointerType:n,button:r,buttons:a,x:o,y:i,native:e.native,timestamp:t.timestamp,mapPoint:this.view.toMap(o,i),stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapDrag=function(t){var e=t.data,n=e.center,r=n.x,o=n.y,i=e.action,p=e.pointerType,s=e.button;if("start"===i&&(this.latestDragStart=e),this.latestDragStart){var u=e.pointer.native,c=e.buttons,d=t.timestamp,l={x:this.latestDragStart.center.x,y:this.latestDragStart.center.y};return"end"===i&&(this.latestDragStart=void 0),{type:"drag",action:i,x:r,y:o,origin:l,pointerType:p,button:s,buttons:c,radius:e.radius,angle:a.rad2deg(e.angle),native:u,timestamp:d,stopPropagation:function(){return t.stopPropagation()}}}},e.prototype.wrapKeyDown=function(t){var e=t.data;return{type:"key-down",key:e.key,repeat:e.repeat,native:e.native,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapKeyUp=function(t){var e=t.data;return{type:"key-up",key:e.key,native:e.native,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapPointer=function(t,e){var n=t.data,r=n.x,a=n.y,o=n.button,i=n.buttons,p=n.native;return{type:e,x:r,y:a,pointerId:p.pointerId,pointerType:p.pointerType,button:o,buttons:i,native:p,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapPointerDrag=function(t){var e=t.data.currentEvent,n=e.x,r=e.y,a=e.buttons,o=e.native,i=t.data.startEvent.button;return{type:"pointer-drag",x:n,y:r,pointerId:t.data.startEvent.native.pointerId,pointerType:t.data.startEvent.native.pointerType,button:i,buttons:a,action:t.data.action,origin:{x:t.data.startEvent.x,y:t.data.startEvent.y},native:o,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapMouseWheel=function(t){var e=t.data;return{type:"mouse-wheel",x:e.x,y:e.y,deltaY:e.deltaY,native:e.native,timestamp:t.timestamp,stopPropagation:function(){return t.stopPropagation()}}},e.prototype.wrapGamepad=function(t){var e=t.data,n=e.action,r=e.state;return{type:"gamepad",device:e.device,timestamp:t.timestamp,action:n,buttons:r.buttons,axes:r.axes,stopPropagation:function(){return t.stopPropagation()}}},e}(o.InputHandler)});