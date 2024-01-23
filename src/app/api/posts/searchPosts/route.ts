import { NextRequest, NextResponse } from "next/server";
import { PostModel } from "@/app/api/db/seq/seq";
import { Op } from "sequelize";

type IWhereClause = {
  title?: any;
  author?: any;
  content?: any;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { title, author, content } = body;
    let whereClause: IWhereClause = {};
    let posts;

    if (title.length === 0 && author.length === 0 && content.length === 0) {
      posts = await PostModel.findAll();
    } else {
      if (title.length > 0) {
        whereClause.title = {
          [Op.regexp]: `(${title.replace(/\s+/g, "|")})`,
        };
      }

      if (author.length > 0) {
        whereClause.author = {
          [Op.regexp]: `(${author.replace(/\s+/g, "|")})`,
        };
      }

      if (content.length > 0) {
        whereClause.content = {
          [Op.regexp]: `(${content.replace(/\s+/g, "|")})`,
        };
      }

      posts = await PostModel.findAll({ where: whereClause });
    }

    if (!posts || posts.length === 0) {
      throw new Error("There are no posts with those search parameters");
    }

    const postsDataValues = posts.map((post) => post.dataValues);
    return NextResponse.json(postsDataValues);
  } catch (error) {
    console.error("Error searching data in DB", error);
    return NextResponse.error;
  }
}
