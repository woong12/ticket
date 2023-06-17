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
window.onload = function () {
  document.getElementById("myPopup").style.display = "flex";
};

function selectRole(role) {
  // 선택된 역할(role)에 따라 필요한 작업 수행
  if (role === "student") {
    // 학생 역할 선택 시 처리
    console.log("학생 선택");
  } else if (role === "admin") {
    // 관리자 역할 선택 시 처리
    console.log("관리자 선택");
  }

  // 팝업 닫기
  document.getElementById("myPopup").style.display = "none";
}
function showAdminPasswordInput() {
  document.getElementById("adminPasswordInput").style.display = "block";
}

function selectRole(role) {
  if (role === "student") {
    document.getElementById("userRoleText").textContent = "학생";
    document.getElementById("myPopup").style.display = "none"; // 팝업 숨기기
  } else if (role === "admin") {
    document.getElementById("userRoleText").textContent = "관리자";
    document.getElementById("adminPasswordInput").style.display = "block"; // 관리자 패스워드 입력 창 보이기
  }
}

function checkAdminPassword() {
  var password = document.getElementById("passwordField").value;

  if (password === "1234") {
    console.log("비밀번호 일치 - 관리자 선택 완료");
    selectRole("admin"); // 관리자로 선택되었음을 표시
    document.getElementById("myPopup").style.display = "none"; // 팝업 숨기기
  } else {
    console.log("비밀번호 불일치");
    // 비밀번호가 일치하지 않을 경우 처리할 내용을 추가합니다.
  }
}

selectRole("student");
