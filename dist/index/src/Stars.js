"use client";
import{motion as s}from"framer-motion";import t from"./Stars.module.css.js";import{jsx as e}from"react/jsx-runtime";function a(a){const r=a.disabled,i=a.selectedStars,o=a.setSelectedStars,l=a.starCount,d=a.style,n=a.styles||t;return e("div",{className:n.stars+(r?" "+n.stars_disabled:""),style:d,children:new Array(l).fill(!1).map(((t,a)=>e(s.span,{"aria-hidden":!0,className:"fa fa-star fa-2x "+n.star+(a<i?" "+n.star_selected:""),onClick:r?void 0:s=>o(a+1),transition:r?void 0:{type:"spring",stiffness:500},whileHover:r?void 0:{scale:1.2}},"star-"+a)))})}export{a as default};
