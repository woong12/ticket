"use client";
import { useEffect, useState } from "react";
import styles from "./role.module.css";

export default function Role() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const students = window.localStorage.getItem("student");
    if (students) {
      setRole(students);
    }
  }, []);

  return (
    <div className={styles.user_role}>
      <span id="userRoleText">{role}</span>
    </div>
  );
}
