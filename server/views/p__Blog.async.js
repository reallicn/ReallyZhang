(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{SbR0:function(e,a,t){"use strict";t.r(a);t("14J3");var n,c=t("BMrR"),l=(t("7Kak"),t("9yH6")),r=(t("Pwec"),t("CtXQ")),s=(t("jCWc"),t("kPKH")),m=(t("+BJd"),t("mr32")),o=t("2Taf"),i=t.n(o),u=t("vZ4D"),d=t.n(u),E=t("l4Ni"),h=t.n(E),p=t("ujKo"),N=t.n(p),v=t("MhPg"),f=t.n(v),g=t("q1tI"),y=t.n(g),T=t("MuoO"),w=t("vMzm"),C=t.n(w),b=Object(T.connect)(function(e){return{carouselList:e.home.carouselList}})(n=function(e){function a(){var e,t;i()(this,a);for(var n=arguments.length,c=new Array(n),l=0;l<n;l++)c[l]=arguments[l];return(t=h()(this,(e=N()(a)).call.apply(e,[this].concat(c)))).state={carouselIndex:0},t.beforeCarouselChange=function(e,a){t.setState({carouselIndex:a})},t}return f()(a,e),d()(a,[{key:"componentDidMount",value:function(){(0,this.props.dispatch)({type:"home/getCarouselList",payload:{}})}},{key:"render",value:function(){var e=this.props.carouselList;e[this.state.carouselIndex];return y.a.createElement("div",{className:C.a.Home},y.a.createElement(c.a,{className:C.a.content},y.a.createElement(s.a,{span:17,className:C.a.left},y.a.createElement("div",{className:C.a.leftContent},e.map(function(e){return y.a.createElement("div",{className:C.a.artItem},y.a.createElement("div",{className:C.a.artInfo},y.a.createElement("h6",{className:C.a.artTitle},y.a.createElement("a",null,e.title)),y.a.createElement("p",{className:C.a.artShort},e.short),y.a.createElement("div",{className:C.a.author},"作者：",y.a.createElement("a",{className:C.a.name},e.author)),y.a.createElement("div",{className:C.a.tagTime},y.a.createElement("div",null,e.tags.map(function(e){return y.a.createElement(m.a,null,e)})),y.a.createElement("div",null,e.createTime))),y.a.createElement("div",{className:C.a.imgBorder},y.a.createElement("img",{src:e.img})))}))),y.a.createElement(s.a,{span:7,className:C.a.right},y.a.createElement("div",{className:C.a.rightContent},y.a.createElement("div",{className:C.a.hotArt},y.a.createElement("h6",{className:C.a.title},y.a.createElement(r.a,{style:{marginRight:6},type:"fire"}),"热点"),y.a.createElement(l.a.Group,{className:C.a.dateRadio,defaultValue:"a"},y.a.createElement(l.a.Button,{value:"a"},"7天"),y.a.createElement(l.a.Button,{value:"b"},"1个月"),y.a.createElement(l.a.Button,{value:"c"},"6个月")),e.map(function(e,a){return y.a.createElement("div",{className:C.a.hotItem},y.a.createElement("span",{className:C.a.num},a),y.a.createElement("a",{className:C.a.hotTitle},e.title))})),y.a.createElement("div",{className:C.a.hotTags},y.a.createElement("h6",{className:C.a.title},y.a.createElement(r.a,{style:{marginRight:6},type:"tags"}),"热门标签"),["css样式","HTMl","Node","React","js","Android","ios","css样式","HTMl","Node","React","js","Android","ios"].map(function(e,a){return y.a.createElement(m.a,{key:a,className:C.a.itemTag,color:"#".concat(a%10,"c").concat(a%10,"e").concat(a%10,"b")},e)}))))))}}]),a}(g.Component))||n;a.default=b}}]);