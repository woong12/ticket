import styles from "./page.module.css";
import PageItem from "./components/PageItem";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <div className={styles.nav}>
          <div className={styles.board}>칠판</div>
        </div>
        <main className={styles.main}>
          <PageItem></PageItem>
          <div className={styles.door}>출입문</div>
        </main>
      </div>
    </div>
  );
}
