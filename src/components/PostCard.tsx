import React from "react";
import { IPostCardProps } from "@/types/types";
import Link from "next/link";
import { sliceContent } from "@/lib/utils";

const PostCard: React.FC<IPostCardProps> = ({
  id,
  title,
  author,
  content,
  createdAt,
}) => {
  return (
    <Link
      className="bg-white rounded-lg flex flex-col items-center justify-between w-[300px] h-[300px] border p-3 cursor-pointer"
      href={`/post/${id}`}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <h4 className="w-full text-left text-x1 font-bold mb-2">{title}</h4>
        <h5 className="w-full text-left text-lg font-bold">{author}</h5>
      </div>
      <p>{sliceContent(content)}</p>
    </Link>
  );
};

export default PostCard;
