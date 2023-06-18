import styles from "./page.module.css";
import PageItem from "../components/PageItem";
import Modal from "../components/Modal";
import Role from "@/components/Role";
import { connectDB } from "@/util/database";

export default function Home() {
  const setBooked = async () => {
    try {
      const db = (await connectDB).db("Ticket");
      let reselt = await db.collection("seat").find().toArray();

      const bookedSeat = reselt.map((seat) => ({
        booked: JSON.parse(seat.booked),
      }))[0].booked;
      return bookedSeat;
    } catch (error) {
      console.error("error : " + error);
    }
  };

  return (
    <div className={styles.disable_text_select}>
      <Modal></Modal>
      <div className={styles.container}>
        <div className={styles.page}>
          <div className={styles.nav}>
            <div className={styles.board}>칠판</div>
          </div>
          <main className={styles.main}>
            <PageItem bookedSeat={setBooked()}></PageItem>
            <div className={styles.door}>출입문</div>
          </main>
        </div>
        <Role></Role>
      </div>
    </div>
  );
}
