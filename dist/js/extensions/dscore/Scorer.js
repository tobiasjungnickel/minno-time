/*!
 * PIPlayer v0.2.0
 *  License
 */

define("extensions/dscore/computeD",["jquery","app/API"],function(e,t){var n={dataArray:{},AnalyzedVar:"latency",ErrorVar:"error",condVar:"",cond1VarValues:[],cond2VarValues:[],parcelVar:"",parcelValue:[],fastRT:300,maxFastTrialsRate:.1,minRT:400,maxRT:1e4,maxErrorParcelRate:.4,errorLatency:{use:"latency",penalty:600,useForSTD:!0},postSettings:{}};return e.extend(n,{setComputeObject:function(t){e.extend(this,t)},setDataArray:function(){this.dataArray=t.getLogs()}}),n}),define("extensions/dscore/msgMan",["jquery","underscore"],function(e,t){var n={MessageDef:[],manyErrors:"There were too many errors made to determine a result.",tooFast:"There were too many fast trials to determine a result.",notEnough:"There were not enough trials to determine a result."},r={setMsgObject:function(t){e.extend(n,t)},getScoreMsg:function(e){var r=n.MessageDef;if(!r||!r.length)throw new Error('You must define a "MessageDef" array.');var i=parseFloat(e),s=null,o=null,u="error: msg was not set",a=!1;t.each(r,function(e){s=parseFloat(e.cut),o=e.message,i<=s&&!a&&(u=o,a=!0)});if(!a){var f=r.length,l=r[f-1];u=l.message}return u},getMessage:function(t){return n[t]}};return r}),define("extensions/dscore/parcelMng",["jquery","app/API","underscore","./msgMan"],function(e,t,n,r){var i={};return e.extend(i,{parcelArray:[],scoreData:{},Init:function(e){var s=t.getLogs();i.parcelArray=[],i.scoreData={};var o=e.AnalyzedVar,u=e.ErrorVar,a=e.parcelVar,f=e.parcelValue,l=e.minRT,c=e.maxRT,h=e.fastRT,p=0,d=0,v=0,m=0,g=parseFloat(e.maxFastTrialsRate);if(typeof f=="undefined"||f.length===0){v=0,p=0,d=0,m=0;var y={};y.name="general",y.trialIData=[],n.each(s,function(t){t[o]>=l&&t[o]<=c?(v++,t.data[u]==1&&m++,i.validate(y,t,e)&&p++):t[o]<=h&&d++}),i.checkErrors(v,m,e),i.parcelArray[0]=y}else n.each(f,function(t,r){v=0,p=0,d=0,m=0;var f={};f.name=t,f.trialIData=[],n.each(s,function(n){var r=n.data[a];r==t&&(n[o]>=l&&n[o]<=c?(v++,n.data[u]==1&&m++,i.validate(f,n,e)&&p++):n[o]<=h&&d++)}),i.checkErrors(v,m,e),i.parcelArray[r]=f});d/p>g&&(i.scoreData.errorMessage=r.getMessage("tooFast"))},checkErrors:function(e,t,n){var s=n.maxErrorParcelRate;t/e>s&&(i.scoreData.errorMessage=r.getMessage("manyErrors"))},validate:function(e,t,n){var r=n.errorLatency,i=n.ErrorVar,s=t.data;if(r.use=="latency")return e.trialIData.push(t),!0;if(r.use=="false")return s[i]=="1"?!1:(e.trialIData.push(t),!0);if(r.use=="penalty")return e.trialIData.push(t),!0},addPenalty:function(e,t){var r=t.errorLatency;if(r.use=="penalty"){var s=parseFloat(r.penalty),o=t.ErrorVar,u=t.AnalyzedVar,a=t.condVar,f=t.cond1VarValues,l=t.cond2VarValues,c=e.trialIData,h=e.avgCon1,p=e.avgCon2;n.each(c,function(e){var t=e.data,n=t[o],r=t[a],c=i.checkArray(r,f),d=i.checkArray(r,l);n=="1"&&(c?e[u]+=h+s:d&&(e[u]+=p+s))})}},avgAll:function(e){n.each(i.parcelArray,function(t){i.avgParcel(t,e)})},avgParcel:function(e,t){var s=e.trialIData,o=t.condVar,u=t.cond1VarValues,a=t.cond2VarValues,f=t.AnalyzedVar,l=0,c=0,h=0,p=0,d=0,v=0;n.each(s,function(e){var t=e[f],n=e.data;h+=t,v++;var r=n[o],s=i.checkArray(r,u),m=i.checkArray(r,a);s?(p++,l+=t):m&&(d++,c+=t)});if(p<=2||d<=2)i.scoreData.errorMessage=r.getMessage("notEnough");p!==0&&(l/=p),d!==0&&(c/=d),e.avgCon1=l,e.avgCon2=c,e.diff=e.avgCon1-e.avgCon2,v!==0&&(e.avgBoth=h/v),i.addPenalty(e,t)},checkArray:function(e,t){for(var n=0;n<t.length;n++){var r=t[n];if(r==e)return!0}return!1},varianceAll:function(e){n.each(i.parcelArray,function(t){i.varianceParcel(t,e)})},varianceParcel:function(e,t){var r=t.AnalyzedVar,s=e.trialIData,o=t.cond1VarValues,u=t.cond2VarValues,a=t.condVar,f=e.avgBoth,l=0,c=0,h=[],p=[],d=[],v=t.errorLatency,m=v.useForSTD;n.each(s,function(e){var n=e.data,s=e[r],f=t.ErrorVar,l=n[f],c=n[a],d=i.checkArray(c,o),v=i.checkArray(c,u);d?m?h.push(s):l=="0"&&h.push(s):v&&(m?p.push(s):l=="0"&&h.push(s))}),d=h.concat(p),n.each(d,function(e){var t=e;l=t-f,c+=l*l}),e.variance=c/(d.length-1)},scoreAll:function(e){var t=0;n.each(i.parcelArray,function(n){i.scoreParcel(n,e),t+=n.score});var r=t/i.parcelArray.length;i.scoreData.score=r.toFixed(2)},scoreParcel:function(e){var t=Math.sqrt(e.variance);t===0?(i.scoreData.errorMessage=r.getMessage("notEnough"),e.score=e.diff):e.score=e.diff/t},simulateOldCode:function(e){var t=[],r=[2,3,5,6],s=e.cond1VarValues,o=e.cond2VarValues,u=e.condVar,a=e.ErrorVar,f=e.AnalyzedVar,l=i.parcelArray[0],c=i.parcelArray[1],h=l.trialIData,p=c.trialIData;n.each(h,function(e){var n=e.data,l=n[u],c=i.checkArray(l,s),h=i.checkArray(l,o),p={};c?(p.block=r[0],p.lat=e[f],p.err=n[a]):h&&(p.block=r[2],p.lat=e[f],p.err=n[a]),t.push(p)}),n.each(p,function(e){var n=e.data,l=n[u],c=i.checkArray(l,s),h=i.checkArray(l,o),p={};c?(p.block=r[1],p.lat=e[f],p.err=n[a]):h&&(p.block=r[3],p.lat=e[f],p.err=n[a]),t.push(p)});var d=i.scoreTask(t,r);return d}}),i}),define("extensions/dscore/Scorer",["jquery","app/API","underscore","./computeD","./msgMan","./parcelMng"],function(e,t,n,r,i,s){var o={};return e.extend(o,{addSettings:function(e,t){e=="compute"?r.setComputeObject(t):e=="message"&&i.setMsgObject(t)},init:function(){!!window.console||(console={}),console.log||(console.log=function(){})},computeD:function(){o.init(),r.setDataArray(),s.Init(r),s.avgAll(r),s.varianceAll(r),s.scoreAll(r);var e=s.scoreData,t={};return e.errorMessage===undefined||e.errorMessage===null?(t.FBMsg=o.getFBMsg(e.score),t.DScore=e.score):(t.FBMsg=e.errorMessage,t.DScore=""),t},getInfo:function(){},postToServer:function(t,n,i,s){var o=r.postSettings||{},u=o.url;i||(i=o.score),s||(s=o.msg);var a={};return a[i]=t,a[s]=n,e.post(u,JSON.stringify(a))},dynamicPost:function(t){var n=r.postSettings||{},i=n.url;return e.post(i,JSON.stringify(t))},getFBMsg:function(e){var t=i.getScoreMsg(e);return t}}),o});