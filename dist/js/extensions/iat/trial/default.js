define(["../data/properties","./input_decorator","./feedback_decorator"],function(e,t,n){function r(){var r={data:{score:0},input:[],layout:[{inherit:{type:"byData",set:"layout",data:"left"}},{inherit:{type:"byData",set:"layout",data:"right"}}],interactions:[{conditions:[{type:"begin"}],actions:[{type:"showStim",handle:"target"}]},{conditions:[{type:"inputEqualsStim",property:"side",handle:"target"}],actions:[{type:"removeInput",handle:["left","right","timeout"]},{type:"hideStim",handle:"error_feedback"},{type:"log"},{type:"trigger",handle:"correct_feedback"}]},{conditions:[{type:"inputEquals",value:"end"}],actions:[{type:"hideStim",handle:"All"},{type:"setInput",input:{handle:"endTrial",on:"timeout",duration:e.inter_trial_interval||0}}]},{conditions:[{type:"inputEquals",value:"endTrial"}],actions:[{type:"endTrial"}]},{conditions:[{type:"inputEquals",value:"skip1"}],actions:[{type:"setInput",input:{handle:"skip2",on:"enter"}}]},{conditions:[{type:"inputEquals",value:"skip2"}],actions:[{type:"goto",destination:"nextWhere",properties:{blockStart:!0}},{type:"endTrial"}]}],stimuli:[]},i={conditions:[{type:"inputEqualsStim",property:"side",handle:"target",negate:!0},{type:"inputEquals",value:["right","left"]}],actions:[{type:"trigger",handle:"error_feedback"},{type:"setTrialAttr",setter:{score:1}}]};return e.correct_errors||i.actions.unshift({type:"removeInput",handle:["left","right","timeout"]}),r.interactions.push(i),n(r),t(r),r}return r});