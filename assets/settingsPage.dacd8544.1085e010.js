import{l as i}from"./QBtn.91689020.1482a51a.js";import{y as g,p as h,e as w}from"./comment.e1f49a27.e2c62649.js";import{L as u,i as r,K as d,f as l,F as e,G as v,a1 as p}from"./index.ac0055ed.js";const b={class:"q-pa-md"},y={class:"flew row"},x={class:"column items-start textwhite"},k={class:"col"},E={class:"col"},V={class:"col topmargin"},C={class:"inputLink"},P={key:0,class:"textwhite"},S={key:1,class:"textwhite"},I={__name:"settingsPage",setup(L){const m=g(),n=h();n.profileload();const o=u(null),c=u("");function f(s){if(s){const a=new Image;a.src=s,a.onload=function(){n.changePpProfile(s),o.value=!0},a.onerror=function(){o.value=!1}}o.value=!1}return(s,a)=>(r(),d("div",b,[l("div",y,[l("div",x,[l("div",k,[e(i,{class:"bg-secondary width-section",label:"Profil"})]),l("div",E,[e(i,{onClick:a[0]||(a[0]=t=>v(m).resetComment("localStorage")),class:"bg-secondary width-section",label:"Supprimer les publications",to:"/"})]),l("div",V,[e(i,{onClick:a[1]||(a[1]=t=>v(n).logOut("localStorage")),class:"bg-secondary width-section",label:"Se d\xE9connecter",to:"/"})])]),l("div",C,[e(w,{class:"divInput",outlined:"",dark:"",modelValue:c.value,"onUpdate:modelValue":a[2]||(a[2]=t=>c.value=t),color:"white","text-color":"white","label-color":"white",label:"Nouveau lien de photo de profil"},null,8,["modelValue"]),e(i,{class:"btnEnvoyez",color:"primary",icon:"profi","icon-right":"send",label:"Envoyer",onClick:a[3]||(a[3]=t=>f(c.value))}),o.value==!0?(r(),d("div",P," Vous avez chang\xE9 votre photo d'\xE9cran ")):p("",!0),o.value==!1?(r(),d("div",S," Votre URL n'est pas valide ")):p("",!0)])])]))}};export{I as default};
