(self.webpackChunkexample=self.webpackChunkexample||[]).push([[222],{95389:function(e,t,n){"use strict";n.d(t,{E:function(){return r},Y:function(){return l}});var a=n(57691),r=(0,a.b)("success","processing","error","default","warning"),l=(0,a.b)("pink","red","yellow","orange","cyan","green","blue","purple","geekblue","magenta","volcano","gold","lime")},26574:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(18195),r=0,l={};function c(e){var t=r++,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return l[t]=(0,a.Z)((function r(){(n-=1)<=0?(e(),delete l[t]):l[t]=(0,a.Z)(r)})),t}c.cancel=function(e){void 0!==e&&(a.Z.cancel(l[e]),delete l[e])},c.ids=l},30043:function(e,t,n){"use strict";n(74805)},49694:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});n(50425);var a=n(86946),r=(n(37172),n(16348)),l=n(83981),c=n.n(l),u=n(54622),o=n(27378),s=n(68941),m=n(98730),i=n.n(m),d=n(80170),g=function(e){var t=e.data.node,n=e.tagsMap,l=t.frontmatter,m=l.title,g=l.excerpt,p=l.path,f=l.date,E=l.tags,h=l.cover,v=h?h.childImageSharp.fluid:null,Z=(0,s.$)(),y=i().resolvePageUrl(p),k=i().parseMarkDown(i().trimExcerpt(g),!0);return o.createElement(r.Z,{className:c()("postCard-module--postCard--+PorL","cursor-default"),bodyStyle:{padding:"0.8rem"},hoverable:!0,cover:o.createElement("div",null,o.createElement("a",{href:i().generateFullUrl(Z,y)},v?o.createElement(u.Z,{fluid:v}):o.createElement("div",{className:"postCard-module--postCardImg--aKHzI"})),o.createElement("span",{className:"postCard-module--dateHolder--u4JXf"},f?i().formatDate(f):""))},o.createElement(r.Z.Meta,{title:o.createElement("span",{className:"postCard-module--title--YyFMa"},o.createElement("a",{href:i().generateFullUrl(Z,y)},m)),style:{marginBottom:"1rem"}}),o.createElement(a.Z,{align:"middle",gutter:[0,8]},E?E.map((function(e){return n[e]?o.createElement(d.Z,{key:e,tag:n[e]}):null})):null),o.createElement("a",{href:i().generateFullUrl(Z,y)},o.createElement("p",{style:{marginTop:"1rem"},dangerouslySetInnerHTML:{__html:k}})))}},97277:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});n(11630);var a=n(68547),r=(n(50425),n(86946)),l=(n(54924),n(10187)),c=n(83864),u=n.n(c),o=n(25389),s=n.n(o),m=n(69238),i=n.n(m),d=n(27378),g=n(71046),p=n(34514),f=n(49694),E=n(97432),h=n(50798),v=n(98730),Z=n.n(v),y=function(e){var t=e.data,n=e.pageContext.tag,c=t.allMdx.edges,o=i()(c,(function(e){return"posts"===e.node.fields.slug.type})),m=i()(c,(function(e){return"project"===e.node.fields.slug.type})),v=t.allTag?t.allTag.edges:[],y=s()(u()(v,(function(e){return e.node.name})),"node"),k=y[n],x=k?k.path:"#",C=k?k.description:"";return d.createElement(a.Z,{className:"outerPadding"},d.createElement(a.Z,{className:"container"},d.createElement(g.Z,null),d.createElement(h.Z,{title:n,description:"All post about "+n+". "+C+" ",path:Z().resolvePageUrl(x,k),keywords:[n]}),d.createElement(p.Z,null,d.createElement("div",{className:"marginTopTitle tags-module--tagsList--WkGoD"},d.createElement("h1",{className:"titleSeparate"},"#",n),d.createElement("h4",{className:"textCenter"},C)),m.length>0?d.createElement(d.Fragment,null,d.createElement("h2",null,"Project"),d.createElement(r.Z,{gutter:[20,20]},m.map((function(e,t){return d.createElement(l.Z,{key:t,xs:24,sm:24,md:24,lg:24},d.createElement(E.Z,{data:e,tagsMap:y}))}))),","):null,o.length>0?d.createElement(d.Fragment,null,d.createElement("h2",null,"Posts"),d.createElement(r.Z,{gutter:[20,20]},o.map((function(e,t){return d.createElement(l.Z,{key:t,xs:24,sm:24,md:12,lg:8},d.createElement(f.Z,{data:e,tagsMap:y}))}))),","):null)))}},98129:function(e,t,n){var a=n(52033);e.exports=function(e,t){var n=[];return a(e,(function(e,a,r){t(e,a,r)&&n.push(e)})),n}},69238:function(e,t,n){var a=n(10263),r=n(98129),l=n(89278),c=n(19785);e.exports=function(e,t){return(c(e)?a:r)(e,l(t,3))}}}]);
//# sourceMappingURL=component---gatsby-theme-academic-src-templates-tags-index-jsx-f8b467a4379af1df3260.js.map