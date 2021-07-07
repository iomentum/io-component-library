import e from"react";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var t=function(){return(t=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var r in t=arguments[o])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};function o(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===o&&n.firstChild?n.insertBefore(r,n.firstChild):n.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}o(".storybook-button{font-family:Nunito Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:700;border:0;border-radius:3em;cursor:pointer;display:inline-block;line-height:1}.storybook-button--primary{color:#fff;background-color:#1ea7fd}.storybook-button--secondary{color:#333;background-color:transparent;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}.storybook-button--small{font-size:12px;padding:10px 16px}.storybook-button--medium{font-size:14px;padding:11px 20px}.storybook-button--large{font-size:16px;padding:12px 24px}");var n=function(o){var n=o.primary,r=void 0!==n&&n,l=o.size,a=void 0===l?"medium":l,i=o.backgroundColor,s=o.label,c=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]])}return o}(o,["primary","size","backgroundColor","label"]),p=r?"storybook-button--primary":"storybook-button--secondary";return e.createElement("button",t({type:"button",className:["storybook-button","storybook-button--"+a,p].join(" "),style:{backgroundColor:i}},c),s)};o(".wrapper{font-family:Nunito Sans,Helvetica Neue,Helvetica,Arial,sans-serif;border-bottom:1px solid rgba(0,0,0,.1);padding:15px 20px;display:flex;align-items:center;justify-content:space-between}h1,svg{display:inline-block;vertical-align:top}h1{font-weight:900;font-size:20px;line-height:1;margin:6px 0 6px 10px}button+button{margin-left:10px}");var r=function(t){var o=t.user,r=t.onLogin,l=t.onLogout,a=t.onCreateAccount;return e.createElement("header",null,e.createElement("div",{className:"wrapper"},e.createElement("div",null,e.createElement("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},e.createElement("g",{fill:"none",fillRule:"evenodd"},e.createElement("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),e.createElement("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),e.createElement("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"}))),e.createElement("h1",null,"Acme")),e.createElement("div",null,o?e.createElement(n,{size:"small",onClick:l,label:"Log out"}):e.createElement(e.Fragment,null,e.createElement(n,{size:"small",onClick:r,label:"Log in"}),e.createElement(n,{primary:!0,size:"small",onClick:a,label:"Sign up"})))))};export{n as Button,r as Header};
