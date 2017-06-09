define("utils/polyfills",[],function(){Date.now||(Date.now=function(){return(new Date).getTime()}),function(){"use strict";for(var e=["webkit","moz"],r=0;r<e.length&&!window.requestAnimationFrame;++r){var t=e[r];window.requestAnimationFrame=window[t+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t+"CancelAnimationFrame"]||window[t+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var n=0;window.requestAnimationFrame=function(e){var r=Date.now(),t=Math.max(n+16,r);return setTimeout(function(){e(n=t)},t-r)},window.cancelAnimationFrame=clearTimeout}}();var e=function(r){function t(e,r){return function t(i){var f;try{if(!r||null==i||"object"!=typeof i&&"function"!=typeof i||"function"!=typeof(f=i.then))l(function(){r||0!==e.length||console.error("Possible unhandled promise rejection:",i);for(var n=0;n<e.length;n++)e[n](i);o.length=0,s.length=0,u.state=r,u.retry=function(){t(i)}});else{if(i===a)throw new TypeError("Promise can't be resolved w/ itself");n(f.bind(i))}}catch(h){c(h)}}}function n(e){function r(e){return function(r){t++>0||e(r)}}var t=0,n=r(c);try{e(r(i),n)}catch(a){n(a)}}if(!(this instanceof e))throw new Error("Promise must be called with `new`");if("function"!=typeof r)throw new TypeError("executor must be a function");var a=this,o=[],s=[],i=t(o,!0),c=t(s,!1),u=a._instance={resolvers:o,rejectors:s},l="function"==typeof setImmediate?setImmediate:setTimeout;n(r)};e.prototype.then=function(r,t){function n(e,r,t,n){r.push(function(r){if("function"!=typeof e)t(r);else try{a(e(r))}catch(n){o&&o(n)}}),"function"==typeof i.retry&&n===i.state&&i.retry()}var a,o,s=this,i=s._instance,c=new e(function(e,r){a=e,o=r});return n(r,i.resolvers,a,!0),n(t,i.rejectors,o,!1),c},e.prototype["catch"]=function(e){return this.then(null,e)},e.resolve=function(r){return r instanceof e?r:new e(function(e){e(r)})},e.reject=function(r){return new e(function(e,t){t(r)})},e.all=function(r){return new e(function(e,t){var n=r.length,a=0,o=[];if(0===r.length)e([]);else for(var s=0;s<r.length;s++)!function(s){function i(r){a++,o[s]=r,a===n&&e(o)}null==r[s]||"object"!=typeof r[s]&&"function"!=typeof r[s]||"function"!=typeof r[s].then?i(r[s]):r[s].then(i,t)}(s)})},e.race=function(r){return new e(function(e,t){for(var n=0;n<r.length;n++)r[n].then(e,t)})},"undefined"==typeof window.Promise&&(window.Promise=e)}),define("pipScorer/computeD",["require","underscore"],function(e){function r(){t.assign(this,{dataArray:{},AnalyzedVar:"latency",ErrorVar:"error",condVar:"",cond1VarValues:[],cond2VarValues:[],parcelVar:"",parcelValue:[],fastRT:300,maxFastTrialsRate:.1,minRT:400,maxRT:1e4,maxErrorParcelRate:.4,errorLatency:{use:"latency",penalty:600,useForSTD:!0},postSettings:{}})}var t=e("underscore");return t.assign(r.prototype,{setComputeObject:function(e){t.assign(this,e)},setDataArray:function(){var e=window.piGlobal;this.dataArray=e.current.logs}}),r}),define("pipScorer/msgMan",["require","underscore"],function(e){function r(){this.messages=t.extend({},n)}var t=e("underscore"),n={MessageDef:[],manyErrors:"There were too many errors made to determine a result.",tooFast:"There were too many fast trials to determine a result.",notEnough:"There were not enough trials to determine a result."};return t.extend(r.prototype,{setMsgObject:function(e){t.extend(this.messages,e)},getScoreMsg:function(e){var r=this.messages.MessageDef;if(!r||!r.length)throw new Error('You must define a "MessageDef" array.');var n=parseFloat(e),a=null,o=null,s="error: msg was not set",i=!1;if(t.each(r,function(e){a=parseFloat(e.cut),o=e.message,a>=n&&!i&&(s=o,i=!0)}),!i){var c=r.length,u=r[c-1];s=u.message}return s},getMessage:function(e){return this.messages[e]}}),r}),define("pipScorer/parcelMng",["require","underscore"],function(e){function r(e){this.parcelArray=[],this.scoreData={},this.msgMan=e}var t=e("underscore");return t.extend(r.prototype,{Init:function(e){var r=this,n=this.msgMan,a=window.piGlobal,o=a.current.logs;r.parcelArray=[],r.scoreData={},r.msgMan=n;var s=e.AnalyzedVar,i=e.ErrorVar,c=e.parcelVar,u=e.parcelValue,l=e.minRT,f=e.maxRT,h=e.fastRT,g=0,p=0,d=0,m=0,v=parseFloat(e.maxFastTrialsRate);if("undefined"==typeof u||0===u.length){d=0,g=0,p=0,m=0;var y={};y.name="general",y.trialIData=[],t.each(o,function(t){t[s]>=l&&t[s]<=f?(d++,1==t.data[i]&&m++,r.validate(y,t,e)&&g++):t[s]<=h&&p++}),r.checkErrors(d,m,e),r.parcelArray[0]=y}else t.each(u,function(n,a){d=0,g=0,p=0,m=0;var u={};u.name=n,u.trialIData=[],t.each(o,function(t){var a=t.data[c];a==n&&(t[s]>=l&&t[s]<=f?(d++,1==t.data[i]&&m++,r.validate(u,t,e)&&g++):t[s]<=h&&p++)}),r.checkErrors(d,m,e),r.parcelArray[a]=u});p/g>v&&(r.scoreData.errorMessage=this.msgMan.getMessage("tooFast"))},checkErrors:function(e,r,t){var n=t.maxErrorParcelRate;r/e>n&&(this.scoreData.errorMessage=this.msgMan.getMessage("manyErrors"))},validate:function(e,r,t){var n=t.errorLatency,a=t.ErrorVar,o=r.data;return"latency"==n.use?(e.trialIData.push(r),!0):"false"==n.use?"1"==o[a]?!1:(e.trialIData.push(r),!0):"penalty"==n.use?(e.trialIData.push(r),!0):void 0},addPenalty:function(e,r){var n=r.errorLatency,a=this;if("penalty"==n.use){var o=parseFloat(n.penalty),s=r.ErrorVar,i=r.AnalyzedVar,c=r.condVar,u=r.cond1VarValues,l=r.cond2VarValues,f=e.trialIData,h=e.avgCon1,g=e.avgCon2;t.each(f,function(e){var r=e.data,t=r[s],n=r[c],f=a.checkArray(n,u),p=a.checkArray(n,l);"1"==t&&(f?e[i]+=h+o:p&&(e[i]+=g+o))})}},avgAll:function(e){var r=this;t.each(r.parcelArray,function(t){r.avgParcel(t,e)})},avgParcel:function(e,r){var n=this,a=e.trialIData,o=r.condVar,s=r.cond1VarValues,i=r.cond2VarValues,c=r.AnalyzedVar,u=0,l=0,f=0,h=0,g=0,p=0;t.each(a,function(e){var r=e[c],t=e.data;f+=r,p++;var a=t[o],d=n.checkArray(a,s),m=n.checkArray(a,i);d?(h++,u+=r):m&&(g++,l+=r)}),(2>=h||2>=g)&&(n.scoreData.errorMessage=this.msgMan.getMessage("notEnough")),0!==h&&(u/=h),0!==g&&(l/=g),e.avgCon1=u,e.avgCon2=l,e.diff=e.avgCon1-e.avgCon2,0!==p&&(e.avgBoth=f/p),n.addPenalty(e,r)},checkArray:function(e,r){for(var t=0;t<r.length;t++){var n=r[t];if(n==e)return!0}return!1},varianceAll:function(e){var r=this;t.each(r.parcelArray,function(t){r.varianceParcel(t,e)})},varianceParcel:function(e,r){var n=this,a=r.AnalyzedVar,o=e.trialIData,s=r.cond1VarValues,i=r.cond2VarValues,c=r.condVar,u=e.avgBoth,l=0,f=0,h=[],g=[],p=[],d=r.errorLatency,m=d.useForSTD;t.each(o,function(e){var t=e.data,o=e[a],u=r.ErrorVar,l=t[u],f=t[c],p=n.checkArray(f,s),d=n.checkArray(f,i);p?m?h.push(o):"0"==l&&h.push(o):d&&(m?g.push(o):"0"==l&&h.push(o))}),p=h.concat(g),t.each(p,function(e){var r=e;l=r-u,f+=l*l}),e.variance=f/(p.length-1)},scoreAll:function(e){var r=this,n=0;t.each(r.parcelArray,function(t){r.scoreParcel(t,e),n+=t.score});var a=n/r.parcelArray.length;r.scoreData.score=a.toFixed(2)},scoreParcel:function(e){var r=this,t=Math.sqrt(e.variance);0===t?(r.scoreData.errorMessage=this.msgMan.getMessage("notEnough"),e.score=e.diff):e.score=e.diff/t}}),r}),define("utils/post",[],function(){function e(e,t){return new Promise(function(n,a){var o=new XMLHttpRequest;o.open("POST",e,!0),o.setRequestHeader("Content-Type","application/json; charset=UTF-8"),o.onreadystatechange=function(){4===this.readyState&&(this.status>=200&&this.status<400?n(this.responseText):a(new Error("Failed posting to: "+e)))},o.send(r(t))})}function r(e){return"string"==typeof e?e:JSON.stringify(e)}return e}),define("pipScorer/Scorer",["require","./computeD","./msgMan","./parcelMng","underscore","utils/post"],function(e){function r(){this.computeData=new t,this.msgMan=new n,this.parcelMng=new a(this.msgMan)}var t=e("./computeD"),n=e("./msgMan"),a=e("./parcelMng"),o=e("underscore"),s=e("utils/post");return window.console||(window.console={log:o.noop,error:o.noop}),o.assign(r.prototype,{addSettings:function(e,r){switch(e){case"compute":this.computeData.setComputeObject(r);break;case"message":this.msgMan.setMsgObject(r);break;default:throw new Error('SCORER:addSettings: unknow "type" '+e)}},computeD:function(){var e=this.computeData,r=this.parcelMng;e.setDataArray(),r.Init(e),r.avgAll(e),r.varianceAll(e),r.scoreAll(e);var t=r.scoreData;return void 0===t.errorMessage||null===t.errorMessage?{FBMsg:this.getFBMsg(t.score),DScore:t.score,error:!1}:{FBMsg:t.errorMessage,DScore:"",error:!0}},postToServer:function(e,r,t,n){var a=this.computeData.postSettings||{},o=a.url,i={};return t||(t=a.score),n||(n=a.msg),i[t]=e,i[n]=r,s(o,JSON.stringify(i))},dynamicPost:function(e){var r=this.computeData.postSettings||{},t=r.url;return s(t,JSON.stringify(e))},getFBMsg:function(e){var r=this.msgMan.getScoreMsg(e);return r}}),r}),define("pipScorer",["pipScorer/Scorer"],function(e){return e});