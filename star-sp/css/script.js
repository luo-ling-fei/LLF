document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navigation");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // 向下滚动 → 显示
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      nav.classList.add("show");
    } 
    // 向上滚动 → 隐藏
    else {
      nav.classList.remove("show");
    }

    lastScrollY = currentScrollY;
  });
});







window.addEventListener("load", () => {
  const text = document.querySelector(".herd1-text");

  // 延迟一点出现，更有仪式感
  setTimeout(() => {
    text.classList.add("show");
  }, 800);
});

window.addEventListener("load", () => {
  const text = document.querySelector(".herd1-text");
  const scrollHint = document.querySelector(".scroll-hint");

  // 文字出现
  setTimeout(() => {
    text.classList.add("show");
  }, 800);

  // 文字完全出现后 → 下拉提示出现
  setTimeout(() => {
    scrollHint.classList.add("show");
  }, 2000);
});



window.addEventListener("load", () => {
  const starsBg = document.querySelector(".stars-bg");
  const herd = document.querySelector(".herd");
  const text = document.querySelector(".herd1-text");
  const scrollHint = document.querySelector(".scroll-hint");

  const STAR_COUNT = 48;

  const rect = herd.getBoundingClientRect();
  const maxX = rect.width * 0.45;
  const maxY = rect.height * 0.35;

  // ⭐ 动态生成星星（基于页面尺寸）
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("span");
    star.classList.add("bg-star");
    starsBg.appendChild(star);

    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;

    star.style.left = "50%";
    star.style.top = "50%";
    star.style.transform = `translate(${x}px, ${y}px) scale(1)`;

    star.style.animation = `twinkle ${1.2 + Math.random()}s infinite`;

    setTimeout(() => {
      star.style.opacity = 1;
    }, i * 40);
  }

  // ⭐ 星星消失
  setTimeout(() => {
    starsBg.classList.add("hide");
  }, 2600);

  // ✨ 文字出现
  setTimeout(() => {
    text.classList.add("show");
  }, 3400);

  // ⬇️ 下拉提示
  setTimeout(() => {
    scrollHint.classList.add("show");
  }, 4600);
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollHint = document.querySelector(".scroll-hint");
  const target = document.getElementById("star_1");

  if (!scrollHint || !target) return;

  scrollHint.addEventListener("click", () => {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});










document.addEventListener('DOMContentLoaded', () => {

  const pages = document.querySelectorAll('.slide-page');
  const dots  = document.querySelectorAll('.big_box3 span');

  let currentIndex = 0;
  const total = pages.length;

  updateView();

  /* 点击页面 → 切换到下一页 */
  pages.forEach(page => {
    page.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % total;
      updateView();
    });
  });

  function updateView() {

    /* 页面显示 */
    pages.forEach(p => p.classList.remove('active1'));
    pages[currentIndex].classList.add('active1');

    /* 圆点状态 */
    dots.forEach(d => d.classList.remove('active1'));
    dots[currentIndex].classList.add('active1');
  }

});







// 日文标准星座名称（日本网站固定写法）
const zodiacList = [
  "牡羊座",   // おひつじ座
  "牡牛座",   // おうし座
  "双子座",   // ふたご座
  "蟹座",     // かに座
  "獅子座",   // しし座
  "乙女座",   // おとめ座
  "天秤座",   // てんびん座
  "蠍座",     // さそり座
  "射手座",   // いて座
  "山羊座",   // やぎ座
  "水瓶座",   // みずがめ座
  "魚座"      // うお座
];

// 当天固定、每天变化的随机算法（保持不变）
function dailyRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getTodayData(index) {
  const today = new Date().toDateString();
  const seed = today.length + index;

  return {
    star: Math.floor(dailyRandom(seed) * 5) + 1,
    money: Math.floor(dailyRandom(seed + 1) * 100),
    work: Math.floor(dailyRandom(seed + 2) * 100),
    health: Math.floor(dailyRandom(seed + 3) * 100)
  };
}

let current = 0;

const nameEl = document.getElementById("zodiac-name");
const starsEl = document.getElementById("stars");

const moneyEl = document.getElementById("money");
const workEl = document.getElementById("work");
const healthEl = document.getElementById("health");

const moneyVal = document.getElementById("money-val");
const workVal = document.getElementById("work-val");
const healthVal = document.getElementById("health-val");

function render(index) {
  const data = getTodayData(index);

  nameEl.textContent = zodiacList[index];
  starsEl.textContent = "★".repeat(data.star) + "☆".repeat(5 - data.star);

  moneyEl.style.width = data.money + "%";
  workEl.style.width = data.work + "%";
  healthEl.style.width = data.health + "%";

  moneyVal.textContent = data.money + "％";
  workVal.textContent = data.work + "％";
  healthVal.textContent = data.health + "％";
}

document.getElementById("next").onclick = () => {
  current = (current + 1) % 12;
  render(current);
};

render(current);




/*图片点击放大*/
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  document.querySelectorAll(".talo1 img").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.style.display = "flex";
    });
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
