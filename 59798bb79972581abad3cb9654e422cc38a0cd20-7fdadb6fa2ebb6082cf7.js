"use strict";(self.webpackChunkexample=self.webpackChunkexample||[]).push([[507],{93064:function(e,t,a){a.d(t,{u:function(){return g},Z:function(){return h}});var r=a(25773),i=a(64649),n=a(11026),s=a(27378),l=a(90382),o=a.n(l),d=a(39120),c=a(21185);function u(e){var t=e.className,a=e.direction,n=e.index,l=e.marginDirection,o=e.children,d=e.split,c=e.wrap,u=s.useContext(g),f=u.horizontalSize,p=u.verticalSize,m=u.latestIndex,h={};return u.supportFlexGap||("vertical"===a?n<m&&(h={marginBottom:f/(d?2:1)}):h=(0,r.Z)((0,r.Z)({},n<m&&(0,i.Z)({},l,f/(d?2:1))),c&&{paddingBottom:p})),null==o?null:s.createElement(s.Fragment,null,s.createElement("div",{className:t,style:h},o),n<m&&d&&s.createElement("span",{className:"".concat(t,"-split"),style:h},d))}var f=a(34740),p=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(a[r[i]]=e[r[i]])}return a},g=s.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),m={small:8,middle:16,large:24};var h=function(e){var t,a=s.useContext(c.E_),l=a.getPrefixCls,h=a.space,y=a.direction,b=e.size,v=void 0===b?(null==h?void 0:h.size)||"small":b,S=e.align,w=e.className,E=e.children,x=e.direction,z=void 0===x?"horizontal":x,L=e.prefixCls,I=e.split,O=e.style,R=e.wrap,C=void 0!==R&&R,V=p(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),k=(0,f.Z)(),H=s.useMemo((function(){return(Array.isArray(v)?v:[v,v]).map((function(e){return function(e){return"string"==typeof e?m[e]:e||0}(e)}))}),[v]),N=(0,n.Z)(H,2),P=N[0],T=N[1],j=(0,d.Z)(E,{keepEmpty:!0}),W=void 0===S&&"horizontal"===z?"center":S,Z=l("space",L),G=o()(Z,"".concat(Z,"-").concat(z),(t={},(0,i.Z)(t,"".concat(Z,"-rtl"),"rtl"===y),(0,i.Z)(t,"".concat(Z,"-align-").concat(W),W),t),w),M="".concat(Z,"-item"),q="rtl"===y?"marginLeft":"marginRight",F=0,B=j.map((function(e,t){return null!=e&&(F=t),s.createElement(u,{className:M,key:"".concat(M,"-").concat(t),direction:z,index:t,marginDirection:q,split:I,wrap:C},e)})),_=s.useMemo((function(){return{horizontalSize:P,verticalSize:T,latestIndex:F,supportFlexGap:k}}),[P,T,F,k]);if(0===j.length)return null;var A={};return C&&(A.flexWrap="wrap",k||(A.marginBottom=-T)),k&&(A.columnGap=P,A.rowGap=T),s.createElement("div",(0,r.Z)({className:G,style:(0,r.Z)((0,r.Z)({},A),O)},V),s.createElement(g.Provider,{value:_},B))}},99048:function(e,t,a){a(74805)},54622:function(e,t,a){var r=a(73203);t.Z=void 0;var i,n=r(a(77266)),s=r(a(25499)),l=r(a(22412)),o=r(a(73119)),d=r(a(27378)),c=r(a(23615)),u=["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"],f=function(e){var t=(0,o.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=x([].concat(t.fluid))),t.fixed&&(t.fixed=x([].concat(t.fixed))),t},p=function(e){var t=e.media;return!!t&&(v&&!!window.matchMedia(t).matches)},g=function(e){var t=e.fluid,a=e.fixed,r=m(t||a||[]);return r&&r.src},m=function(e){if(v&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(p);if(-1!==t)return e[t];var a=e.findIndex((function(e){return void 0===e.media}));if(-1!==a)return e[a]}return e[0]},h=Object.create({}),y=function(e){var t=f(e),a=g(t);return h[a]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,v="undefined"!=typeof window,S=v&&window.IntersectionObserver,w=new WeakMap;function E(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},r&&d.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:n}),a&&d.default.createElement("source",{media:i,srcSet:a,sizes:n}))}))}function x(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function z(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:r})}))}function L(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:r})}))}function I(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var O=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver((function(e){e.forEach((function(e){if(w.has(e.target)){var t=w.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),w.delete(e.target),t())}}))}),{rootMargin:"200px"})),i);return a&&(a.observe(e),w.set(e,t)),function(){a.unobserve(e),w.delete(e)}},R=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",o=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?I(e,!0):"")+I(e)})).join("")+"<img "+d+s+l+a+r+t+n+i+o+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},C=d.default.forwardRef((function(e,t){var a=e.src,r=e.imageVariants,i=e.generateSources,n=e.spreadProps,s=e.ariaHidden,l=d.default.createElement(V,(0,o.default)({ref:t,src:a},n,{ariaHidden:s}));return r.length>1?d.default.createElement("picture",null,i(r),l):l})),V=d.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,s=e.onLoad,c=e.onError,f=e.loading,p=e.draggable,g=e.ariaHidden,m=(0,l.default)(e,u);return d.default.createElement("img",(0,o.default)({"aria-hidden":g,sizes:a,srcSet:r,src:i},m,{onLoad:s,onError:c,ref:t,loading:f,draggable:p,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));V.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var k=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=v&&y(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!b&&S&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||v&&(b||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn,isHydrated:!1},a.imageRef=d.default.createRef(),a.placeholderRef=t.placeholderRef||d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)(a)),a.handleRef=a.handleRef.bind((0,n.default)(a)),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.setState({isHydrated:v}),this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:y(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=O(e,(function(){var e=y(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=f(e),(a=g(t))&&(h[a]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=f(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.imgStyle,l=void 0===s?{}:s,c=e.placeholderStyle,u=void 0===c?{}:c,p=e.placeholderClassName,g=e.fluid,h=e.fixed,y=e.backgroundColor,b=e.durationFadeIn,v=e.Tag,S=e.itemProp,w=e.loading,x=e.draggable,I=g||h;if(!I)return null;var O=!1===this.state.fadeIn||this.state.imgLoaded,k=!0===this.state.fadeIn&&!this.state.imgCached,H=(0,o.default)({opacity:O?1:0,transition:k?"opacity "+b+"ms":"none"},l),N="boolean"==typeof y?"lightgray":y,P={transitionDelay:b+"ms"},T=(0,o.default)({opacity:this.state.imgLoaded?0:1},k&&P,l,u),j={title:t,alt:this.state.isVisible?"":a,style:T,className:p,itemProp:S},W=this.state.isHydrated?m(I):I[0];if(g)return d.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden",maxWidth:W.maxWidth?W.maxWidth+"px":null,maxHeight:W.maxHeight?W.maxHeight+"px":null},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(W.srcSet)},d.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/W.aspectRatio+"%"}}),N&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:N,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},k&&P)}),W.base64&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:W.base64,spreadProps:j,imageVariants:I,generateSources:L}),W.tracedSVG&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:W.tracedSVG,spreadProps:j,imageVariants:I,generateSources:z}),this.state.isVisible&&d.default.createElement("picture",null,E(I),d.default.createElement(V,{alt:a,title:t,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:H,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:w,draggable:x})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:R((0,o.default)({alt:a,title:t,loading:w},W,{imageVariants:I}))}}));if(h){var Z=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:W.width,height:W.height},n);return"inherit"===n.display&&delete Z.display,d.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:Z,ref:this.handleRef,key:"fixed-"+JSON.stringify(W.srcSet)},N&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:N,width:W.width,opacity:this.state.imgLoaded?0:1,height:W.height},k&&P)}),W.base64&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:W.base64,spreadProps:j,imageVariants:I,generateSources:L}),W.tracedSVG&&d.default.createElement(C,{ariaHidden:!0,ref:this.placeholderRef,src:W.tracedSVG,spreadProps:j,imageVariants:I,generateSources:z}),this.state.isVisible&&d.default.createElement("picture",null,E(I),d.default.createElement(V,{alt:a,title:t,width:W.width,height:W.height,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:H,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:w,draggable:x})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:R((0,o.default)({alt:a,title:t,loading:w},W,{imageVariants:I}))}}))}return null},t}(d.default.Component);k.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var H=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),N=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string,maxWidth:c.default.number,maxHeight:c.default.number});function P(e){return function(t,a,r){var i;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+r+"`, but their values are both `undefined`.");c.default.checkPropTypes(((i={})[a]=e,i),t,"prop",r)}}k.propTypes={resolutions:H,sizes:N,fixed:P(c.default.oneOfType([H,c.default.arrayOf(H)])),fluid:P(c.default.oneOfType([N,c.default.arrayOf(N)])),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var T=k;t.Z=T}}]);
//# sourceMappingURL=59798bb79972581abad3cb9654e422cc38a0cd20-7fdadb6fa2ebb6082cf7.js.map