"use client";
import{useRef as e,useState as l}from"react";import a from"./TabPane.module.css.js";import{jsxs as n,jsx as i}from"react/jsx-runtime";function t(t){let{children:c,styles:s,tabIndex:r,tabs:o,...d}=t;null==s&&(s=a),null==o&&(o=[]);const m=e(),f=e(),[u,b]=l(r||0),[h,v]=l(new Array(o.length).fill(!0));function N(){m.current.classList.toggle(s.icon_close),f.current.classList.toggle(s.content_visible)}return n("div",{className:s.tab_pane,...d,children:[n("div",{className:s.mobile_menu,children:[n("div",{className:s.bar,children:[i("div",{className:s.text,children:o[u]}),o.length>1&&i("div",{className:s.icon,onClick:N,ref:m,children:i("div",{className:s.middle})})]}),i("div",{className:s.content,onClick:N,ref:f,children:o.map(((e,l)=>i("button",{className:s.button+(u===l?" "+s.active:""),onClick:()=>b(l),children:e},"tab-"+l)))})]}),i("div",{className:s.menu,children:o.map(((e,l)=>h[l]?n("button",{className:s.button+(u===l?" "+s.active:""),onClick:()=>b(l),children:[e,i("div",{className:s.close,onClick:e=>function(e,l){e.stopPropagation();const a=[...h];if(a[l]=!1,v(a),u===l){let e=-1;for(let a=l-1;a>=0;a--)if(h[a]){e=a;break}if(-1===e)for(let a=o.length-1;a>l;a--)if(h[a]){e=a;break}b(e)}}(e,l),children:i("span",{"aria-hidden":!0,className:"fa fa-close"})})]},"tab-"+l):null))}),i("div",{className:s.tab,children:c(u,o[u])})]})}export{t as default};