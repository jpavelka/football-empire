import{a6 as H,a7 as A,Y as D,I as j,a8 as P,F as M,a9 as E,aa as $,ab as q,ac as B,ad as T,N as b,M as I,J as F,c as v,ae as J,af as W,ag as z,ah as G,ai as K,aj as Q,ak as U,a as X,p as Z,h as N,e as x,l as ee,al as re,a4 as ae,n as L,C as te,o as se}from"./runtime.Gr6BG1L_.js";import{b as ne}from"./disclose-version.DSZtK_5m.js";import{s as ie}from"./utils.T9P0XPTI.js";const V=new Set,S=new Set;function _e(e){for(var r=0;r<e.length;r++)V.add(e[r]);for(var t of S)t(e)}function y(e){var O;var r=this,t=r.ownerDocument,s=e.type,o=((O=e.composedPath)==null?void 0:O.call(e))||[],a=o[0]||e.target,d=0,h=e.__root;if(h){var c=o.indexOf(h);if(c!==-1&&(r===document||r===window)){e.__root=r;return}var l=o.indexOf(r);if(l===-1)return;c<=l&&(d=c)}if(a=o[d]||e.target,a!==r){H(e,"currentTarget",{configurable:!0,get(){return a||t}});var m=P,u=M;A(null),D(null);try{for(var n,i=[];a!==null;){var f=a.assignedSlot||a.parentNode||a.host||null;try{var _=a["__"+s];if(_!==void 0&&!a.disabled)if(j(_)){var[k,...C]=_;k.apply(a,[e,...C])}else _.call(a,e)}catch(g){n?i.push(g):n=g}if(e.cancelBubble||f===r||f===null)break;a=f}if(n){for(let g of i)queueMicrotask(()=>{throw g});throw n}}finally{e.__root=r,delete e.currentTarget,A(m),D(u)}}}const oe=["touchstart","touchmove"];function ue(e){return oe.includes(e)}function he(e,r){var t=r==null?"":typeof r=="object"?r+"":r;t!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=t,e.nodeValue=t==null?"":t+"")}function fe(e,r){return Y(e,r)}function pe(e,r){E(),r.intro=r.intro??!1;const t=r.target,s=N,o=v;try{for(var a=$(t);a&&(a.nodeType!==8||a.data!==q);)a=B(a);if(!a)throw T;b(!0),I(a),F();const d=Y(e,{...r,anchor:a});if(v===null||v.nodeType!==8||v.data!==J)throw W(),T;return b(!1),d}catch(d){if(d===T)return r.recover===!1&&z(),E(),G(t),b(!1),fe(e,r);throw d}finally{b(s),I(o)}}const p=new Map;function Y(e,{target:r,anchor:t,props:s={},events:o,context:a,intro:d=!0}){E();var h=new Set,c=u=>{for(var n=0;n<u.length;n++){var i=u[n];if(!h.has(i)){h.add(i);var f=ue(i);r.addEventListener(i,y,{passive:f});var _=p.get(i);_===void 0?(document.addEventListener(i,y,{passive:f}),p.set(i,1)):p.set(i,_+1)}}};c(K(V)),S.add(c);var l=void 0,m=Q(()=>{var u=t??r.appendChild(U());return X(()=>{if(a){Z({});var n=ee;n.c=a}o&&(s.$$events=o),N&&ne(u,null),l=e(u,s)||{},N&&(M.nodes_end=v),a&&x()}),()=>{var f;for(var n of h){r.removeEventListener(n,y);var i=p.get(n);--i===0?(document.removeEventListener(n,y),p.delete(n)):p.set(n,i)}S.delete(c),R.delete(l),u!==t&&((f=u.parentNode)==null||f.removeChild(u))}});return R.set(l,m),l}let R=new WeakMap;function ve(e){const r=R.get(e);r&&r()}let w=!1;function ge(e,r,t){const s=t[r]??(t[r]={store:null,source:ae(void 0),unsubscribe:L});if(s.store!==e)if(s.unsubscribe(),s.store=e??null,e==null)s.source.v=void 0,s.unsubscribe=L;else{var o=!0;s.unsubscribe=ie(e,a=>{o?s.source.v=a:te(s.source,a)}),o=!1}return se(s.source)}function be(){const e={};return re(()=>{for(var r in e)e[r].unsubscribe()}),e}function ye(e){var r=w;try{return w=!1,[e(),w]}finally{w=r}}export{he as a,ge as b,ye as c,_e as d,pe as h,fe as m,be as s,ve as u};
