const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const starsContainer = document.getElementById("stars");
const messageBox = document.getElementById("messageBox");
const counter = document.getElementById("counter");
const music = document.getElementById("music");

let clicked = 0;

/* 🌌 SKY */
const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

let sky = [];
for(let i=0;i<120;i++){
  sky.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.5,
    a:Math.random(),
    d:Math.random()*0.02
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  sky.forEach(s=>{
    s.a += s.d;
    if(s.a>1 || s.a<0) s.d*=-1;

    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${s.a})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

/* START */
startBtn.onclick = ()=>{
  welcome.style.opacity="0";
  setTimeout(()=>welcome.style.display="none",800);

  music.play().catch(()=>{});
  createStars();
  startCounter();
};

/* ⭐ STAR MESSAGES */
const messages=[
"First chat ❤️",
"First laugh ❤️",
"First date ❤️",
"Your smile ❤️",
"My favorite person ❤️",
"Every memory ❤️",
"Thank you ❤️",
"Always you ❤️",
"Forever ❤️"
];

function createStars(){
  for(let i=0;i<9;i++){
    let s=document.createElement("div");
    s.className="star";
    s.innerHTML="⭐";

    s.style.left=Math.random()*80+10+"vw";
    s.style.top=Math.random()*70+15+"vh";

    s.onclick=()=>{
      showMessage(messages[i]);
      s.remove();
      clicked++;

      if(clicked===9) showBigStar();
    };

    starsContainer.appendChild(s);
  }
}

/* ✅ FIXED: SLOWER + LONGER MESSAGE */
function showMessage(text){
  messageBox.innerHTML="";
  messageBox.style.display="block";

  let i=0;

  function type(){
    if(i < text.length){
      messageBox.innerHTML += text[i++];
      setTimeout(type, 120); /* ✅ SLOW typing */
    }
  }

  type();

  setTimeout(()=>{
    messageBox.style.display="none";
  },5000); /* ✅ stays longer */
}

/* 🌟 BIG STAR */
function showBigStar(){
  let s=document.createElement("div");
  s.className="star";
  s.innerHTML="🌟";

  s.style.left="50%";
  s.style.top="50%";
  s.style.transform="translate(-50%,-50%)";

  s.onclick=startFinal;
  starsContainer.appendChild(s);
}

/* MONTH COUNTER */
function startCounter(){
  let start=new Date("Nov 3 2024");

  setInterval(()=>{
    let now=new Date();
    let months=(now.getFullYear()-start.getFullYear())*12 +
               (now.getMonth()-start.getMonth());

    counter.innerHTML=`❤️ ${months} Months Together ❤️`;
  },1000);
}

/* 💌 YOUR FULL LONG LETTER (RESTORED ✅) */
const letter=`Happy 19th monthsary, babyyy ko,

Hindi ko alam how will I explain this po,
pero you became my “constant” in life that I’m super thankful na dumating ka sa buhay ko.

Before, I thought love was just about kilig, chatting every day, and simple happiness.
But with you, babyy, I realized it’s so much more than that.

You became the reason why my days feel better even when nothing special is happening.

May mga days na super busy, may days na pagod, may days na nag-aaway tayo
pero kahit ganon, nandyan ka pa rin po.

And honestly, that’s what matters the most to me — not perfect moments,
but having you stay even when things aren’t perfect.

Babyy, minsan po pasaway ako, at minsan super kulit ko hehehehe.
But thank you kasi kahit ganon, hindi mo ako sinukuan.

You stayed.
You understood me.
You chose to fix things with me instead of walking away.

And that means everything to me, babyyy ko.

Ngayon, 19 months na po tayo,
and ang dami na nating pinagdaanan from bestfriends to lovers.

Ikaw na yung person na hinahanap ko sa good news,
sa pagod, or kahit wala lang.

We really came from bestfriends to lovers,
and I’m thankful every day na nangyari yun sa atin.

Babyy, I don’t promise a perfect relationship,
pero I promise na araw-araw,
I will keep choosing you.

Good days or bad days,
ikaw pa rin.

Thank you for being my person.
Mahal na mahal kita, babyy
I love youuu so muchh babyy❤️

Happy 19th Monthsary 💖
More months, more us, more love.`;

/* FINAL SCREEN */
function startFinal(){
  let screen=document.getElementById("finalScreen");
  let loader=document.getElementById("loader");

  screen.style.display="flex";

  let p=0;
  let int=setInterval(()=>{
    p++;
    loader.innerText=p+"%";

    if(p>=100){
      clearInterval(int);
      loader.style.display="none";

      document.getElementById("finalContent").style.display="block";

      typeLetter();
      hearts();
    }
  },20);
}

/* ✅ FINAL TYPING */
function typeLetter(){
  let el=document.getElementById("typedText");
  el.innerHTML="";
  let i=0;

  function type(){
    if(i<letter.length){
      el.innerHTML += letter[i++];

      let delay=40;
      if(letter[i]==="\n") delay=200;
      if(letter[i]===".") delay=250;

      setTimeout(type,delay);
    }
  }

  type();
}

/* ❤️ HEARTS */
function hearts(){
  setInterval(()=>{
    let h=document.createElement("div");
    h.className="heart";
    h.innerHTML="❤️";
    h.style.left=Math.random()*100+"vw";

    document.body.appendChild(h);
    setTimeout(()=>h.remove(),5000);
  },300);
}
``