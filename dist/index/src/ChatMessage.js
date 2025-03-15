"use client";
import{motion as e}from"framer-motion";import{useRef as r,useState as t,useEffect as n}from"react";import i from"./Icon.js";import s from"./IconButton.js";import a from"./TooltipContainer.js";import{DEFAULT_IMAGE as l,computeDateTimeTextDefault as o,computeDateTimeTextTooltipDefault as c}from"./ChatUtilities.js";import u from"./ChatMessage.module.css.js";import{jsxs as f,jsx as m}from"react/jsx-runtime";function d(d){const h=d.chat,g=d.chatConfiguration,p=d.chatHandler,k=d.chatMessage,v=d.chats,N=d.defaultImage||l,y=d.setChats,b=d.styles||u,T=d.viewImage,L=r(),j=r(),[C,S]=t(K()),[I,A]=t(P()),[O,_]=t(!1),[w,M]=t(!1),[x,U]=t([]),[D,F]=t([]),[z,E]=t([]),[H,B]=t([]),[V,q]=t([]),[G,J]=t("");function K(){return p?.computeDateTimeText?p.computeDateTimeText(k):o(k)}function P(){return p?.computeDateTimeTextTooltip?p.computeDateTimeTextTooltip(k,g):c(k,g)}function Q(e,r,t={isOrderIgnoredForMap:!0,isOrderIgnoredForObject:!0}){if("object"!=typeof e&&"object"!=typeof r)return Object.is(e,r);if(null===e&&null===r)return!0;if(null===e||null===r||typeof e!=typeof r)return!1;if(e===r)return!0;if(Array.isArray(e)&&Array.isArray(r)){if(e.length!==r.length)return!1;for(let n=0;n<e.length;n++)if(!Q(e[n],r[n],t))return!1;return!0}if(Array.isArray(e)||Array.isArray(r))return!1;if(Object.keys(e).length!==Object.keys(r).length)return!1;if(e instanceof Date&&r instanceof Date)return e.getTime()===r.getTime();if(e instanceof Map&&r instanceof Map){if(e.size!==r.size)return!1;{const n=[],i=[];for(const[t,i]of e){if(!r.has(t))return!1;n.push([t,i])}for(const[t,n]of r){if(!e.has(t))return!1;i.push([t,n])}for(let e=0;e<n.length;e++)if(!t||t.isOrderIgnoredForMap){let r=!1;for(let s=0;s<i.length;s++)if(Q(n[e][0],i[s][0],t)){if(!Q(n[e][1],i[s][1],t))return!1;r=!0}if(!r)return!1}else if(!Q(n[e][0],i[e][0],t)||!Q(n[e][1],i[e][1],t))return!1;return!0}}if(!t||t.isOrderIgnoredForObject){for(const[n,i]of Object.entries(e)){if(!(n in r))return!1;if(!Q(i,r[n],t))return!1}return!0}{const n=[],i=[];for(const[t,i]of Object.entries(e)){if(!(t in r))return!1;n.push([t,i])}for(const[t,n]of Object.entries(r)){if(!(t in e))return!1;i.push([t,n])}for(let e=0;e<n.length;e++)if(!Q(n[e][0],i[e][0],t)||!Q(n[e][1],i[e][1],t))return!1}}function R(e,r=!1){return"string"==typeof e?e:r?oe(Y()):le(Y())}function W(e){if(Array.isArray(e)){const r=le(g?.words?.and||"and");let t="";for(let n=0;n<e.length;n++)0===n?t+=R(e[n],!0):n>0&&n+1<e.length?(t+=", ",t+=R(e[n])):(t+=" ",t+=r,t+=" ",t+=R(e[n]));return t}return"string"==typeof e?R(e):R(e,!0)}function X(){return g?.locales||"en-US"}function Y(){return g?.words?.user||"user"}function Z(e,r){return p?.isSameUser?p.isSameUser(e,r):Q(e,r)}function $(e){p?.onLike&&p.onLike(h,k,e,v,y),M(!1)}function ee(e){p?.onLike&&p.onLike(h,k,"thumbs-up",v,y),clearTimeout(j.current),M(!1)}function re(e){clearTimeout(j.current),j.current=setTimeout((()=>{M(!0)}),1e3)}function te(e){clearTimeout(j.current),M(!0)}function ne(e){clearTimeout(j.current),j.current=setTimeout((()=>{M(!1)}),1e3)}function ie(e){clearTimeout(j.current),j.current=setTimeout((()=>{M(!1)}),1e3)}function se(e){return e?.length?m(a,{tooltip:ae(e),children:m(i,{className:"fa fa-"+e[0].kind})}):null}function ae(e){return e.filter((e=>e?.user)).map(((e,r)=>m("div",{children:e?.user?.name||""},e?.key||"like-"+e.kind+"-"+r)))}function le(e){return"string"==typeof e?e.toLocaleLowerCase(X()):String(e).toLocaleLowerCase(X())}function oe(e){return"string"==typeof e?e.charAt(0).toLocaleUpperCase(X())+e.slice(1):String(e).charAt(0).toLocaleUpperCase(X())+String(e).slice(1)}return n((()=>(L.current=setInterval((()=>{S(K())}),1e3),()=>{clearInterval(L.current),clearTimeout(j.current)})),[]),n((()=>{k&&(A(P()),k?.likes?.length?(U(k.likes.filter((e=>e?.user&&("angry"===e?.kind||"heart"===e?.kind||"laugh"===e?.kind||"thumbs-up"===e?.kind)))),F(k.likes.filter((e=>e?.user&&"angry"===e?.kind))),E(k.likes.filter((e=>e?.user&&"heart"===e?.kind))),B(k.likes.filter((e=>e?.user&&"laugh"===e?.kind))),q(k.likes.filter((e=>e?.user&&"thumbs-up"===e?.kind)))):(U(0===x.length?x:[]),F(0===D.length?D:[]),E(0===z.length?z:[]),B(0===H.length?H:[]),q(0===V.length?V:[])))}),[k]),n((()=>{!function(){if(x.length&&k?.user){let e=!1;for(let r=0;r<x.length;r++)if(x[r]?.user&&Z(x[r].user,k.user)){e=!0;break}_(e)}else _(!1)}(),3===x.length?J(W([x[0]?.user?.name,x[1]?.user?.name,x[2]?.user?.name])):2===x.length?J(W([x[0]?.user?.name,x[1]?.user?.name])):1===x.length?J(W([x[0]?.user?.name])):0===x.length?J(""):J(String(x.length))}),[x]),f("div",{className:b.chat_message,children:[k?.isUnread&&f("div",{className:b.unread,children:[m("div",{className:b.separator}),m("div",{className:b.text,children:oe(g?.words?.unread||"unread")}),m("div",{className:b.separator})]}),m("div",{className:b.content_container+(k?.user?.isSelf?" "+b.content_container_self:""),children:f("div",{className:b.content,children:[!k?.user?.isSelf&&f("div",{className:b.image,children:[m("img",{alt:k?.user?.name||"",src:k?.user?.image||N}),k?.user&&k.user.isLoggedIn&&m("span",{"aria-hidden":!0,className:"fa fa-circle "+b.logged_in})]}),f("div",{className:b.rows+(k?.user?.isSelf?" "+b.rows_self:""),children:[f("div",{className:b.bubble+(k?.user?.isSelf?" "+b.bubble_self:""),children:[k?.text?.split(/\n+/).map(((e,r)=>m("p",{children:e},"paragraph-"+r))),k?.images&&k?.images?.length>0&&m("div",{className:b.images,children:k.images.map(((r,t)=>m(e.div,{className:b.image,onClick:()=>function(e){T&&T(e,!0)}(r?.src?r:{alt:"",src:N}),transition:{type:"spring",stiffness:500},whileHover:{scale:1.03},children:m("img",{alt:r?.alt||"",src:r?.src||N})},r?.key||"image-"+t)))}),k?.likes&&k?.likes?.length>0&&m("div",{className:b.likes,children:f("div",{className:b.icons,children:[se(V),se(z),se(H),se(D),G?m("div",{className:b.text,children:G}):null]})})]}),f("div",{className:b.footer,children:[m("div",{className:b.date_time,children:m(a,{tooltip:I,children:C})}),m("div",{className:b.buttons,children:f("button",{className:O?b.active:void 0,onClick:ee,onMouseEnter:re,onMouseLeave:ne,children:[m("span",{"aria-hidden":!0,className:"fa fa-thumbs-up"})," ",oe(g?.words?.like||"like")]})}),w&&f("div",{className:b.popup+(k?.user?.isSelf?" "+b.popup_self:""),onMouseEnter:te,onMouseLeave:ie,children:[m(s,{className:"fa fa-thumbs-up",isLarge:!0,onClick:()=>$("thumbs-up")}),m(s,{className:"fa fa-heart",isLarge:!0,onClick:()=>$("heart")}),m(s,{className:"fa fa-laugh",isLarge:!0,onClick:()=>$("laugh")}),m(s,{className:"fa fa-angry",isLarge:!0,onClick:()=>$("angry")})]})]})]}),k?.user?.isSelf&&k?.user?.isSelfImageVisible&&f("div",{className:b.image+" "+b.image_self,children:[m("img",{alt:k?.user?.name||"",src:k?.user?.image||N}),k?.user&&k.user.isLoggedIn&&m("span",{"aria-hidden":!0,className:"fa fa-circle "+b.logged_in})]})]})})]})}export{d as default};
