"use client";
import{motion as i}from"framer-motion";import r from"./Chip.module.css.js";import{jsx as e}from"react/jsx-runtime";function o(o){const s=o.children,t=o.onClick,c=o.style,n=o.styles||r,l=o.theme;return e(i.div,{className:n.chip+(t?" "+n.chip_clickable:"")+("primary"===l?" "+n.chip_primary:"")+("secondary"===l?" "+n.chip_secondary:""),onClick:t,style:c,transition:t?{type:"spring",stiffness:500}:void 0,whileHover:t?{scale:1.03}:void 0,children:s})}export{o as default};