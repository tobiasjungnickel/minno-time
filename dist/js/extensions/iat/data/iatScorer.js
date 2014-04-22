define(["underscore","extensions/dscore/Scorer","./properties","./categories"],function(e,t,n,r){return function(){var i=r.attribute1.name,s=r.attribute2.name,o=r.concept1.name,u=r.concept2.name,a={ErrorVar:"score",condVar:"condition",cond1VarValues:[i+"/"+o+","+s+"/"+u],cond2VarValues:[i+"/"+u+","+s+"/"+o],parcelVar:"parcel",parcelValue:["first","second"],fastRT:150,maxFastTrialsRate:.1,minRT:400,maxRT:1e4,errorLatency:{use:"latency",penalty:600,useForSTD:!0},postSettings:{score:"score",msg:"feedback",url:"/implicit/scorer"}},f=[{cut:"-0.65",message:"Your data suggest a strong implicit preference for "+u+" compared to "+o},{cut:"-0.35",message:"Your data suggest a moderate implicit preference for "+u+" compared to "+o},{cut:"-0.15",message:"Your data suggest a slight implicit preference for "+u+" compared to "+o},{cut:"0",message:"Your data suggest little to no difference in implicit preference between "+u+" and "+o},{cut:"0.15",message:"Your data suggest a slight implicit preference for "+o+" compared to "+u},{cut:"0.35",message:"Your data suggest a moderate implicit preference for "+o+" compared to "+u},{cut:"0.65",message:"Your data suggest a strong implicit preference for "+o+" compared to "+u}];return t.addSettings("compute",e.defaults(n.scorerObj||{},a)),t.addSettings("message",{MessageDef:n.scorerMessage||f}),t}});