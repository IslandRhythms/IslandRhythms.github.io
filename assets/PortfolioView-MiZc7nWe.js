import{_ as m,o,c as s,a as e,F as r,r as u,t as a,b as l,d as g,e as h}from"./index-DYli7XXr.js";const y={data(){return{example:{title:"",description:"",link:""},game:[{title:"The Grim Shredder",description:"A game I created using unity during my introduction to game programming class.",link:"https://github.com/IslandRhythms/CSC329",location:"Github Repo"},{title:"XCOM 2 Modding",description:`A collection of mods I have made to enhace the QOL while playing XCOM 2. Very challenging as documentation for how to mod this game is very poor.
          Every item shown in the steam list has a github repo on my profile`,link:"https://steamcommunity.com/profiles/76561198216752133/myworkshopfiles/",location:"Steam"}]}}},f={class:"accordion",id:"game"},_=["id"],v=["data-bs-target","aria-controls"],k=["id","aria-labelledby"],w={class:"accordion-body"},$=["href"],R={key:0};function x(d,i,c,p,n,b){return o(),s("div",null,[i[2]||(i[2]=e("h2",null,"Game Development",-1)),e("div",f,[(o(!0),s(r,null,u(n.game,t=>(o(),s("div",{class:"accordion-item",key:t.title},[e("h2",{class:"accordion-header",id:t.title},[e("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":`#${t.link}`,"aria-expanded":"false","aria-controls":t.link},a(t.title),9,v)],8,_),e("div",{id:t.link,class:"accordion-collapse collapse","aria-labelledby":t.title,"data-bs-parent":"#game"},[e("div",w,[l(a(t.description)+" ",1),i[1]||(i[1]=e("br",null,null,-1)),e("a",{href:t.link},a(t.location),9,$),t.title=="The Grim Shredder"?(o(),s("div",R,i[0]||(i[0]=[e("iframe",{src:"https://itch.io/embed/637364",height:"167",width:"552",frameborder:"0"},[e("a",{href:"https://theislandrhythm.itch.io/the-grim-shredder"},"The Grim Shredder by TheIslandRhythm")],-1)]))):g("",!0)])],8,k)]))),128))])])}const I=m(y,[["render",x]]),V={data(){return{example:{title:"",description:"",link:"",location:""},software:[{title:"Beat-Bot",description:`A discord bot I made for my discord server, as well as some friends servers, that has db integration with mongodb.
          Has games, utility, learning, music player, and a plethora of other categories that users can interact with. Currently hosted on a raspberry pi.
          Technologies used: Nodejs, Mongodb`,link:"https://github.com/IslandRhythms/Beat-Bot",location:"Github Repo"},{title:"Unit Converter",description:`A simple java program uisng java swing that converts metric to metric, imperial to imperail, metric to imperial, and vice versa.
          3D printing requires converting inches to millimeters a lot so making an offline program to do that is quite helpful.`,link:"https://github.com/IslandRhythms/UnitConverter",location:"Github Repo"}]}}},G={class:"accordion",id:"software"},S=["id"],C=["data-bs-target","aria-controls"],M=["id","aria-labelledby"],A={class:"accordion-body"},B=["href"];function T(d,i,c,p,n,b){return o(),s("div",null,[i[1]||(i[1]=e("h2",null,"Software / App Development",-1)),e("div",G,[(o(!0),s(r,null,u(n.software,t=>(o(),s("div",{class:"accordion-item",key:t.title},[e("h2",{class:"accordion-header",id:t.title},[e("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":`#${t.link}`,"aria-expanded":"false","aria-controls":t.link},a(t.title),9,C)],8,S),e("div",{id:t.link,class:"accordion-collapse collapse","aria-labelledby":t.title,"data-bs-parent":"#software"},[e("div",A,[l(a(t.description)+" ",1),i[0]||(i[0]=e("br",null,null,-1)),e("a",{href:t.link},a(t.location),9,B)])],8,M)]))),128))])])}const D=m(V,[["render",T]]),U={data(){return{example:{title:"",description:"",link:""},web:[{title:"MyKeySig",description:`Using the spotify api, this project would allow a user to enter a song, playlist, or album and it would return the most recurring key.
          As of late 2024, spotify revoked access from developers to their part of the api that allowed this application to work and so it is no longer functional.`,link:"https://github.com/IslandRhythms/MyKeySig",location:"Github Repo"},{title:"Udemy Website",description:`An ecommerce website I made while following a udemy course. Deployed to heroku but since heroku decided to revoke free access to their services,
          the website can longer be viewed online.`,link:"https://github.com/IslandRhythms/UdemyWebsite",location:"Github Repo"},{title:"My Website",description:"My personal website that I use to show off my projects and history. Technologies Used: Vue, Vue router, Vite",link:"https://github.com/IslandRhythms/IslandRhythms.github.io",location:"Github Repo",home:"https://islandrhythms.github.io/"}]}}},N={class:"accordion",id:"web"},W=["id"],O=["data-bs-target","aria-controls"],q=["id","aria-labelledby"],E={class:"accordion-body"},F=["href"],K={key:0},L=["href"];function X(d,i,c,p,n,b){return o(),s("div",null,[i[3]||(i[3]=e("h2",null,"Web Development",-1)),e("div",N,[(o(!0),s(r,null,u(n.web,t=>(o(),s("div",{class:"accordion-item",key:t.title},[e("h2",{class:"accordion-header",id:t.title},[e("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":`#${t.link}`,"aria-expanded":"false","aria-controls":t.link},a(t.title),9,O)],8,W),e("div",{id:t.link,class:"accordion-collapse collapse","aria-labelledby":t.title,"data-bs-parent":"#web"},[e("div",E,[l(a(t.description)+" ",1),i[0]||(i[0]=e("br",null,null,-1)),e("a",{href:t.link},a(t.location),9,F),i[1]||(i[1]=l()),i[2]||(i[2]=e("br",null,null,-1)),t.home?(o(),s("div",K,[e("a",{href:t.home},"Online View",8,L)])):g("",!0)])],8,q)]))),128))])])}const H=m(U,[["render",X]]),Q={__name:"PortfolioView",setup(d){return(i,c)=>(o(),s(r,null,[h(H),h(I),h(D)],64))}};export{Q as default};
