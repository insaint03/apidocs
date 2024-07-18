import{m as F,a as L,_ as j,u as $,b as z,c as x,w as t,r as o,o as u,d as e,e as i,f as T,g as H,n as K,h as N,i as w,j as I,k as U,l as Y,F as B,p as E,t as O,q as G,s as J,v as Q}from"./assets/index-B_M0UlJ5.js";const W={name:"openDialog",methods:{async load_current(){this.loading=!0;const a=this.file||this.search,l=await this.loads(a);this.$emit("load",l),this.loading=!1,this.$emit("update:modelValue",!1)},...F($,["loads"])},props:{modelValue:Boolean},computed:{items(){return[{location:this.search}].concat(this.recents).concat(this.examples).filter(a=>!a.disabled).map(a=>a.location).filter(a=>a&&0<a.trim().length).filter((a,l,f)=>f.indexOf(a)===l)},...L(z,{examples:"list"}),...L($,["recents"])},data(){return{value:this.modelValue,loading:!1,file:null,search:null}}},X=H("p",null,"Load the document",-1);function Z(a,l,f,C,n,s){const r=o("v-card-title"),d=o("v-card-subtitle"),h=o("v-card-item"),m=o("v-autocomplete"),g=o("v-btn"),V=o("v-form"),b=o("v-card-text"),k=o("v-card"),y=o("v-dialog");return u(),x(y,{modelValue:f.modelValue,"onUpdate:modelValue":l[2]||(l[2]=p=>a.$emit("update:modelValue",p))},{default:t(()=>[e(k,{loading:n.loading},{default:t(()=>[e(h,null,{default:t(()=>[e(r,null,{default:t(()=>[i("Need to load the document")]),_:1}),e(d,null,{default:t(()=>[i("Empty project")]),_:1})]),_:1}),e(b,null,{default:t(()=>[X,e(V,null,{default:t(()=>[e(m,{modelValue:n.file,"onUpdate:modelValue":l[0]||(l[0]=p=>n.file=p),search:n.search,"onUpdate:search":l[1]||(l[1]=p=>n.search=p),items:s.items,label:"File Location",variant:"underlined",autofocus:"",clearable:"","auto-select-first":"",onKey:T(s.load_current,["stop"])},null,8,["modelValue","search","items","onKey"]),e(g,{onClick:s.load_current,color:"primary"},{default:t(()=>[i("Load")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["loading"])]),_:1},8,["modelValue"])}const ee=j(W,[["render",Z]]),te={name:"embedDialog",props:{modelValue:Boolean,location:String},methods:{dispose(){this.$emit("update:model-value",!1)},clipboard(){navigator.clipboard.writeText(this.html),window.confirm("copied!")&&this.dispose()},download(){const a=URL.createObjectURL(new Blob([this.html],{type:"text/plain"}));Object.assign(document.createElement("a"),{href:a,download:"apidocs.html"}).click(),this.dispose()}},computed:{html(){const a=this.locale||"en",l=this.title||"API Doc",f=window.location.origin,C=this.url,n=this.theme||"default",s="script";return`<!DOCTYPE html>
<html lang="${a}">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${l||"apidocs"}</title>
  <${s} type="module" crossorigin src="${f}/embed.js"></${s}>
  <link rel="stylesheet" crossorigin href="${f}/assets/index.css">
 </head>
 <body>
  <noscript>No Script: ${l}</noscript>
  <div id="apidoc" location="${C}" locale="${a}" theme="${n}"></div>
 </body>
</html>`}},watch:{location(){this.url=this.location?""+this.location:null}},data(){return{title:null,url:this.location,theme:"default",locale:"en"}}};function oe(a,l,f,C,n,s){const r=o("v-icon"),d=o("v-btn"),h=o("v-card-title"),m=o("v-text-field"),g=o("v-select"),V=o("v-form"),b=o("v-divider"),k=o("v-textarea"),y=o("v-card-text"),p=o("v-spacer"),D=o("v-card-actions"),S=o("v-card"),P=o("v-dialog");return u(),x(P,K(N(a.$props)),{default:t(()=>[e(S,{flat:""},{default:t(()=>[e(h,null,{default:t(()=>[e(d,{icon:"",flat:"",onClick:l[0]||(l[0]=v=>a.$emit("update:model-value",!1))},{default:t(()=>[e(r,null,{default:t(()=>[i("mdi-close")]),_:1})]),_:1}),i(" Embedding ")]),_:1}),e(y,null,{default:t(()=>[e(V,null,{default:t(()=>[e(m,w({modelValue:n.title,"onUpdate:modelValue":l[1]||(l[1]=v=>n.title=v),label:"HTML DOC title",hint:"title of the document"},a.$thx.field),null,16,["modelValue"]),e(m,w({modelValue:n.url,"onUpdate:modelValue":l[2]||(l[2]=v=>n.url=v),label:"location",hint:"data file location"},a.$thx.field),null,16,["modelValue"]),e(g,w({modelValue:n.theme,"onUpdate:modelValue":l[3]||(l[3]=v=>n.theme=v),label:"theme",placeholder:"default",disabled:""},a.$thx.field),null,16,["modelValue"]),e(g,w({modelValue:n.locale,"onUpdate:modelValue":l[4]||(l[4]=v=>n.locale=v),label:"locale",placeholder:"English",disabled:""},a.$thx.field),null,16,["modelValue"])]),_:1}),e(b,{onClick:s.clipboard},{default:t(()=>[e(r,null,{default:t(()=>[i("mdi-content-copy")]),_:1}),i(" click to copy ")]),_:1},8,["onClick"]),e(k,w({"model-value":s.html,readonly:""},a.$thx.field),null,16,["model-value"])]),_:1}),e(D,null,{default:t(()=>[e(d,{text:"",flat:"",onClick:s.dispose},{default:t(()=>[i("Close")]),_:1},8,["onClick"]),e(p),e(d,{text:"",flat:"",onClick:s.download},{default:t(()=>[e(r,null,{default:t(()=>[i("mdi-download")]),_:1}),i(" Download ")]),_:1},8,["onClick"]),e(d,{text:"",flat:"",onClick:s.clipboard},{default:t(()=>[e(r,null,{default:t(()=>[i("mdi-content-copy")]),_:1}),i(" Copy ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},16)}const le=j(te,[["render",oe]]),ne={name:"downloadDialog",methods:{dispose(){this.$emit("update:model-value",!1)},downloads(){this.download(this.get_filename(this.filename))},...F($,["get_filename","download"])},computed:{...L($,["location"])},watch:{location(){this.filename=this.get_filename(this.location)}},props:{modelValue:Boolean},data(){return{filename:null}}};function ae(a,l,f,C,n,s){const r=o("v-icon"),d=o("v-btn"),h=o("v-card-title"),m=o("v-text-field"),g=o("v-form"),V=o("v-card-text"),b=o("v-spacer"),k=o("v-card-actions"),y=o("v-card"),p=o("v-dialog");return u(),x(p,K(N(a.$props)),{default:t(()=>[e(y,{flat:""},{default:t(()=>[e(h,null,{default:t(()=>[e(d,{icon:"",flat:"",onClick:s.dispose},{default:t(()=>[e(r,null,{default:t(()=>[i("mdi-close")]),_:1})]),_:1},8,["onClick"]),i(" Download current ")]),_:1}),e(V,null,{default:t(()=>[e(g,null,{default:t(()=>[e(m,w({modelValue:n.filename,"onUpdate:modelValue":l[0]||(l[0]=D=>n.filename=D),onKeyup:I(s.downloads,["enter"]),label:"filename",hint:"data file name. (.json, .yaml) available"},a.$thx.field),null,16,["modelValue","onKeyup"])]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(d,{text:"",flat:"",onClick:s.dispose},{default:t(()=>[i("Close")]),_:1},8,["onClick"]),e(b),e(d,{text:"",flat:"",onClick:s.downloads},{default:t(()=>[e(r,null,{default:t(()=>[i("mdi-download")]),_:1}),i(" Download ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},16)}const ie=j(ne,[["render",ae]]),se={name:"appBar",components:{openDialog:ee,embedDialog:le,downloadDialog:ie},methods:{async with_progress(a){this.progress=!0;try{return await a()}finally{this.progress=!1}},async clear(){return await this.with_progress(()=>this.clears())},...F($,["clears","loads","caches","revoke","saves","recovers"])},computed:{...L($,["location"])},data(){return{progress:!0,import_dialog:!1,embed_dialog:!1,download_dialog:!1,menus:[{title:"file",items:[{title:"clear new",action:()=>{this.clears()}},{title:"open/import...",action:()=>{this.import_dialog=!0}},{title:"embedding...",action:()=>{this.embed_dialog=!0}},{title:"save/download...",action:()=>{this.download_dialog=!0}},{title:"export migration"},{title:"export as openapi spec"}]},{title:"view",items:[{title:"theme configure"},{title:"locale..."}]},{title:"go",items:[{title:"edit",action:()=>{this.$router.push("/")}},{title:"view",action:()=>{this.$router.push("/view")}},{title:"guide",action:null},{title:"specification",action:null}]},{title:"info",items:[{title:"about apidocs"}]}],extension:!0,drawer:!1}}};function de(a,l,f,C,n,s){const r=o("v-app-bar-nav-icon"),d=o("v-list-item"),h=o("v-list-group"),m=o("v-list"),g=o("v-menu"),V=o("v-toolbar-title"),b=o("v-spacer"),k=o("v-icon"),y=o("v-btn"),p=o("v-toolbar-items"),D=o("v-tab"),S=o("v-tabs"),P=o("v-text-field"),v=o("v-app-bar"),R=o("open-dialog"),M=o("embed-dialog"),q=o("download-dialog");return u(),U(B,null,[e(v,{flat:"",absolute:"",color:"black",order:"1",extended:n.extension,progress:"","scroll-behavior":"hide"},Y({default:t(()=>[e(g,null,{activator:t(({props:c})=>[e(r,K(N(c)),null,16)]),default:t(()=>[e(m,{density:"compact"},{default:t(()=>[(u(!0),U(B,null,E(n.menus,c=>(u(),x(h,{key:`appbar-menu.${c.title}`},{activator:t(({props:_})=>[e(d,w({ref_for:!0},_,{title:c.title,"append-icon":"mdi-chevron-right",onClick:l[0]||(l[0]=T(()=>{},["stop"]))}),null,16,["title"])]),default:t(()=>[(u(!0),U(B,null,E(c.items,_=>(u(),x(d,{key:`appbar-menu.${c.title}.${_.title}`},{default:t(()=>[e(d,{title:_.title,onClick:_.action,disabled:_.action==null},null,8,["title","onClick","disabled"])]),_:2},1024))),128))]),_:2},1024))),128))]),_:1})]),_:1}),e(V,null,{default:t(()=>[i("apiDocs")]),_:1}),e(b),e(p,null,{default:t(()=>[e(y,{icon:"",onClick:l[1]||(l[1]=c=>n.extension=!n.extension)},{default:t(()=>[e(k,null,{default:t(()=>[i(O(n.extension?"mdi-chevron-up":"mdi-chevron-down"),1)]),_:1})]),_:1})]),_:1})]),_:2},[n.extension?{name:"extension",fn:t(()=>[e(S,null,{default:t(()=>[(u(!0),U(B,null,E(n.menus,c=>(u(),x(g,{key:`app-ext-menu.${c.title}`},{activator:t(({props:_})=>[e(D,w({ref_for:!0},_,{activate:!1}),{default:t(()=>[i(O(c.title),1)]),_:2},1040)]),default:t(()=>[e(m,{density:"compact"},{default:t(()=>[(u(!0),U(B,null,E(c.items,_=>(u(),x(d,{key:`app-ext-menu.${c.title}.${_.title}`},{default:t(()=>[e(d,{title:_.title,onClick:_.action,disabled:_.action==null},null,8,["title","onClick","disabled"])]),_:2},1024))),128))]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(b),e(P,{label:"search",density:"compact","hide-details":"","single-line":"","append-icon":"mdi-magnify",clearable:""})]),key:"0"}:void 0]),1032,["extended"]),e(R,{modelValue:n.import_dialog,"onUpdate:modelValue":l[2]||(l[2]=c=>n.import_dialog=c)},null,8,["modelValue"]),e(M,{modelValue:n.embed_dialog,"onUpdate:modelValue":l[3]||(l[3]=c=>n.embed_dialog=c),location:a.location},null,8,["modelValue","location"]),e(q,{modelValue:n.download_dialog,"onUpdate:modelValue":l[4]||(l[4]=c=>n.download_dialog=c)},null,8,["modelValue"])],64)}const ce=j(se,[["render",de]]),re={components:{appBar:ce,appFooter:G},data(){return{}}};function _e(a,l,f,C,n,s){const r=o("app-bar"),d=o("router-view"),h=o("app-footer"),m=o("v-app");return u(),x(m,null,{default:t(()=>[e(r),e(d),e(h)]),_:1})}const ue=j(re,[["render",_e]]),A=J(ue);Q.register(A);A.mount("#app");
