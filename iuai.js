!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.iuai=t():e.iuai=t()}(this,(()=>(()=>{"use strict";var e={};return{350:function(e,t){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)};function r(e,t){for(var n in t)n in e.style?e.style[n]=t[n]:e.style.setProperty(n,t[n])}function o(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o,i,u,a=function(e){var t="string"==typeof e[0]?[e[0],""]:[e[0].tag,e[0].id],r=t[0],o=t[1],i={},u=[];return e[1]&&("string"==typeof e[1]?u=[e[1]]:Array.isArray(e[1])?u=e[1]:i=e[1]),e[2]&&(u="string"==typeof e[2]?[e[2]]:e[2]),o&&(i=n(n({},i),{id:o})),[r,i,u]}(e),f=a[0],l=a[1],s=a[2],c=document.createElement(f);for(var d in l)o=c,i=d,u=l[d],"style"===i?r(o,u):i in o?o[i]=u:o.setAttribute(i,u);for(var y=0,p=s;y<p.length;y++){var m=p[y];c.append(m)}return c}function i(e,t){if(!e)throw new ReferenceError("Element not found.");if(t&&e.tagName.toLowerCase()!=t)throw new TypeError("tag parameter and element's tag do not match.");return e}function u(e,t){return i(document.getElementById(e),t)}Object.defineProperty(t,"__esModule",{value:!0}),t.style=t.elem=void 0,t.elem=o;var a,f=0;o.query=function(e,t){return i(document.querySelector(e),t)},o.get=u,o.getChild=function(e,t){var n;return i(null===(n=document.getElementById(e))||void 0===n?void 0:n.firstElementChild,t)},o.getParent=function(e,t){var n;return i(null===(n=document.getElementById(e))||void 0===n?void 0:n.parentElement,t)},o.ref=function(e){var t="e"+(f++).toString(36),n=function(){return u(t,e)};return n.id=t,n.tag=e,n.toString=function(){return"#"+t},n},t.style=function(e,t){if(a||(a=document.createElement("style"),document.head.append(a)),!a.sheet)throw new Error("Unable to add style rule.");var n=a.sheet.insertRule(e+" {}"),o=a.sheet.cssRules[n];return r(o,t),o}}}[350](0,e),e})()));