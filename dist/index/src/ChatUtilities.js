import{transform as e}from"@macroing/transformer.js";const t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEYklEQVR4nLzW/zfVdxwH8HvbnWGi4VwRuXR0HaXVxtBs15TaZCvGfEu+ZkozVrIb6tLOGrMwi6Gj1KyLOWRNEs6VI1nzpcIyhn05yZfGWs1dpe353P/Qxw+P973uvXye78/r9Xpfyd6r74hEovURQLQ8RAEbn+mEqSGfQdmHBnBvyrswzH0E5vupYY3qZ9jxTTFMc5iFL+Tz9336PvDWxmBoOLkGLhI94R9xu10GllW+1fDMOV61h/NP8Ni/U/DRt7lQG7gH6jikQLW0DfZWzMD2vk1w3MgYPmv/Mj+ljIEVlW9C6fZlQiSQzMT8g6W5mjn8y/VhcaIL3LN6Dg4F1sATPzwNB7LyYIldIlx90B3endOBQYnfw9hjt+GCxgreTi+DE+evCpLghpS7VjgfDxsnI2HRpYdwpcURGGbmB62yWEv1u3uhr6MSStX34fjURigPZkWlmyfAO+uXwM6z62BtRLwgCcRL/8BiOH2HT078CU2DWA85nnfhdDzr4Zdo7r5zPuvqjRQmO+eSzQThrChlgzkTGN+EZY7zULHoOb5HYytIgqQmXm9oVzSsHr4IZ9YZQUuXcDib/AAm666F4enc/czsJmg72Q5fNOW+t6yYhrr9Q9DILhB6R++G1o0ZQiQQO7zEK1JsiOWzKSdQlSTmQ7kJNDs9ALfaHIWqo3rwNRN2b2QrO8ZiZhUsSGuB6hu8B5KhbbA2lZ9dlnZZkASHFLwKqW4PPJnH7t1c+yn02hYAZ5fcgj5x//et5duwvb0C5kbx/ccDX2FiBWfXhte1MEzGnlju9Rf0bosSJMGppEwsKyp/hAMLBXCi9RPYYWEDvz78Ox/XsaL6z+rCAqOdsHTEAxbLOS8nldthTx675ErqPThazJ43kZYJkUByfZY1YN3LmVN1gNeil+MLW5I4Z2zmNXBTAytEtZhnw8UsTt+q98fgA/kC3OXBVzVbPoIZ4SXwLX/2gVYpTCeXmn2OJdZaBcut2Qd2FRf4eOpjmKp6CtbpcdqkdflD/aFmGGFQyHzq/XDwHju8x2UfzPbjBM1bylP6kJEgZ7Kk24PVcjNhF5Q6yqDYile6Zl8cnO8+D3tD2BPmpobwSMtpprF1gM4Kdkzmr1tgm5oVlW/L2fWognNBL6FbkARDodew3O9g7/UPcMpffj4ITrhVQdOSA1Aj56tbNa9CL8s6aKJl/ThNszPCHh+HJxNOwSjjxXBHK/90TFOcEAnEC82sVueGQdg1Psz/n8sddBpdCT0nWe+Fww2wo4f1pqPkdyQ373T4t30OlKuz4Jf5vAcurmkw+YIXfDjnIUiCIn8JFtlvH0AfmRzWOh2GVw6yTgbHWPXfTfAMuDTC7woj1zQwUo/z6oud7IYZd96PtW6uTKbPDgi1Z0+4eoqESCAJkHGmJ6h4JneWcK93vDcKN5eegX31ldD8OiduTRH7XKt8DOsD+L1hbD/vn24iE5QbsD/6o3hXgiN5zs9+lS1Egv8CAAD//1W2eYamjudSAAAAAElFTkSuQmCC";function n(e){if(e?.createdAt&&e.createdAt instanceof Date){const t=e.createdAt,n=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()),r=n.getTime()-a.getTime(),o=Math.max(Math.floor(r/1e3),0),l=Math.max(Math.floor(o/60),0),u=Math.max(Math.floor(l/60),0),s=Math.max(Math.floor(u/24),0),i=Math.max(Math.floor(s/30),0),d=Math.max(Math.floor(i/12),0);return s<=0?u>0?u+" hour":l>0?l+" min":o+" sec":d>0?d+" year":i>0?i+" mon":s+" day"}return""}function a(e,t=l()){return e?.createdAt?.toLocaleString(t?.locales||"en-US")||""}function r(e=[],t=[],n="Load more...",a=1,r=2){return{chatMessages:e,images:t,loadChatMessagesText:n,page:a,pages:r}}function o(e=r(),t=D(),n=i(),a=d(),o=null,l=[],u={}){return{body:e,currentUser:t,footer:n,header:a,key:o,uploadedImages:l,...u}}function l(e="en-US",t="and",n="like",a="unread",r="user"){return{locales:e,words:{and:t,like:n,unread:a,user:r}}}function u(){return o(r(),D(),i(),d(),null,[],{_id:1})}function s(e=n,t=a,r=p,o=y,l=T,u=M,s=C,i=I,d=L,f=k,g=O){return{computeDateTimeText:e,computeDateTimeTextTooltip:t,isSameUser:r,onChatClose:o,onDeleteUploadedImage:l,onFilterText:u,onLike:s,onLoadChatMessages:i,onSendChatMessage:d,onType:f,onUploadImage:g}}function i(e=new Date){return{lastTimeTyped:e}}function d(e=g(),t=!0,n=f()){return{image:e,isLoggedIn:t,title:n}}function f(e="/",t="John Doe"){return{href:e,text:t}}function g(e="",n=null,a=t){return{alt:e,key:n,src:a}}function c(e=null,t="thumbs-up",n=D()){return{key:e,kind:t,user:n}}function h(e=new Date,t=[],n=!1,a=null,r=[],o="Hello, World!",l=D(),u={}){return{createdAt:e,images:t,isUnread:n,key:a,likes:r,text:o,user:l,...u}}function m(e=t,n=!0,a=!0,r=!1,o="John Doe",l={}){return{image:e,isLoggedIn:n,isSelf:a,isSelfImageVisible:r,name:o,...l}}function A(){return m(t,!0,!1,!1,"Jane Doe",{_id:2})}function D(){return m(t,!0,!0,!0,"John Doe",{_id:1})}function p(e,t){return e?._id===t?._id}function y(e,t,n){n(w(t,(t=>t._id===e._id)))}function T(e,t,n,a){a(z(n,(t=>t._id===e._id),t))}function M(e){return e}function C(e,t,n,a,r){r(v(a,(t=>t._id===e._id),(e=>e._id===t._id),(e=>1===e._id),(()=>D()),n))}function I(e,t,n){n(x(t,(t=>t._id===e._id),(e=>[h(new Date,e?.uploadedImages?.length>0?[...e?.uploadedImages]:[],!0,null,[],"Hello, World!",D(),{_id:e.body.chatMessages.length+1})])))}function L(e,t,n,a){a(S(n,(t=>t._id===e._id),(e=>h(new Date,e?.uploadedImages?.length>0?[...e?.uploadedImages]:[],!0,null,[],t,{...e.currentUser},{_id:e.body.chatMessages.length+1}))))}function k(e,t,n){n(b(t,(t=>t._id===e._id)))}function O(e,n,a,r){r(U(a,(t=>t._id===e._id),g("John Doe",e?.uploadedImages?.length?e.uploadedImages.length+1:1,t)))}function w(t,n){return e(t,(({parents:e,transformArray:t,value:a})=>0===e.length&&Array.isArray(a)?t(a,(e=>!n(e))):a))}function z(t,n,a){return e(t,(({equals:e,parents:t,transformArray:r,value:o,valueKey:l})=>t.length>1&&n(t[1])&&"uploadedImages"===l&&Array.isArray(o)?r(o,(t=>!e(t,a))):o))}function v(t,n,a,r,o,l){return e(t,(({parentKey:e,parents:t,transformArray:u,transformObject:s,value:i,valueIndex:d,valueKey:f})=>t.length>4&&n(t[1])&&a(t[4])?"likes"===f&&Array.isArray(i)?u(i,(e=>!r(e.user)),((e,t)=>(0===t.length||1===t.length&&t[0].kind!==l)&&e.push(c(null,l,o())))):"chatMessages"!==e||null===d||"object"!=typeof i||1!==i.id||i.likes&&0!==i.likes.length?i:s(i,null,(e=>e.likes=[c(null,l,o())])):i))}function x(t,n,a){return e(t,(({parents:e,transformArray:t,value:r,valueKey:o})=>e.length>1&&n(e[1])&&"chatMessages"===o&&Array.isArray(r)?t(r,null,(t=>t.push(...a(e[1])))):r))}function S(t,n,a){return e(t,(({parents:e,transformArray:t,value:r,valueKey:o})=>e.length>1&&n(e[1])?"chatMessages"===o&&Array.isArray(r)?t(r,null,(t=>t.unshift(a(e[1])))):"uploadedImages"===o&&Array.isArray(r)?[]:r:r))}function U(t,n,a){return e(t,(({parents:e,transformArray:t,value:r,valueKey:o})=>e.length>1&&n(e[1])&&"uploadedImages"===o&&Array.isArray(r)?t(r,null,(e=>e.push(a))):r))}function b(t,n){return e(t,(({parents:e,value:t,valueKey:a})=>e.length>1&&n(e[1])&&"lastTimeTyped"===a?new Date:t))}var H={DEFAULT_IMAGE:t,computeDateTimeTextDefault:n,computeDateTimeTextTooltipDefault:a,createBody:r,createChat:o,createChatConfiguration:l,createChatDefault:u,createChatHandler:s,createFooter:i,createHeader:d,createHeaderTitle:f,createImage:g,createLike:c,createMessage:h,createUser:m,createUserJaneDoe:A,createUserJohnDoe:D,isSameUserDefault:p,onChatCloseDefault:y,onDeleteUploadedImageDefault:T,onFilterTextDefault:M,onLikeDefault:C,onLoadChatMessagesDefault:I,onSendChatMessageDefault:L,onTypeDefault:k,onUploadImageDefault:O,transformOnChatClose:w,transformOnDeleteUploadedImage:z,transformOnLike:v,transformOnLoadChatMessages:x,transformOnSendChatMessage:S,transformOnUploadImage:U,transformOnType:b};export{t as DEFAULT_IMAGE,n as computeDateTimeTextDefault,a as computeDateTimeTextTooltipDefault,r as createBody,o as createChat,l as createChatConfiguration,u as createChatDefault,s as createChatHandler,i as createFooter,d as createHeader,f as createHeaderTitle,g as createImage,c as createLike,h as createMessage,m as createUser,A as createUserJaneDoe,D as createUserJohnDoe,H as default,p as isSameUserDefault,y as onChatCloseDefault,T as onDeleteUploadedImageDefault,M as onFilterTextDefault,C as onLikeDefault,I as onLoadChatMessagesDefault,L as onSendChatMessageDefault,k as onTypeDefault,O as onUploadImageDefault,w as transformOnChatClose,z as transformOnDeleteUploadedImage,v as transformOnLike,x as transformOnLoadChatMessages,S as transformOnSendChatMessage,b as transformOnType,U as transformOnUploadImage};
