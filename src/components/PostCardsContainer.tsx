import React from "react";
import { IPostCardsContainerProps } from "@/types/types";
import PostCard from "./PostCard";

const PostCardsContainer: React.FC<IPostCardsContainerProps> = ({ posts }) => {
  return (
    <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center justify-center min-h-[80vh] pb-7">
      {posts?.map((post) => (
        <PostCard {...post} key={post.id} />
      ))}
    </div>
  );
};

export default PostCardsContainer;
