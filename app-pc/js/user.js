// ===== 数据 =====
let studyData = JSON.parse(localStorage.getItem("studyData")) || {};

// ===== 今天 =====
const today = new Date();
const yyyy = today.getFullYear();
const mm = today.getMonth();
const dd = today.getDate();

const todayKey = `${yyyy}-${String(mm+1).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;

// ===== 计时 =====
let startTime = Date.now();

// 离开页面保存时间
window.addEventListener("beforeunload", () => {
    const endTime = Date.now();
    const minutes = Math.floor((endTime - startTime) / 60000);

    if(!studyData[todayKey]){
        studyData[todayKey] = 0;
    }

    studyData[todayKey] += minutes;

    localStorage.setItem("studyData", JSON.stringify(studyData));
});

// ===== DOM =====
const calendar = document.getElementById("calendar");
const studyTime = document.getElementById("studyTime");

const firstDay = new Date(yyyy, mm, 1).getDay();
const daysInMonth = new Date(yyyy, mm + 1, 0).getDate();

// ===== 填充空白 =====
for(let i = 0; i < firstDay; i++){
    calendar.appendChild(document.createElement("div"));
}

// ===== 生成日历 =====
for(let i = 1; i <= daysInMonth; i++){

    const div = document.createElement("div");
    div.classList.add("date-item");

    const span = document.createElement("span");
    span.textContent = i;
    div.appendChild(span);

    const dateStr = `${yyyy}-${String(mm+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;

    // ⭐ 今天高亮
    if(i === dd){
        div.classList.add("today");
    }

    // ⭐ 有学习记录
    if(studyData[dateStr] && studyData[dateStr] > 0){
        const dot = document.createElement("div");
        dot.classList.add("dot");
        div.appendChild(dot);
    }

    // 点击查看时间
    div.addEventListener("click", () => {
        const minutes = studyData[dateStr] || 0;
        studyTime.textContent = `${dateStr}の学習時間: ${minutes}分`;
    });

    calendar.appendChild(div);
}

// ===== 默认显示今天 =====
studyTime.textContent = `今日学習時間: ${studyData[todayKey] || 0}分`;

// ===== 实时计时（加分🔥）=====
setInterval(() => {
    const now = Date.now();
    const minutes = Math.floor((now - startTime) / 60000);

    studyTime.textContent =
        `今日学習時間: ${(studyData[todayKey] || 0) + minutes}分`;
}, 1000);