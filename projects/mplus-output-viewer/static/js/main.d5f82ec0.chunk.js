(window["webpackJsonpmplus-output-viewer"]=window["webpackJsonpmplus-output-viewer"]||[]).push([[0],{134:function(e,t,n){e.exports=n(274)},274:function(e,t,n){"use strict";n.r(t);var r=n(28),a=n.n(r),l=n(30),u=n(0),o=n.n(u),c=n(282),s=n(284),i=n(287),m=n(289),p=function(e){var t=e.mplusOutput,n=e.handlePageChange;if(null===t)return"";var r=t.parsed.NumberOfGroups>1?o.a.createElement(i.a.Item,{onClick:function(){return n("groupcomparison")}},"Group comparison"):"";return o.a.createElement(m.a,{columns:1,doubling:!0,style:{marginBottom:"2%"}},o.a.createElement(m.a.Column,null,o.a.createElement(i.a,null,o.a.createElement(i.a.Item,{onClick:function(){return n("wholeoutput")}},"Whole output"),o.a.createElement(i.a.Item,{onClick:function(){return n("modelresults")}},"Model results"),o.a.createElement(i.a.Item,{onClick:function(){return n("stdmodelresults")}},"Standardized model results"),r)))},f=function(e){for(var t=e.regex,n=0,r=[],a="";null!==(a=t.exec(e.string));)r.push({result:a[0],id:"C"+n,contentStart:a.index+a[0].length,start:a.index}),n++;return{occurances:r,string:e.string}},d=function(e){var t=e.occurances;t[t.length-1].end=e.string.length;for(var n=t.length-2;n>=0;n--)t[n].end=t[n+1].start-1;return e.occurances=t,e},h=function(e){var t=e.occurances,n=e.string,r=[];for(var a in t){var l=t[a];r.push({header:l,id:l.id,content:n.substring(l.contentStart,l.end).split("\n")})}return e.occurances=r,e},g=function(e){var t=f({string:e.string,start:0,chapters:[],regex:e.regex});return e.filteringRegex&&(t.occurances=t.occurances.filter(function(t){return!e.filteringRegex.test(t.result)})),t=d(t),h(t).occurances},E=function(e){var t=e[0].content.filter(function(e){return e.toLowerCase().indexOf("title:")>-1});return void 0===t?void 0:t[0]},v=function(e){var t=e.match(/(Number of groups[ ]+[0-9]{1,2})/);return null===t?void 0:1*t[0].replace(/[^0-9]/g,"")},O=function(e){for(var t=e.cell,n=e.headercount;t.keys.length+t.values.length<n;)t.values.push("");return t},b=function(e){var t=f({string:e.content.join("\n"),start:0,chapters:[],regex:/(.+[A-Za-z]$)/gm});t=d(t);var n=h(t).occurances.map(function(e){return function(e){var t=e.content.map(function(e){return e.split(/([A-Z_\-0-9.$]+)/).filter(function(e){return/[A-Z0-9]/.test(e)})}).filter(function(e){return e.length>0});return t.map(function(t){return function(e,t){var n={};return n.keys=[t,e[0]],e.splice(0,1),n.values=e,n}(t,e.header.result)})}(e)});return n=n.map(function(t){return t.map(function(t){return function(e,t){return e.keys=[t].concat(e.keys),e}(t,e.header.result)})})},S=function(e){var t,n=e.chapters,r=e.headerToFind,a=e.tableheaders,l=e.NumberOfGroups;void 0===n|null===n&&alert("No output loaded to get model results from!");var u=n.filter(function(e){return e.header.result===r})[0];if(void 0!==l&l>1){t=(t=g({string:u.content.join("\n"),regex:/Group [A-Z_]+$/gm}).map(function(e){return b(e)}).map(function(e){return e.flat()}).flat()).map(function(e){return O({cell:e,headercount:a.length})})}else{t=(t=b(u).map(function(e){return e.flat()}).flat()).map(function(e){return O({cell:e,headercount:a.length})})}return t},y=function(e,t){var n=e.nameOfChapter,r=e.splitter,a=C({nameOfChapter:n,chapters:t});return g({string:a.content.join("\n"),regex:r})},C=function(e){var t=e.nameOfChapter;return e.chapters.filter(function(e){return e.header.result===t})[0]},w=function(e){var t={nameOfChapter:"UNIVARIATE SAMPLE STATISTICS",splitter:/UNIVARIATE HIGHER-ORDER MOMENT DESCRIPTIVE STATISTICS FOR [A-Z0-9_]+$/gm};t.content=y(t,e);var n={nameOfChapter:"MODEL RESULTS",splitter:/Group [A-Z_]+$/gm};n.content=y(n,e);var r={nameOfChapter:"RESIDUAL OUTPUT",splitter:/ESTIMATED MODEL AND RESIDUALS \(OBSERVED - ESTIMATED\) FOR [A-Z0-9_]+$/gm};return r.content=y(r,e),[t,n,r]},R=function(e,t){var n=t.keys.slice(1,3).join("");return void 0===e[n]?e[n]={keys:t.keys.slice(1,3),values:[{group:t.keys[0],values:t.values}]}:e[n].values.push({group:t.keys[0],values:t.values}),e},T=function(e){var t=e.cells,n=e.variables,r=Object.values(t.reduce(R,{}));return(r=n.map(function(e,t){return r.map(function(n){return function(e,t,n){return e.values.map(function(r){return{keys:e.keys.concat(t).concat(r.group),group:r.group,value:r.values[n]}})}(n,e,t)})}).flat()).flat()},A=function(e){var t={};t.chapters=g({string:e,regex:/(^[A-Z][A-Z 0-9]+[A-Z]$)/gm,filteringRegex:/ (BY|WITH|ON)$/m}),t.title=E(t.chapters),t.NumberOfGroups=v(e);var n=["Estimate","S.E.","Est/S.E.","P-Value"],r=["Column1","Column2","Column3"].concat(n),a="MODEL RESULTS",l=S({chapters:t.chapters,headerToFind:a,tableheaders:r,NumberOfGroups:t.NumberOfGroups});return t.modelResults={header:a,cells:T({cells:l,variables:n})},a="STANDARDIZED MODEL RESULTS",l=S({chapters:t.chapters,headerToFind:a,tableheaders:r,NumberOfGroups:t.NumberOfGroups}),t.standardizedModelResults={header:a,cells:T({cells:l,variables:n})},t.groups=function(e){var t=e.reduce(function(e,t){return e[t]=1,e},{});return Object.getOwnPropertyNames(t)}(t.modelResults.cells.map(function(e){return e.group})),t.chaptersbygroup=w(t.chapters),t},k=n(275),I=n(283),x=function(e){var t=e.handleFileLoad;if(null!==e.mplusOutput)return"";return o.a.createElement(c.a,null,o.a.createElement(m.a,null,o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,{centered:!0},o.a.createElement(k.a,{primary:!0,style:{fontSize:"200%"}}," ",o.a.createElement(I.a,{id:"file-upload",type:"file",style:{display:"none",color:"red"},onChange:t}),o.a.createElement("label",{htmlFor:"file-upload",className:"custom-file-upload"},"Upload .out -file")))))},L=n(286),j=n(288),N=function(e){var t=e.results,n=e.show;if(null===t||!n)return"";var r=t.cells;return o.a.createElement(c.a,null,o.a.createElement(j.a,null,t.header),o.a.createElement(L.a,null,o.a.createElement(L.a.Body,null,r.map(function(e){return o.a.createElement(L.a.Row,null,e.keys.concat(e.value).map(function(e){return o.a.createElement(L.a.Cell,null,e)}))}))))},D=n(285),M=function(e){var t=e.mplusOutput,n=e.show,r=Object(u.useState)([]),a=Object(l.a)(r,2),c=a[0],i=a[1];if(null===t||!n)return"";var p=null===t?[]:t.parsed.chapters.map(function(e){return e.header.result}),f=t.parsed.chapters,d=function(e){return c.indexOf(e)>-1},h=function(e){var t,n=e.target.innerText;i(d(t=n)?c.filter(function(e){return e!==t}):c.concat(t))};return o.a.createElement(m.a,{columns:2,doubling:!0},o.a.createElement(m.a.Column,{width:4},o.a.createElement(m.a.Row,null,o.a.createElement(k.a,{primary:!0,onClick:function(){c.length!==p.length?i(p):i([])}},c.length!==p.length?"SELECT ALL":"DESELECT ALL")),o.a.createElement(m.a.Row,null,o.a.createElement(s.a,null,p.map(function(e){var t=d(e);return o.a.createElement(m.a.Row,{key:"checkbox_"+e},o.a.createElement(D.a,{label:e,checked:t,onChange:h}))})))),o.a.createElement(m.a.Column,{width:12},f.map(function(e,t){return function(e,t){var n={whiteSpace:"pre-wrap",fontFamily:"Consolas",display:d(e.header)?"":"none"};return o.a.createElement("div",null,o.a.createElement("div",null),o.a.createElement(j.a,{style:n},e.header),o.a.createElement("div",{key:"chapter_"+t,style:n,dangerouslySetInnerHTML:{__html:e.content}}))}({content:e.content.join("\n"),header:e.header.result},t)})))},G=function(e){var t=e.chaptersbygroup,n=e.show,r=Object(u.useState)(null),a=Object(l.a)(r,2),s=a[0],i=a[1];if(Object(u.useEffect)(function(){var e=null!==t?t[0]:null;console.log("initialChapter",e),i(e)},[t]),null===t||!n)return"";var p=t.map(function(e){return e.nameOfChapter}),f=function(e){console.log("checking"),i(t[p.indexOf(e.target.innerText)])},d={marginLeft:"2%"};return o.a.createElement(c.a,null,p.map(function(e){return o.a.createElement(D.a,{radio:!0,name:"checkboxRadioGroup",style:d,label:e,checked:(null!==s?s.nameOfChapter:null)===e,onChange:f})}),o.a.createElement(m.a,{columns:2,celled:!0},function(e){return null!==e?e.content.map(function(e){return o.a.createElement(m.a.Column,null,(t=[e.header.result].concat(e.content).join("\n"),o.a.createElement("div",null,o.a.createElement("div",{style:{whiteSpace:"pre-wrap",fontFamily:"Consolas",fontSize:"65%"},dangerouslySetInnerHTML:{__html:t}}))));var t}):""}(s)))},F=function(){var e=Object(u.useState)(null),t=Object(l.a)(e,2),n=t[0],r=t[1],a=Object(u.useState)("groupcomparison"),i=Object(l.a)(a,2),m=i[0],f=i[1];return console.log("page",m),console.log("mplusOutput: ",n),o.a.createElement(c.a,null,o.a.createElement(x,{mplusOutput:n,handleFileLoad:function(e){var t=e.target,n=t.files[0],a=new FileReader;a.onload=function(){r({string:a.result,filename:t.files[0].name,parsed:A(a.result)})},a.readAsText(n,"ISO-881")}}),o.a.createElement(s.a,null,o.a.createElement(p,{mplusOutput:n,handlePageChange:function(e){f(e)}})),o.a.createElement(M,{show:"wholeoutput"===m,mplusOutput:n}),o.a.createElement(N,{show:"modelresults"===m,results:null!==n?n.parsed.modelResults:null}),o.a.createElement(N,{show:"stdmodelresults"===m,results:null!==n?n.parsed.standardizedModelResults:null}),o.a.createElement(G,{show:"groupcomparison"===m,chaptersbygroup:null!==n?n.parsed.chaptersbygroup:null}))};a.a.render(o.a.createElement(F,null),document.getElementById("root"))}},[[134,1,2]]]);
//# sourceMappingURL=main.d5f82ec0.chunk.js.map