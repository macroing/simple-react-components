"use client";
import e from"./TextArea.module.css.js";import{jsx as t}from"react/jsx-runtime";function r(r){let{resize:a,styles:s,theme:l,...u}=r;return null==a&&(a=!0),null==s&&(s=e),t("textarea",{className:s.textarea+(a?"":" "+s.textarea_no_resize)+("failure"===l?" "+s.textarea_failure:"")+("success"===l?" "+s.textarea_success:""),...u})}export{r as default};
