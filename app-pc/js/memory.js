// ===== 数据 =====
let words = JSON.parse(localStorage.getItem("words")) || []

let index = 0
let list = []
let mode = "word"

// ===== 数据补全 =====
words.forEach(w => {
    if (w.mean && !w.meaning) w.meaning = w.mean
    if (!w.example) w.example = ""
    if (w.level === undefined) w.level = 0
    if (w.nextReview === undefined) w.nextReview = 0
})

// ===== 新学 =====
function startNew(){

    list = words
    index = 0
    mode = "word"

    switchPage()
    show()
}

// ===== 复习 =====
function startReview(){

    let now = Date.now()

    list = words.filter(w => w.nextReview <= now)

    if(list.length === 0){
        alert("今日復習する単語がありません")
        return
    }

    index = 0
    mode = "word"

    switchPage()
    show()
}

// ===== 页面切换（⭐统一写法）=====
function switchPage(){
    document.getElementById("menuPage").style.display = "none"
    document.getElementById("practicePage").style.display = "block"
}

// ===== 返回 =====
function goBack(){
    document.getElementById("menuPage").style.display = "flex"
    document.getElementById("practicePage").style.display = "none"
}

// ===== 显示 =====
function show(){

    let current = list[index]

    if(!current){
        alert("終了！")
        goBack()
        return
    }

    if(mode === "word"){
        document.getElementById("question").innerText = current.meaning
    }else{
        document.getElementById("question").innerText = current.example || "例文なし"
    }

    document.getElementById("answer").value = ""
}

// ===== 确认 =====
function checkAnswer(){

    let input = document.getElementById("answer").value.trim()
    let current = list[index]

    if(mode === "word"){

        if(input.toLowerCase() === current.word.toLowerCase()){
            nextStep(true)
        }else{
            alert("正解：" + current.word)
            nextStep(false)
        }

    }else{

        if(input !== ""){
            nextStep(true)
        }
    }
}

// ===== 下一步 =====
function nextStep(correct){

    let current = list[index]

    // ⭐ 复习才更新
    if(list !== words){

        if(correct){
            current.level++
        }else{
            current.level = 0
        }

        let intervals = [300, 1800, 43200, 86400, 172800]

        let delay = intervals[current.level] || 432000

        current.nextReview = Date.now() + delay * 1000
    }

    if(mode === "word"){
        mode = "sentence"
    }else{
        mode = "word"
        index++
    }

    saveData()
    show()
}

// ===== 保存 =====
function saveData(){
    localStorage.setItem("words", JSON.stringify(words))
}