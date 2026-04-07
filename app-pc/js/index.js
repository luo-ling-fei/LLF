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
