import { NextRequest, NextResponse } from "next/server";
import { PostModel } from "@/app/api/db/seq/seq";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await PostModel.findAll();

    if (!data) throw new Error("There is no data in DB");

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching data in DB", error);
    return NextResponse.error;
  }
}
