"use client";
import{useState as e}from"react";import l from"./Breadcrumb.module.css.js";import{jsxs as t,jsx as r}from"react/jsx-runtime";function n(n){const i=n.items,h=n.styles||l,[a,c]=e(!1);return t("nav",{className:h.breadcrumb_container,children:[r("ul",{className:h.breadcrumb_desktop,children:i.map(((e,l)=>t("li",{className:h.item,children:[l>0&&r("span",{children:"/"}),e.href?r("a",{href:e.href,children:e.text}):r("span",{children:e.text})]},"item-"+l)))}),t("ul",{className:h.breadcrumb_mobile,children:[i.length>0&&r("li",{className:h.item,children:i[0].href?r("a",{href:i[0].href,children:i[0].text}):r("span",{children:i[0].text})}),i.length>3&&t("li",{className:h.item+" "+h.item_button,onClick:e=>c(!a),children:[r("span",{"aria-hidden":!0,className:"fa fa-ellipsis-h"}),r("ul",{className:h.menu+(a?" "+h.menu_visible:""),children:i.filter(((e,l)=>l>0&&l<i.length-2)).map(((e,l)=>r("li",{className:h.item,children:e.href?r("a",{href:e.href,children:e.text}):r("span",{children:e.text})},"item-"+l)))})]}),i.length>1&&r("li",{className:h.item,children:i[i.length-2].href?r("a",{href:i[i.length-2].href,children:i[i.length-2].text}):r("span",{children:i[i.length-2].text})}),i.length>2&&r("li",{className:h.item,children:i[i.length-1].href?r("a",{href:i[i.length-1].href,children:i[i.length-1].text}):r("span",{children:i[i.length-1].text})})]})]})}export{n as default};
