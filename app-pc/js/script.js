function login() {
    const email = document.getElementById("email").value;

    if(email === "") {
        alert("メールを入力してください");
        return;
    }

    localStorage.setItem("user", email);
    window.location.href = "home.html";
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

/* ===== 主页欢迎语 ===== */

document.addEventListener("DOMContentLoaded", function() {

    const user = localStorage.getItem("user");
    const welcome = document.getElementById("welcome");

    if(welcome) {   // 只有在 home.html 才执行

        if(!user) {
            window.location.href = "index.html";
        } else {
            welcome.innerText = "ようこそ、" + user + "さん";
        }
    }

});




/*word*/
let words = JSON.parse(localStorage.getItem("words")) || []

function addWord(){

let word = document.getElementById("wordInput").value
let mean = document.getElementById("meanInput").value
let example = document.getElementById("exampleInput").value

if(word === "") return

words.push({word,mean,example})

saveData()
render()

document.getElementById("wordInput").value=""
document.getElementById("meanInput").value=""
document.getElementById("exampleInput").value=""
}

function deleteWord(index){

words.splice(index,1)

saveData()
render()

}

function saveData(){

localStorage.setItem("words",JSON.stringify(words))

}

function render(){

let list=document.getElementById("wordList")

list.innerHTML=""

words.forEach((item,index)=>{

list.innerHTML += `
<div class="word-row">
<div>${item.word}</div>
<div>${item.mean}</div>
<div>${item.example}</div>
<div>
<button class="delete-btn" onclick="deleteWord(${index})">削除</button>
</div>
</div>
`

})

}

render()




/*read*/
document.addEventListener("DOMContentLoaded", () => {

    let articles = JSON.parse(localStorage.getItem("articles")) || [
        { content: "", notes: "" }
    ];

    let currentIndex = 0;

    const articleInput = document.getElementById("articleInput");
    const noteInput = document.getElementById("noteInput");
    const addBtn = document.getElementById("addBtn");

    function render(){
        articleInput.value = articles[currentIndex].content;
        noteInput.value = articles[currentIndex].notes;
    }

    function save(){
        localStorage.setItem("articles", JSON.stringify(articles));
    }

    articleInput.addEventListener("input", () => {
        articles[currentIndex].content = articleInput.value;
        save();
    });

    noteInput.addEventListener("input", () => {
        articles[currentIndex].notes = noteInput.value;
        save();
    });

    addBtn.addEventListener("click", () => {
        articles.push({
            content: "",
            notes: ""
        });

        currentIndex = articles.length - 1;

        render();
        save();
    });

    render();
});