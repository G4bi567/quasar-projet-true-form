import{a4 as ae,a5 as pe,a as p,u as le,P as c,h as fe,S as be,L as H,B as j,R as I,j as me,E as oe,J as ge,s as he,m as Q,y as ye,a0 as ke,G as xe}from"./index.ac0055ed.js";const F={xs:18,sm:24,md:32,lg:38,xl:46},re={size:String};function se(e,t=F){return c(()=>e.size!==void 0?{fontSize:e.size in t?`${t[e.size]}px`:e.size}:null)}const W=e=>ae(pe(e)),qe=e=>ae(e);function $e(e,t){return e!==void 0&&e()||t}function Ye(e,t){if(e!==void 0){const a=e();if(a!=null)return a.slice()}return t}function z(e,t){return e!==void 0?t.concat(e()):t}function et(e,t){return e===void 0?t:t!==void 0?t.concat(e()):e()}function tt(e,t,a,n,s,d){t.key=n+s;const i=p(e,t,a);return s===!0?le(i,d()):i}const J="0 0 24 24",U=e=>e,D=e=>`ionicons ${e}`,ie={"mdi-":e=>`mdi ${e}`,"icon-":U,"bt-":e=>`bt ${e}`,"eva-":e=>`eva ${e}`,"ion-md":D,"ion-ios":D,"ion-logo":D,"iconfont ":U,"ti-":e=>`themify-icon ${e}`,"bi-":e=>`bootstrap-icons ${e}`},ue={o_:"-outlined",r_:"-round",s_:"-sharp"},ce={sym_o_:"-outlined",sym_r_:"-rounded",sym_s_:"-sharp"},we=new RegExp("^("+Object.keys(ie).join("|")+")"),Ee=new RegExp("^("+Object.keys(ue).join("|")+")"),X=new RegExp("^("+Object.keys(ce).join("|")+")"),Le=/^[Mm]\s?[-+]?\.?\d/,_e=/^img:/,Ce=/^svguse:/,Se=/^ion-/,Be=/^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;var G=W({name:"QIcon",props:{...re,tag:{type:String,default:"i"},name:String,color:String,left:Boolean,right:Boolean},setup(e,{slots:t}){const{proxy:{$q:a}}=Q(),n=se(e),s=c(()=>"q-icon"+(e.left===!0?" on-left":"")+(e.right===!0?" on-right":"")+(e.color!==void 0?` text-${e.color}`:"")),d=c(()=>{let i,l=e.name;if(l==="none"||!l)return{none:!0};if(a.iconMapFn!==null){const u=a.iconMapFn(l);if(u!==void 0)if(u.icon!==void 0){if(l=u.icon,l==="none"||!l)return{none:!0}}else return{cls:u.cls,content:u.content!==void 0?u.content:" "}}if(Le.test(l)===!0){const[u,h=J]=l.split("|");return{svg:!0,viewBox:h,nodes:u.split("&&").map(r=>{const[y,m,k]=r.split("@@");return p("path",{style:m,d:y,transform:k})})}}if(_e.test(l)===!0)return{img:!0,src:l.substring(4)};if(Ce.test(l)===!0){const[u,h=J]=l.split("|");return{svguse:!0,src:u.substring(7),viewBox:h}}let q=" ";const g=l.match(we);if(g!==null)i=ie[g[1]](l);else if(Be.test(l)===!0)i=l;else if(Se.test(l)===!0)i=`ionicons ion-${a.platform.is.ios===!0?"ios":"md"}${l.substring(3)}`;else if(X.test(l)===!0){i="notranslate material-symbols";const u=l.match(X);u!==null&&(l=l.substring(6),i+=ce[u[1]]),q=l}else{i="notranslate material-icons";const u=l.match(Ee);u!==null&&(l=l.substring(2),i+=ue[u[1]]),q=l}return{cls:i,content:q}});return()=>{const i={class:s.value,style:n.value,"aria-hidden":"true",role:"presentation"};return d.value.none===!0?p(e.tag,i,$e(t.default)):d.value.img===!0?p("span",i,z(t.default,[p("img",{src:d.value.src})])):d.value.svg===!0?p("span",i,z(t.default,[p("svg",{viewBox:d.value.viewBox||"0 0 24 24"},d.value.nodes)])):d.value.svguse===!0?p("span",i,z(t.default,[p("svg",{viewBox:d.value.viewBox},[p("use",{"xlink:href":d.value.src})])])):(d.value.cls!==void 0&&(i.class+=" "+d.value.cls),p(e.tag,i,z(t.default,[d.value.content])))}}});const Oe={size:{type:[Number,String],default:"1em"},color:String};function je(e){return{cSize:c(()=>e.size in F?`${F[e.size]}px`:e.size),classes:c(()=>"q-spinner"+(e.color?` text-${e.color}`:""))}}var Ae=W({name:"QSpinner",props:{...Oe,thickness:{type:Number,default:5}},setup(e){const{cSize:t,classes:a}=je(e);return()=>p("svg",{class:a.value+" q-spinner-mat",width:t.value,height:t.value,viewBox:"25 25 50 50"},[p("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":e.thickness,"stroke-miterlimit":"10"})])}});function Re(e,t){const a=e.style;for(const n in t)a[n]=t[n]}function nt(e){if(e==null)return;if(typeof e=="string")try{return document.querySelector(e)||void 0}catch{return}const t=xe(e);if(t)return t.$el||t}function at(e,t){if(e==null||e.contains(t)===!0)return!0;for(let a=e.nextElementSibling;a!==null;a=a.nextElementSibling)if(a.contains(t))return!0;return!1}function Te(e,t=250){let a=!1,n;return function(){return a===!1&&(a=!0,setTimeout(()=>{a=!1},t),n=e.apply(this,arguments)),n}}function Z(e,t,a,n){a.modifiers.stop===!0&&oe(e);const s=a.modifiers.color;let d=a.modifiers.center;d=d===!0||n===!0;const i=document.createElement("span"),l=document.createElement("span"),q=ye(e),{left:g,top:u,width:h,height:r}=t.getBoundingClientRect(),y=Math.sqrt(h*h+r*r),m=y/2,k=`${(h-y)/2}px`,v=d?k:`${q.left-g-m}px`,x=`${(r-y)/2}px`,O=d?x:`${q.top-u-m}px`;l.className="q-ripple__inner",Re(l,{height:`${y}px`,width:`${y}px`,transform:`translate3d(${v},${O},0) scale3d(.2,.2,1)`,opacity:0}),i.className=`q-ripple${s?" text-"+s:""}`,i.setAttribute("dir","ltr"),i.appendChild(l),t.appendChild(i);const S=()=>{i.remove(),clearTimeout(B)};a.abort.push(S);let B=setTimeout(()=>{l.classList.add("q-ripple__inner--enter"),l.style.transform=`translate3d(${k},${x},0) scale3d(1,1,1)`,l.style.opacity=.2,B=setTimeout(()=>{l.classList.remove("q-ripple__inner--enter"),l.classList.add("q-ripple__inner--leave"),l.style.opacity=0,B=setTimeout(()=>{i.remove(),a.abort.splice(a.abort.indexOf(S),1)},275)},250)},50)}function V(e,{modifiers:t,value:a,arg:n}){const s=Object.assign({},e.cfg.ripple,t,a);e.modifiers={early:s.early===!0,stop:s.stop===!0,center:s.center===!0,color:s.color||n,keyCodes:[].concat(s.keyCodes||13)}}var Pe=qe({name:"ripple",beforeMount(e,t){const a=t.instance.$.appContext.config.globalProperties.$q.config||{};if(a.ripple===!1)return;const n={cfg:a,enabled:t.value!==!1,modifiers:{},abort:[],start(s){n.enabled===!0&&s.qSkipRipple!==!0&&s.type===(n.modifiers.early===!0?"pointerdown":"click")&&Z(s,e,n,s.qKeyEvent===!0)},keystart:Te(s=>{n.enabled===!0&&s.qSkipRipple!==!0&&I(s,n.modifiers.keyCodes)===!0&&s.type===`key${n.modifiers.early===!0?"down":"up"}`&&Z(s,e,n,!0)},300)};V(n,t),e.__qripple=n,fe(n,"main",[[e,"pointerdown","start","passive"],[e,"click","start","passive"],[e,"keydown","keystart","passive"],[e,"keyup","keystart","passive"]])},updated(e,t){if(t.oldValue!==t.value){const a=e.__qripple;a!==void 0&&(a.enabled=t.value!==!1,a.enabled===!0&&Object(t.value)===t.value&&V(a,t))}},beforeUnmount(e){const t=e.__qripple;t!==void 0&&(t.abort.forEach(a=>{a()}),be(t,"main"),delete e._qripple)}});const de={left:"start",center:"center",right:"end",between:"between",around:"around",evenly:"evenly",stretch:"stretch"},Me=Object.keys(de),ze={align:{type:String,validator:e=>Me.includes(e)}};function Ke(e){return c(()=>{const t=e.align===void 0?e.vertical===!0?"stretch":"left":e.align;return`${e.vertical===!0?"items":"justify"}-${de[t]}`})}function lt(e){if(Object(e.$parent)===e.$parent)return e.$parent;let{parent:t}=e.$;for(;Object(t)===t;){if(Object(t.proxy)===t.proxy)return t.proxy;t=t.parent}}function Ne(e){return e.appContext.config.globalProperties.$router!==void 0}function ot(e){return e.isUnmounted===!0||e.isDeactivated===!0}function Y(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function ee(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function De(e,t){for(const a in t){const n=t[a],s=e[a];if(typeof n=="string"){if(n!==s)return!1}else if(Array.isArray(s)===!1||s.length!==n.length||n.some((d,i)=>d!==s[i]))return!1}return!0}function te(e,t){return Array.isArray(t)===!0?e.length===t.length&&e.every((a,n)=>a===t[n]):e.length===1&&e[0]===t}function Ie(e,t){return Array.isArray(e)===!0?te(e,t):Array.isArray(t)===!0?te(t,e):e===t}function Fe(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const a in e)if(Ie(e[a],t[a])===!1)return!1;return!0}const Qe={to:[String,Object],replace:Boolean,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"},href:String,target:String,disable:Boolean};function We({fallbackTag:e,useDisableForRouterLinkProps:t=!0}={}){const a=Q(),{props:n,proxy:s,emit:d}=a,i=Ne(a),l=c(()=>n.disable!==!0&&n.href!==void 0),q=t===!0?c(()=>i===!0&&n.disable!==!0&&l.value!==!0&&n.to!==void 0&&n.to!==null&&n.to!==""):c(()=>i===!0&&l.value!==!0&&n.to!==void 0&&n.to!==null&&n.to!==""),g=c(()=>q.value===!0?O(n.to):null),u=c(()=>g.value!==null),h=c(()=>l.value===!0||u.value===!0),r=c(()=>n.type==="a"||h.value===!0?"a":n.tag||e||"div"),y=c(()=>l.value===!0?{href:n.href,target:n.target}:u.value===!0?{href:g.value.href,target:n.target}:{}),m=c(()=>{if(u.value===!1)return-1;const{matched:f}=g.value,{length:w}=f,E=f[w-1];if(E===void 0)return-1;const _=s.$route.matched;if(_.length===0)return-1;const C=_.findIndex(ee.bind(null,E));if(C>-1)return C;const K=Y(f[w-2]);return w>1&&Y(E)===K&&_[_.length-1].path!==K?_.findIndex(ee.bind(null,f[w-2])):C}),k=c(()=>u.value===!0&&m.value!==-1&&De(s.$route.params,g.value.params)),v=c(()=>k.value===!0&&m.value===s.$route.matched.length-1&&Fe(s.$route.params,g.value.params)),x=c(()=>u.value===!0?v.value===!0?` ${n.exactActiveClass} ${n.activeClass}`:n.exact===!0?"":k.value===!0?` ${n.activeClass}`:"":"");function O(f){try{return s.$router.resolve(f)}catch{}return null}function S(f,{returnRouterError:w,to:E=n.to,replace:_=n.replace}={}){if(n.disable===!0)return f.preventDefault(),Promise.resolve(!1);if(f.metaKey||f.altKey||f.ctrlKey||f.shiftKey||f.button!==void 0&&f.button!==0||n.target==="_blank")return Promise.resolve(!1);f.preventDefault();const C=s.$router[_===!0?"replace":"push"](E);return w===!0?C:C.then(()=>{}).catch(()=>{})}function B(f){if(u.value===!0){const w=E=>S(f,E);d("click",f,w),f.defaultPrevented!==!0&&w()}else d("click",f)}return{hasRouterLink:u,hasHrefLink:l,hasLink:h,linkTag:r,resolvedLink:g,linkIsActive:k,linkIsExactActive:v,linkClass:x,linkAttrs:y,getLink:O,navigateToRouterLink:S,navigateOnClick:B}}const ne={none:0,xs:4,sm:8,md:16,lg:24,xl:32},He={xs:8,sm:10,md:14,lg:20,xl:24},Je=["button","submit","reset"],Ue=/[^\s]\/[^\s]/,Xe=["flat","outline","push","unelevated"],ve=(e,t)=>e.flat===!0?"flat":e.outline===!0?"outline":e.push===!0?"push":e.unelevated===!0?"unelevated":t,rt=e=>{const t=ve(e);return t!==void 0?{[t]:!0}:{}},Ge={...re,...Qe,type:{type:String,default:"button"},label:[Number,String],icon:String,iconRight:String,...Xe.reduce((e,t)=>(e[t]=Boolean)&&e,{}),square:Boolean,round:Boolean,rounded:Boolean,glossy:Boolean,size:String,fab:Boolean,fabMini:Boolean,padding:String,color:String,textColor:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,tabindex:[Number,String],ripple:{type:[Boolean,Object],default:!0},align:{...ze.align,default:"center"},stack:Boolean,stretch:Boolean,loading:{type:Boolean,default:null},disable:Boolean};function Ze(e){const t=se(e,He),a=Ke(e),{hasRouterLink:n,hasLink:s,linkTag:d,linkAttrs:i,navigateOnClick:l}=We({fallbackTag:"button"}),q=c(()=>{const v=e.fab===!1&&e.fabMini===!1?t.value:{};return e.padding!==void 0?Object.assign({},v,{padding:e.padding.split(/\s+/).map(x=>x in ne?ne[x]+"px":x).join(" "),minWidth:"0",minHeight:"0"}):v}),g=c(()=>e.rounded===!0||e.fab===!0||e.fabMini===!0),u=c(()=>e.disable!==!0&&e.loading!==!0),h=c(()=>u.value===!0?e.tabindex||0:-1),r=c(()=>ve(e,"standard")),y=c(()=>{const v={tabindex:h.value};return s.value===!0?Object.assign(v,i.value):Je.includes(e.type)===!0&&(v.type=e.type),d.value==="a"?(e.disable===!0?v["aria-disabled"]="true":v.href===void 0&&(v.role="button"),n.value!==!0&&Ue.test(e.type)===!0&&(v.type=e.type)):e.disable===!0&&(v.disabled="",v["aria-disabled"]="true"),e.loading===!0&&e.percentage!==void 0&&Object.assign(v,{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":e.percentage}),v}),m=c(()=>{let v;e.color!==void 0?e.flat===!0||e.outline===!0?v=`text-${e.textColor||e.color}`:v=`bg-${e.color} text-${e.textColor||"white"}`:e.textColor&&(v=`text-${e.textColor}`);const x=e.round===!0?"round":`rectangle${g.value===!0?" q-btn--rounded":e.square===!0?" q-btn--square":""}`;return`q-btn--${r.value} q-btn--${x}`+(v!==void 0?" "+v:"")+(u.value===!0?" q-btn--actionable q-focusable q-hoverable":e.disable===!0?" disabled":"")+(e.fab===!0?" q-btn--fab":e.fabMini===!0?" q-btn--fab-mini":"")+(e.noCaps===!0?" q-btn--no-uppercase":"")+(e.dense===!0?" q-btn--dense":"")+(e.stretch===!0?" no-border-radius self-stretch":"")+(e.glossy===!0?" glossy":"")+(e.square?" q-btn--square":"")}),k=c(()=>a.value+(e.stack===!0?" column":" row")+(e.noWrap===!0?" no-wrap text-no-wrap":"")+(e.loading===!0?" q-btn__content--hidden":""));return{classes:m,style:q,innerClasses:k,attributes:y,hasLink:s,linkTag:d,navigateOnClick:l,isActionable:u}}const{passiveCapture:$}=ke;let A=null,R=null,T=null;var st=W({name:"QBtn",props:{...Ge,percentage:Number,darkPercentage:Boolean,onTouchstart:[Function,Array]},emits:["click","keydown","mousedown","keyup"],setup(e,{slots:t,emit:a}){const{proxy:n}=Q(),{classes:s,style:d,innerClasses:i,attributes:l,hasLink:q,linkTag:g,navigateOnClick:u,isActionable:h}=Ze(e),r=H(null),y=H(null);let m=null,k,v=null;const x=c(()=>e.label!==void 0&&e.label!==null&&e.label!==""),O=c(()=>e.disable===!0||e.ripple===!1?!1:{keyCodes:q.value===!0?[13,32]:[13],...e.ripple===!0?{}:e.ripple}),S=c(()=>({center:e.round})),B=c(()=>{const o=Math.max(0,Math.min(100,e.percentage));return o>0?{transition:"transform 0.6s",transform:`translateX(${o-100}%)`}:{}}),f=c(()=>{if(e.loading===!0)return{onMousedown:M,onTouchstart:M,onClick:M,onKeydown:M,onKeyup:M};if(h.value===!0){const o={onClick:E,onKeydown:_,onMousedown:K};if(n.$q.platform.has.touch===!0){const b=e.onTouchstart!==void 0?"":"Passive";o[`onTouchstart${b}`]=C}return o}return{onClick:j}}),w=c(()=>({ref:r,class:"q-btn q-btn-item non-selectable no-outline "+s.value,style:d.value,...l.value,...f.value}));function E(o){if(r.value!==null){if(o!==void 0){if(o.defaultPrevented===!0)return;const b=document.activeElement;if(e.type==="submit"&&b!==document.body&&r.value.contains(b)===!1&&b.contains(r.value)===!1){r.value.focus();const N=()=>{document.removeEventListener("keydown",j,!0),document.removeEventListener("keyup",N,$),r.value!==null&&r.value.removeEventListener("blur",N,$)};document.addEventListener("keydown",j,!0),document.addEventListener("keyup",N,$),r.value.addEventListener("blur",N,$)}}u(o)}}function _(o){r.value!==null&&(a("keydown",o),I(o,[13,32])===!0&&R!==r.value&&(R!==null&&P(),o.defaultPrevented!==!0&&(r.value.focus(),R=r.value,r.value.classList.add("q-btn--active"),document.addEventListener("keyup",L,!0),r.value.addEventListener("blur",L,$)),j(o)))}function C(o){r.value!==null&&(a("touchstart",o),o.defaultPrevented!==!0&&(A!==r.value&&(A!==null&&P(),A=r.value,m=o.target,m.addEventListener("touchcancel",L,$),m.addEventListener("touchend",L,$)),k=!0,v!==null&&clearTimeout(v),v=setTimeout(()=>{v=null,k=!1},200)))}function K(o){r.value!==null&&(o.qSkipRipple=k===!0,a("mousedown",o),o.defaultPrevented!==!0&&T!==r.value&&(T!==null&&P(),T=r.value,r.value.classList.add("q-btn--active"),document.addEventListener("mouseup",L,$)))}function L(o){if(r.value!==null&&!(o!==void 0&&o.type==="blur"&&document.activeElement===r.value)){if(o!==void 0&&o.type==="keyup"){if(R===r.value&&I(o,[13,32])===!0){const b=new MouseEvent("click",o);b.qKeyEvent=!0,o.defaultPrevented===!0&&me(b),o.cancelBubble===!0&&oe(b),r.value.dispatchEvent(b),j(o),o.qKeyEvent=!0}a("keyup",o)}P()}}function P(o){const b=y.value;o!==!0&&(A===r.value||T===r.value)&&b!==null&&b!==document.activeElement&&(b.setAttribute("tabindex",-1),b.focus()),A===r.value&&(m!==null&&(m.removeEventListener("touchcancel",L,$),m.removeEventListener("touchend",L,$)),A=m=null),T===r.value&&(document.removeEventListener("mouseup",L,$),T=null),R===r.value&&(document.removeEventListener("keyup",L,!0),r.value!==null&&r.value.removeEventListener("blur",L,$),R=null),r.value!==null&&r.value.classList.remove("q-btn--active")}function M(o){j(o),o.qSkipRipple=!0}return ge(()=>{P(!0)}),Object.assign(n,{click:E}),()=>{let o=[];e.icon!==void 0&&o.push(p(G,{name:e.icon,left:e.stack===!1&&x.value===!0,role:"img","aria-hidden":"true"})),x.value===!0&&o.push(p("span",{class:"block"},[e.label])),o=z(t.default,o),e.iconRight!==void 0&&e.round===!1&&o.push(p(G,{name:e.iconRight,right:e.stack===!1&&x.value===!0,role:"img","aria-hidden":"true"}));const b=[p("span",{class:"q-focus-helper",ref:y})];return e.loading===!0&&e.percentage!==void 0&&b.push(p("span",{class:"q-btn__progress absolute-full overflow-hidden"+(e.darkPercentage===!0?" q-btn__progress--dark":"")},[p("span",{class:"q-btn__progress-indicator fit block",style:B.value})])),b.push(p("span",{class:"q-btn__content text-center col items-center q-anchor--skip "+i.value},o)),e.loading!==null&&b.push(p(he,{name:"q-transition--fade"},()=>e.loading===!0?[p("span",{key:"loading",class:"absolute-full flex flex-center"},t.loading!==void 0?t.loading():[p(Ae)])]:null)),le(p(g.value,w.value,b),[[Pe,O.value,void 0,S.value]])}}});export{$e as $,G,Ne as K,Re as O,Qe as Q,Ae as T,W as U,Xe as X,Ye as Z,We as a,se as b,at as c,Ge as d,et as e,rt as f,ne as g,ve as h,ot as i,Pe as j,st as l,nt as n,qe as q,lt as r,tt as t,re as u,z};
