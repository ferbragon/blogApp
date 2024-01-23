import { NextRequest, NextResponse } from "next/server";
import { PostModel } from "@/app/api/db/seq/seq";
const { v4: uuidv4 } = require("uuid");

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const uuid = uuidv4();
    const body = await req.json();
    const { title, author, content } = body;

    if (title.length === 0 && author.length === 0 && content.length === 0) {
      throw new Error("All fields are required");
    }

    await PostModel.create({
      id: uuid,
      title,
      author,
      content,
    });

    const posts = await PostModel.findAll();

    const postsDataValues = posts.map((post) => post.dataValues);
    return NextResponse.json(postsDataValues);
  } catch (error) {
    console.error("Error searching data in DB", error);
    return NextResponse.error;
  }
}
