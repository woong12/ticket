"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const seatLayout = [
    [1, 0, 14, 21, 28, 0, 40, 45],
    [
      [2, 3],
      [8, 9],
      [15, 16],
      [22, 23],
      [29, 30],
      [35, 36],
      [41, 42],
      [0, 0],
    ],
    [
      [4, 5],
      [10, 11],
      [17, 18],
      [24, 25],
      [31, 32],
      [37, 38],
      [43, 44],
      [0, 0],
    ],
    [
      [6, 7],
      [12, 13],
      [19, 20],
      [26, 27],
      [33, 34],
      [39, 0],
      [0, 0],
      [0, 0],
    ],
  ];

  const [name, setName] = useState(localStorage.getItem("name"));
  const [seats, setSeats] = useState(localStorage.getItem("seats"));

  function clickSeat(seat) {
    if (name) {
      window.alert("이미 자리를 예약하셨습니다.");
    } else {
      const getName = (seat) => {
        const inputName = window.prompt("이름을 입력해주세요: ");
        if (inputName) {
          localStorage.setItem("name", inputName);
          setName(inputName);
          localStorage.setItem("seats", seat);
          setSeats(seat);
        } else {
          window.alert("이름이 입력되지 않았습니다.");
          getName(seat);
        }
      };
      getName(seat);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <div className={styles.nav}>
          {/* {!!name ? <div className={styles.name}>{name}</div> : <div></div>} */}

          <div className={styles.board}>칠판</div>
        </div>
        <main className={styles.main}>
          <div className={styles.main_seats}>
            {seatLayout.map((line, lineIndex) => (
              <div key={lineIndex} className={styles.line}>
                {Array.isArray(line[0])
                  ? line.map((row, rowIndex) => (
                      <div className={styles.row} key={rowIndex}>
                        {row.map(
                          (seat, seatIndex) =>
                            seat !== 0 && (
                              <div
                                className={styles.seat}
                                key={seatIndex}
                                onClick={() => clickSeat(seat)}
                              >
                                {seat == seats ? name : seat}
                              </div>
                            )
                        )}
                      </div>
                    ))
                  : line.map((seat, seatIndex) => (
                      <div className={styles.row} key={seatIndex}>
                        {seat !== 0 && (
                          <div
                            className={styles.seat}
                            key={seatIndex}
                            onClick={() => clickSeat(seat)}
                          >
                            {seat == seats ? name : seat}
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            ))}
          </div>
          <div className={styles.door}>출입문</div>
        </main>
      </div>
    </div>
  );
}
