const TRACKS = [
  {id:'q1',title:'Bohemian Rhapsody',artist:'Queen',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4b/83/09/4b8309c3-e3b2-10bd-ea80-ec017d832503/mzaf_9752264660400108875.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/8b/0a/ea/8b0aea60-6f4a-195b-5958-cdf459c2333b/602527644271.jpg/600x600bb.jpg'},
  {id:'q2',title:'Billie Jean',artist:'Michael Jackson',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dc/bc/8a/dcbc8a3e-4ce1-c00d-cc02-eda2212053c7/mzaf_8347559338388601510.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg'},
  {id:'q3',title:'Smells Like Teen Spirit',artist:'Nirvana',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/65/49/4e/65494e02-b6d3-26d8-6b0c-9bd98dcf4d5d/mzaf_7665413316386155700.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/95/fd/b9/95fdb9b2-6d2b-92a6-97f2-51c1a6d77f1a/00602527874609.rgb.jpg/600x600bb.jpg'},
  {id:'q4',title:'Dancing Queen',artist:'ABBA',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ec/b1/63/ecb163bc-aff2-4dd2-d40b-c044f0b9fa4d/mzaf_4358783485405794088.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/600x600bb.jpg'},
  {id:'q5',title:'Like a Prayer',artist:'Madonna',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0b/23/82/0b238289-52e2-2107-5531-181836267ed2/mzaf_6726729811402686020.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/20/3c/f5/203cf53d-689e-528f-29d7-ba33758254aa/mzi.rotbotfl.jpg/600x600bb.jpg'},
  {id:'q6',title:'...Baby One More Time',artist:'Britney Spears',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2a/ef/e5/2aefe5c7-e83b-07b1-227e-117347aa3006/mzaf_11333878250757508664.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/51/73/28/5173280b-9b5e-c5e4-d3f8-a2612d044543/888880423368.jpg/600x600bb.jpg'},
  {id:'q7',title:'I Want It That Way',artist:'Backstreet Boys',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/12/cd/f8/12cdf81c-f174-cd45-9a56-9b2388df9e63/mzaf_2642298639219088626.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5f/6b/e9/5f6be919-1b9e-30ef-45b7-cc27fc428fd5/012414167224.jpg/600x600bb.jpg'},
  {id:'q8',title:'Lose Yourself',artist:'Eminem',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/13/5a/61/135a6154-8ca2-0523-1fa2-f4ac0ea9e1e7/mzaf_13242749689945681184.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/08/23/fc/0823fcd9-cb44-695b-32bf-b3bf51d9f800/00606949351229.rgb.jpg/600x600bb.jpg'},
  {id:'q9',title:'Blinding Lights',artist:'The Weeknd',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/19/d6/60/19d660ff-e3a9-8377-15a3-ce4b28e89cac/mzaf_18422426156481158187.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6f/bc/e6/6fbce6c4-c38c-72d8-4fd0-66cfff32f679/20UMGIM12176.rgb.jpg/600x600bb.jpg'},
  {id:'q10',title:'Bad Romance',artist:'Lady Gaga',preview:'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3e/3d/5f/3e3d5f8b-2b31-45ef-81bf-4577603abeed/mzaf_2887026754624356956.plus.aac.p.m4a',cover:'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1f/25/c4/1f25c4bf-7f7a-ff26-8769-20ab6052dadf/09UMGIM40719.rgb.jpg/600x600bb.jpg'}
];

const $ = (s)=>document.querySelector(s);
const audio = $('#audio');
let order = [];
let currentIdx = 0;
let score = 0;
let timer = null;
let timeLeft = 20;
let answered = false;
let roundResults = [];
let audioProgressTimer = null;

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}

function stopAudio(){try{audio.pause();audio.currentTime=0;}catch(e){}if(audioProgressTimer){clearInterval(audioProgressTimer);audioProgressTimer=null;}}

function resetRoundUI(){
  $('#mystery-card').classList.remove('revealed');
  $('#card-graphic').style.display='flex';
  $('#reveal').classList.remove('show');
  $('#answers').innerHTML='';
  $('#next-wrap').classList.remove('show');
  $('#err-msg').textContent='';
  $('#player-status').textContent='READY';
  $('#audio-progress').style.width='0%';
  $('#timer-fill').style.width='100%';
  $('#timer-num').textContent='20';
}

function buildOptions(correct){
  const others = TRACKS.filter(t=>t.id!==correct.id);
  shuffle(others);
  const opts = [correct, others[0], others[1], others[2]];
  shuffle(opts);
  return opts;
}

function startGame(){
  order = shuffle([...TRACKS]);
  currentIdx = 0; score = 0; roundResults = [];
  $('#score').textContent = 0;
  show('screen-game');
  startRound();
}

function startRound(){
  answered = false;
  resetRoundUI();
  const t = order[currentIdx];
  $('#round-num').textContent = String(currentIdx+1).padStart(2,'0');
  // progress
  const prog = $('#progress'); prog.innerHTML='';
  for(let i=0;i<10;i++){
    const sp=document.createElement('span');
    if(i<currentIdx) sp.classList.add('done');
    if(i===currentIdx) sp.classList.add('current');
    prog.appendChild(sp);
  }
  // options
  const opts = buildOptions(t);
  const cont = $('#answers');
  opts.forEach(o=>{
    const b=document.createElement('button');
    b.className='answer-btn';
    b.textContent=o.title;
    b.dataset.id=o.id;
    b.addEventListener('click',()=>answer(o.id,b));
    cont.appendChild(b);
  });
  // audio source
  audio.src = t.preview;
  audio.load();
  timeLeft = 20;
  $('#timer-num').textContent=timeLeft;
  $('#timer-fill').style.width='100%';
  startTimer();
}

function startTimer(){
  if(timer) clearInterval(timer);
  timer = setInterval(()=>{
    if(answered) return;
    timeLeft -= 0.1;
    if(timeLeft<=0){ timeLeft=0; clearInterval(timer); timer=null; timeout(); return; }
    $('#timer-num').textContent=Math.ceil(timeLeft);
    $('#timer-fill').style.width=(timeLeft/20*100)+'%';
  },100);
}

function finishRound(status, chosenId){
  if(answered) return;
  answered = true;
  if(timer){clearInterval(timer);timer=null;}
  stopAudio();
  const t = order[currentIdx];
  const correct = chosenId === t.id;
  if(status!=='timeout' && correct){ score += 100; $('#score').textContent=score; }
  // lock answers
  document.querySelectorAll('.answer-btn').forEach(b=>{
    b.disabled=true;
    const id=b.dataset.id;
    if(id===t.id) b.classList.add('correct');
    else if(id===chosenId) b.classList.add('wrong');
    else b.classList.add('neutral');
  });
  // reveal
  $('#card-graphic').style.display='none';
  $('#reveal').classList.add('show');
  let stText='CORRECT!';
  let stClass='correct';
  if(status==='timeout'){ stText="TIME'S UP!"; stClass='timeout'; }
  else if(!correct){ stText='NOT QUITE!'; stClass='wrong'; }
  $('#reveal-status').textContent=stText;
  $('#reveal-status').className='reveal-status '+stClass;
  $('#reveal-title').textContent=t.title;
  $('#reveal-artist').textContent=t.artist;
  const pts = (status!=='timeout' && correct) ? '+100' : '+0';
  $('#reveal-points').textContent=pts+' POINTS';
  // cover
  const img = $('#cover-img');
  const fb = $('#cover-fallback');
  fb.classList.remove('show');
  img.style.display='block';
  img.onerror = ()=>{ img.style.display='none'; fb.classList.add('show'); fb.textContent=t.title+' — '+t.artist; };
  img.src = t.cover;
  $('#next-wrap').classList.add('show');
  roundResults.push({title:t.title, artist:t.artist, ok: status!=='timeout' && correct, timeout: status==='timeout'});
}

function answer(id,el){
  if(answered) return;
  finishRound('answer', id);
}

function timeout(){
  if(answered) return;
  finishRound('timeout', null);
}

$('#btn-next').addEventListener('click',()=>{
  currentIdx++;
  if(currentIdx>=10){ showResult(); return; }
  startRound();
});

function showResult(){
  stopAudio();
  const correctCount = roundResults.filter(r=>r.ok).length;
  const pct = Math.round(correctCount/10*100);
  $('#result-score').textContent = score+' / 1000';
  $('#result-correct').textContent = correctCount;
  $('#result-pct').textContent = pct+'%';
  let title='';
  if(correctCount<=2) title='KEEP LISTENING';
  else if(correctCount<=5) title='GOOD MUSIC TASTE';
  else if(correctCount<=8) title='MUSIC MASTER';
  else if(correctCount===9) title='MUSIC LEGEND';
  else title='ICONIC EARS';
  $('#result-title').textContent=title;
  const ul = $('#result-list'); ul.innerHTML='';
  roundResults.forEach((r,i)=>{
    const li=document.createElement('li');
    li.className = r.ok?'ok':(r.timeout?'no':'no');
    li.innerHTML = `<span>${i+1}. ${r.title} — ${r.artist}</span><span class="r">${r.ok?'✓':(r.timeout?'⏱':'✗')}</span>`;
    ul.appendChild(li);
  });
  show('screen-result');
}

$('#btn-start').addEventListener('click',startGame);
$('#btn-home').addEventListener('click',()=>{stopAudio();if(timer){clearInterval(timer);timer=null;}show('screen-home');});
$('#btn-home2').addEventListener('click',()=>show('screen-home'));
$('#btn-replay-game').addEventListener('click',startGame);

$('#btn-play').addEventListener('click',()=>{
  $('#err-msg').textContent='';
  audio.play().then(()=>{$('#player-status').textContent='PLAYING';startProgress();}).catch(e=>{$('#player-status').textContent='ERROR';$('#err-msg').textContent='Playback failed. Try again.';});
});
$('#btn-pause').addEventListener('click',()=>{audio.pause();$('#player-status').textContent='PAUSED';if(audioProgressTimer){clearInterval(audioProgressTimer);audioProgressTimer=null;}});
$('#btn-replay').addEventListener('click',()=>{audio.currentTime=0;audio.play().then(()=>{$('#player-status').textContent='PLAYING';startProgress();}).catch(e=>{$('#player-status').textContent='ERROR';});});

function startProgress(){
  if(audioProgressTimer) clearInterval(audioProgressTimer);
  audioProgressTimer=setInterval(()=>{
    if(audio.duration && !isNaN(audio.duration)){
      $('#audio-progress').style.width=(audio.currentTime/audio.duration*100)+'%';
    }
    if(audio.ended){ $('#player-status').textContent='READY'; clearInterval(audioProgressTimer); audioProgressTimer=null; }
  },200);
}
audio.addEventListener('ended',()=>{ $('#player-status').textContent='READY'; if(audioProgressTimer){clearInterval(audioProgressTimer);audioProgressTimer=null;} });

// home eq
const eq=$('#eq'); for(let i=0;i<12;i++){const b=document.createElement('i');eq.appendChild(b);}
const ri=$('#rounds-indicator'); for(let i=0;i<10;i++){const s=document.createElement('span');ri.appendChild(s);}
