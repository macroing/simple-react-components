"use client";
import{useState as e}from"react";import a from"./Carousel.module.css.js";import{jsxs as n,jsx as s}from"react/jsx-runtime";function t(t){const l=t.items,i=t.style,r=t.styles||a,[c,o]=e(0);return n("div",{className:r.carousel,style:i,children:[s("div",{className:r.previous,onClick:function(e){o(0===l.length?0:c-1<0?l.length-1:c-1)},children:s("span",{"aria-hidden":!0,className:"fa fa-chevron-left fa-2x"})}),s("div",{className:r.content,children:c>=0&&c<l.length&&l[c]}),s("div",{className:r.next,onClick:function(e){o(0===l.length?0:(c+1)%l.length)},children:s("span",{"aria-hidden":!0,className:"fa fa-chevron-right fa-2x"})})]})}export{t as default};