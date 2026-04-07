
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