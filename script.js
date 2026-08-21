

// NAVBAR SHADOW

(function(){
  const canvas = document.getElementById('bg-wallpaper');
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function isDark(){
    return document.body.classList.contains('dark-mode');
  }

  let pts = [];
  const N = 70;
  for(let i=0;i<N;i++){
    pts.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      vx: (Math.random()-0.5)*0.35,
      vy: (Math.random()-0.5)*0.35
    });
  }

  // click anywhere on the page adds a small burst
  window.addEventListener('click', function(e){
    for(let i=0;i<8;i++){
      pts.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random()-0.5)*3,
        vy: (Math.random()-0.5)*3,
        burst: true, life: 60
      });
    }
  });

  function step(){
    // background + dot/line colors flip with theme
    const bg = isDark() ? 'rgba(17,17,17,0.28)' : 'rgba(247,247,247,0.35)';
    const line = isDark() ? '120,170,255' : '0,119,255';
    const dot  = isDark() ? '160,200,255' : '0,119,255';

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(const p of pts){
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      if(p.life!==undefined) p.life--;
    }
    pts = pts.filter(p=>p.life===undefined||p.life>0);

    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){
          ctx.strokeStyle = 'rgba('+line+','+(0.18*(1-d/100))+')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          ctx.stroke();
        }
      }
    }

    for(const p of pts){
      ctx.fillStyle = 'rgba('+dot+','+(p.burst?0.9:0.6)+')';
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.burst?2:1.6,0,Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }
  step();
})();


window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    }
    else{
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    }

});


// DARK MODE TOGGLE

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Change icon

    if(document.body.classList.contains("dark-mode")){
        themeToggle.innerHTML = "☀️";
    }
    else{
        themeToggle.innerHTML = "🌙";
    }

});


// NAME TYPING EFFECT

const text = " Vinolan Martin D ";

let index = 0;

const typingTarget = document.querySelector(".name-typing");

function typeName(){

    if(index < text.length){

        typingTarget.innerHTML += text.charAt(index);

        index++;

        setTimeout(typeName, 120);
    }

}

window.onload = typeName;





const words = [
    " Full Stack Developer " ,
    " Python Developer " ,
    " " ,
    " ASP.NET Developer "
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.querySelector(".typing");

function typeEffect(){

    const currentWord = words[wordIndex];

    if(isDeleting){
        typingElement.textContent =
        currentWord.substring(0, charIndex--);
    }
    else{
        typingElement.textContent =
        currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 60 : 120;

    if(!isDeleting && charIndex === currentWord.length){
        speed = 1500;
        isDeleting = true;
    }
    else if(isDeleting && charIndex === 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();



// SCROLL REVEAL ANIMATION

// SCROLL ANIMATION

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }
        else{

            entry.target.classList.remove("show");

        }

    });

},
{
    threshold:0.15
});

hiddenElements.forEach((el) => observer.observe(el));