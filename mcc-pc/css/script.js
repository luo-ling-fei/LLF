
/* =====================================================
   图片和文字的浮动
===================================================== */
const preface = document.querySelector(".preface");

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.4
});

observer.observe(preface);






/* =====================================================
   自动轮播 Slider（slider1 / slider2 通用）
   功能说明：
   1. 图片按固定时间自动切换
   2. 下方指示条随图片自动变色
   3. 鼠标移入轮播区域时暂停
   4. 鼠标移出后继续播放
===================================================== */

function initAutoSlider({
  sliderSelector,      // 整个 slider 容器
  imageSelector,       // 图片选择器
  indicatorSelector,   // 下方指示条
  interval = 3000      // 自动切换时间（毫秒）
}) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;

  const images = slider.querySelectorAll(imageSelector);
  const indicators = slider.querySelectorAll(indicatorSelector);

  let currentIndex = 0;
  let timer = null;

  /* -------------------------
     显示指定索引的图片
     - 当前图片显示
     - 其余图片隐藏
     - 对应指示条高亮
  ------------------------- */
  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    indicators.forEach(dot => dot.classList.remove('active'));

    images[index].classList.add('active');
    indicators[index].classList.add('active');

    currentIndex = index;
  }

  /* -------------------------
     下一张图片（循环）
  ------------------------- */
  function nextImage() {
    let next = currentIndex + 1;
    if (next >= images.length) next = 0;
    showImage(next);
  }

  /* -------------------------
     开始自动播放
  ------------------------- */
  function startAutoPlay() {
    if (timer) return; // 防止重复启动
    timer = setInterval(nextImage, interval);
  }

  /* -------------------------
     停止自动播放
  ------------------------- */
  function stopAutoPlay() {
    clearInterval(timer);
    timer = null;
  }

  /* -------------------------
     鼠标移入：暂停
     鼠标移出：继续
  ------------------------- */
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  /* 初始化 */
  showImage(0);
  startAutoPlay();
}

/* =====================================================
   初始化两组轮播
===================================================== */

initAutoSlider({
  sliderSelector: '.slider1',
  imageSelector: '.slider-images img',
  indicatorSelector: '.slider-indicator span',
  interval: 3000
});

initAutoSlider({
  sliderSelector: '.slider2',
  imageSelector: '.slider-images1 img',
  indicatorSelector: '.slider-indicator1 span',
  interval: 3000
});
















/*top*/
const topBtn = document.getElementById('topBtn');
const historySection = document.getElementById('history1');

window.addEventListener('scroll', () => {
  const historyTop = historySection.getBoundingClientRect().top;

  if (historyTop <= 0) {
    // 到达 / 超过 防災の歴史
    topBtn.classList.add('show');
  } else {
    // 在 preface 区域
    topBtn.classList.remove('show');
  }
});




