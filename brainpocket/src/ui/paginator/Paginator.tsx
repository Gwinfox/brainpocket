import { useState } from "react";
import styles from ".//Paginator.module.css";
import type { PaginatorOptions, PaginatorProps } from "../../bll/types/usersTypes";

export function Paginator({ totalItemsCount, pageSize, onPageChanged }: PaginatorProps) {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const [paginator, setPaginator] = useState<PaginatorOptions>({
    portionNumber: 1,
    currentPage: 1,
    portionSize: 3,
  });
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const portionCount = Math.ceil(pagesCount / paginator.portionSize);
  const leftPortionPageNumber = (paginator.portionNumber - 1) * paginator.portionSize + 1;
  const rightPortionPageNumber = paginator.portionNumber * paginator.portionSize;

  return (
    <div className={styles.paginator}>
      {paginator.portionNumber > 1 && (
        <button onClick={() => setPaginator({ ...paginator, portionNumber: paginator.portionNumber - 1 })}>
          влево
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => (
          <span
            key={p}
            className={paginator.currentPage === p ? styles.active : styles.pending}
            onClick={() => {
              onPageChanged(p, pageSize);
              setPaginator({ ...paginator, currentPage: p });
            }}
          >
            {p}
          </span>
        ))}
      {portionCount > paginator.portionNumber && (
        <button onClick={() => setPaginator({ ...paginator, portionNumber: paginator.portionNumber + 1 })}>
          вправо
        </button>
      )}
    </div>
  );
}
