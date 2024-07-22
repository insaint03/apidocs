import{_ as S,c as w,w as t,n as A,g as F,r as o,o as u,a as e,b as i,m as f,d as L,e as O,u as P,f as M,h as q,i as D,j as z,F as U,k as B,t as j,l as H,p as I,q as Y,s as G}from"./assets/index-CbpJEMsz.js";const J={name:"embedDialog",props:{modelValue:Boolean,location:String},methods:{dispose(){this.$emit("update:model-value",!1)},clipboard(){navigator.clipboard.writeText(this.html),window.confirm("copied!")&&this.dispose()},download(){const a=URL.createObjectURL(new Blob([this.html],{type:"text/plain"}));Object.assign(document.createElement("a"),{href:a,download:"apidocs.html"}).click(),this.dispose()}},computed:{html(){const a=this.locale||"en",l=this.title||"API Doc",k=window.location.origin,x=this.url,n=this.theme||"default",d="script";return`<!DOCTYPE html>
<html lang="${a}">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${l||"apidocs"}</title>
  <${d} type="module" crossorigin src="${k}/embed.js"></${d}>
  <link rel="stylesheet" crossorigin href="${k}/assets/index.css">
 </head>
 <body>
  <noscript>No Script: ${l}</noscript>
  <div id="apidoc" location="${x}" locale="${a}" theme="${n}"></div>
 </body>
</html>`}},watch:{location(){this.url=this.location?""+this.location:null}},data(){return{title:null,url:this.location,theme:"default",locale:"en"}}};function Q(a,l,k,x,n,d){const _=o("v-icon"),c=o("v-btn"),v=o("v-card-title"),p=o("v-text-field"),h=o("v-select"),C=o("v-form"),V=o("v-divider"),g=o("v-textarea"),b=o("v-card-text"),y=o("v-spacer"),$=o("v-card-actions"),E=o("v-card"),T=o("v-dialog");return u(),w(T,A(F(a.$props)),{default:t(()=>[e(E,{flat:""},{default:t(()=>[e(v,null,{default:t(()=>[e(c,{icon:"",flat:"",onClick:l[0]||(l[0]=m=>a.$emit("update:model-value",!1))},{default:t(()=>[e(_,null,{default:t(()=>[i("mdi-close")]),_:1})]),_:1}),i(" Embedding ")]),_:1}),e(b,null,{default:t(()=>[e(C,null,{default:t(()=>[e(p,f({modelValue:n.title,"onUpdate:modelValue":l[1]||(l[1]=m=>n.title=m),label:"HTML DOC title",hint:"title of the document"},a.$thx.field),null,16,["modelValue"]),e(p,f({modelValue:n.url,"onUpdate:modelValue":l[2]||(l[2]=m=>n.url=m),label:"location",hint:"data file location"},a.$thx.field),null,16,["modelValue"]),e(h,f({modelValue:n.theme,"onUpdate:modelValue":l[3]||(l[3]=m=>n.theme=m),label:"theme",placeholder:"default",disabled:""},a.$thx.field),null,16,["modelValue"]),e(h,f({modelValue:n.locale,"onUpdate:modelValue":l[4]||(l[4]=m=>n.locale=m),label:"locale",placeholder:"English",disabled:""},a.$thx.field),null,16,["modelValue"])]),_:1}),e(V,{onClick:d.clipboard},{default:t(()=>[e(_,null,{default:t(()=>[i("mdi-content-copy")]),_:1}),i(" click to copy ")]),_:1},8,["onClick"]),e(g,f({"model-value":d.html,readonly:""},a.$thx.field),null,16,["model-value"])]),_:1}),e($,null,{default:t(()=>[e(c,{text:"",flat:"",onClick:d.dispose},{default:t(()=>[i("Close")]),_:1},8,["onClick"]),e(y),e(c,{text:"",flat:"",onClick:d.download},{default:t(()=>[e(_,null,{default:t(()=>[i("mdi-download")]),_:1}),i(" Download ")]),_:1},8,["onClick"]),e(c,{text:"",flat:"",onClick:d.clipboard},{default:t(()=>[e(_,null,{default:t(()=>[i("mdi-content-copy")]),_:1}),i(" Copy ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},16)}const W=S(J,[["render",Q]]),X={name:"downloadDialog",methods:{dispose(){this.$emit("update:model-value",!1)},downloads(){this.download(this.get_filename(this.filename))},...L(P,["get_filename","download"])},computed:{...O(P,["location"])},watch:{location(){this.filename=this.get_filename(this.location)}},props:{modelValue:Boolean},data(){return{filename:null}}};function Z(a,l,k,x,n,d){const _=o("v-icon"),c=o("v-btn"),v=o("v-card-title"),p=o("v-text-field"),h=o("v-form"),C=o("v-card-text"),V=o("v-spacer"),g=o("v-card-actions"),b=o("v-card"),y=o("v-dialog");return u(),w(y,A(F(a.$props)),{default:t(()=>[e(b,{flat:""},{default:t(()=>[e(v,null,{default:t(()=>[e(c,{icon:"",flat:"",onClick:d.dispose},{default:t(()=>[e(_,null,{default:t(()=>[i("mdi-close")]),_:1})]),_:1},8,["onClick"]),i(" Download current ")]),_:1}),e(C,null,{default:t(()=>[e(h,null,{default:t(()=>[e(p,f({modelValue:n.filename,"onUpdate:modelValue":l[0]||(l[0]=$=>n.filename=$),onKeyup:M(d.downloads,["enter"]),label:"filename",hint:"data file name. (.json, .yaml) available"},a.$thx.field),null,16,["modelValue","onKeyup"])]),_:1})]),_:1}),e(g,null,{default:t(()=>[e(c,{text:"",flat:"",onClick:d.dispose},{default:t(()=>[i("Close")]),_:1},8,["onClick"]),e(V),e(c,{text:"",flat:"",onClick:d.downloads},{default:t(()=>[e(_,null,{default:t(()=>[i("mdi-download")]),_:1}),i(" Download ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},16)}const ee=S(X,[["render",Z]]),te={name:"appBar",components:{openDialog:q,embedDialog:W,downloadDialog:ee},methods:{async with_progress(a){this.progress=!0;try{return await a()}finally{this.progress=!1}},async clear(){return await this.with_progress(()=>this.clears())},open(a){window.open(a,"_blank")},move_mode(){this.$router.push(`/${this.other_mode}`)},...L(P,["clears","loads","caches","revoke","saves","recovers"])},computed:{mode(){return this.$router.currentRoute.value.name},viewer_mode(){return/^view$/i.test(this.mode)},other_mode(){return this.viewer_mode?"edit":"view"},mode_icon(){return this.viewer_mode?"mdi-pencil":"mdi-eye"},...O(P,["location"])},data(){return{progress:!0,import_dialog:!1,embed_dialog:!1,download_dialog:!1,menus:[{title:"file",items:[{title:"clear new",action:()=>{this.clears()}},{title:"open/import...",action:()=>{this.import_dialog=!0}},{title:"embedding...",action:()=>{this.embed_dialog=!0}},{title:"save/download...",action:()=>{this.download_dialog=!0}},{title:"export migration"},{title:"export as openapi spec"}]},{title:"view",items:[{title:"theme configure"},{title:"locale..."}]},{title:"go",items:[{title:"issues",action:()=>this.open("https://github.com/insaint03/apidocs/issues")},{title:"guide",action:null},{title:"specification",action:null},{title:"about"}]}],extension:!0,drawer:!1}}};function oe(a,l,k,x,n,d){const _=o("v-app-bar-nav-icon"),c=o("v-list-item"),v=o("v-list-group"),p=o("v-list"),h=o("v-menu"),C=o("v-toolbar-title"),V=o("v-spacer"),g=o("v-icon"),b=o("v-btn"),y=o("v-toolbar-items"),$=o("v-tab"),E=o("v-tabs"),T=o("v-app-bar"),m=o("open-dialog"),K=o("embed-dialog"),N=o("download-dialog");return u(),D(U,null,[e(T,{flat:"",absolute:"",color:"black",order:"1",extended:n.extension,progress:"","scroll-behavior":"hide"},z({default:t(()=>[e(h,null,{activator:t(({props:s})=>[e(_,A(F(s)),null,16)]),default:t(()=>[e(p,{density:"compact"},{default:t(()=>[(u(!0),D(U,null,B(n.menus,s=>(u(),w(v,{key:`appbar-menu.${s.title}`},{activator:t(({props:r})=>[e(c,f({ref_for:!0},r,{title:s.title,"append-icon":"mdi-chevron-right",onClick:l[0]||(l[0]=H(()=>{},["stop"]))}),null,16,["title"])]),default:t(()=>[(u(!0),D(U,null,B(s.items,r=>(u(),w(c,{key:`appbar-menu.${s.title}.${r.title}`},{default:t(()=>[e(c,{title:r.title,onClick:r.action,disabled:r.action==null},null,8,["title","onClick","disabled"])]),_:2},1024))),128))]),_:2},1024))),128))]),_:1})]),_:1}),e(C,null,{default:t(()=>[i("apiDocs")]),_:1}),e(V),e(y,null,{default:t(()=>[e(b,{icon:"",onClick:l[1]||(l[1]=s=>n.download_dialog=!0),title:"download"},{default:t(()=>[e(g,null,{default:t(()=>[i("mdi-download")]),_:1})]),_:1}),e(b,{text:"",onClick:d.move_mode,title:`go ${d.other_mode}`},{default:t(()=>[i(j(d.mode)+"   ",1),e(g,null,{default:t(()=>[i(j(d.mode_icon),1)]),_:1})]),_:1},8,["onClick","title"]),e(b,{icon:"",onClick:l[2]||(l[2]=s=>n.extension=!n.extension)},{default:t(()=>[e(g,null,{default:t(()=>[i(j(n.extension?"mdi-chevron-up":"mdi-chevron-down"),1)]),_:1})]),_:1})]),_:1})]),_:2},[n.extension?{name:"extension",fn:t(()=>[e(E,null,{default:t(()=>[(u(!0),D(U,null,B(n.menus,s=>(u(),w(h,{key:`app-ext-menu.${s.title}`},{activator:t(({props:r})=>[e($,f({ref_for:!0},r,{activate:!1}),{default:t(()=>[i(j(s.title),1)]),_:2},1040)]),default:t(()=>[e(p,{density:"compact"},{default:t(()=>[(u(!0),D(U,null,B(s.items,r=>(u(),w(c,{key:`app-ext-menu.${s.title}.${r.title}`},{default:t(()=>[e(c,{title:r.title,onClick:r.action,disabled:r.action==null},null,8,["title","onClick","disabled"])]),_:2},1024))),128))]),_:2},1024)]),_:2},1024))),128))]),_:1})]),key:"0"}:void 0]),1032,["extended"]),e(m,{modelValue:n.import_dialog,"onUpdate:modelValue":l[3]||(l[3]=s=>n.import_dialog=s)},null,8,["modelValue"]),e(K,{modelValue:n.embed_dialog,"onUpdate:modelValue":l[4]||(l[4]=s=>n.embed_dialog=s),location:a.location},null,8,["modelValue","location"]),e(N,{modelValue:n.download_dialog,"onUpdate:modelValue":l[5]||(l[5]=s=>n.download_dialog=s)},null,8,["modelValue"])],64)}const le=S(te,[["render",oe]]),ne={components:{appBar:le,appFooter:I},data(){return{}}};function ae(a,l,k,x,n,d){const _=o("app-bar"),c=o("router-view"),v=o("app-footer"),p=o("v-app");return u(),w(p,null,{default:t(()=>[e(_),e(c),e(v)]),_:1})}const ie=S(ne,[["render",ae]]),R=Y(ie);G.register(R);R.mount("#app");
