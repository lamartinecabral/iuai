!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.iuai=t():e.iuai=t()}(this,(()=>(()=>{"use strict";var e={};return{350:function(e,t){var r,n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)};function o(e,t){try{for(var r in t)try{r in e.style?e.style[r]=t[r]:e.style.setProperty(r,t[r])}catch(e){console.error(e)}}catch(e){throw e}}function i(e,t,r){try{"style"===t?o(e,r):t in e?e[t]=r:e.setAttribute(t,r)}catch(e){throw e}}function u(e,t){if(!e)throw new ReferenceError("Element not found.");if(t&&e.tagName.toLowerCase()!==t)throw new TypeError("tag parameter and element's tag do not match.");return e}function c(e,t){return u(document.getElementById(e),t)}Object.defineProperty(t,"__esModule",{value:!0}),t.refElem=t.getParent=t.getChild=t.getElem=t.queryElem=t.style=t.elem=void 0,t.elem=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{var r=function(e){var t="string"==typeof e[0]?[e[0],""]:[e[0].tag,e[0].id],r=t[0],o=t[1],i={},u=[];return e[1]&&("string"==typeof e[1]?u=[e[1]]:Array.isArray(e[1])?u=e[1]:i=e[1]),e[2]&&(u="string"==typeof e[2]?[e[2]]:e[2]),o&&(i=n(n({},i),{id:o})),[r,i,u]}(e),o=r[0],u=r[1],c=r[2],l=document.createElement(o);for(var a in u)i(l,a,u[a]);for(var s=0,f=c;s<f.length;s++){var d=f[s];l.appendChild("string"==typeof d?document.createTextNode(d):d)}return l}catch(e){return console.error(e),""}},t.style=function(e,t){if(r||(r=document.createElement("style"),document.head.append(r)),!r.sheet)throw new Error("Unable to add style rule.");try{var n=r.sheet.insertRule(e+" {}"),i=r.sheet.cssRules[n];return o(i,t),i}catch(e){return console.error(e),null}},t.queryElem=function(e,t){return u(document.querySelector(e),t)},t.getElem=c,t.getChild=function(e,t){var r;return u(null===(r=document.getElementById(e))||void 0===r?void 0:r.firstElementChild,t)},t.getParent=function(e,t){var r;return u(null===(r=document.getElementById(e))||void 0===r?void 0:r.parentElement,t)};var l=0;t.refElem=function(e){var t="e"+(l++).toString(36),r=function(){return c(t,e)};return r.id=t,r.tag=e,r.selector="#"+t,r.toString=function(){return r.selector},r}}}[350](0,e),e})()));
//# sourceMappingURL=iuai.js.map