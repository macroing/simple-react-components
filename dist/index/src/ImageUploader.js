"use client";
import{motion as e}from"framer-motion";import{useState as a}from"react";import i from"./FileInputButtonLabel.js";import s from"./ImageUploader.module.css.js";import{jsx as n,jsxs as t}from"react/jsx-runtime";function l(l){const o=l.isVisible,r=l.onClickUpload,c=l.setIsVisible,d=l.styles||s,f=l.text||"Select Image",[p,m]=a(null),[g,u]=a("");return o?n("div",{className:d.image_uploader_container,onClick:function(e){c(!1)},children:t("div",{className:d.image_uploader,onClick:function(e){e.stopPropagation()},children:[g&&n("img",{alt:"",src:g}),g&&n(e.div,{className:d.upload,onClick:function(e){e.stopPropagation(),r&&r(e,p),m(null),u(""),c(!1)},transition:{type:"spring",stiffness:700},whileHover:{scale:1.2},children:n("span",{"aria-hidden":!0,className:"fa fa-upload"})}),g&&n(e.div,{className:d.close,onClick:e=>u(""),transition:{type:"spring",stiffness:700},whileHover:{scale:1.2},children:n("span",{"aria-hidden":!0,className:"fa fa-close"})}),!g&&t(i,{accept:"image/*",onChange:function(e){if(e.target.files&&e.target.files.length>0){const a=new FileReader;a.addEventListener("load",(()=>u(a.result?.toString()||""))),a.readAsDataURL(e.target.files[0]),m(e.target.files[0])}},children:[n("span",{"aria-hidden":!0,className:"fa fa-image"}),n("span",{children:f})]}),!g&&n(e.div,{className:d.close,onClick:function(e){e.stopPropagation(),c(!1)},transition:{type:"spring",stiffness:700},whileHover:{scale:1.2},children:n("span",{"aria-hidden":!0,className:"fa fa-close"})})]})}):null}export{l as default};
