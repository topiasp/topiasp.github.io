(this.webpackJsonppysakki=this.webpackJsonppysakki||[]).push([[0],{178:function(e,t,r){e.exports=r(328)},328:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(25),c=r.n(o),i=r(16),l=r(38),u=r(23),s=r(28),p=r.n(s),f=r(44),m=function(){var e=Object(f.a)(p.a.mark((function e(t){var r,n,a,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("params",t),r=t.reduce((function(e,t){return e.includes(t.stopId)?e:e.concat(t.stopId)}),[]),n=['["',r.join('","'),'"]'].join(""),a="{ stops(ids: "+n+")",a+="{   name gtfsId  stoptimesWithoutPatterns(numberOfDepartures:30) {",a+=["scheduledArrival","realtimeArrival","arrivalDelay","scheduledDeparture","realtimeDeparture","departureDelay","realtime","realtimeState","serviceDay","headsign"].join(" "),a+=" trip {     gtfsId        tripShortName        serviceId  pattern { code }      route {          id          shortName          gtfsId        }              }",a+="   }       }      }",e.next=11,fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{body:JSON.stringify({query:a}),headers:{"user-agent":"Mozilla/4.0 MDN Example","content-type":"application/json"},method:"POST",mode:"cors",redirect:"follow",referrer:"no-referrer"});case 11:return o=e.sent,e.abrupt("return",o);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(r,!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=function(e){return function(){var t=Object(f.a)(p.a.mark((function t(r){var n,a,o;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m(e);case 2:return n=t.sent,t.next=5,n.json();case 5:return a=t.sent,console.log("parsedStream",a),(o=a.data.stops.flatMap((function(e){return e.stoptimesWithoutPatterns.map((function(t){return b({stopname:e.name,stopId:e.gtfsId},t)}))}))).sort((function(e,t){return e.realtimeArrival-t.realtimeArrival})),t.abrupt("return",r({type:"SET_TIMETABLES",data:o}));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},g=r(335),y=r(338),h=r(30),v=r(35),j=r.n(v),E=function(e){var t=(e-e%60)/60,r=(t-t%60)/60;return r<10&&(r="0"+r),(t%=60)<10&&(t="0"+t),r+":"+t};function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var w=Object(u.b)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(r,!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e)}),{getTimetables:O})((function(e){var t=e.followedPatterns,r=e.getTimetables,o=e.timetables;if(Object(n.useEffect)((function(){t&&t.length>0&&r(t)}),[t]),!t||0===t.length)return a.a.createElement("div",null,"Ei seurattuja busseja.");if(!o)return"";return a.a.createElement(g.a,{style:{marginTop:"5%"}},a.a.createElement(y.a.Group,null,o.filter((function(e){return t.find((function(t){return t.patternId===e.trip.pattern.code}))})).map((function(e){var t=e.trip.route.shortName,r=E(e.realtimeArrival),n=E(e.scheduledArrival);return a.a.createElement(y.a,{key:j()(),fluid:!0},a.a.createElement(y.a.Content,{style:{fontSize:"120%"}},a.a.createElement("span",{style:{color:"#006600",fontSize:"150%"}},t," "),a.a.createElement(h.a,{name:"beer",style:{float:"right",fontSize:"150%",color:"#eaea4e"}})),a.a.createElement(y.a.Content,null,a.a.createElement("span",null,a.a.createElement("b",null," ",r," ")),a.a.createElement("span",{style:{marginLeft:"5%"}},n)))}))))})),S=r(163),I=r.n(S),D=function(){var e=Object(f.a)(p.a.mark((function e(t){var r,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r='{\n      stops(name: "'.concat(t,'") {\n        gtfsId\n        name\n        code\n        lat\n        lon\n        patterns {\n          code\n          directionId\n          headsign\n          route {\n            gtfsId\n            shortName\n            longName\n            mode\n          }\n        }\n      }\n    }\n    '),e.next=3,fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{body:JSON.stringify({query:r}),headers:{"user-agent":"Mozilla/4.0 MDN Example","content-type":"application/json"},method:"POST",mode:"cors",redirect:"follow",referrer:"no-referrer"});case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=r(339),T=function(e){var t=e.patterns.map((function(e){return"(".concat(e.headsign," ").concat(e.route.shortName,")")}));return{title:e.name+" "+t,key:e.gtfsId,name:e.name,patterns:e.patterns}},k=function(e){var t=e.setSelectedStop,r=e.placeholder,o=Object(n.useState)([]),c=Object(l.a)(o,2),i=c[0],u=c[1],s=Object(n.useState)(""),p=Object(l.a)(s,2),f=p[0],m=p[1];return a.a.createElement(g.a,null,a.a.createElement(N.a,{minCharacters:4,noResultsMessage:"Pys\xe4kkej\xe4 ei l\xf6ydy",onResultSelect:function(e,r){var n=r.result;t(n),console.log("selected",n)},onSearchChange:I.a.debounce((function(e,t){var r=t.value;m(r),D(r).then((function(e){return e.json()})).then((function(e){console.log("res",e),u(e.data.stops.map((function(e){return T(e)})))}))}),500,{leading:!0}),results:i,value:f,size:"big",placeholder:r}))},A=r(337),C=r(340),R=r(342),x=r(167),M=r.n(x),z="bustop-followed-patterns",_=function(e){var t=localStorage.getItem(z);void 0===t|null===t?localStorage.setItem(z,e):localStorage.setItem(z,t.split(",").concat(e))},L=function(e){var t=localStorage.getItem(z);void 0===t|null===t||localStorage.setItem(z,t.split(",").filter((function(t){return t!==e})))},B=[],q=function(e){return{stopId:e.stop.key,patternId:e.pattern.code,shortName:e.pattern.route.shortName}},J=function(e){return e.stop.key+"|"+e.pattern.code+"|"+e.pattern.route.shortName},F=function(e){return e.stopId+"|"+e.patternId+"|"+e.shortName};function V(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var W=Object(u.b)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?V(r,!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):V(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e)}),{addPattern:function(e){var t=q(e);return _(J(e)),{type:"ADD_PATTERN",data:t}}})((function(e){var t=e.addPattern,r=e.followedPatterns,o=Object(n.useState)(void 0),c=Object(l.a)(o,2),i=c[0],u=c[1];return console.log("selectedStop",i),a.a.createElement("div",null,i?a.a.createElement(a.a.Fragment,null,a.a.createElement(R.a,{as:"h2"},i.name),a.a.createElement(A.a,{divided:!0,verticalAlign:"middle"},i.patterns.map((function(e){var n="RAIL"===e.route.mode?"train":e.route.mode.toLowerCase();return r.find((function(t){return t.patternId===e.code}))?"":a.a.createElement(A.a.Item,{key:M()()},a.a.createElement(A.a.Content,{floated:"right"},a.a.createElement(C.a,{positive:!0,onClick:function(){return t({stop:i,pattern:e})}},a.a.createElement(h.a,{name:n,style:{fontSize:"130%",color:"white"}}),a.a.createElement(h.a,{name:"plus",style:{fontSize:"130%",color:"white"}}))),a.a.createElement(A.a.Content,null,a.a.createElement("span",{style:{fontSize:"130%"}},e.route.shortName),a.a.createElement("div",{style:{marginRight:"2%"}},e.headsign)))})))):a.a.createElement(k,{setSelectedStop:u,placeholder:"Pys\xe4kin nimi"}))})),G=r(341),H=function(e){var t=e.activeItem,r=e.pages,n=e.onChoose;return a.a.createElement(G.a,{attached:"top",tabular:!0,style:{marginTop:"5%"}},r.map((function(e){return a.a.createElement(G.a.Item,{key:j()(),active:t===e.componentName,onClick:function(){return n(e.componentName)}},e.name)})))},K=r(343);function Q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var U=Object(u.b)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Q(r,!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Q(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e)}),{removePattern:function(e){return console.log("remove",e),L(F(e)),{type:"REMOVE_PATTERN",data:e}}})((function(e){var t=e.followedPatterns,r=e.removePattern;console.log("followedPatterns",t);return a.a.createElement(a.a.Fragment,null,a.a.createElement(A.a,{divided:!0,verticalAlign:"middle"},t.map((function(e){return a.a.createElement(A.a.Item,{key:j()()},a.a.createElement(A.a.Content,{floated:"right"},a.a.createElement(C.a,{negative:!0,onClick:function(){return r(e)}},"Poista")),a.a.createElement(A.a.Content,{style:{fontSize:"150%"}}," ",e.shortName))}))))}));function X(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var Y=Object(u.b)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?X(r,!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):X(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e)}),{getTimetables:O,setPatterns:function(e){return{type:"SET_PATTERNS",data:e}}})((function(e){var t=e.setPatterns,r=Object(n.useState)("Departures"),o=Object(l.a)(r,2),c=o[0],i=o[1];Object(n.useEffect)((function(){t(function(){var e=localStorage.getItem(z);return(void 0===e|null===e?[]:e.split(",")).map((function(e){return{stopId:e.split("|")[0],patternId:e.split("|")[1],shortName:e.split("|")[2]}}))}().filter((function(e){return e.patternId})))}),[]);return a.a.createElement(K.a,{columns:3},a.a.createElement(H,{activeItem:c,pages:[{name:"Aikataulut",componentName:"Departures"},{name:"Seurattavat bussit",componentName:"FollowedPatternList"},{name:"Valitse d\xf6s\xe4",componentName:"ChooseBus"}],onChoose:i}),a.a.createElement(K.a.Column,{width:3}),a.a.createElement(K.a.Column,{width:12},"ChooseBus"===c?a.a.createElement(W,null):"Departures"===c?a.a.createElement(w,null):a.a.createElement(U,null)),a.a.createElement(K.a.Column,{width:1}))})),Z=r(36),$=r(169),ee=r(170),te=Object(Z.combineReducers)({timetables:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TIMETABLES":return t.data;case"INIT":return null;default:return e}},followedPatterns:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_PATTERN":return e.concat(t.data);case"SET_PATTERNS":return t.data;case"REMOVE_PATTERN":return e.filter((function(e){return!(e.stopId===t.data.stopId&e.patternId===t.data.patternId)}));case"INIT":return B;default:return e}}}),re=Object(Z.createStore)(te,Object(ee.composeWithDevTools)(Object(Z.applyMiddleware)($.a)));c.a.render(a.a.createElement(u.a,{store:re},a.a.createElement(Y,null)),document.getElementById("root"))}},[[178,1,2]]]);
//# sourceMappingURL=main.27d2deaf.chunk.js.map