import{S as t,i as e,s,e as l,t as r,k as a,c as n,a as c,g as i,d as o,n as d,b as f,f as h,D as u,h as p,F as g,j as m,m as v,o as $,x,u as E,v as b,w,O as A,r as y}from"../../chunks/vendor-0daa0b85.js";function H(t){let e,s,m,v,$,x,E,b,w,A,y,H;return{c(){e=l("div"),s=l("h5"),m=r("Featured Article"),v=a(),$=l("h3"),x=r(t[0]),E=a(),b=l("h4"),w=r(t[1]),A=a(),y=l("p"),H=r(t[2]),this.h()},l(l){e=n(l,"DIV",{class:!0});var r=c(e);s=n(r,"H5",{class:!0});var a=c(s);m=i(a,"Featured Article"),a.forEach(o),v=d(r),$=n(r,"H3",{class:!0});var f=c($);x=i(f,t[0]),f.forEach(o),E=d(r),b=n(r,"H4",{class:!0});var h=c(b);w=i(h,t[1]),h.forEach(o),A=d(r),y=n(r,"P",{class:!0});var u=c(y);H=i(u,t[2]),u.forEach(o),r.forEach(o),this.h()},h(){f(s,"class","text-sm text-indigo-600 font-bold"),f($,"class","font-cormorant text-2xl"),f(b,"class","text-lg text-gray-400 mb-2"),f(y,"class","text-lg"),f(e,"class","p-4 bg-light-400 mb-4 h-64 rounded-md shadow")},m(t,l){h(t,e,l),u(e,s),u(s,m),u(e,v),u(e,$),u($,x),u(e,E),u(e,b),u(b,w),u(e,A),u(e,y),u(y,H)},p(t,[e]){1&e&&p(x,t[0]),2&e&&p(w,t[1]),4&e&&p(H,t[2])},i:g,o:g,d(t){t&&o(e)}}}function I(t,e,s){let{title:l}=e,{date:r}=e,{description:a}=e;return t.$$set=t=>{"title"in t&&s(0,l=t.title),"date"in t&&s(1,r=t.date),"description"in t&&s(2,a=t.description)},[l,r,a]}class D extends t{constructor(t){super(),e(this,t,I,H,s,{title:0,date:1,description:2})}}function V(t){let e,s,m,v,$,x,E,b,w;return{c(){e=l("div"),s=l("h3"),m=r(t[0]),v=a(),$=l("h4"),x=r(t[1]),E=a(),b=l("p"),w=r(t[2]),this.h()},l(l){e=n(l,"DIV",{class:!0});var r=c(e);s=n(r,"H3",{class:!0});var a=c(s);m=i(a,t[0]),a.forEach(o),v=d(r),$=n(r,"H4",{class:!0});var f=c($);x=i(f,t[1]),f.forEach(o),E=d(r),b=n(r,"P",{class:!0});var h=c(b);w=i(h,t[2]),h.forEach(o),r.forEach(o),this.h()},h(){f(s,"class","font-cormorant text-2xl"),f($,"class","text-lg text-gray-400 mb-4"),f(b,"class","text-lg"),f(e,"class","h-56 p-4 bg-light-400 my-4 rounded-md shadow")},m(t,l){h(t,e,l),u(e,s),u(s,m),u(e,v),u(e,$),u($,x),u(e,E),u(e,b),u(b,w)},p(t,[e]){1&e&&p(m,t[0]),2&e&&p(x,t[1]),4&e&&p(w,t[2])},i:g,o:g,d(t){t&&o(e)}}}function j(t,e,s){let{title:l}=e,{date:r}=e,{description:a}=e;return t.$$set=t=>{"title"in t&&s(0,l=t.title),"date"in t&&s(1,r=t.date),"description"in t&&s(2,a=t.description)},[l,r,a]}class F extends t{constructor(t){super(),e(this,t,j,V,s,{title:0,date:1,description:2})}}function O(t,e,s){const l=t.slice();return l[2]=e[s],l}function S(t,e,s){const l=t.slice();return l[5]=e[s],l}function k(t){let e,s;return e=new D({props:{title:t[5].title,date:t[5].posted,description:t[5].description}}),{c(){m(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,l){$(e,t,l),s=!0},p(t,s){const l={};2&s&&(l.title=t[5].title),2&s&&(l.date=t[5].posted),2&s&&(l.description=t[5].description),e.$set(l)},i(t){s||(x(e.$$.fragment,t),s=!0)},o(t){E(e.$$.fragment,t),s=!1},d(t){b(e,t)}}}function B(t){let e,s,r,i,p;return s=new F({props:{title:t[2].title,date:t[2].posted,description:t[2].description}}),{c(){e=l("a"),m(s.$$.fragment),r=a(),this.h()},l(t){e=n(t,"A",{href:!0});var l=c(e);v(s.$$.fragment,l),r=d(l),l.forEach(o),this.h()},h(){f(e,"href",i="/articles/"+t[2].id)},m(t,l){h(t,e,l),$(s,e,null),u(e,r),p=!0},p(t,l){const r={};1&l&&(r.title=t[2].title),1&l&&(r.date=t[2].posted),1&l&&(r.description=t[2].description),s.$set(r),(!p||1&l&&i!==(i="/articles/"+t[2].id))&&f(e,"href",i)},i(t){p||(x(s.$$.fragment,t),p=!0)},o(t){E(s.$$.fragment,t),p=!1},d(t){t&&o(e),b(s)}}}function C(t){let e,s,p,g,m,v,$,b,H,I,D,V=t[1],j=[];for(let l=0;l<V.length;l+=1)j[l]=k(S(t,V,l));const F=t=>E(j[t],1,1,(()=>{j[t]=null}));let C=t[0],M=[];for(let l=0;l<C.length;l+=1)M[l]=B(O(t,C,l));const N=t=>E(M[t],1,1,(()=>{M[t]=null}));return{c(){e=l("div"),s=a(),p=l("section"),g=l("div");for(let t=0;t<j.length;t+=1)j[t].c();m=a(),v=l("section"),$=l("h2"),b=r("Most Recent Articles"),H=a(),I=l("div");for(let t=0;t<M.length;t+=1)M[t].c();this.h()},l(t){e=n(t,"DIV",{class:!0,id:!0}),c(e).forEach(o),s=d(t),p=n(t,"SECTION",{});var l=c(p);g=n(l,"DIV",{class:!0});var r=c(g);for(let e=0;e<j.length;e+=1)j[e].l(r);r.forEach(o),l.forEach(o),m=d(t),v=n(t,"SECTION",{class:!0});var a=c(v);$=n(a,"H2",{class:!0});var f=c($);b=i(f,"Most Recent Articles"),f.forEach(o),H=d(a),I=n(a,"DIV",{class:!0});var h=c(I);for(let e=0;e<M.length;e+=1)M[e].l(h);h.forEach(o),a.forEach(o),this.h()},h(){f(e,"class","w-full border rounded-lg mb-4 px-8 svelte-1t7ubnj"),f(e,"id","blogHeader"),f(g,"class","font-opencon grid overflow-hidden grid-cols-2 gap-x-12 w-full h-full my-4 px-8"),f($,"class","font-cormorant text-3xl italic my-8 ml-10"),f(I,"class","font-opencon grid overflow-hidden grid-cols-1 w-3/4 h-full my-4 px-8"),f(v,"class","mt-8")},m(t,l){h(t,e,l),h(t,s,l),h(t,p,l),u(p,g);for(let e=0;e<j.length;e+=1)j[e].m(g,null);h(t,m,l),h(t,v,l),u(v,$),u($,b),u(v,H),u(v,I);for(let e=0;e<M.length;e+=1)M[e].m(I,null);D=!0},p(t,[e]){if(2&e){let s;for(V=t[1],s=0;s<V.length;s+=1){const l=S(t,V,s);j[s]?(j[s].p(l,e),x(j[s],1)):(j[s]=k(l),j[s].c(),x(j[s],1),j[s].m(g,null))}for(y(),s=V.length;s<j.length;s+=1)F(s);w()}if(1&e){let s;for(C=t[0],s=0;s<C.length;s+=1){const l=O(t,C,s);M[s]?(M[s].p(l,e),x(M[s],1)):(M[s]=B(l),M[s].c(),x(M[s],1),M[s].m(I,null))}for(y(),s=C.length;s<M.length;s+=1)N(s);w()}},i(t){if(!D){for(let t=0;t<V.length;t+=1)x(j[t]);for(let t=0;t<C.length;t+=1)x(M[t]);D=!0}},o(t){j=j.filter(Boolean);for(let e=0;e<j.length;e+=1)E(j[e]);M=M.filter(Boolean);for(let e=0;e<M.length;e+=1)E(M[e]);D=!1},d(t){t&&o(e),t&&o(s),t&&o(p),A(j,t),t&&o(m),t&&o(v),A(M,t)}}}const M=async({fetch:t})=>{const e=await t("articles/getArticles"),s=await e.json();return console.log(s),{props:{articles:s}}};function N(t,e,s){let{articles:l}=e,{featuredArticles:r=l.filter((t=>!0===t.featured))}=e;return l=l.reverse(),t.$$set=t=>{"articles"in t&&s(0,l=t.articles),"featuredArticles"in t&&s(1,r=t.featuredArticles)},[l,r]}class P extends t{constructor(t){super(),e(this,t,N,C,s,{articles:0,featuredArticles:1})}}export{P as default,M as load};