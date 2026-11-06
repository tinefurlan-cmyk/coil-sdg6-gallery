"use strict";
// GALLERY (photos are edited in gallery-data.js)
const grid=document.getElementById('photo-grid');
const labels={challenge:'The challenge',solutions:'Solutions',behind:'Behind the scenes'};
galleryPhotos.forEach((p,i)=>{
  const card=document.createElement('article');card.className='photo-card in'+(i%5===0?' wide':'');card.dataset.category=p.category;card.dataset.index=i;
  const btn=document.createElement('button');btn.className='photo-open';btn.type='button';btn.setAttribute('aria-label','Open '+p.title);
  const img=document.createElement('img');img.src=p.src;img.alt=p.description;img.loading='lazy';
  const tag=document.createElement('span');tag.className='badge-cat '+p.category;tag.textContent=labels[p.category]||p.category;
  btn.append(img,tag);btn.addEventListener('click',()=>openPhoto(i));
  const info=document.createElement('div');info.className='info';
  const a=document.createElement('span');a.textContent='Photo by '+p.author;
  const h=document.createElement('h3');h.textContent=p.title;
  const d=document.createElement('p');d.textContent=p.description;
  info.append(a,h,d);card.append(btn,info);grid.append(card);
});
document.querySelectorAll('.filter').forEach(f=>{
  const c=f.dataset.filter,n=c==='all'?galleryPhotos.length:galleryPhotos.filter(p=>p.category===c).length;
  const sp=document.createElement('span');sp.className='count';sp.textContent=n;f.append(sp);
  f.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(x=>{x.classList.toggle('active',x===f);x.setAttribute('aria-pressed',String(x===f))});
    document.querySelectorAll('.photo-card').forEach((k,j)=>{
      k.hidden=c!=='all'&&k.dataset.category!==c;
      k.classList.remove('in');if(!k.hidden){void k.offsetWidth;k.style.animationDelay=(j*40)+'ms';k.classList.add('in')}
    });
  });
});
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img');let cur=0,lastFocus=null;
const visible=()=>[...document.querySelectorAll('.photo-card')].filter(c=>!c.hidden).map(c=>+c.dataset.index);
function show(i){const p=galleryPhotos[i],list=visible();cur=i;lbImg.src=p.src;lbImg.alt=p.description;
  document.getElementById('lb-cap').textContent=p.title+' — '+p.description+' ('+p.author+')';
  document.getElementById('lb-count').textContent=(list.indexOf(i)+1)+' / '+list.length}
function openPhoto(i){lastFocus=document.activeElement;show(i);lb.hidden=false;document.body.style.overflow='hidden';document.getElementById('lb-close').focus()}
function closePhoto(){lb.hidden=true;document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
function go(d){const list=visible();if(!list.length)return;const pos=list.indexOf(cur);show(list[(pos+d+list.length)%list.length])}
document.getElementById('lb-close').addEventListener('click',closePhoto);
document.getElementById('lb-prev').addEventListener('click',()=>go(-1));
document.getElementById('lb-next').addEventListener('click',()=>go(1));
lb.addEventListener('click',e=>{if(e.target===lb)closePhoto()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;
  if(e.key==='Escape')closePhoto();else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);
  else if(e.key==='Tab'){const f=['lb-close','lb-prev','lb-next'].map(id=>document.getElementById(id)),k=f.indexOf(document.activeElement);
    e.preventDefault();f[(k+(e.shiftKey?-1:1)+f.length)%f.length].focus()}});
let sx=0;lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)go(dx<0?1:-1)});

// QUIZ: answer is the index (starting at 0) of the correct option
const questions=[
 {q:'What should you do with leftover chemicals such as paint or cleaning products?',options:['Pour them down the drain','Take them to a hazardous-waste collection point','Throw them into a river'],answer:1,explanation:'Hazardous waste must be collected separately so it does not reach our water.'},
 {q:'Which habit helps keep plastic out of rivers and lakes?',options:['Using a reusable bottle','Buying more single-use bottles','Leaving litter near the shore'],answer:0,explanation:'Reusing bottles means less plastic that can end up in nature.'},
 {q:'Why is water pollution dangerous for fish?',options:['It makes fish grow faster','It can lower oxygen and add harmful substances','It has no effect'],answer:1,explanation:'Pollution can reduce oxygen and poison the water, so fish get sick or die.'},
 {q:'What can a river clean-up action achieve?',options:['It removes waste before it harms wildlife','It makes the river dry up','Nothing at all'],answer:0,explanation:'Removing waste early protects animals and keeps water cleaner.'}];
let qi=0,score=0,done=false;
const $=id=>document.getElementById(id);
function showQ(){done=false;const q=questions[qi];
  $('q-progress').textContent='Question '+(qi+1)+' of '+questions.length;$('q-score').textContent='Score: '+score;
  $('q-bar').style.width=(qi/questions.length*100)+'%';$('q-text').textContent=q.q;
  $('q-options').replaceChildren();$('q-feedback').textContent='';$('q-next').hidden=true;
  q.options.forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.textContent=o;b.addEventListener('click',()=>pick(i));$('q-options').append(b)})}
function pick(i){if(done)return;done=true;const q=questions[qi];if(i===q.answer)score++;
  [...$('q-options').children].forEach((b,k)=>{b.disabled=true;if(k===q.answer)b.classList.add('correct');else if(k===i)b.classList.add('wrong')});
  $('q-feedback').textContent=(i===q.answer?'Correct! ':'Not quite. ')+q.explanation;$('q-score').textContent='Score: '+score;
  $('q-next').hidden=false;$('q-next').textContent=qi===questions.length-1?'See my results →':'Next question →'}
$('q-next').addEventListener('click',()=>{qi++;if(qi<questions.length)showQ();else{
  $('q-text').hidden=$('q-options').hidden=$('q-next').hidden=true;$('q-feedback').textContent='';$('q-bar').style.width='100%';
  $('q-finish').hidden=false;$('q-result').textContent='You scored '+score+' out of '+questions.length+'!'}});
$('q-restart').addEventListener('click',()=>{qi=0;score=0;$('q-text').hidden=$('q-options').hidden=false;$('q-finish').hidden=true;showQ()});
showQ();

// SURVEY: votes are saved only in this visitor's browser (localStorage)
const KEY='sdg6-poll-demo-v1',choices=['Reuse a bottle','Join a clean-up','Save water'];
const empty=()=>Object.fromEntries(choices.map(c=>[c,0]));
let votes;try{votes=Object.assign(empty(),JSON.parse(localStorage.getItem(KEY)))}catch{votes=empty()}
function drawVotes(){const total=choices.reduce((s,c)=>s+(votes[c]||0),0),box=$('poll-bars');box.replaceChildren();
  choices.forEach(c=>{const pct=total?Math.round(votes[c]/total*100):0;const row=document.createElement('div');row.className='poll-row';
    const top=document.createElement('div');const n=document.createElement('span');n.textContent=c;const v=document.createElement('span');v.textContent=votes[c]+' vote(s) · '+pct+'%';top.append(n,v);
    const t=document.createElement('div');t.className='track';const f=document.createElement('div');f.className='poll-fill';f.style.width=pct+'%';t.append(f);row.append(top,t);box.append(row)})}
$('poll-vote').addEventListener('click',()=>{const s=document.querySelector('input[name="poll"]:checked');if(!s){alert('Please choose one answer first.');return}
  votes[s.value]++;try{localStorage.setItem(KEY,JSON.stringify(votes))}catch{}$('poll').hidden=true;$('poll-results').hidden=false;drawVotes()});
$('poll-reset').addEventListener('click',()=>{votes=empty();try{localStorage.removeItem(KEY)}catch{}$('poll').hidden=false;$('poll-results').hidden=true;document.querySelectorAll('input[name="poll"]').forEach(x=>x.checked=false)});

// GAME: clean the river (click waste, avoid fish). LIVES=1: you lose if a piece of waste escapes or you hit a fish. Raise LIVES to give more chances.
(function(){
  const river=$('river'),msg=$('g-msg'),btn=$('g-start'),over=$('g-over'),sub=$('g-sub'),DURATION=45,LIVES=1;
  const kinds=[['jb','0 0 30 70',26],['jg','0 0 80 70',46],['jc','0 0 40 56',32]];
  let items=[],running=false,gScore=0,lives=LIVES,tLeft=DURATION,last=0,spawnIn=0,best=0,raf=0,flash=0;
  function hud(){$('g-score').textContent='Score: '+gScore;$('g-time').textContent='Time: '+Math.ceil(tLeft)+' s';
    $('g-pol').textContent='Fish: '+'🐟'.repeat(lives)+'✖'.repeat(LIVES-lives);river.style.setProperty('--p',(LIVES-lives)/LIVES)}
  function say(t){msg.textContent=t;clearTimeout(flash);flash=setTimeout(()=>{if(running)msg.textContent=''},1100)}
  function lose(t){if(!running)return;lives--;hud();if(lives<=0)end('You lost – '+t,false);else say('Careful – '+t)}
  function spawn(){
    const fishy=Math.random()<.25,el=document.createElement('button');el.type='button';el.className='item'+(fishy?' fishy':'');
    if(fishy){el.setAttribute('aria-label','Fish – do not click');el.innerHTML='<svg viewBox="0 -4 120 66" width="64"><use href="#tail"/><use href="#body"/></svg>'}
    else{const k=kinds[Math.floor(Math.random()*kinds.length)];el.setAttribute('aria-label','Waste – click to remove');el.innerHTML='<svg viewBox="'+k[1]+'" width="'+k[2]+'"><use href="#'+k[0]+'"/></svg>'}
    const it={el,fishy,x:-80,v:(55+Math.random()*50)*(1+(DURATION-tLeft)/60)};
    el.style.top=(10+Math.random()*(river.clientHeight-90))+'px';
    el.addEventListener('pointerdown',e=>{e.preventDefault();hit(it)});
    river.append(el);items.push(it)}
  function remove(it,pop){it.gone=true;items=items.filter(i=>i!==it);if(pop){it.el.classList.add('pop');setTimeout(()=>it.el.remove(),300)}else it.el.remove()}
  function hit(it){if(!running||it.gone)return;remove(it,true);
    if(it.fishy)lose('you hit a fish!');else{gScore++;hud()}}
  function frame(t){
    if(!running)return;const dt=Math.min(.05,(t-last)/1000||0);last=t;
    tLeft-=dt;spawnIn-=dt;
    if(spawnIn<=0){spawn();spawnIn=Math.max(.45,1.1-(DURATION-tLeft)*.012)}
    const w=river.clientWidth;
    for(const it of items.slice()){it.x+=it.v*dt;it.el.style.transform='translateX('+it.x+'px)';
      if(it.x>w){remove(it,false);if(!it.fishy)lose('a piece of waste got away!');if(!running)return}}
    hud();
    if(tLeft<=0){tLeft=0;hud();return end('You win! You caught all the waste and saved every fish.',true)}
    raf=requestAnimationFrame(frame)}
  function end(title,won){running=false;cancelAnimationFrame(raf);items.forEach(i=>i.el.remove());items=[];
    best=Math.max(best,gScore);
    msg.textContent='';river.classList.remove('playing');over.classList.toggle('won',won);
    sub.textContent=title+' Waste removed: '+gScore+'. Best: '+best+'.';
    btn.textContent=won?'▶ PLAY AGAIN':'↻ TRY AGAIN';over.hidden=false;btn.focus()}
  btn.addEventListener('click',()=>{items.forEach(i=>i.el.remove());items=[];gScore=0;lives=LIVES;tLeft=DURATION;spawnIn=0;
    msg.textContent='';running=true;over.hidden=true;river.classList.add('playing');hud();last=performance.now();raf=requestAnimationFrame(frame)});
  hud();
})();

// BEFORE / AFTER slider
const ba=document.getElementById('ba'),baRange=document.getElementById('ba-range');
baRange.addEventListener('input',()=>ba.style.setProperty('--x',baRange.value+'%'));

// FISH: build the animated fish in the background
document.querySelectorAll('.fish svg').forEach((s,i)=>{s.setAttribute('viewBox','0 -4 120 66');
  s.innerHTML='<use href="#tail" class="tail" style="animation-delay:-'+(i*0.37).toFixed(2)+'s"/><use href="#body"/>'});
