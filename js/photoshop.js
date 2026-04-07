const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const dots = document.querySelectorAll(".dot");

let index = 0;

// 切换图片
function showSlide(i){
    index = i;
    slides.style.transform = `translateX(-${i * 400}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
}

// 点击小圆点
dots.forEach((dot, i)=>{
    dot.addEventListener("click", ()=>{
        showSlide(i);
    });
});

// 自动轮播（可选）
setInterval(()=>{
    index = (index + 1) % images.length;
    showSlide(index);
}, 3000);

// 点击放大
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach(img=>{
    img.addEventListener("click", ()=>{
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

// 点击关闭
lightbox.addEventListener("click", ()=>{
    lightbox.style.display = "none";
});



const topBtn = document.getElementById("topBtn");

window.onscroll = function(){
    if(document.documentElement.scrollTop > 200){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};