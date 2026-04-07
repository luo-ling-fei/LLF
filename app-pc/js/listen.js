// ===== 读取文章数据 =====
// ===== 读取文章数据 =====
let articles = JSON.parse(localStorage.getItem("articles")) || []

let index = 0
let isSpeaking = false
let utter = null

// ===== 显示文章 =====
function show(){

    if(articles.length === 0 || !articles[index].content){
        document.getElementById("article-box").innerText = "文章がありません"
        return
    }

    document.getElementById("article-box").innerText =
        articles[index].content
}

show()

// ===== 下一篇 =====
function next(){

    resetSpeech()

    index++
    if(index >= articles.length) index = 0

    show()
}

// ===== 上一篇 =====
function prev(){

    resetSpeech()

    index--
    if(index < 0) index = articles.length - 1

    show()
}

// ===== 播放 / 停止 =====
function toggleSpeech(){

    let btn = document.getElementById("playBtn")

    // ❚❚ 状态 → 停止
    if(isSpeaking){

        speechSynthesis.cancel()
        isSpeaking = false

        btn.innerText = "▶"
        return
    }

    // ▶ 状态 → 播放
    if(articles.length === 0) return

    let text = articles[index].content

    if(!text){
        alert("文章が空です")
        return
    }

    utter = new SpeechSynthesisUtterance(text)
    utter.lang = "ja-JP"

    utter.onend = () => {
        isSpeaking = false
        btn.innerText = "▶"
    }

    speechSynthesis.cancel()
    speechSynthesis.speak(utter)

    isSpeaking = true
    btn.innerText = "❚❚"
}

// ===== 重置语音 =====
function resetSpeech(){

    speechSynthesis.cancel()
    isSpeaking = false

    let btn = document.getElementById("playBtn")
    if(btn) btn.innerText = "▶"
}

// ===== 录音 =====
let mediaRecorder
let audioChunks = []
let audioURL = null

async function startRecording(){

    // 覆盖旧录音
    audioChunks = []
    audioURL = null

    let mic = document.getElementById("micBtn")
    mic.style.background = "red"

    let stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = e => {
        audioChunks.push(e.data)
    }

    mediaRecorder.onstop = () => {

        mic.style.background = "#ddd"

        let blob = new Blob(audioChunks)
        audioURL = URL.createObjectURL(blob)
    }

    mediaRecorder.start()

    setTimeout(()=>{
        mediaRecorder.stop()
    },3000)
}

// ===== 播放录音 =====
function playRecording(){

    if(!audioURL){
        alert("録音がありません")
        return
    }

    let audio = new Audio(audioURL)
    audio.play()
}