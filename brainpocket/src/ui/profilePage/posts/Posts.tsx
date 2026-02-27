import { useGetPosts } from "../../../bll/Hooks/ProfilePageHooks/useGetPosts";
import type { PostsProps } from "../../../bll/types/profileTypes";
import { AddPost } from "./addPost/AddPost";
import { Post } from "./post/Post";
import styles from "./Posts.module.css";

export function Posts({ loginUserId, userId }: PostsProps) {
  const { posts, deletePost, addPost, addLike } = useGetPosts(userId);
  return (
    <div className={styles.posts}>
      {loginUserId === userId && <AddPost addPost={addPost} loginUserId={loginUserId}/>}
      {posts &&
        posts.map((p, i) => (
          <div key={i}>
            <Post loginUserId={loginUserId} userId={userId} post={p} deletePost={deletePost} addLike={addLike}/>
          </div>
        ))}
    </div>
  );
}
