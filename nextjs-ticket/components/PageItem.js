"use client";

import { useEffect, useState } from "react";
import styles from "./pageItem.module.css";
import Seat from "./Seat";

export default function PageItem({ bookedSeat, nameSeat }) {
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
  for (let i = 0; i < bookedSeat.length; i++) {
    bookedSeat[i] = Number(bookedSeat[i]);
  }
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(0);
  const [Booked, setBooked] = useState(bookedSeat);
  const [nameList, setNameList] = useState(nameSeat);

  useEffect(() => {
    if (!seats) {
      const localName = window.localStorage.getItem("name");
      if (localName) {
        setName(localName);
      }
      const localSeats = window.localStorage.getItem("seats");
      if (localSeats) {
        setSeats(JSON.parse(localSeats));
      }
    }
  }, []);

  useEffect(() => {
    const upBook = async () => {
      try {
        if (seats && !Booked.includes(seats)) {
          const response = await fetch("/api/upbooklist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: seats,
          });
          if (response.ok) {
            console.log("Book list saved to MongoDB!");
          } else {
            console.error("Failed to save book list to MongoDB.");
          }
        }
      } catch (error) {
        console.error("Error saving book list to MongoDB:", error);
      }
    };

    const upload = async () => {
      try {
        const data = { name: `${name}`, book: seats };
        console.log(data);
        if (
          data.name &&
          data.book &&
          !nameList.includes(name) &&
          !Booked.includes(seats)
        ) {
          const response = await fetch("/api/upnamelist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            console.log("name list saved to MongoDB!");
          } else {
            console.error("Failed to save name list to MongoDB.");
          }
        }
      } catch (error) {
        console.error("Error saving name list to MongoDB:", error);
      }
    };

    upBook();
    upload();
  }, [seats]);

  function clickSeat(seat) {
    if (name) {
      window.alert("이미 자리를 예약하셨습니다.");
    } else {
      const getName = async (seat) => {
        const inputName = window.prompt("이름을 입력해주세요: ");
        if (inputName) {
          window.localStorage.setItem("name", inputName);
          setName(inputName);
          window.localStorage.setItem("seats", JSON.stringify(seat));
          setSeats(seat);
        } else {
          window.alert("이름이 입력되지 않았습니다.");
        }
      };
      getName(seat);
    }
  }

  return (
    <div className={styles.main_seats}>
      {seatLayout.map((line, lineIndex) => (
        <div key={lineIndex} className={styles.line}>
          {Array.isArray(line[0])
            ? line.map((row, rowIndex) => (
                <div className={styles.row} key={rowIndex}>
                  {row.map(
                    (seat, seatIndex) =>
                      seat !== 0 && (
                        <div key={seatIndex}>
                          <Seat
                            seat={seat}
                            seats={seats}
                            name={name}
                            Booked={Booked}
                            onClick={() => clickSeat(seat)}
                          ></Seat>
                        </div>
                      )
                  )}
                </div>
              ))
            : line.map((seat, seatIndex) => (
                <div className={styles.row} key={seatIndex}>
                  {seat !== 0 && (
                    <Seat
                      seat={seat}
                      seats={seats}
                      name={name}
                      Booked={Booked}
                      onClick={() => clickSeat(seat)}
                    ></Seat>
                  )}
                </div>
              ))}
        </div>
      ))}
    </div>
  );
}
