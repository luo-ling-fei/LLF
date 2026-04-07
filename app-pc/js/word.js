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
