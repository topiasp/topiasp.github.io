(window["webpackJsonpmplus-output-viewer"]=window["webpackJsonpmplus-output-viewer"]||[]).push([[0],{135:function(e,t,n){e.exports=n(275)},275:function(e,t,n){"use strict";n.r(t);var r=n(29),a=n.n(r),l=n(31),u=n(0),o=n.n(u),c=n(283),s=n(285),i=n(288),m=n(290),d=function(e){var t=e.mplusOutput,n=e.handlePageChange;if(null===t)return"";t.parsed.NumberOfGroups>1&&o.a.createElement(i.a.Item,{onClick:function(){return n("groupcomparison")}},"Group comparison");return o.a.createElement(m.a,{columns:1,doubling:!0,style:{marginBottom:"2%"}},o.a.createElement(m.a.Column,null,o.a.createElement(i.a,{inverted:!0},o.a.createElement(i.a.Item,{onClick:function(){return n("wholeoutput")}},"Whole output"),o.a.createElement(i.a.Item,{onClick:function(){return n("modelinformation")}},"Model information"),o.a.createElement(i.a.Item,{onClick:function(){return n("modelresults")}},"Model results"),o.a.createElement(i.a.Item,{onClick:function(){return n("stdmodelresults")}},"Standardized model results"))))},f=function(e){for(var t=e.regex,n=0,r=[],a="";null!==(a=t.exec(e.string));)r.push({result:a[0],id:"C"+n,contentStart:a.index+a[0].length,start:a.index}),n++;return{occurances:r,string:e.string}},p=function(e){var t=e.occurances;t[t.length-1].end=e.string.length;for(var n=t.length-2;n>=0;n--)t[n].end=t[n+1].start-1;return e.occurances=t,e},h=function(e){var t=e.occurances,n=e.string,r=[];for(var a in t){var l=t[a];r.push({header:l,id:l.id,content:n.substring(l.contentStart,l.end).split("\n")})}return e.occurances=r,e},v=function(e){var t=f({string:e.string,start:0,chapters:[],regex:e.regex});return e.filteringRegex&&(t.occurances=t.occurances.filter(function(t){return!e.filteringRegex.test(t.result)})),t=p(t),h(t).occurances},g=function(e){var t=e[0].content.filter(function(e){return e.toLowerCase().indexOf("title:")>-1});return void 0===t?void 0:t[0]},E=function(e){var t=e.match(/(Number of groups[ ]+[0-9]{1,2})/);return null===t?void 0:1*t[0].replace(/[^0-9]/g,"")},w=function(e){for(var t=e.cell,n=e.headercount;t.keys.length+t.values.length<n;)t.values.push("");return t},b=function(e){var t=f({string:e.content.join("\n"),start:0,chapters:[],regex:/(.+[A-Za-z]$)/gm});t=p(t);var n=h(t).occurances.map(function(e){return function(e){var t=e.content.map(function(e){return e.split(/([A-Z_\-0-9.$]+)/).filter(function(e){return/[A-Z0-9]/.test(e)})}).filter(function(e){return e.length>0});return t.map(function(t){return function(e,t){var n={};return n.keys=[t,e[0]],e.splice(0,1),n.values=e,n}(t,e.header.result)})}(e)});return n=n.map(function(t){return t.map(function(t){return function(e,t){return e.keys=[t].concat(e.keys),e}(t,e.header.result)})})},y=function(e){var t,n=e.chapters,r=e.headerToFind,a=e.tableheaders,l=e.NumberOfGroups;void 0===n|null===n&&alert("No output loaded to get model results from!");var u=n.filter(function(e){return e.header.result===r})[0];if(void 0!==l&l>1){t=(t=v({string:u.content.join("\n"),regex:/Group [A-Z_]+$/gm}).map(function(e){return b(e)}).map(function(e){return e.flat()}).flat()).map(function(e){return w({cell:e,headercount:a.length})})}else{t=(t=b(u).map(function(e){return e.flat()}).flat()).map(function(e){return w({cell:e,headercount:a.length})})}return t},O=function(e,t){var n=t.keys.slice(1,3).join("");return void 0===e[n]?e[n]={keys:t.keys.slice(1,3),values:[{group:t.keys[0],values:t.values}]}:e[n].values.push({group:t.keys[0],values:t.values}),e},R=function(e){var t=e.cells,n=e.variables,r=Object.values(t.reduce(O,{}));return r=n.map(function(e,t){return r.map(function(n){return function(e,t,n){return e.values.map(function(r){return{keys:e.keys.concat(t),group:r.group,value:r.values[n]}})}(n,e,t)})}).flat()},k=function(e){return e.replace(/^[ ]{1,}/,"").replace(/[ ]{1,}$/,"")},C=function(e){var t=e.header.result;return e.content.map(function(e){var n=k(e).split(/[ ]{2,}/),r=k(n[0]);return{header:t,statistic:r,value:1===n.length?-1:n.slice(1).map(function(e){return k(e)}).join(", ")}})},x=function(e){var t={string:e.content.join("\n"),regex:/^[A-Z*].+$/gm},n=v(t);return(n=(n=n.filter(function(e){return"*"!==e.header.result.substring(0,1)})).map(function(e){return e.content=e.content.filter(function(e){return e.length>1}),0===e.content.length&&(e.content=[e.header.result],e.header.result=k(e.header.result.replace(/[0-9]{1,}/,""))),e})).map(C).flat()},S=function(e){var t={};t.chapters=v({string:e,regex:/(^[A-Z][A-Z 0-9-]+[A-Z]$)/gm,filteringRegex:/ (BY|WITH|ON)$/m}),t.title=g(t.chapters),t.NumberOfGroups=E(e);var n=["Estimate","S.E.","Est/S.E.","P-Value"],r=["Column1","Column2","Column3"].concat(n),a="MODEL RESULTS",l=y({chapters:t.chapters,headerToFind:a,tableheaders:r,NumberOfGroups:t.NumberOfGroups});return t.modelResults={header:a,cells:R({cells:l,variables:n})},a="STANDARDIZED MODEL RESULTS",l=y({chapters:t.chapters,headerToFind:a,tableheaders:r,NumberOfGroups:t.NumberOfGroups}),t.standardizedModelResults={header:a,cells:R({cells:l,variables:n})},t.groups=function(e){var t=e.reduce(function(e,t){return e[t]=1,e},{});return Object.getOwnPropertyNames(t)}(t.modelResults.cells.flat().map(function(e){return e.group})),t.modelFitInformation=x(t.chapters.find(function(e){return"MODEL FIT INFORMATION"===e.header.result})),t},T=n(276),I=n(284),A=function(e){var t=e.handleFileLoad;if(null!==e.mplusOutput)return"";return o.a.createElement(c.a,null,o.a.createElement(m.a,null,o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,null),o.a.createElement(m.a.Row,{centered:!0},o.a.createElement(T.a,{primary:!0,style:{fontSize:"200%"}}," ",o.a.createElement(I.a,{id:"file-upload",type:"file",style:{display:"none",color:"red"},onChange:t}),o.a.createElement("label",{htmlFor:"file-upload",className:"custom-file-upload"},"Upload .out -file")))))},j=n(127),N=n(287),F=n(289),L=n(32),M=function(e){var t,n,r,a=function(e){var t,n,r;t=e.headers,n=e.data,r=e.delimiter||";";var a="";return a+=t.join(r)+"\n",a+=n.map(function(e){return Array.isArray(e),e.join(r)}).join("\n")}(e);null!==a&&(n=e.filename||"export.csv",a.match(/^data:text\/csv/i)||(a="data:text/csv;charset=utf-8,"+a),t=encodeURI(a),(r=document.createElement("a")).setAttribute("href",t),r.setAttribute("download",n),r.click())},G=function(e){var t=e.params,n=e.float;if(null===t)return"";var r=t.data,a=t.headers,l={margin:"0.5%",float:n};return o.a.createElement(T.a,{style:l,primary:!0,onClick:function(){M({data:r,headers:a})}},o.a.createElement(L.a,{size:"small",name:"download"}),"CSV")},Z=function(e){var t=e.headers,n=e.cells,r=e.cellToTableRow;return o.a.createElement(N.a,{celled:!0,selectable:!0,striped:!0,collapsing:!0,compact:!0},o.a.createElement(N.a.Header,null,o.a.createElement(N.a.Row,null,t.map(function(e){return o.a.createElement(N.a.HeaderCell,{celled:!0,striped:!0},e)}))),o.a.createElement(N.a.Body,null,n.map(r)))},D=function(e){var t=e.results,n=e.show,r=e.groups;if(null===t||!n)return"";var a=["Parameter header","Parameter","Value type"].concat(r),l=t.cells,u=l.flat().map(function(e){return Object(j.a)(e.keys).concat(e.group).concat(e.value)});return o.a.createElement(c.a,null,o.a.createElement(F.a,null,t.header,o.a.createElement(G,{params:{data:u,headers:["Parameter header","Parameter","Value type","Group","Value"]}})),o.a.createElement(Z,{cells:l,cellToTableRow:function(e){return o.a.createElement(N.a.Row,null,(t=e,t[0].keys.concat(t.map(function(e){return e.value}))).map(function(e){return o.a.createElement(N.a.Cell,null,e)}));var t},headers:a}))},P=n(286),$=function(e){var t=e.mplusOutput,n=e.show,r=Object(u.useState)([]),a=Object(l.a)(r,2),c=a[0],i=a[1];if(null===t||!n)return"";var d=null===t?[]:t.parsed.chapters.map(function(e){return e.header.result}),f=t.parsed.chapters,p=function(e){return c.indexOf(e)>-1},h=function(e){var t,n=e.target.innerText;i(p(t=n)?c.filter(function(e){return e!==t}):c.concat(t))};return o.a.createElement(m.a,{columns:2,doubling:!0},o.a.createElement(m.a.Column,{width:4},o.a.createElement(m.a.Row,null,o.a.createElement(T.a,{primary:!0,onClick:function(){c.length!==d.length?i(d):i([])}},c.length!==d.length?"SELECT ALL":"DESELECT ALL")),o.a.createElement(m.a.Row,null,o.a.createElement(s.a,null,d.map(function(e){var t=p(e);return o.a.createElement(m.a.Row,{key:"checkbox_"+e},o.a.createElement(P.a,{label:e,checked:t,onChange:h}))})))),o.a.createElement(m.a.Column,{width:12},f.map(function(e,t){return function(e,t){var n={whiteSpace:"pre-wrap",fontFamily:"Consolas",display:p(e.header)?"":"none"};return o.a.createElement("div",null,o.a.createElement("div",null),o.a.createElement(F.a,{style:n},e.header),o.a.createElement("div",{key:"chapter_"+t,style:n,dangerouslySetInnerHTML:{__html:e.content}}))}({content:e.content.join("\n"),header:e.header.result},t)})))},z=function(e){var t=e.modelFitInformation,n=e.show;if(null===t||!n)return"";var r=["Statistic group","Statistic","Value"],a=t.map(function(e){return[e.header,e.statistic,e.value]});return console.log("modelfit",a),o.a.createElement(c.a,null,o.a.createElement(F.a,{as:"h4"},"MODEL FIT INFORMATION",o.a.createElement(G,{params:{data:a,headers:r}})),o.a.createElement(Z,{cells:t,headers:r,cellToTableRow:function(e){return o.a.createElement(N.a.Row,{key:e.header+e.statistic+e.value},o.a.createElement(N.a.Cell,null,e.header),o.a.createElement(N.a.Cell,null,e.statistic),o.a.createElement(N.a.Cell,null,e.value))}}))},V=function(){var e=Object(u.useState)(null),t=Object(l.a)(e,2),n=t[0],r=t[1],a=Object(u.useState)("modelinformation"),i=Object(l.a)(a,2),m=i[0],f=i[1];console.log("mplusOutput: ",n);var p=null!==n?n.parsed.groups:null;return o.a.createElement(c.a,null,o.a.createElement(A,{mplusOutput:n,handleFileLoad:function(e){var t=e.target,n=t.files[0],a=new FileReader;a.onload=function(){r({string:a.result,filename:t.files[0].name,parsed:S(a.result)})},a.readAsText(n,"ISO-881")}}),o.a.createElement(s.a,null,o.a.createElement(d,{mplusOutput:n,handlePageChange:function(e){f(e)}})),o.a.createElement($,{show:"wholeoutput"===m,mplusOutput:n}),o.a.createElement(z,{show:"modelinformation"===m,modelFitInformation:null!==n?n.parsed.modelFitInformation:null}),o.a.createElement(D,{show:"modelresults"===m,groups:p,results:null!==n?n.parsed.modelResults:null}),o.a.createElement(D,{show:"stdmodelresults"===m,groups:p,results:null!==n?n.parsed.standardizedModelResults:null}))};a.a.render(o.a.createElement(V,null),document.getElementById("root"))}},[[135,1,2]]]);
//# sourceMappingURL=main.0515af2d.chunk.js.map