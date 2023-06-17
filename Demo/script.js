const seats = document.querySelectorAll(".seat");

seats.forEach((seat) => {
  seat.addEventListener("click", selectSeat);
});

function selectSeat() {
  if (this.classList.contains("selected")) {
    if (confirm("좌석을 해제하시겠습니까?")) {
      this.classList.remove("selected");
    }
  } else if (confirm("좌석을 선택하시겠습니까?")) {
    this.classList.add("selected");
  }
}

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const deleteButton = document.querySelector(".del");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  if (username === "") {
    alert("이름을 입력하세요.");
    return;
  }
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  deleteButton.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}

deleteButton.addEventListener("click", deleteUsername);

function deleteUsername() {
  localStorage.removeItem(USERNAME_KEY);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  deleteButton.classList.add(HIDDEN_CLASSNAME);
}

/* ---------- */
/* ---------- */

window.onload = function () {
  document.getElementById("myPopup").style.display = "flex";
};

function selectRole(role) {
  if (role === "student") {
    console.log("학생 선택");
  } else if (role === "admin") {
    console.log("관리자 선택");
  }

  document.getElementById("myPopup").style.display = "none";
}
function showAdminPasswordInput() {
  document.getElementById("adminPasswordInput").style.display = "block";
}

function selectRole(role) {
  if (role === "student") {
    document.getElementById("userRoleText").textContent = "학생";
    document.getElementById("myPopup").style.display = "none";
  } else if (role === "admin") {
    document.getElementById("userRoleText").textContent = "관리자";
    document.getElementById("adminPasswordInput").style.display = "block";
  }
}

function checkAdminPassword() {
  var password = document.getElementById("passwordField").value;

  if (password === "1234") {
    console.log("비밀번호 일치 - 관리자 선택 완료");
    selectRole("admin");
    document.getElementById("myPopup").style.display = "none";
  } else {
    console.log("비밀번호 불일치");
  }
}

selectRole("student");
/* ---------- */
/* ---------- */
