const study = document.querySelector('.study');
const images = document.querySelectorAll('.study img');
const dotsContainer = document.querySelector('.dots');

let index = 0;
const width = 600;

// 生成小圆点
images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => moveTo(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');

// 更新点状态
function updateDots(){
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// 移动图片
function moveTo(i){
    index = i;
    study.style.transform = `translateX(-${width * index}px)`;
    updateDots();
}

// 自动轮播
setInterval(() => {
    index = (index + 1) % images.length;
    moveTo(index);
}, 3000);

// 初始化
updateDots();