import styles from "./NewsElement.module.css";
import { formatRussianDateMSK } from "../../../bll/formatDate";
import type { NewsElementProps } from "../../../bll/types/newsTypes";
export function NewsElement({ post, avatar, fullName, date }: NewsElementProps) {
  return (
    <div className={styles.newsElement}>
      <div className={styles.news_header}>
        <img src={avatar ? avatar : '/img/unnamed.png'} alt="avatar" />
        <div className={styles.header_text}>
          <span className={styles.name}>{fullName}</span>
        </div>
        <div className={styles.date}>{formatRussianDateMSK(date)}</div>
      </div>
      <div className={styles.post}>{post}</div>
    </div>
  );
}
