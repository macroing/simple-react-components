"use client";
import e from"./Menu.module.css.js";import{jsx as a,jsxs as n,Fragment as i}from"react/jsx-runtime";function s(s){const c=s.isExpanded,l=s.items,d=s.linkFactory||function(e,n,i,s){return a("a",{className:e,href:n,onClick:i,children:s})},t=s.setIsExpanded,r=s.style,o=s.styles||e,h=s.title;return n("div",{className:o.menu,style:r,children:[n("div",{className:o.header,children:[a("div",{className:o.title,children:h}),a("button",{className:o.toggle,onClick:e=>t(!c),children:a("span",{"aria-hidden":!0,className:c?"fa fa-chevron-up":"fa fa-chevron-down"})})]}),c&&a("div",{className:o.content,children:a("ul",{className:o.ul,children:l.map(((e,s)=>a("li",{className:o.li+(e.heading?" "+o.li_heading:"")+(e.indented?" "+o.li_indented:""),children:e.href?d(o.a,e.href,(e=>setIsVisible(!1)),n(i,{children:[e.icon&&a("span",{"aria-hidden":!0,className:e.icon+" "+o.icon})," ",a("span",{children:e.text})," ",e.badge&&a("span",{className:o.badge,children:e.badge})]})):e.onClick?n("button",{className:o.button,onClick:e.onClick,children:[e.icon&&a("span",{"aria-hidden":!0,className:e.icon+" "+o.icon})," ",a("span",{children:e.text})," ",e.badge&&a("span",{className:o.badge,children:e.badge})]}):n("div",{className:o.div,children:[e.icon&&a("span",{"aria-hidden":!0,className:e.icon+" "+o.icon})," ",a("span",{children:e.text})," ",e.badge&&a("span",{className:o.badge,children:e.badge})]})},"item-"+s)))})})]})}export{s as default};