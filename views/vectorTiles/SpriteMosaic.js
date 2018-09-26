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

define(["require","exports","./GeometryUtils","./Rect","./RectangleBinPack","../webgl/Texture"],function(t,i,e,s,h,a){return function(){function t(t,i,e){void 0===e&&(e=0),this._size=[],this._mosaicsData=[],this._textures=[],this._dirties=[],this._maxItemSize=0,this._currentPage=0,this._pageWidth=0,this._pageHeight=0,this._mosaicRects={},this.pixelRatio=1,(t<=0||i<=0)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!"),this._pageWidth=t,this._pageHeight=i,e>0&&(this._maxItemSize=e),this._binPack=new h(t-4,i-4)}return t.prototype.getWidth=function(t){return t>=this._size.length?-1:this._size[t][0]},t.prototype.getHeight=function(t){return t>=this._size.length?-1:this._size[t][1]},t.prototype.setSpriteSource=function(t){if(this.dispose(),this.pixelRatio=t.devicePixelRatio,0===this._mosaicsData.length){this._binPack=new h(this._pageWidth-4,this._pageHeight-4);var i=Math.floor(this._pageWidth),e=Math.floor(this._pageHeight),s=i*e,a=new Uint32Array(s);this._mosaicsData[0]=a,this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0)}this._sprites=t},t.prototype.getSpriteItem=function(t,i){void 0===i&&(i=!1);var e=this._mosaicRects[t];if(e)return e;if(!this._sprites||"loaded"!==this._sprites.loadStatus)return null;var s=this._sprites.getSpriteInfo(t);if(!s||!s.width||!s.height||s.width<0||s.height<0)return null;var h=s.width,a=s.height,r=this._allocateImage(h,a),o=r[0],n=r[1],p=r[2];return o.width<=0?null:(this._copy(o,s,n,p,i),e={rect:o,width:h,height:a,anchorX:0,anchorY:0,sdf:s.sdf,pixelRatio:s.pixelRatio,page:n},this._mosaicRects[t]=e,e)},t.prototype.preloadSpriteItems=function(){for(var t=0,i=this._sprites.spriteNames;t<i.length;t++){var e=i[t];this.getSpriteItem(e,!0)}},t.prototype.getSpriteItems=function(t){for(var i={},e=0,s=t;e<s.length;e++){var h=s[e];i[h]=this.getSpriteItem(h)}return i},t.prototype.getMosaicItemPosition=function(t,i){var e=this.getSpriteItem(t,i),s=e&&e.rect;if(!s)return null;s.width=e.width,s.height=e.height;var h=e.width,a=e.height;return{size:[e.width,e.height],tl:[(s.x+2)/this._size[e.page][0],(s.y+2)/this._size[e.page][1]],br:[(s.x+2+h)/this._size[e.page][0],(s.y+2+a)/this._size[e.page][1]],page:e.page}},t.prototype.bind=function(t,i,e,s){void 0===e&&(e=0),void 0===s&&(s=0),this._textures[e]||(this._textures[e]=new a(t,{pixelFormat:6408,dataType:5121,width:this._size[e][0],height:this._size[e][1]},new Uint8Array(this._mosaicsData[e].buffer)));var h=this._textures[e];h.setSamplingMode(i),this._dirties[e]&&h.setData(new Uint8Array(this._mosaicsData[e].buffer)),t.bindTexture(h,s),this._dirties[e]=!1},t._copyBits=function(t,i,e,s,h,a,r,o,n,p,_){var g=s*i+e,u=o*a+r;if(_){u-=a;for(var c=-1;c<=p;c++,g=((c+p)%p+s)*i+e,u+=a)for(var d=-1;d<=n;d++)h[u+d]=t[g+(d+n)%n]}else for(var c=0;c<p;c++){for(var d=0;d<n;d++)h[u+d]=t[g+d];g+=i,u+=a}},t.prototype._copy=function(i,e,s,h,a,r){if(this._sprites&&"loaded"===this._sprites.loadStatus&&!(s>=this._mosaicsData.length)){var o=new Uint32Array(r?r.buffer:this._sprites.image.buffer),n=this._mosaicsData[s];n&&o||console.error("Source or target images are uninitialized!");var p=r?e.width:this._sprites.width;t._copyBits(o,p,e.x,e.y,n,h[0],i.x+2,i.y+2,e.width,e.height,a),this._dirties[s]=!0}},t.prototype._allocateImage=function(t,i){t+=2,i+=2;var a=Math.max(t,i);if(this._maxItemSize&&this._maxItemSize<a){var r=Math.pow(2,Math.ceil(e.log2(t))),o=Math.pow(2,Math.ceil(e.log2(i))),n=new s(0,0,t,i);return this._mosaicsData.push(new Uint32Array(r*o)),this._dirties.push(!0),this._size.push([r,o]),this._textures.push(void 0),[n,this._mosaicsData.length-1,[r,o]]}var p=t%4?4-t%4:4,_=i%4?4-i%4:4;1===p&&(p=5),1===_&&(_=5);var g=this._binPack.allocate(t+p,i+_);return g.width<=0?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new h(this._pageWidth-4,this._pageHeight-4),this._allocateImage(t,i)):[g,this._currentPage,[this._pageWidth,this._pageHeight]]},t.prototype.dispose=function(){this._binPack=null,this._mosaicRects={};for(var t=0,i=this._textures;t<i.length;t++){var e=i[t];e&&e.dispose()}this._textures.length=0},t}()});