import { useEffect, useState } from "react";
import styles from "./seat.module.css";

export default function Seat({ seat, seats, name, Booked, onClick, nameSeat }) {
  const [isBooked, setIsBooked] = useState(false);
  const [localseats, setLocalSeats] = useState(seats);
  const [isStudent, setIsStudent] = useState("student");
  const [nameList, setNameList] = useState(nameSeat);
  const [value, setValue] = useState("");

  useEffect(() => {
    const check = window.localStorage.getItem("student");
    if (check) {
      setIsStudent(check);
    }

    const booksValue = "books"; // 예시로 'books' 값을 사용했습니다.

    let nameValue = "";

    for (let i = 0; i < nameList.length; i++) {
      if (seat === nameList[i][booksValue]) {
        nameValue = nameList[i].name;
        break; // 동일한 값이 있는 경우, 더 이상 반복하지 않고 종료합니다.
      }
    }
    setValue(nameValue);
  }, []);

  useEffect(() => {
    const checkBooked = () => {
      const isBooked = Booked.includes(seat);
      setIsBooked(isBooked);
      setLocalSeats(window.localStorage.getItem("seats"));
    };
    checkBooked();
  }, [name]);

  const handleClick = () => {
    if (!isBooked && seat != localseats) {
      onClick(seat);
    }
  };
  return (
    <div
      className={`${styles.seat} ${
        seat == localseats
          ? styles["selected"]
          : isBooked
          ? styles["booked"]
          : ""
      }`}
      onClick={() => handleClick(seat)}
    >
      {isStudent == "student"
        ? seat == localseats
          ? name
          : seat
        : value
        ? value
        : seat}
    </div>
  );
}
