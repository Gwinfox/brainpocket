import { useDisabledButtons } from "../../../../bll/Hooks/ProfilePageHooks/useDisabledButtons";
import type { PostProps } from "../../../../bll/types/profileTypes";
import styles from "./Post.module.css";

export function Post({ loginUserId, userId, post, deletePost, addLike }: PostProps) {
  const { buttonIsPushing, addLikeBtn } = useDisabledButtons(addLike);
  return (
    <div className={styles.post}>
      <div className={styles.postText}>{post.post}</div>
      <div className={styles.likes}>
        {post.likes}
        <button
          disabled={buttonIsPushing.some((id) => id === post.id)}
          className={styles.btn_like}
          onClick={() => {
            addLikeBtn(post.id);
          }}
        >
          like
        </button>
        {userId === loginUserId ? (
          <button
            disabled={buttonIsPushing.some((id) => id === post.id)}
            className={styles.btn_del}
            onClick={() => {
              deletePost(post.id);
            }}
          >
            удалить
          </button>
        ) : null}
      </div>
    </div>
  );
}
