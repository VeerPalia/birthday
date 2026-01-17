// 🌟 PAGE NAVIGATION
const pages = document.querySelectorAll(".page");
const startBtn = document.getElementById("startBtn");
const nextBtns = document.querySelectorAll(".nextBtn");
const music = document.getElementById("bgm");
let index = 0;

startBtn.onclick = () => {
  music.play();
  next();
};

nextBtns.forEach(b => b.onclick = next);

function next() {
  pages[index].classList.remove("active");
  index++;
  pages[index].classList.add("active");

  // Personalized message typing
  if(index === 2) typeText();

  // Wishes page typing
  if(index === 6) showWishes();
}

// 📸 PHOTO SLIDER
const imgs = document.querySelectorAll(".photo-box img");
let i = 0;
setInterval(() => {
  imgs.forEach(im => im.classList.remove("show"));
  imgs[i].classList.add("show");
  i = (i + 1) % imgs.length;
}, 3000);

// ✍️ TYPING MESSAGE
const text = "You make my world brighter every single day 💖";
let t = 0;
function typeText() {
  const letter = document.getElementById("letter");
  if(t < text.length) {
    letter.innerHTML += text[t++];
    setTimeout(typeText, 40);
  }
}

// 🎂 CAKE, KNIFE, CANDLE
const cake = document.getElementById("cake");
const knife = document.getElementById("knife");
const candle = document.getElementById("candle");
const finalText = document.getElementById("finalText");
const knifeSound = document.getElementById("knifeSound");
const finalBtn = document.getElementById("finalBtn");
const gift = document.getElementById("gift");
const giftText = document.getElementById("giftText");

let cakeCut = false;

knife.onclick = () => {
  knife.classList.add("cut");
  cake.classList.add("cut");

  knifeSound.currentTime = 0;
  knifeSound.play();

  if(navigator.vibrate) navigator.vibrate(200);

  const hint = document.querySelector(".knife-box .hint");
  if(hint) hint.style.display = "none";

  fireworks();
  setTimeout(() => finalText.classList.add("show"), 800);
  gift.style.transform = "scale(1.3)";
  giftText.classList.add("show");

  cakeCut = true;
  finalBtn.disabled = false;
};

candle.onclick = () => {
  candle.classList.add("blow");
};

// 💓 HEART FIREWORKS
function fireworks() {
  for(let i = 0; i < 60; i++) {
    const f = document.createElement("div");
    f.className = "fire";
    f.style.left = "50%";
    f.style.top = "50%";
    f.style.setProperty("--x", (Math.random()*400-200)+"px");
    f.style.setProperty("--y", (Math.random()*400-200)+"px");
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1000);
  }
}

// 🎁 Gift click optional
if(gift) {
  gift.onclick = () => fireworks();
}

// 🌈 STICKERS FLOATING
const s = ["stickers/heart.png","stickers/star.png","stickers/kiss.png"];
setInterval(() => {
  const im = document.createElement("img");
  im.src = s[Math.floor(Math.random()*s.length)];
  im.style.left = Math.random()*100+"vw";
  document.querySelector(".stickers").appendChild(im);
  setTimeout(()=>im.remove(),8000);
},700);

// 🎵 MUSIC SELECTION PAGE
const musicBtns = document.querySelectorAll(".musicBtn");
const musicNext = document.getElementById("musicNext");
musicBtns.forEach(btn => {
  btn.onclick = () => {
    music.src = btn.getAttribute("data-src");
    music.play();
    musicNext.disabled = false;
  };
});
musicNext.onclick = next;

const userWish = document.getElementById("userWish");
const wishNext = document.getElementById("wishNext");
const wishComment = document.getElementById("wishComment");

userWish.addEventListener("input", (e) => {
  // Enable Next button if some text
  if(userWish.value.trim().length > 0){
    wishNext.disabled = false;
  } else {
    wishNext.disabled = true;
  }

  // 😝 Text jump around
  const x = (Math.random() * 20 - 10); // -10 to +10px
  const y = (Math.random() * 10 - 5);  // -5 to +5px
  userWish.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random()*2-1}deg)`;

  // 🔔 Funny comment randomly
  const comments = [
    "Arre yeh type kyu nahi ho raha 🤪",
    "Letter bhaag gaye kya? 😅",
    "Ruk jao, cursor sharma gaya 😝",
    "Bas thoda aur dhyaan se type karo 😜"
  ];
  wishComment.innerText = comments[Math.floor(Math.random() * comments.length)];

  // Optional: randomly delete last letter (super irritating)
  if(Math.random() < 0.08 && userWish.value.length > 0){ // 8% chance
    userWish.value = userWish.value.slice(0, -1);
  }
});

wishNext.onclick = () => {
  // Reset transform
  userWish.style.transform = "translate(0,0) rotate(0deg)";
  
  // Store wish to gift page
  giftText.innerHTML = userWish.value;

  // Next page
  next();
};
