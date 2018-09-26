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

/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([],function(){"use strict";return function(){function e(){}function n(e,n){for(var r,o,a=0,t=[],i=16;i>0&&!e[i-1];)i--;t.push({children:[],index:0});var c,s=t[0];for(r=0;r<i;r++){for(o=0;o<e[r];o++){for(s=t.pop(),s.children[s.index]=n[a];s.index>0;)s=t.pop();for(s.index++,t.push(s);t.length<=r;)t.push(c={children:[],index:0}),s.children[s.index]=c.children,s=c;a++}r+1<i&&(t.push(c={children:[],index:0}),s.children[s.index]=c.children,s=c)}return t[0].children}function r(e,n,r){return 64*((e.blocksPerLine+1)*n+r)}function o(e,n,o,a,t,i,s,f,u){function l(){if(Y>0)return Y--,U>>Y&1;if(255===(U=e[n++])){var r=e[n++];if(r)throw"unexpected marker: "+(U<<8|r).toString(16)}return Y=7,U>>>7}function h(e){for(var n=e;;){if("number"==typeof(n=n[l()]))return n;if("object"!=typeof n)throw"invalid huffman sequence"}}function v(e){for(var n=0;e>0;)n=n<<1|l(),e--;return n}function m(e){if(1===e)return 1===l()?1:-1;var n=v(e);return n>=1<<e-1?n:n+(-1<<e)+1}function b(e,n){var r=h(e.huffmanTableDC),o=0===r?0:m(r);e.blockData[n]=e.pred+=o;for(var a=1;a<64;){var t=h(e.huffmanTableAC),i=15&t,s=t>>4;if(0!==i){a+=s;var f=c[a];e.blockData[n+f]=m(i),a++}else{if(s<15)break;a+=16}}}function k(e,n){var r=h(e.huffmanTableDC),o=0===r?0:m(r)<<u;e.blockData[n]=e.pred+=o}function p(e,n){e.blockData[n]|=l()<<u}function d(e,n){if(H>0)return void H--;for(var r=i,o=s;r<=o;){var a=h(e.huffmanTableAC),t=15&a,f=a>>4;if(0!==t){r+=f;var l=c[r];e.blockData[n+l]=m(t)*(1<<u),r++}else{if(f<15){H=v(f)+(1<<f)-1;break}r+=16}}}function g(e,n){for(var r,o,a=i,t=s,f=0;a<=t;){var b=c[a];switch(I){case 0:if(o=h(e.huffmanTableAC),r=15&o,f=o>>4,0===r)f<15?(H=v(f)+(1<<f),I=4):(f=16,I=1);else{if(1!==r)throw"invalid ACn encoding";C=m(r),I=f?2:3}continue;case 1:case 2:e.blockData[n+b]?e.blockData[n+b]+=l()<<u:0===--f&&(I=2===I?3:0);break;case 3:e.blockData[n+b]?e.blockData[n+b]+=l()<<u:(e.blockData[n+b]=C<<u,I=0);break;case 4:e.blockData[n+b]&&(e.blockData[n+b]+=l()<<u)}a++}4===I&&0===--H&&(I=0)}var C,D,P,w,L,y,x,T=(o.precision,o.samplesPerLine,o.scanLines,o.mcusPerLine),A=o.progressive,_=(o.maxH,o.maxV,n),U=0,Y=0,H=0,I=0,M=a.length;x=A?0===i?0===f?k:p:0===f?d:g:b;var R,V,z=0;V=1===M?a[0].blocksPerLine*a[0].blocksPerColumn:T*o.mcusPerColumn,t||(t=V);for(var j,q;z<V;){for(P=0;P<M;P++)a[P].pred=0;if(H=0,1===M)for(D=a[0],y=0;y<t;y++)!function(e,n,o){n(e,r(e,o/e.blocksPerLine|0,o%e.blocksPerLine))}(D,x,z),z++;else for(y=0;y<t;y++){for(P=0;P<M;P++)for(D=a[P],j=D.h,q=D.v,w=0;w<q;w++)for(L=0;L<j;L++)!function(e,n,o,a,t){var i=o/T|0,c=o%T;n(e,r(e,i*e.v+a,c*e.h+t))}(D,x,z,w,L);z++}if(Y=0,(R=e[n]<<8|e[n+1])<=65280)throw"marker was not found";if(!(R>=65488&&R<=65495))break;n+=2}return n-_}function a(e,n,r){for(var o,a,t,i,c,k,p,d,g,C,D,P,w,L,y,x,T,A=e.quantizationTable,_=e.blockData,U=0;U<64;U+=8)g=_[n+U],C=_[n+U+1],D=_[n+U+2],P=_[n+U+3],w=_[n+U+4],L=_[n+U+5],y=_[n+U+6],x=_[n+U+7],g*=A[U],0!=(C|D|P|w|L|y|x)?(C*=A[U+1],D*=A[U+2],P*=A[U+3],w*=A[U+4],L*=A[U+5],y*=A[U+6],x*=A[U+7],o=m*g+128>>8,a=m*w+128>>8,t=D,i=y,c=b*(C-x)+128>>8,d=b*(C+x)+128>>8,k=P<<4,p=L<<4,o=o+a+1>>1,a=o-a,T=t*v+i*h+128>>8,t=t*h-i*v+128>>8,i=T,c=c+p+1>>1,p=c-p,d=d+k+1>>1,k=d-k,o=o+i+1>>1,i=o-i,a=a+t+1>>1,t=a-t,T=c*l+d*u+2048>>12,c=c*u-d*l+2048>>12,d=T,T=k*f+p*s+2048>>12,k=k*s-p*f+2048>>12,p=T,r[U]=o+d,r[U+7]=o-d,r[U+1]=a+p,r[U+6]=a-p,r[U+2]=t+k,r[U+5]=t-k,r[U+3]=i+c,r[U+4]=i-c):(T=m*g+512>>10,r[U]=T,r[U+1]=T,r[U+2]=T,r[U+3]=T,r[U+4]=T,r[U+5]=T,r[U+6]=T,r[U+7]=T);for(var Y=0;Y<8;++Y)g=r[Y],C=r[Y+8],D=r[Y+16],P=r[Y+24],w=r[Y+32],L=r[Y+40],y=r[Y+48],x=r[Y+56],0!=(C|D|P|w|L|y|x)?(o=m*g+2048>>12,a=m*w+2048>>12,t=D,i=y,c=b*(C-x)+2048>>12,d=b*(C+x)+2048>>12,k=P,p=L,o=4112+(o+a+1>>1),a=o-a,T=t*v+i*h+2048>>12,t=t*h-i*v+2048>>12,i=T,c=c+p+1>>1,p=c-p,d=d+k+1>>1,k=d-k,o=o+i+1>>1,i=o-i,a=a+t+1>>1,t=a-t,T=c*l+d*u+2048>>12,c=c*u-d*l+2048>>12,d=T,T=k*f+p*s+2048>>12,k=k*s-p*f+2048>>12,p=T,g=o+d,x=o-d,C=a+p,y=a-p,D=t+k,L=t-k,P=i+c,w=i-c,g=g<16?0:g>=4080?255:g>>4,C=C<16?0:C>=4080?255:C>>4,D=D<16?0:D>=4080?255:D>>4,P=P<16?0:P>=4080?255:P>>4,w=w<16?0:w>=4080?255:w>>4,L=L<16?0:L>=4080?255:L>>4,y=y<16?0:y>=4080?255:y>>4,x=x<16?0:x>=4080?255:x>>4,_[n+Y]=g,_[n+Y+8]=C,_[n+Y+16]=D,_[n+Y+24]=P,_[n+Y+32]=w,_[n+Y+40]=L,_[n+Y+48]=y,_[n+Y+56]=x):(T=m*g+8192>>14,T=T<-2040?0:T>=2024?255:T+2056>>4,_[n+Y]=T,_[n+Y+8]=T,_[n+Y+16]=T,_[n+Y+24]=T,_[n+Y+32]=T,_[n+Y+40]=T,_[n+Y+48]=T,_[n+Y+56]=T)}function t(e,n){for(var o=n.blocksPerLine,t=n.blocksPerColumn,i=new Int16Array(64),c=0;c<t;c++)for(var s=0;s<o;s++){var f=r(n,c,s);a(n,f,i)}return n.blockData}function i(e){return e<=0?0:e>=255?255:e}var c=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),s=4017,f=799,u=3406,l=2276,h=1567,v=3784,m=5793,b=2896;return e.prototype={parse:function(e){function r(){var n=e[s]<<8|e[s+1];return s+=2,n}var a,i,s=0,f=(e.length,null),u=null,l=[],h=[],v=[],m=r();if(65496!==m)throw"SOI not found";for(m=r();65497!==m;){var b,k,p;switch(m){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var d=function(){var n=r(),o=e.subarray(s,s+n-2);return s+=o.length,o}();65504===m&&74===d[0]&&70===d[1]&&73===d[2]&&70===d[3]&&0===d[4]&&(f={version:{major:d[5],minor:d[6]},densityUnits:d[7],xDensity:d[8]<<8|d[9],yDensity:d[10]<<8|d[11],thumbWidth:d[12],thumbHeight:d[13],thumbData:d.subarray(14,14+3*d[12]*d[13])}),65518===m&&65===d[0]&&100===d[1]&&111===d[2]&&98===d[3]&&101===d[4]&&(u={version:d[5]<<8|d[6],flags0:d[7]<<8|d[8],flags1:d[9]<<8|d[10],transformCode:d[11]});break;case 65499:for(var g,C=r(),D=C+s-2;s<D;){var P=e[s++],w=new Uint16Array(64);if(P>>4==0)for(k=0;k<64;k++)g=c[k],w[g]=e[s++];else{if(P>>4!=1)throw"DQT: invalid table spec";for(k=0;k<64;k++)g=c[k],w[g]=r()}l[15&P]=w}break;case 65472:case 65473:case 65474:if(a)throw"Only single frame JPEGs supported";r(),a={},a.extended=65473===m,a.progressive=65474===m,a.precision=e[s++],a.scanLines=r(),a.samplesPerLine=r(),a.components=[],a.componentIds={};var L,y=e[s++],x=0,T=0;for(b=0;b<y;b++){L=e[s];var A=e[s+1]>>4,_=15&e[s+1];x<A&&(x=A),T<_&&(T=_);var U=e[s+2];p=a.components.push({h:A,v:_,quantizationTable:l[U]}),a.componentIds[L]=p-1,s+=3}a.maxH=x,a.maxV=T,function(e){for(var n=Math.ceil(e.samplesPerLine/8/e.maxH),r=Math.ceil(e.scanLines/8/e.maxV),o=0;o<e.components.length;o++){V=e.components[o];var a=Math.ceil(Math.ceil(e.samplesPerLine/8)*V.h/e.maxH),t=Math.ceil(Math.ceil(e.scanLines/8)*V.v/e.maxV),i=n*V.h,c=r*V.v,s=64*c*(i+1);V.blockData=new Int16Array(s),V.blocksPerLine=a,V.blocksPerColumn=t}e.mcusPerLine=n,e.mcusPerColumn=r}(a);break;case 65476:var Y=r();for(b=2;b<Y;){var H=e[s++],I=new Uint8Array(16),M=0;for(k=0;k<16;k++,s++)M+=I[k]=e[s];var R=new Uint8Array(M);for(k=0;k<M;k++,s++)R[k]=e[s];b+=17+M,(H>>4==0?v:h)[15&H]=n(I,R)}break;case 65501:r(),i=r();break;case 65498:var V,z=(r(),e[s++]),j=[];for(b=0;b<z;b++){var q=a.componentIds[e[s++]];V=a.components[q];var S=e[s++];V.huffmanTableDC=v[S>>4],V.huffmanTableAC=h[15&S],j.push(V)}var B=e[s++],E=e[s++],G=e[s++],J=o(e,s,a,j,i,B,E,G>>4,15&G);s+=J;break;case 65535:255!==e[s]&&s--;break;default:if(255===e[s-3]&&e[s-2]>=192&&e[s-2]<=254){s-=3;break}throw"unknown JPEG marker "+m.toString(16)}m=r()}for(this.width=a.samplesPerLine,this.height=a.scanLines,this.jfif=f,this.eof=s,this.adobe=u,this.components=[],b=0;b<a.components.length;b++)V=a.components[b],this.components.push({output:t(a,V),scaleX:V.h/a.maxH,scaleY:V.v/a.maxV,blocksPerLine:V.blocksPerLine,blocksPerColumn:V.blocksPerColumn});this.numComponents=this.components.length},_getLinearizedBlockData:function(e,n){var r,o,a,t,i,c,s,f,u,l,h,v=this.width/e,m=this.height/n,b=0,k=this.components.length,p=e*n*k,d=new Uint8Array(p),g=new Uint32Array(e);for(s=0;s<k;s++){for(r=this.components[s],o=r.scaleX*v,a=r.scaleY*m,b=s,h=r.output,t=r.blocksPerLine+1<<3,i=0;i<e;i++)f=0|i*o,g[i]=(4294967288&f)<<3|7&f;for(c=0;c<n;c++)for(f=0|c*a,l=t*(4294967288&f)|(7&f)<<3,i=0;i<e;i++)d[b]=h[l+g[i]],b+=k}var C=this.decodeTransform;if(C)for(s=0;s<p;)for(f=0,u=0;f<k;f++,s++,u+=2)d[s]=(d[s]*C[u]>>8)+C[u+1];return d},_isColorConversionNeeded:function(){return!(!this.adobe||!this.adobe.transformCode)||3===this.numComponents},_convertYccToRgb:function(e){for(var n,r,o,a=0,t=e.length;a<t;a+=3)n=e[a],r=e[a+1],o=e[a+2],e[a]=i(n-179.456+1.402*o),e[a+1]=i(n+135.459-.344*r-.714*o),e[a+2]=i(n-226.816+1.772*r);return e},_convertYcckToRgb:function(e){for(var n,r,o,a,t=0,c=0,s=e.length;c<s;c+=4){n=e[c],r=e[c+1],o=e[c+2],a=e[c+3];var f=r*(-660635669420364e-19*r+.000437130475926232*o-54080610064599e-18*n+.00048449797120281*a-.154362151871126)-122.67195406894+o*(-.000957964378445773*o+.000817076911346625*n-.00477271405408747*a+1.53380253221734)+n*(.000961250184130688*n-.00266257332283933*a+.48357088451265)+a*(-.000336197177618394*a+.484791561490776),u=107.268039397724+r*(219927104525741e-19*r-.000640992018297945*o+.000659397001245577*n+.000426105652938837*a-.176491792462875)+o*(-.000778269941513683*o+.00130872261408275*n+.000770482631801132*a-.151051492775562)+n*(.00126935368114843*n-.00265090189010898*a+.25802910206845)+a*(-.000318913117588328*a-.213742400323665),l=r*(-.000570115196973677*r-263409051004589e-19*o+.0020741088115012*n-.00288260236853442*a+.814272968359295)-20.810012546947+o*(-153496057440975e-19*o-.000132689043961446*n+.000560833691242812*a-.195152027534049)+n*(.00174418132927582*n-.00255243321439347*a+.116935020465145)+a*(-.000343531996510555*a+.24165260232407);e[t++]=i(f),e[t++]=i(u),e[t++]=i(l)}return e},_convertYcckToCmyk:function(e){for(var n,r,o,a=0,t=e.length;a<t;a+=4)n=e[a],r=e[a+1],o=e[a+2],e[a]=i(434.456-n-1.402*o),e[a+1]=i(119.541-n+.344*r+.714*o),e[a+2]=i(481.816-n-1.772*r);return e},_convertCmykToRgb:function(e){for(var n,r,o,a,t=0,i=-16581375,c=0,s=e.length;c<s;c+=4){n=e[c],r=e[c+1],o=e[c+2],a=e[c+3];var f=n*(-4.387332384609988*n+54.48615194189176*r+18.82290502165302*o+212.25662451639585*a-72734.4411664936)+r*(1.7149763477362134*r-5.6096736904047315*o-17.873870861415444*a-1401.7366389350734)+o*(-2.5217340131683033*o-21.248923337353073*a+4465.541406466231)-a*(21.86122147463605*a+48317.86113160301),u=n*(8.841041422036149*n+60.118027045597366*r+6.871425592049007*o+31.159100130055922*a-20220.756542821975)+r*(-15.310361306967817*r+17.575251261109482*o+131.35250912493976*a-48691.05921601825)+o*(4.444339102852739*o+9.8632861493405*a-6341.191035517494)-a*(20.737325471181034*a+47890.15695978492),l=n*(.8842522430003296*n+8.078677503112928*r+30.89978309703729*o-.23883238689178934*a-3616.812083916688)+r*(10.49593273432072*r+63.02378494754052*o+50.606957656360734*a-28620.90484698408)+o*(.03296041114873217*o+115.60384449646641*a-49363.43385999684)-a*(22.33816807309886*a+45932.16563550634);e[t++]=f>=0?255:f<=i?0:255+f*(1/255/255)|0,e[t++]=u>=0?255:u<=i?0:255+u*(1/255/255)|0,e[t++]=l>=0?255:l<=i?0:255+l*(1/255/255)|0}return e},getData:function(e,n,r){if(this.numComponents>4)throw"Unsupported color mode";var o=this._getLinearizedBlockData(e,n);if(3===this.numComponents)return this._convertYccToRgb(o);if(4===this.numComponents){if(this._isColorConversionNeeded())return r?this._convertYcckToRgb(o):this._convertYcckToCmyk(o);if(r)return this._convertCmykToRgb(o)}return o}},e}()});