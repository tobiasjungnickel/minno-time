define(["../data/categories","./default","./instructions","./IATlayout"],function(e,t,n,r){return function(){var s={},o=e.attribute1.name,u=e.attribute2.name,a=e.concept1.name,f=e.concept2.name;return s.Default=[t()],s.instructions=n(),s.IAT=[{data:{part:1,condition:a+","+f},layout:r(1),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:2,condition:o+","+u},layout:r(2),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:3,row:1,condition:o+"/"+a+","+u+"/"+f,parcel:"first"},layout:r(3),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:3,row:2,condition:o+"/"+a+","+u+"/"+f,parcel:"first"},layout:r(3),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:4,row:1,condition:o+"/"+a+","+u+"/"+f,parcel:"first"},layout:r(4),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:4,row:2,condition:o+"/"+a+","+u+"/"+f,parcel:"first"},layout:r(4),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:5,condition:f+","+a},layout:r(5),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_right"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:6,row:1,condition:o+"/"+f+","+u+"/"+a,parcel:"first"},layout:r(6),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_right"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:6,row:2,condition:o+"/"+f+","+u+"/"+a,parcel:"first"},layout:r(6),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:7,row:1,condition:o+"/"+f+","+u+"/"+a,parcel:"first"},layout:r(7),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"concept1_right"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]},{data:{part:7,row:2,condition:o+"/"+f+","+u+"/"+a,parcel:"first"},layout:r(7),inherit:"Default",stimuli:[{inherit:{type:"exRandom",set:"attribute1_left"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}},{inherit:{type:"exRandom",set:"feedback"}}]}],s}});