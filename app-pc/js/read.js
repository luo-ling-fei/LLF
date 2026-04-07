/*read*/
/* ===== 数据 ===== */
let articles = JSON.parse(localStorage.getItem("articles")) || [
    { content:"", notes:"" }
];

let currentIndex = 0;

/* ===== 渲染 ===== */
function render(){

    if(articles.length === 0){
        articles.push({content:"", notes:""});
        currentIndex = 0;
    }

    document.getElementById("articleInput").value =
        articles[currentIndex].content;

    document.getElementById("noteInput").value =
        articles[currentIndex].notes;

    document.getElementById("pageInfo").innerText =
        (currentIndex + 1) + " / " + articles.length;
}

/* ===== 保存 ===== */
function save(){
    localStorage.setItem("articles", JSON.stringify(articles));
}

/* ===== 新增 ===== */
function addArticle(){
    articles.push({ content:"", notes:"" });
    currentIndex = articles.length - 1;
    save();
    render();
}

/* ===== 删除 ===== */
function deleteArticle(){

    if(articles.length === 1){
        articles[0] = {content:"", notes:""};
    }else{
        articles.splice(currentIndex,1);
        currentIndex = Math.max(0, currentIndex - 1);
    }

    save();
    render();
}

/* ===== 下一篇 ===== */
function nextArticle(){
    currentIndex = (currentIndex + 1) % articles.length;
    render();
}

/* ===== 上一篇 ===== */
function prevArticle(){
    currentIndex = (currentIndex - 1 + articles.length) % articles.length;
    render();
}

/* ===== 自动保存 ===== */
document.addEventListener("DOMContentLoaded", () => {

    const articleInput = document.getElementById("articleInput");
    const noteInput = document.getElementById("noteInput");

    articleInput.addEventListener("input", function(){
        articles[currentIndex].content = this.value;
        save();
    });

    noteInput.addEventListener("input", function(){
        articles[currentIndex].notes = this.value;
        save();
    });

    render();
});