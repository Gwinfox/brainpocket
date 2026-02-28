import { useGetNews } from "../../bll/Hooks/NewsPageHooks/useGetNews";
import type { NewsProps } from "../../bll/types/newsTypes";
import { Preloader } from "../Preloader/Preloader";
import styles from "./News.module.css";
import { NewsElement } from "./NewsElement/NewsElement";

function News({ userData }: NewsProps) {
  if (!userData) {
    return null;
  }
  const { news, loading, hasMore } = useGetNews(userData.friends);
  return (
    <div className={styles.newsBlock}>
      {news &&
        news.map((n) => (
          <NewsElement
            key={n.id}
            post={n.post}
            date={n.date}
            avatar={n.photos.avatar}
            fullName={n.firstName + " " + n.lastName}
          />
        ))}
        {loading && <Preloader />}
      {!hasMore && news.length > 0 && <div className={styles.noMore}>Вы просмотрели все новости...</div>}
      {news.length === 0 && !loading && <div className={styles.noMore}>Новостей пока нет...</div>}
    </div>
  );
}
export default News;
