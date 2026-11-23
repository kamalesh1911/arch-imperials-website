const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],fine=matchMedia('(hover:hover)').matches;
let p=0;const iv=setInterval(()=>{p+=Math.random()*14;if(p>=100){p=100;clearInterval(iv);setTimeout(()=>$('#pre').classList.add('off'),200)}$('#pct').textContent=Math.floor(p)},90);
/* hero 3D wireframe that gets built by a scan plane */
const cv=$('#hero3d'),c=cv.getContext('2d');let W,H,ay=.6,ty=.6,t=0;
const B=[[-1.2,-1.2,2.4,2.4,1.2],[-.9,-.9,1.8,1.8,2.4],[-.6,-.6,1.2,1.2,3.6],[-.3,-.3,.6,.6,4.6],[1.6,-.8,1.4,1.6,1.8],[-3,-.5,1.2,1.2,.9],[-2.6,1.4,1.6,1,1.5]];
const rs=()=>{W=cv.width=innerWidth;H=cv.height=cv.offsetHeight};rs();addEventListener('resize',rs);
const P=(x,y,z)=>{const co=Math.cos(ay),si=Math.sin(ay),X=x*co-z*si,Z=x*si+z*co+9,k=Math.min(W,H*1.3)/Z*1.1,ox=W>860?W*.25:0;return[W/2+ox+X*k,H*.72-y*k+Z*k*.14]};
const poly=(pts,f,s)=>{c.beginPath();pts.forEach((q,i)=>i?c.lineTo(...q):c.moveTo(...q));c.closePath();if(f){c.fillStyle=f;c.fill()}c.strokeStyle=s;c.stroke()};
function draw(){t++;ay+=(ty-ay)*.05+.002;c.clearRect(0,0,W,H);c.lineWidth=1;
 c.strokeStyle='#d9bf8c22';for(let i=-6;i<=6;i++){c.beginPath();c.moveTo(...P(i,0,-6));c.lineTo(...P(i,0,6));c.moveTo(...P(-6,0,i));c.lineTo(...P(6,0,i));c.stroke()}
 const L=(t%420)/420*6.4;
 B.forEach(([x,z,w,d,h])=>{const a=Math.max(0,Math.min(1,(L-h)/1));
  const v=[[x,z],[x+w,z],[x+w,z+d],[x,z+d]];
  for(let i=0;i<4;i++){const[a1,b1]=v[i],[a2,b2]=v[(i+1)%4];poly([P(a1,0,b1),P(a2,0,b2),P(a2,h,b2),P(a1,h,b1)],`rgba(${40+i*20},${120+i*20},${90+i*10},${.08+a*.4})`,'#d9bf8cbb');
   if(a>.3){c.strokeStyle='#f3d9a044';for(let y=.3;y<h;y+=.35){c.beginPath();c.moveTo(...P(a1,y,b1));c.lineTo(...P(a2,y,b2));c.stroke()}}}
  poly(v.map(q=>P(q[0],h,q[1])),`rgba(246,240,228,${a*.35})`,'#d9bf8c')});
 poly([P(-4,L,-4),P(4,L,-4),P(4,L,4),P(-4,L,4)],'rgba(217,191,140,.07)','#f3d9a0');requestAnimationFrame(draw)}draw();
addEventListener('mousemove',e=>{ty=.6+(e.clientX/innerWidth-.5)*2.2});
/* cursor, scroll, nav */
if(fine){let mx=0,my=0,rx=0,ry=0;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;$('#dot').style.transform=`translate(${mx}px,${my}px)`});(function f(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;$('#cur').style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(f)})();
 $$('a,button,.svc,.pc').forEach(e=>{e.onmouseenter=()=>$('#cur').classList.add('big');e.onmouseleave=()=>$('#cur').classList.remove('big')});
 $$('.mag').forEach(b=>{b.onmousemove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`};b.onmouseleave=()=>b.style.transform=''});
 $$('.tilt').forEach(el=>{el.onmousemove=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.02)`};el.onmouseleave=()=>el.style.transform=''})}
addEventListener('scroll',()=>{$('#bar').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'});
$('#burger').onclick=()=>$('#menu').classList.toggle('on');$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('on'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}));$$('.rv').forEach(e=>io.observe(e));
const n=$('[data-n]');new IntersectionObserver(([e],o)=>{if(e.isIntersecting){let i=0;const s=setInterval(()=>{n.textContent=++i+'+';if(i>=8)clearInterval(s)},150);o.disconnect()}}).observe(n);
/* services, spotlight, vision */
$$('.svc').forEach(s=>{s.onmouseenter=s.onclick=()=>{$$('.svc').forEach(x=>x.classList.remove('on'));s.classList.add('on')}});
$$('.card').forEach(k=>k.onmousemove=e=>{const r=k.getBoundingClientRect();k.style.setProperty('--x',e.clientX-r.left+'px');k.style.setProperty('--y',e.clientY-r.top+'px')});
$$('.vm button').forEach(b=>b.onclick=()=>{$$('.vm button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#vmt').textContent=b.dataset.v});
/* projects */
$$('.filt button').forEach(b=>b.onclick=()=>{$$('.filt button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$$('.pc').forEach(p=>p.classList.toggle('hide',b.dataset.f!='all'&&p.dataset.c!=b.dataset.f))});
$$('.pc').forEach(p=>p.onclick=()=>{const d=$('#lb');d.querySelector('img').src=p.querySelector('img').src;d.querySelector('p').textContent=p.querySelector('figcaption').textContent+': '+p.dataset.d;d.showModal()});
$('#lb button').onclick=()=>$('#lb').close();$('#lb').onclick=e=>{if(e.target.id=='lb')e.target.close()};
const ba=$('#ba'),mv=e=>{const r=ba.getBoundingClientRect(),x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));$('.bf').style.width=x*100+'%';$('.bf img').style.setProperty('--w',r.width+'px');$('#bh').style.left=x*100+'%'};
let dr=0;ba.onpointerdown=e=>{dr=1;mv(e)};addEventListener('pointerup',()=>dr=0);addEventListener('pointermove',e=>dr&&mv(e));
/* process */
const S=[['Discover','Understand requirements, lifestyle, preferences and budget.'],['Design','Develop concepts, layouts, drawings and 3D visualisations.'],['Plan','Finalise materials, specifications, costing and project schedules.'],['Execute','Bring the approved design to life through coordinated construction and interior works.'],['Deliver','Complete the project with attention to quality, detailing and finishing.']];let si=0,tm;
S.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s[0];b.onclick=()=>{go(i);clearInterval(tm)};$('#steps').append(b)});
function go(i){si=i;$$('#steps button').forEach((b,j)=>b.classList.toggle('on',j<=i));$('#sn').textContent=i+1;$('#st').textContent=S[i][0];$('#sd').textContent=S[i][1]}go(0);tm=setInterval(()=>go((si+1)%5),3500);
/* contact */
$$('.chips button').forEach(b=>b.onclick=()=>b.classList.toggle('on'));$('#rg').oninput=e=>$('#rv').textContent=e.target.value;
$('#f').onsubmit=e=>{e.preventDefault();$('#toast').classList.add('on');setTimeout(()=>$('#toast').classList.remove('on'),3500);e.target.reset()};
