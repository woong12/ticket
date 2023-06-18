"use client";
import styles from "./pagein.module.css";
import PageItem from "./PageItem";
import Modal from "./Modal";
import Role from "@/components/Role";
import { useState } from "react";

export default async function PageIn({ book, name }) {
  const [bookSeat, setBookSeat] = useState(book);
  const [nameSeat, setNameSeat] = useState(name);

  return (
    <div className={styles.disable_text_select}>
      <Modal></Modal>
      <div className={styles.container}>
        <div className={styles.page}>
          <div className={styles.nav}>
            <div className={styles.board}>칠판</div>
          </div>
          <main className={styles.main}>
            <PageItem bookedSeat={bookSeat} nameSeat={nameSeat}></PageItem>
            <div className={styles.door}>출입문</div>
          </main>
        </div>
        <Role></Role>
      </div>
    </div>
  );
}
