import NavBar from "@/components/NavBar";
import { getPost } from "@/lib/data";

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await getPost(params.postId);
  return (
    <div className="container">
      <NavBar />
      <div className="w-full min-h-[100vh] flex flex-col items-center justify-start pt-[10vh]">
        <div className="w-full flex flex-col items-center justify-center">
          <h4 className="w-full text-left text-xl font-bold mb-2">
            {post.title}
          </h4>
          <h5 className="w-full text-left text-lg font-bold">{post.author}</h5>
        </div>
        <p className="w-full text-justify text-lg mt-10">{post.content}</p>
      </div>
    </div>
  );
}
