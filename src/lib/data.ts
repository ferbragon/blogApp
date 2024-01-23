import { PostModel } from "@/app/api/db/seq/seq";

export async function getPosts() {
  try {
    const posts = await PostModel.findAll();
    if (!posts) throw new Error("There is no data in DB");
    const postsDataValues = posts.map((post) => post.dataValues);

    return postsDataValues;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getPost(postId: string) {
  try {
    const post = await PostModel.findOne({ where: { id: postId } });
    if (!post) throw new Error("This post does not exist");

    return post.dataValues;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}
