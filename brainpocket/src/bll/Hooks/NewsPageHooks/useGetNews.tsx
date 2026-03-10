import { useCallback, useEffect, useState } from "react";
import { newsAPI } from "../../../dal/api";
import type { News } from "../../types/newsTypes";
import { useGetError } from "../useGetError";

export function useGetNews(friends: number[]) {
  const { setError } = useGetError();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [news, setNews] = useState<News>([]);
  const checkScroll = useCallback(() => {
    if (loading || !hasMore) return; // Отменяет скролл если уже происходит загрузка или постов больше не осталось
    const scrollHeight = document.documentElement.scrollHeight; // Высота всего документа
    const scrollTop = window.scrollY + window.innerHeight; // Высота того, что уже проскроллено
    // Загружаем новые посты когда до низа документа меньше 100px
    if (scrollHeight - scrollTop < 100) {
      setPage(page + 1);
      newsAPI
        .getNews(friends, page + 1, 10)
        .then((res) => {
          setNews([...news, ...res.news]);
          setHasMore(res.hasMore);
        })
        .catch((err) => setError(err));
    }
  }, [loading, hasMore, page, friends, news]);
  useEffect(() => {
    // Загружкаем первую страницу
    setLoading(true);
    friends.length !== 0;
    newsAPI
      .getNews(friends)
      .then((res) => {
        setNews(res.news);
        setHasMore(res.hasMore);
      })
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);
  // Обработчик скролла
  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  return { news, loading, hasMore };
}
