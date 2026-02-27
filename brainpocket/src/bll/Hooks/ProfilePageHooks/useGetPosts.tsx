import { useEffect, useState } from "react";
import { profileAPI } from "../../../dal/api";
import type { Post } from "../../types/profileTypes";

export function useGetPosts(id: number) {
  const [posts, setPosts] = useState<Array<Post> | null>(null);
  useEffect(() => {
    profileAPI.getPosts(id).then((res) => setPosts(res.reverse()));
  }, []);
  function deletePost(id: number) {
    profileAPI.deletePost(id);
    setPosts(posts!.filter((post) => post.id !== id));
  }
  function addPost(loginUserId: number, post: string) {
    profileAPI
      .addPostAPI(loginUserId, post)
      .then(() => profileAPI.getPosts(loginUserId).then((res) => setPosts(res.reverse())));
  }
  function addLike(id: number): Promise<void> {
    return profileAPI.like(id).then(() => {
      setPosts(posts!.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)));
    });
  }
  return { posts, deletePost, addPost, addLike };
}
