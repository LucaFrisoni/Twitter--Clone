import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    if (!postId) {
      throw new Error("Invalid ID");
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: { user: true },
          orderBy: {
            createdAt: "desc",
          },
        },
        user: true,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
