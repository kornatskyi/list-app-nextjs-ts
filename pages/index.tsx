import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Key, useState } from "react";
import InputForm from "../components/InputForm";
import PostComponent from "../components/PostComponent";
import PostsContainer from "../components/PostsContainerComponent";
import { PrismaClient, Post } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const posts: Post[] = await prisma.post.findMany();
  return {
    props: {
      initialPosts: posts,
    },
  };
}

export async function getPosts() {
  const response = await fetch("/api/posts", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function savePost(post: Post) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function deletePost(post: Post) {
  const response = await fetch("/api/posts", {
    method: "DELETE",
    body: JSON.stringify({ id: post.id }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
const Home: NextPage = (props: any) => {
  const { initialPosts } = props;
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className=" w-full flex flex-col ">
      <InputForm setPosts={setPosts} />
      <PostsContainer>
        {posts.map((obj: Post, i: Key | null | undefined) => (
          <PostComponent key={i} data={obj} setPosts={setPosts} />
        ))}
      </PostsContainer>
    </div>
  );
};

export default Home;
