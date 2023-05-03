import{c as U,t as be,w as G,x as ye,d as L,i as he,j as Se,Q as pe,k as ke,b as xe,f as we,R as Ce}from"./QBtn.848fac0e.js";import{a as X,b as ee,Q as _e,c as Pe,o as te,m as ne}from"./comment.6a834c84.js";import{ak as u,aj as M,av as Be,ap as C,at as ae,ar as le,bm as qe,aQ as ie,aY as f,aZ as x,b0 as g,ao as z,b6 as P,b1 as h,a_ as y,b2 as W,b8 as O,a$ as w,b3 as k,b5 as j,b9 as oe,b7 as se,ba as A,bn as Le}from"./index.ac0055ed.js";import{w as $e,x as Ve,q as F,s as Y,t as Z,y as Ie,v as Ne}from"./QEditor.844b00b3.js";function E(e,n){return[!0,!1].includes(e)?e:n}var ze=U({name:"QPagination",props:{...X,modelValue:{type:Number,required:!0},min:{type:[Number,String],default:1},max:{type:[Number,String],required:!0},maxPages:{type:[Number,String],default:0,validator:e=>(typeof e=="string"?parseInt(e,10):e)>=0},inputStyle:[Array,String,Object],inputClass:[Array,String,Object],size:String,disable:Boolean,input:Boolean,iconPrev:String,iconNext:String,iconFirst:String,iconLast:String,toFn:Function,boundaryLinks:{type:Boolean,default:null},boundaryNumbers:{type:Boolean,default:null},directionLinks:{type:Boolean,default:null},ellipses:{type:Boolean,default:null},ripple:{type:[Boolean,Object],default:null},round:Boolean,rounded:Boolean,flat:Boolean,outline:Boolean,unelevated:Boolean,push:Boolean,glossy:Boolean,color:{type:String,default:"primary"},textColor:String,activeDesign:{type:String,default:"",values:e=>e===""||be.includes(e)},activeColor:String,activeTextColor:String,gutter:String,padding:{type:String,default:"3px 2px"}},emits:["update:modelValue"],setup(e,{emit:n}){const{proxy:t}=ae(),{$q:i}=t,m=ee(e,i),o=u(()=>parseInt(e.min,10)),d=u(()=>parseInt(e.max,10)),v=u(()=>parseInt(e.maxPages,10)),c=u(()=>r.value+" / "+d.value),_=u(()=>E(e.boundaryLinks,e.input)),B=u(()=>E(e.boundaryNumbers,!e.input)),D=u(()=>E(e.directionLinks,e.input)),$=u(()=>E(e.ellipses,!e.input)),s=M(null),r=u({get:()=>e.modelValue,set:a=>{if(a=parseInt(a,10),e.disable||isNaN(a))return;const l=Pe(a,o.value,d.value);e.modelValue!==l&&n("update:modelValue",l)}});Be(()=>`${o.value}|${d.value}`,()=>{r.value=e.modelValue});const b=u(()=>"q-pagination row no-wrap items-center"+(e.disable===!0?" disabled":"")),T=u(()=>e.gutter in G?`${G[e.gutter]}px`:e.gutter||null),ue=u(()=>T.value!==null?`--q-pagination-gutter-parent:-${T.value};--q-pagination-gutter-child:${T.value}`:null),Q=u(()=>{const a=[e.iconFirst||i.iconSet.pagination.first,e.iconPrev||i.iconSet.pagination.prev,e.iconNext||i.iconSet.pagination.next,e.iconLast||i.iconSet.pagination.last];return i.lang.rtl===!0?a.reverse():a}),de=u(()=>({"aria-disabled":e.disable===!0?"true":"false",role:"navigation"})),R=u(()=>ye(e,"flat")),ce=u(()=>({[R.value]:!0,round:e.round,rounded:e.rounded,padding:e.padding,color:e.color,textColor:e.textColor,size:e.size,ripple:e.ripple!==null?e.ripple:!0})),me=u(()=>{const a={[R.value]:!1};return e.activeDesign!==""&&(a[e.activeDesign]=!0),a}),fe=u(()=>({...me.value,color:e.activeColor||e.color,textColor:e.activeTextColor||e.textColor})),V=u(()=>{let a=Math.max(v.value,1+($.value?2:0)+(B.value?2:0));const l={pgFrom:o.value,pgTo:d.value,ellipsesStart:!1,ellipsesEnd:!1,boundaryStart:!1,boundaryEnd:!1,marginalStyle:{minWidth:`${Math.max(2,String(d.value).length)}em`}};return v.value&&a<d.value-o.value+1&&(a=1+Math.floor(a/2)*2,l.pgFrom=Math.max(o.value,Math.min(d.value-a+1,e.modelValue-Math.floor(a/2))),l.pgTo=Math.min(d.value,l.pgFrom+a-1),B.value&&(l.boundaryStart=!0,l.pgFrom++),$.value&&l.pgFrom>o.value+(B.value?1:0)&&(l.ellipsesStart=!0,l.pgFrom++),B.value&&(l.boundaryEnd=!0,l.pgTo--),$.value&&l.pgTo<d.value-(B.value?1:0)&&(l.ellipsesEnd=!0,l.pgTo--)),l});function K(a){r.value=a}function ve(a){r.value=r.value+a}const ge=u(()=>{function a(){r.value=s.value,s.value=null}return{"onUpdate:modelValue":l=>{s.value=l},onKeyup:l=>{le(l,13)===!0&&a()},onBlur:a}});function p(a,l,I){const q={"aria-label":l,"aria-current":"false",...ce.value,...a};return I===!0&&Object.assign(q,{"aria-current":"true",...fe.value}),l!==void 0&&(e.toFn!==void 0?q.to=e.toFn(l):q.onClick=()=>{K(l)}),C(L,q)}return Object.assign(t,{set:K,setByOffset:ve}),()=>{const a=[],l=[];let I;if(_.value===!0&&(a.push(p({key:"bls",disable:e.disable||e.modelValue<=o.value,icon:Q.value[0]},o.value)),l.unshift(p({key:"ble",disable:e.disable||e.modelValue>=d.value,icon:Q.value[3]},d.value))),D.value===!0&&(a.push(p({key:"bdp",disable:e.disable||e.modelValue<=o.value,icon:Q.value[1]},e.modelValue-1)),l.unshift(p({key:"bdn",disable:e.disable||e.modelValue>=d.value,icon:Q.value[2]},e.modelValue+1))),e.input!==!0){I=[];const{pgFrom:q,pgTo:H,marginalStyle:N}=V.value;if(V.value.boundaryStart===!0){const S=o.value===e.modelValue;a.push(p({key:"bns",style:N,disable:e.disable,label:o.value},o.value,S))}if(V.value.boundaryEnd===!0){const S=d.value===e.modelValue;l.unshift(p({key:"bne",style:N,disable:e.disable,label:d.value},d.value,S))}V.value.ellipsesStart===!0&&a.push(p({key:"bes",style:N,disable:e.disable,label:"\u2026",ripple:!1},q-1)),V.value.ellipsesEnd===!0&&l.unshift(p({key:"bee",style:N,disable:e.disable,label:"\u2026",ripple:!1},H+1));for(let S=q;S<=H;S++)I.push(p({key:`bpg${S}`,style:N,disable:e.disable,label:S},S,S===e.modelValue))}return C("div",{class:b.value,...de.value},[C("div",{class:"q-pagination__content row no-wrap items-center",style:ue.value},[...a,e.input===!0?C(_e,{class:"inline",style:{width:`${c.value.length/1.5}em`},type:"number",dense:!0,value:s.value,disable:e.disable,dark:m.value,borderless:!0,inputClass:e.inputClass,inputStyle:e.inputStyle,placeholder:c.value,min:o.value,max:d.value,...ge.value}):C("div",{class:"q-pagination__middle row justify-center"},I),...l])])}}}),Me=U({name:"QAvatar",props:{...he,fontSize:String,color:String,textColor:String,icon:String,square:Boolean,rounded:Boolean},setup(e,{slots:n}){const t=Se(e),i=u(()=>"q-avatar"+(e.color?` bg-${e.color}`:"")+(e.textColor?` text-${e.textColor} q-chip--colored`:"")+(e.square===!0?" q-avatar--square":e.rounded===!0?" rounded-borders":"")),m=u(()=>e.fontSize?{fontSize:e.fontSize}:null);return()=>{const o=e.icon!==void 0?[C(pe,{name:e.icon})]:void 0;return C("div",{class:i.value,style:t.value},[C("div",{class:"q-avatar__content row flex-center overflow-hidden",style:m.value},ke(n.default,o))])}}}),De=U({name:"QList",props:{...X,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:n}){const t=ae(),i=ee(e,t.proxy.$q),m=u(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(i.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>C(e.tag,{class:m.value},xe(n.default))}});function J(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const n=parseInt(e,10);return isNaN(n)?0:n}var Qe=we({name:"close-popup",beforeMount(e,{value:n}){const t={depth:J(n),handler(i){t.depth!==0&&setTimeout(()=>{const m=$e(e);m!==void 0&&Ve(m,i,t.depth)})},handlerKey(i){le(i,13)===!0&&t.handler(i)}};e.__qclosepopup=t,e.addEventListener("click",t.handler),e.addEventListener("keyup",t.handlerKey)},updated(e,{value:n,oldValue:t}){n!==t&&(e.__qclosepopup.depth=J(n))},beforeUnmount(e){const n=e.__qclosepopup;e.removeEventListener("click",n.handler),e.removeEventListener("keyup",n.handlerKey),delete e.__qclosepopup}});const Fe={class:"generalLayer"},Ee={class:"paddLayer"},Oe={class:"row justify-between"},Te=["src"],je={class:"positionBranche"},Ae={key:1,class:"positionTitle"},Ue={class:"positionDescription"},Re=["innerHTML"],Ke={class:"row justify-end"},He={key:0,class:"bottomBar"},Ge={class:"positionInputButtonComments"},We={key:0},Ye={key:0},Ze={key:1,class:"positionInputButtonComments"},Je={__name:"LayerPostComment",props:{title:String,name:String,mail:String,password:String,date:String,description:String,pp_profile:String,id:Number,comment:Object,branche:String},setup(e){const n=te(),t=ne(),i=M(!1),m=M(!0),o=ie({description:""});function d(){i.value=!i.value}function v(){o.description=""}function c(s){t.filteroption=s,t.filteroptiontitle=s.slice(0,20),t.tab=""}function _(){t.filteroptiontype="branche"}function B(){t.filteroptiontype="name"}function D(s){n.followed.indexOf(s)>=0?n.followed.shift(s):n.followed.push(s)}function $(s,r){m.value=!1,s.description!==""&&(m.value=!0,t.addComment("comment",r,o,n.Profile.name,n.Profile.mail,n.Profile.password,n.pp_profile,"localStorage"))}return(s,r)=>(f(),x("div",Fe,[g("div",Ee,[g("div",Oe,[z((f(),P(Z,{clickable:"",onClick:r[0]||(r[0]=b=>{c(e.name),B()})},{default:h(()=>[y(F,{side:""},{default:h(()=>[y(Me,{rounded:"",size:"30px"},{default:h(()=>[g("img",{src:e.pp_profile},null,8,Te)]),_:1})]),_:1}),y(F,null,{default:h(()=>[y(Y,{class:"profilename"},{default:h(()=>[W(O(e.name),1)]),_:1})]),_:1})]),_:1})),[[Ce]]),e.title!==void 0&&w(n).Profile.name==e.name&&w(n).Profile.mail==e.mail&&w(n).Profile.password==e.password?(f(),P(F,{key:0,side:""},{default:h(()=>[y(Ie,{color:"secondary"},{default:h(()=>[y(De,null,{default:h(()=>[z((f(),P(Z,{clickable:"",onClick:r[1]||(r[1]=b=>w(t).deleteComment(e.id,"localStorage"))},{default:h(()=>[y(F,null,{default:h(()=>[y(Y,null,{default:h(()=>[W("Supprimer")]),_:1})]),_:1})]),_:1})),[[Qe]])]),_:1})]),_:1})]),_:1})):k("",!0)]),g("div",je,[e.title!==void 0?(f(),P(L,{key:0,class:"bg-primary",outline:"",color:"white",rounded:"",onClick:r[2]||(r[2]=b=>{c(e.branche),_()}),label:e.branche},null,8,["label"])):k("",!0),e.title!==void 0?(f(),x("h5",Ae,O(e.title),1)):k("",!0),g("div",Ue,[g("p",{innerHTML:e.description},null,8,Re)])]),g("div",Ke,O(e.date),1)]),e.title!==void 0?(f(),x("div",He,[y(L,{onClick:d,icon:"fa-regular fa-comment"}),w(n).followed.indexOf(e.id)<0?(f(),P(L,{key:0,onClick:r[3]||(r[3]=b=>D(e.id)),icon:"fa-regular fa-heart"})):k("",!0),w(n).followed.indexOf(e.id)>=0?(f(),P(L,{key:1,onClick:r[4]||(r[4]=b=>D(e.id)),icon:"fa-solid fa-heart"})):k("",!0),z(g("div",Ge,[y(Ne,{dark:"",modelValue:o.description,"onUpdate:modelValue":r[5]||(r[5]=b=>o.description=b),dense:s.$q.screen.lt.md,toolbar:[[{label:s.$q.lang.editor.align,icon:s.$q.iconSet.editor.align,fixedLabel:!0,list:"only-icons",options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["fullscreen"],[{label:s.$q.lang.editor.formatting,icon:s.$q.iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:s.$q.lang.editor.fontSize,icon:s.$q.iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:s.$q.lang.editor.defaultFont,icon:s.$q.iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]}],["quote","unordered","ordered","outdent","indent"],["undo","redo"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["modelValue","dense","toolbar"]),e.title!==void 0?(f(),x("div",We,[y(L,{class:"positionInputButtonComments",color:"primary",icon:"mail","icon-right":"send",label:"R\xE9pondre",onClick:r[6]||(r[6]=b=>{$(o,e.id),v()})}),m.value==!1?(f(),x("div",Ye,"Il n'y a pas de commentaire")):k("",!0)])):k("",!0),e.comment.length?(f(),x("div",Ze,[(f(!0),x(oe,null,se(e.comment,b=>(f(),P(re,A({key:b.id},b),null,16))),128))])):k("",!0)],512),[[j,i.value]])])):k("",!0)]))}};var re=qe(Je,[["__scopeId","data-v-3bb5ed5d"]]);const Xe={class:"row justify-center text-center align-center"},et={class:"test"},tt=g("h1",{class:"white-text"},"R\xE9cents",-1),nt=[tt],at={class:"test"},lt={class:"white-text"},ut={__name:"IndexPage",setup(e){const n=te(),t=ne();t.loadComments("localStorage"),n.profileload();const i=ie({index:Math.ceil(t.commentsList.length/5)}),m=M(),o=M(1);function d(v){t.filteroptiontype==null?(m.value=t.commentsList.slice((v-1)*5,v*5),i.index=Math.ceil(t.commentsList.length/5)):t.filteroptiontype=="branche"?(m.value=t.commentsList.filter(c=>c.branche==t.filteroption).slice((v-1)*5,v*5),i.index=Math.ceil(t.commentsList.filter(c=>c.branche==t.filteroption).length/5)):t.filteroptiontype=="name"?(m.value=t.commentsList.filter(c=>c.name==t.filteroption).slice((v-1)*5,v*5),i.index=Math.ceil(t.commentsList.filter(c=>c.name==t.filteroption).length/5)):t.filteroptiontype=="follow"&&(m.value=t.commentsList.filter(c=>n.followed.indexOf(c.id)>=0).slice((v-1)*5,v*5),i.index=1+Math.floor(t.commentsList.filter(c=>n.followed.indexOf(c.id)>=0).length/5))}return(v,c)=>(f(),x("div",null,[g("div",Xe,[z(g("div",et,nt,512),[[j,w(t).filteroptiontype===null]]),z(g("div",at,[g("h1",lt,O(w(t).filteroptiontitle),1)],512),[[j,w(t).filteroptiontype!==null]])]),g("div",null,[(f(!0),x(oe,null,se(m.value,_=>(f(),P(re,A({key:_.title},_),null,16))),128)),y(ze,A(Le(d(o.value)),{modelValue:o.value,"onUpdate:modelValue":c[0]||(c[0]=_=>o.value=_),max:i.index,"direction-links":"",flat:"",color:"grey","active-color":"primary"}),null,16,["modelValue","max"])])]))}};export{ut as default};
