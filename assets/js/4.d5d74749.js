(window.webpackJsonp=window.webpackJsonp||[]).push([[4],[,,,,,,,,,,,,,,function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},,function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},,function(t,e,i){},,,,,,,function(t,e,i){"use strict";var s=i(14);i.n(s).a},function(t,e,i){"use strict";var s=i(15);i.n(s).a},function(t,e,i){"use strict";var s=i(16);i.n(s).a},function(t,e,i){"use strict";var s=i(17);i.n(s).a},,function(t,e,i){"use strict";var s=i(19);i.n(s).a},function(t,e,i){"use strict";var s=i(20);i.n(s).a},function(t,e,i){"use strict";var s=i(21);i.n(s).a},function(t,e,i){"use strict";var s=i(22);i.n(s).a},function(t,e,i){"use strict";var s=i(23);i.n(s).a},function(t,e,i){"use strict";var s=i(24);i.n(s).a},function(t,e,i){"use strict";var s=i(25);i.n(s).a},function(t,e,i){"use strict";var s=i(26);i.n(s).a},function(t,e,i){"use strict";var s=i(27);i.n(s).a},,,function(t,e,i){"use strict";var s=i(28);i.n(s).a},,function(t,e,i){"use strict";var s=i(30);i.n(s).a},,,,,,,,,,function(t,e,i){"use strict";i.r(e);const s=/#.*$/,n=/\.(md|html)$/,a=/\/$/,r=/^(https?:|mailto:|tel:)/;function o(t){return decodeURI(t).replace(s,"").replace(n,"")}function l(t){return r.test(t)}function c(t){if(l(t))return t;const e=t.match(s),i=e?e[0]:"",n=o(t);return a.test(n)?t:n+".html"+i}function h(t,e){const i=t.hash,n=function(t){const e=t.match(s);if(e)return e[0]}(e);return(!n||i===n)&&o(t.path)===o(e)}function u(t,e,i){i&&(e=function(t,e,i){const s=t.charAt(0);if("/"===s)return t;if("?"===s||"#"===s)return e+t;const n=e.split("/");i&&n[n.length-1]||n.pop();const a=t.replace(/^\//,"").split("/");for(let t=0;t<a.length;t++){const e=a[t];".."===e?n.pop():"."!==e&&n.push(e)}""!==n[0]&&n.unshift("");return n.join("/")}(e,i));const s=o(e);for(let e=0;e<t.length;e++)if(o(t[e].regularPath)===s)return Object.assign({},t[e],{type:"page",path:c(t[e].path)});return console.error(`[vuepress] No matching page found for sidebar item "${e}"`),{}}function p(t,e,i,s){const{pages:n,themeConfig:a}=i,r=s&&a.locales&&a.locales[s]||a;if("auto"===(t.frontmatter.sidebar||r.sidebar||a.sidebar))return function(t){const e=d(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,children:e.map(e=>({type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}))}]}(t);const o=r.sidebar||a.sidebar;if(o){const{base:t,config:i}=function(t,e){if(Array.isArray(e))return{base:"/",config:e};for(const s in e)if(0===(i=t,/(\.html|\/)$/.test(i)?i:i+"/").indexOf(s))return{base:s,config:e[s]};var i;return{}}(e,o);return i?i.map(e=>(function t(e,i,s,n){if("string"==typeof e)return u(i,e,s);if(Array.isArray(e))return Object.assign(u(i,e[0],s),{title:e[1]});{n&&console.error("[vuepress] Nested sidebar groups are not supported. Consider using navbar + categories instead.");const a=e.children||[];return{type:"group",title:e.title,children:a.map(e=>t(e,i,s,!0)),collapsable:!1!==e.collapsable}}})(e,n,t)):[]}return[]}function d(t){let e;return(t=t.map(t=>Object.assign({},t))).forEach(t=>{2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)}),t.filter(t=>2===t.level)}function m(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})}var f={props:{item:{required:!0}},computed:{link(){return c(this.item.link)},exact(){return this.$site.locales?Object.keys(this.$site.locales).some(t=>t===this.link):"/"===this.link}},methods:{isExternal:l,isMailto:function(t){return/^mailto:/.test(t)},isTel:function(t){return/^tel:/.test(t)}}},g=i(3),v=Object(g.a)(f,function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.isExternal(t.link)?i("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.isMailto(t.link)||t.isTel(t.link)?null:"_blank",rel:t.isMailto(t.link)||t.isTel(t.link)?null:"noopener noreferrer"}},[t._v("\n  "+t._s(t.item.text)+"\n  "),i("OutboundLink")],1):i("router-link",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact}},[t._v(t._s(t.item.text))])},[],!1,null,null,null).exports,b={props:["idVal","numStyle","eyeStyle"]},_=(i(37),Object(g.a)(b,function(){var t=this.$createElement,e=this._self._c||t;return this.$site.themeConfig.valineConfig?e("span",{staticClass:"leancloud-visitors",attrs:{id:this.idVal,"data-flag-title":"Your Article Title"}},[e("i",{staticClass:"icon-eye",style:this.eyeStyle}),this._v(" "),e("a",{staticClass:"leancloud-visitors-count",style:this.numStyle})]):this._e()},[],!1,null,"ea098484",null).exports),$={components:{NavLink:v,readNum:_},data:()=>({numStyle:{fontSize:".9rem",fontWeight:"normal",color:"#4e6e8e"},eyeStyle:{fontSize:".9rem",fontWeight:"normal",color:"#4e6e8e"},particle:{hidden:!0,color:"#3eaf7c"}}),methods:{color:()=>Math.random()>.5?"#3eaf7c":"#3eeeee"},mounted(){setTimeout(()=>{this.particle.hidden=!this.particle.hidden},0)},beforeDestroy(){},computed:{data(){return this.$page.frontmatter},path(){return this.$page.path},actionLink(){return{link:this.data.actionLink,text:this.data.actionText}}}},k=(i(38),Object(g.a)($,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("main",{staticClass:"home",attrs:{"aria-labelledby":"main-title"}},[i("header",{staticClass:"hero"},[t.data.heroImage?i("img",{attrs:{src:t.$withBase(t.data.heroImage),alt:"hero"}}):t._e(),t._v(" "),i("h1",{attrs:{id:"main-title"}},[t._v(t._s(t.data.heroText||t.$title||"Hello"))]),t._v(" "),i("p",{staticClass:"description"},[t._v("\n      "+t._s(t.data.tagline||t.$description||"Welcome to your VuePress site")+"\n    ")]),t._v(" "),t.data.actionText&&t.data.actionLink?i("p",{staticClass:"action"},[i("particle-effect-button",t._b({},"particle-effect-button",t.particle,!1),[i("NavLink",{staticClass:"action-button",attrs:{item:t.actionLink}})],1)],1):t._e()]),t._v(" "),t.data.features&&t.data.features.length?i("div",{staticClass:"features"},t._l(t.data.features,function(e,s){return i("div",{key:s,staticClass:"feature"},[i("h2",[t._v(t._s(e.title))]),t._v(" "),i("p",[t._v(t._s(e.details))])])}),0):t._e(),t._v(" "),i("Content",{staticClass:"custom"}),t._v(" "),t.data.footer?i("div",{staticClass:"footer"},[t._v("\n    "+t._s(t.data.footer)+"\n    "),i("readNum",{attrs:{idVal:t.path,numStyle:t.numStyle,eyeStyle:t.eyeStyle}})],1):t._e()],1)},[],!1,null,"0505f474",null).exports),C=(i(39),Object(g.a)({},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sidebar-button",on:{click:function(e){t.$emit("toggle-sidebar")}}},[i("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"}},[i("path",{attrs:{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"}})])])},[],!1,null,null,null).exports),w={props:["options"],mounted(){this.initialize(this.options,this.$lang)},methods:{initialize(t,e){Promise.all([Promise.all([i.e(0),i.e(3)]).then(i.t.bind(null,63,7)),Promise.all([i.e(0),i.e(3)]).then(i.t.bind(null,64,7))]).then(([i])=>{i=i.default;const{algoliaOptions:s={}}=t;i(Object.assign({},t,{inputSelector:"#algolia-search-input",algoliaOptions:Object.assign({facetFilters:[`lang:${e}`].concat(s.facetFilters||[])},s)}))})},update(t,e){this.$el.innerHTML='<input id="algolia-search-input" class="search-query">',this.initialize(t,e)}},watch:{$lang(t){this.update(this.options,t)},options(t){this.update(t,this.$lang)}}},x=(i(40),Object(g.a)(w,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("form",{staticClass:"algolia-search-wrapper search-box",attrs:{id:"search-form",role:"search"}},[e("input",{staticClass:"search-query",attrs:{id:"algolia-search-input"}})])}],!1,null,null,null).exports),y=i(61),S={name:"DropdownTransition",methods:{setHeight(t){t.style.height=t.scrollHeight+"px"},unsetHeight(t){t.style.height=""}}},L=(i(42),Object(g.a)(S,function(){var t=this.$createElement;return(this._self._c||t)("transition",{attrs:{name:"dropdown"},on:{enter:this.setHeight,"after-enter":this.unsetHeight,"before-leave":this.setHeight}},[this._t("default")],2)},[],!1,null,null,null).exports),T={components:{NavLink:v,DropdownTransition:L},data:()=>({open:!1}),props:{item:{required:!0}},methods:{toggle(){this.open=!this.open}}},O=(i(43),{components:{NavLink:v,DropdownLink:Object(g.a)(T,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dropdown-wrapper",class:{open:t.open}},[i("a",{staticClass:"dropdown-title",on:{click:t.toggle}},[i("span",{staticClass:"title"},[t._v(t._s(t.item.text))]),t._v(" "),i("span",{staticClass:"arrow",class:t.open?"down":"right"})]),t._v(" "),i("DropdownTransition",[i("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"nav-dropdown"},t._l(t.item.items,function(e,s){return i("li",{key:e.link||s,staticClass:"dropdown-item"},["links"===e.type?i("h4",[t._v(t._s(e.text))]):t._e(),t._v(" "),"links"===e.type?i("ul",{staticClass:"dropdown-subitem-wrapper"},t._l(e.items,function(t){return i("li",{key:t.link,staticClass:"dropdown-subitem"},[i("NavLink",{attrs:{item:t}})],1)}),0):i("NavLink",{attrs:{item:e}})],1)}),0)])],1)},[],!1,null,null,null).exports},computed:{userNav(){return this.$themeLocaleConfig.nav||this.$site.themeConfig.nav||[]},nav(){const{locales:t}=this.$site;if(t&&Object.keys(t).length>1){const e=this.$page.path,i=this.$router.options.routes,s=this.$site.themeConfig.locales||{},n={text:this.$themeLocaleConfig.selectText||"Languages",items:Object.keys(t).map(n=>{const a=t[n],r=s[n]&&s[n].label||a.lang;let o;return a.lang===this.$lang?o=e:(o=e.replace(this.$localeConfig.path,n),i.some(t=>t.path===o)||(o=n)),{text:r,link:o}})};return[...this.userNav,n]}return this.userNav},userLinks(){return(this.nav||[]).map(t=>Object.assign(m(t),{items:(t.items||[]).map(m)}))},repoLink(){const{repo:t}=this.$site.themeConfig;if(t)return/^https?:/.test(t)?t:`https://github.com/${t}`},repoLabel(){if(!this.repoLink)return;if(this.$site.themeConfig.repoLabel)return this.$site.themeConfig.repoLabel;const t=this.repoLink.match(/^https?:\/\/[^/]+/)[0],e=["GitHub","GitLab","Bitbucket"];for(let i=0;i<e.length;i++){const s=e[i];if(new RegExp(s,"i").test(t))return s}return"Source"}}}),N=(i(44),Object(g.a)(O,function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.userLinks.length||t.repoLink?i("nav",{staticClass:"nav-links"},[t._l(t.userLinks,function(t){return i("div",{key:t.link,staticClass:"nav-item"},["links"===t.type?i("DropdownLink",{attrs:{item:t}}):i("NavLink",{attrs:{item:t}})],1)}),t._v(" "),t.repoLink?i("a",{staticClass:"repo-link",attrs:{href:t.repoLink,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n    "+t._s(t.repoLabel)+"\n    "),i("OutboundLink")],1):t._e()],2):t._e()},[],!1,null,null,null).exports);function I(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var E={components:{SidebarButton:C,NavLinks:N,SearchBox:y.a,AlgoliaSearchBox:x},data:()=>({linksWrapMaxWidth:null}),mounted(){const t=parseInt(I(this.$el,"paddingLeft"))+parseInt(I(this.$el,"paddingRight")),e=()=>{document.documentElement.clientWidth<719?this.linksWrapMaxWidth=null:this.linksWrapMaxWidth=this.$el.offsetWidth-t-(this.$refs.siteName&&this.$refs.siteName.offsetWidth||0)};e(),window.addEventListener("resize",e,!1)},computed:{algolia(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}}},j=(i(45),Object(g.a)(E,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",{staticClass:"navbar"},[i("SidebarButton",{on:{"toggle-sidebar":function(e){t.$emit("toggle-sidebar")}}}),t._v(" "),i("router-link",{staticClass:"home-link",attrs:{to:t.$localePath}},[t.$site.themeConfig.logo?i("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e(),t._v(" "),t.$siteTitle?i("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.logo}},[t._v(t._s(t.$siteTitle))]):t._e()]),t._v(" "),i("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[t.isAlgoliaSearch?i("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search?i("SearchBox"):t._e(),t._v(" "),i("NavLinks",{staticClass:"can-hide"})],1)],1)},[],!1,null,null,null).exports),M={data:()=>({numStyle:{fontSize:".9rem",fontWeight:"normal",color:"#999"},eyeStyle:{fontSize:".9rem",fontWeight:"normal",color:"#999"}}),props:["pageInfo"],components:{readNum:_},methods:{}};i(46);function H(t,e,i){const s=[];e.forEach(t=>{"group"===t.type?s.push(...t.children||[]):s.push(t)});for(let e=0;e<s.length;e++){const n=s[e];if("page"===n.type&&n.path===decodeURIComponent(t.path))return s[e+i]}}var W={props:["sidebarItems"],components:{pageInfo:Object(g.a)(M,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pageInfo"},[t.pageInfo.frontmatter.author||t.$site.themeConfig.author||t.$site.title?i("i",{staticClass:"icon-author iconfont"},[i("span",[t._v(t._s(t.pageInfo.frontmatter.author||t.$site.themeConfig.author||t.$site.title))])]):t._e(),t._v(" "),t.pageInfo.frontmatter.date?i("i",{staticClass:"icon-time iconfont"},[i("span",[t._v(t._s(new Date(t.pageInfo.frontmatter.date).toLocaleDateString()))])]):t._e(),t._v(" "),i("readNum",{attrs:{idVal:t.pageInfo.path,numStyle:t.numStyle,eyeStyle:t.eyeStyle}})],1)},[],!1,null,"3a11415e",null).exports},computed:{lastUpdated(){return this.$page.lastUpdated},lastUpdatedText(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},prev(){const t=this.$page.frontmatter.prev;return!1===t?void 0:t?u(this.$site.pages,t,this.$route.path):(e=this.$page,i=this.sidebarItems,H(e,i,-1));var e,i},next(){const t=this.$page.frontmatter.next;return!1===t?void 0:t?u(this.$site.pages,t,this.$route.path):(e=this.$page,i=this.sidebarItems,H(e,i,1));var e,i},editLink(){if(!1===this.$page.frontmatter.editLink)return;const{repo:t,editLinks:e,docsDir:i="",docsBranch:s="master",docsRepo:n=t}=this.$site.themeConfig;let r=o(this.$page.path);return a.test(r)?r+="README.md":r+=".md",n&&e?this.createEditLink(t,n,i,s,r):void 0},editLinkText(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink(t,e,i,s,n){if(/bitbucket.org/.test(t)){return(r.test(e)?e:t).replace(a,"")+"/src"+`/${s}`+(i?"/"+i.replace(a,""):"")+n+`?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`}return(r.test(e)?e:`https://github.com/${e}`).replace(a,"")+`/edit/${s}`+(i?"/"+i.replace(a,""):"")+n}}},D=(i(47),Object(g.a)(W,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("main",{staticClass:"page"},[t._t("top"),t._v(" "),i("div",{staticClass:"page-none"}),t._v(" "),i("div",{staticClass:"page-title"},[i("h1",[t._v(t._s(t.$page.title))]),t._v(" "),i("hr"),t._v(" "),i("pageInfo",{attrs:{pageInfo:t.$page}})],1),t._v(" "),i("Content"),t._v(" "),i("footer",{staticClass:"page-edit"},[t.editLink?i("div",{staticClass:"edit-link"},[i("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),i("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?i("div",{staticClass:"last-updated"},[i("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+": ")]),t._v(" "),i("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()]),t._v(" "),t.prev||t.next?i("div",{staticClass:"page-nav"},[i("p",{staticClass:"inner"},[t.prev?i("span",{staticClass:"prev"},[t._v("\n        ←\n        "),t.prev?i("router-link",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v("\n          "+t._s(t.prev.title||t.prev.path)+"\n        ")]):t._e()],1):t._e(),t._v(" "),t.next?i("span",{staticClass:"next"},[t.next?i("router-link",{attrs:{to:t.next.path}},[t._v("\n          "+t._s(t.next.title||t.next.path)+"\n        ")]):t._e(),t._v("\n        →\n      ")],1):t._e()])]):t._e(),t._v(" "),t._t("bottom")],2)},[],!1,null,null,null).exports);function A(t,e,i,s){return t("router-link",{props:{to:e,activeClass:"",exactActiveClass:""},class:{active:s,"sidebar-link":!0}},i)}function P(t,e,i,s,n,a=1){return!e||a>n?null:t("ul",{class:"sidebar-sub-headers"},e.map(e=>{const r=h(s,i+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[A(t,i+"#"+e.slug,e.title,r),P(t,e.children,i,s,n,a+1)])}))}var z={functional:!0,props:["item"],render(t,{parent:{$page:e,$site:i,$route:n},props:{item:a}}){const r=h(n,a.path),o="auto"===a.type?r||a.children.some(t=>h(n,a.basePath+"#"+t.slug)):r,l=A(t,a.path,a.title||a.path,o),c=null!=e.frontmatter.sidebarDepth?e.frontmatter.sidebarDepth:i.themeConfig.sidebarDepth,u=null==c?1:c,p=!!i.themeConfig.displayAllHeaders;if("auto"===a.type)return[l,P(t,a.children,a.basePath,n,u)];if((o||p)&&a.headers&&!s.test(a.path)){return[l,P(t,d(a.headers),a.path,n,u)]}return l}},G=(i(48),Object(g.a)(z,void 0,void 0,!1,null,null,null).exports),U={name:"SidebarGroup",props:["item","first","open","collapsable"],components:{SidebarLink:G,DropdownTransition:L}};i(49);var V={components:{SidebarGroup:Object(g.a)(U,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"sidebar-group",class:{first:t.first,collapsable:t.collapsable}},[i("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){t.$emit("toggle")}}},[i("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?i("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),i("DropdownTransition",[t.open||!t.collapsable?i("ul",{ref:"items",staticClass:"sidebar-group-items"},t._l(t.item.children,function(t){return i("li",[i("SidebarLink",{attrs:{item:t}})],1)}),0):t._e()])],1)},[],!1,null,null,null).exports,SidebarLink:G,NavLinks:N},props:["items"],data:()=>({openGroupIndex:0}),created(){this.refreshIndex()},watch:{$route(){this.refreshIndex()}},methods:{refreshIndex(){const t=function(t,e){for(let i=0;i<e.length;i++){const s=e[i];if("group"===s.type&&s.children.some(e=>h(t,e.path)))return i}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive(t){return h(this.$route,t.regularPath)}}},B=(i(50),Object(g.a)(V,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("aside",{staticClass:"sidebar"},[i("NavLinks"),t._v(" "),t._t("top"),t._v(" "),t.items.length?i("ul",{staticClass:"sidebar-links"},t._l(t.items,function(e,s){return i("li",{key:s},["group"===e.type?i("SidebarGroup",{attrs:{item:e,first:0===s,open:s===t.openGroupIndex,collapsable:e.collapsable||e.collapsible},on:{toggle:function(e){t.toggleGroup(s)}}}):i("SidebarLink",{attrs:{item:e}})],1)}),0):t._e(),t._v(" "),t._t("bottom")],2)},[],!1,null,null,null).exports),R={name:"Valine",computed:{isComment(){const{isComment:t,home:e}=this.$page.frontmatter;return 0!=t&&!0!==e}},mounted:function(){const t=i(51);"undefined"!=typeof window&&(this.window=window,window.AV=i(52)),this.valine=new t,this.initValine()},watch:{$route(t,e){e.path!=t.path&&this.initValine()}},methods:{initValine(){let t=this.$route.path;document.getElementsByClassName("leancloud-visitors")[0].id=t,this.valine.init({el:"#vcomments",appId:"IRgwPiLrib3CsiwNuIquQUnX-gzGzoHsz",appKey:"7VqjT4lBkK1Ul9dtF4GKGMzA",notify:!1,verify:!1,path:t,visitor:!0,avatar:"mm",placeholder:"write here"})}}},q=Object(g.a)(R,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{directives:[{name:"show",rawName:"v-show",value:this.isComment,expression:"isComment"}],staticClass:"page"},[e("section",{staticClass:"page-edit"},[e("h3",{directives:[{name:"show",rawName:"v-show",value:this.isComment,expression:"isComment"}]},[e("a",{attrs:{href:"javascript:;"}}),this._v("\n      评 论：\n    ")]),this._v(" "),e("div",{attrs:{id:"vcomments"}})])])},[],!1,null,null,null).exports,K={name:"BackToTop",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},customStyle:{type:Object,default:function(){return{right:"1rem",bottom:"3rem",width:"2.5rem",height:"2.5rem","border-radius":".25rem","line-height":"2.5rem",backgroundColor:"rgba(231, 234, 241,.5)"}}},transitionName:{type:String,default:"fade"}},data:()=>({visible:!1,interval:null,isMoving:!1}),mounted(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)},methods:{handleScroll(){this.visible=window.pageYOffset>window.innerHeight},backToTop(){this.isMoving||(this.isMoving=!0,this.interval=setInterval(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"}),clearInterval(this.interval),this.isMoving=!1},16.7))}}},Y=(i(53),{components:{Home:k,Page:D,Sidebar:B,Navbar:j,Valine:q,toTop:Object(g.a)(K,function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:this.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"back-to-ceiling",style:this.customStyle,on:{click:this.backToTop}},[e("i",{staticClass:"iconfont icon-rocket"})])])},[],!1,null,"7efdea1b",null).exports},data:()=>({isSidebarOpen:!1}),computed:{shouldShowNavbar(){const{themeConfig:t}=this.$site,{frontmatter:e}=this.$page;return!1!==e.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar(){const{frontmatter:t}=this.$page;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems(){return p(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses(){const t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted(){this.$router.afterEach(()=>{this.isSidebarOpen=!1}),i.e(2).then(i.t.bind(null,62,7)).then(({default:t})=>{t()})},methods:{toggleSidebar(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen},onTouchStart(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd(t){const e=t.changedTouches[0].clientX-this.touchStart.x,i=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(i)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}}),F=(i(54),i(55),Object(g.a)(Y,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?i("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),i("div",{staticClass:"sidebar-mask",on:{click:function(e){t.toggleSidebar(!1)}}}),t._v(" "),i("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar}},[t._t("sidebar-top",null,{slot:"top"}),t._v(" "),t._t("sidebar-bottom",null,{slot:"bottom"})],2),t._v(" "),i("toTop"),t._v(" "),t.$page.frontmatter.home?i("Home"):i("Page",{attrs:{"sidebar-items":t.sidebarItems}},[t._t("page-top",null,{slot:"top"}),t._v(" "),t._t("page-bottom",null,{slot:"bottom"})],2),t._v(" "),i("Valine")],1)},[],!1,null,null,null));e.default=F.exports}],0,[2]]);