(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{14:function(t,e,n){"use strict";n.r(e);var c,o=n(0),r=n(1),i=n.n(r),a=n(7),d=n.n(a),s=n(2),j=n(5),l=n(8);!function(t){t[t.AddPath=0]="AddPath"}(c||(c={}));var h={paths:[]},u=function(t,e){switch(e.type){case c.AddPath:return Object(s.a)(Object(s.a)({},t),{},{paths:[e.d].concat(Object(l.a)(t.paths))})}return t},b=function(){var t=Object(r.useReducer)(u,h),e=Object(j.a)(t,2),n=e[0],i=e[1];return{doc:n,addPath:function(t){i({type:c.AddPath,d:t})},toCode:function(){return'\nimport React from \'react\';\n\nconst Component = () => {\n  return (\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">\n      <path stroke="black" d="'.concat(n.paths.join(" "),'" />\n    </svg>\n  );\n};\n\ndefault export Component;\n')},toCompiled:function(){return"To be implemented..."},SvgComponent:function(t){var e=t.children;return Object(o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 800",children:[Object(o.jsx)("path",{stroke:"black",d:n.paths.join(" ")}),e]})}}},p=function(t){return"M ".concat(t.initial.x-t.offset.x," ").concat(t.initial.y-t.offset.y," L ").concat(t.current.x-t.offset.x," ").concat(t.current.y-t.offset.y)},x=function(t){t.doc;var e=t.addPath,n=t.SvgComponent,c={dragging:!1,initial:{x:0,y:0},current:{x:0,y:0},offset:{x:0,y:0}},i=Object(r.useState)(c),a=Object(j.a)(i,2),d=a[0],l=a[1],h=d.dragging?Object(o.jsx)("path",{stroke:"black",d:p(d)}):void 0;return Object(o.jsx)("div",{style:{width:"1200px",height:"800px",background:"#eee"},onMouseDown:function(t){if(0===t.button){t.stopPropagation();var e=t.target.getBoundingClientRect();l({dragging:!0,initial:{x:t.clientX,y:t.clientY},offset:{x:e.x,y:e.y},current:{x:t.clientX,y:t.clientY}})}},onMouseMove:function(t){d.dragging&&l(Object(s.a)(Object(s.a)({},d),{},{current:{x:t.clientX,y:t.clientY}}))},onMouseUp:function(t){d.dragging&&(e(p(d)),l(c))},children:Object(o.jsx)(n,{children:h})})},g=function(t){var e=t.children;return Object(o.jsx)("div",{children:e})},O=function(t){var e=t.children;return Object(o.jsxs)("label",{children:[Object(o.jsx)("input",{type:"radio",name:"toolbar-tool",value:e}),e]})},f=function(){var t=b(),e=t.doc,n=t.addPath,c=t.toCode,r=t.toCompiled,i=t.SvgComponent;return Object(o.jsxs)("div",{children:[Object(o.jsx)("h1",{children:" Canvas "}),Object(o.jsxs)(g,{children:[Object(o.jsx)(O,{children:"Select"}),Object(o.jsx)(O,{children:"Line Tool"}),Object(o.jsx)(O,{children:"Freehand"})]}),Object(o.jsx)(x,{doc:e,addPath:n,SvgComponent:i}),Object(o.jsx)("h1",{children:" Source "}),Object(o.jsx)("pre",{children:Object(o.jsx)("code",{children:c()})}),Object(o.jsx)("h1",{children:" Compiled "}),Object(o.jsx)("pre",{children:Object(o.jsx)("code",{children:r()})})]})};d.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(f,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.f8095a6a.chunk.js.map