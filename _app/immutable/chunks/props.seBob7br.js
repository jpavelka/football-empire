import{S,y as z,z as V,A as m,B as J,C as P,U as c,D,o as y,F,G as Q,H as W,I as X,b as k,h as C,J as p,E as ee,K as re,L as ae,M as te,N as Y,O as q,a as M,P as U,c as ne,Q as ie,R as fe,T as se,V as ue,u as j,W as le,X as _e,Y as G,Z as ve,_ as de,$ as ce,a0 as oe,a1 as be,w as H,a2 as ge,a3 as ye,a4 as he,a5 as Pe}from"./runtime.Gr6BG1L_.js";import{c as me}from"./store.0yh4kBgq.js";function w(t,u=null,g){if(typeof t!="object"||t===null||S in t)return t;const v=W(t);if(v!==z&&v!==V)return t;var i=new Map,_=X(t),o=m(0);_&&i.set("length",m(t.length));var h;return new Proxy(t,{defineProperty(f,e,r){(!("value"in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&J();var n=i.get(e);return n===void 0?(n=m(r.value),i.set(e,n)):P(n,w(r.value,h)),!0},deleteProperty(f,e){var r=i.get(e);if(r===void 0)e in f&&i.set(e,m(c));else{if(_&&typeof e=="string"){var n=i.get("length"),a=Number(e);Number.isInteger(a)&&a<n.v&&P(n,a)}P(r,c),K(o)}return!0},get(f,e,r){var d;if(e===S)return t;var n=i.get(e),a=e in f;if(n===void 0&&(!a||(d=D(f,e))!=null&&d.writable)&&(n=m(w(a?f[e]:c,h)),i.set(e,n)),n!==void 0){var s=y(n);return s===c?void 0:s}return Reflect.get(f,e,r)},getOwnPropertyDescriptor(f,e){var r=Reflect.getOwnPropertyDescriptor(f,e);if(r&&"value"in r){var n=i.get(e);n&&(r.value=y(n))}else if(r===void 0){var a=i.get(e),s=a==null?void 0:a.v;if(a!==void 0&&s!==c)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return r},has(f,e){var s;if(e===S)return!0;var r=i.get(e),n=r!==void 0&&r.v!==c||Reflect.has(f,e);if(r!==void 0||F!==null&&(!n||(s=D(f,e))!=null&&s.writable)){r===void 0&&(r=m(n?w(f[e],h):c),i.set(e,r));var a=y(r);if(a===c)return!1}return n},set(f,e,r,n){var E;var a=i.get(e),s=e in f;if(_&&e==="length")for(var d=r;d<a.v;d+=1){var R=i.get(d+"");R!==void 0?P(R,c):d in f&&(R=m(c),i.set(d+"",R))}a===void 0?(!s||(E=D(f,e))!=null&&E.writable)&&(a=m(void 0),P(a,w(r,h)),i.set(e,a)):(s=a.v!==c,P(a,w(r,h)));var b=Reflect.getOwnPropertyDescriptor(f,e);if(b!=null&&b.set&&b.set.call(n,r),!s){if(_&&typeof e=="string"){var O=i.get("length"),T=Number(e);Number.isInteger(T)&&T>=O.v&&P(O,T+1)}K(o)}return!0},ownKeys(f){y(o);var e=Reflect.ownKeys(f).filter(a=>{var s=i.get(a);return s===void 0||s.v!==c});for(var[r,n]of i)n.v!==c&&!(r in f)&&e.push(r);return e},setPrototypeOf(){Q()}})}function K(t,u=1){P(t,t.v+u)}function Z(t){return t!==null&&typeof t=="object"&&S in t?t[S]:t}function Ie(t,u){return Object.is(Z(t),Z(u))}function we(t,u,g=!1){C&&p();var v=t,i=null,_=null,o=c,h=g?ee:0,f=!1;const e=(n,a=!0)=>{f=!0,r(a,n)},r=(n,a)=>{if(o===(o=n))return;let s=!1;if(C){const d=v.data===re;!!o===d&&(v=ae(),te(v),Y(!1),s=!0)}o?(i?q(i):a&&(i=M(()=>a(v))),_&&U(_,()=>{_=null})):(_?q(_):a&&(_=M(()=>a(v))),i&&U(i,()=>{i=null})),s&&Y(!0)};k(()=>{f=!1,u(e),f||r(null,null)},h),C&&(v=ne)}function $(t){for(var u=F,g=F;u!==null&&!(u.f&(le|_e));)u=u.parent;try{return G(u),t()}finally{G(g)}}function Se(t,u,g,v){var B;var i=(g&ve)!==0,_=!de||(g&ce)!==0,o=(g&oe)!==0,h=(g&ye)!==0,f=!1,e;o?[e,f]=me(()=>t[u]):e=t[u];var r=S in t||be in t,n=((B=D(t,u))==null?void 0:B.set)??(r&&o&&u in t?l=>t[u]=l:void 0),a=v,s=!0,d=!1,R=()=>(d=!0,s&&(s=!1,h?a=j(v):a=v),a);e===void 0&&v!==void 0&&(n&&_&&ie(),e=R(),n&&n(e));var b;if(_)b=()=>{var l=t[u];return l===void 0?R():(s=!0,d=!1,l)};else{var O=$(()=>(i?H:ge)(()=>t[u]));O.f|=fe,b=()=>{var l=y(O);return l!==void 0&&(a=void 0),l===void 0?a:l}}if(!(g&se))return b;if(n){var T=t.$$legacy;return function(l,I){return arguments.length>0?((!_||!I||T||f)&&n(I?b():l),l):b()}}var E=!1,L=!1,N=he(e),A=$(()=>H(()=>{var l=b(),I=y(N);return E?(E=!1,L=!0,I):(L=!1,N.v=l)}));return i||(A.equals=ue),function(l,I){if(Pe!==null&&(E=L,b(),y(N)),arguments.length>0){const x=I?y(A):_&&o?w(l):l;return A.equals(x)||(E=!0,P(N,x),d&&a!==void 0&&(a=x),j(()=>y(A))),l}return y(A)}}export{w as a,Ie as b,we as i,Se as p};