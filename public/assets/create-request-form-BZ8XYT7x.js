import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as g,a as rt,g as nt,H as ot,A as at}from"./app-DIxFj9-9.js";function se({containerRef:e,children:t,queryTitle:n,className:a,...l}){let i=0;const u=()=>{i++;const f=document.createElement("query-entry");f.setAttribute("id",i.toString()),f.setAttribute("title",`${n} ${i}`),e.current?.appendChild(f)};return r.jsxs("button",{onClick:u,type:"button",className:`w-fit button-secondary gap-x-2 ${a}`,...l,children:[r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),r.jsx("span",{children:t})]})}function st({url:e}){const t=g.useRef(null),n=e?new URL(e):null;return r.jsxs("div",{id:"params-section",className:"p-5",children:[r.jsx("div",{ref:t,className:"flex flex-col gap-y-4 mb-4",children:n?.searchParams&&Array.from(n.searchParams.entries()).map(([a,l])=>r.jsx("query-entry",{"key-val":a,value:l},`query-param-${a}`))}),r.jsx(se,{queryTitle:"Query Param No",containerRef:t,children:"Add Query Paramter"})]})}var C={},xe;function it(){if(xe)return C;xe=1;var e=C&&C.__assign||function(){return e=Object.assign||function(m){for(var s,v=1,p=arguments.length;v<p;v++){s=arguments[v];for(var b in s)Object.prototype.hasOwnProperty.call(s,b)&&(m[b]=s[b])}return m},e.apply(this,arguments)},t=C&&C.__createBinding||(Object.create?function(m,s,v,p){p===void 0&&(p=v);var b=Object.getOwnPropertyDescriptor(s,v);(!b||("get"in b?!s.__esModule:b.writable||b.configurable))&&(b={enumerable:!0,get:function(){return s[v]}}),Object.defineProperty(m,p,b)}:function(m,s,v,p){p===void 0&&(p=v),m[p]=s[v]}),n=C&&C.__setModuleDefault||(Object.create?function(m,s){Object.defineProperty(m,"default",{enumerable:!0,value:s})}:function(m,s){m.default=s}),a=C&&C.__importStar||function(m){if(m&&m.__esModule)return m;var s={};if(m!=null)for(var v in m)v!=="default"&&Object.prototype.hasOwnProperty.call(m,v)&&t(s,m,v);return n(s,m),s},l=C&&C.__rest||function(m,s){var v={};for(var p in m)Object.prototype.hasOwnProperty.call(m,p)&&s.indexOf(p)<0&&(v[p]=m[p]);if(m!=null&&typeof Object.getOwnPropertySymbols=="function")for(var b=0,p=Object.getOwnPropertySymbols(m);b<p.length;b++)s.indexOf(p[b])<0&&Object.prototype.propertyIsEnumerable.call(m,p[b])&&(v[p[b]]=m[p[b]]);return v};Object.defineProperty(C,"__esModule",{value:!0});var i=a(rt()),u=89,f=90,x=77,E=57,D=219,S=222,Q=192,q=100,te=3e3,L=typeof window<"u"&&"navigator"in window&&/Win/i.test(navigator.platform),B=typeof window<"u"&&"navigator"in window&&/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),Y="npm__react-simple-code-editor__textarea",Ne=`
/**
 * Reset the text fill color so that placeholder is visible
 */
.`.concat(Y,`:empty {
  -webkit-text-fill-color: inherit !important;
}

/**
 * Hack to apply on some CSS on IE10 and IE11
 */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /**
    * IE doesn't support '-webkit-text-fill-color'
    * So we use 'color: transparent' to make the text transparent on IE
    * Unlike other browsers, it doesn't affect caret color in IE
    */
  .`).concat(Y,` {
    color: transparent !important;
  }

  .`).concat(Y,`::selection {
    background-color: #accef7 !important;
    color: transparent !important;
  }
}
`),Te=i.forwardRef(function(s,v){var p=s.autoFocus,b=s.disabled,Pe=s.form,De=s.highlight,ie=s.ignoreTabKey,_e=ie===void 0?!1:ie,le=s.insertSpaces,Ae=le===void 0?!0:le,Re=s.maxLength,qe=s.minLength,Fe=s.name,Le=s.onBlur,Ke=s.onClick,Ie=s.onFocus,ce=s.onKeyDown,Me=s.onKeyUp,V=s.onValueChange,de=s.padding,T=de===void 0?0:de,Be=s.placeholder,He=s.preClassName,Je=s.readOnly,ze=s.required,$e=s.style,fe=s.tabSize,Ue=fe===void 0?2:fe,ue=s.textareaClassName,We=s.textareaId,he=s.value,Qe=l(s,["autoFocus","disabled","form","highlight","ignoreTabKey","insertSpaces","maxLength","minLength","name","onBlur","onClick","onFocus","onKeyDown","onKeyUp","onValueChange","padding","placeholder","preClassName","readOnly","required","style","tabSize","textareaClassName","textareaId","value"]),y=i.useRef({stack:[],offset:-1}),G=i.useRef(null),me=i.useState(!0),Ye=me[0],Ve=me[1],pe={paddingTop:typeof T=="object"?T.top:T,paddingRight:typeof T=="object"?T.right:T,paddingBottom:typeof T=="object"?T.bottom:T,paddingLeft:typeof T=="object"?T.left:T},re=De(he),F=function(o,h){return o.substring(0,h).split(`
`)},X=i.useCallback(function(o,h){var c,d,j;h===void 0&&(h=!1);var k=y.current,_=k.stack,J=k.offset;if(_.length&&J>-1){y.current.stack=_.slice(0,J+1);var z=y.current.stack.length;if(z>q){var I=z-q;y.current.stack=_.slice(I,z),y.current.offset=Math.max(y.current.offset-I,0)}}var P=Date.now();if(h){var R=y.current.stack[y.current.offset];if(R&&P-R.timestamp<te){var $=/[^a-z0-9]([a-z0-9]+)$/i,N=(c=F(R.value,R.selectionStart).pop())===null||c===void 0?void 0:c.match($),U=(d=F(o.value,o.selectionStart).pop())===null||d===void 0?void 0:d.match($);if(N?.[1]&&(!((j=U?.[1])===null||j===void 0)&&j.startsWith(N[1]))){y.current.stack[y.current.offset]=e(e({},o),{timestamp:P});return}}}y.current.stack.push(e(e({},o),{timestamp:P})),y.current.offset++},[]),ye=i.useCallback(function(){var o=G.current;if(o){var h=o.value,c=o.selectionStart,d=o.selectionEnd;X({value:h,selectionStart:c,selectionEnd:d})}},[X]),ne=function(o){var h=G.current;h&&(h.value=o.value,h.selectionStart=o.selectionStart,h.selectionEnd=o.selectionEnd,V?.(o.value))},K=function(o){var h=G.current,c=y.current.stack[y.current.offset];c&&h&&(y.current.stack[y.current.offset]=e(e({},c),{selectionStart:h.selectionStart,selectionEnd:h.selectionEnd})),X(o),ne(o)},Ge=function(){var o=y.current,h=o.stack,c=o.offset,d=h[c-1];d&&(ne(d),y.current.offset=Math.max(c-1,0))},Xe=function(){var o=y.current,h=o.stack,c=o.offset,d=h[c+1];d&&(ne(d),y.current.offset=Math.min(c+1,h.length-1))},Ze=function(o){if(!(ce&&(ce(o),o.defaultPrevented))){o.key==="Escape"&&o.currentTarget.blur();var h=o.currentTarget,c=h.value,d=h.selectionStart,j=h.selectionEnd,k=(Ae?" ":"	").repeat(Ue);if(o.key==="Tab"&&!_e&&Ye)if(o.preventDefault(),o.shiftKey){var _=F(c,d),J=_.length-1,z=F(c,j).length-1,I=c.split(`
`).map(function(W,je){return je>=J&&je<=z&&W.startsWith(k)?W.substring(k.length):W}).join(`
`);if(c!==I){var P=_[J];K({value:I,selectionStart:P?.startsWith(k)?d-k.length:d,selectionEnd:j-(c.length-I.length)})}}else if(d!==j){var _=F(c,d),R=_.length-1,$=F(c,j).length-1,P=_[R];K({value:c.split(`
`).map(function(ge,be){return be>=R&&be<=$?k+ge:ge}).join(`
`),selectionStart:P&&/\S/.test(P)?d+k.length:d,selectionEnd:j+k.length*($-R+1)})}else{var N=d+k.length;K({value:c.substring(0,d)+k+c.substring(j),selectionStart:N,selectionEnd:N})}else if(o.key==="Backspace"){var U=d!==j,tt=c.substring(0,d);if(tt.endsWith(k)&&!U){o.preventDefault();var N=d-k.length;K({value:c.substring(0,d-k.length)+c.substring(j),selectionStart:N,selectionEnd:N})}}else if(o.key==="Enter"){if(d===j){var oe=F(c,d).pop(),Z=oe?.match(/^\s+/);if(Z?.[0]){o.preventDefault();var ve=`
`+Z[0],N=d+ve.length;K({value:c.substring(0,d)+ve+c.substring(j),selectionStart:N,selectionEnd:N})}}}else if(o.keyCode===E||o.keyCode===D||o.keyCode===S||o.keyCode===Q){var A=void 0;o.keyCode===E&&o.shiftKey?A=["(",")"]:o.keyCode===D?o.shiftKey?A=["{","}"]:A=["[","]"]:o.keyCode===S?o.shiftKey?A=['"','"']:A=["'","'"]:o.keyCode===Q&&!o.shiftKey&&(A=["`","`"]),d!==j&&A&&(o.preventDefault(),K({value:c.substring(0,d)+A[0]+c.substring(d,j)+A[1]+c.substring(j),selectionStart:d,selectionEnd:j+2}))}else(B?o.metaKey&&o.keyCode===f:o.ctrlKey&&o.keyCode===f)&&!o.shiftKey&&!o.altKey?(o.preventDefault(),Ge()):(B?o.metaKey&&o.keyCode===f&&o.shiftKey:L?o.ctrlKey&&o.keyCode===u:o.ctrlKey&&o.keyCode===f&&o.shiftKey)&&!o.altKey?(o.preventDefault(),Xe()):o.keyCode===x&&o.ctrlKey&&(!B||o.shiftKey)&&(o.preventDefault(),Ve(function(W){return!W}))}},et=function(o){var h=o.currentTarget,c=h.value,d=h.selectionStart,j=h.selectionEnd;X({value:c,selectionStart:d,selectionEnd:j},!0),V(c)};return i.useEffect(function(){ye()},[ye]),i.useImperativeHandle(v,function(){return{get session(){return{history:y.current}},set session(o){y.current=o.history}}},[]),i.createElement("div",e({},Qe,{style:e(e({},H.container),$e)}),i.createElement("pre",e({className:He,"aria-hidden":"true",style:e(e(e({},H.editor),H.highlight),pe)},typeof re=="string"?{dangerouslySetInnerHTML:{__html:re+"<br />"}}:{children:re})),i.createElement("textarea",{ref:function(o){return G.current=o},style:e(e(e({},H.editor),H.textarea),pe),className:Y+(ue?" ".concat(ue):""),id:We,value:he,onChange:et,onKeyDown:Ze,onClick:Ke,onKeyUp:Me,onFocus:Ie,onBlur:Le,disabled:b,form:Pe,maxLength:Re,minLength:qe,name:Fe,placeholder:Be,readOnly:Je,required:ze,autoFocus:p,autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"data-gramm":!1}),i.createElement("style",{dangerouslySetInnerHTML:{__html:Ne}}))}),H={container:{position:"relative",textAlign:"left",boxSizing:"border-box",padding:0,overflow:"hidden"},textarea:{position:"absolute",top:0,left:0,height:"100%",width:"100%",resize:"none",color:"inherit",overflow:"hidden",MozOsxFontSmoothing:"grayscale",WebkitFontSmoothing:"antialiased",WebkitTextFillColor:"transparent"},highlight:{position:"relative",pointerEvents:"none"},editor:{margin:0,border:0,background:"none",boxSizing:"inherit",display:"inherit",fontFamily:"inherit",fontSize:"inherit",fontStyle:"inherit",fontVariantLigatures:"inherit",fontWeight:"inherit",letterSpacing:"inherit",lineHeight:"inherit",tabSize:"inherit",textIndent:"inherit",textRendering:"inherit",textTransform:"inherit",whiteSpace:"pre-wrap",wordBreak:"keep-all",overflowWrap:"break-word"}};return C.default=Te,C}var lt=it();const we=nt(lt);function ct({request:e}){const[t,n]=g.useState(e?.bodyType||"no-body"),[a,l]=g.useState(""),[i,u]=g.useState(!1),f=g.useRef(null);let x=0;g.useEffect(()=>{t==="form-data"&&u(window.prompt("Is this a file? (yes/no)")?.toLowerCase()==="yes")},[t]);const E=S=>{n(S.target.value)},D=()=>{x++;const S=document.createElement("query-entry");S.setAttribute("title",`Form Entry No ${x}`),f.current?.append(S)};return r.jsxs("div",{id:"body-section",className:"p-5 flex flex-col gap-y-4",children:[r.jsxs("div",{className:"flex flex-col gap-y-2 max-w-full w-full",children:[r.jsx("label",{htmlFor:"body-type",children:"Body-Type"}),r.jsxs("select",{value:t,onChange:E,name:"bodyType",id:"body-type",className:"w-full p-2",children:[r.jsx("option",{value:"no-body",children:"No Body"}),r.jsx("option",{value:"form-url-encoded",children:"Form URL Encoded"}),r.jsx("option",{value:"form-data",children:"Form Data"}),r.jsx("option",{value:"json",children:"JSON"}),r.jsx("option",{value:"html",children:"HTML"}),r.jsx("option",{value:"xml",children:"XML"}),r.jsx("option",{value:"text",children:"Plain Text"})]})]}),(t==="json"||t==="html"||t==="xml")&&r.jsx(we,{name:"body",className:"simple-editor min-h-50 field-sizing-content",highlight:S=>ot.highlight(S,{language:t}).value,onValueChange:l,value:a}),t==="text"&&r.jsx(we,{name:"body",className:"simple-editor min-h-50 field-sizing-content",highlight:S=>S,onValueChange:l,value:a}),t==="form-data"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{id:"form-data-container",ref:f,className:"flex flex-col gap-y-4 mb-2"}),i?r.jsx("query-entry",{"is-file":"true",title:"Form Data File"}):r.jsxs("button",{onClick:D,type:"button",className:"w-fit button-secondary gap-x-2",children:[r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),r.jsx("span",{children:"Add Form Entry"})]})]}),t==="form-url-encoded"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{id:"form-data-container",ref:f,className:"flex flex-col gap-y-4 mb-2"}),r.jsx(se,{containerRef:f,queryTitle:"Form Entry No",children:"Add Form Entry"})]})]})}function dt(){const e=g.useRef(null);return r.jsxs("div",{id:"headers-section",className:"p-5",children:[r.jsx("div",{ref:e,className:"flex flex-col gap-y-4 mb-4"}),r.jsx(se,{queryTitle:"Header No",containerRef:e,children:"Add Header"})]})}function ft({request:e,requestType:t}){const n=g.useRef(null);return r.jsxs("div",{"data-tabs-group":"create-request",children:[r.jsxs("div",{"data-tabs-triggers":!0,children:[r.jsx("div",{"data-tab-section":"params-section",children:"Params"}),r.jsx("div",{className:t==="event-source"?"hidden":"block",ref:n,"data-tab-section":"body-section",children:"Body"}),r.jsx("div",{"data-tab-section":"headers-section",children:"Header"})]}),r.jsxs("div",{"data-tabs-container":!0,children:[r.jsx(st,{url:e?.url}),r.jsx(ct,{request:e}),r.jsx(dt,{})]})]})}function ae(e){const t=e.querySelector("input"),n=e.querySelector("textarea");return t&&t.value!==""&&n?{name:t.value,value:n.value}:null}function ut({text:e}){return r.jsx("div",{id:"response-content-section",className:"special-container w-full min-h-30 max-h-64 overflow-auto",children:e})}function ht({headers:e}){return r.jsx("div",{id:"response-headers-section",className:"special-container",children:r.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg w-full",children:r.jsxs("table",{className:"w-full text-sm text-left rtl:text-right",children:[r.jsx("thead",{className:"text-xs text-primary uppercase border-b border-dashed border-primary",children:r.jsxs("tr",{children:[r.jsx("th",{scope:"col",className:"px-6 py-3 border-r border-dashed border-primary",children:"Header"}),r.jsx("th",{scope:"col",className:"px-6 py-3",children:"Value"})]})}),r.jsx("tbody",{children:Array.from(e.entries()).map(([t,n],a,l)=>r.jsxs("tr",{className:(a<l.length-1?"border-b border-dashed border-primary ":"")+"hover:bg-theme-secondary",children:[r.jsx("td",{className:"px-6 py-4 border-r border-primary dashed-borders",children:t}),r.jsx("td",{className:"px-6 py-4 border-r border-primary dashed-borders",children:n})]},`header-${a}`))})]})})})}function Se(e){return e===null?"null":typeof e}function ke(e){return!!e&&typeof e=="object"}function Ce(e){if(e===void 0)return"";if(e===null||typeof e=="object"&&!e.constructor)return"Object";var t=/function ([^(]*)/.exec(e.constructor.toString());return t&&t.length>1?t[1]:""}function Oe(e,t,n){return e==="null"||e==="undefined"?e:(e!=="string"&&e!=="stringifiable"||(n='"'+(n.replace(/"/g,'\\"')+'"')),e==="function"?t.toString().replace(/[\r\n]/g,"").replace(/\{.*\}/,"")+"{…}":n)}function Ee(e){var t="";return ke(e)?(t=Ce(e),Array.isArray(e)&&(t+="["+e.length+"]")):t=Oe(Se(e),e,e),t}function O(e){return"json-formatter-".concat(e)}function w(e,t,n){var a=document.createElement(e);return t&&a.classList.add(O(t)),n!==void 0&&(n instanceof Node?a.appendChild(n):a.appendChild(document.createTextNode(String(n)))),a}(function(e){if(typeof window<"u"){var t=document.createElement("style");t.setAttribute("media","screen"),t.innerHTML=e,document.head.appendChild(t)}})(`.json-formatter-row {
  font-family: monospace;
}
.json-formatter-row,
.json-formatter-row a,
.json-formatter-row a:hover {
  color: black;
  text-decoration: none;
}
.json-formatter-row .json-formatter-row {
  margin-left: 1rem;
}
.json-formatter-row .json-formatter-children.json-formatter-empty {
  opacity: 0.5;
  margin-left: 1rem;
}
.json-formatter-row .json-formatter-children.json-formatter-empty:after {
  display: none;
}
.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {
  content: "No properties";
}
.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {
  content: "[]";
}
.json-formatter-row .json-formatter-string,
.json-formatter-row .json-formatter-stringifiable {
  color: green;
  white-space: pre;
  word-wrap: break-word;
}
.json-formatter-row .json-formatter-number {
  color: blue;
}
.json-formatter-row .json-formatter-boolean {
  color: red;
}
.json-formatter-row .json-formatter-null {
  color: #855a00;
}
.json-formatter-row .json-formatter-undefined {
  color: #ca0b69;
}
.json-formatter-row .json-formatter-function {
  color: #FF20ED;
}
.json-formatter-row .json-formatter-date {
  background-color: rgba(0, 0, 0, 0.05);
}
.json-formatter-row .json-formatter-url {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
.json-formatter-row .json-formatter-bracket {
  color: blue;
}
.json-formatter-row .json-formatter-key {
  color: #00008b;
  padding-right: 0.2rem;
}
.json-formatter-row .json-formatter-toggler-link {
  cursor: pointer;
}
.json-formatter-row .json-formatter-toggler {
  line-height: 1.2rem;
  font-size: 0.7rem;
  vertical-align: middle;
  opacity: 0.6;
  cursor: pointer;
  padding-right: 0.2rem;
}
.json-formatter-row .json-formatter-toggler:after {
  display: inline-block;
  transition: transform 100ms ease-in;
  content: "►";
}
.json-formatter-row > a > .json-formatter-preview-text {
  opacity: 0;
  transition: opacity 0.15s ease-in;
  font-style: italic;
}
.json-formatter-row:hover > a > .json-formatter-preview-text {
  opacity: 0.6;
}
.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {
  transform: rotate(90deg);
}
.json-formatter-row.json-formatter-open > .json-formatter-children:after {
  display: inline-block;
}
.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {
  display: none;
}
.json-formatter-row.json-formatter-open.json-formatter-empty:after {
  display: block;
}
.json-formatter-dark.json-formatter-row {
  font-family: monospace;
}
.json-formatter-dark.json-formatter-row,
.json-formatter-dark.json-formatter-row a,
.json-formatter-dark.json-formatter-row a:hover {
  color: white;
  text-decoration: none;
}
.json-formatter-dark.json-formatter-row .json-formatter-row {
  margin-left: 1rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty {
  opacity: 0.5;
  margin-left: 1rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty:after {
  display: none;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {
  content: "No properties";
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {
  content: "[]";
}
.json-formatter-dark.json-formatter-row .json-formatter-string,
.json-formatter-dark.json-formatter-row .json-formatter-stringifiable {
  color: #31f031;
  white-space: pre;
  word-wrap: break-word;
}
.json-formatter-dark.json-formatter-row .json-formatter-number {
  color: #66c2ff;
}
.json-formatter-dark.json-formatter-row .json-formatter-boolean {
  color: #EC4242;
}
.json-formatter-dark.json-formatter-row .json-formatter-null {
  color: #EEC97D;
}
.json-formatter-dark.json-formatter-row .json-formatter-undefined {
  color: #ef8fbe;
}
.json-formatter-dark.json-formatter-row .json-formatter-function {
  color: #FD48CB;
}
.json-formatter-dark.json-formatter-row .json-formatter-date {
  background-color: rgba(255, 255, 255, 0.05);
}
.json-formatter-dark.json-formatter-row .json-formatter-url {
  text-decoration: underline;
  color: #027bff;
  cursor: pointer;
}
.json-formatter-dark.json-formatter-row .json-formatter-bracket {
  color: #9494ff;
}
.json-formatter-dark.json-formatter-row .json-formatter-key {
  color: #23a0db;
  padding-right: 0.2rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler-link {
  cursor: pointer;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler {
  line-height: 1.2rem;
  font-size: 0.7rem;
  vertical-align: middle;
  opacity: 0.6;
  cursor: pointer;
  padding-right: 0.2rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler:after {
  display: inline-block;
  transition: transform 100ms ease-in;
  content: "►";
}
.json-formatter-dark.json-formatter-row > a > .json-formatter-preview-text {
  opacity: 0;
  transition: opacity 0.15s ease-in;
  font-style: italic;
}
.json-formatter-dark.json-formatter-row:hover > a > .json-formatter-preview-text {
  opacity: 0.6;
}
.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {
  transform: rotate(90deg);
}
.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-children:after {
  display: inline-block;
}
.json-formatter-dark.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {
  display: none;
}
.json-formatter-dark.json-formatter-row.json-formatter-open.json-formatter-empty:after {
  display: block;
}
`);var mt=/(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/,pt=/\d{2}:\d{2}:\d{2} GMT-\d{4}/,yt=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,vt=/^https?:\/\//,ee=window.requestAnimationFrame||function(e){return e(),0},M={hoverPreviewEnabled:!1,hoverPreviewArrayCount:100,hoverPreviewFieldCount:5,animateOpen:!0,animateClose:!0,theme:null,useToJSON:!0,sortPropertiesBy:null,maxArrayItems:100,exposePath:!1},jt=function(){function e(t,n,a,l,i,u,f){n===void 0&&(n=1),a===void 0&&(a=M),u===void 0&&(u=[]),this.json=t,this.open=n,this.config=a,this.key=l,this.displayKey=i,this.path=u,this.arrayRange=f,this._isOpen=null,this.config.hoverPreviewEnabled===void 0&&(this.config.hoverPreviewEnabled=M.hoverPreviewEnabled),this.config.hoverPreviewArrayCount===void 0&&(this.config.hoverPreviewArrayCount=M.hoverPreviewArrayCount),this.config.hoverPreviewFieldCount===void 0&&(this.config.hoverPreviewFieldCount=M.hoverPreviewFieldCount),this.config.useToJSON===void 0&&(this.config.useToJSON=M.useToJSON),this.config.maxArrayItems===void 0&&(this.config.maxArrayItems=M.maxArrayItems),this.key===""&&(this.key='""'),this.displayKey===void 0&&(this.displayKey=this.key)}return Object.defineProperty(e.prototype,"isOpen",{get:function(){return this._isOpen!==null?this._isOpen:this.open>0},set:function(t){this._isOpen=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isDate",{get:function(){return this.json instanceof Date||this.type==="string"&&(mt.test(this.json)||yt.test(this.json)||pt.test(this.json))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isUrl",{get:function(){return this.type==="string"&&vt.test(this.json)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isArray",{get:function(){return Array.isArray(this.json)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isLargeArray",{get:function(){return this.isArray&&this.json.length>this.config.maxArrayItems},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isArrayRange",{get:function(){return this.isArray&&this.arrayRange!==void 0&&this.arrayRange.length==2},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isObject",{get:function(){return ke(this.json)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isEmptyObject",{get:function(){return!this.keys.length&&!this.isArray},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isEmpty",{get:function(){return this.isEmptyObject||this.keys&&!this.keys.length&&this.isArray},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"useToJSON",{get:function(){return this.config.useToJSON&&this.type==="stringifiable"},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"hasKey",{get:function(){return this.key!==void 0},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"constructorName",{get:function(){return Ce(this.json)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"type",{get:function(){return this.config.useToJSON&&this.json&&this.json.toJSON?"stringifiable":Se(this.json)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"keys",{get:function(){if(this.isObject){var t=Object.keys(this.json);if(this.isLargeArray){var n=Math.ceil(this.json.length/this.config.maxArrayItems);t=[];for(var a=0;a<n;a++){var l=a*this.config.maxArrayItems,i=Math.min(this.json.length-1,l+(this.config.maxArrayItems-1));t.push("".concat(l," … ").concat(i))}}return!this.isArray&&this.config.sortPropertiesBy?t.sort(this.config.sortPropertiesBy):t}return[]},enumerable:!1,configurable:!0}),e.prototype.toggleOpen=function(){this.isOpen=!this.isOpen,this.element&&(this.isOpen?this.appendChildren(this.config.animateOpen):this.removeChildren(this.config.animateClose),this.element.classList.toggle(O("open")))},e.prototype.openAtDepth=function(t){t===void 0&&(t=1),t<0||(this.open=t,this.isOpen=t!==0,this.element&&(this.removeChildren(!1),t===0?this.element.classList.remove(O("open")):(this.appendChildren(this.config.animateOpen),this.element.classList.add(O("open")))))},e.prototype.getInlinepreview=function(){var t=this;if(this.isArray)return this.json.length>this.config.hoverPreviewArrayCount?"Array[".concat(this.json.length,"]"):"[".concat(this.json.map(Ee).join(", "),"]");var n=this.keys,a=n.slice(0,this.config.hoverPreviewFieldCount).map(function(i){return"".concat(i,":").concat(Ee(t.json[i]))}),l=n.length>=this.config.hoverPreviewFieldCount?"…":"";return"{".concat(a.join(", ")).concat(l,"}")},e.prototype.render=function(){this.element=w("div","row");var t=this.isObject?w("a","toggler-link"):w("span");if(this.isObject&&!this.useToJSON&&t.appendChild(w("span","toggler")),this.isArrayRange?t.appendChild(w("span","range","[".concat(this.displayKey,"]"))):this.hasKey&&(t.appendChild(w("span","key","".concat(this.displayKey,":"))),this.config.exposePath&&(this.element.dataset.path=JSON.stringify(this.path))),this.isObject&&!this.useToJSON){var n=w("span","value"),a=w("span");if(!this.isArrayRange){var l=w("span","constructor-name",this.constructorName);a.appendChild(l)}if(this.isArray&&!this.isArrayRange){var i=w("span");i.appendChild(w("span","bracket","[")),i.appendChild(w("span","number",this.json.length)),i.appendChild(w("span","bracket","]")),a.appendChild(i)}n.appendChild(a),t.appendChild(n)}else{(n=this.isUrl?w("a"):w("span")).classList.add(O(this.type)),this.isDate&&n.classList.add(O("date")),this.isUrl&&(n.classList.add(O("url")),n.setAttribute("href",this.json));var u=Oe(this.type,this.json,this.useToJSON?this.json.toJSON():this.json);n.appendChild(document.createTextNode(u)),t.appendChild(n)}if(this.isObject&&this.config.hoverPreviewEnabled){var f=w("span","preview-text");f.appendChild(document.createTextNode(this.getInlinepreview())),t.appendChild(f)}var x=w("div","children");return this.isObject&&x.classList.add(O("object")),this.isArray&&x.classList.add(O("array")),this.isEmpty&&x.classList.add(O("empty")),this.config&&this.config.theme&&this.element.classList.add(O(this.config.theme)),this.isOpen&&this.element.classList.add(O("open")),this.element.appendChild(t),this.element.appendChild(x),this.isObject&&this.isOpen&&this.appendChildren(),this.isObject&&!this.useToJSON&&t.addEventListener("click",this.toggleOpen.bind(this)),this.element},e.prototype.appendChildren=function(t){var n=this;t===void 0&&(t=!1);var a=this.element.querySelector("div.".concat(O("children")));if(a&&!this.isEmpty){var l=function(f,x){var E=n.isLargeArray?[x*n.config.maxArrayItems,Math.min(n.json.length-1,x*n.config.maxArrayItems+(n.config.maxArrayItems-1))]:void 0,D=n.isArrayRange?(n.arrayRange[0]+x).toString():f,S=new e(E?n.json.slice(E[0],E[1]+1):n.json[f],n.open-1,n.config,f,D,E?n.path:n.path.concat(D),E);a.appendChild(S.render())};if(t){var i=0,u=function(){var f=n.keys[i];l(f,i),(i+=1)<n.keys.length&&(i>10?u():ee(u))};ee(u)}else this.keys.forEach(function(f,x){return l(f,x)})}},e.prototype.removeChildren=function(t){t===void 0&&(t=!1);var n=this.element.querySelector("div.".concat(O("children")));if(t){var a=0,l=function(){n&&n.children.length&&(n.removeChild(n.children[0]),(a+=1)>10?l():ee(l))};ee(l)}else n&&(n.innerHTML="")},e}();function gt({text:e,contentType:t}){const n=g.useRef(null);return g.useEffect(()=>{if(t.includes("json"))try{const a=JSON.parse(e),l=new jt(a,2,{hoverPreviewEnabled:!0,theme:"dark",animateOpen:!0,animateClose:!0});n.current.innerHTML="",n.current.appendChild(l.render())}catch{n.current.innerText=e}else if(t.includes("html"))n.current.innerHTML=e;else if(t.includes("xml")){const l=new DOMParser().parseFromString(e,"text/xml"),u=new XMLSerializer().serializeToString(l);n.current.innerText=u}else n.current.innerText=e},[e,t]),g.useEffect(()=>{const a=n.current;a&&(a.scrollTop=0)},[]),r.jsx("div",{ref:n,id:"response-preview-section",className:"special-container w-full min-h-30 max-h-64 overflow-auto"})}function bt({request:e,response:t}){const[n,a]=g.useState(""),i=t.headers.get("Content-Type")||"text/plain";return g.useEffect(()=>{t.text().then(u=>{if(i.includes("json"))try{const f=JSON.parse(u);a(JSON.stringify(f,null,2))}catch{a(u)}else a(u)})},[t]),r.jsxs("div",{className:"w-full mt-10 flex flex-col gap-y-6",children:[r.jsx("h2",{className:"text-xl md:text-2xl text-center",children:"Request Response"}),r.jsxs("div",{"data-tabs-group":"request-response",children:[r.jsxs("div",{"data-tabs-triggers":!0,children:[r.jsx("div",{"data-tab-section":"response-headers-section",children:"Headers"}),r.jsx("div",{"data-tab-section":"response-content-section",children:"Response"}),r.jsx("div",{"data-tab-section":"response-preview-section",children:"Preview"})]}),r.jsxs("div",{className:"text-muted text-center mt-8 mb-5",children:["Status Code: ",r.jsx("strong",{className:"font-extrabold",children:t.status})]}),r.jsxs("div",{"data-tabs-container":!0,className:"p-5",children:[r.jsx(ht,{headers:t.headers}),r.jsx(ut,{text:n}),r.jsx(gt,{contentType:i,text:n})]})]})]})}class Et extends at{$form=null;formData=null;headers={};body=null;url=null;eventSource=null;setEventSourceData=()=>{};Element({request:t}){const[n,a]=g.useState(null),[l,i]=g.useState(null),u=t?JSON.parse(t):null,[f,x]=g.useState(u?.requestType||"http"),[E,D]=g.useState(u?.requestType==="event-source"?u.response.text:null),[S,Q]=g.useState(!1),q=u?.url?new URL(u.url):null;g.useEffect(()=>{this.setEventSourceData=D},[]),g.useEffect(()=>{E&&S&&(this.eventSource?.close(),fetch("/sse/save",{method:"POST",body:JSON.stringify({url:this.url,headers:this.headers,response:E})}))},[E,S]);const te=async L=>{L.preventDefault(),i(null),Q(!0);try{a(await this.executeRequest(L))}catch(B){i(B.message)}};return r.jsxs(r.Fragment,{children:[l&&r.jsx("alert-message",{type:"error",children:l}),r.jsxs("form",{onSubmit:te,className:"max-w-full w-full flex flex-col gap-y-6 dropzone",children:[r.jsxs("div",{className:"w-full flex flex-col gap-x-3",children:[r.jsx("label",{htmlFor:"url",children:"Request Type"}),r.jsxs("select",{onChange:L=>x(L.currentTarget.value),value:f,className:"w-full",name:"requestType",children:[r.jsx("option",{value:"http",children:"HTTP"}),r.jsx("option",{value:"event-source",children:"Event Source"})]})]}),r.jsx("div",{className:"w-full flex flex-col gap-[20px]",children:r.jsxs("div",{className:"w-full flex flex-col md:flex-row gap-x-3",children:[r.jsxs("div",{className:"flex flex-col gap-y-2 w-full",children:[r.jsx("label",{htmlFor:"url",children:"URL"}),r.jsx("input",{defaultValue:q?`${q.protocol}//${q.hostname}${q.pathname}`:"",required:!0,name:"url",type:"text",id:"url",className:"w-full",placeholder:"https://example.com"})]}),f==="http"&&r.jsxs("div",{className:"flex flex-col gap-y-2 w-full",children:[r.jsx("label",{htmlFor:"method",children:"Method"}),r.jsxs("select",{name:"method",id:"method",className:"w-full p-2",children:[r.jsx("option",{value:"GET",children:"GET"}),r.jsx("option",{value:"POST",children:"POST"}),r.jsx("option",{value:"PUT",children:"PUT"}),r.jsx("option",{value:"DELETE",children:"DELETE"})]})]})]})}),r.jsx(ft,{request:u,requestType:f}),r.jsx("button",{type:"submit",className:"button-primary",children:"Submit"})]}),n&&r.jsx(bt,{request:u,response:n}),E&&r.jsxs("div",{className:"w-full mt-10 flex flex-col gap-y-6",children:[r.jsx("h2",{className:"text-xl md:text-2xl text-center",children:"Request Response"}),r.jsx("div",{className:"special-container w-full min-h-30 max-h-64 overflow-auto",children:E})]})]})}async executeRequest(t){if(this.$form=t.currentTarget,this.formData=Object.fromEntries(new FormData(this.$form)),this.appendQueryParams(),this.appendHeaders(),this.formData?.requestType==="http"){this.extractBody(),this.formData?.bodyType==="form-data"&&this.body.append("__api_tester__data",JSON.stringify({headers:this.headers,method:this.formData.method,url:this.url,bodyType:this.formData.bodyType}));const n=this.body instanceof FormData?this.body:JSON.stringify({method:this.formData.method,url:this.url,headers:this.headers,body:this.body,bodyType:this.formData.bodyType});return await fetch("/http-request/create",{method:"POST",body:n})}return fetch("/sse/create",{method:"POST",body:JSON.stringify({url:this.formData?.url,headers:this.headers,requestType:this.formData?.requestType})}).then(()=>{this.eventSource=new EventSource(this.url),this.eventSource.onmessage=n=>{this.setEventSourceData(n.data)}}),null}appendQueryParams(){this.url=new URL(this.formData.url),this.$form.querySelectorAll("#params-section query-entry").forEach(n=>{const a=ae(n);a&&this.url?.searchParams.append(a.name,a.value)})}appendHeaders(){this.$form.querySelectorAll("#headers-section query-entry").forEach(n=>{console.log(n);const a=ae(n);a&&(this.headers[a.name]=a.value)})}extractBody(){switch(this.formData.bodyType){case"no-body":this.body=null;break;case"form-url-encoded":this.body=new URLSearchParams(this.extractFormData()).toString(),this.headers.append("Content-Type","application/x-www-form-urlencoded");break;case"form-data":if(this.body=new FormData,this.formData?.filesName)this.body.append(this.formData.filesName,this.formData.files);else{const t=this.extractFormData();Object.entries(t).forEach(([n,a])=>{this.body.append(n,a)})}break;default:this.body=this.formData.body;break}}extractFormData(){const t={};return this.$form.querySelectorAll("#body-section query-entry")?.forEach(a=>{const l=ae(a);l&&(t[l.name]=l.value)}),t}}export{Et as default};
