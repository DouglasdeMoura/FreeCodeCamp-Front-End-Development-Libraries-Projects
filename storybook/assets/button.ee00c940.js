var E=Object.defineProperty,B=Object.defineProperties;var C=Object.getOwnPropertyDescriptors;var i=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var h=(e,n,t)=>n in e?E(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,l=(e,n)=>{for(var t in n||(n={}))x.call(n,t)&&h(e,t,n[t]);if(i)for(var t of i(n))b.call(n,t)&&h(e,t,n[t]);return e},f=(e,n)=>B(e,C(n));var u=(e,n)=>{var t={};for(var o in e)x.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&i)for(var o of i(e))n.indexOf(o)<0&&b.call(e,o)&&(t[o]=e[o]);return t};import{r}from"./index.f03c8040.js";import{j as S}from"./jsx-runtime.4d6739be.js";function O(...e){return n=>e.forEach(t=>function(o,a){typeof o=="function"?o(a):o!=null&&(o.current=a)}(t,n))}function d(){return d=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},d.apply(this,arguments)}const v=r.exports.forwardRef((e,n)=>{const a=e,{children:t}=a,o=u(a,["children"]);return r.exports.Children.toArray(t).some(y)?r.exports.createElement(r.exports.Fragment,null,r.exports.Children.map(t,s=>y(s)?r.exports.createElement(m,d({},o,{ref:n}),s.props.children):s)):r.exports.createElement(m,d({},o,{ref:n}),t)});v.displayName="Slot";const m=r.exports.forwardRef((e,n)=>{const a=e,{children:t}=a,o=u(a,["children"]);return r.exports.isValidElement(t)?r.exports.cloneElement(t,f(l({},j(o,t.props)),{ref:O(n,t.ref)})):r.exports.Children.count(t)>1?r.exports.Children.only(null):null});m.displayName="SlotClone";const R=({children:e})=>r.exports.createElement(r.exports.Fragment,null,e);function y(e){return r.exports.isValidElement(e)&&e.type===R}function j(e,n){const t=l({},n);for(const o in n){const a=e[o],s=n[o];/^on[A-Z]/.test(o)?t[o]=(...p)=>{s==null||s(...p),a==null||a(...p)}:o==="style"?t[o]=l(l({},a),s):o==="className"&&(t[o]=[a,s].filter(Boolean).join(" "))}return l(l({},e),t)}const N="inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white uppercase bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out",A="inline-block py-2 px-6 text-xs font-medium leading-tight text-blue-600 uppercase rounded border-2 border-blue-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out",T="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out",c=r.exports.forwardRef((p,s)=>{var g=p,{children:e,variant:n="primary",className:t,asChild:o}=g,a=u(g,["children","variant","className","asChild"]);const _=o?v:"button",w=()=>{if(n==="primary")return N;if(n==="secondary")return A;if(n==="danger")return T};return S(_,f(l({},a),{className:`${t} ${w()}`,ref:s,children:e}))});c.displayName="Button";try{c.displayName="Button",c.__docgenInfo={description:"",displayName:"Button",props:{variant:{defaultValue:{value:"primary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"danger"'}]}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/button/button.tsx#Button"]={docgenInfo:c.__docgenInfo,name:"Button",path:"src/components/button/button.tsx#Button"})}catch{}export{c as B};
//# sourceMappingURL=button.ee00c940.js.map