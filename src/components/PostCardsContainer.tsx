"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { IPostCardsContainerProps, IPostCardProps } from "@/types/types";
import PostCard from "./PostCard";
import SearchComponent from "./SearchComponent";
import AddPostButton from "@/components/ui/AddPostButton";
import CreatePost from "./CreatePost";

const PostCardsContainer: React.FC<IPostCardsContainerProps> = ({ posts }) => {
  const dispatch = useAppDispatch();
  // Global state
  const updatedPosts = useAppSelector((state) => state.myReducer.data);
  // Local state
  const [actualPosts, setActualPosts] = useState<IPostCardProps[] | undefined>(
    posts
  );

  useEffect(() => {
    updatedPosts && setActualPosts(updatedPosts);
  }, [updatedPosts, dispatch]);

  return (
    <>
      <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center justify-center min-h-[80vh] pb-7">
        {actualPosts?.map((post) => (
          <PostCard {...post} key={post.id} />
        ))}
      </div>
      <SearchComponent />
      <CreatePost />
      <AddPostButton />
    </>
  );
};

export default PostCardsContainer;
