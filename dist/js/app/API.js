/*!
 * PIPlayer v0.2.0
 *  License
 */

/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define("app/task/script",{settings:{canvas:{maxWidth:800,proportions:.8},hooks:{}},trialSets:{},stimulusSets:{},mediaSets:{},sequence:[]}),define("app/trial/current_trial",[],function(){var e;return function(t){return t&&(e=t),e}}),define("app/task/adjust_canvas",["jquery","app/task/script","app/trial/current_trial"],function(e,t,n){var r=function(){var i=this,s=t.settings.canvas||{},o;if(s.proportions)if(e.isPlainObject(s.proportions)){if(typeof s.proportions.height!="number"||typeof s.proportions.width!="number")throw new Error("The canvas proportions object`s height and a width properties must be numeric");o=s.proportions.height/s.proportions.width}else o=s.proportions;setTimeout(function(){var t,r,u={width:e(window).innerWidth(),height:e(window).innerHeight()},a=u.height,f=Math.min(s.maxWidth,u.width);a>o*f?(t=f*o,r=f):(t=a,r=a/o),t-=parseInt(i.$el.css("border-top-width"),10)+parseInt(i.$el.css("border-bottom-width"),10)+parseInt(i.$el.css("margin-top"),10),r-=parseInt(i.$el.css("border-left-width"),10)+parseInt(i.$el.css("border-right-width"),10),i.$el.width(r),i.$el.height(t),i.$el.css("font-size",t*(s.textSize||3)/100),n()&&(n()._layout_collection.refresh(),n()._stimulus_collection.refresh()),window.scrollTo(0,1)},500)};return r}),define("text",["module"],function(e){var t,n,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,o=typeof location!="undefined"&&location.href,u=o&&location.protocol&&location.protocol.replace(/\:/,""),a=o&&location.hostname,f=o&&(location.port||undefined),l=[],c=e.config&&e.config()||{};t={version:"2.0.3",strip:function(e){if(e){e=e.replace(i,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:c.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(i){}if(e){r=[n];break}}return e},parseName:function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),i=e.substring(n+1,e.length);return n=i.indexOf("!"),n!==-1&&(t=i.substring(n+1,i.length),t=t==="strip",i=i.substring(0,n)),{moduleName:r,ext:i,strip:t}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,c.isBuild&&(l[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}c.isBuild=i.isBuild;var s=t.parseName(e),l=s.moduleName+"."+s.ext,h=n.toUrl(l),p=c.useXhr||t.useXhr;!o||p(h,u,a,f)?t.get(h,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([l],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(l.hasOwnProperty(n)){var s=t.jsEscape(l[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.moduleName+"."+o.ext,a=r.toUrl(o.moduleName+"."+o.ext)+".js";t.load(u,r,function(n){var r=function(e){return i(a,e)};r.asModule=function(e,t){return i.asModule(e,a,t)},t.write(e,u,r,s)},s)}};if(c.env==="node"||!c.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(c.env==="xhr"||!c.env&&t.createXhr())t.get=function(e,n,r){var i=t.createXhr();i.open("GET",e,!0),c.onXhr&&c.onXhr(i,e),i.onreadystatechange=function(t){var s,o;i.readyState===4&&(s=i.status,s>399&&s<600?(o=new Error(e+" HTTP status: "+s),o.xhr=i,r(o)):n(i.responseText))},i.send(null)};else if(c.env==="rhino"||!c.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};return t}),define("text!templates/loading.html",[],function(){return'<style>\n/**\n * Loading page progress bars\n * http://css-tricks.com/css3-progress-bars/\n */\n 	.meter-wrapper{\n 		position: relative;\n		top:50%;\n 	}\n\n	.meter {\n		height: 30px;  /* Can be anything */\n		position: relative;\n		margin-left: auto; margin-right: auto;\n		margin-top:-15px;\n		width:82%;\n		background: #555;\n		-moz-border-radius: 25px;\n		-webkit-border-radius: 25px;\n		border-radius: 25px;\n		padding: 10px;\n		-webkit-box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);\n		-moz-box-shadow   : inset 0 -1px 1px rgba(255,255,255,0.3);\n		box-shadow        : inset 0 -1px 1px rgba(255,255,255,0.3);\n	}\n	.meter > span {\n		display: block;\n		height: 100%;\n		   -webkit-border-top-right-radius: 8px;\n		-webkit-border-bottom-right-radius: 8px;\n			   -moz-border-radius-topright: 8px;\n			-moz-border-radius-bottomright: 8px;\n				   border-top-right-radius: 8px;\n				border-bottom-right-radius: 8px;\n			-webkit-border-top-left-radius: 20px;\n		 -webkit-border-bottom-left-radius: 20px;\n				-moz-border-radius-topleft: 20px;\n			 -moz-border-radius-bottomleft: 20px;\n					border-top-left-radius: 20px;\n				 border-bottom-left-radius: 20px;\n		background-color: rgb(43,194,83);\n		background-image: -webkit-gradient(\n		  linear,\n		  left bottom,\n		  left top,\n		  color-stop(0, rgb(43,194,83)),\n		  color-stop(1, rgb(84,240,84))\n		 );\n		background-image: -moz-linear-gradient(\n		  center bottom,\n		  rgb(43,194,83) 37%,\n		  rgb(84,240,84) 69%\n		 );\n		-webkit-box-shadow:\n		  inset 0 2px 9px  rgba(255,255,255,0.3),\n		  inset 0 -2px 6px rgba(0,0,0,0.4);\n		-moz-box-shadow:\n		  inset 0 2px 9px  rgba(255,255,255,0.3),\n		  inset 0 -2px 6px rgba(0,0,0,0.4);\n		box-shadow:\n		  inset 0 2px 9px  rgba(255,255,255,0.3),\n		  inset 0 -2px 6px rgba(0,0,0,0.4);\n		position: relative;\n		overflow: hidden;\n	}\n	.meter > span:after, .animate > span > span {\n		content: "";\n		position: absolute;\n		top: 0; left: 0; bottom: 0; right: 0;\n		background-image:\n		   -webkit-gradient(linear, 0 0, 100% 100%,\n			  color-stop(.25, rgba(255, 255, 255, .2)),\n			  color-stop(.25, transparent), color-stop(.5, transparent),\n			  color-stop(.5, rgba(255, 255, 255, .2)),\n			  color-stop(.75, rgba(255, 255, 255, .2)),\n			  color-stop(.75, transparent), to(transparent)\n		   );\n		background-image:\n			-moz-linear-gradient(\n			  -45deg,\n			  rgba(255, 255, 255, .2) 25%,\n			  transparent 25%,\n			  transparent 50%,\n			  rgba(255, 255, 255, .2) 50%,\n			  rgba(255, 255, 255, .2) 75%,\n			  transparent 75%,\n			  transparent\n		   );\n		z-index: 1;\n		-webkit-background-size: 50px 50px;\n		-moz-background-size: 50px 50px;\n		-webkit-animation: move 2s linear infinite;\n		   -webkit-border-top-right-radius: 8px;\n		-webkit-border-bottom-right-radius: 8px;\n			   -moz-border-radius-topright: 8px;\n			-moz-border-radius-bottomright: 8px;\n				   border-top-right-radius: 8px;\n				border-bottom-right-radius: 8px;\n			-webkit-border-top-left-radius: 20px;\n		 -webkit-border-bottom-left-radius: 20px;\n				-moz-border-radius-topleft: 20px;\n			 -moz-border-radius-bottomleft: 20px;\n					border-top-left-radius: 20px;\n				 border-bottom-left-radius: 20px;\n		overflow: hidden;\n	}\n\n	.animate > span:after {\n		display: none;\n	}\n\n	@-webkit-keyframes move {\n		0% {\n		   background-position: 0 0;\n		}\n		100% {\n		   background-position: 50px 50px;\n		}\n	}\n\n	.orange > span {\n		background-color: #f1a165;\n		background-image: -moz-linear-gradient(top, #f1a165, #f36d0a);\n		background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #f1a165),color-stop(1, #f36d0a));\n		background-image: -webkit-linear-gradient(#f1a165, #f36d0a);\n	}\n\n	.red > span {\n		background-color: #f0a3a3;\n		background-image: -moz-linear-gradient(top, #f0a3a3, #f42323);\n		background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #f0a3a3),color-stop(1, #f42323));\n		background-image: -webkit-linear-gradient(#f0a3a3, #f42323);\n	}\n\n	.nostripes > span > span, .nostripes > span:after {\n		-webkit-animation: none;\n		background-image: none;\n	}\n</style>\n\n<div class="meter-wrapper">\n	<div class="meter">\n		<span style="width: 0%"></span>\n	</div>\n</div>'}),define("app/task/main_view",["backbone","jquery","./adjust_canvas","app/task/script","text!templates/loading.html"],function(e,t,n,r,i){var s=t.Deferred(),o=e.View.extend({id:"canvas",initialize:function(){this.activate=t.proxy(this.activate,this),this.render=t.proxy(this.render,this),t(window).on("orientationchange resize",t.proxy(this.adjustCanvas,this))},render:function(){return this.adjustCanvas(),this},activate:function(){var e=this,n=r.settings.canvas||{};return t(document).ready(function(){n.background&&t("body").css("background-color",n.background),n.canvasBackground&&e.$el.css("background-color",n.canvasBackground),n.borderColor&&e.$el.css("border-color",n.borderColor),n.borderWidth&&e.$el.css("border-width",n.borderWidth),n.css&&e.$el.css(n.css),e.$el.appendTo("body"),e.render(),s.resolve()}),this},loading:function(e){if(e.state()!="pending")return e;this.$el.html(i);var t=this.$(".meter span");return e.progress(function(e,n){t.width((n?e/n*100:0)+"%")})},empty:function(){this.$el.empty()},docReady:function(){return s},adjustCanvas:n});return new o}),define("models/set",["backbone","underscore"],function(e,t){var n=e.Collection.extend({orderList:[],nextPick:0,whereData:function(e){return t.isEmpty(e)?[]:this.filter(function(t){var n=t.get("data")||{};for(var r in e)if(e[r]!==n[r])return!1;return!0})},random:function(){return this.at(Math.floor(Math.random()*this.length)).attributes},exRandom:function(){return this.orderList=this.orderList.length?this.orderList:t.shuffle(t.range(this.length)),this.at(this.orderList.pop()).attributes},bySequence:function(){return this.nextPick<this.length||(this.nextPick=0),this.at(this.nextPick++).attributes},byData:function(e){if(t.isUndefined(e.data))throw console.log(e),new Error("A data property must by defined for byData");var n=t.isString(e.data)?{handle:e.data}:e.data,r=this.whereData(n)[0];if(!r)throw new Error("Inherit by Data failed. Data not found: "+e.data);return r.attributes},inherit:function(e){if(t.isFunction(e.type))return e.type.call(this,e);switch(e.type){case"bySequence":return this.bySequence();case"byData":return this.byData(e);case"exRandom":return this.exRandom();case"random":default:return this.random()}}});return n}),define("app/sets_constructor",["underscore","models/set"],function(e,t){function n(){function r(r){return e.each(r,function(e,r){n[r]=new t(e)}),n}var n={};return r}return n}),define("app/trial/trial_sets",["../sets_constructor"],function(e){return new e}),define("app/stimulus/stimulus_sets",["../sets_constructor"],function(e){return new e}),define("app/media/media_sets",["../sets_constructor"],function(e){return new e}),define("models/collection",["underscore"],function(e){var t=function(){this.collection=[],this.pointer=-1};return e.extend(t.prototype,{first:function(){return this.pointer=0,this.collection[this.pointer]},last:function(){return this.pointer=this.collection.length-1,this.collection[this.pointer]},end:function(){return this.pointer=this.collection.length,undefined},current:function(){return this.collection[this.pointer]},next:function(){return this.collection[++this.pointer]},previous:function(){return this.collection[--this.pointer]},add:function(t){return arguments.length?(t=e.isArray(t)?t:[t],this.collection=this.collection.concat(t),this):this},at:function(e){return this.collection[e]}}),t}),define("app/sequencer/sourceSequence",["models/collection","underscore"],function(e,t){var n=new e,r=function(t,n){for(var r in n)if(n[r]!==t[r])return!1;return!0};return t.extend(n,{nextWhere:function(t){while(this.next())if(r(this.current().data||{},t))break;return this.current()},lastWhere:function(t){while(this.previous())if(r(this.current().data||{},t))break;return this.current()}}),n}),define("utils/mixer",["underscore"],function(e){var t=function(n,r){var i=[];return e.each(n,function(n){var s=e.isObject(n)?n.mixer:undefined,o,u;switch(s){case"random":o=e.shuffle(t(n.data,!0)),u=r?o:t(o),i=i.concat(u);break;case"choose":o=e.chain(n.data).shuffle().first(n.n?n.n:1).value(),u=r?o:t(o),i=i.concat(u);break;case"repeat":o=t(n.data,!0),u=r?o:t(o);for(var a=0;a<n.times;a++)i=i.concat(u);break;case"wrapper":r?i.push(n):i=i.concat(t(n.data));break;case undefined:i.push(n);break;default:throw new Error("Unknown wrapper "+s)}}),i};return t}),define("utils/preloader",["jquery"],function(e){var t=[],n=[],r=0,i=e.Deferred(),s=function(s,o){o=o||"image";if(e.inArray(s,t)==-1){var u=e.Deferred();switch(o){case"template":try{require(["text!"+s],function(){u.resolve()})}catch(a){throw new Error("Template not found: "+s)}break;case"image":default:var f=new Image;e(f).on("load",function(){u.resolve()}),e(f).on("error",function(){throw new Error('Image not found: "'+s+'"')}),f.src=s}return n.push(u),t.push(s),u.done(function(){r++,i.notify(r,n.length)}),u}return!1};return{add:s,activate:function(){return e.when.apply(e,n).done(function(){i.resolve()}).fail(function(){i.reject()}),i.promise()},reset:function(){t=[],n=[],r=0,i=this.state=e.Deferred()},state:i}}),define("app/task/settings",["./script"],function(e){return e.settings}),define("app/task/build_url",["underscore","./settings"],function(e,t){return function(n,r){var i;return e.isString(t.base_url)?i=t.base_url:e.isObject(t.base_url)&&(i=t.base_url[r]),i?i[i.length-1]!="/"&&(i+="/"):i="",i+n}}),define("app/sequencer/sequencePreload",["underscore","utils/preloader","app/task/build_url"],function(e,t,n){var r=function(r){e.isUndefined(r.image)||t.add(n(r.image,"image"),"image"),e.isUndefined(r.template)||t.add(n(r.template,"template"),"template")},i=function(e){e.media&&r(e.media)},s=function(e){e.element&&r(e.element)},o=function(t){e.each(t.layout||[],i),e.each(t.stimuli||[],i),e.each(t.input||[],s)},u=function(t){e.each(t,function(t){e.isUndefined(t.mixer)?o(t):u(t.data)})},a=function(t){e.each(t.mediaSets||[],function(t){e.each(t,r)}),e.each(t.stimulusSets||[],function(t){e.each(t,i)}),e.each(t.trialSets||[],function(t){e.each(t,o)}),u(t.sequence)};return function(e,n,s){s&&t.reset();switch(n){case"media":r(e);break;case"stimulus":i(e);break;case"trial":o(e);break;case"script":default:a(e)}return t.activate()}}),define("app/task/parser",["require","app/task/script","../trial/trial_sets","../stimulus/stimulus_sets","../media/media_sets","../sequencer/sourceSequence","utils/mixer","../sequencer/sequencePreload"],function(e){var t=e("app/task/script"),n=e("../trial/trial_sets"),r=e("../stimulus/stimulus_sets"),i=e("../media/media_sets"),s=e("../sequencer/sourceSequence"),o=e("utils/mixer"),u=e("../sequencer/sequencePreload");return function(){return t.trialSets&&n(t.trialSets),t.stimulusSets&&r(t.stimulusSets),t.mediaSets&&i(t.mediaSets),s.add(o(t.sequence)),u(t)}}),define("app/sequencer/trialSequence",["models/collection"],function(e){return new e}),define("utils/pubsub",["underscore"],function(e){var t={},n={},r={};return t.publish=function(r,i){n[r]&&e.each(n[r],function(e){e.apply(t,i||[])})},t.subscribe=function(t,i){var s;return e.isFunction(i)?s=[]:(s=arguments[1],i=arguments[2]),n[t]||(n[t]={},r[t]=0),n[t][r[t]++]=i,s.push([t,i]),[t,i]},t.unsubscribe=function(t){var r=t[0];n[r]&&e.each(n[r],function(e,i){e==t[1]&&delete n[r][i]})},t}),define("utils/is_touch",[],function(){return"ontouchstart"in window?!0:!1}),define("utils/interface/bindings/click",["jquery","utils/is_touch"],function(e,t){return function(n,r){var i=t?"touchstart":"mousedown",s=r.element?!1:!0,o=e(r.element);n.on=function(t){var n=function(e){t(e,i)};s?e(document).on(i+".interface",'[data-handle="'+r.stimHandle+'"]',n):o.css(r.css||{}).appendTo("#canvas").on(i+".interface",n)},n.off=function(){s?e(document).off(i+".interface",'[data-handle="'+r.stimHandle+'"]'):o.remove()}}}),define("utils/interface/bindings/keypressed",["jquery"],function(e){var t=[];e(document).on("keyup",function(e){t[e.which]=!1});var n=function(n){var r=e.isArray(n.key)?n.key:[n.key],i="keydown.interface."+n.handle,s=e.map(r,function(e){return typeof e=="string"?e.toUpperCase().charCodeAt(0):e});this.on=function(n){e(document).on(i,function(r){!t[r.which]&&e.inArray(r.which,s)!=-1&&(t[r.which]=!0,n(r,"keydown"))})},this.off=function(){e(document).off(i)}};return function(t,r){e.extend(t,new n(r))}}),define("utils/timeout",["underscore"],function(e){return function(){var n=arguments[0],r=e.isArray(arguments[1])?arguments[1]:[],i=e.isFunction(arguments[1])?arguments[1]:arguments[2],s=0;return n?(s=setTimeout(i,n),r.push(s)):i.call(),s}}),define("utils/simpleRandomize",["underscore"],function(e){var t=function(n,r){if(e.isArray(n)){var i=Math.floor(Math.random()*n.length);return n[i]}if(e.isFunction(n))return n.call(r);if(e.isObject(n)){if(!e.isNumber(n.min)||!e.isNumber(n.max)||n.min>n.max)throw new Error("randomization objects need both a max and a minimum property, also max has to be larger than min");return n.min+(n.max-n.min)*Math.random()}return n};return t}),define("utils/interface/bindings/timeout",["utils/timeout","utils/simpleRandomize"],function(e,t){return function(n,r){var i=function(){var n=t(r.duration)||0,i;return{on:function(t){i=e(n,function(){t({},"timeout")})},off:function(){clearTimeout(i)}}}();n.on=i.on,n.off=i.off}}),define("utils/interface/binder",["jquery","./bindings/click","./bindings/keypressed","./bindings/timeout"],function(e,t,n,r){return function(i,s){var o=s.on;if(typeof o=="function"){i.on=s.on,i.off=s.off;if(typeof i.off!="function")throw new Error("Interface off is not a function for "+s.handle);return!0}switch(o){case"keypressed":n(i,s);break;case"click":t(i,s);break;case"timeout":r(i,s);break;case"enter":n(i,e.extend({key:13},s));break;case"space":n(i,e.extend({key:32},s));break;case"esc":n(i,e.extend({key:27},s));break;case"leftTouch":s.element=e("<div>").css({position:"absolute",left:0,width:"30%",height:"100%",background:"#00FF00",opacity:.3}),t(i,s);break;case"rightTouch":s.element=e("<div>").css({position:"absolute",right:0,width:"30%",height:"100%",background:"#00FF00",opacity:.3}),t(i,s);break;case"topTouch":s.element=e("<div>").css({position:"absolute",top:0,width:"100%",height:"30%",background:"#00FF00",opacity:.3}),t(i,s);break;case"bottomTouch":s.element=e("<div>").css({position:"absolute",bottom:0,width:"100%",height:"30%",background:"#00FF00",opacity:.3}),t(i,s);break;default:throw new Error("Unknown interface element "+s.handle)}return!0}}),define("utils/interface/triggerEvent",["utils/pubsub"],function(e){return function(n,r,i,s){var o={timestamp:+(new Date),latency:s,handle:i.handle,type:r,e:n};e.publish("input",[o])}}),define("utils/interface/listener",["./binder","./triggerEvent"],function(e,t){return function(r,i){this.handle=r.handle,e(this,r),this.on(function(e,n){t(e,n,r,i.getLatency())}),this.destroy=this.off}}),define("utils/now",[],function(){var e;return!window.performance||(e=performance.now||performance.mozNow||performance.webkitNow||performance.msNow||performance.oNow),e?function(){return e.apply(performance)}:function(){return+(new Date)}}),define("utils/interface/interface",["jquery","./listener","../is_touch","../now"],function(e,t,n,r){var i=[],s=0;return{getLatency:function(){return r()-s},resetTimer:function(){s=r()},add:function(r){if(!r)throw new Error("Missing input element. Could not add input listener");var s=this,o=e.isArray(r)?r:[r];e.each(o,function(e,r){if(typeof r.touch!="undefined"){if(n&&!r.touch)return!0;if(!n&&r.touch)return!0}var o=new t(r,s);i.push(o)})},remove:function(t){t=e.isArray(t)?t:[t];for(var n=i.length-1;n>=0;n--){var r=i[n];e.inArray(r.handle,t)!=-1&&(r.off(),i.splice(n,1))}},destroy:function(){for(var e in i)i[e].destroy();i=[]}}}),define("models/model",["backbone","underscore"],function(e,t){typeof Object.create!="function"&&(Object.create=function(e){function t(){}return t.prototype=e,new t});var n=e.Model.extend({constructor:function(n,r){var i={};t.each(n,function(e,n){if(t.isObject(e)){var r=Object.create(e),s=this.defaults&&this.defaults[n]&&t.isObject(this.defaults[n])?this.defaults[n]:{};i[n]=t.defaults(r,s)}else i[n]=e},this),e.Model.apply(this,[i,r])}});return n}),define("app/media/media_view",["jquery","backbone","app/task/main_view"],function(e,t,n){var r=n.$el,i=t.View.extend({initialize:function(){this.$el.addClass("stimulus").attr("data-handle",this.model.handle).css("visibility","hidden").css(this.model.get("css")).appendTo(r),this.render()},render:function(){return this.size(),this.place(),this},show:function(){return this.options.type==="image"&&this.options.image.indexOf("gif")!==-1?(window.ActiveXObject||"ActiveXObject"in window?(this.$el.css("visibility","visible"),this.$el[0].src=this.options.image+"#"+Math.random()):(this.$el[0].src=this.options.image,this.$el.css("visibility","visible")),this):(this.$el.css("visibility","visible"),this)},hide:function(){return this.$el.css("visibility","hidden"),this},size:function(){var e=this.model.get("size");return e.font_size&&this.$el.css("font-size",e.font_size),e.height!="auto"&&this.options.type!="word"&&this.$el.height(e.height+"%"),e.width!="auto"&&this.$el.width(e.width+"%"),this},place:function(){function e(e){return{height:e.outerHeight(),width:e.outerWidth()}}var t,n,i,s,o=e(r),u=e(this.$el),a=this.model.get("location")||{};typeof a.top=="undefined"&&typeof a.bottom=="undefined"&&(a.top="center"),typeof a.left=="undefined"&&typeof a.right=="undefined"&&(a.right="center");switch(a.top){case undefined:case"auto":t="auto";break;case"center":t=(o.height-u.height)/2;break;default:t=o.height*a.top/100}switch(a.bottom){case undefined:case"auto":n="auto";break;case"center":n=(o.height-u.height)/2;break;default:n=o.height*a.bottom/100}switch(a.left){case undefined:case"auto":i="auto";break;case"center":i=(o.width-u.width)/2;break;default:i=o.width*a.left/100}switch(a.right){case undefined:case"auto":s="auto";break;case"center":s=(o.width-u.width)/2;break;default:s=o.width*a.right/100}this.$el.css({top:t,bottom:n,left:i,right:s})}});return i}),define("app/inflator",["jquery","./trial/trial_sets","./stimulus/stimulus_sets","./media/media_sets"],function(e,t,n,r){var i=function(t){return typeof t.customize=="function"&&t.customize.apply(t,[t]),t},s=function(o,u,a){var f,l,c,h;switch(u){case"trial":f=t();break;case"stimulus":f=n();break;case"media":f=r();break;default:throw new Error("Unknown set type "+u)}if(!o.inherit)return!a&&i(o),o;l=e.isPlainObject(o.inherit)?o.inherit:{set:o.inherit};if(!f[l.set])throw new Error("Unknown "+u+"Set: "+l.set);return c=s(f[l.set].inherit(l),u,!0),h=e.extend(!0,{},o),e.each(c,function(t,n){h[t]||(e.isArray(c[t])?h[t]=e.extend(!0,[],n):typeof c[t]=="object"?h[t]=e.extend(!0,{},n):h[t]=n)}),c.data&&(h.data=e.extend(!0,{},c.data,h.data)),!a&&i(h),h};return s}),define("utils/html",["jquery","underscore"],function(e,t){var n=function(n,r){if(n.word)n.displayType="element",n.type="word",n.el=e("<div>",{text:n.word});else if(n.image)n.displayType="element",n.type="image",n.el=e("<img>",{src:n.image});else if(n.jquery)n.displayType="element",n.type="jquery",n.el=n.jquery;else if(n.html)n.displayType="element",n.type="html",n.el=e(t.template(n.html,r||{}));else if(n.template){var i=require("text!"+n.template);n.displayType="element",n.type="html",n.el=e(t.template(i,r||{}))}else{if(!n.inlineTemplate)return!1;n.displayType="element",n.type="html",n.el=e(t.template(n.inlineTemplate,r||{}))}};return n}),define("app/media/media_constructor",["jquery","./media_view","../inflator","utils/html","app/task/build_url"],function(e,t,n,r,i){return function(s,o){typeof s=="string"&&(s={word:s});if(!s)throw new Error("Media object not defined for "+o.name());var u=n(s,"media");return u.template&&(u.template=i(u.template,"template")),u.image&&(u.image=i(u.image,"image")),u.source=e.extend({},u),u.model=o,r(u,{trialData:o.trial.data,stimulusData:o.get("data")}),new t(u)}}),define("app/stimulus/stimulus_model",["require","models/model","app/media/media_constructor","utils/pubsub","underscore","utils/is_touch","app/task/settings"],function(e){var t=e("models/model"),n=e("app/media/media_constructor"),r=e("utils/pubsub"),i=e("underscore"),s=e("utils/is_touch"),o=e("app/task/settings"),u=t.extend({initialize:function(){this.collection.trial&&(this.trial=this.collection.trial),this.attributes.data=this.attributes.data||{},this.attributes.data.handle=this.attributes.data.handle||this.attributes.handle,this.handle=this.attributes.data.handle;var e=s&&this.get("touchMedia")?this.get("touchMedia"):this.get("media");this.media=new n(e,this)},defaults:{size:{height:"auto",width:"auto"},css:{}},activate:function(){var e=this,t=this.handle;this.timeStack=this.timeStack||[],this.pubsubStack=this.pubsubStack||[],r.subscribe("stim:start",e.pubsubStack,function(n){if(!i.include([t,"All"],n))return!1;e.media.show()}),r.subscribe("stim:setAttr",e.pubsubStack,function(n,r){if(!i.include([t,"All"],n))return!1;if(i.isFunction(r))r.apply(e);else{var s=e.get("data")||{};s=i.extend(s,r),e.set("data",s)}}),r.subscribe("stim:stop",e.pubsubStack,function(n){if(!i.include([t,"All"],n))return!1;e.media.hide()})},disable:function(){this.media.hide(),this.timeStack=this.timeStack||[],this.pubsubStack=this.pubsubStack||[],i.each(this.pubsubStack,function(e){r.unsubscribe(e)}),this.timeStack=[],this.pubsubStack=[]},name:function(){var e=this.attributes;return e.data.alias?e.data.alias:e.inherit&&e.inherit.set?e.inherit.set:e.handle?e.handle:!1},mediaName:function(){var e=this.media.options.source,t=o.logger&&o.logger.fullpath;if(e.alias)return e.alias;for(var n in e)if(n!="inherit")return i.contains(["image","template"],n)&&!t?e[n].replace(/^.*[\\\/]/,""):e[n]}});return u}),define("app/stimulus/stimulus_constructor",["./stimulus_model","../inflator"],function(e,t){return function(r,i){var s=t(r,"stimulus");return s.source=r,new e(s,i)}}),define("app/stimulus/stimulus_collection",["backbone","underscore","app/stimulus/stimulus_constructor"],function(e,t,n){var r=e.Collection.extend({model:n,initialize:function(e,t){t||(t={}),this.trial=t.trial},whereData:function(e){return t.isEmpty(e)?[]:this.filter(function(t){var n=t.get("data")||{};for(var r in e)if(e[r]!==n[r])return!1;return!0})},activate:function(){return this.each(function(e){e.activate()}),this},disable:function(){return this.each(function(e){e.disable()}),this},display_all:function(){this.each(function(e){e.media.show()})},hide_all:function(){this.each(function(e){e.media.hide()})},refresh:function(){this.each(function(e){e.media.render()})},get_stimlist:function(){return this.chain().filter(function(e){return!e.get("nolog")}).map(function(e,t){return e.name()||"stim"+t}).value()},get_medialist:function(){return this.chain().filter(function(e){return!e.get("nolog")}).map(function(e,t){return e.mediaName()||"media"+t}).value()}});return r}),define("app/trial/evaluate",["underscore","./current_trial"],function(e,t){return function(r,i){var s=t();if(!r)throw new Error("There is an interaction without conditions!!");r=e.isArray(r)?r:[r],i=i||{};var o=!0;if(i.type=="begin"){var u=e.reduce(r,function(e,t){return e||t.type=="begin"},!1);if(!u)return!1}return e.each(r,function(t){var n=!0;switch(t.type){case"begin":i.type!=="begin"&&(n=!1);break;case"inputEquals":e.isArray(t.value)||(t.value=[t.value]),e.indexOf(t.value,i.handle)===-1&&(n=!1);break;case"inputEqualsTrial":i.handle!==s.data[t.property]&&(n=!1);break;case"inputEqualsStim":var r={};t.handle&&(r.handle=t.handle),r[t.property]=i.handle;var u=s._stimulus_collection.whereData(r);u.length===0&&(n=!1);break;case"function":t.value.apply(s,[s,i])||(n=!1);break;default:throw new Error("Unknown condition type: "+t.type)}o=o&&(t.negate?!n:n)}),o}}),define("app/trial/action_list",["utils/pubsub","utils/interface/interface"],function(e,t){var n={showStim:function(t){var n=t.handle||t;e.publish("stim:start",[n])},hideStim:function(t){var n=t.handle||t;e.publish("stim:stop",[n])},setStimAttr:function(t){var n=t.handle,r=t.setter;e.publish("stim:setAttr",[n,r])},setTrialAttr:function(t,n){if(typeof t.setter=="undefined")throw new Error("The setTrialAttr action requires a setter property");e.publish("trial:setAttr",[t.setter,n])},setInput:function(t){if(typeof t.input=="undefined")throw new Error("The setInput action requires an input property");e.publish("trial:setInput",[t.input])},trigger:function(t){if(typeof t.handle=="undefined")throw new Error("The trigger action requires a handle property");e.publish("trial:setInput",[{handle:t.handle,on:"timeout",duration:+t.duration||0}])},removeInput:function(t){if(typeof t.handle=="undefined")throw new Error("The removeInput action requires a handle property");e.publish("trial:removeInput",[t.handle])},"goto":function(t){e.publish("trial:goto",[t])},endTrial:function(){e.publish("trial:end")},resetTimer:function(e,n){n.latency=0,t.resetTimer()},log:function(t,n){e.publish("log",[t,n])}};return n}),define("app/trial/action",["jquery","./action_list"],function(e,t){return function(n,r){var i=!0;if(!n)throw new Error("There is an interaction without actions!!");return n=e.isArray(n)?n:[n],e.each(n,function(e,n){if(!t[n.type])throw new Error("unknown action: "+n.type);n.type==="endTrial"&&(i=!1),t[n.type](n,r)}),i}}),define("app/trial/interactions",["jquery","utils/pubsub","./evaluate","./action"],function(e,t,n,r){var i=[],s=function(t,i){e.each(t,function(e,t){if(n(t.conditions,i))return r(t.actions,i)})};return{activate:function(e){t.subscribe("input",i,function(t){s(e,t)}),s(e,{type:"begin",latency:0})},disable:function(){e.each(i,function(){t.unsubscribe(this)})}}}),define("app/trial/trial_constructor",["require","jquery","underscore","utils/pubsub","utils/interface/interface","app/stimulus/stimulus_collection","./interactions","./current_trial","../inflator","app/task/main_view"],function(e){var t=e("jquery"),n=e("underscore"),r=e("utils/pubsub"),i=e("utils/interface/interface"),s=e("app/stimulus/stimulus_collection"),o=e("./interactions"),u=e("./current_trial"),a=e("../inflator"),f=e("app/task/main_view"),l=0,c=function(e){var r=a(e,"trial");n.extend(this,r),this.data||(this.data={}),this._source=r,this._id=n.uniqueId("trial_"),this.counter=l++;if(!this.interactions)throw new Error("Interactions not defined");this._layout_collection=new s(this.layout||[],{trial:this}),this._stimulus_collection=new s(this.stimuli||[],{trial:this}),this._pubsubStack=[],this._next=["next",{}],this.deferred=t.Deferred()};return n.extend(c.prototype,{activate:function(){var e=this;return u(this),this._layout_collection.display_all(),r.subscribe("trial:end",this._pubsubStack,n.bind(this.deactivate,this)),r.subscribe("trial:setAttr",this._pubsubStack,function(t,r){n.isFunction(t)?t.apply(e,[e.data,r]):n.extend(e.data,t)}),r.subscribe("trial:setInput",this._pubsubStack,function(e){i.add(e)}),r.subscribe("trial:removeInput",this._pubsubStack,function(e){i.remove(e)}),r.subscribe("trial:goto",this._pubsubStack,function(t){e._next=[t.destination,t.properties||{}]}),i.add(this.input||[]),this._stimulus_collection.activate(),i.resetTimer(),o.activate(this.interactions),this.deferred.promise()},deactivate:function(){var e=this;i.destroy(),this._stimulus_collection.disable(),o.disable(),n.each(this._pubsubStack,function(e){r.unsubscribe(e)}),this._pubsubStack=[],u(undefined),document.all&&!document.addEventListener?setTimeout(function(){f.empty(),e.deferred.resolve(e._next[0],e._next[1])},1):(f.empty(),e.deferred.resolve(e._next[0],e._next[1]))},name:function(){return this.data.alias?this.data.alias:this.inherit&&this.inherit.set?this.inherit.set:!1}}),c}),typeof JSON!="object"&&(JSON={}),function(){function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),define("JSON",function(e){return function(){var t,n;return t||e.JSON}}(this)),define("app/task/log/post",["jquery","app/task/settings","JSON"],function(e,t,n){var r=function(r){var i=t.logger&&t.logger.url,s=e.Deferred();if(!i)return s.resolve();var o={json:n.stringify(r)||""};return e.extend(o,t.metaData||{}),s=e.post(i,o),s=s.then(null,function(){return e.post(i,o)}),s};return r}),define("app/task/log/log_stack",[],function(){return[]}),define("app/task/log/logger",["require","jquery","utils/pubsub","app/trial/current_trial","app/task/settings","./post","./log_stack"],function(e){var t=e("jquery"),n=e("utils/pubsub"),r=e("app/trial/current_trial"),i=e("app/task/settings"),s=e("./post"),o=e("./log_stack"),u=0,a=function(e,t,n,r){var i=this._stimulus_collection.get_stimlist(),s=this._stimulus_collection.get_medialist();return{log_serial:r.length,trial_id:this.counter,name:this.name(),responseHandle:t.handle,latency:Math.floor(t.latency),stimuli:i,media:s,data:e}},f=function(){var e;return o.length-u<=0?t.Deferred().resolve():(e=o.slice(u,o.length),u=o.length,s(e))};return n.subscribe("log",function(e,t){var n=i.logger||{},s=n.logger?n.logger:a,u=r(),f=s.apply(u,[u.data,t,e,o]);o.push(f)}),n.subscribe("log:send",function(){var e=i.logger&&i.logger.pulse;e&&o.length-u>=e&&f()}),f}),define("app/sequencer/player",["require","./sourceSequence","./trialSequence","app/trial/trial_constructor","app/task/log/logger","app/task/settings","utils/pubsub"],function(e){var t=e("./sourceSequence"),n=e("./trialSequence"),r=e("app/trial/trial_constructor"),i=e("app/task/log/logger"),s=e("app/task/settings"),o=e("utils/pubsub"),u=function(e,a){var f,l;switch(e){case"nextWhere":f=t.nextWhere(a);break;case"previousWhere":f=t.lastWhere(a);break;case"current":f=t.current();break;case"first":f=t.first();break;case"last":f=t.last();break;case"end":f=t.end();break;case"next":default:f=t.next()}f?(l=new r(t.current()),l.activate().done(function(){o.publish("log:send"),u.apply(null,arguments)}),o.publish("trial:activated",[l]),n.add(l)):i().always(function(){s.hooks.endTask?s.hooks.endTask.call():window.location.href=s.redirect||window.location.href})};return u}),define("app/API",["jquery","./task/script","app/task/main_view","app/task/parser","app/sequencer/player","app/task/log/log_stack"],function(e,t,n,r,i,s){function a(n,r,i){var s=t[n+"Sets"]||(t[n+"Sets"]={});typeof r!="string"?e.extend(!0,s,r):(e.isArray(i)||(i=[i]),s[r]=s[r]?e.merge(s[r],i):i)}var o={},u=!1;return e.extend(o,{addSettings:function(n,r){return t.settings||(t.settings={}),typeof n!="string"?e.extend(!0,t.settings,n):e.isPlainObject(t.settings[n])?e.extend(!0,t.settings[n],r):t.settings[n]=r,this},addTrialSets:function(e,t){return a("trial",e,t),this},addStimulusSets:function(e,t){return a("stimulus",e,t),this},addMediaSets:function(e,t){return a("media",e,t),this},addSequence:function(n){return e.isArray(n)||(n=[n]),t.sequence=t.sequence?e.merge(t.sequence,n):n,this},addScript:function(n){return e.extend(!0,t,n),this},getScript:function(){return t},getLogs:function(){return s},play:function(){if(u)throw new Error("Player has already been activated. You can only call API.play() once per session");u=!0;var e=r();return n.activate().docReady().done(function(){n.loading(e).done(function(){n.empty(),i()}).fail(function(e){throw new Error("loading resource failed, do something about it! (you can start by checking the error log, you are probably reffering to the wrong url - "+e+")")})}),this}}),o});