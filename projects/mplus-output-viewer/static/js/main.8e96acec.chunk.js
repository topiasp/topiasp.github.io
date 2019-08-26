(window["webpackJsonpmplus-output-viewer"]=window["webpackJsonpmplus-output-viewer"]||[]).push([[0],{124:function(e,t,n){e.exports=n(255)},255:function(e,t,n){"use strict";n.r(t);var r=n(14),a=n.n(r),l=n(11),u=n(0),o=n.n(u),i=n(265),c=n(15),s=n.n(c),d=function(e){var t=e.mplusOutput,n=e.handlePageChange,r=e.page;if(null===t)return"";var a={margin:"0.5%",fontSize:"80%"},l={margin:"0.5%",fontSize:"80%",border:"3px solid white"};return o.a.createElement("div",{style:{backgroundColor:"black",position:"fixed",width:"100%",zIndex:999,top:0}},[{page:"wholeoutput",label:"Whole output"},{page:"modelfitinformation",label:"Model information"},{page:"modelresults",label:"Model results"},{page:"stdmodelresults",label:"Standardized model results"}].map(function(e){return o.a.createElement(i.a,{style:e.page===r?l:a,key:s()(),onClick:function(){return n(e.page)}},e.label)}))},f=function(e){for(var t=e.regex,n=0,r=[],a="";null!==(a=t.exec(e.string));)r.push({result:a[0],id:"C"+n,contentStart:a.index+a[0].length,start:a.index}),n++;return{occurances:r,string:e.string}},p=function(e){var t=e.occurances;t[t.length-1].end=e.string.length;for(var n=t.length-2;n>=0;n--)t[n].end=t[n+1].start-1;return e.occurances=t,e},m=function(e){var t=e.occurances,n=e.string,r=[];for(var a in t){var l=t[a];r.push({header:l,id:l.id,content:n.substring(l.contentStart,l.end).split("\n")})}return e.occurances=r,e},h=function(e){var t=f({string:e.string,start:0,chapters:[],regex:e.regex});return e.filteringRegex&&(t.occurances=t.occurances.filter(function(t){return!e.filteringRegex.test(t.result)})),t=p(t),m(t).occurances},v=function(e){var t=e[0].content.filter(function(e){return e.toLowerCase().indexOf("title:")>-1});return void 0===t?void 0:t[0]},g=function(e){var t=e.match(/(Number of groups[ ]+[0-9]{1,2})/);return null===t?void 0:1*t[0].replace(/[^0-9]/g,"")},b=function(e){for(var t=e.cell,n=e.headercount;t.keys.length+t.values.length<n;)t.values.push("");return t},E=function(e){var t=f({string:e.content.join("\n"),start:0,chapters:[],regex:/(.+[A-Za-z]$)/gm});t=p(t);var n=m(t).occurances.map(function(e){return function(e){var t=e.content.map(function(e){return e.split(/([A-Z_\-0-9.$]+)/).filter(function(e){return/[A-Z0-9]/.test(e)})}).filter(function(e){return e.length>0});return t.map(function(t){return function(e,t){var n={};return n.keys=[t,e[0]],e.splice(0,1),n.values=e,n}(t,e.header.result)})}(e)});return n=n.map(function(t){return t.map(function(t){return function(e,t){return e.keys=[t].concat(e.keys),e}(t,e.header.result)})})},y=function(e){var t,n=e.chapters,r=e.headerToFind,a=e.tableheaders,l=e.NumberOfGroups;void 0===n|null===n&&alert("No output loaded to get model results from!");var u=n.filter(function(e){return e.header.result===r})[0];if(void 0!==l&l>1){t=(t=h({string:u.content.join("\n"),regex:/Group [A-Z_]+$/gm}).map(function(e){return E(e)}).map(function(e){return e.flat()}).flat()).map(function(e){return b({cell:e,headercount:a.length})})}else{t=(t=E(u).map(function(e){return e.flat()}).flat()).map(function(e){return b({cell:e,headercount:a.length})})}return t},O=function(e,t){var n=t.keys.slice(1,3).join("");return void 0===e[n]?e[n]={keys:t.keys.slice(1,3),values:[{group:t.keys[0],values:t.values}]}:e[n].values.push({group:t.keys[0],values:t.values}),e},x=function(e){var t=e.cells,n=e.variables,r=Object.values(t.reduce(O,{}));return r=n.map(function(e,t){return r.map(function(n){return function(e,t,n){return e.values.map(function(r){return{keys:e.keys.concat(t),group:r.group,value:r.values[n]}})}(n,e,t)})}).flat()},k=function(e){var t=e.reduce(function(e,t){return e[t]=1,e},{});return Object.getOwnPropertyNames(t)},w=function(e){return e.replace(/^[ ]{1,}/,"").replace(/[ ]{1,}$/,"")},S=function(e){var t=e.header.result;return e.content.map(function(e){var n=w(e).split(/[ ]{2,}/),r=w(n[0]);return{header:t,statistic:r,value:1===n.length?-1:n.slice(1).map(function(e){return w(e)}).join(", ")}})},j=function(e){var t={string:e.content.join("\n"),regex:/^[A-Z*].+$/gm},n=h(t);return(n=(n=n.filter(function(e){return"*"!==e.header.result.substring(0,1)})).map(function(e){return e.content=e.content.filter(function(e){return e.length>1}),0===e.content.length&&(e.content=[e.header.result],e.header.result=w(e.header.result.replace(/[0-9]{1,}/,""))),e})).map(S).flat()},C=function(e){var t={};t.chapters=h({string:e,regex:/(^[A-Z][A-Z 0-9-]+[A-Z]$)/gm,filteringRegex:/ (BY|WITH|ON)$/m}),t.title=v(t.chapters),t.NumberOfGroups=g(e);var n=["Estimate","S.E.","Est/S.E.","P-Value"],r=["Column1","Column2","Column3"].concat(n),a="MODEL RESULTS",l=y({chapters:t.chapters,headerToFind:a,tableheaders:r,NumberOfGroups:t.NumberOfGroups});return t.modelResults={header:a,cells:x({cells:l,variables:n})},a="STANDARDIZED MODEL RESULTS",l=y({chapters:t.chapters,headerToFind:a,tableheaders:r,NumberOfGroups:t.NumberOfGroups}),t.standardizedModelResults={header:a,cells:x({cells:l,variables:n})},t.groups=k(t.modelResults.cells.flat().map(function(e){return e.group})),t.modelFitInformation=j(t.chapters.find(function(e){return"MODEL FIT INFORMATION"===e.header.result})),t},F=n(263),I=function(e){var t=e.handleFileLoad,n=e.showFileUpload,r=e.handleShowFileChange;if(!n)return"";return o.a.createElement(F.a,{show:!0,onHide:function(){return r()}},o.a.createElement(F.a.Header,null,o.a.createElement(F.a.Title,null,"Mplus output viewer")),o.a.createElement(F.a.Body,null,"Upload an .out -file from Mplus"),o.a.createElement(F.a.Footer,null,o.a.createElement(i.a,{primary:"true"}," ",o.a.createElement("input",{id:"file-upload",type:"file",style:{display:"none"},onChange:t}),o.a.createElement("label",{htmlFor:"file-upload",className:"custom-file-upload"},"Upload"))))},T=n(113),A=n(260),L=function(e){var t,n,r,a=function(e){var t,n,r;t=e.headers,n=e.data,r=e.delimiter||";";var a="";return a+=t.join(r)+"\n",a+=n.map(function(e){return Array.isArray(e),e.join(r)}).join("\n")}(e);null!==a&&(n=e.filename||"export.csv",a.match(/^data:text\/csv/i)||(a="data:text/csv;charset=utf-8,"+a),t=encodeURI(a),(r=document.createElement("a")).setAttribute("href",t),r.setAttribute("download",n),r.click())},N=function(e){var t=e.params;e.float;if(null===t)return"";var n=t.data,r=t.headers;return o.a.createElement(i.a,{style:{margin:"0.5%",float:"right",fontSize:"75%",padding:3},primary:"true",onClick:function(){L({data:n,headers:r})}},"Download as CSV")},P=n(99),R=n(264),z=n(60),D=function(e){var t=e.options,n=e.handleListChange,r=Object(u.useState)(!1),a=Object(l.a)(r,2),i=a[0],c=a[1],s=function(e){return t.selectedOptions.indexOf(e)>-1},d=function(e){var r=e.target.value,a=s(r)?t.selectedOptions.filter(function(e){return e!==r}):t.selectedOptions.concat(r);n({label:t.label,selectedOptions:a})},f={display:i?"block":"none",position:"fixed",backgroundColor:"white",padding:10,border:"1px solid black"},p=i?o.a.createElement(z.a,null):o.a.createElement(z.b,null);return o.a.createElement("div",null,o.a.createElement("button",{style:{border:"0.5px solid #0069d9",borderRadius:"5px",backgroundColor:"white",padding:"5px",margin:"2px"},onClick:function(){return c(!i)}},t.label,p),o.a.createElement("div",{style:f},t.values.map(function(e,t){var n=s(e);return o.a.createElement("div",{key:t+e},o.a.createElement("input",{type:"checkbox",checked:n,onChange:d,value:e}),e)})))};function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var U=function(e){var t=e.headers,n=e.cells,r=Object(u.useState)({}),a=Object(l.a)(r,2),i=a[0],c=a[1];console.log("tableFilters ",i);var d={padding:1},f=function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(n,!0).forEach(function(t){Object(P.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},i);t[e.label]=e,c(t)};return o.a.createElement(R.a,{style:{fontSize:"75%",padding:"1px"}},o.a.createElement("thead",null,o.a.createElement("tr",null,t.map(function(e){if(void 0!==e.values){var t=void 0!==i[e.label]?i[e.label].selectedOptions:e.values;return o.a.createElement(D,{options:{label:e.label,selectedOptions:t,values:e.values},handleListChange:f})}return e.label}).map(function(e){return o.a.createElement("th",{key:s()(),style:d},e)}))),o.a.createElement("tbody",null,n.filter(function(e){for(var n,r,a=!0,l=0;l<t.length;l++)r=t[l],n=i[r.label],void 0!==i[r.label]&&-1===n.selectedOptions.indexOf(e[r.index])&&(a=!1);return a}).map(function(e,t){return function(e,t){var n={backgroundColor:t%2===0?"lightgrey":""};return o.a.createElement("tr",{key:s()(),style:n},e.map(function(e){return o.a.createElement("td",{key:s()(),style:d},e)}))}(e,t)})))},Z=function(e){var t=e.results,n=e.show,r=e.groups;if(null===t||!n)return"";var a=t.cells,l=[{label:"Parameter header",index:0,values:k(a.flat().map(function(e){return e.keys[0]}))},{label:"Parameter",index:1,values:k(a.flat().map(function(e){return e.keys[1]}))},{label:"Statistic",index:2,values:k(a.flat().map(function(e){return e.keys[2]}))}];l=l.concat(r.map(function(e){return{label:e}})),console.log("cell0",a[0]);var u=a.flat().map(function(e){return Object(T.a)(e.keys).concat(e.group).concat(e.value)});return o.a.createElement(A.a,null,o.a.createElement("div",{style:{float:"left"}},t.header),o.a.createElement(N,{params:{data:u,headers:["Parameter header","Parameter","Statistic","Group","Value"]}}),o.a.createElement(U,{cells:a.map(function(e){return e[0].keys.concat(e.map(function(e){return e.value}))}),headers:l}))},G=n(261),$=n(262),H=function(e){var t=e.mplusOutput,n=e.show,r=Object(u.useState)(["INPUT INSTRUCTIONS"]),a=Object(l.a)(r,2),i=a[0],c=a[1];if(null===t||!n)return"";var d=null===t?[]:t.parsed.chapters.map(function(e){return e.header.result}),f=t.parsed.chapters,p=function(e){return i.indexOf(e)>-1},m=function(e){var t,n=e.target.value;c(p(t=n)?i.filter(function(e){return e!==t}):i.concat(t))};return o.a.createElement(G.a,null,o.a.createElement($.a,{xs:4},o.a.createElement("div",{style:{position:"fixed",marginLeft:"5%",marginTop:"2%"}},o.a.createElement(G.a,null,o.a.createElement("input",{type:"checkbox",onClick:function(){i.length!==d.length?c(d):c([])}}),o.a.createElement("div",{style:{fontSize:"65%"}},i.length!==d.length?"SELECT ALL":"DESELECT ALL")),d.map(function(e){var t=p(e);return o.a.createElement(G.a,{key:s()()},o.a.createElement("input",{type:"checkbox",checked:t,onChange:m,value:e}),o.a.createElement("div",{style:{fontSize:"65%"}},e))}))),o.a.createElement($.a,{xs:8},f.map(function(e,t){return function(e,t){var n={whiteSpace:"pre-wrap",fontFamily:"Consolas",fontSize:"70%",display:p(e.header)?"":"none"},r="<h6>"+e.header+"</h6>\n"+e.content;return o.a.createElement(G.a,{key:s()()},o.a.createElement("div",{style:n,dangerouslySetInnerHTML:{__html:r}}))}({content:e.content.join("\n"),header:e.header.result})})))},V=function(e){var t=e.modelFitInformation,n=e.show;if(null===t||!n)return"";console.log("model fit info",t);var r=[{label:"Statistic group",index:0,values:k(t.map(function(e){return e.header}))},{label:"Statistic",index:1},{label:"Value",index:2}];console.log("headers",r);var a=t.map(function(e){return[e.header,e.statistic,e.value]});return o.a.createElement(A.a,null,o.a.createElement("div",{style:{float:"left"}},"MODEL FIT INFORMATION"),o.a.createElement(N,{params:{data:a,headers:r}}),o.a.createElement(U,{cells:t.map(function(e){return[e.header,e.statistic,e.value]}),headers:r}))},_=function(){var e=Object(u.useState)(null),t=Object(l.a)(e,2),n=t[0],r=t[1],a=Object(u.useState)("wholeoutput"),i=Object(l.a)(a,2),c=i[0],s=i[1],f=Object(u.useState)(!0),p=Object(l.a)(f,2),m=p[0],h=p[1];console.log("mplusOutput: ",n);var v=null!==n?n.parsed.groups:null,g=m&null===n;return o.a.createElement("div",{style:{position:"relative"}},o.a.createElement(I,{handleFileLoad:function(e){var t=e.target,n=t.files[0],a=new FileReader;a.onload=function(){r({string:a.result,filename:t.files[0].name,parsed:C(a.result)})},a.readAsText(n,"ISO-881"),h(!1)},showFileUpload:g,handleShowFileChange:function(){return h(!1)}}),o.a.createElement(d,{mplusOutput:n,handlePageChange:function(e){s(e)},page:c}),o.a.createElement("div",{style:{zIndex:-1,marginTop:"5%"}},o.a.createElement(H,{show:"wholeoutput"===c,mplusOutput:n}),o.a.createElement(V,{show:"modelfitinformation"===c,modelFitInformation:null!==n?n.parsed.modelFitInformation:null}),o.a.createElement(Z,{show:"modelresults"===c,groups:v,results:null!==n?n.parsed.modelResults:null}),o.a.createElement(Z,{show:"stdmodelresults"===c,groups:v,results:null!==n?n.parsed.standardizedModelResults:null})))};a.a.render(o.a.createElement(_,null),document.getElementById("root"))}},[[124,1,2]]]);
//# sourceMappingURL=main.8e96acec.chunk.js.map