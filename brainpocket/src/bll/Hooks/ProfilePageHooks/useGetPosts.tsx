import { useEffect, useState } from "react";
import { profileAPI } from "../../../dal/api";
import type { Post } from "../../types/profileTypes";
import { useGetError } from "../useGetError";

export function useGetPosts(id: number) {
  const { setError } = useGetError();
  const [posts, setPosts] = useState<Array<Post> | null>(null);
  useEffect(() => {
    profileAPI
      .getPosts(id)
      .then((res) => setPosts(res.reverse()))
      .catch((err) => setError(err));
  }, [id]);
  function deletePost(id: number) {
    profileAPI.deletePost(id).catch((err) => setError(err));
    setPosts(posts!.filter((post) => post.id !== id));
  }
  function addPost(loginUserId: number, post: string) {
    profileAPI.addPost(loginUserId, post).then(() =>
      profileAPI
        .getPosts(loginUserId)
        .then((res) => setPosts(res.reverse()))
        .catch((err) => setError(err))
    );
  }
  function addLike(id: number): Promise<void> {
    return profileAPI
      .like(id)
      .then(() => {
        setPosts(posts!.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)));
      })
      .catch((err) => setError(err));
  }
  return { posts, deletePost, addPost, addLike };
}
