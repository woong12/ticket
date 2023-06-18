import { useEffect, useState } from "react";
import styles from "./seat.module.css";

export default function Seat({ seat, seats, name, Booked, onClick }) {
  const [isBooked, setIsBooked] = useState(false);
  const [localseats, setLocalSeats] = useState(seats);

  useEffect(() => {
    const checkBooked = () => {
      const isBooked = Booked.includes(seat);
      setIsBooked(isBooked);
      setLocalSeats(window.localStorage.getItem("seats"));
    };
    checkBooked();
  }, [localseats, name]);

  const handleClick = () => {
    if (!isBooked && seat != localseats) {
      console.log(!(seat == localseats));
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
      {seat == localseats ? name : seat}
    </div>
  );
}
