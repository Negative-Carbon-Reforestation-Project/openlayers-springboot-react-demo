(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{83:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},92:function(e,t,n){"use strict";n.r(t);var c=n(10),o=n.n(c),r=n(59),s=n.n(r),i=(n(83),n(43)),a=(n(84),new o.a.createContext),u=n(41),p=n(94),l=function(e,t){var n=Object(c.useRef)(),o=Object(c.useState)(null),r=Object(i.a)(o,2),s=r[0],a=r[1];return Object(c.useEffect)((function(){var c={view:new u.a({zoom:e,center:t}),layers:[],controls:[],overlays:[]},o=new p.a(c);return o.setTarget(n.current),a(o),function(){return o.setTarget(void 0)}}),[]),Object(c.useEffect)((function(){s&&s.getView().setZoom(e)}),[e]),Object(c.useEffect)((function(){s&&s.getView().setCenter(t)}),[t]),{mapRef:n,map:s}},j=(n(85),n(7)),d=function(e){var t=e.children,n=e.zoom,c=e.center,o=l(n,c),r=o.mapRef,s=o.map;return Object(j.jsx)(a.Provider,{value:{map:s},children:Object(j.jsx)("div",{ref:r,className:"ol-map",children:t})})},b=function(e){var t=e.children;return Object(j.jsx)("div",{children:t})},f=n(63),x=function(e){var t=e.source,n=e.zIndex,o=void 0===n?0:n,r=e.preload,s=void 0===r?0:r,i=e.opacity,u=void 0===i?1:i,p=Object(c.useContext)(a).map;return Object(c.useEffect)((function(){if(p){var e=new f.a({source:t,zIndex:o,preload:s,opacity:u});return p.addLayer(e),function(){p&&p.removeLayer(e)}}}),[p]),null},O=function(e){var t=e.children;return Object(j.jsx)("div",{children:t})},m=n(50),v=(n(87),n(88),function(){var e=Object(c.useContext)(a).map;return Object(c.useEffect)((function(){if(e){var t=new m.a({className:"ol-zoom",zoomInClassName:"control ol-zoom-in",zoomOutClassName:"control ol-zoom-out"});return e.controls.push(t),function(){return e.controls.remove(t)}}}),[e]),null}),h=n.p+"static/media/ncrp-logo-192x96.13b95eaf.webp",w=n.p+"static/media/ncrp-logo-205x103.92d85626.webp",g=n.p+"static/media/ncrp-logo-208x104.cf70d274.webp",y=n.p+"static/media/ncrp-logo-320x160.6c96ba48.webp",z=n.p+"static/media/ncrp-logo-600x300.b3f2289d.webp",C=(n(89),function(){return Object(j.jsxs)("picture",{children:[Object(j.jsx)("source",{type:"image/webp",media:"(orientation: landscape)",srcSet:"".concat(h," 192w"),sizes:"(max-width: 800px) 192w, (max-width: 900px) 192w"}),Object(j.jsx)("source",{type:"image/webp",media:"(orientation: portrait)",srcSet:"".concat(h," 192w, ").concat(w," 205w, ").concat(g," 208w, ").concat(y," 320w"),sizes:"(max-width: 600px) 205px, (min-width: 600px) 208px, (min-width: 992px) 320px"}),Object(j.jsx)("img",{src:z,className:"app-logo",alt:"app-logo"})]})}),E=(n(90),function(e){var t=e.children;return Object(j.jsx)("footer",{children:t})}),R=n(95),I=n(96),L=n(3),_=function(e){var t=e.children;return Object(j.jsx)("div",{children:t})},S=n(97),N=function(){var e=Object(c.useContext)(a).map,t=Object(c.useRef)(),n=Object(c.useRef)(),o=Object(c.useState)(Object(j.jsx)("div",{})),r=Object(i.a)(o,2),s=r[0],u=r[1];return Object(c.useEffect)((function(){if(e){var c=new S.a({element:t.current,autoPan:!0,autoPanAnimation:{duration:250}});return e.addOverlay(c),n.current.onclick=function(){return c.setPosition(void 0),n.current.blur(),!1},e.on("singleclick",(function(e){var t=e.coordinate,n=Object(L.k)(t);u(Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{children:"You clicked here:"}),Object(j.jsxs)("code",{children:["Long: ",n[0]]}),Object(j.jsx)("br",{}),Object(j.jsxs)("code",{children:["Lat: ",n[1]]})]})),c.setPosition(t)})),function(){e&&e.removeOverlay(c)}}}),[e]),{popupRef:t,popupCloseButtonRef:n,popupContent:s}},T=(n(91),function(){var e=N(),t=e.popupRef,n=e.popupCloseButtonRef,c=e.popupContent;return Object(j.jsxs)("div",{className:"ol-popup",ref:t,children:[Object(j.jsx)("a",{href:"#",className:"ol-popup__closeButton",ref:n}),Object(j.jsx)("div",{className:"ol-popup__content",children:c})]})}),P=function(){var e=Object(c.useState)([-122.29567670312974,47.41311574557329]),t=Object(i.a)(e,2),n=t[0],o=(t[1],Object(c.useState)(6)),r=Object(i.a)(o,2),s=r[0],a=(r[1],new R.a({url:"http://localhost:8080/geoserver/wms",params:{LAYERS:"ncrp:wa_slope",TILED:!0},serverType:"geoserver",transition:0})),u=new R.a({url:"http://localhost:8080/geoserver/wms",params:{LAYERS:"ncrp:wa_fire_history_low_dpi",TILED:!0},serverType:"geoserver",transition:0}),p=new R.a({url:"http://localhost:8080/geoserver/wms",params:{LAYERS:"ncrp:soil_classes",TILED:!0},serverType:"geoserver",transition:0});return Object(j.jsxs)("div",{children:[Object(j.jsx)(C,{}),Object(j.jsxs)(d,{center:Object(L.d)(n),zoom:s,children:[Object(j.jsxs)(b,{children:[Object(j.jsx)(x,{source:new I.a,zIndex:0,preload:1/0}),Object(j.jsx)(x,{source:a,zIndex:1,opacity:.6}),Object(j.jsx)(x,{source:u,zIndex:2,opacity:.3}),Object(j.jsx)(x,{source:p,zIndex:3})]}),Object(j.jsx)(_,{children:Object(j.jsx)(T,{})}),Object(j.jsx)(O,{children:Object(j.jsx)(v,{})})]}),Object(j.jsx)(E,{children:Object(j.jsx)("p",{className:"footer__copyright-info",children:"\xa9 NCRP Contributors"})})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,98)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),o(e),r(e),s(e)}))};s.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(P,{})}),document.getElementById("root")),k()}},[[92,1,2]]]);
//# sourceMappingURL=main.d926732e.chunk.js.map