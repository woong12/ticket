"use client";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import styles from "./modal.module.css";

export default function Modal() {
  const [student, setStudent] = useState("init");
  const [value, setValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const students = window.localStorage.getItem("student");
    if (students) {
      setStudent(students);
    } else {
      setStudent("");
    }
  }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const checkStudent = () => {
    const newStudent = "student";
    setStudent(newStudent);
    window.localStorage.setItem("student", newStudent);
  };

  const checkAdmin = () => {
    if (value === "1234") {
      const newStudent = "admin";
      setStudent(newStudent);
      window.localStorage.setItem("student", newStudent);
    } else {
      window.alert("비밀번호가 맞지 않습니다.");
    }
  };

  return (
    <div
      id="myPopup"
      className={styles.popup}
      style={{
        display:
          student === "init" || student === "student" || student === "admin"
            ? "none"
            : "flex",
      }}
    >
      <div className={styles.popup_content}>
        <h2>사용자 선택</h2>
        <button onClick={() => checkStudent()}>학생</button>
        <button
          onClick={() => {
            setStudent("next");
            router.reload();
          }}
        >
          관리자
        </button>
        <div
          id="adminPasswordInput"
          style={{ display: student === "next" ? "block" : "none" }}
        >
          <input
            className={styles.passwordInput}
            type="password"
            id="passwordField"
            value={value}
            placeholder="비밀번호 입력"
            onChange={onChange}
          />
          <button onClick={() => checkAdmin()}>확인</button>
        </div>
      </div>
    </div>
  );
}
