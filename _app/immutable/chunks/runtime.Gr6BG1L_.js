var Hn=Array.isArray,Yn=Array.from,jn=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,en=Object.getOwnPropertyDescriptors,Bn=Object.prototype,Un=Array.prototype,ln=Object.getPrototypeOf;const Vn=()=>{};function Gn(t){return t()}function At(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,gt=4,U=8,it=16,A=32,X=64,et=128,R=256,$=512,h=1024,k=2048,q=4096,b=8192,F=16384,sn=32768,kt=65536,an=1<<17,un=1<<19,It=1<<20,Et=Symbol("$state"),Kn=Symbol("legacy props"),$n=Symbol("");function St(t){return t===this.v}function on(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function Zn(t,n){return t!==n}function xt(t){return!on(t,this.v)}function fn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function _n(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function cn(t){throw new Error("https://svelte.dev/e/effect_orphan")}function vn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function zn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Jn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Wn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Xn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function pn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function hn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let Q=!1;function Qn(){Q=!0}function ft(t){return{f:0,v:t,reactions:null,equals:St,version:0}}function tr(t){return Rt(ft(t))}function dn(t,n=!1){var e;const r=ft(t);return n||(r.equals=xt),Q&&i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function nr(t,n=!1){return Rt(dn(t,n))}function Rt(t){return o!==null&&o.f&y&&(m===null?On([t]):m.push(t)),t}function yt(t,n){return Dt(t,rt(()=>rn(t))),n}function Dt(t,n){return o!==null&&pt()&&o.f&(y|it)&&(m===null||!m.includes(t))&&hn(),En(t,n)}function En(t,n){return t.equals(n)||(t.v=n,t.version=Jt(),Ot(t,k),pt()&&u!==null&&u.f&h&&!(u.f&A)&&(v!==null&&v.includes(t)?(T(u,k),nt(u)):g===null?Cn([t]):g.push(t))),n}function Ot(t,n){var r=t.reactions;if(r!==null)for(var e=pt(),l=r.length,s=0;s<l;s++){var a=r[s],f=a.f;f&k||!e&&a===u||(T(a,n),f&(h|R)&&(f&y?Ot(a,q):nt(a)))}}function Ct(t){console.warn("https://svelte.dev/e/hydration_mismatch")}const rr=1,er=2,lr=4,sr=8,ar=16,ur=1,or=2,ir=4,fr=8,_r=16,cr=1,vr=2,yn="[",wn="[!",Tn="]",Nt={},pr=Symbol();let x=!1;function hr(t){x=t}let w;function H(t){if(t===null)throw Ct(),Nt;return w=t}function dr(){return H(D(w))}function Er(t){if(x){if(D(w)!==null)throw Ct(),Nt;w=t}}function yr(t=1){if(x){for(var n=t,r=w;n--;)r=D(r);w=r}}function wr(){for(var t=0,n=w;;){if(n.nodeType===8){var r=n.data;if(r===Tn){if(t===0)return n;t-=1}else(r===yn||r===wn)&&(t+=1)}var e=D(n);n.remove(),n=e}}var wt,bt,qt;function Tr(){if(wt===void 0){wt=window;var t=Element.prototype,n=Node.prototype;bt=dt(n,"firstChild").get,qt=dt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function lt(t=""){return document.createTextNode(t)}function st(t){return bt.call(t)}function D(t){return qt.call(t)}function mr(t,n){if(!x)return st(t);var r=st(w);if(r===null)r=w.appendChild(lt());else if(n&&r.nodeType!==3){var e=lt();return r==null||r.before(e),H(e),e}return H(r),r}function Ar(t,n){if(!x){var r=st(t);return r instanceof Comment&&r.data===""?D(r):r}return w}function gr(t,n=1,r=!1){let e=x?w:t;for(var l;n--;)l=e,e=D(e);if(!x)return e;var s=e==null?void 0:e.nodeType;if(r&&s!==3){var a=lt();return e===null?l==null||l.after(a):e.before(a),H(a),a}return H(e),e}function kr(t){t.textContent=""}function mn(t){var n=y|k;u===null?n|=R:u.f|=It;var r=o!==null&&o.f&y?o:null;const e={children:null,ctx:i,deps:null,equals:St,f:n,fn:t,reactions:null,v:null,version:0,parent:r??u};return r!==null&&(r.children??(r.children=[])).push(e),e}function Ir(t){const n=mn(t);return n.equals=xt,n}function Ft(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?_t(e):L(e)}}}function An(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Pt(t){var n,r=u;W(An(t));try{Ft(t),n=Wt(t)}finally{W(r)}return n}function Lt(t){var n=Pt(t),r=(O||t.f&R)&&t.deps!==null?q:h;T(t,r),t.equals(n)||(t.v=n,t.version=Jt())}function _t(t){Ft(t),B(t,0),T(t,F),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Mt(t){u===null&&o===null&&cn(),o!==null&&o.f&R&&_n(),vt&&fn()}function gn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function P(t,n,r,e=!0){var l=(t&X)!==0,s=u,a={ctx:i,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:l?null:s,prev:null,teardown:null,transitions:null,version:0};if(r){var f=C;try{Tt(!0),V(a),a.f|=sn}catch(_){throw L(a),_}finally{Tt(f)}}else n!==null&&nt(a);var p=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&It)===0;if(!p&&!l&&e&&(s!==null&&gn(a,s),o!==null&&o.f&y)){var d=o;(d.children??(d.children=[])).push(a)}return a}function Sr(t){const n=P(U,null,!1);return T(n,h),n.teardown=t,n}function xr(t){Mt();var n=u!==null&&(u.f&A)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=Ht(t);return e}}function Rr(t){return Mt(),ct(t)}function Dr(t){const n=P(X,t,!0);return()=>{L(n)}}function Ht(t){return P(gt,t,!1)}function Or(t,n,r,e){var l=i,s={effect:null,ran:!1};l.l.r1.push(s),s.effect=ct(()=>{s.ran||(s.ran=!0,Dt(l.l.r2,!0),rt(n))})}function Cr(){var t=i;ct(()=>{if(rn(t.l.r2)){for(var n of t.l.r1){var r=n.effect;r.f&h&&T(r,q),M(r)&&V(r),n.ran=!1}t.l.r2.v=!1}})}function ct(t){return P(U,t,!0)}function Nr(t){return kn(t)}function kn(t,n=0){return P(U|it|n,t,!0)}function br(t,n=!0){return P(U|A,t,!0,n)}function Yt(t){var n=t.teardown;if(n!==null){const r=vt,e=o;mt(!0),J(null);try{n.call(null)}finally{mt(r),J(e)}}}function jt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)_t(n[r])}}function Bt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;L(r,n),r=e}}function In(t){for(var n=t.first;n!==null;){var r=n.next;n.f&A||L(n),n=r}}function L(t,n=!0){var r=!1;if((n||t.f&un)&&t.nodes_start!==null){for(var e=t.nodes_start,l=t.nodes_end;e!==null;){var s=e===l?null:D(e);e.remove(),e=s}r=!0}Bt(t,n&&!r),jt(t),B(t,0),T(t,F);var a=t.transitions;if(a!==null)for(const p of a)p.stop();Yt(t);var f=t.parent;f!==null&&f.first!==null&&Ut(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Ut(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function qr(t,n){var r=[];Vt(t,r,!0),Sn(r,()=>{L(t),n&&n()})}function Sn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var l of t)l.out(e)}else n()}function Vt(t,n,r){if(!(t.f&b)){if(t.f^=b,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var l=e.next,s=(e.f&kt)!==0||(e.f&A)!==0;Vt(e,n,s?r:!1),e=l}}}function Fr(t){Gt(t,!0)}function Gt(t,n){if(t.f&b){M(t)&&V(t),t.f^=b;for(var r=t.first;r!==null;){var e=r.next,l=(r.f&kt)!==0||(r.f&A)!==0;Gt(r,l?n:!1),r=e}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||n)&&s.in()}}const xn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Z=!1,z=!1,at=[],ut=[];function Kt(){Z=!1;const t=at.slice();at=[],At(t)}function $t(){z=!1;const t=ut.slice();ut=[],At(t)}function Pr(t){Z||(Z=!0,queueMicrotask(Kt)),at.push(t)}function Lr(t){z||(z=!0,xn($t)),ut.push(t)}function Rn(){Z&&Kt(),z&&$t()}const Zt=0,Dn=1;let G=!1,K=Zt,Y=!1,j=null,C=!1,vt=!1;function Tt(t){C=t}function mt(t){vt=t}let S=[],N=0;let o=null;function J(t){o=t}let u=null;function W(t){u=t}let m=null;function On(t){m=t}let v=null,E=0,g=null;function Cn(t){g=t}let zt=0,O=!1,I=null,i=null;function Jt(){return++zt}function pt(){return!Q||i!==null&&i.l===null}function M(t){var a,f;var n=t.f;if(n&k)return!0;if(n&q){var r=t.deps,e=(n&R)!==0;if(r!==null){var l;if(n&$){for(l=0;l<r.length;l++)((a=r[l]).reactions??(a.reactions=[])).push(t);t.f^=$}for(l=0;l<r.length;l++){var s=r[l];if(M(s)&&Lt(s),e&&u!==null&&!O&&!((f=s==null?void 0:s.reactions)!=null&&f.includes(t))&&(s.reactions??(s.reactions=[])).push(t),s.version>t.version)return!0}}e||T(t,h)}return!1}function Nn(t,n){for(var r=n;r!==null;){if(r.f&et)try{r.fn(t);return}catch{r.f^=et}r=r.parent}throw G=!1,t}function bn(t){return(t.f&F)===0&&(t.parent===null||(t.parent.f&et)===0)}function tt(t,n,r,e){if(G){if(r===null&&(G=!1),bn(n))throw t;return}r!==null&&(G=!0);{Nn(t,n);return}}function Wt(t){var ht;var n=v,r=E,e=g,l=o,s=O,a=m,f=i,p=t.f;v=null,E=0,g=null,o=p&(A|X)?null:t,O=!C&&(p&R)!==0,m=null,i=t.ctx;try{var d=(0,t.fn)(),_=t.deps;if(v!==null){var c;if(B(t,E),_!==null&&E>0)for(_.length=E+v.length,c=0;c<v.length;c++)_[E+c]=v[c];else t.deps=_=v;if(!O)for(c=E;c<_.length;c++)((ht=_[c]).reactions??(ht.reactions=[])).push(t)}else _!==null&&E<_.length&&(B(t,E),_.length=E);return d}finally{v=n,E=r,g=e,o=l,O=s,m=a,i=f}}function qn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var l=r.length-1;l===0?r=n.reactions=null:(r[e]=r[l],r.pop())}}r===null&&n.f&y&&(v===null||!v.includes(n))&&(T(n,q),n.f&(R|$)||(n.f^=$),B(n,0))}function B(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)qn(t,r[e])}function V(t){var n=t.f;if(!(n&F)){T(t,h);var r=u,e=i;u=t;try{n&it?In(t):Bt(t),jt(t),Yt(t);var l=Wt(t);t.teardown=typeof l=="function"?l:null,t.version=zt}catch(s){tt(s,t,r,e||t.ctx)}finally{u=r}}}function Xt(){if(N>1e3){N=0;try{vn()}catch(t){if(j!==null)tt(t,j,null);else throw t}}N++}function Qt(t){var n=t.length;if(n!==0){Xt();var r=C;C=!0;try{for(var e=0;e<n;e++){var l=t[e];l.f&h||(l.f^=h);var s=[];tn(l,s),Fn(s)}}finally{C=r}}}function Fn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(F|b)))try{M(e)&&(V(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ut(e):e.fn=null))}catch(l){tt(l,e,null,e.ctx)}}}function Pn(){if(Y=!1,N>1001)return;const t=S;S=[],Qt(t),Y||(N=0,j=null)}function nt(t){K===Zt&&(Y||(Y=!0,queueMicrotask(Pn))),j=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(X|A)){if(!(r&h))return;n.f^=h}}S.push(n)}function tn(t,n){var r=t.first,e=[];t:for(;r!==null;){var l=r.f,s=(l&A)!==0,a=s&&(l&h)!==0,f=r.next;if(!a&&!(l&b))if(l&U){if(s)r.f^=h;else try{M(r)&&V(r)}catch(c){tt(c,r,null,r.ctx)}var p=r.first;if(p!==null){r=p;continue}}else l&gt&&e.push(r);if(f===null){let c=r.parent;for(;c!==null;){if(t===c)break t;var d=c.next;if(d!==null){r=d;continue t}c=c.parent}}r=f}for(var _=0;_<e.length;_++)p=e[_],n.push(p),tn(p,n)}function nn(t){var n=K,r=S;try{Xt();const l=[];K=Dn,S=l,Y=!1,Qt(r);var e=t==null?void 0:t();return Rn(),(S.length>0||l.length>0)&&nn(),N=0,j=null,e}finally{K=n,S=r}}async function Mr(){await Promise.resolve(),nn()}function rn(t){var _;var n=t.f,r=(n&y)!==0;if(r&&n&F){var e=Pt(t);return _t(t),e}if(I!==null&&I.add(t),o!==null){m!==null&&m.includes(t)&&pn();var l=o.deps;v===null&&l!==null&&l[E]===t?E++:v===null?v=[t]:v.push(t),g!==null&&u!==null&&u.f&h&&!(u.f&A)&&g.includes(t)&&(T(u,k),nt(u))}else if(r&&t.deps===null)for(var s=t,a=s.parent,f=s;a!==null;)if(a.f&y){var p=a;f=p,a=p.parent}else{var d=a;(_=d.deriveds)!=null&&_.includes(f)||(d.deriveds??(d.deriveds=[])).push(f);break}return r&&(s=t,M(s)&&Lt(s)),t.v}function Ln(t){var n=I;I=new Set;var r=I,e;try{if(rt(t),n!==null)for(e of I)n.add(e)}finally{I=n}return r}function Hr(t){var n=Ln(()=>rt(t));for(var r of n)if(r.f&an)for(const e of r.deps||[])e.f&y||yt(e,null);else yt(r,null)}function rt(t){const n=o;try{return o=null,t()}finally{o=n}}const Mn=~(k|q|h);function T(t,n){t.f=t.f&Mn|n}function Yr(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},Q&&!n&&(i.l={s:null,u:null,r1:[],r2:ft(!1)})}function jr(t){const n=i;if(n!==null){const a=n.e;if(a!==null){var r=u,e=o;n.e=null;try{for(var l=0;l<a.length;l++){var s=a[l];W(s.effect),J(s.reaction),Ht(s.fn)}}finally{W(r),J(e)}}i=n.p,n.m=!0}return{}}function Br(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(Et in t)ot(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&Et in r&&ot(r)}}}function ot(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{ot(t[e],n)}catch{}const r=ln(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=en(r);for(let l in e){const s=e[l].get;if(s)try{s.call(t)}catch{}}}}}export{or as $,ft as A,Wn as B,Dt as C,dt as D,kt as E,u as F,Xn as G,ln as H,Hn as I,dr as J,wn as K,wr as L,H as M,hr as N,Fr as O,qr as P,Jn as Q,an as R,Et as S,ir as T,pr as U,xt as V,A as W,X,W as Y,ur as Z,Q as _,br as a,fr as a0,Kn as a1,Ir as a2,_r as a3,dn as a4,I as a5,jn as a6,J as a7,o as a8,Tr as a9,Vt as aA,Sn as aB,lr as aC,sr as aD,ar as aE,$n as aF,Lr as aG,en as aH,Or as aI,Cr as aJ,Hr as aK,nr as aL,yr as aM,st as aa,yn as ab,D as ac,Nt as ad,Tn as ae,Ct as af,zn as ag,kr as ah,Yn as ai,Dr as aj,lt as ak,Sr as al,cr as am,vr as an,Ht as ao,ct as ap,Pr as aq,nn as ar,Mr as as,tr as at,pt as au,Zn as av,b as aw,rr as ax,En as ay,er as az,kn as b,w as c,L as d,jr as e,Ar as f,mr as g,x as h,gr as i,Rr as j,xr as k,i as l,At as m,Vn as n,rn as o,Yr as p,Gn as q,Er as r,on as s,Nr as t,rt as u,Br as v,mn as w,Qn as x,Bn as y,Un as z};