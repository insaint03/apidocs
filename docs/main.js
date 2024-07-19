import{_ as P,c as w,w as t,n as A,g as F,r as o,o as u,a as e,b as d,m as f,d as L,e as O,u as j,f as M,h as q,i as D,j as z,F as U,k as B,t as T,l as H,p as I,q as Y,s as G}from"./assets/index-CxYLAciV.js";const J={name:"embedDialog",props:{modelValue:Boolean,location:String},methods:{dispose(){this.$emit("update:model-value",!1)},clipboard(){navigator.clipboard.writeText(this.html),window.confirm("copied!")&&this.dispose()},download(){const a=URL.createObjectURL(new Blob([this.html],{type:"text/plain"}));Object.assign(document.createElement("a"),{href:a,download:"apidocs.html"}).click(),this.dispose()}},computed:{html(){const a=this.locale||"en",l=this.title||"API Doc",k=window.location.origin,x=this.url,n=this.theme||"default",s="script";return`<!DOCTYPE html>
<html lang="${a}">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${l||"apidocs"}</title>
  <${s} type="module" crossorigin src="${k}/embed.js"></${s}>
  <link rel="stylesheet" crossorigin href="${k}/assets/index.css">
 </head>
 <body>
  <noscript>No Script: ${l}</noscript>
  <div id="apidoc" location="${x}" locale="${a}" theme="${n}"></div>
 </body>
</html>`}},watch:{location(){this.url=this.location?""+this.location:null}},data(){return{title:null,url:this.location,theme:"default",locale:"en"}}};function Q(a,l,k,x,n,s){const _=o("v-icon"),c=o("v-btn"),v=o("v-card-title"),m=o("v-text-field"),h=o("v-select"),C=o("v-form"),V=o("v-divider"),g=o("v-textarea"),b=o("v-card-text"),y=o("v-spacer"),$=o("v-card-actions"),S=o("v-card"),E=o("v-dialog");return u(),w(E,A(F(a.$props)),{default:t(()=>[e(S,{flat:""},{default:t(()=>[e(v,null,{default:t(()=>[e(c,{icon:"",flat:"",onClick:l[0]||(l[0]=p=>a.$emit("update:model-value",!1))},{default:t(()=>[e(_,null,{default:t(()=>[d("mdi-close")]),_:1})]),_:1}),d(" Embedding ")]),_:1}),e(b,null,{default:t(()=>[e(C,null,{default:t(()=>[e(m,f({modelValue:n.title,"onUpdate:modelValue":l[1]||(l[1]=p=>n.title=p),label:"HTML DOC title",hint:"title of the document"},a.$thx.field),null,16,["modelValue"]),e(m,f({modelValue:n.url,"onUpdate:modelValue":l[2]||(l[2]=p=>n.url=p),label:"location",hint:"data file location"},a.$thx.field),null,16,["modelValue"]),e(h,f({modelValue:n.theme,"onUpdate:modelValue":l[3]||(l[3]=p=>n.theme=p),label:"theme",placeholder:"default",disabled:""},a.$thx.field),null,16,["modelValue"]),e(h,f({modelValue:n.locale,"onUpdate:modelValue":l[4]||(l[4]=p=>n.locale=p),label:"locale",placeholder:"English",disabled:""},a.$thx.field),null,16,["modelValue"])]),_:1}),e(V,{onClick:s.clipboard},{default:t(()=>[e(_,null,{default:t(()=>[d("mdi-content-copy")]),_:1}),d(" click to copy ")]),_:1},8,["onClick"]),e(g,f({"model-value":s.html,readonly:""},a.$thx.field),null,16,["model-value"])]),_:1}),e($,null,{default:t(()=>[e(c,{text:"",flat:"",onClick:s.dispose},{default:t(()=>[d("Close")]),_:1},8,["onClick"]),e(y),e(c,{text:"",flat:"",onClick:s.download},{default:t(()=>[e(_,null,{default:t(()=>[d("mdi-download")]),_:1}),d(" Download ")]),_:1},8,["onClick"]),e(c,{text:"",flat:"",onClick:s.clipboard},{default:t(()=>[e(_,null,{default:t(()=>[d("mdi-content-copy")]),_:1}),d(" Copy ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},16)}const W=P(J,[["render",Q]]),X={name:"downloadDialog",methods:{dispose(){this.$emit("update:model-value",!1)},downloads(){this.download(this.get_filename(this.filename))},...L(j,["get_filename","download"])},computed:{...O(j,["location"])},watch:{location(){this.filename=this.get_filename(this.location)}},props:{modelValue:Boolean},data(){return{filename:null}}};function Z(a,l,k,x,n,s){const _=o("v-icon"),c=o("v-btn"),v=o("v-card-title"),m=o("v-text-field"),h=o("v-form"),C=o("v-card-text"),V=o("v-spacer"),g=o("v-card-actions"),b=o("v-card"),y=o("v-dialog");return u(),w(y,A(F(a.$props)),{default:t(()=>[e(b,{flat:""},{default:t(()=>[e(v,null,{default:t(()=>[e(c,{icon:"",flat:"",onClick:s.dispose},{default:t(()=>[e(_,null,{default:t(()=>[d("mdi-close")]),_:1})]),_:1},8,["onClick"]),d(" Download current ")]),_:1}),e(C,null,{default:t(()=>[e(h,null,{default:t(()=>[e(m,f({modelValue:n.filename,"onUpdate:modelValue":l[0]||(l[0]=$=>n.filename=$),onKeyup:M(s.downloads,["enter"]),label:"filename",hint:"data file name. (.json, .yaml) available"},a.$thx.field),null,16,["modelValue","onKeyup"])]),_:1})]),_:1}),e(g,null,{default:t(()=>[e(c,{text:"",flat:"",onClick:s.dispose},{default:t(()=>[d("Close")]),_:1},8,["onClick"]),e(V),e(c,{text:"",flat:"",onClick:s.downloads},{default:t(()=>[e(_,null,{default:t(()=>[d("mdi-download")]),_:1}),d(" Download ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},16)}const ee=P(X,[["render",Z]]),te={name:"appBar",components:{openDialog:q,embedDialog:W,downloadDialog:ee},methods:{async with_progress(a){this.progress=!0;try{return await a()}finally{this.progress=!1}},async clear(){return await this.with_progress(()=>this.clears())},open(a){window.open(a,"_blank")},move_mode(){this.$router.push(`/${this.other_mode}`)},...L(j,["clears","loads","caches","revoke","saves","recovers"])},computed:{mode(){return this.$router.currentRoute.value.name},viewer_mode(){return/^view$/i.test(this.mode)},other_mode(){return this.viewer_mode?"edit":"view"},mode_icon(){return this.viewer_mode?"mdi-pencil":"mdi-eye"},...O(j,["location"])},data(){return{progress:!0,import_dialog:!1,embed_dialog:!1,download_dialog:!1,menus:[{title:"file",items:[{title:"clear new",action:()=>{this.clears()}},{title:"open/import...",action:()=>{this.import_dialog=!0}},{title:"embedding...",action:()=>{this.embed_dialog=!0}},{title:"save/download...",action:()=>{this.download_dialog=!0}},{title:"export migration"},{title:"export as openapi spec"}]},{title:"view",items:[{title:"theme configure"},{title:"locale..."}]},{title:"go",items:[{title:"issues",action:()=>this.open("https://github.com/insaint03/apidocs/issues")},{title:"guide",action:null},{title:"specification",action:null},{title:"about"}]}],extension:!0,drawer:!1}}};function oe(a,l,k,x,n,s){const _=o("v-app-bar-nav-icon"),c=o("v-list-item"),v=o("v-list-group"),m=o("v-list"),h=o("v-menu"),C=o("v-toolbar-title"),V=o("v-spacer"),g=o("v-icon"),b=o("v-btn"),y=o("v-toolbar-items"),$=o("v-tab"),S=o("v-tabs"),E=o("v-app-bar"),p=o("open-dialog"),K=o("embed-dialog"),N=o("download-dialog");return u(),D(U,null,[e(E,{flat:"",absolute:"",color:"black",order:"1",extended:n.extension,progress:"","scroll-behavior":"hide"},z({default:t(()=>[e(h,null,{activator:t(({props:i})=>[e(_,A(F(i)),null,16)]),default:t(()=>[e(m,{density:"compact"},{default:t(()=>[(u(!0),D(U,null,B(n.menus,i=>(u(),w(v,{key:`appbar-menu.${i.title}`},{activator:t(({props:r})=>[e(c,f({ref_for:!0},r,{title:i.title,"append-icon":"mdi-chevron-right",onClick:l[0]||(l[0]=H(()=>{},["stop"]))}),null,16,["title"])]),default:t(()=>[(u(!0),D(U,null,B(i.items,r=>(u(),w(c,{key:`appbar-menu.${i.title}.${r.title}`},{default:t(()=>[e(c,{title:r.title,onClick:r.action,disabled:r.action==null},null,8,["title","onClick","disabled"])]),_:2},1024))),128))]),_:2},1024))),128))]),_:1})]),_:1}),e(C,null,{default:t(()=>[d("apiDocs")]),_:1}),e(V),e(y,null,{default:t(()=>[e(b,{icon:"",onClick:l[1]||(l[1]=i=>n.download_dialog=!0),title:"download"},{default:t(()=>[e(g,null,{default:t(()=>[d("mdi-download")]),_:1})]),_:1}),e(b,{icon:"",onClick:s.move_mode,title:`go ${s.other_mode}`},{default:t(()=>[e(g,null,{default:t(()=>[d(T(s.mode_icon),1)]),_:1})]),_:1},8,["onClick","title"]),e(b,{icon:"",onClick:l[2]||(l[2]=i=>n.extension=!n.extension)},{default:t(()=>[e(g,null,{default:t(()=>[d(T(n.extension?"mdi-chevron-up":"mdi-chevron-down"),1)]),_:1})]),_:1})]),_:1})]),_:2},[n.extension?{name:"extension",fn:t(()=>[e(S,null,{default:t(()=>[(u(!0),D(U,null,B(n.menus,i=>(u(),w(h,{key:`app-ext-menu.${i.title}`},{activator:t(({props:r})=>[e($,f({ref_for:!0},r,{activate:!1}),{default:t(()=>[d(T(i.title),1)]),_:2},1040)]),default:t(()=>[e(m,{density:"compact"},{default:t(()=>[(u(!0),D(U,null,B(i.items,r=>(u(),w(c,{key:`app-ext-menu.${i.title}.${r.title}`},{default:t(()=>[e(c,{title:r.title,onClick:r.action,disabled:r.action==null},null,8,["title","onClick","disabled"])]),_:2},1024))),128))]),_:2},1024)]),_:2},1024))),128))]),_:1})]),key:"0"}:void 0]),1032,["extended"]),e(p,{modelValue:n.import_dialog,"onUpdate:modelValue":l[3]||(l[3]=i=>n.import_dialog=i)},null,8,["modelValue"]),e(K,{modelValue:n.embed_dialog,"onUpdate:modelValue":l[4]||(l[4]=i=>n.embed_dialog=i),location:a.location},null,8,["modelValue","location"]),e(N,{modelValue:n.download_dialog,"onUpdate:modelValue":l[5]||(l[5]=i=>n.download_dialog=i)},null,8,["modelValue"])],64)}const le=P(te,[["render",oe]]),ne={components:{appBar:le,appFooter:I},data(){return{}}};function ae(a,l,k,x,n,s){const _=o("app-bar"),c=o("router-view"),v=o("app-footer"),m=o("v-app");return u(),w(m,null,{default:t(()=>[e(_),e(c),e(v)]),_:1})}const ie=P(ne,[["render",ae]]),R=Y(ie);G.register(R);R.mount("#app");
