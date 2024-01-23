import React from "react";
import { IPostCardProps } from "@/types/types";

const PostCard: React.FC<IPostCardProps> = ({
  id,
  title,
  author,
  content,
  createdAt,
}) => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center justify-between w-[300px] h-[300px] border p-3 cursor-pointer">
      <div className="w-full flex flex-col items-center justify-center">
        <h4 className="w-full text-left text-2x1 font-bold mb-2">{title}</h4>
        <h3 className="w-full text-left text-lg font-bold">{author}</h3>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
